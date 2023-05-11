import {Outlet} from "react-router-dom";
import {Box} from "@mui/material"
import GlobalLoading from "../common/GlobalLoading";
import Topbar from "../common/Topbar";
import Footer from "../common/Footer";
import AuthModal from "../common/AuthModal";
import {useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {toast} from "react-toastify";
import userApi from "../../api/modules/user.api";
import favouriteApi from "../../api/modules/favourite.api";
import { setListFavourites ,setUser} from "../../redux/features/userSlice";
const MainLayout = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.auth);

  useEffect(() => {
    const authUser = async () =>{
      const {response, err} = await userApi.getInfo();
      if(response) dispatch(setUser(response));
      if(err) dispatch(setUser(null));
    }
    authUser();
  }, [dispatch])

  useEffect(()=>{
    const getFavourites = async () =>{
      const { response, err } = await favouriteApi.getList();
      if(response) dispatch(setListFavourites(response));
      if(err) toast.error(err.message);
    }
    if(user) getFavourites();
    if(!user) dispatch(setListFavourites([]));
  },[user, dispatch])
  
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