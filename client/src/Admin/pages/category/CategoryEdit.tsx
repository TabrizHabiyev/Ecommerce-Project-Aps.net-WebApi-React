import React, {useEffect, useState} from "react";
import agent from "../../../App/api/agent";
import {Box, TextField, Typography, Checkbox, FormControlLabel, Button, Select} from "@mui/material";
import {FieldValues, useForm} from "react-hook-form";
import AppDropzone from "../../components/AppDropzone";
import AddIcon from "@mui/icons-material/Add";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import {toast} from "react-toastify";
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'max-content',
    bgcolor: 'background.paper',
    p: 4,
};

function CategoryEdit(props:any){
    const {register,control, reset, handleSubmit, watch, formState: {isDirty, isSubmitting} } = useForm({
        mode: 'all',
    });
    const [category,setCategory] = useState<any[]>([])
    const [data,setData]=useState<any>({})
    useEffect( ()=>{
        const fetchData = async () => {
            try {
                const response = await agent.Admin.getCategoryById(props.id);
                const data = await agent.Admin.allCategory();
                setCategory(data)
                setData(response)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[])

  async function handleSubmitData(data: FieldValues) {
        try {
            await agent.Admin.updateCategory(data).then(()=>{
                toast.success("Category is created successful!")
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <form method="post" onSubmit={handleSubmit(handleSubmitData)}>
            <Box sx={style} className="categoryAddModal">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit Category
                </Typography>
            {data.isMain !== undefined && data.isMain === true ?
                <>
                    <input type="hidden" value={'true'} {...register('isMain')}/>
                    <input type="hidden" value={data.id} {...register('Id')}/>
                    <FormControlLabel control={
                    <Checkbox   {...register('isFatured')}  sx={{'& .MuiSvgIcon-root': {fontSize: 28}}}/>} label="Is Featured" /><br/>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Category Name"
                        autoComplete="category"
                        type='text'
                        defaultValue={data.name}
                        {...register('name')}
                    />
                    <AppDropzone control={control} name='file' />
                </>
            : null}

            {data.isMain !== undefined && data.isMain === false ?
                  <>
                      <input type="hidden" value={data.id} {...register('Id')}/>
                      <FormControl className="categorySelectField" sx={{ minWidth: 120 ,mt:2}}>
                          <InputLabel id="demo-controlled-open-select-label">Select Main Category</InputLabel>
                          <Select
                              id="demo-controlled-open-select"
                              label="Select Category"
                              {...register('MainCategoryId')}
                          >
                              {category.map((value, index) =>
                                  <MenuItem value={value.id}>{value.name}</MenuItem>
                              )}
                          </Select>
                      </FormControl><br/>
                    <FormControlLabel control={
                        <Checkbox   {...register('isFatured')}  sx={{'& .MuiSvgIcon-root': {fontSize: 28}}}/>} label="Is Featured" /><br/>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Category Name"
                        autoComplete="category"
                        type='text'
                        defaultValue={data.name}
                        {...register('name')}
                    />
                </>
            : null}
            <br/>
            <Button type='submit' className="categoryEditButton" variant="contained"  startIcon={<AddIcon/>}>
                Edit Category
            </Button>
            </Box>
            </form>
        </>
    );
}
export default CategoryEdit;