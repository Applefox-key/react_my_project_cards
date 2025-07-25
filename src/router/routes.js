import Profile from "../components/users/Profile/Profile";
import PublicOneCollection from "../components/Collections/PublicCollections/PublicOneCollection";
import CardsGallery from "../components/games/Gallery/CardsGallery";
import UserItemCardView from "../components/Collections/UserOneCollection/UserItemCardView";
import Pairs from "../components/games/Pairs/Pairs";
import TestCard from "../components/games/TestOpt/TestCard";
import TimeCard from "../components/games/Time/TimeCard";
import WriteCard from "../components/games/Write/WriteCard";
import CategoriesManager from "../components/CategorySelection/CategoriesManager";
import PublicItemCardView from "../components/Collections/PublicCollections/PublicItemCardView";
import MainPage from "../components/users/Login/MainPage";
import Login from "../components/users/Login/Login";
import FAQPage from "../components/AboutPage/FAQPage";
import ForgotPassword from "../components/users/Login/ForgotPassword";
import Collections from "../components/Collections/CollectionsPage/Collections";
import UserOneCollection from "../components/Collections/UserOneCollection/UserOneCollection";
import PublicCollectionsView from "../components/Collections/PublicCollections/PublicOneCollection";
import EditCard from "../components/Collections/UserOneCollection/EditCard";
import PrintingForm from "../components/Printing/PrintingForm";
import PlaylistsPage from "../components/Playlists/PlaylistsPage";
import PartCard from "../components/games/Parts/PartCard";
import Home from "../components/HomePage/Home";
import UserLibrary from "../components/users/UserLibrary";
import PlayListEdit from "../components/Playlists/Edit/PlayListEdit";

export const GO_TO = {
  about: "/about",
  login: "/login",
  shareManager: "/collections/shared",
  myCollect: "/collections/my",
  organizer: "/collections/my/organizer",
  pubCollect: "/collections/pub",
  editCard: "/collections/my/edit",
  profile: "/profile",
  print: "/print",
  playlists: "/playlist",
  editPlaylist: "/playlist/my/edit",
  categoriesManager: "/categories",
  library: "/myLibrary",
};

export const publicRoutes = [
  { path: "/home", element: <Home />, nameNav: "Home" },
  { path: "/about", element: <MainPage />, nameNav: "" },
  { path: "/login/:email", element: <Login />, nameNav: "" },
  { path: "/login", element: <Login />, nameNav: "" },
  { path: "/*", element: <Home />, nameNav: "" },
  {
    path: "/resetpassword/:resetToken",
    element: <ForgotPassword />,
    nameNav: "",
  },
];

export const privateRoutes = [
  // { path: "/home", element: <Home />, nameNav: "Home" },
  { path: "/home", element: <Home /> },
  { path: "/about", element: <FAQPage /> },
  {
    path: "/*",
    element: <Collections />,
    nameNav: "",
  },

  {
    path: "/collections/my",
    element: <Collections />,
    nameNav: "Collections",
    group: "My library",
    groupPath: "/MyLibrary",
  },
  {
    path: "/playlist",
    element: <PlaylistsPage />,
    nameNav: "Playlists",
    group: "My library",
    groupPath: "/MyLibrary",
  },
  {
    path: "/playlist/my/edit/:id/:name",
    element: <PlayListEdit />,
  },
  {
    path: "/categories",
    element: <CategoriesManager />,
    nameNav: "Categories",
    group: "My library",
    groupPath: "/MyLibrary",
  },
  {
    path: "/collections/pub",
    element: <Collections />,
    nameNav: "Public library",
  },

  { path: "/collections/:tab/print/:id/:name", element: <PrintingForm /> },
  { path: "/profile", element: <Profile />, nameNav: "" },

  { path: "/collections/my/edit/:id/:name/:item", element: <EditCard /> },
  { path: "/collections/my/:id/:name", element: <UserOneCollection /> },
  {
    path: "/collections/my/card/:id/:name/:item",
    element: <UserItemCardView />,
  },
  { path: "/collections/my/:categoryid", element: <Collections /> },
  {
    path: "/collections/pub/card/:id/:name/:item",
    element: <PublicItemCardView />,
  },
  { path: "/collections/pub/:id/:name", element: <PublicOneCollection /> },
  { path: "/collections/:tab", element: <Collections /> },
  { path: "/mylibrary", element: <UserLibrary /> },

  { path: "/play_timecard/:tab/:id/:name", element: <TimeCard /> },
  { path: "/play_cards/:tab/:mode/:id/:name", element: <CardsGallery /> },
  { path: "/play_test/:tab/:mode/:id/:name", element: <TestCard /> },
  { path: "/play_write/:tab/:mode/:id/:name", element: <WriteCard /> },
  { path: "/play_pairs/:tab/:id/:name", element: <Pairs /> },
  { path: "/play_parts/:tab/:mode/:id/:name", element: <PartCard /> },

  {
    path: "/public",
    element: <PublicCollectionsView />,
  },
];
