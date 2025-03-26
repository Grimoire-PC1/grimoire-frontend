import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { Alert, Box, Button, Input, Presence } from "@chakra-ui/react";
import { Form, Navigate, useNavigate } from 'react-router-dom';
import { PasswordInput } from '../ui/password-input';
import { FileUploadList, FileUploadRoot, FileUploadTrigger } from '../ui/file-upload';
import { HiUpload } from "react-icons/hi"
import { useState } from 'react';
import { User } from '@/interfaces/Models';
import { authenticateUser, deleteUser, updateUser } from '@/services/userService';
import { toaster, Toaster } from '../ui/toaster';
import { UpdateUserPayload } from '@/interfaces/ServicePayload';


export interface UserSettingsDialogSmProps {
    open:boolean,
    handleClose: (open: boolean) => void;
    campo:string;
}

export const UserSettingsDialogSm = ({
    open,
    handleClose,
    campo
}: UserSettingsDialogSmProps) => {

    const navigate = useNavigate();
    const [valor, setValor] = useState("");
    const [img, setImg] = useState("");
    let user: User = JSON.parse(sessionStorage.getItem("userObject")||"{}")

    const [senha, setSenha] = useState("");
    const [confirmacaoSenha, setConfirmacaoSenha] = useState("");

    const updateValue = async () => {
        let updateUserPayload: UpdateUserPayload;
        if(campo === "nome") {
            updateUserPayload = {
                novo_nome: valor,
                nova_senha: senha,
                novo_email: user.email||'',
                id_nova_foto: user.id_foto||'',
            }
            await updateUser(updateUserPayload);
            handleClose(false);
            location.reload();
        } else if (campo == "senha") {
            updateUserPayload = {
                novo_nome: user.nome||'',
                nova_senha: valor,
                novo_email: user.email||'',
                id_nova_foto: user.id_foto||'',
            }
            await updateUser(updateUserPayload);
            handleClose(false);
            location.reload();
        } else if (campo == "e-mail") {
            updateUserPayload = {
                novo_nome: user.nome||'',
                nova_senha: senha,
                novo_email: valor,
                id_nova_foto: user.id_foto||'',
            }
            await updateUser(updateUserPayload);
            handleClose(false);
            location.reload();
        } else {
            await deleteUser();
            sessionStorage.removeItem("grimoireToken")
            navigate("/grimoire/");
        }

        handleClose(false);
        location.reload();
    }
    // -------------------------------------- SEÇÃO DE TRATAMENTO DE IMAGEM ----------------------------------------------------------
    const imagebase64 = async (file: any): Promise<string | ArrayBuffer | null | undefined> => {
        const reader = new FileReader()
        if(file) {
          reader.readAsDataURL(file)
          const data: string | ArrayBuffer | null = await new Promise((resolve,reject) => {
            reader.onload = ()=> resolve(reader.result)
            reader.onerror = (err) => reject(err)
          })
          return data
        }
      }
      
      const handleUploadImage = async (e: any) => {
        console.log(e.acceptedFiles[0])
        const file = e.acceptedFiles[0]
        
        const conversionResult: string | ArrayBuffer | null | undefined = await imagebase64(file)
        if(typeof conversionResult === "string") {
            const image: string = conversionResult
            setImg(image)
            console.log(image)
        }
      }

      /*
      const fetchImage = async() =>{
        const res = await fetch("http://localhost:8081")
        const data = await res.json()
        setAllImage(data.data)
      }
      */
    
      const handleImageSubmit = async () =>{
        if(img) {
          const res = await fetch(`http://localhost:8081/update/${user?.id_foto}`, {
            method:"PATCH",
            headers: {
              "content-type" : "application/json"
            },
            body: JSON.stringify({image: img})
          })
          const data = await res.json()
          console.log(data)
          if(data.success){
            alert(data.message)
          }
        }
      }
    // -------------------------------------- FIM DA SEÇÃO DE TRATAMENTO DE IMAGEM ----------------------------------------------------------

    const formSubmission = async () => {
        const senhaConfere = senha === confirmacaoSenha;
        if (senhaConfere) {
            try {
                const login = user.login||''
                await authenticateUser({login:login, senha:senha})
                if(campo === "foto") {
                    await handleImageSubmit();
                } else {
                    await updateValue();
                }
                toaster.create({description: `Operação realizada com sucesso!`,
                    type: "success",
                    })
            handleClose(false);
            location.reload();
            } catch (error) {
                console.log(error)
                toaster.create({description: `Ocorreu um erro ao atualizar seus dados.`,
                                type: "error",
                                })
            }
        }
    }

    return(
    <Dialog open={open} onClose={handleClose} className="relative z-10">
        <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-700/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Box className="rounded-lg" bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }} >
                            <DialogPanel
                                transition
                                className=" padding-dialog-sm relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 w-[35vw] data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                            >
                                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <DialogTitle className="text-base text-large font-semibold ">
                                        {campo === 'nome' ? "Alterar o nome exibido no seu perfil"
                                        :campo === 'senha' ? "Alterar sua senha"
                                        :campo === 'e-mail' ? "Alterar seu e-mail"
                                        :campo === 'foto' ? "Alterar sua foto de perfil"
                                        : "Tem certeza que quer deletar sua conta?"
                                        }
                                    </DialogTitle>
                                    </div>
                                </div>
                                </div>
                                <div className="px-4 py-3 grid-cols-1 place-content-center place-items-center gap-y-8">
                                    <Form>
                                        {
                                            campo === 'nome' || campo === 'username' || campo === 'senha' || campo === 'e-mail' ? 
                                                <Input mt={"8"} mb={"2"} required value={valor} onChange={(e) => setValor(e.target.value)} resize="none" placeholder={ campo === 'nome' ? "Novo nome"
                                                                                                            :campo === 'senha' ? "Nova senha"
                                                                                                            :campo === 'e-mail' ? "Novo endereço de e-mail"
                                                                                                            : ""
                                                }/>
                                            :
                                            
                                            campo === 'foto' ?

                                            <FileUploadRoot maxFiles={1} onFileChange={handleUploadImage}>
                                            <FileUploadTrigger asChild>
                                                <Button mb={"2"} mt={"4"} w={"full"} variant="outline" size="sm">
                                                <HiUpload /> Upload file
                                                </Button>
                                            </FileUploadTrigger>
                                            <FileUploadList mb={"2"} />
                                            </FileUploadRoot>
                                          
                                            :

                                            <div className='m-b'></div>
                                        }
                                        
                                        <PasswordInput required placeholder='Confirme com sua senha' value={senha} onChange={(e) => setSenha(e.target.value)}></PasswordInput>
                                        <br></br>
                                        <PasswordInput required mt={"2"} placeholder='Repita sua senha' value={confirmacaoSenha} onChange={(e) => setConfirmacaoSenha(e.target.value)}></PasswordInput>
                                    </Form>
                                    <Button mt={"4"} mb={"4"} onClick={formSubmission}>Alterar</Button>
                                </div>
                                
                            <Presence 
                                animationName={{ _open: "fade-in",_closed:"fade-out" }}
                                animationDuration="moderate"
                                present={false}>
                                <Alert.Root  maxW={"360px"}  status="error" title="This is the alert title">
                                    <Alert.Indicator />
                                    <Alert.Title>Confirme com sua senha para alterar suas informações.</Alert.Title>
                                </Alert.Root>
                            </Presence>

                            </DialogPanel>
                        </Box>
                        </div>
                    </div>
        <Toaster/>
    </Dialog>
    )
}