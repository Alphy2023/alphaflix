import {LoadingButton} from "@mui/lab"
import {Box, Button, Stack, Typography} from "@mui/material";
import { useEffect, useState, useMemo, useRef } from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import tmdbConfigs from "../api/configs/tmdb.configs"
import mediaApi from "../api/modules/media.api";
import uiConfigs from "../configs/ui.configs";
import HeroSlide from "../components/common/HeroSlide";
import MediaGrid from "../components/common/MediaGrid";
import {setAppState} from "../redux/features/appStateSlice"
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import {toast} from "react-toastify";
const MediaList = () => {
  const {mediaType} = useParams();
  const [medias, setMedias] = useState([]);
  const [currCategory, setCurrCategory] = useState(0)
  const [mediaLoading, setMediaLoading] = useState(false)
  const [currPage,setCurrPage] = useState(1)
  const lastMediaRef = useRef(null);

  const dispatch = useDispatch();

  const mediaCategories = useMemo(()=> ["popular", "top_rated"], []);

  const category =["popular","top rated"];

  useEffect(()=>{
    dispatch(setAppState(mediaType))
    window.scrollTo(0,0);
  },[mediaType, dispatch])
  
  useEffect(()=>{
    const getMedias = async () =>{
      if(currPage === 1) dispatch(setGlobalLoading(true));
      setMediaLoading(true);

      const {response, err} = await mediaApi.getList({
        mediaType,
        mediaCategory: mediaCategories[currCategory],
        page:currPage
      });
      setMediaLoading(false);
      dispatch(setGlobalLoading(false));

      if(err) toast.error(err?.message);
      if(response){
        if(currPage !==1) setMedias(m => [...m, ...response?.results])
        else setMedias([...response?.results])
      }

    }
 
    getMedias();
  },[
    mediaType,
    currCategory,
    currPage,
     mediaCategories,
    dispatch
  ]);

  const onCategoryChange = (categoryIndex) => {
    if(currCategory === categoryIndex) {return;}
    else{
      setMedias([]);
      setCurrPage(1);
      setCurrCategory(categoryIndex);
    }
  
  }

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = (e) => {
      e.preventDefault();
      if (
        lastMediaRef.current &&
        lastMediaRef.current.getBoundingClientRect().bottom <=
          window.innerHeight
      ) {
       setCurrPage(currPage + 1);
      }
    };

    // Add event listener for scroll events
    window.addEventListener("scroll", handleScroll);

    // Cleanup: remove event listener when component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currPage, lastMediaRef]);
  return (
    <>
      <HeroSlide
        mediaType={mediaType}
        mediaCategory={mediaCategories[currCategory]}
      />

      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack
          spacing={2}
          direction={{ s: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginBottom: 4 }}
        >
          <Typography fontWeight="700" variant="h5">
            {mediaType === tmdbConfigs.mediaType.movie ? "Movies" : "TV Series"}
          </Typography>
          <Stack direction="row" spacing={2}>
            {category?.map((cat, index) => (
              <Button
                key={index}
                size="large"
                variant={currCategory === index ? "contained" : "text"}
                sx={{
                  color:
                    currCategory === index
                      ? "primary.contrastText"
                      : "text.primary",
                }}
                onClick={() => onCategoryChange(index)}
              >
                {cat}
              </Button>
            ))}
          </Stack>
        </Stack>
        <MediaGrid medias={medias} mediaType={mediaType} />
        {medias?.length > 0 && (
          <Stack
            spacing={2}
            ref={lastMediaRef}
            sx={{
              marginTop: 8,
            }}
          >
            <LoadingButton loading={mediaLoading}></LoadingButton>
          </Stack>
        )}
      </Box>
    </>
  );
}

export default MediaList;