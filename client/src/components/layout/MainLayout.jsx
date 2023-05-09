import {Outlet} from "react-router-dom";
import {Box} from "@mui/material"
import GlobalLoading from "../common/GlobalLoading";
import Topbar from "../common/Topbar";
import Footer from "../common/Footer";
import AuthModal from "../common/AuthModal";
const MainLayout = () => {
  return (
    <>
    {/* global loading */}
    <GlobalLoading/>
    {/* global loading */}
    {/* auth modal */}
    <AuthModal/>
    {/* auth modal */}
    <Box display="flex" minHeight="100vh">
        {/* header */}
        <Topbar/>
        {/* header */}

        {/* main */}
        <Box
        component="main"
        flexGrow={1}
        overflow="hidden"
        minHeight="100vh"
        >
        <Outlet/>
        </Box>
        {/* main */}
    </Box>
    {/* footer */}
    <Footer/>
    {/* footer */}
    </>
  )
}

export default MainLayout