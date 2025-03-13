import { Input, Text, Textarea, Image,Button, FileUploadTrigger, Box, Grid,} from "@chakra-ui/react";
import { FileUploadRoot, FileUploadDropzone,FileUploadList } from "../ui/file-upload";
import {RadioGroup, Radio } from "../ui/radio";
import { useReducer, useState } from "react";
import { HiUpload } from "react-icons/hi";
import { System } from "@/interfaces/Models";
import { TemporaryUpdateSystemPayload, UpdateSystemPayload } from "@/interfaces/ServicePayload";
import { Toaster, toaster } from "../ui/toaster";
import { updateSystem } from "@/services/systemService";
import { useMutation } from "@tanstack/react-query";
import { DialogDeleteSystem } from "../Dialog/DialogDeleteSystem";
 
export const SystemPageComponent = () => {

    const [deleteSystemDialog,setDeleteSystemDialog] = useState(false);

    const [,forceUpdate] = useReducer(x=>x+1,0); 
    console.log(sessionStorage.getItem('currentSystem'))
    let system: System = JSON.parse(sessionStorage.getItem('currentSystem')||'');

    const [img,setImg] = useState("")

    const [modifiedSystem, setModifiedSystem] = useState(false);
    
    const [systemName, setSystemName] = useState({});

    const [systemDescription, setCampaignDecription] = useState({});

    const [systemType, setSystemType] = useState({})

    function mudancaNoSistema() {
            /* 
            ---- BACKEND PENDING ----
    
            if(systemName['value'] != campaign.titulo || systemDescription['value'] != campaign.descricao) {
                setModifiedSystem(true)
            } else {
                setModifiedSystem(false)
            }
            */
            setModifiedSystem(true)
        }
    
        const titleChange = (e: any) => {
            const value = e.target.value;
            setSystemName({
              ...systemName,
              'value': value
            });
            mudancaNoSistema()
        };
        
        const descriptionChange = (e: any) => {
            const value = e.target.value;
            setCampaignDecription({
              ...systemDescription,
              'value': value
            });
            mudancaNoSistema()
        };

        const typeChange = (e: any) => {
          console.log(e)
          const value = e.value;
          setSystemType({
            ...systemType,
            'value': value
          });
          mudancaNoSistema()
      };
    
        const saveChanges = async () => {
            const title = systemName['value']||'';
            const description = systemDescription['value']||'';
            const type = systemType['value']||'';
            const image = await handleImageSubmit();
            console.log(image)
            console.log("title ---->", title, "description --->", description); 
            const updateCampaignPayload: UpdateSystemPayload = {
                novo_nome: title != "" ? title : system.nome,
                nova_descricao: description != "" ? description : system.descricao,
                id_nova_foto: system?.id_foto,
            }
            console.log(system?.id)
            const temporaryUpdateSystemPayload: TemporaryUpdateSystemPayload = {
                payload: updateCampaignPayload,
                id_sistema: Number(system?.id),
                tipo_sistema: type
            }
            console.log(updateCampaignPayload)
            mutation.mutate(temporaryUpdateSystemPayload);
    
            forceUpdate();
            setModifiedSystem(false);
         };
    
        const mutation = useMutation({
            mutationKey: ["updateSystem"],
            mutationFn: updateSystem,
            onSuccess: (data) => {
              console.log(data)
              toaster.create({
                          description: "Sistema atualizada com sucesso!",
                          type: "success",
                          })
            },
            onError: (error) => {
              console.log(error);
              toaster.create({
                description: "Houve um problema salvando seu sistema",
                type: "error",
                })
            },
          });
    
        const players = [[''],[''],['','']];
        var characters: string[][] = [];
    
        for(let i = 0; i < players.length; i++) {
            characters.push(players[i]);
        }

    // -------------------------------------- SEÇÃO DE TRATAMENTO DE IMAGEM ----------------------------------------------------------
    const getImage = async () => {
        const res = await fetch(`http://localhost:8081/get/${system?.id_foto}`, {
            method:"GET",
            headers: {
              "content-type" : "application/json"
            }
          })
          const data = await res.json()
          setImg(data.image)
    }

    if(!img || img == "") {
        getImage()
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
        mudancaNoSistema()
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
          console.log(system)
          const res = await fetch(`http://localhost:8081/update/${system?.id_foto}`, {
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
            //setImg("")
            //fetchImage()
          }
        }
      }
      /*
      useEffect(() => {
        fetchImage()
      },[])
      */
    // -------------------------------------- FIM DA SEÇÃO DE TRATAMENTO DE IMAGEM ----------------------------------------------------------

    return(
        <div className="h-[80vh] overflow-y-auto">
            <div className="margin-right">
                <Text className="subtitle-s">CRIE UMA NOVA FORMA DE CONTAR HISTÓRIAS!</Text>
                <div className="grid grid-cols-2 margin-top-xs">
                    <div className="content-end">
                        {
                          img == "" ?
                          <FileUploadRoot alignItems="stretch" maxFiles={1} onFileChange={handleUploadImage}>
                              <FileUploadDropzone w={"36vw"} h={"36vh"}
                                  label="Faça o upload da capa do seu sistema"
                                  description=".png ou .jpg de até 5MB"
                              />
                              <FileUploadList/>
                          </FileUploadRoot>
                          :
                          <div className="uploadBox">
                          <Image rounded={"xl"} w={"36vw"} h={"36vh"} className="bg-purple-950" src={img}></Image>
                              <FileUploadRoot marginTop={'1'} alignItems="stretch" maxFiles={1} onFileChange={handleUploadImage}>
                              <FileUploadTrigger asChild>
                                  <Button variant="outline" size="sm">
                                  <HiUpload /> Upload file
                                  </Button>
                              </FileUploadTrigger>
                              <FileUploadList />
                              </FileUploadRoot>
                          </div>
                      }
                    </div>
                    <div className="padding-left content-end">
                        <Text className="text">Dê um nome ao seu sistema</Text>
                        <Input defaultValue={system.nome} onChange={titleChange} id="nomeSistema"></Input>
                        <Text className="text" mt={"4"}>Descreva brevemente como ele funciona</Text>
                        <Textarea defaultValue={system.descricao} resize={"none"} onChange={descriptionChange}></Textarea>
                        <Text className="text" mt={"4"}>Outras pessoas podem usar seu sistema?</Text>
                        <RadioGroup mt={"4"} display={"flex"} columnGap={4} defaultValue={system.tipo_sistema} onValueChange={typeChange}>
                            <Radio value="PRIVADO">Não, meu sistema será privado</Radio>
                            <Radio value="PUBLICO">Sim, meu sistema será público</Radio>
                        </RadioGroup>
                    </div>
                </div>
                <div className="text-end">
                      <Grid gap={2} mt={4} className="grid-cols-6">
                        <Button ml={4} className="col-start-4" disabled={!modifiedSystem} onClick={saveChanges}>Salvar alterações</Button>
                        <Button onClick={()=>setDeleteSystemDialog(true)} ml={4} className="col-start-6" color={"white"} backgroundColor={"red.700"}>Excluir sistema</Button>
                      </Grid>
                </div>
            
            </div>
            <DialogDeleteSystem open={deleteSystemDialog} handleClose={setDeleteSystemDialog} systemId={system.id} systemTitle={system.nome}/>
            <Toaster/>
        </div>
    )
}