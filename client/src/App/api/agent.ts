import  axios,{AxiosError,AxiosResponse} from "axios";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {store} from "../../store/configureStore";
import {PaginatedResponse} from "../../models/pagination";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));
axios.defaults.baseURL = 'http://localhost:5029/api/';
axios.defaults.withCredentials = true;
const responseBody = (response: AxiosResponse) => response.data;
let user = localStorage.getItem('user');
if (user) {
    axios.interceptors.request.use((config) => {
    let token = store.getState().account.user?.token;
    if(token){
        return {
            ...config,
            headers: {
                ...config.headers,
                'Authorization': `Bearer ${token}`
            }
        }
    }
}, (error) => {
    return Promise.reject(error);
});
}
axios.interceptors.response.use(async response=>{
    await sleep()
    const pagination = response.headers['pagination'];
    if (pagination){
        response.data = new PaginatedResponse(response.data,JSON.parse(pagination))
        return response;
    }
    return response
 },
    (error:AxiosError)=>{

     const { data, status } = error.response!;
        switch (status) {
            case 400:
                if (data.errors) {
                    const modelStateErrors: string[] = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modelStateErrors.push(data.errors[key])
                        }
                    }
                    throw modelStateErrors.flat();
                }
                toast.error(data.title);
                break;
         case 401:
             toast.error(data.title)
             break;
         case 500:
             // navigate('/server-error');
             break;
         case 404:
             toast.error(data.title);
             break;
         default:
             break;
     }
     return Promise.reject(error.response);
   });

const  requests ={
    get:(url:string,params?:URLSearchParams)=>axios.get(url,{params}).then(responseBody),
    post:(url:string,body:{})=>axios.post(url,body).then(responseBody),
    put:(url:string,body:{})=>axios.put(url,body).then(responseBody),
    delete:(url:string)=>axios.delete(url).then(responseBody),
    postForm: (url: string, data: FormData) => axios.post(url, data, {
        headers: {'Content-type': 'multipart/form-data'}
    }).then(responseBody),
    putForm: (url: string, data: FormData) => axios.put(url, data, {
        headers: {'Content-type': 'multipart/form-data'}
    }).then(responseBody)
}

function createFormData(item: any) {
    let formData = new FormData();
    for (const key in item) {
        formData.append(key, item[key])
    }
    return formData;
}

const Admin = {
    createCategory: (category: any) => requests.postForm('category', createFormData(category)),
    updateCategory: (category: any) => requests.putForm('category', createFormData(category)),
    deleteCategory: (id: string) => requests.delete(`category/${id}`),
    getCategoryById: (id: string) => requests.get(`category/${id}`),
    allCategory: () => requests.get(`category`)
}


const Category = {
    getOllCategory:() => requests.get('category')
}
const Product = {
    getProductById: (id: string | undefined) => requests.get(`product/${id}`),
    createProduct: (product: any) => requests.post('product', product),
    updateProduct: (product: any) => requests.put('product', product),
    deleteProduct: (id: string) => requests.delete(`product/${id}`),
    allProduct: (params:URLSearchParams) => requests.get(`product/getProducts`,params),
    allTas: () => requests.get(`product/tags`),
    getProductDiscount: () => requests.get(`product/compaign`),
    allColor: () => requests.get(`product/ollColor`),
    getProductByCategory:(id:string) => requests.get(`product/id?categoryId=${id}`)
}

const ProductPhoto = {
    deletePhoto: (id:string) => requests.delete(`productphoto/${id}`),
}

const Account = {
    login:(value:any) => requests.post('user/login',value),
    register:(value:any) => requests.post('user/register',value),
    currentUser:() => requests.get('account/profile'),
}

const Basket ={
    get:()=> requests.get('basket'),
    addItem:(productId:string,quantity =1)=>requests.post(`basket?productId=${productId}&quantity=${quantity}`,{}),
    removeItem:(productId:string,quantity =1)=>requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
}

const agent ={
    Account,
    Admin,
    Product,
    Category,
    ProductPhoto,
    Basket
}

export default agent