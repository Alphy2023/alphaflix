const baseUrl = process.env.TMDB_BASE_URL;
const KEY =process.env.TMDB_KEY;
 
// geturl method
const getUrl = (endpoint,params) =>{
    const qs = new URLSearchParams(params);
    return `${baseUrl}${endpoint}?api_key=${KEY}&${qs}`;
}
export default {getUrl};