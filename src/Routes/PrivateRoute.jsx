import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth()
    const location = useLocation()
    if(loading){
        return <div className="min-h-[70vh] flex items-center justify-center">
            <span className="loading loading-spinner loading-md text-blue-500"></span>
        </div>
    }
    if(user){
        return children;
    } else {
      return  <Navigate state={location.pathname}  to='/login'></Navigate>
    }
};

export default PrivateRoute;