/* eslint-disabled react-hooks/exhaustive-deps */
import { useMessage } from "./useMessage";
import { User } from "../types/api/user";
import axios from "axios";
import { useState, useCallback } from "react";

export const useAllUsers = () => {
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<Array<User>>([]);

  const getUsers = useCallback(() => {
    setLoading(true);
    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data))
      .catch(() => {
        showMessage({ title: "Failed getting user info", status: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return { getUsers, loading, users };
};
