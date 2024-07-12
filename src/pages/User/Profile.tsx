import {
  AppShell,
  Avatar,
  Button,
  FileButton,
  Flex,
  Group,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck, IconEdit, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { app } from "../../firebaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const Profile = () => {
  const [image, setImage] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [visible, { toggle }] = useDisclosure(false);
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };
  // const profilePic = URL.createObjectURL(image!);

  const submitData = async () => {
    const db = getFirestore(app);
    const userData = {
      id: 3,
      email: "zasuwemosse-5694@yopmail.com",
      firstName: firstName,
      secondName: secondName,
      password: password,
      username: userName,
      // photo: profilePic,
    };
    const usersRef = doc(db, "users", "3");
    await setDoc(usersRef, userData);
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
                <Flex gap="2rem" align="center">
                  {image ? (
                    <Avatar
                      radius="md"
                      size="15rem"
                      src={URL.createObjectURL(image)}
                      alt="it's me"
                      color="#1D2F6F"
                    />
                  ) : (
                    <Avatar
                      radius="md"
                      size="15rem"
                      src="avatar.png"
                      alt="it's me"
                      color="#1D2F6F"
                    />
                  )}
                  <Flex justify="center" direction="column" gap={15}>
                    <Title order={2}>User Name</Title>
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
                <Flex
                  gap="1rem"
                  direction="column"
                  style={{
                    width: "70%",
                  }}
                >
                  {" "}
                  <Flex justify="space-between" gap="1rem">
                    <TextInput
                      flex={1}
                      label="First name"
                      placeholder="Enter your first name"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextInput
                      flex={1}
                      label="Second name"
                      placeholder="Enter your second name"
                      onChange={(e) => setSecondName(e.target.value)}
                    />
                  </Flex>
                  <TextInput
                    label="Username"
                    placeholder="Enter username"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <TextInput label="Email" defaultValue="abc" disabled />
                  <PasswordInput
                    label="Password"
                    visible={visible}
                    onVisibilityChange={toggle}
                    placeholder="password"
                  />
                  <PasswordInput
                    label="Confirm password"
                    visible={visible}
                    onVisibilityChange={toggle}
                    placeholder="Confirm password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Group>
                    <Button
                      onClick={handleEdit}
                      radius="xl"
                      variant="default"
                      color="#1D2F6F"
                      flex={1}
                      style={{ marginRight: "auto" }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={submitData}
                      radius="xl"
                      color="#1D2F6F"
                      flex={1}
                      style={{ marginRight: "auto" }}
                      leftSection={<IconCheck stroke={1.5} size="1rem" />}
                    >
                      Save changes
                    </Button>
                  </Group>
                </Flex>
              </>
            ) : (
              <>
                <Flex
                  gap="3rem"
                  justify="flex-start"
                  align="flex-start"
                  wrap="nowrap"
                >
                  {image ? (
                    <Avatar
                      radius="md"
                      size="45%"
                      src={URL.createObjectURL(image)}
                      alt="it's me"
                      color="#1D2F6F"
                    />
                  ) : (
                    <Avatar
                      radius="md"
                      size="45%"
                      src="avatar.png"
                      alt="it's me"
                      color="#1D2F6F"
                    />
                  )}
                  <Flex
                    gap="1rem"
                    direction="column"
                    style={{
                      width: "70%",
                      marginTop: "2rem",
                    }}
                  >
                    <Title order={4}>Full name :</Title>{" "}
                    <Title order={4}> Username : </Title>
                    <Title order={4}>Email address : </Title>
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
