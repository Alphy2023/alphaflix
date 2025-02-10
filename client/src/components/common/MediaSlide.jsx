import {useEffect,useState} from "react";
import AutoSwiper from "./AutoSwiper";
import {SwiperSlide} from "swiper/react";
import {Box,Skeleton} from "@mui/material"
import mediaApi from "../../api/modules/media.api";
import {toast} from "react-toastify";
import MediaItem from "./MediaItem"
const MediaSlide = ({mediaType,mediaCategory}) => {
  const [medias,setMedias] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getMedias = async () =>{
      setLoading(true)
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page:1
      });
      setLoading(false)
      if(response) setMedias(response?.results)
      if(err) toast.error(err.message);
    }
    getMedias();
  }, [mediaType, mediaCategory]);
  return (
    <AutoSwiper>
      {medias?.map((media, index) => (
        <SwiperSlide key={index}>
          {loading ? (
              <Box sx={{ pt: 0.5, margin:"5px" }}>
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  sx={{ height: 190 }}
                />
              </Box>
          ) : (
            <MediaItem media={media} mediaType={mediaType} />
          )}
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
}

export default MediaSlide;