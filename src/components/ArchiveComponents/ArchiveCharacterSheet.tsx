import {Text,Flex, Grid, IconButton, For, } from "@chakra-ui/react";
import { LuCamera, LuChevronLeft, LuSave } from "react-icons/lu";
import { Toaster, toaster } from "../ui/toaster";
import { useEffect, useReducer, useState } from "react";
import { CharacterSheetPlayerEditSection } from "../CharacterSheetComponents/CharacterSheetPlayerEditSection";
import { useNavigate } from "react-router-dom";
import { Avatar } from "../ui/avatar";
import { CharacterSheetPlayerNoEditSection } from "../CharacterSheetComponents/CharacterSheetPlayerNoEditSection";
import { Campaign, CharacterRegister, SheetTab } from "@/interfaces/Models";
import { useMutation } from "@tanstack/react-query";
import { getCampaignCharacters, getCampaignSheetTemplateTabs } from "@/services/campaignService";
import { FileUploadRoot, FileUploadTrigger } from "../ui/file-upload";

export interface SystemPageComponentProps {
    campaign: Campaign;
    characterId:string;
    characterName:string;
}

export const ArchiveCharacterSheet = ({
    characterId,
    campaign,
    characterName
}: SystemPageComponentProps) => {

    const navigate = useNavigate();
    const [,forceUpdate] = useReducer(x=>x+1,0); 
    
    const is_creator = sessionStorage.getItem('isGameMaster');
    const [displayCharacter,setDisplayCharacter] = useState<CharacterRegister>();
    const [flag,setFlag] = useState(0);
    const [data, setData] = useState<SheetTab[]>();
    const [flagTabs,setFlagTabs] = useState(0);

    const getCharacters = useMutation({
        mutationKey: ["getNPC"],
        mutationFn: getCampaignCharacters,
        onSuccess: (data) => {
          const filteredData = data.filter((d) => d.id === parseInt(characterId))
          console.log(filteredData);
          if(filteredData.length > 0){
            setDisplayCharacter(filteredData[0]);
          }
        },
        onError: (error) => {
          console.log(error);
        },
      });
    
    useEffect(() => {
        if(flag <2){
            getCharacters.mutate();
            setFlag(flag+1);
        }
    }, [flag, getCharacters]);

    const mutation = useMutation({
        mutationKey: ["tabs"],
        mutationFn: getCampaignSheetTemplateTabs,
        onSuccess: (data) => {
            console.log(data)
            setData(data.sort((a, b) => {
                return a.id - b.id;
            }));
            setFlagTabs(1);
        },
        onError: (error) => {
            console.log(error);
        },
    });

    useEffect(() => {
        if(flagTabs == 0){
            mutation.mutate();
        }
    }, [flagTabs, mutation]);

    function fecharEforcar2(){
        mutation.mutate();
        forceUpdate();
    }

    const [img,setImg] = useState("")
    
    const getImage = async () => {
        const res = await fetch(`http://localhost:8081/get/${displayCharacter.id_foto}`, {
            method:"GET",
            headers: {
                "content-type" : "application/json"
            }
            })
            const data = await res.json()
            console.log(data)
            setImg(data.image);
    }

    if(displayCharacter){
        if(!img || img == "") {
            getImage()
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
      
      const handleImageSubmit = async () =>{
        if(img) {
          const res = await fetch(`http://localhost:8081/update/${displayCharacter.id_foto}`, {
            method:"PATCH",
            headers: {
              "content-type" : "application/json"
            },
            body: JSON.stringify({image: img})
          })
          const data = await res.json()
          console.log(data)
          toaster.create({
                        description: `Foto de ${characterName} atualizada com sucesso!`,
                        type: "success",
                        })
        }
      }

    function goBack(){
        const f = JSON.parse(sessionStorage.getItem('pastaAtual')||'');
        navigate(`/grimoire/campaign/archive/${(f.nome).toLowerCase()}`)
        location.reload();
    }

    return(
        <div className="">
            {
                is_creator ?
                <div className="margin-right">
                    <Flex align={"center"} placeContent={"space-between"}>
                        <Flex gapX={4} alignItems={"center"}>
                            <IconButton onClick={()=>goBack()} rounded={"full"} size={"xl"} variant={"ghost"} aria-label="Voltar"> 
                                <LuChevronLeft />
                            </IconButton>
                            <Text mr={2} className="subtitle-s">FICHA DE {characterName.toUpperCase()}</Text>
                        </Flex>
                        <Flex  gapX={2} align={"center"}>
                            <Avatar m={6} scale={1.7} size={"2xl"} src={img}></Avatar>
                            <Flex flexDirection={"column"} gapY={2}>
                            <FileUploadRoot maxFiles={1} onFileChange={handleUploadImage}>
                                <FileUploadTrigger>
                                    <IconButton><LuCamera/></IconButton>
                                </FileUploadTrigger>
                            </FileUploadRoot>
                            <IconButton onClick={handleImageSubmit}><LuSave/></IconButton>
                            </Flex>
                        </Flex>
                    </Flex>

                    <Grid mt={2} maxH={"72vh"} overflowY={"auto"} className="grid-cols-2" mb={12} gap={4}>
                        <For each={data}>
                            {(item) =><CharacterSheetPlayerEditSection sectionTitle={item.nome} sectionId={item.id} characterId={displayCharacter?.id||0} handleEdit={fecharEforcar2}/>}
                        </For>
                    </Grid>
                
                    <Toaster />
                </div>
                :
                <div className="margin-right">
                    <Flex placeContent={"space-between"}>
                        <Flex gapX={4} alignItems={"center"}>
                            <IconButton onClick={()=>goBack()} rounded={"full"} size={"xl"} variant={"ghost"} aria-label="Voltar"> 
                                <LuChevronLeft />
                            </IconButton>
                            <Text mr={2} className="subtitle-s">FICHA DE {characterName.toUpperCase()}</Text>
                            <Avatar m={6} scale={1.7} size={"2xl"} src={img}></Avatar>
                        </Flex>
                    </Flex>
                        <Grid mt={2} maxH={"72vh"} overflowY={"auto"} className="grid-cols-2" mb={12} gap={4}>
                        <For each={data}>
                            {(item) =><CharacterSheetPlayerNoEditSection sectionTitle={item.nome} sectionId={item.id} characterId={displayCharacter?.id||0} handleEdit={fecharEforcar2}/>}
                        </For>
                    </Grid>
                
                </div>
            }
        </div>
    )
}