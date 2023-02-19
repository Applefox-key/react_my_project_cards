import UserOneCollection from "../components/collections/usersC/UserOneCollection";
import Login from "../components/users/Login";

import Profile from "../components/users/Profile";
import PublicCollections from "../components/collections/publicC/PublicCollections";
import PublicOneCollection from "../components/collections/publicC/PublicOneCollection";

import CardsGallery from "../components/collections/games/CardsGallery";
import ContentCardInfo from "../components/collections/usersC/ContentCardInfo";
import Pairs from "../components/collections/games/Pairs";
import Collections from "../components/collections/Collections";
import TestCard from "../components/collections/games/TestCard";
import TimeCard from "../components/collections/games/TimeCard";
import WriteCard from "../components/collections/games/WriteCard";
import AdminPage from "../components/admin/AdminPage";
import AdminPbCollection from "../components/admin/AdminPbCollection";
import CategoriesManager from "../components/CategorySelection/CategoriesManager";
import SharedColectManager from "../components/collections/SharedColectManager";
import PublicContentCardInfo from "../components/collections/publicC/PublicContentCardInfo";

export const publicRoutes = [
  { path: "/login/:email", element: <Login />, nameNav: "" },
  { path: "/*", element: <Login />, nameNav: "" },
];
export const adminRoutes = [
  { path: "/main", element: <AdminPage />, nameNav: "Main" },
  { path: "/admin/pub", element: <AdminPbCollection />, nameNav: "Public" },
  { path: "/*", element: <AdminPage />, nameNav: "" },
];
export const privateRoutes = [
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
