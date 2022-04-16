import './blogList.css'
import {
    Typography,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Box, Button,
} from "@mui/material";
import {useEffect, useState} from "react";
import agent from "../../../App/api/agent";
import {toast, ToastContainer} from "react-toastify";
import {Link} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import {Delete} from "@mui/icons-material";

export default function  BlogList() {

    const [blog,setBlog] = useState<any[]>([])
    const [update,setupdate]= useState(false)

    useEffect(()=>{
        agent.Blog.list().then((blogs)=>{
            setBlog(blogs)
        }).catch((err)=>{

        })
    },[update])

    function handleDeleteBlog(id: string) {
        agent.Blog.Delete(id).then(()=>{
            toast.success("Blog is deleted successful!")
            setupdate(true)
        }).catch(error => console.log(error))
    }

    return (
        <div className="orderList">
            <ToastContainer />
            <Typography variant='h4'>Blogs</Typography>
            <div className="orderContainer">
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">Title</TableCell>
                            <TableCell align="left">Details</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="center">Note</TableCell>
                            <TableCell align="center">State</TableCell>
                            <TableCell align="center">Product Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {blog.map((item,index) => (
                            <TableRow
                                key={item.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index+1}
                                </TableCell>
                                <TableCell align="left">
                                    {item.title}
                                </TableCell>
                                <TableCell align="right">
                                        <p>{item.details}</p><br/>
                                </TableCell>
                                <TableCell align="right">
                                    <Box display='flex' alignItems='center'>
                                        <p>{item.description}</p>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">
                                    {item.note}
                                </TableCell>
                                <TableCell align="right">{item.productName}</TableCell>

                                <TableCell align="right">
                                    <Link to={`editProduct/${item.id}`}>
                                        <Button   className="userListEdit" variant="contained" endIcon={<EditIcon/>}/>
                                    </Link>
                                    <Button
                                        startIcon={<Delete />} color='error'
                                        onClick={() => handleDeleteBlog(item.id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}