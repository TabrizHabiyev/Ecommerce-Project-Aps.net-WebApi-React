import {useController, UseControllerProps} from "react-hook-form";
import {TextField} from "@mui/material";


interface Props extends UseControllerProps{
    label:string;
}

export default function AppTextInput(props:Props) {
    const {fieldState,field} = useController({...props,defaultValue:''})
    return (
           <TextField
               {...props}
               {...field}
               fullWidth
               variant='outlined'
               error={!!fieldState.error}
               helperText={fieldState.error?.message}
           />
    );
}
