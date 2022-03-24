import  axios,{AxiosError,AxiosResponse} from "axios";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import {store} from "../../store/configureStore";
const sleep = ()=> new Promise(resolve => setTimeout(resolve,500));


axios.defaults.baseURL = 'https://localhost:7029/api/';


const responseBody =(response:AxiosResponse)=> response.data;

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
    get:(url:string)=>axios.get(url).then(responseBody),
    post:(url:string,body:{})=>axios.post(url,body).then(responseBody),
    put:(url:string,body:{})=>axios.put(url,body).then(responseBody),
    delete:(url:string)=>axios.delete(url).then(responseBody),
}

const Account = {
    login:(value:any) => requests.post('user/login',value),
    register:(value:any) => requests.post('user/register',value),
    currentUser:() => requests.get('account/profile'),
}

const agent ={
    Account
}

export default agent