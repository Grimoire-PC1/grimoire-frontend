import { Dialog, DialogBackdrop, DialogPanel, } from '@headlessui/react'
import { Box,Button,Flex,Input,Text,Image} from "@chakra-ui/react";
import { Form } from 'react-router-dom';
import { FileUploadDropzone, FileUploadList, FileUploadRoot, FileUploadTrigger } from '../ui/file-upload';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createFile } from '@/services/campaignService';
import { Toaster, toaster } from '../ui/toaster';
import { HiUpload } from 'react-icons/hi';

export interface DialogLgProps {
    open:boolean,
    handleClose: (open: boolean) => void;
    handleConfirm: (open: boolean) => void;
    pastaId:number;
}

export const NewImgFileDialog = ({
    open,
    handleClose,
    handleConfirm,
    pastaId,
}: DialogLgProps) => {

    const [titulo,setTitulo] = useState("");
    const [imgId, setImgid] = useState("");
    const [img,setImg] = useState("")
    const [flag,setFlag] = useState(0);

    const createImage = async () => {
        const resImg = await fetch("http://localhost:8081/upload", {
            method:"POST",
            headers: {
            "content-type" : "application/json"
            },
            body: JSON.stringify({img: ''})
        })
        const data = await resImg.json()
        console.log("img id: "+data.data._id);
        setImgid(data.data._id);
    }

    useEffect(() => {
        if(flag == 0){
            createImage();
            setFlag(1);
        }
    }, [imgId]);

    const handleImageSubmit = async () =>{
        if(img) {
          const res = await fetch(`http://localhost:8081/update/${imgId}`, {
            method:"PATCH",
            headers: {
              "content-type" : "application/json"
            },
            body: JSON.stringify({image: img})
          })
          const data = await res.json()
          console.log(data)
          setImg(data.image)
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
        if(imgId == ""){
            await createImage();
        }
        console.log(e.acceptedFiles[0])
        const file = e.acceptedFiles[0]
        console.log(imgId)
        
        const conversionResult: string | ArrayBuffer | null | undefined = await imagebase64(file)
        if(typeof conversionResult === "string") {
            const image: string = conversionResult
            setImg(image)
            console.log(image)
        }
    }

    const mutation = useMutation({
        mutationKey: ["createFile"],
        mutationFn: createFile,  
        onSuccess: (data) => {
            console.log(data)
            toaster.create({
                description: "Arquivo de imagem criado com sucesso!",
                type: "success",
            })
            handleImageSubmit();
            setTitulo("");
            setImg("");
            setImgid("");
            handleConfirm(false);
        },
        onError: (error) => {
            console.log(error);
            toaster.create({
            description: "Houve um problema durante a criação do arquivo",
            type: "error",
            })
        },
        });

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
                        <Text fontSize={"2xl"}>Novo arquivo de imagem</Text>

                            <Form>
                                <Input value={titulo} onInput={e => setTitulo(e.target.value)} mt={4} placeholder='Nome do arquivo'></Input>
                                {
                                    img == "" ?
                                    <FileUploadRoot mt={4} alignItems="stretch" maxFiles={1} onFileChange={handleUploadImage}>
                                        <FileUploadDropzone w={"full"} h={"30vh"}
                                            label="Faça o upload da imagem"
                                            description=".png ou .jpg de até 5MB"
                                        />
                                        <FileUploadList />
                                    </FileUploadRoot>
                                    :
                                    <Box>
                                        <Image mt={4} rounded={"xl"} w={"full"} src={img}></Image>
                                        <FileUploadRoot maxFiles={1} onFileChange={handleUploadImage}>
                                        <FileUploadTrigger asChild>
                                                <Button mt={"4"} w={"full"} variant="outline" size="sm">
                                                <HiUpload /> Mudar foto
                                                </Button>
                                        </FileUploadTrigger>
                                        </FileUploadRoot>
                                    </Box>
                                }
                            </Form>
                            
                            <Flex mt={8} justifyContent={"center"}>
                                <Button onClick={()=>mutation.mutate({ id_pacote_pai:pastaId,
                                                                        tipo_arquivo: "IMAGEM",
                                                                        nome:titulo,
                                                                        conteudo:imgId,
                                })}>Criar arquivo</Button>
                            </Flex>
                        </Box>

                    </DialogPanel>
                </Box>
            </div>
        </div>
        <Toaster/>
    </Dialog>
    )
}