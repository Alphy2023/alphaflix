import React from 'react'
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import {LoadingButton} from "@mui/lab"
import {Box,Button, Chip, Divider,Stack,Typography} from "@mui/material"
import {useEffect,useState,useRef} from "react";
import {useDispatch,useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import CircularRate from "../components/common/CircularRate";
import Container from "../components/common/Container";
import ImageHeader from "../components/common/ImageHeader";
import uiConfigs from "../configs/ui.configs";
import tmdbConfigs from "../api/configs/tmdb.configs";
import mediaApi from "../api/modules/media.api";
import favouriteApi from "../api/modules/favourite.api"
import {setGlobalLoading} from "../redux/features/globalLoadingSlice"
import {setAuthModalOpen} from "../redux/features/authModalSlice"
import {addFavourite,removeFavourite} from "../redux/features/userSlice"
const MediaDetail = () => {
  const {mediaType,mediaId} = useParams();
  const {user,listFavourites} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const [media,setMedia] = useState();
  const [isFavorite,setIsFavorite] = useState(false)
  const [onRequest,setOnRequest] = useState(false)
  const [genres,setGenres] = useState([]);

  const videoRef = useRef(null);
  useEffect(()=>{
    const getMedia = async () =>{
      dispatch(setGlobalLoading(true));
      const {response,err} = await mediaApi.getDetail({mediaType,mediaId});
      dispatch(setGlobalLoading(false));
      
      if(response) {
        setMedia(response)
        setIsFavorite(response?.isFavourite);
        setGenres(response?.genres?.splice(0,2));
      }
      if(err) toast.error(err?.message)
    };
    getMedia(); 
  },[mediaType,mediaId,dispatch ])
  return media ? (
    <>
      <ImageHeader
        imgPath={tmdbConfigs.backdropPath(
          media?.backdrop_path || media?.poster_path
        )}
      />
      <Box
      sx={{ 
        color:"primary.contrastText",
        ...uiConfigs.style.mainContent
       }}
      >

      </Box>
    </>
  ) : null;
}

export default MediaDetail;