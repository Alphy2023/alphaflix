import HomeOutlinedIcon from "@mui/icons-material/HomeOutlinedIcon";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlinedIcon";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlinedIcon";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlinedIcon";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlinedIcon";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlinedIcon";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlinedIcon";
const main = [
  {
    display: "home",
    path: "/",
    icon: <HomeOutlinedIcon />,
    state: "home",
  },
  {
    display: "movies",
    path: "/movie",
    icon: <SlideshowOutlinedIcon />,
    state: "movie",
  },
  {
    display: "tv series",
    path: "/tv",
    icon: <LiveTvOutlinedIcon />,
    state: "tv",
  },
  {
    display: "search",
    path: "/search",
    icon: <SearchOutlinedIcon />,
    state: "search",
  },
];

const user = [
  {
    display: "favorites",
    path: "/favorites",
    icon: <FavoriteOutlinedIcon />,
    state: "favorite",
  },
  {
    display: "reviews",
    path: "/reviews",
    icon: <RateReviewOutlinedIcon />,
    state: "reviews",
  },
  {
    display: "password update",
    path: "/password-update",
    icon: <LockResetOutlinedIcon />,
    state: "password_update",
  },
];

const menuConfigs = {main, user};

export default menuConfigs;