import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

function Layout()
{
    return(
        <>
        <Navbar/>
        <Outlet/>
        </>


    )
}

export default Layout