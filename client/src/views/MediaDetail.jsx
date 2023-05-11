import React from 'react'
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
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
import CastSlide from "../components/common/CastSlide"
import CustomHelmet from "../components/common/CustomHelmet"
import MediaVideoSlide from "../components/common/MediaVideoSlide";
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
  },[mediaType,mediaId,dispatch ]);
  const onFavouriteClick = async () =>{
    if(!user) dispatch(setAuthModalOpen(true));

    if(onRequest) return;

    if(isFavorite){
      onRemoveFavourite();
      return;
    } 
    setOnRequest(true);

    const body = {
      mediaId: media?.id,
      mediaType: mediaType,
      mediaPoster: media?.poster_path,
      mediaRate: media?.vote_average,
      mediaTitle: media?.title || media?.name
    }
    const {response,err} = await favouriteApi.add(body);

    setOnRequest(false);
    if(err) toast.error(err?.message)
    if(response){
      dispatch(addFavourite(response));
      setIsFavorite(true)
      toast.success("Successfully added to favourite!")
    }
  }
  const onRemoveFavourite = async () =>{
    if(onRequest) return;
    setOnRequest(true);

    const favorite = listFavourites?.find(
      (e) => e.mediaId?.toString() === media?.id?.toString()
    );
    const {response,err} = await favouriteApi.remove({favouriteId:favorite?.id})
  
    if(err) toast.error(err.massage);
    if(response){
      dispatch(removeFavourite(favorite));
      setIsFavorite(false);
      setOnRequest(false);
      toast.success("Remove favorite success!");
    }

  }
  return (

   media ? (
    <>
    <CustomHelmet title={media?.title || media?.name }/>
      <ImageHeader
        imgPath={tmdbConfigs.backdropPath(
          media?.backdrop_path || media?.poster_path
        )}
      />
      <Box
        sx={{
          color: "primary.contrastText",
          ...uiConfigs.style.mainContent,
        }}
      >
        {/* media content */}
        <Box
          sx={{
            marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
            }}
          >
            {/* poster */}
            <Box
              sx={{
                width: { xs: "70%", sm: "50%", md: "40%" },
                margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" },
              }}
            >
              <Box
                sx={{
                  paddingTop: "140%",
                  ...uiConfigs.style.backgroundImage(
                    tmdbConfigs.posterPath(
                      media?.poster_path || media?.backdrop_path
                    )
                  ),
                }}
              />
            </Box>
            {/* poster */}

            {/* media info */}
            <Box
              sx={{
                width: { xs: "100%", md: "60%" },
                color: "text.primary",
              }}
            >
              <Stack spacing={5}>
                {/* title */}
                <Typography
                variant="h4"
                fontSize={{ xs:"2rem" ,md:"2rem",lg:"4rem"}}
                fontWeight="700"
                sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                >
                  {`${media?.title || media?.name} ${
                    mediaType === tmdbConfigs.mediaType.movie
                      ? media?.release_date?.split("-")[0]
                      : media?.first_air_date?.split("-")[0]
                  }`}
                </Typography>
                {/* title */}
                {/* rate and genres */}
                <Stack direction="row" spacing={1} alignItems="center"> 
                  {/* rate */}
                  <CircularRate value={media?.vote_average}/>
                  {/* rate */}
                  <Divider orientation="vertical"/>
                  {/* genres */}
                  {genres?.map((genre,index)=>(
                    <Chip
                    key={index}
                    label={genre?.name}
                    variant="filled"
                    color="primary"
                    />
                  ))}
                  {/* genres */}
                </Stack>
                {/* rate and genres */}
                {/* overview */}
                <Typography
                variant="body1"
                sx={{ ...uiConfigs.style.typoLines(5) }}

                >
                  {media?.overview}
                </Typography>
                {/* overview */}
                {/* buttons */}
                <Stack direction="row" spacing={1}>
                  <LoadingButton
                  variant="text"
                  sx={{ 
                    width:"max-content",
                    "& .MuiButton-startIcon" :{marginRight:"0"}
                   }}
                   size="large"
                   startIcon={isFavorite ? <FavoriteIcon/> :
                  <FavoriteBorderOutlinedIcon/>}
                  loadingPosition="start"
                  loading={onRequest}
                  onClick={onFavouriteClick}

                  />
                  <Button
                  variant="contained"
                  sx={{ width:"max-content"}}
                  size="large"
                  startIcon={<PlayArrowIcon/>}
                  onClick={()=>videoRef?.current?.scrollIntoView()}
                  >
                    watch now
                  </Button>
                </Stack>
                {/* buttons */}

                {/* cast */}
                <Container header="Cast">
                  <CastSlide casts={media?.credits?.cast}/>
                </Container>
                {/* cast */}
              </Stack>
            </Box>
            {/* media info */}
          </Box>
        </Box>
        {/* media content */}
        {/* media videos */}
        <div ref={videoRef} style={{paddingTop:"2rem"}}>
            <Container header="videos">
                <MediaVideoSlide videos={media?.videos?.results}/>
            </Container>
        </div>
        {/* media videos */}
      </Box>
    </>
  ) : null
  )

}

export default MediaDetail;