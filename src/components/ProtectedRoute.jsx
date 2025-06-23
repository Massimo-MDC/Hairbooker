import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


function ProtectedRoute({children, allowedRoles}){
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);

    if(!isAuthenticated){
        //se non loggato redirected to Login
        return <Navigate to='login' replace/>;
    }
    if(allowedRoles && !allowedRoles.includes(user.role)){
        //se loggato ma con il ruolo sbagliato redircted to Login
        return <Navigate to='login' replace/>;
    }

    //se tutto va bene
    return children;
}

export default ProtectedRoute;