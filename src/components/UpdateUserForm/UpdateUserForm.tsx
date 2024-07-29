import { useForm } from "@mantine/form";
import { useState } from "react";
import { EditProfileFormType, UpdateUserProp } from "./form.type";
import { useAuthContext } from "../../context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { updatePassword, User } from "firebase/auth";
import { UserDataType } from "../../context/auth.types";
import {
  Button,
  Flex,
  Group,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateUserForm = (props: UpdateUserProp) => {
  const authContext = useAuthContext();
  const [successMessage, setSuccessMessage] = useState("");
  const [visible, { toggle }] = useDisclosure(false);
  const navigate = useNavigate();
  const location = useLocation();
  const profileEdit = location.pathname === "/user/profile";

  //to navigate back
  const handleEdit = () => {
    navigate(-1);
  };

  //Mantine Form
  const form = useForm<EditProfileFormType>({
    initialValues: {
      firstName: props.user.firstName,
      secondName: props.user.secondName,
      userName: props.user.username,
      email: props.user.email,
      image: "",
      ...(profileEdit
        ? {
            password: "",
            confirmPassword: "",
          }
        : {}),
    },

    validate: {
      firstName: (value) => (value ? null : "First Name is required"),
      secondName: (value) => (value ? null : "Second Name is required"),
      userName: (value) => (value ? null : "Username is required"),
      ...(profileEdit
        ? {
            password: (value) =>
              (value?.length as number) >= 6
                ? null
                : "Password must be at least 6 characters long",
            confirmPassword: (value, values) =>
              value === values.password ? null : "Passwords do not match",
          }
        : {}),
    },
  });

  //Update user data in firebase
  const handleUpdateData = async (values: EditProfileFormType) => {
    try {
      const userData = {
        uid: props.user.uid,
        email: values.email,
        firstName: values.firstName,
        secondName: values.secondName,
        username: values.userName,
        ...(profileEdit
          ? {
              image: props.user.image || "",
              password: values.password,
            }
          : {
              password: props.user.password,
            }),
      };
      const usersRef = doc(db, "users", props.user.uid as string);
      await updateDoc(usersRef, userData);
      if (profileEdit) {
        await updatePassword(
          authContext?.userCredential as User,
          userData.password as string
        );
        authContext?.setUserData(userData as UserDataType);
      }
      await authContext?.fetchUsersList();
      setSuccessMessage("Updated Successfully");
      handleEdit();
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleUpdateData)} style={{ width: "100%" }}>
      <Flex
        gap="1rem"
        direction="column"
        style={{
          width: "70%",
        }}
      >
        {" "}
        <Text c="green">{successMessage}</Text>
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
          disabled={authContext?.isAdminLoggedIn ? false : true}
          defaultValue={props.user.email}
        />
        {profileEdit ? (
          <>
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
            />{" "}
          </>
        ) : (
          <></>
        )}
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
  );
};

export default UpdateUserForm;
