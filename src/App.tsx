import { useRoutes } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/User/Profile";
import MyTask from "./pages/MyTask/MyTask";
import Layout from "./components/Layouts/Layout";

function App() {
  const router = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/user",
          element: <Home />,
        },
        {
          path: "/sign-in",
          element: <SignIn />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/my-task",
          element: <MyTask />,
        },
      ],
    },
  ]);
  return router;
}

export default App;
