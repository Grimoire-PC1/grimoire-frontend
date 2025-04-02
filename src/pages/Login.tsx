import { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";

import { ENDPOINT } from "../constants/Endpoint"
import { useUserStore } from "../stores/user/user.store";
import { User } from "../interfaces/Models";
import axiosInstace from "../services/axios";
//import LoginForm from "../components/LoginForm/LoginForm";
import { Button, Separator, Textarea, Text, Presence, Box, Input, Image, Flex } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { ToggleTheme } from "@/components/ToggleTheme/ToggleTheme";
import { useMutation } from "@tanstack/react-query";
import { authenticateUser, createUser } from "@/services/userService";
import { SignInPayload, SignUpPayload } from "@/interfaces/ServicePayload";
import { URL_CONSTS } from "@/constants/url";
import { Toaster, toaster } from "@/components/ui/toaster";
import { sleep } from "@/util/utilFunctions";

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

  const [showSignInForm, setShowSignInForm] = useState(true);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [signInForm, setSignInForm] = useState({});
  const [signUpForm, setSignUpForm] = useState({});

  function signUp(){
    setShowSignInForm(false);
    setShowSignUpForm(true);
  }

  function signIn(){
    setShowSignUpForm(false);
    setShowSignInForm(true);
  }

  const usernameSignInChange = (e: any) => {
    const value = e.target.value;
    setSignInForm({
      ...signInForm,
      'login': value
    });
  };

  const passwordSignInChange = (e: any) => {
    const value = e.target.value;
    setSignInForm({
      ...signInForm,
      'senha': value
    });
  };

  const submitLogin = (e:any) => {
    toaster.create({
                        description: "Carregando seu Grimório...",
                        type: "loading",
                    })
    if(signInForm['login'] != undefined && signUpForm['login'] != ""
    && signInForm['senha'] != undefined && signInForm['senha'] != "") {
      const signInPayload: SignInPayload = {
        login: signInForm['login'],
        senha: signInForm['senha'],
      }
      
      sendSignInForm.mutate(signInPayload)
    } else {
      console.log('campos inválidos')
    }
  }

  const sendSignInForm = useMutation({
    mutationKey: ["authenticateUser"],
    mutationFn: authenticateUser,
    onSuccess: () => {
      navigate("/home");
    },
    onError: (error) => {
      console.log(error);
      toaster.create({
                          description: "Ops! Não foi possível carregar seu Grimório. Tente mais tarde!",
                          type: "error",
                      })
    },
  });

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

  const usernameConfirmation = async (e: any) => {
    const value = e.target.value;
    console.log(value)
    console.log(signUpForm['login'])
    if(value == signUpForm['login'] && checkSignUpParameters() && checkEqualPassword()) {
      toaster.create({
        description: "Carregando seu Grimório...",
        type: "loading",
    })
      const resImg = await fetch(`${URL_CONSTS.IMAGEMANAGER}/upload`, {
        method:"POST",
        headers: {
          "content-type" : "application/json"
        },
        body: JSON.stringify({img: ''})
      })
      const data = await resImg.json()
      const signUpPayload: SignUpPayload = {
        login: signUpForm['login'],
        senha: signUpForm['senha'],
        email: signUpForm['email'],
        nome: signUpForm['nome'],
        id_foto: data.data._id
      }
      console.log(signUpPayload)
      sendSignUnForm.mutate(signUpPayload)
    } else {
      console.log('ainda não')
    }
  }

  function checkSignUpParameters() {
    if (signUpForm['login'] == undefined || signUpForm['login'] == ""
    || signUpForm['senha'] == undefined || signUpForm['senha'] == ""
    || signUpForm['email'] == undefined || signUpForm['email'] == ""
    || signUpForm['nome'] == undefined || signUpForm['nome'] == "") {
      return false;
    } else {
      return true;
    }
  }

  function checkEqualPassword() {
    if (signUpForm['senha'] == signUpForm['senha-repetida']) {
      return true;
    } else {
      return false;
    }
  }

  const sendSignUnForm = useMutation({
    mutationKey: ["createUser"],
    mutationFn: createUser,
    onSuccess: async () => {
      authenticateUser({login: signInForm['login'], senha: signUpForm['senha']})
      //window.location.href = `${import.meta.env.BASE_URL}${window.location.pathname.replace(import.meta.env.BASE_URL, '')}`;
      //await sleep(2000);
      navigate("/home");
    },
    onError: (error) => {
      console.log(error);
      toaster.create({
                          description: "Ops! Não foi possível criar um Grimório para você.",
                          type: "error",
                      })
    },
  });

  return (
    <Presence 
        present={true}
        animationName={{ _open: "fade-in" }}
        animationDuration="slow"
    >
      <Box bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }} >
        
      <Flex>
        <div className="w-2/5 h-[100vh]">
          <Image height={"100vh"} w={"40vw"} src="/login_image.png"></Image>
        </div>

        <Separator orientation="vertical" size={"md"} height={"100"} />
        <div className="w-3/5 padding">

          <div className="text-center margin">
            <Text mt={"28"} className="subtitle">START YOUR</Text>
            <Text mt={"-10"} className="agreloy title">Grimoire</Text>

            <Box h={"full"} alignContent={"center"}>
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
                  <Input mb={"2"} resize="none" placeholder="username" onChange={usernameSignInChange} />
                  <br></br>
                  <PasswordInput resize="none" placeholder="senha" onChange={passwordSignInChange}></PasswordInput>
                </Form>
                <Button onClick={submitLogin} mt={4} px={16}>Entrar</Button>
                <Text onClick={()=>signUp()} cursor={"pointer"} textDecor={"underline"} textDecorationThickness={1} mt={4}>Não tem uma conta ainda? Cadastre-se!</Text>
                </div> 
              </Presence>

              <Presence
                present={showSignUpForm}
                animationName={{ _open: "fade-in"}}
                animationDuration="moderate"
              >
                          <div className="margin">
                <Form>
                  <Flex flexDirection={"column"} gap={2} maxW={"full"} justifyItems={"center"} px={16}>
                    <Flex gap={2}>
                  <Input resize="none" placeholder="nome" onChange={nameSignUpChange}/>
                  <Input resize="none"placeholder="username" onChange={usernameSignUpChange} />
                    </Flex>
                  <Input resize="none" placeholder="e-mail" onChange={emailSignUpChange} />
                  <Flex gap={2}>
                  <PasswordInput resize="none" placeholder="senha" onChange={passwordSignUpChange} />
                  <PasswordInput resize="none" placeholder="repita sua senha" onChange={passwordConfirmationSignUpChange} />

                  </Flex>
                  </Flex>
                </Form>
                <br></br>
                <div className="flex place-content-around margin-sides content-end">
                  <Text className="text-left text">Assine com seu username para começar sua aventura!</Text>
                  <Textarea onChange={usernameConfirmation} resize="none" variant={"flushed"} className="height" placeholder="assinatura " />
                </div>
                <Text onClick={()=>signIn()} cursor={"pointer"} textDecor={"underline"} textDecorationThickness={1} mt={4}>Já faz parte da comunidade do Grimoire? Entre com sua conta!</Text>
                </div> 
              </Presence>

            </Box>
            <ToggleTheme/>
          </div>
        </div>

      </Flex>
      </Box>
      <Toaster/>
    </Presence>
  );
}
