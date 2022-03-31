import React, {useCallback, useEffect, useRef, useState} from 'react';
import  './addproduct.css'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {Checkbox, FormControlLabel, ImageList, ImageListItem, ImageListItemBar, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import agent from "../../../App/api/agent";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {FieldValues, useForm} from "react-hook-form";
import "@pathofdev/react-tag-input/build/index.css";
import { WithContext as ReactTags } from 'react-tag-input';

import { Upload} from 'antd';
import DeleteIcon from "@mui/icons-material/Delete";
import {Link} from "react-router-dom";
import ViewListIcon from "@mui/icons-material/ViewList";
import AddIcon from "@mui/icons-material/Add";
const Dragger = Upload.Dragger;

const KeyCodes = {
    comma: 188,
    enter: 13
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

function AddProduct() {
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
                console.log(data);
            })
        },
        multiple:true,
        fileList: fileList,
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

    const [colorList,setColorList] = useState<any[]>([])
    const handleOnChange = (e:any) => {

        if (e.target.checked === true){
          colorList.push(e.target.value)
        }
        function removeDuplicates(arr:any) {
            return colorList.filter((item,
                               index) => colorList.indexOf(item) === index);
        }
        setColorList(removeDuplicates(colorList))
      }
    const {register,control, reset, handleSubmit, watch, formState: {isDirty, isSubmitting} } = useForm({
        mode: 'all',
    });
    const watchFile = watch('file', null);
    useEffect(() => {
        return () => {
            if (watchFile) URL.revokeObjectURL(watchFile.preview);
        }
    }, [watchFile]);

    const [category,setCategory] = useState<any[]>([])
    const [color,setColor] = useState<any[]>([])
    const [discount,setDiscount] = useState<any[]>([])
    const [suggestions,setSuggestion] =useState<any[]>([])
    useEffect( ()=>{
        const fetchData = async () => {
            try {
                   await agent.Product.allTas().then((data)=>{
                       const tagList = data
                       const tagss = tagList.map(item => {
                           return {
                               id: item,
                               text: item
                           };
                       });
                       setSuggestion(tagss)
                    })
                const color =  await agent.Product.allColor();
                const datas = await agent.Admin.allCategory();
                const discount = await agent.Product.getProductDiscount();
                setCategory(datas)
                setColor(color)
                setDiscount(discount)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[])

    const handleSubmitData  = (data: FieldValues) => {
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
        for (const key in colorList) {
            formData.append('colorId', colorList[key])
        }
        for (const key in fileList) {
            formData.append('file', fileList[key])
        }
        agent.Product.createProduct(formData)
    }


    const [applydiscount,setapplyDiscount]=useState(false)
    return (
        <div className="containerProduct">
            <div className="productContainer">
                <div className="categoryFileds">
                    <Link to='/admin/products'>
                        <Button className="categoryAddButton" variant="contained"  startIcon={<ViewListIcon/>}>
                            Product List
                        </Button>
                    </Link>
                </div>
                <Container component="main">
                    <CssBaseline/>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <form method="post" onSubmit={handleSubmit(handleSubmitData)}>
                            <Box sx={{mt: 3}}>
                                <Grid container spacing={3}>
                                    <Grid item xs={7} sm={3}>
                                        <TextField
                                            autoComplete="given-name"
                                            {...register('name')}
                                            required
                                            fullWidth
                                            id="name"
                                            label="Product Name"
                                        />
                                    </Grid>
                                    <Grid item xs={7} sm={3}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="type"
                                            label="Product Type"
                                            {...register('type')}
                                        />
                                    </Grid>
                                    <Grid item xs={7} sm={3}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="price"
                                            label="Price"
                                            {...register('price')}
                                            type="number"
                                        />
                                    </Grid>
                                    <Grid item xs={7} sm={3}>
                                        <TextField
                                            required
                                            fullWidth
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
                                            >
                                                {category.map((value, index) =>
                                                    <MenuItem key={value.name} value={value.id}>{value.name}</MenuItem>
                                                )}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={7} sm={3}>
                                        <FormControlLabel control={

                                            <Checkbox {...register('featured')}
                                                       sx={{'& .MuiSvgIcon-root': {fontSize: 28}}}/>}
                                                          label="Is Featured"/><br/>
                                    </Grid>
                                    <Grid item xs={7} sm={3}>
                                        <FormControlLabel control={

                                            <Checkbox  onChange={(event) => setapplyDiscount(event.target.checked)}
                                                      sx={{'& .MuiSvgIcon-root': {fontSize: 28}}}/>}
                                                          label="Apply Discount"/><br/>
                                    </Grid>
                                    {applydiscount === true ?
                                        <>
                                            <Grid item xs={7} sm={3}>
                                                <FormControl sx={{minWidth: 120}}>
                                                    <InputLabel id="demo-controlled-open-select-label">Select
                                                        Discount </InputLabel>
                                                    <Select
                                                        id="demo-controlled-open-select"
                                                        label="Select Discount"
                                                        {...register('campaignId')}
                                                    >
                                                        {discount.map((value, index) =>
                                                            <MenuItem key={value.discount}
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
                                                    defaultValue="2022-05-24"
                                                />
                                            </Grid></> : null}

                                </Grid>
                                <Grid item sx={{mt: 2}}>
                                    <TextareaAutosize
                                        aria-label="minimum height"
                                        minRows={5}
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
                                        inputFieldPosition="bottom"
                                        autocomplete
                                    />
                                </Grid>

                                <Grid item xs={7} sx={{mt: 2}} sm={3}>
                                    {color.map((item, index) =>

                                        <Checkbox onChange={(e: any) => handleOnChange(e)}
                                                  style={{marginLeft: '2px', backgroundColor: `${item.colorCode}`}}
                                                  value={item.id}/>
                                    )}
                                </Grid>
                                <Upload.Dragger {...propsUpload} maxCount={4}>
                                    <p>Drag File here Or</p>
                                    <Button>Click Upload</Button>
                                </Upload.Dragger>
                                <ImageList sx={{ width: '100%', height: '100%'}} cols={4} >
                                    {FileSend.map((item,index)=>
                                        <ImageListItem key={index + 5} >
                                            <img
                                                src={item}
                                                srcSet={item}
                                                loading="lazy"
                                            />
                                            <ImageListItemBar
                                                actionIcon={
                                                    <Button onClick={()=> removePhoto(index,item)} endIcon={<DeleteIcon/>}/>
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
                        </form>
                    </Box>
                </Container>
            </div>
        </div>
    );
    }
export default AddProduct;