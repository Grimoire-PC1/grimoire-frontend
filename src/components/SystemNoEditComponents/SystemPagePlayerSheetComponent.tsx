import {Text,Flex, Grid, IconButton, Box, For, } from "@chakra-ui/react";
import { LuCamera, LuPlus, LuSave } from "react-icons/lu";
import { toaster, Toaster, } from "../ui/toaster";
import { useEffect, useReducer, useState } from "react";
import { CharacterSheetPlayerEditSection } from "../CharacterSheetComponents/CharacterSheetPlayerEditSection";
import { CharacterRegister, SheetTab } from "@/interfaces/Models";
import { getUserCharacters } from "@/services/characterService";
import { useMutation } from "@tanstack/react-query";
import { NewCharacterDialog } from "../Dialog/NewCharacterDialog";
import { Avatar } from "../ui/avatar";
import { getCampaignSheetTemplateTabs } from "@/services/campaignService";
import { FileUploadRoot, FileUploadTrigger } from "../ui/file-upload";

export const SystemPagePlayerSheetComponent = () => {
    const [,forceUpdate] = useReducer(x=>x+1,0);

    const [displayCharacter,setDisplayCharacter] = useState<CharacterRegister>();
    const [newCharacter,setNewCharacter] = useState(false);
    const [characters,setCharacters] = useState<CharacterRegister[]>();
    const [flag,setFlag] = useState(0);
    const [data, setData] = useState<SheetTab[]>();
    const [flagTabs,setFlagTabs] = useState(0);

    function createCharacter(){
        setNewCharacter(true);
    }

    const getCharacters = useMutation({
        mutationKey: ["getCharacters"],
        mutationFn: getUserCharacters,
        onSuccess: (data) => {
          console.log(data);
          setCharacters(data);
          if(data.length > 0){
            setDisplayCharacter(data[0]);
          }
        },
        onError: (error) => {
          console.log(error);
        },
      });

    useEffect(() => {
        if(flag == 0){
            getCharacters.mutate();
            setFlag(1);
        }
    }, [characters, flag, getCharacters]);

    function fecharEforcar(){
        getCharacters.mutate();
        setNewCharacter(false);
    }

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
        const res = await fetch(`http://localhost:8081/get/${characters[0].id_foto}`, {
            method:"GET",
            headers: {
                "content-type" : "application/json"
            }
            })
            const data = await res.json()
            console.log(data)
            setImg(data.image);
    }

    function updateInfo(c:CharacterRegister){
        setDisplayCharacter(c);
        forceUpdate();
    }

    if(characters && characters?.length > 0){
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
          const res = await fetch(`http://localhost:8081/update/${characters[0].id_foto}`, {
            method:"PATCH",
            headers: {
              "content-type" : "application/json"
            },
            body: JSON.stringify({image: img})
          })
          const data = await res.json()
          console.log(data)
          toaster.create({
                        description: `Foto de ${characters[0].nome} atualizada com sucesso!`,
                        type: "success",
                        })
        }
      }

    return(

        <Box>
            <Flex mb={8} align={"center"} placeContent={"space-between"}>
                <div>
                    <Text className="subtitle-s">SEUS PERSONAGENS</Text>
                    <Flex wrap="wrap" mt='1' gapX={0.5}>
                        {
                            (characters?.length||0) > 0 ?
                            <For each={characters}>
                            {(item) => <Box cursor={"pointer"} onClick={()=>updateInfo(item)}>
                                            <Avatar size={"xl"} src={img}></Avatar>
                                        </Box>
                            }
                            </For>
                            :
                            <Box onClick={()=>createCharacter()}><IconButton rounded={"full"} size={"xl"} variant={"outline"}><LuPlus/></IconButton></Box>
                        }
                        
                        
                    </Flex>
                </div>
                {
                    displayCharacter ?
                    <Box>
                        <FileUploadRoot cursor={"pointer"}>
                            <FileUploadTrigger>
                                <Avatar cursor={"pointer"} mr={20} scale={2} size={"2xl"} src={img}></Avatar>
                            </FileUploadTrigger>
                        </FileUploadRoot>
                    </Box>
                    :
                    <div></div>
                }
            </Flex>
                <div className="">
                <div className="margin-right">
                    <Flex placeContent={"space-between"}>
                        <div>
                            {displayCharacter ? 
                            <Text className="subtitle-s">FICHA DE {displayCharacter.nome.toUpperCase()}</Text>
                            : 
                            <Text className="subtitle-s">CRIE UM PERSONAGEM!</Text>}
                        </div>
                        {
                            displayCharacter ?
                            <Flex gapX={2}>
                            <FileUploadRoot maxFiles={1} onFileChange={handleUploadImage}>
                                <FileUploadTrigger>
                                    <IconButton><LuCamera/></IconButton>
                                </FileUploadTrigger>
                            </FileUploadRoot>
                            <IconButton onClick={handleImageSubmit}><LuSave/></IconButton>

                            </Flex>
                            :
                            <div></div>
                        }
                    </Flex>
                        <Grid mt={2} maxH={"53vh"} overflowY={"auto"} className="grid-cols-2" mb={12} gap={4}>
                            <For each={data}>
                                {(item) =><CharacterSheetPlayerEditSection sectionTitle={item.nome} sectionId={item.id} characterId={displayCharacter?.id||0} handleEdit={fecharEforcar2}/>}
                            </For>
                        </Grid>
                
                </div>
                <Toaster />
            </div>
            <NewCharacterDialog open={newCharacter} handleCreate={fecharEforcar} handleClose={setNewCharacter} campaignId={parseInt(sessionStorage.getItem("currentCampaignId")||"0")}/>
        </Box>

        
    )
}