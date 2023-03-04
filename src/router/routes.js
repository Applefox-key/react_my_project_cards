import UserOneCollection from "../components/collections/usersC/UserOneCollection";

import Profile from "../components/users/Profile/Profile";
import PublicCollections from "../components/collections/publicC/PublicCollections";
import PublicOneCollection from "../components/collections/publicC/PublicOneCollection";

import CardsGallery from "../components/collections/games/CardsGallery";
import ContentCardInfo from "../components/collections/usersC/ContentCardInfo";
import Pairs from "../components/collections/games/Pairs";
import Collections from "../components/collections/Collections";
import TestCard from "../components/collections/games/TestCard";
import TimeCard from "../components/collections/games/TimeCard";
import WriteCard from "../components/collections/games/WriteCard";
import CategoriesManager from "../components/CategorySelection/CategoriesManager";
import SharedColectManager from "../components/collections/SharedColectManager";
import PublicContentCardInfo from "../components/collections/publicC/PublicContentCardInfo";
import MainPage from "../components/users/Login/MainPage";
import Login from "../components/users/Login/Login";
import AboutPage from "../components/AboutPage/AboutPage";

export const publicRoutes = [
  { path: "/about", element: <MainPage />, nameNav: "About" },
  { path: "/login/:email", element: <Login />, nameNav: "" },
  { path: "/home", element: <Login />, nameNav: "" },
  { path: "/login", element: <Login />, nameNav: "Login" },
  { path: "/*", element: <Login />, nameNav: "" },
];

export const privateRoutes = [
  { path: "/about", element: <AboutPage />, nameNav: "About" },
  { path: "/*", element: <Collections />, nameNav: "" },

  {
    path: "/collections/my",
    element: <Collections />,
    nameNav: "My collections",
  },
  {
    path: "/collections/pub",
    element: <Collections />,
    nameNav: "Public collections",
  },
  { path: "/profile", element: <Profile />, nameNav: "Profile" },
  { path: "/categories", element: <CategoriesManager />, nameNav: "" },

  { path: "/collections/my/:id/:name", element: <UserOneCollection /> },
  { path: "/collections/my/:id/:name/:item", element: <ContentCardInfo /> },
  {
    path: "/collections/pub/:id/:name/:item",
    element: <PublicContentCardInfo />,
  },
  { path: "/collections/pub/:id/:name", element: <PublicOneCollection /> },
  { path: "/collections/:tab", element: <Collections /> },
  { path: "/collections/shared", element: <SharedColectManager /> },

  { path: "/play_timecard/:tab/:id/:name", element: <TimeCard /> },
  { path: "/play_cards/:tab/:mode/:id/:name", element: <CardsGallery /> },
  { path: "/play_test/:tab/:id/:name", element: <TestCard /> },
  { path: "/play_write/:tab/:id/:name", element: <WriteCard /> },
  { path: "/play_pairs/:tab/:id/:name", element: <Pairs /> },

  {
    path: "/public",
    element: <PublicCollections />,
  },
];
