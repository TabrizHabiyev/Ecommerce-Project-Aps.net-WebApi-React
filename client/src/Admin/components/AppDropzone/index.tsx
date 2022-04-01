import { UploadFile } from '@mui/icons-material';
import { FormControl, FormHelperText, Typography } from '@mui/material';
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useController, UseControllerProps } from 'react-hook-form'

interface Props extends UseControllerProps { }

export default function AppDropzone(props: Props) {
    const { fieldState, field } = useController({ ...props, defaultValue: null });


    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles[0] = Object.assign(acceptedFiles[0],
            {preview: URL.createObjectURL(acceptedFiles[0])});
        field.onChange(acceptedFiles[0]);
    }, [field])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()}>
            <FormControl error={!!fieldState.error}>
                <input {...getInputProps()} />
                <UploadFile sx={{fontSize: '100px'}} />
                <Typography variant='h4'>Drop image here</Typography>
                <FormHelperText>{fieldState.error?.message}</FormHelperText>
            </FormControl>
        </div>
    )
}