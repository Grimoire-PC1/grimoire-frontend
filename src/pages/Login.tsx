import { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";

import { ENDPOINT } from "../constants/Endpoint"
import { useUserStore } from "../stores/user/user.store";
import { User } from "../interfaces/Models";
import axiosInstace from "../services/axios";
//import LoginForm from "../components/LoginForm/LoginForm";
import { Button, Separator, Textarea, Text, Presence, Box, Input } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { ToggleTheme } from "@/components/ToggleTheme/ToggleTheme";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/services/userService";
import { SignInPayload } from "@/interfaces/ServicePayload";

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

  const [showSignInForm, setShowSignInForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [signUpForm, setSignUpForm] = useState({});

  const nameSignUpChange = (e: any) => {
    const value = e.target.value;
    setSignUpForm({
      ...signUpForm,
      'nome': value
    });
  };

  const usernameSignUpChange = (e: any) => {
    const value = e.target.value;
    setSignUpForm({
      ...signUpForm,
      'login': value
    });
  };

  const passwordSignUpChange = (e: any) => {
    const value = e.target.value;
    setSignUpForm({
      ...signUpForm,
      'senha': value
    })
  }

  const passwordConfirmationSignUpChange = (e: any) => {
    const value = e.target.value;
    setSignUpForm({
      ...signUpForm,
      'senha-repetida': value
    })
  }

  const emailSignUpChange = (e: any) => {
    const value = e.target.value;
    setSignUpForm({
      ...signUpForm,
      'email': value
    })
  }

  const usernameSigning = (e: any) => {
    const value = e.target.value;
    console.log(value)
    console.log(signUpForm['login'])
    if(value == signUpForm['login']) {
      const signInPayload: SignInPayload = {
        login: signUpForm['login'],
        senha: signUpForm['senha'],
        email: signUpForm['email'],
        nome: signUpForm['nome'],
        foto_url: "string"
      }
      console.log(signInPayload)
      signInForm.mutate(signInPayload)
    } else {
      console.log('ainda não')
    }
  }

  function checkSignInParameters

  const signInForm = useMutation({
    mutationKey: ["createUser"],
    mutationFn: createUser,
    onSuccess: () => {
      
    },
    onError: (error) => {
      console.log(error);
      
    },
  });

  function navigateHome(){
    navigate("/grimoire/home");
  }

  /*
  if (user) {
    return (
      <Navigate
        to={user ? "/grimoire/home" : "/grimoire"}
        replace
      />
    );
  }*/

  return (
    <Presence 
        present={true}
        animationName={{ _open: "fade-in" }}
        animationDuration="slow"
    >
      <Box bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }} >
        
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
              <div className="margin grid place-items-center">
              <Form className="grid-cols-1 w-1/3">
                <Input mb={"2"} resize="none" placeholder="username" />
                <br></br>
                <PasswordInput resize="none" placeholder="senha"></PasswordInput>
              </Form>
              <br></br>
              <Button onClick={()=>navigateHome()} className="padding-xl margin-sides">Entrar</Button>
              </div> 
            </Presence>

            <Presence
              present={showSignUpForm}
              animationName={{ _open: "fade-in"}}
              animationDuration="moderate"
            >
                        <div className="margin">
              <Form>
                <Textarea resize="none" className="height" placeholder="nome" onChange={nameSignUpChange}/>
                <Textarea resize="none" className="height" placeholder="username" onChange={usernameSignUpChange}/>
                <br></br>
                <Textarea resize="none" className="height-l" placeholder="e-mail" onChange={emailSignUpChange}/>
                <br></br>
                <Textarea resize="none" className="height" placeholder="senha" onChange={passwordSignUpChange}/>
                <Textarea resize="none" className="height" placeholder="repita sua senha" onChange={passwordConfirmationSignUpChange}/>
              </Form>
              <br></br>
              <div className="flex place-content-around margin-sides content-end">
              <Text className="text-left text">Assine com seu username para começar sua aventura!</Text>
              <Textarea onChange={usernameSigning} resize="none" variant={"flushed"} className="height" placeholder="assinatura " />
                </div>
              </div> 
            </Presence>
            <ToggleTheme/>
          </div>
        </div>

      </div>
      </Box>
    </Presence>
  );
}
