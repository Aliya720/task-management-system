import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Layout = () => {
  // if (authContext?.isLoading) {
  //   return (
  //     <LoadingOverlay
  //       zIndex={1000}
  //       visible={visible}
  //       overlayProps={{ radius: "sm", blur: 2 }}
  //     />
  //   );
  // }
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
