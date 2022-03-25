import React, {useState} from 'react';
import {Button, Select, TextField, Typography} from "@mui/material";
import { styled } from '@mui/material/styles';
import "./categorylist.css"
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
//Dropzone depency
import {DropzoneArea} from 'material-ui-dropzone'
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// Drop zone depency son

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
const rows = [
    { id: '09699d84-ffd7-4ac1-93c9-08da102ef2d5',icon:'https://bit.ly/3wMWVdB', isMain: true},
];

function CategoryList() {
    const [isMain,setIsmain] = React.useState(true)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [category,setCategory] = useState(rows)
    const handleDeleteCategory = (id:string)=>{
        setCategory(category.filter(x => x.id !== id))
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 130 },
        { field: 'icon', headerName: 'ICON', width: 130,
            renderCell:(params:GridValueGetterParams)=>{
                return(
                    <div className="categoryListIncon">
                        <Avatar className="categoryListItemIcon" src={params.row.icon} />
                        {params.row.firstName}
                    </div>
                )
            }},
        { field: 'isMain', headerName: 'Main or Sub', width: 130 },

          {field:"action",headerName:"Action",width:160,
            renderCell:(params:GridValueGetterParams)=>{
                return(
                    <>
                        <Button className="userListEdit" variant="contained" endIcon={<EditIcon/>}>Edit</Button>
                        <DeleteIcon onClick={()=>handleDeleteCategory(params.row.id)} fontSize="large" className="userListDelete"/>
                    </>
                );
            }
        }
    ];

    return (
        <>
        <div className="categoryList">
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
        <Box sx={style} className="categoryAddModal">
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Add Category
            </Typography>
         <FormControlLabel control={
         <Checkbox onChange={
          (event) => setIsmain(event.target.checked)}
          defaultChecked
          sx={{'& .MuiSvgIcon-root': {fontSize: 28}}}
          />
         } label="Is Main" />
            <FormControlLabel control={
                <Checkbox defaultChecked   sx={{'& .MuiSvgIcon-root': {fontSize: 28}}}/>} label="Is Featured" /><br/>
            {isMain === false ?
                <FormControl className="categorySelectField" sx={{ minWidth: 120}}>
                    <InputLabel id="demo-controlled-open-select-label">Select Main Category</InputLabel>
                    <Select
                        id="demo-controlled-open-select"
                        label="Select Category"
                    >
                        <MenuItem value={1}>All Category</MenuItem>
                        <MenuItem value={2}>Main Category</MenuItem>
                        <MenuItem value={3}>Sub Category</MenuItem>
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
            />
            {isMain === true ?
                <DropzoneArea
                    onChange={(files) => console.log('Files:', files)}
                    filesLimit={1}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/jpg']}
                    maxFileSize={10000}
                    initialFiles={[]}
                />
               : null
            }
           <br/>  <Button className="categoryAddButton" variant="contained"  startIcon={<AddIcon/>}>
              Add Category
            </Button>
        </Box>
    </Modal>
     </>
    );
}
export default CategoryList;