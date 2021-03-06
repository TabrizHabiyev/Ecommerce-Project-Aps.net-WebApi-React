import {Grid, TextareaAutosize, TextField} from '@mui/material';
import React, {useEffect, useState} from 'react';
import './productDetail.css'
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperClass,{Navigation,Thumbs} from "swiper";
import {useParams} from "react-router-dom";
import NotFound from "../404/NotFound";
import {Button} from "antd";
import 'antd/dist/antd.css';
import {useAppDispatch, useAppSelector} from "../../store/configureStore";
import {addBasketItemAsync, removeBasketItemAsync} from "../basket/basketSlice";
import {fetchProductAsync, productSelectors} from "./productSlice";
import agent from "../../App/api/agent";
import {useForm} from "react-hook-form";
import {toast, ToastContainer} from "react-toastify";

function ProductDetail() {
    const [activeThump,setActiveThumb] = useState<SwiperClass>();
    const {basket} = useAppSelector(store => store.basket);
    const dispatch = useAppDispatch();
    const {id} = useParams<{id:string}>();
    const product = useAppSelector(state => productSelectors.selectById(state,id!));
    const {status:productStatus} = useAppSelector(state => state.product)
    const [quantity,setQuantity] = useState(0);
    let item;
    if (product) item = basket?.items.find(i => i.productId === product.id);
     
    const [comment,setComment] = useState<any[]>([]);

    const {register,handleSubmit,setError,formState:{isSubmitting,errors,isValid}} = useForm({mode:'all'});
    const [submit,setSubmit] = useState(true);
    useEffect(()=>{
        agent.Comment.ById(id).then((data)=>{
            setComment(data)
        })
    },[submit])


    useEffect(()=>{
        if(item) setQuantity(item.quantity);
        if (!product) if (id != null) {
            dispatch(fetchProductAsync(id))
        }
    },[id,item,dispatch,product])

    const handleInputChange = (event:any)=>{
        if(event.target.value >= 0){
            setQuantity(parseInt(event.target.value));
        }
    }

    const handleUpdateCart = ()=>{
        if(!item || quantity > item.quantity){
            const updateQuantity = item ? quantity - item.quantity :quantity;
            if (product) {
                dispatch(addBasketItemAsync({productId: product.id, quantity: updateQuantity}))
            }
        }else{
            const updateQuantity = item.quantity - quantity
            if (product) {
                dispatch(removeBasketItemAsync({productId: product.id, quantity: updateQuantity}))
            }
        }
    }
    if (productStatus.includes('pending')) return <h1>Loading .....</h1>
    if (!product) return <NotFound/>
    return (
        <div className="productDetailContainer">
            <Grid container spacing={6}>
                <Grid item xs={6}>
                <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation,Thumbs]}
                thumbs={{swiper: activeThump}}
                grabCursor={true}
                className="product--image-slider"
                >
                    {product.photoUrl.map((item)=>(
                        <SwiperSlide key={item.publicId}>
                            <img alt='product name' src={item.photoUrl}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
                    <Swiper
                        loop={true}
                        spaceBetween={10}
                        onSwiper={setActiveThumb}
                        slidesPerView={4}
                        modules={[Navigation,Thumbs]}
                        className="product--image-slider-thumbs"
                    >
                        {product.photoUrl.map((item)=>(
                            <SwiperSlide key={item.publicId}>
                                <div className="product--image-slider-thumbs-wrapper">
                                    <img alt='product name' src={item.photoUrl}/>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Grid>
                <Grid item xs={6}>
                    <div className="product__details--info">
                            <h2 className="product__details--info__title mb-15">{product.name}</h2>
                            <div className="product__details--info__price mb-10">
                                <span className="current__price">$299.00</span>
                                <span className="old__price">$320.00</span>
                            </div>
                            <p className="product__details--info__desc mb-20">{product.description}
                            </p>
                            <div className="product__variant">
                                <div className="product__variant--list mb-20">
                                    <fieldset className="variant__input--fieldset">
                                        <legend className="product__variant--title mb-8">Color :</legend>
                                        <div className="variant__color d-flex">
                                            <div className="variant__color--list">
                                                color 1
                                            </div>
                                            <div className="variant__color--list">
                                              color 2
                                            </div>
                                            <div className="variant__color--list">
                                                color 3
                                            </div>
                                            <div className="variant__color--list">
                                                color 4
                                            </div>
                                        </div>
                                    </fieldset><br/>
                                    <div className="product__variant--list mb-15">
                                        <div className="product__details--info__meta">
                                            <p className="product__details--info__meta--list"><strong>Type: </strong>
                                                <span>{product.type}</span></p>
                                        </div>
                                        <div className="product__details--info__meta">
                                            <p className="product__details--info__meta--list"><strong>Category: </strong>
                                                <span>{product.categoryName}</span></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="product__variant--list quantity d-flex align-items-center mb-20">
                                    <div className="quantity__box">
                                      <TextField
                                            onChange={handleInputChange}
                                            variant='outlined'
                                            type='number'
                                            label='Quantity in cart'
                                            fullWidth
                                            value={quantity}
                                      />
                                    </div>
                                    <Button
                                        onClick={handleUpdateCart}
                                        disabled={item?.quantity === quantity || !item && quantity ===0}
                                        type="primary"
                                        className="quickview__cart--btn primary__btn">
                                        {item ? 'Update Quantity' : 'Add to Card'}
                                    </Button>
                                </div>
                                <div className="product__variant--list mb-15">
                                    <a className="variant__wishlist--icon mb-15" href="wishlist.html"
                                       title="Add to wishlist">
                                        <svg className="quickview__variant--wishlist__svg"
                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path
                                                d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
                                                fill="none" stroke="currentColor" stroke-linecap="round"
                                                stroke-linejoin="round" stroke-width="32"/>
                                        </svg>
                                        Add to Wishlist
                                    </a>
                                    <button className="variant__buy--now__btn primary__btn" type="submit">
                                        Buy it now
                                    </button>
                                </div>
                            </div>
                    </div>
                </Grid>
            </Grid>
            <div className='product__details--tab__section section--padding'></div>
            <div id="reviews">
                <div className="product__reviews">
                    <div className="product__reviews--header">
                        <h3 className="product__reviews--header__title mb-20">Customer Reviews</h3>
                        <div className="reviews__ratting d-flex align-items-center">
                            <span className="reviews__summary--caption">Based on 2 reviews</span>
                        </div>
                        <a className="actions__newreviews--btn primary__btn" href="#writereview">Write A Review</a>
                    </div>
                    <div className="reviews__comment--area">

                        {comment?.map((item,index)=>(
                            <div className="reviews__comment--list d-flex">
                                <div className="reviews__comment--thumbnail">
                                    <img src="assets/img/other/comment-thumb1.webp" alt="comment-thumbnail"/>
                                </div>
                                <div className="reviews__comment--content">
                                    <h4 className="reviews__comment--content__title">Richard Smith</h4>
                                    <p className="reviews__comment--content__desc">{item.text}</p>
                                    <span className="reviews__comment--content__date">{item.date.toString().split(0,10)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div id="writereview" className="reviews__comment--reply__area">
                            <h3 className="reviews__comment--reply__title mb-15">Add a review </h3>
                          <form method='post'   onSubmit={handleSubmit(
                              (data) =>
                                  agent.Comment.Create(data).then(()=>{
                                      toast.success('Your comment has been successfully added');
                                      setSubmit(false)
                                  }).catch((err)=>{
                                      toast.error(err.data.title)
                                  }))}>
                              <div className="row">
                                  <ToastContainer/>
                                  <div className="col-12 mb-10">
                                      <input type='hidden' {...register('productId')} value={id} name='productId'/>
                                      <TextField
                                          className="reviews__comment--reply__textarea"
                                          fullWidth
                                          label="Your Comments...."
                                          autoComplete="comment"
                                          {...register('text',{
                                              required:'Comment is required',
                                          })}
                                          error={!!errors.text}
                                          helperText={errors?.text?.message}
                                      />
                                  </div>
                              </div>
                              <button className="text-white primary__btn" data-hover="Submit" type="submit">SUBMIT</button>
                          </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProductDetail;