import './orders.css'
import {
    Typography,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Box,
} from "@mui/material";
import {useEffect, useState} from "react";
import agent from "../../../App/api/agent";
import {toast, ToastContainer} from "react-toastify";

export default function  Orders() {

    const [order,setOrder] = useState<any[]>([])

   useEffect(()=>{
       agent.Order.ollUsersOrder().then((orders)=>{
           setOrder(orders)
       }).catch((err)=>{

       })
   },[])

    return (
        <div className="orderList">
            <ToastContainer />
            <Typography variant='h4'>Orders</Typography>
            <div className="orderContainer">
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">Product</TableCell>
                            <TableCell align="left">Customer Full Name</TableCell>
                            <TableCell align="right">Adress</TableCell>
                            <TableCell align="center">City</TableCell>
                            <TableCell align="center">State</TableCell>
                            <TableCell align="center">Zip</TableCell>
                            <TableCell align="center">Order Date</TableCell>
                            <TableCell align="center">Sub Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order.map((item,index) => (
                            <TableRow
                                key={item.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index+1}
                                </TableCell>
                                <TableCell align="left">
                                    <Box display='flex' alignItems='center'>
                                        <img src={item.orderItems[0].itemOrdered.pictureUrl}  style={{ height: 50, marginRight: 20 }} />
                                        <span>{item.orderItems[0].itemOrdered.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{item.shippingAddress.fullName}</TableCell>
                                <TableCell align="right">
                                    {item.shippingAddress.adress1},
                                <br/>
                                    {item.shippingAddress.adress2}
                               </TableCell>
                                <TableCell align="right">{item.shippingAddress.city}</TableCell>
                                <TableCell align="right">{item.shippingAddress.state}</TableCell>
                                <TableCell align="right">{item.shippingAddress.zip}</TableCell>
                                <TableCell align="right">{item.orderDate}</TableCell>
                                <TableCell align="right">{item.subTotal}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}