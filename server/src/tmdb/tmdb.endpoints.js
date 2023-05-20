import tmdbConfig from "./tmdb.config.js";

 const tmdbEndpoints = {
   // media lists
   mediaList: ({ mediaType, mediaCategory, page }) =>
     tmdbConfig.getUrl(`${mediaType}/${mediaCategory}`, {page}),
   // media details
   mediaDetail: ({ mediaType, mediaId }) =>
     tmdbConfig.getUrl(`${mediaType}/${mediaId}`),
     //    media genres
   mediaGenres: ({ mediaType }) => tmdbConfig.getUrl(`genre/${mediaType}/list`),
//    media credits
   mediaCredits: ({ mediaType, mediaId }) =>
     tmdbConfig.getUrl(`${mediaType}/${mediaId}/credits`),
    //  media videos
   mediaVideos: ({ mediaType, mediaId }) =>
     tmdbConfig.getUrl(`${mediaType}/${mediaId}/videos`),
    //  media recommendations
   mediaRecommend: ({ mediaType, mediaId }) =>
     tmdbConfig.getUrl(`${mediaType}/${mediaId}/recommendations`),
    //  media images
   mediaImages: ({ mediaType, mediaId }) =>
     tmdbConfig.getUrl(`${mediaType}/${mediaId}/images`),
    //  media search
   mediaSearch: ({ mediaType,query,page }) =>
     tmdbConfig.getUrl(`search/${mediaType}`,{query,page}),
    // person details
   personDetail: ({ personId }) =>
     tmdbConfig.getUrl(`person/${personId}`),
    // person media
   personMedias: ({ personId }) =>
     tmdbConfig.getUrl(`person/${personId}/combined_credits`),
 };
 export default tmdbEndpoints;