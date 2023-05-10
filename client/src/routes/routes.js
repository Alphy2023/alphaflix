
import HomePage from "../views/HomePage"
import PersonDetail from "../views/PersonDetail"
import FavouriteList from "../views/FavouriteList"
import MediaList from "../views/MediaList"
import MediaDetail from "../views/MediaDetail"
import MediaSearch from "../views/MediaSearch"
import PasswordUpdate from "../views/PasswordUpdate"
import ReviewList from "../views/ReviewList"
import ProtectedPage from "../components/common/ProtectedPage"
export const routesGen = {
  home: "/",
  mediaList: (type) => `/${type}`,
  mediaDetail: (type, id) => `/${type}/${id}`,
  mediaSearch:"/search",
  person:(id)=>`/person/${id}`,
  favoriteList:"/favorites",
  reviewList:"/reviews",
  passwordUpdate:"password-update"
};

const routes = [
  {
    index: true,
    element: <HomePage />,
    state: "home",
  },
  {
    path: "/person/:personId",
    element: <PersonDetail />,
    state: "home",
  },
  {
    path: "/search",
    element: <MediaSearch />,
    state: "search",
  },
  {
    path: "/password-update",
    element: (
      <ProtectedPage>
        <PasswordUpdate />
      </ProtectedPage>
    ),
    state: "password-update",
  },

  {
    path: "/favorites",
    element: (
      <ProtectedPage>
        <FavouriteList />
      </ProtectedPage>
    ),
    state: "favorites",
  },

  {
    path: "/reviews",
    element: (
      <ProtectedPage>
        <ReviewList />
      </ProtectedPage>
    ),
    state: "reviews",
  },

  {
    path: "/:mediaType",
    element: <MediaList />,
  },
  {
    path: "/:mediaType/:mediaId",
    element: <MediaDetail />,
  },
];

export default routes;