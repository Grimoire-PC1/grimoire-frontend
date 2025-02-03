import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstace from "../../services/axios";
import { ENDPOINT } from "../../constants/Endpoint";
import { useNavigate } from "react-router-dom";
import { User } from "../../interfaces/Models";
import { useUserStore } from "../../stores/user/user.store";

export interface LoginFormPayload {
  email: string;
  password: string;
}

const formSchema = z.object({
  email: z.string({ required_error: "Informe um email" }),
  password: z
    .string({ required_error: "Informe uma senha." })
    .min(5, "Senha deve conter ao menos 5 caracteres."),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    try {
      const { data } = await axiosInstace.post<User>(
        `/${ENDPOINT.SIGN_IN}`,
        values
      );
      sessionStorage.setItem("tcc_user_token", data.token);
      setUser(data);
    
      navigate("/grimoire/home")

    } catch (error) {
      
    }
  }

  return (
    <></>
  );
};

export default LoginForm;
