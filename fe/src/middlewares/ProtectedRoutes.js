import {Outlet} from "react-router-dom";
import Login from "../pages/Login";


const useAuth = () => {
    return JSON.parse(localStorage.getItem('auth'));
}

const ProtectedRoutes = () => {
    const isAuth = useAuth()
    return isAuth ? <Outlet /> : <Login />;
}

export default ProtectedRoutes;