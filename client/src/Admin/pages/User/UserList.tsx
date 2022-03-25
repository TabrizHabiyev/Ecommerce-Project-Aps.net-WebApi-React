import React, {useState} from 'react';
import "./userlist.css"
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {Link} from "react-router-dom";


const rows = [
    {
        id: "1",
        lastName: 'Snow',
        firstName: 'Jon',
        age: 35,
        avatar:"dasdasd",
        email:"ssss@gmail.com",
        IsActive:"Active",
        gender:"Male"
    },
];

function UserList() {
    const [data,setData] = useState(rows)
  const handleDelete = (id:string)=>{
        setData(data.filter(x => x.id !== id))
    }
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },

        { field: 'firstName', headerName: 'First name', width: 130,
            renderCell:(params)=>{
                return(
                    <div className="userList">
                        <Avatar className="userListItem" src={params.row.avatar} />
                        {params.row.firstName}
                    </div>
                )
            }
        },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'gender', headerName: 'Gender', width: 60 },
        { field: 'IsActive', headerName: 'Status', width: 60 },
        {field: 'age', headerName: 'Age', type: 'number', width: 30,},

        {field:"action",headerName:"Action",width:160,
            renderCell:(params)=>{
                return(
                    <>
                        <Link to={"/admin/user/"+params.row.id}>
                            <Button className="userListEdit" variant="contained" endIcon={<EditIcon/>}>Edit</Button>
                        </Link>
                        <DeleteIcon onClick={()=>handleDelete(params.row.id)} fontSize="large" className="userListDelete"/>
                    </>
                );
            }
        }
    ];
    return (
        <div className="userList">
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
}
export default UserList;