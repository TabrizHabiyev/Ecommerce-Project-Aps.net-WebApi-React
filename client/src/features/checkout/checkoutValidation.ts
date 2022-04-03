import * as yup from "yup"



export const validationSchema = [
    yup.object({
    fullName: yup.string().required('Full Name is required'),
    adress1: yup.string().required('Address line 1 is required'),
    adress2: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),
    country: yup.string().required()
}),

    yup.object(),
    yup.object({
        nameOnCard: yup.string().required()
    })

]