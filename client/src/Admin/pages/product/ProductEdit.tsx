import React, {useCallback, useEffect, useRef, useState} from 'react';
import  './productedit.css'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ViewListIcon from '@mui/icons-material/ViewList';
import {
    Checkbox,
    FormControlLabel, ImageList
    , ImageListItem,
    ImageListItemBar,
    Select
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from "@mui/material/MenuItem";
import agent from "../../../App/api/agent";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {FieldValues, useForm} from "react-hook-form";
import { WithContext as ReactTags } from 'react-tag-input';
import { Upload} from 'antd';
import {Link, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {TailSpin } from  'react-loader-spinner'
import AddIcon from "@mui/icons-material/Add";

const KeyCodes = {
    comma: 188,
    enter: 13
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

function ProductEdit() {
    const {id}= useParams<string>();
    const [fileList, setFileList] = useState<any[]>([]);
    const [FileSend, setFileSend] = useState<any[]>([]);

    const removePhoto = (index:number,item:any) =>{
        const newFileList:any = fileList.slice();
        newFileList.splice(index, 1);
        setFileSend(FileSend.filter(x=>x !== item))
        return setFileList(newFileList)
    }
    const propsUpload = {
        onRemove: (file:any) => {
            const index = fileList.indexOf(file);
            const newFileList:any = fileList.slice();
            newFileList.splice(index, 1);
            return setFileList(newFileList)
        },
        beforeUpload: (file:any) => {
            setFileList([...fileList, file]);
            return false;
        },
        onChange(info:any) {
            const listFiles = info.fileList.slice();

            const newArrayFiles  = listFiles.map((file:any) => file.originFileObj? (file.originFileObj) : file );

            const anAsyncFunction = async (item:any) => {
                return convertBase64(item)
            }

            const getData = async () => {
                return Promise.all(newArrayFiles.map((item:any) => anAsyncFunction(item)))
            }
            getData().then(data => {
                setFileSend(data)
            })
        },
        multiple:true,
        fileList:fileList
    };
    const convertBase64 = (file:File) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader?.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }
    const[postTags,setPostTags]=React.useState<any[]>([])
    const [tags, setTags] = React.useState<any[]>([]);

    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = tag => {
        setTags([...tags, tag]);
    };
    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        setTags(newTags);
    };

    const {register,control, reset, handleSubmit, watch, formState: {isDirty, isSubmitting} } = useForm({
        mode: 'all',
    });

    const [category,setCategory] = useState<any[]>([])
    const [color,setColor] = useState<any[]>([])
    const [discount,setDiscount] = useState<any[]>([])
    const [suggestions,setSuggestion] =useState<any[]>([])
    const [data,setData]=useState<any>({})
    const [oldPhoto,setOldPhoto]=useState<any[]>([])
    const [deletedPhoto,setDeletedPhoto]=useState<any[]>([])
    const removeOldPhoto = async (index:string) => {
          setOldPhoto(oldPhoto.filter(x=>x.id !== index))
          setDeletedPhoto([...deletedPhoto , ...oldPhoto.filter(x=>x.id === index)])
    }
    const [loading,setLoading] = useState(false);
    useEffect( ()=>{
        const fetchData = async () => {
            try {
             await agent.Admin.allCategory().then((resCategory)=>{
                        setCategory(resCategory)
                    }).then(async ()=>{
                        await agent.Product.allColor().then((color)=>{
                            setColor(color)
                        })
                    }).then(async ()=>{
                        await agent.Product.getProductDiscount().then((discount)=>{
                            setDiscount(discount)
                        })
                    }).then(async ()=>{
                    await agent.Product.allTas().then((resTag)=>{
                        const tagListOll = resTag
                        const tagss = tagListOll.map(item => {
                            return {
                                id: item,
                                text: item
                            };
                        });
                       setSuggestion(tagss)
                    }).then(async ()=>{
                        await agent.Product.getProductById(id).then((data)=>{
                            setData(data)
                            setOldPhoto(data.photoUrl)
                            const taglist = data.tagList
                            const tagss = taglist.map(item => {
                                return {
                                    id: item,
                                    text: item
                                };
                            });
                            setTags(tagss)
                        }).then(()=>{
                            setLoading(true)
                        })
                    })
                })

            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[])

    const handleSubmitData  = async (data: FieldValues) => {
        let formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key])
        }
        tags.map((item,index)=>(
            postTags.push(item.text)
        ))
        setPostTags(postTags)
        for (const key in postTags) {
            formData.append('tagList',  postTags[key])
        }
        deletedPhoto?.map((item,i)=>{
           formData.append('deletePhotoId',  item.id)
       })
        for (const key in data.colors) {
            formData.append('colorId',  data.colors[key])
        }
        for (const key in fileList) {
            formData.append('file', fileList[key])
        }
       await  agent.Product.updateProduct(formData).then(()=>{
           toast.success("Product has been successfully updated")
       }).catch((err)=>{
           toast.error(err)
       })
    }
    const [applydiscount,setapplyDiscount]=useState(true)
    if(loading == false) return   <div className='loadingEditPage'><TailSpin  ariaLabel="loading-indicator" /></div>

    return (
        <div className="containerProduct">
            <div className="catagoryContainer">
                <div className="categoryFileds">
                    <Link to='/admin/products'>
                        <Button className="categoryAddButton" variant="contained"  startIcon={<ViewListIcon/>}>
                            Product List
                        </Button>
                    </Link>
                    <Link to='/admin/products/addProduct'>
                        <Button className="categoryAddButton" variant="contained"  startIcon={<AddIcon/>}>
                            Add Product
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="productContainer">
                <Container component="main">
                    <CssBaseline/>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >{data.name !== undefined ?
                        <form method="post" onSubmit={handleSubmit(handleSubmitData)}>
                            <Box sx={{mt: 3}}>
                              <Grid container spacing={3}>
                                  <TextField type='hidden' value={id} {...register('id')}/>
                                    <Grid item xs={7} sm={3}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="name"
                                            label="Product Name"
                                             defaultValue={ data.name}
                                            {...register('name')}
                                        />
                                    </Grid>
                                    <Grid  item xs={7} sm={3}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="type"
                                            label="Product Type"
                                            defaultValue={data.type}
                                            {...register('type')}
                                        />
                                    </Grid>
                                    <Grid item xs={7} sm={3}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="price"
                                            label="Price"
                                            defaultValue={data.price}
                                            {...register('price')}
                                            type="number"
                                        />
                                    </Grid>
                                    <Grid item xs={7} sm={3}>
                                        <TextField
                                            required
                                            fullWidth
                                            defaultValue={data.quantity}
                                            {...register('quantity')}
                                            label="Quantity"
                                            type="number"
                                            id="number"
                                        />
                                    </Grid>
                                    <Grid item xs={7} sm={3}>
                                        <FormControl sx={{minWidth: 120}}>
                                            <InputLabel id="demo-controlled-open-select-label">Select
                                                Category</InputLabel>
                                            <Select
                                                id="demo-controlled-open-select"
                                                label="Select Category"
                                                {...register('categoryId')}
                                                defaultValue={data.categoryId}
                                            >
                                                {category.map((value, index) =>
                                                    <MenuItem key={value.name} value={value.id}>{value.name}</MenuItem>
                                                )}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={7} sm={3}>
                                        <FormControlLabel control={
                                            <Checkbox
                                                defaultChecked={data.featured === true ? true : false}
                                                {...register('featured')}
                                                sx={{'& .MuiSvgIcon-root': {fontSize: 28}}}/>}
                                                label="Is Featured"
                                            /><br/>
                                    </Grid>
                                    <Grid item xs={7} sm={3}>
                                        <FormControlLabel control={
                                            <Checkbox
                                                defaultChecked={data.campaignId !== null ? true : false}
                                                onChange={(event) => setapplyDiscount(event.target.checked)}
                                                sx={{'& .MuiSvgIcon-root': {fontSize: 28}}}/>}
                                                label="Apply Discount"
                                        />
                                        <br/>
                                    </Grid>
                                    {data.campaignId !== null && applydiscount === true?
                                        <>
                                            <Grid item xs={7} sm={3}>
                                                <FormControl sx={{minWidth: 120}}>
                                                    <InputLabel id="demo-controlled-open-select-label">Select
                                                        Discount </InputLabel>
                                                    <Select
                                                        id="demo-controlled-open-select"
                                                        label="Select Discount"
                                                        defaultValue={data.campaignId}
                                                        {...register('campaignId')}
                                                    >
                                                        {discount.map((value, index) =>
                                                            <MenuItem key={value.id}
                                                                      value={value.id}>{value.discount}%</MenuItem>
                                                        )}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={7} sm={3}>
                                                <TextField
                                                    {...register('compaignExpiryDate')}
                                                    id="date"
                                                    label="Discount Expiry Date"
                                                    type="date"
                                                    defaultValue={data.compaignExpiryDate !== null ? data.compaignExpiryDate.slice(0,10) : null}
                                                />
                                            </Grid></> : null}

                                </Grid>
                                <Grid item sx={{mt: 2}}>
                                    <TextareaAutosize
                                        aria-label="minimum height"
                                        minRows={5}
                                        defaultValue={data.description}
                                        style={{width: '100%'}}
                                        {...register('description')}
                                        placeholder="Description"
                                    />
                                </Grid>
                                <Grid item sx={{mt: 2}} sm={12}>
                                    <ReactTags
                                        tags={tags}
                                        suggestions={suggestions}
                                        delimiters={delimiters}
                                        handleDelete={handleDelete}
                                        handleAddition={handleAddition}
                                        handleDrag={handleDrag}
                                        inputFieldPosition='inline'
                                        maxLength={7}
                                        inline={true}
                                        autocomplete
                                    />
                                </Grid>
                                <Grid item xs={7} sx={{mt: 2}} sm={3}>
                                    {color.map((item, index) =>
                               data.colorList.find(x => x.id === item.id) !== undefined ?
                                        <Checkbox defaultChecked={true} key={index} {...register('colors')}
                                        style={{marginLeft: '2px', backgroundColor: `${item.colorCode}`}}
                                        value={item.id}/>
                                            :
                                        <Checkbox defaultChecked={false} key={index} {...register('colors')}
                                        style={{marginLeft: '2px', backgroundColor: `${item.colorCode}`}}
                                        value={item.id}/>
                                    )}
                                </Grid>
                                <Upload.Dragger {...propsUpload} maxCount={4 - oldPhoto.length}>
                                     <p>Drag File here Or</p>
                                    <Button>Click Upload</Button>
                                </Upload.Dragger>
                                <ImageList sx={{ width: '100%', height: '100%'}} cols={4} >
                                    {oldPhoto?.map((item,index)=>
                                        <ImageListItem key={index + 5}>
                                            <img
                                                src={item.photoUrl}
                                                srcSet={item.photoUrl}
                                                loading="lazy"
                                            />
                                            <ImageListItemBar
                                                actionIcon={
                                                  <Button  onClick={()=> removeOldPhoto(item.id)}  endIcon={<DeleteIcon className='photoDeleteIcon'/>}/>
                                                }
                                            />
                                        </ImageListItem>
                                    )}
                                    {FileSend.map((item,index)=>
                                        <ImageListItem key={index + 5} >
                                            <img
                                                src={item}
                                                srcSet={item}
                                                loading="lazy"
                                            />
                                            <ImageListItemBar
                                                actionIcon={
                                                    <Button onClick={()=> removePhoto(index,item)} endIcon={<DeleteIcon className='photoDeleteIcon'/>}/>
                                                }
                                            />
                                        </ImageListItem>
                                    )}
                                </ImageList>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                >
                                    Create
                                </Button>
                            </Box>
                        </form>:null}
                    </Box>
                </Container>
            </div>
        </div>
    );
}
export default ProductEdit;