import { Button, Flex, PasswordInput, Text, TextInput } from "@mantine/core";
import StrongPasswordInput from "../StrongPasswordInput/StrongPasswordInput";
import { useAuthContext } from "../../context/AuthContext";
import { NewUserFormProps, SignUpFormType } from "./form.type";
import { useForm } from "@mantine/form";
import { regex } from "../../constants/regex";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, firebaseAuth } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { UserDataType } from "../../context/auth.types";

const NewUserForm = (props: NewUserFormProps) => {
  const authContext = useAuthContext();
  const [successMessage, setSuccessMessage] = useState("");

  //Mantine form hook
  const form = useForm<SignUpFormType>({
    initialValues: {
      email: "",
      firstName: "",
      secondName: "",
      userName: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      email: (value) => (regex.Email.test(value) ? null : "Email is Invalid"),
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

  //Adds new user to firebase
  const handleSubmit = async (values: SignUpFormType) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        values.email,
        values.password
      );
      console.log();
      const user = userCredential.user;
      const userData = {
        email: values.email,
        firstName: values.firstName,
        secondName: values.secondName,
        password: values.password,
        username: values.userName,
        uid: user.uid,
      };
      if (user) {
        const usersRef = doc(db, "users", user.uid);
        await setDoc(usersRef, userData);
        authContext?.signUp(userData as UserDataType);
      }
      setSuccessMessage("Account created successfully");
    } catch (error) {
      console.error("Error signing up: ", error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Text c="green">{successMessage}</Text>
      <Flex direction="column" gap="1rem">
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
          placeholder="Enter email"
          {...form.getInputProps("email")}
        />{" "}
        <StrongPasswordInput
          {...form.getInputProps("password")}
          key={form.key("password")}
        />
        <PasswordInput
          label="Confirm password"
          placeholder="Confirm password"
          {...form.getInputProps("confirmPassword")}
        />
        <Button type="submit" radius="xl" color="#1D2F6F">
          {props.text}
        </Button>
      </Flex>
    </form>
  );
};

export default NewUserForm;
