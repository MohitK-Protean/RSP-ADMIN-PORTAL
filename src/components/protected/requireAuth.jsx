import { useContext } from "react";
import { Navigate, Outlet,  } from "react-router-dom";
import AuthContext from "../../context/auth-context/index";
import URLS from "../../navigation/urls";


const RequireAuth = ({allowedAppType}) => {
    const authContext = useContext(AuthContext);
    return authContext.userDetails.type===allowedAppType ? (
      <Outlet  />
    ) : (
      <Navigate to={URLS.LOGIN} />
    );
  };
  
  export default RequireAuth;