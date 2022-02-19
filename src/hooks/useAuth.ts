import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../types/api/user";
import { useMessage } from "./useMessage";

export const useAuth = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const { showMessage } = useMessage();

  const login = useCallback(
    (id: string) => {
      setLoading(true);

      axios
        .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((response) => {
          if (response.data) {
            showMessage({ title: "Logined", status: "success" });
            history.push("/home");
          } else {
            showMessage({ title: "Not Found User", status: "error" });
          }
        })
        .catch(() => showMessage({ title: "Can not login", status: "error" }))
        .finally(() => setLoading(false));
    },
    [history]
  );

  return { login, loading };
};
