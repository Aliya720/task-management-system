import {
  AppShell,
  Avatar,
  Button,
  FileButton,
  Flex,
  Text,
  Title,
} from "@mantine/core";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import UpdateUserForm from "../../components/UpdateUserForm/UpdateUserForm";
import { UserDataType } from "../../context/auth.types";

const Profile = () => {
  const [image, setImage] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const authContext = useAuthContext();
  const imageUrl = image ? URL.createObjectURL(image) : "";

  //for conditionally displaying UI
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      <AppShell padding="md">
        <AppShell.Main>
          <Title order={1}>Profile</Title>
          <Flex
            direction="column"
            gap="1rem"
            style={{
              width: "60rem",
            }}
            justify="center"
            align="center"
          >
            {isEditing ? (
              <>
                <Flex gap="2rem" direction="column" flex={1}>
                  <Avatar
                    radius="md"
                    size="15rem"
                    src={imageUrl}
                    alt="it's me"
                    color="#1D2F6F"
                  />
                  <Flex direction="column" gap={15} flex={1}>
                    <FileButton
                      onChange={setImage}
                      accept="image/png,image/jpeg"
                    >
                      {(props) => (
                        <Button
                          variant="default"
                          radius="xl"
                          style={{ marginRight: "auto" }}
                          {...props}
                          leftSection={<IconPlus stroke={1.5} size="1rem" />}
                        >
                          Upload photo
                        </Button>
                      )}
                    </FileButton>
                    {image && (
                      <Text size="sm" ta="center" mt="sm">
                        Uploaded successfully
                      </Text>
                    )}
                    <Text size="sm">
                      Supported formats : jpeg or png. <br />
                      Max file size : 500k
                    </Text>
                  </Flex>
                </Flex>
                <UpdateUserForm user={authContext?.userData as UserDataType} />
              </>
            ) : (
              <>
                <Flex
                  gap="3rem"
                  justify="flex-start"
                  align="flex-start"
                  wrap="nowrap"
                >
                  <Avatar
                    radius="md"
                    size="45%"
                    src={imageUrl}
                    alt="it's me"
                    color="#1D2F6F"
                  />
                  <Flex
                    gap="1rem"
                    direction="column"
                    style={{
                      width: "70%",
                      marginTop: "2rem",
                    }}
                  >
                    <Title order={4}>
                      Full name : {authContext?.userData?.firstName}{" "}
                      {authContext?.userData?.secondName}
                    </Title>{" "}
                    <Title order={4}>
                      {" "}
                      Username : {authContext?.userData?.username}
                    </Title>
                    <Title order={4}>
                      Email address : {authContext?.userData?.email}{" "}
                    </Title>
                  </Flex>
                  <Button
                    onClick={handleEdit}
                    variant="default"
                    radius="xl"
                    style={{
                      marginLeft: "auto",
                      marginTop: "auto",
                      width: "30%",
                    }}
                    leftSection={<IconEdit stroke={1.5} size="1rem" />}
                  >
                    Edit{" "}
                  </Button>
                </Flex>
              </>
            )}
          </Flex>
        </AppShell.Main>
      </AppShell>
    </>
  );
};

export default Profile;
