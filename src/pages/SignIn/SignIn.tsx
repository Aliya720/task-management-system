import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import {
  Button,
  Center,
  Flex,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { NavLink } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../firebaseConfig";
import { useForm } from "@mantine/form";
import { SignInFormType } from "./form.type";

const SignIn = () => {
  const authContext = useAuthContext();
  const [message, setMessage] = useState("");
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  //Mantine form
  const form = useForm<SignInFormType>({
    initialValues: {
      email: "",
      password: "",
    },
  });

  //submits email and password to firebase to check authentication
  const handleSubmit = async (values: SignInFormType) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        values.email,
        values.password
      );
      if (userCredential) {
        setIsSuccessMessage(true);
        const user = userCredential.user;
        authContext?.signIn(user);
        setMessage("Logged in successfully");
      }
    } catch (error) {
      setIsSuccessMessage(false);
      setMessage("Invalid user id and password");
    }
  };

  // if (!authContext?.userCredential) {
  //   return (
  //     <LoadingOverlay
  //       zIndex={1000}
  //       visible={visible}
  //       overlayProps={{ radius: "sm", blur: 2 }}
  //     />
  //   );
  // }

  return (
    <Center style={{ height: "100vh", width: "100vw" }}>
      <Flex direction="column" gap="1rem" style={{ width: "20rem" }}>
        <Title order={1}>Sign In</Title>
        <Text c={isSuccessMessage ? "green" : "red"}>{message}</Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Flex direction="column" gap="1rem">
            <TextInput
              label="Email"
              placeholder="Enter email"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              placeholder="Enter password"
              {...form.getInputProps("password")}
            />
            <Button type="submit" radius="xl" color="#1D2F6F">
              Sign In
            </Button>
          </Flex>
        </form>
        <Text>
          New User ? <NavLink to="/sign-up">Sign-up</NavLink>
        </Text>
      </Flex>
    </Center>
  );
};

export default SignIn;
