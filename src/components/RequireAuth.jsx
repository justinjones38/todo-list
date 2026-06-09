import {useLocation, Outlet} from "react-router";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {Navigate} from "react-router"

export default function RequireAuth({children}){
  const {isAuthenticated, loading} = useAuth();
  const {pathname} = useLocation();

  console.log((isAuthenticated));
  if(loading) {
    return <h2>Loading</h2>
  }

    if(!isAuthenticated) {
      <h2>Loading ...</h2>
      return <Navigate to="/login" state={{state: {pathname}}} replace />
    } 
    return <Outlet />
  }