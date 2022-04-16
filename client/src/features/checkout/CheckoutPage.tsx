import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import {useForm, FormProvider, useFormContext, FieldValue} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {validationSchema} from "./checkoutValidation";
import {useEffect, useState} from "react";
import agent from "../../App/api/agent";
import {useAppDispatch, useAppSelector} from "../../store/configureStore";
import {clearBasket} from "../basket/basketSlice";
import {StripeElementType} from "@stripe/stripe-js";
import {CardNumberElement, useElements, useStripe} from "@stripe/react-stripe-js";
const steps = ['Shipping address', 'Payment details'];



export default function CheckoutPage() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [orderNumber,setOrderNumber] = useState(0);
    const [loading,setLading] = useState(false);
    const dispatch = useAppDispatch();
    const currentValidationSchema = validationSchema[activeStep];

    const [cardState,setCardState] = useState<{elementError:{[key in StripeElementType]?:string}}>({elementError:{}})
    const [cardComplete,setCardComplete] = useState<any>({cardNumber:false,cardExpiry:false,cardCvc:false})

    const [paymentMessage,setPaymentMessage] = useState('');
    const [paymentSucceeded,setPaymentSucceeded] =useState(false)
    const {basket} = useAppSelector(state=>state.basket);
    const  stripe = useStripe();
    const elements = useElements();

    function onCardInputChange(event:any){
        setCardState({
            ...cardState,
            elementError:{
                ...cardState.elementError,
                [event.elementType]:event.error?.message
            }
        })
        setCardComplete({...cardComplete,[event.elementType]:event.complete})
    }


    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return <AddressForm />;
            case 1:
                return <PaymentForm cardState={cardState} onCartInputChange={onCardInputChange} />;
            default:
                throw new Error('Unknown step');
        }
    }

    const methods = useForm({
        mode: 'all',
        resolver:yupResolver(currentValidationSchema)
    });

    useEffect(() => {
        agent.Account.fetchAddress()
            .then(response => {

                if (response) {
                    methods.reset({ ...methods.getValues(), ...response, saveAddress: false })
                }
            })
    }, [methods])

    async function submitOrder(data:FieldValue<any>){
       setLading(true);
        const {nameOnCard,saveAddress,...shippingAdress} = data;
        if(!stripe || !elements)return;
        try{
           const cardElement = elements.getElement(CardNumberElement);
           const paymentsResult = await stripe.confirmCardPayment(basket?.clientSecret!,{
               payment_method:{
                   card:cardElement!,
                   billing_details:{
                       name:nameOnCard
                   }
               }
           });
           if(paymentsResult.paymentIntent?.status === 'succeeded'){
               const orderNumber =await  agent.Order.create({saveAddress,shippingAdress})
               setOrderNumber(orderNumber);
               setPaymentSucceeded(true)
               setPaymentMessage('Thank you - we have received your payment')
               setActiveStep(activeStep + 1);
               dispatch(clearBasket());
               setLading(false)
           }else{
               setPaymentMessage(paymentsResult.error?.message!);
               setPaymentSucceeded(false)
               setLading(false)
               setActiveStep(activeStep + 1);
           }
        }catch (error){
            console.log(error)
            setLading(false)
        }
    }

    function submitDisabled(): boolean {
        if (activeStep === steps.length) {
            return !cardComplete.cardCvc
                || !cardComplete.cardExpiry
                || !cardComplete.cardNumber
                || !methods.formState.isValid
        } else {
            return !methods.formState.isValid
        }
    }

    const handleNext = async (data:FieldValue<any>) => {
        if(activeStep === steps.length-1){
            await  submitOrder(data);
            console.log("salam")
        }else{
            setActiveStep(activeStep + 1);
            console.log("salam",steps.length,activeStep)

        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);

    };

    return (
        <>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <FormProvider {...methods}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === 2 ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    {paymentMessage}
                                </Typography>
                                {paymentMessage ? (
                                    <Typography variant="subtitle1">
                                        Your Order number #{orderNumber}
                                    </Typography>
                                ):(
                                    <Button onClick={handleBack}>
                                        Go back and try again
                                    </Button>
                                )}
                            </React.Fragment>
                        ) : (
                            <form onSubmit={methods.handleSubmit(handleNext)}>
                                {getStepContent(activeStep)}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                            Back
                                        </Button>
                                    )}
                                    <Button
                                        disabled={submitDisabled()}
                                        variant="contained"
                                        type='submit'
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        {activeStep === steps.length -1 ? 'Place order' : 'Next'}
                                    </Button>
                                    <h1>{activeStep}</h1>
                                    <h1>{steps.length-1}</h1>
                                </Box>
                            </form>
                        )}
                    </React.Fragment>
                </Paper>
                </FormProvider>
            </Container>
        </>
    );
}