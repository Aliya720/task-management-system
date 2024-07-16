import { useRoutes } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/User/Profile";
import MyTask from "./pages/MyTask/MyTask";
import Layout from "./components/Layouts/Layout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SignUp from "./pages/SignUp/SignUp";

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
          ],
        },
      ],
    },
  ]);
  return router;
}

export default App;
