import { useRoutes } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/User/Profile";
import MyTask from "./pages/MyTask/MyTask";
import Layout from "./components/Layouts/Layout";
import ProtectedRoute, {
  AdminProtectedRoute,
} from "./components/ProtectedRoute/ProtectedRoute";
import SignUp from "./pages/SignUp/SignUp";
import AllUser from "./pages/Admin/AllUsers";
import AddUser from "./pages/AddUser/AddUser";
import UpdateUser from "./pages/UpdateUser/UpdateUser";
import Notification from "./pages/Notification/Notification";

function App() {
  const router = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/sign-in",
      element: <SignIn />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    {
      path: "/admin",
      element: <AdminProtectedRoute />,
      children: [
        {
          path: "users",
          element: <AllUser />,
        },
        {
          path: "add-user",
          element: <AddUser />,
        },
        {
          path: "update-user",
          element: <UpdateUser />,
        },
      ],
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "user",
          element: <Layout />,
          children: [
            {
              path: "profile",
              element: <Profile />,
            },
            {
              path: "dashboard",
              element: <Dashboard />,
            },
            {
              path: "my-task",
              element: <MyTask />,
            },
            {
              path: "notification",
              element: <Notification />,
            },
          ],
        },
      ],
    },
  ]);
  return router;
}

export default App;
