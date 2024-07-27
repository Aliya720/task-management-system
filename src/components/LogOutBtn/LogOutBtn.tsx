import { Button } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useAuthContext } from "../../context/AuthContext";

const LogOutBtn = () => {
  const authContext = useAuthContext();
  return (
    <Button
      flex={1}
      justify="flex-start"
      variant="default"
      leftSection={<IconLogout size="1rem" stroke={1.5} />}
      style={{ border: "none" }}
      onClick={authContext?.logOut}
    >
      Logout
    </Button>
  );
};

export default LogOutBtn;
