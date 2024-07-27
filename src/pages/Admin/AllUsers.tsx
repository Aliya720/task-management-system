import {
  AppShell,
  Button,
  Card,
  Flex,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useAuthContext } from "../../context/AuthContext";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import { UserDataType } from "../../context/auth.types";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import { modals } from "@mantine/modals";

const AllUser = () => {
  const authContext = useAuthContext();
  const [selectedUser, setSelectedUser] = useState<UserDataType | null>(null);

  //Deleting user from firebase
  const handleDeleteUser = async () => {
    const usersRef = doc(db, "users", selectedUser?.uid as string);
    await deleteDoc(usersRef);
    close();
  };

  //modal to delete user
  const openDeleteModal = () => {
    console.log("openDeleteModal called");
    modals.openConfirmModal({
      title: "Delete your profile",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete {selectedUser?.firstName}{" "}
          {selectedUser?.secondName} user?
        </Text>
      ),
      labels: { confirm: "Delete account", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleDeleteUser(),
    });
  };

  //rows of the table

  const rows = authContext?.userList.map((user) => (
    <Table.Tr key={user.firstName}>
      <Table.Td>{user.firstName}</Table.Td>
      <Table.Td>{user.secondName}</Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>
        <NavLink to="/admin/update-user" state={user}>
          <Button
            variant="default"
            rightSection={<IconEdit size="1rem" stroke={1.5} />}
          >
            Update
          </Button>
        </NavLink>
      </Table.Td>
      <Table.Td>
        <Button
          variant="default"
          rightSection={<IconTrash size="1rem" stroke={1.5} />}
          onClick={() => {
            setSelectedUser(user);
            openDeleteModal();
          }}
        >
          Delete
        </Button>
      </Table.Td>
    </Table.Tr>
  ));
  useEffect(() => {}, [authContext?.userList]);
  return (
    <AppShell p="md">
      <AppShell.Main>
        <Flex gap="1rem">
          <Card withBorder c="#1D2F6F" flex={1}>
            <Title order={1}>{authContext?.userList.length}</Title>
            <Text>Users</Text>
          </Card>
          <Card withBorder c="#1D2F6F" flex={1}>
            <Title order={1}>{authContext?.taskList?.length}</Title>
            <Text>Tasks</Text>
          </Card>
        </Flex>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>First Name</Table.Th>
              <Table.Th>Second Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Action</Table.Th>
              <Table.Th>
                {" "}
                <NavLink to="/admin/add-user">
                  <Button
                    radius="lg"
                    variant="default"
                    rightSection={<IconPlus size="1rem" stroke={1.5} />}
                  >
                    Create
                  </Button>
                </NavLink>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </AppShell.Main>
    </AppShell>
  );
};

export default AllUser;
