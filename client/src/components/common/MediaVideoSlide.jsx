import {Box} from "@mui/material";
import {useEffect, useRef} from "react";
import {SwiperSlide} from "swiper/react";
import tmdbConfigs from "../../api/configs/tmdb.configs";

import NavigationSwiper from "./NavigationSwiper";
const MediaVideo = ({video}) =>{
    const iframeRef = useRef();

    useEffect(()=>{
        const height = iframeRef.current.offsetWidth * 9 / 16 + "px"
        iframeRef.current.setAttribute("height",height);
    },[]);

    return (
        <Box
        sx={{ height:"max-content" }}
        >
        <iframe
        key={video?.key}
        src={tmdbConfigs.youtubePath(video?.key)}
        ref={iframeRef}
        title={{ border:0 }}
        style={{border:0}}
        >
            
        </iframe>
        </Box>
    )
}

const MediaVideoSlide = ({videos}) =>{
    console.log(videos)
    return (
       <NavigationSwiper>
        {
            videos?.map((video,index)=>(
                <SwiperSlide key={index}>
                    <MediaVideo video={video}/>
                </SwiperSlide>
            ))
        }
       </NavigationSwiper>
    )
}
export default MediaVideoSlide;