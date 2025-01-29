import { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { ENDPOINT } from "../constants/Endpoint"
import { useUserStore } from "../stores/user/user.store";
import { User } from "../interfaces/Models";
import axiosInstace from "../services/axios";
import LoginForm from "../components/LoginForm/LoginForm";
import { HStack, Button } from "@chakra-ui/react";

export default function LoginPage() {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user) return;
    const payload = sessionStorage.getItem("tcc_user_token");
    const getUserFromStorage = async (token: string) => {
      try {
        const { data } = await axiosInstace.get<User>(`/${ENDPOINT.ME}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
      } catch (error) {
        console.log(error);
        sessionStorage.removeItem("grimoire_user_token");
        /*
        toast({
          title: "Erro ao realizar login",
          description: "Verifique suas credenciais e tente novamente.",
          variant: "destructive",
        });
        */
      }
    };
    if (payload) {
      getUserFromStorage(payload);
    }
  }, [navigate, setUser, user]);

  if (user) {
    return (
      <Navigate
        to={user ? "/grimoire/home" : "/grimoire"}
        replace
      />
    );
  }

  return (
    <>
    <HStack>
      <Button>Click me</Button>
      <Button>Click me</Button>
    </HStack>
    <div className="text-blue-700">oiiiii</div>
    </>
  );
}
