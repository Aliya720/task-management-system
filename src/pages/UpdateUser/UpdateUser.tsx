import { AppShell, Flex, Title } from "@mantine/core";
import UpdateUserForm from "../../components/UpdateUserForm/UpdateUserForm";
import { useLocation } from "react-router-dom";

const UpdateUser = () => {
  const location = useLocation();
  const userData = location.state;

  return (
    <>
      <AppShell padding="md">
        <AppShell.Main>
          <Title order={2}>Update User Details</Title>
          <Flex
            direction="column"
            gap="1rem"
            style={{
              width: "60rem",
            }}
            justify="center"
            align="center"
          >
            <UpdateUserForm user={userData} />
          </Flex>
        </AppShell.Main>
      </AppShell>
    </>
  );
};

export default UpdateUser;
