import {
  BackgroundImage,
  Button,
  Center,
  Flex,
  Group,
  Text,
  Title,
} from "@mantine/core";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <BackgroundImage
        src="https://pmtips.net/Portals/0/EasyDNNNews/2137/700600p546EDNmainimg-3-types-of-tools-for-project-task-management1.jpg"
        radius="sm"
        style={{ height: "100vh" }}
      >
        <Flex direction="column" gap="5rem" justify="center" align="center">
          <Center>
            <Title order={1} style={{ textAlign: "center" }}>
              TASK MANAGEMENT SYSTEM{" "}
              <p> Simplify task management and prioritize work</p>
            </Title>
          </Center>
          <Text>Start Your Task With Us!!!</Text>
          <Group>
            <NavLink to="/sign-in">
              <Button>Sign In </Button>
            </NavLink>

            <NavLink to="/sign-up">
              <Button>Get Started </Button>
            </NavLink>
          </Group>
        </Flex>
      </BackgroundImage>
    </>
  );
};

export default Home;
