import {InputBaseComponentProps} from "@mui/material";
import {forwardRef, Ref, useImperativeHandle, useRef} from "react";


interface Props extends  InputBaseComponentProps{}
export const StripeInput = forwardRef(function StripeInput({component:Component,...props}:Props,
 ref:Ref<unknown>){
    const  elementRef = useRef<any>();

    useImperativeHandle(ref,()=>{
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        focus:() => elementRef.current.focus
    });
    return(
        <Component
        onReady={(element:any)=>elementRef.current = element}
        {...props}
        />
    )
})