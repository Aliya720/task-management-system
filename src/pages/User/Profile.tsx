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
import { db } from "../../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { useAuthContext } from "../../context/AuthContext";
import { UserDataType } from "../../context/auth.types";
import { updatePassword, User } from "firebase/auth";
import { useForm } from "@mantine/form";
import { EditProfileFormType } from "./form.type";

const Profile = () => {
  const [image, setImage] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [visible, { toggle }] = useDisclosure(false);
  const [successMessage, setSuccessMessage] = useState("");
  const authContext = useAuthContext();
  const imageUrl = image ? URL.createObjectURL(image) : "";

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const form = useForm<EditProfileFormType>({
    initialValues: {
      firstName: authContext?.userData?.firstName,
      secondName: authContext?.userData?.secondName,
      userName: authContext?.userData?.username,
      password: "",
      confirmPassword: "",
      image: "",
    },

    validate: {
      firstName: (value) => (value ? null : "First Name is required"),
      secondName: (value) => (value ? null : "Second Name is required"),
      userName: (value) => (value ? null : "Username is required"),
      password: (value) =>
        value.length >= 6
          ? null
          : "Password must be at least 6 characters long",
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
    },
  });

  const handleUpdateData = async (values: EditProfileFormType) => {
    try {
      const userData = {
        uid: authContext?.userData?.uid,
        email: authContext?.userData?.email,
        firstName: values.firstName,
        secondName: values.secondName,
        password: values.password,
        username: values.userName,
        image: imageUrl,
      };
      const usersRef = doc(db, "users", authContext?.userData?.uid as string);
      await updateDoc(usersRef, userData);
      await updatePassword(
        authContext?.userCredential as User,
        userData.password
      );
      authContext?.setUserData(userData as UserDataType);
      setSuccessMessage("Updated Successfully");
      handleEdit();
    } catch (error) {
      console.log("Error", error);
    }
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
                <form
                  onSubmit={form.onSubmit(handleUpdateData)}
                  style={{ width: "100%" }}
                >
                  <Flex gap="2rem" align="center">
                    <Avatar
                      radius="md"
                      size="15rem"
                      src={imageUrl}
                      alt="it's me"
                      color="#1D2F6F"
                    />
                    <Flex justify="center" direction="column" gap={15}>
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
                    <Text c="red">{successMessage}</Text>
                    <Flex justify="space-between" gap="1rem">
                      <TextInput
                        flex={1}
                        label="First name"
                        placeholder="Enter your first name"
                        {...form.getInputProps("firstName")}
                      />
                      <TextInput
                        flex={1}
                        label="Second name"
                        placeholder="Enter your second name"
                        {...form.getInputProps("secondName")}
                      />
                    </Flex>
                    <TextInput
                      label="Username"
                      placeholder="Enter username"
                      {...form.getInputProps("userName")}
                    />
                    <TextInput
                      label="Email"
                      defaultValue={authContext?.userData?.email}
                      disabled
                    />
                    <PasswordInput
                      label="Password"
                      visible={visible}
                      onVisibilityChange={toggle}
                      {...form.getInputProps("password")}
                      placeholder="password"
                    />
                    <PasswordInput
                      label="Confirm password"
                      visible={visible}
                      onVisibilityChange={toggle}
                      placeholder="Confirm password"
                      {...form.getInputProps("confirmPassword")}
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
                        type="submit"
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
                </form>
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
