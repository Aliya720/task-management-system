import { Center, Flex, Title } from "@mantine/core";
import NewUserForm from "../../components/NewUserForm/NewUserForm";

const AddUser = () => {
  return (
    <Center style={{ height: "100vh", width: "100vw" }}>
      <Flex direction="column" gap="1rem">
        <Title order={1}>Add User</Title>
        <NewUserForm text="Add User" />
      </Flex>
    </Center>
  );
};

export default AddUser;
