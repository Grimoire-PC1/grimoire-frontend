import { useEffect, useState } from "react";
import { Form, Link, Navigate, useNavigate } from "react-router-dom";

import { ENDPOINT } from "../constants/Endpoint"
import { useUserStore } from "../stores/user/user.store";
import { User } from "../interfaces/Models";
import axiosInstace from "../services/axios";
import LoginForm from "../components/LoginForm/LoginForm";
import { HStack, Button, Separator, Card, Field, Input, Stack, Heading, ClientOnly, IconButton, Skeleton, Textarea, Text, Presence, Center } from "@chakra-ui/react";
import { LuSun, LuMoon } from "react-icons/lu";
import { useColorMode } from "@/components/ui/color-mode";

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

  const { toggleColorMode, colorMode } = useColorMode()

  const [showSignInForm, setShowSignInForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  if (user) {
    return (
      <Navigate
        to={user ? "/grimoire/home" : "/grimoire"}
        replace
      />
    );
  }

  return (
    <div className="flex w-full h-full">
      <div className="w-2/5 h-[100vh] bg-linear-to-r from-purple-950 to-slate-500">

      </div>
      <Separator orientation="vertical" size={"md"} height={"100"} />
      <div className="w-3/5 padding">

        <div className="text-center margin">
          <span className="subtitle">START YOUR</span>
          <p></p>
          <span className="agreloy title">Grimoire</span>

          <div className="text-left">
            <h1 className="subtitle">ABOUT</h1>
            <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus bibendum neque ac congue semper. Vestibulum pulvinar eros sit amet nisi eleifend feugiat. Aliquam tristique arcu metus, ac dapibus dui congue vitae. Curabitur consectetur, velit sed iaculis ullamcorper, sapien turpis ullamcorper metus, eget ultrices augue ipsum mattis felis.</p>
          </div>

          <Presence
            present={!showSignInForm && !showSignUpForm}
            animationName={{ _open: "fade-in" }}
            animationDuration="moderate"
          >
            <div className="margin">
            <Button onClick={()=>setShowSignInForm(true)} className="padding-xl margin-sides">Entrar</Button>
            <Button onClick={()=>setShowSignUpForm(true)} className="padding-xl margin-sides">Cadastrar</Button>
            </div>
          </Presence>
          <Presence
            present={showSignInForm}
            animationName={{ _open: "fade-in"}}
            animationDuration="moderate"
          >
            <div className="margin">
             <Form>
              <Textarea resize="none" className="height" placeholder="e-mail" />
              <br></br>
              <Textarea resize="none" className="height" placeholder="senha" />
             </Form>
             <br></br>
             <Button onClick={()=>setShowSignInForm(false)} className="padding-xl margin-sides">Entrar</Button>
            </div> 
          </Presence>

          <Presence
            present={showSignUpForm}
            animationName={{ _open: "fade-in"}}
            animationDuration="moderate"
          >
                       <div className="margin">
            <Form>
              <Textarea resize="none" className="height-l" placeholder="username" />
              <br></br>
              <Textarea resize="none" className="height-l" placeholder="e-mail" />
              <br></br>
              <Textarea resize="none" className="height" placeholder="senha" />
              <Textarea resize="none" className="height" placeholder="repita sua senha" />
             </Form>
             <br></br>
             <div className="flex place-content-around margin-sides content-end">
             <Text className="text-left text">Assine com seu username para começar sua aventura!</Text>
             <Textarea onClick={()=>setShowSignUpForm(false)} resize="none" variant={"flushed"} className="height" placeholder="assinatura " />
              </div>
            </div> 
          </Presence>

        <div className="text-right right-bottom">
          
          <ClientOnly fallback={<Skeleton boxSize="8" />}>
            <IconButton onClick={toggleColorMode} variant="outline" size="sm">
              {colorMode === "light" ? <LuSun /> : <LuMoon />}
            </IconButton>
          </ClientOnly>
          
        </div>
        </div>
      </div>

    </div>
  );
}
