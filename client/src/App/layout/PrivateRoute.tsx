import {useAppSelector} from "../../store/configureStore";
import {Route,Navigate} from "react-router-dom";

export default function PrivateRoute({children}:any){
    const{user} = useAppSelector(state => state.account);
    const childrenName = children.type.name;
    switch (childrenName) {
        case 'Login':
            return user === null ? children : <Navigate to="/" />;
            break;
        case 'Register':
            return user === null ? children : <Navigate to="/" />;
            break;
    }
}

