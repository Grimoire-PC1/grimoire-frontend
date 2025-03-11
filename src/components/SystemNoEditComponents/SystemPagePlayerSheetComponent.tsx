import {Text,Flex, Grid, IconButton, Box, For, } from "@chakra-ui/react";
import { LuPlus, LuSave } from "react-icons/lu";
import { Toaster, toaster } from "../ui/toaster";
import { useEffect, useReducer, useState } from "react";
import { CharacterSheetPlayerEditSection } from "../CharacterSheetComponents/CharacterSheetPlayerEditSection";
import { CharacterRegister, SheetTab } from "@/interfaces/Models";
import { getUserCharacters } from "@/services/characterService";
import { useMutation } from "@tanstack/react-query";
import { NewCharacterDialog } from "../Dialog/NewCharacterDialog";
import { Avatar } from "../ui/avatar";
import { getCampaignSheetTemplateSubTabs, getCampaignSheetTemplateTabs } from "@/services/campaignService";
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
    }, [characters]);

    function fecharEforcar(){
        getCharacters.mutate();
        setNewCharacter(false);
    }

    const [disableSaveButton,setDisableSaveButton] = useState(false);

    const [ids,setIds] = useState<any[]>([])

    const getTabsId = useMutation({
        mutationKey: ["subTabs"],
        mutationFn: getCampaignSheetTemplateSubTabs,
        onSuccess: (data) => {
            console.log(data)
            const array = []
            data.forEach((d) => array.push({id: d.id, tipo: d.tipo_sub_aba_ficha}))
            setIds(array);
        },
        onError: (error) => {
            console.log(error);
        },
        });

    function saveCharacter(){
        console.log('aAAAAAAAAAAAAAAAA')
        setDisableSaveButton(true);
        let dataLen = 0;
        if(data){
            dataLen = data.length;
        }
    
        const changes = [];

        if(data){
            console.log('aAAAAAAAAAAAAAAAA')
            for(let i of data){
                console.log('aAAAAAAAAAAAAAAAA')
                
                getTabsId.mutate(i.id);

                for(let j of ids){
                    let str = "";
                    if(j.tipo === "DADO"){
                        str+= (document.getElementById(String(j.id)+"_1")?.value||"0");
                        str+=","+(document.getElementById(String(j.id)+"_2")?.value||"0");
                        str+=","+(document.getElementById(String(j.id)+"_3")?.value||"0");
                    }else{
                        str = document.getElementById(String(j.id))?.value
                    }
                    changes.push({id_ficha_Content: j.id,novo_conteudo:str,id_personagem:displayCharacter?.id,id_sub_aba_ficha:j.id,conteudo:str})
                }
            }
        }
        /*
        for(let i = 1;i<dataLen;i++){
            for(let i = 1; i < 6;i++){ //para todo fieldId associado ao sectionId atual, faça:
                changes.push({id: 'field'+i,value:document.getElementById('field'+i)?.value}) //field+i sera trocado pelo fieldId atual da iteração
                //adicionar condicional especial pro tipo dado, que tem 3 valores associados (a lógica vai depender de como estiver o esquema no BD)
            }
        }
        */
        console.log(changes)

        const success = true;
        //depois do processamento acabar, habilitar o botao novamente
        setDisableSaveButton(false);
        if(success){
            toaster.create({
            description: "Personagem salvo com sucesso!",
            type: "success",
            })
        }else{
            toaster.create({
                description: "Houve um problema salvando o personagem",
                type: "error",
                })
        }
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
    }, []);

    function fecharEforcar2(){
        mutation.mutate();
        forceUpdate();
    }

    const getImage = async (id:string) => {
        const res = await fetch(`http://localhost:8081/get/${id}`, {
            method:"GET",
            headers: {
                "content-type" : "application/json"
            }
            })
            const data = await res.json()
            console.log(data)
            return data.image;
    }

    function updateInfo(c:CharacterRegister){
        setDisplayCharacter(c);
        forceUpdate();
    }

    return(

        <Box>
            <Flex mb={8} align={"center"} placeContent={"space-between"}>
                <div>
                    <Text className="subtitle-s">SEUS PERSONAGENS</Text>
                    <Flex wrap="wrap" mt='1' gapX={0.5}>
                        <For each={characters}>
                            {(item) => <Box cursor={"pointer"} onClick={()=>updateInfo(item)}>
                                            <Avatar size={"xl"} src={async ()=>getImage(item.id_foto)}></Avatar>
                                        </Box>
                            }
                        </For>
                        <Box onClick={()=>createCharacter()}><IconButton rounded={"full"} size={"xl"} variant={"outline"}><LuPlus/></IconButton></Box>
                    </Flex>
                </div>
                {
                    displayCharacter ?
                    <Box>
                        <FileUploadRoot cursor={"pointer"}>
                            <FileUploadTrigger>
                                <Avatar cursor={"pointer"} mr={20} scale={2} size={"2xl"} src={async ()=>getImage(displayCharacter.id_foto)}></Avatar>
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
                            <IconButton disabled={disableSaveButton}
                            onClick={()=>saveCharacter()}><LuSave /></IconButton>
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