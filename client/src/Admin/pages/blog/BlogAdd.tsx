import React, {useEffect, useState} from 'react';
import {FieldValues, useForm} from "react-hook-form";
import agent from "../../../App/api/agent";
import {toast} from "react-toastify";
import {Box, Button, Checkbox, FormControlLabel, Select, TextField, Typography} from "@mui/material";
import AppDropzone from "../../components/AppDropzone";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import useProducts from "../../../hooks/useProducts";
import {useAppDispatch} from "../../../store/configureStore";


function BlogAdd() {
    const {products, metaData} = useProducts();
    const dispatch = useAppDispatch();

    const {register,control, reset, handleSubmit, watch, formState: {isDirty, isSubmitting} } = useForm({
        mode: 'all',
    });

    async function handleSubmitData(data: FieldValues) {
        try {
            await agent.Blog.create(data).then(()=>{
                toast.success("Blog is created successful!")
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <form method="post" onSubmit={handleSubmit(handleSubmitData)}>
                <Box className="categoryAddModal">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                       Add Blog
                    </Typography>
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Enter Blog Title"
                                type='text'
                                {...register('title')}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Enter blog detail"
                                type='text'
                                {...register('details')}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Add blog description"
                                type='text'
                                {...register('description')}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Add Note"
                                type='text'
                                {...register('note')}
                              />
                            <FormControl className="categorySelectField" sx={{ minWidth: 120 ,mt:2}}>
                                <InputLabel id="demo-controlled-open-select-label">Select Product</InputLabel>
                                <Select
                                    id="demo-controlled-open-select"
                                    label="Select Product"
                                    {...register('productId')}
                                >
                                    {products.map((value, index) =>
                                        <MenuItem value={value.id}>{value.name}</MenuItem>
                                    )}
                                </Select>
                            </FormControl><br/>
                    <AppDropzone control={control} name='file' />
                    <Button type='submit' className="categoryEditButton" variant="contained"  startIcon={<AddIcon/>}>
                       Add Blog
                    </Button>
                </Box>
            </form>
        </>
    );
}
export default BlogAdd;