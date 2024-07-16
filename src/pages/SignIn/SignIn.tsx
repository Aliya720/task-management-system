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
import { auth } from "../../firebaseConfig";

const SignIn = () => {
  const AuthContext = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async () => {
    const Auth = await signInWithEmailAndPassword(auth, email, password);
    if (Auth) {
      console.log(Auth.user);
      AuthContext?.signIn(Auth.user);
      setSuccessMessage("Logged in successfully");
    }
  };
  return (
    <Center style={{ height: "100vh", width: "100vw" }}>
      <Flex direction="column" gap="1rem" flex={0.2}>
        <Title order={1}>Sign In</Title>
        <Text c="green">{successMessage}</Text>
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
