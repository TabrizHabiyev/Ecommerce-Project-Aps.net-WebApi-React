import "./productlist.css"
import AddIcon from '@mui/icons-material/Add';
import {
    Typography,
    Button,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Box,
    TextField
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useState } from "react";
import {useAppDispatch, useAppSelector} from "../../../store/configureStore";
import agent from "../../../App/api/agent";
import {Product} from "../../../models/Product";
import {setPageNumber} from "../../../features/Products/productSlice";
import AppPagination from "../../../App/components/AppPagination";
import {Link} from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import {toast, ToastContainer} from "react-toastify";
import useProducts from "../../../hooks/useProducts";

export default function  CategoryList() {
    const {products, metaData} = useProducts();
    const dispatch = useAppDispatch();
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    function handleDeleteProduct(id: string) {
         agent.Product.deleteProduct(id).then(()=>{
            toast.success("Product is deleted successful!")
        }).catch(error => console.log(error))
            .finally(() => setLoading(false));
    }

    return (
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
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">Category</TableCell>
                            <TableCell align="center">Quantity</TableCell>

                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product,index) => (
                            <TableRow
                                key={product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index+1}
                                </TableCell>
                                <TableCell align="left">
                                    <Box display='flex' alignItems='center'>
                                        <img src={product.photoUrl[0].photoUrl} alt={product.name} style={{ height: 50, marginRight: 20 }} />
                                        <span>{product.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{product.price}</TableCell>
                                <TableCell align="center">{product.type}</TableCell>
                                <TableCell align="center">{product.categoryName}</TableCell>
                                <TableCell align="center">{product.quantity}</TableCell>
                                <TableCell align="right">
                                    <Link to={`editProduct/${product.id}`}>
                                        <Button   className="userListEdit" variant="contained" endIcon={<EditIcon/>}/>
                                    </Link>
                                    <Button
                                        startIcon={<Delete />} color='error'
                                        onClick={() => handleDeleteProduct(product.id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {metaData &&
                <Box sx={{pt: 2}}>
                    <AppPagination
                        metaData={metaData}
                        onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}
                    />
                </Box>
            }
        </div>
    )
}