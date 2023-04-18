import Profile from "../components/users/Profile/Profile";
import PublicOneCollection from "../components/PublicCollections/PublicOneCollection";
import CardsGallery from "../components/games/CardsGallery";
import ContentCardInfo from "../components/PrivateCollections/OneCollection/ContentCardInfo";
import Pairs from "../components/games/Pairs";
import TestCard from "../components/games/TestCard";
import TimeCard from "../components/games/TimeCard";
import WriteCard from "../components/games/WriteCard";
import CategoriesManager from "../components/CategorySelection/CategoriesManager";
import PublicContentCardInfo from "../components/PublicCollections/PublicContentCardInfo";
import MainPage from "../components/users/Login/MainPage";
import Login from "../components/users/Login/Login";
import AboutPage from "../components/AboutPage/AboutPage";
import ForgotPassword from "../components/users/Login/ForgotPassword";
import Collections from "../components/CollectionsCommon/Collections";
import UserOneCollection from "../components/PrivateCollections/OneCollection/UserOneCollection";
import PublicCollectionsView from "../components/PublicCollections/PublicOneCollection";
import EditCard from "../components/PrivateCollections/OneCollection/EditCard";
import PrintingForm from "../components/Printing/PrintingForm";

export const GO_TO = {
  about: "/about",
  login: "/login",
  shareManager: "/collections/shared",
  myCollect: "/collections/my",
  pubCollect: "/collections/pub",
  editCard: "/collections/my/edit",
  profile: "/profile",
  print: "/print",
};

export const publicRoutes = [
  { path: "/about", element: <MainPage />, nameNav: "About" },
  { path: "/login/:email", element: <Login />, nameNav: "" },
  { path: "/home", element: <Login />, nameNav: "" },
  { path: "/login", element: <Login />, nameNav: "Login" },
  { path: "/*", element: <Login />, nameNav: "" },
  {
    path: "/resetpassword/:resetToken",
    element: <ForgotPassword />,
    nameNav: "",
  },
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
  { path: "/collections/:tab/print/:id/:name", element: <PrintingForm /> },
  { path: "/profile", element: <Profile />, nameNav: "Profile" },
  { path: "/categories", element: <CategoriesManager />, nameNav: "" },
  { path: "/collections/my/edit/:id/:name/:item", element: <EditCard /> },
  { path: "/collections/my/:id/:name", element: <UserOneCollection /> },
  { path: "/collections/my/:id/:name/:item", element: <ContentCardInfo /> },

  {
    path: "/collections/pub/:id/:name/:item",
    element: <PublicContentCardInfo />,
  },
  { path: "/collections/pub/:id/:name", element: <PublicOneCollection /> },
  { path: "/collections/:tab", element: <Collections /> },

  { path: "/play_timecard/:tab/:id/:name", element: <TimeCard /> },
  { path: "/play_cards/:tab/:mode/:id/:name", element: <CardsGallery /> },
  { path: "/play_test/:tab/:id/:name", element: <TestCard /> },
  { path: "/play_write/:tab/:id/:name", element: <WriteCard /> },
  { path: "/play_pairs/:tab/:id/:name", element: <Pairs /> },

  {
    path: "/public",
    element: <PublicCollectionsView />,
  },
];
