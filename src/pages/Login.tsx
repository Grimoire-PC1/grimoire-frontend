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
      navigate("/grimoire/home");
    },
    onError: (error) => {
      console.log(error);
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
      const resImg = await fetch("http://localhost:8081/upload", {
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
    onSuccess: () => {
      window.location.href = `${import.meta.env.BASE_URL}${window.location.pathname.replace(import.meta.env.BASE_URL, '')}`;
      navigate("/grimoire/home");
    },
    onError: (error) => {
      console.log(error);
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
          <Image height={"100vh"} w={"40vw"} src="/src/assets/login_image.png"></Image>
        </div>

        <Separator orientation="vertical" size={"md"} height={"100"} />
        <div className="w-3/5 padding">

          <div className="text-center margin">
            <span className="subtitle">START YOUR</span>
            <p></p>
            <span className="agreloy title">Grimoire</span>

            <Box h={"45vh"} alignContent={"center"}>
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
                <br></br>
                <Button onClick={submitLogin} className="padding-xl margin-sides">Entrar</Button>
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
                  <Textarea resize="none" className="height" placeholder="nome" onChange={nameSignUpChange}/>
                  <Textarea resize="none" className="height" placeholder="username" onChange={usernameSignUpChange} />
                  <br></br>
                  <Textarea resize="none" className="height-l" placeholder="e-mail" onChange={emailSignUpChange} />
                  <br></br>
                  <Box placeItems={"center"}>
                  <Flex gapX={2} className="height-l" justifyContent={"center"}>
                    <PasswordInput resize="none" placeholder="senha" onChange={passwordSignUpChange} />
                    <PasswordInput resize="none" placeholder="repita sua senha" onChange={passwordConfirmationSignUpChange} />
                  </Flex>
                    
                    </Box>
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
    </Presence>
  );
}
