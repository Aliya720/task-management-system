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

const SignIn = () => {
  const authContext = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  const handleSubmit = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
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
  return (
    <Center style={{ height: "100vh", width: "100vw" }}>
      <Flex direction="column" gap="1rem" style={{ width: "20rem" }}>
        <Title order={1}>Sign In</Title>
        <Text c={isSuccessMessage ? "green" : "red"}>{message}</Text>
        <TextInput
          label="Email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          label="Password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSubmit} radius="xl" color="#1D2F6F">
          Sign In
        </Button>

        <Text>
          New User ? <NavLink to="/sign-up">Sign-up</NavLink>
        </Text>
      </Flex>
    </Center>
  );
};

export default SignIn;
