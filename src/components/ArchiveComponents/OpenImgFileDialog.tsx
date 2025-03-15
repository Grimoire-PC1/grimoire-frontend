import { Dialog, DialogBackdrop, DialogPanel, } from '@headlessui/react'
import { Box,Button,Editable,Flex,IconButton,Input,Text,Image} from "@chakra-ui/react";
import { Form } from 'react-router-dom';
import { FileUploadDropzone, FileUploadList, FileUploadRoot, FileUploadTrigger } from '../ui/file-upload';
import { LuSave, LuTrash2 } from 'react-icons/lu';
import { HiUpload } from 'react-icons/hi';
import { File } from '@/interfaces/Models';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toaster, Toaster } from '../ui/toaster';
import { updateFile, deleteFile } from '@/services/campaignService';

export interface DialogLgProps {
    open:boolean,
    handleClose: (open: boolean) => void;
    handleConfirm: (open: boolean) => void;
    file:File;
}

export const OpenImgFileDialog = ({
    open,
    handleClose,
    handleConfirm,
    file
}: DialogLgProps) => {

    const file_criador = sessionStorage.getItem('isGameMaster');
    const [img,setImg] = useState("")
    const [titulo,setTitulo] = useState(file.nome);

    const mutationEdit = useMutation({
        mutationKey: ["updateFile"],
        mutationFn: updateFile, 
        onSuccess: (data) => {
            console.log(data)
            toaster.create({
                description: "Arquivo modificado com sucesso!",
                type: "success",
            })
            handleConfirm(false);
        },
        onError: (error) => {
            console.log(error);
            toaster.create({
            description: "Houve um problema durante a edição do arquivo",
            type: "error",
            })
        },
        });
    
    const mutationDelete = useMutation({
        mutationKey: ["deleteFile"],
        mutationFn: deleteFile, 
        onSuccess: (data) => {
            console.log(data)
            toaster.create({
                description: "Arquivo excluído com sucesso!",
                type: "success",
            })
            handleConfirm(false);
        },
        onError: (error) => {
            console.log(error);
            toaster.create({
            description: "Houve um problema durante a deleção do arquivo",
            type: "error",
            })
        },
        });

    const getImage = async (id:string) => {
        const res = await fetch(`http://localhost:8081/get/${id}`, {
            method:"GET",
            headers: {
              "content-type" : "application/json"
            }
          })
          const data = await res.json()
          setImg(data.image)
          console.log(data)
    }

    if(!img || img == "") {
        getImage(file.conteudo)
    }

    const handleImageSubmit = async () =>{
        if(img) {
          const res = await fetch(`http://localhost:8081/update/${file.conteudo}`, {
            method:"PATCH",
            headers: {
              "content-type" : "application/json"
            },
            body: JSON.stringify({image: img})
          })
          const data = await res.json()
          console.log(data)
        }
    }

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

    async function modifyFile(){
        await handleImageSubmit();
        await mutationEdit.mutate({  id_arquivo:file.id,
            novo_nome:titulo,
            });
    }

    return(
<Dialog open={open} onClose={handleClose} className="relative z-10">
        <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-700/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Box className="rounded-lg" bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }}>
                    <DialogPanel
                        transition
                        className=" max-h-[90vh] padding-dialog-lg relative transform overflow-y-hidden rounded-lg text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 w-[70vw] data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <Box m={2} maxH={"74vh"} overflowY={"auto"}>
                            {
                                file_criador === "true" ?
                                <div>
                                    <Editable.Root p={2} fontSize={"2xl"} value={titulo} onInput={e => setTitulo(e.target.value)}>
                                        <Editable.Preview />
                                        <Editable.Input  />
                                    </Editable.Root>
                                    <Image rounded={"xl"} mt={2} fit={"contain"} w={"full"} src={img}/>
                            
                                    
                                    <Flex mt={4} gapX={2} justifyContent={"space-between"}>
                                        <FileUploadRoot  onFileChange={handleUploadImage}>
                                            <FileUploadTrigger asChild>
                                                <Button variant="outline" size="sm">
                                                <HiUpload /> Modificar imagem
                                                </Button>
                                            </FileUploadTrigger>
                                        </FileUploadRoot>
                                        <Flex gapX={1}>
                                            <IconButton onClick={()=>modifyFile()} aria-label="Salvar alterações"> <LuSave/> </IconButton>
                                                <IconButton onClick={()=>mutationDelete.mutate(file.id)} aria-label="Apagar"> <LuTrash2/> </IconButton>
                                            </Flex>
                                    </Flex>
                                </div>
                                :
                                <div>
                                    <Text fontSize={"2xl"}>{file.nome}</Text>
                                    <Image mt={4} fit={"contain"} w={"full"} src={img}/>
                                </div>
                            }
                        
                        </Box>

                    </DialogPanel>
                </Box>
            </div>
        </div>
        <Toaster/>
    </Dialog>
    )
}