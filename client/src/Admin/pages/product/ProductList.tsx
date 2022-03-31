import React, {useEffect, useState} from 'react';
import "./productlist.css"
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    Button,
    Typography,
    TextField,
    Avatar,
} from "@mui/material";
import { DataGrid,GridValueGetterParams } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import agent from "../../../App/api/agent";
import {toast, ToastContainer} from "react-toastify";
import {Link} from "react-router-dom";
import {TailSpin } from  'react-loader-spinner'
function CategoryList() {
    const [loading,setLoading] = useState(false);
    const [product,setProduct] = useState<any[]>([])
    useEffect( ()=>{
        const fetchData = async () => {
            try {
                await agent.Product.allProduct().then((data)=>{
                    setProduct(data)
                    setLoading(true)
                })

            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[])
    const handleDeleteCategory = async(id:string)=>{
        setLoading(false)
        try {
            await agent.Product.deleteProduct(id).then(()=>{
                setProduct(product.filter(x => x.id !== id))
                setLoading(true)
                toast.success("Product is deleted successful!")
            })
        } catch (error) {
            toast.error(`${error}`)
        }
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'imageUrl', headerName: 'ICON', width: 100,
            renderCell:(params:GridValueGetterParams)=>{
                return(
                    <div className="categoryListIncon">
                        <img className="categoryListItemIcon" src={params.row.photoUrl[0].photoUrl} />
                        {params.row.firstName}
                    </div>
                )
            }},
        {field: 'name', headerName: 'Name', width: 130 },
        {field: 'type', headerName: 'Type', width: 130 },
        {field: 'price', headerName: 'Price', width: 130 },
        {field: 'inStock', headerName: 'In Stock', width: 130 },
        {field: 'quantity', headerName: 'Quantity', width: 130 },
        {field: 'featured', headerName: 'Featured', width: 130 },
        { field: 'tagList', headerName: 'Tags', width: 100,
            renderCell:(params:GridValueGetterParams)=>{
                return(
                    <div className="categoryListIncon">
                        {params.row.tagList.map((item:any)=>(
                            item
                        ))}
                    </div>
                )
            }},

        {field:"action",headerName:"Action",width:200,
            renderCell:(params:GridValueGetterParams)=>{
                return(
                    <>

                        <Link to={`editProduct/${params.row.id}`}>
                            <Button   className="userListEdit" variant="contained" endIcon={<EditIcon/>}/>
                        </Link>
                        <Link to={`viewProduct/${params.row.id}`}>
                            <Button   className="userListEdit" variant="contained" endIcon={<VisibilityIcon/>}/>
                        </Link>
                            <Button onClick={()=>handleDeleteCategory(params.row.id)}   className="userListEdit" variant="contained" endIcon={<DeleteIcon/>}/>
                    </>
                );
            }
        }
    ];

    return (
        <>
            <div className="categoryList">
                <ToastContainer />
                <Typography variant='h4'>Product</Typography>
                <div className="catagoryContainer">
                    <div className="categoryFileds">
                        <TextField sx={{mb:3,mt:3}} className="categorySearchField" label="Search by category type"/>
                        <Link to='addProduct'>
                        <Button className="categoryAddButton" variant="contained"  startIcon={<AddIcon/>}>
                            Add Product
                        </Button>
                        </Link>
                    </div>
                </div>
                {loading === false ?
                    <TailSpin ariaLabel="loading-indicator" />
                        :
                    <DataGrid
                        className="catagoryListContainer"
                        rows={product}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                }

            </div>
        </>
    );
}
export default CategoryList;