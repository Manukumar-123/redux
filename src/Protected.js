import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const Protected = () => {
const {login: {user}} = useSelector(res=>res);

    return(
        user ? <Outlet /> : <Navigate to="/" />
    )
}

export const LoginProtected = () => {
    const {login: {user}} = useSelector(res=>res);
    
        return(
            user ? <Navigate to="/profile" /> : <Outlet />
        )
    }