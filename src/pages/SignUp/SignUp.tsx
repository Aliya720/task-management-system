import { Center, Flex, Text, Title } from "@mantine/core";
import { NavLink } from "react-router-dom";

import NewUserForm from "../../components/NewUserForm/NewUserForm";

const SignUp = () => {
  return (
    <>
      <Center style={{ height: "100vh", width: "100vw" }}>
        <Flex direction="column" gap="1rem">
          <Title order={1}>Sign Up</Title>
          <NewUserForm text="Sign Up" />
          <Text>
            Already have account. <NavLink to="/sign-in">Sign-In</NavLink>
          </Text>
        </Flex>
      </Center>
    </>
  );
};

export default SignUp;
