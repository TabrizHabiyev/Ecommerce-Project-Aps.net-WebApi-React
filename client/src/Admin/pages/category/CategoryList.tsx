import React, {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import "./categorylist.css"
import {
    Button,
    Typography,
    TextField,
    Select,
    Checkbox,
    FormControlLabel,
    Box,
    Modal,
    MenuItem,
    FormControl,
    InputLabel,
    Avatar,
} from "@mui/material";

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import {FieldValues, useForm} from "react-hook-form";
import agent from "../../../App/api/agent";
import AppDropzone from "../../components/AppDropzone"
import {toast, ToastContainer} from "react-toastify";
import CategoryEdit from "./CategoryEdit";
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'max-content',
    bgcolor: 'background.paper',
    p: 4,
};
const Input = styled('input')({
    display: 'none',
});


function CategoryList() {

    const {register,control, reset, handleSubmit, watch, formState: {isDirty, isSubmitting} } = useForm({
        mode: 'all',
    });

    const [category,setCategory] = useState<any[]>([])
    async function handleSubmitData(data: FieldValues) {
        const fetchData = async () => {
            try {
                const data = await agent.Admin.allCategory();
                setCategory(data)
            } catch (error) {
                console.log(error)
            }
        }
        try {
            await agent.Admin.createCategory(data).then(()=>{
                fetchData()
                toast.success("Category is created successful!")
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Create category modal
    const [isMain,setIsmain] = React.useState(true)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //Category edit modal
    const [openEdit, setOpenEdit] = React.useState(false);
    const [editId,setEditId] =useState<string>();
    const handleOpenEdit = (id:string) =>{
        setEditId(id)

        setOpenEdit(true);
    }
    const handleCloseEdit = () => setOpenEdit(false);
    useEffect( ()=>{
        const fetchData = async () => {
            try {
              const data = await agent.Admin.allCategory();
              setCategory(data)
            } catch (error) {
                console.log(error)
            }
        }
      fetchData()
    },[])
    const handleDeleteCategory = async(id:string)=>{
        try {
            await agent.Admin.deleteCategory(id).then(()=>{
                setCategory(category.filter(x => x.id !== id))
                handleClose()
                toast.success("Category is deleted successful!")
            })
        } catch (error) {
            toast.error(`${error}`)
        }
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 130 },
        { field: 'imageUrl', headerName: 'ICON', width: 130,
            renderCell:(params:GridValueGetterParams)=>{
                return(
                    <div className="categoryListIncon">
                        <Avatar className="categoryListItemIcon" src={params.row.imageUrl} />
                        {params.row.firstName}
                    </div>
                )
            }},
        {field: 'name', headerName: 'Name', width: 130 },
        { field: 'isMain', headerName: 'Main or Sub', width: 130 },

          {field:"action",headerName:"Action",width:160,
            renderCell:(params:GridValueGetterParams)=>{
                return(
                     <>
                         <Button onClick={()=>handleOpenEdit(params.row.id)}  className="userListEdit" variant="contained" endIcon={<EditIcon/>}>Edit</Button>
                        <DeleteIcon onClick={()=>handleDeleteCategory(params.row.id)} fontSize="large" className="userListDelete"/>
                     </>
                );
            }
        }
    ];

    return (
        <>
        <div className="categoryList">
            <ToastContainer />
            <Typography variant='h4'>Category</Typography>
            <div className="catagoryContainer">
                <div className="categoryFileds">
                <TextField sx={{mb:3,mt:3}} className="categorySearchField" label="Search by category type"/>
                <FormControl className="categorySelectField" sx={{ minWidth: 120}}>
                    <InputLabel id="demo-controlled-open-select-label">Category</InputLabel>
                    <Select
                        id="demo-controlled-open-select"
                        label="Select Category"
                    >
                        <MenuItem value={1}>All Category</MenuItem>
                        <MenuItem value={2}>Main Category</MenuItem>
                        <MenuItem value={3}>Sub Category</MenuItem>
                    </Select>
                </FormControl>
                    <Button onClick={handleOpen} className="categoryAddButton" variant="contained"  startIcon={<AddIcon/>}>
                        Add Category
                    </Button>
                </div>
            </div>
                <DataGrid
                    className="catagoryListContainer"
                    rows={category}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
        </div>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <form method="post" onSubmit={handleSubmit(handleSubmitData)}>
        <Box sx={style} className="categoryAddModal">
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Add Category
            </Typography>
         <FormControlLabel control={
         <Checkbox
          defaultChecked
          {...register('isMain')}
          onChange={(event) => setIsmain(event.target.checked)}
          sx={{'& .MuiSvgIcon-root': {fontSize: 28}}}
          />
         } label="Is Main" />
            <FormControlLabel control={
                <Checkbox defaultChecked  {...register('isFatured')}  sx={{'& .MuiSvgIcon-root': {fontSize: 28}}}/>} label="Is Featured" /><br/>
            {isMain === false ?
                <FormControl className="categorySelectField" sx={{ minWidth: 120}}>
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
                </FormControl>:null
            }
            <TextField
                margin="normal"
                fullWidth
                label="Category Name"
                autoComplete="category"
                type='text'
                autoFocus
                {...register('name')}
            />
            {isMain === true ?
                <AppDropzone control={control} name='file' />
               : null
            }
           <br/>
            <Button type='submit' className="categoryAddButton" variant="contained"  startIcon={<AddIcon/>}>
              Add Category
            </Button>
        </Box>
        </form>
    </Modal>
            <Modal
                open={openEdit}
                onClose={handleCloseEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            <CategoryEdit id={editId} category={category}/>
            </Modal>
     </>
    );
}
export default CategoryList;