import {
  Button,
  Center,
  Flex,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { regex } from "../../constants/regex";
import StrongPasswordInput from "../../components/StrongPasswordInput/StrongPasswordInput";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const AuthContext = useAuthContext();

  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [email, setEmail] = useState("");

  const submitData = async () => {
    createUserWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    const userData = {
      email: email,
      firstName: firstName,
      secondName: secondName,
      password: password,
      username: userName,
      image: "",
    };
    console.log(user);
    if (user) {
      const usersRef = doc(db, "users", user.uid);
      await setDoc(usersRef, userData);
      AuthContext?.signUp(userData);
    }
  };

  const handleSubmit = () => {
    if (!regex.Email.test(email)) {
      setAlertMessage("Email is Invalid");
    } else if (password !== confirmPassword) {
      setAlertMessage("password doesn't match");
    } else {
      submitData();
      setAlertMessage("");
      setSuccessMessage("Signed Up successfully");
    }
  };
  return (
    <>
      <Center style={{ height: "100vh", width: "100vw" }}>
        <Flex direction="column" gap="1rem">
          <Title order={1}>Sign Up</Title>
          <Text c="red">{alertMessage}</Text>
          <Text c="green">{successMessage}</Text>
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
          <TextInput
            label="Email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <StrongPasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordInput
            label="Confirm password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button onClick={handleSubmit} radius="xl" color="#1D2F6F">
            Sign Up
          </Button>
          <Text>
            Already have account. <NavLink to="/sign-in">Sign-In</NavLink>
          </Text>
        </Flex>
      </Center>
    </>
  );
};

export default SignUp;
