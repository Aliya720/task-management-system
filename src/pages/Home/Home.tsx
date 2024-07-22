import { Button, Center } from "@mantine/core";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Center>
        <NavLink to="/sign-in">
          <Button>Sign In </Button>
        </NavLink>
      </Center>
    </>
  );
};

export default Home;
