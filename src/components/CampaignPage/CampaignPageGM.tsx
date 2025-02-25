import { Input, Text, Textarea, Image, Separator, Button, Center, Flex, For, FileUploadTrigger,} from "@chakra-ui/react";
import { FileUploadDropzone, FileUploadList, FileUploadRoot } from "../ui/file-upload";
import { PinnedDiaryListCard } from "../PinnedDiaryView/PinnedDiaryListCard";
import { CharacterProfile } from "../CharacterProfile/CharacterProfile";
import { Campaign, Character } from "@/interfaces/Models";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateCampaign } from "@/services/campaignService";
import { TemporaryCampaignPayload, UpdateCampaignPayload } from "@/interfaces/ServicePayload";
import { HiUpload } from "react-icons/hi";

export interface CampaignPageGMProps {
    user: string;
    campaign?: Campaign; //depois mudar pra Campaign
}

export const CampaignPageGM = ({
    user,
    campaign,
}: CampaignPageGMProps) => {

    const [img,setImg] = useState("")

    const [modifiedCampaign, setModifiedCampaign] = useState(false);

    const [campaignTilte, setCampaignTilte] = useState({});

    const [campaignDescription, setCampaignDecription] = useState({});

    function mudancaNaCampanha() {
        /* 
        ---- BACKEND PENDING ----

        if(campaignTilte['value'] != campaign.titulo || campaignDescription['value'] != campaign.descricao) {
            setModifiedCampaign(true)
        } else {
            setModifiedCampaign(false)
        }
        */
        setModifiedCampaign(true)
    }

    const titleChange = (e: any) => {
        const value = e.target.value;
        setCampaignTilte({
          ...campaignTilte,
          'value': value
        });
        mudancaNaCampanha()
    };
    
    const descriptionChange = (e: any) => {
        const value = e.target.value;
        setCampaignDecription({
          ...campaignDescription,
          'value': value
        });
        mudancaNaCampanha()
    };

    const saveChanges = async () => {
        const title = campaignTilte['value'];
        const description = campaignDescription['value'];
        const image = await handleImageSubmit();
        console.log(image)
        console.log("title ---->", title, "description --->", description); 
        const updateCampaignPayload: UpdateCampaignPayload = {
            novo_titulo: title,
            nova_descricao: description,
            nova_foto_url: campaign?.foto_url,
            id_novo_sistema: 4
        }
        console.log(campaign?.id)
        const temporaryCampaignPayload: TemporaryCampaignPayload = {
            payload: updateCampaignPayload,
            campaignId: Number(campaign?.id)
        }
        console.log(updateCampaignPayload)
        mutation.mutate(temporaryCampaignPayload);
     };

    const mutation = useMutation({
        mutationKey: ["updateCampaign"],
        mutationFn: updateCampaign,
        onSuccess: (data) => {
          console.log(data)
        },
        onError: (error) => {
          console.log(error);
          
        },
      });

    const players = [[''],[''],['','']];
    var characters: string[][] = [];

    for(let i = 0; i < players.length; i++) {
        characters.push(players[i]);
    }

    // -------------------------------------- SESSÃO DE TRATAMENTO DE IMAGEM ----------------------------------------------------------
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
        mudancaNaCampanha()
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
          const res = await fetch(`http://localhost:8081/update/${campaign?.foto_url}`, {
            method:"PATCH",
            headers: {
              "content-type" : "application/json"
            },
            body: JSON.stringify({img: img})
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
    // -------------------------------------- FIM DA SESSÃO DE TRATAMENTO DE IMAGEM ----------------------------------------------------------

    return(
        <div className="h-[80vh] overflow-y-auto">
            <div className="margin-right">
                <Text className="subtitle-s">PERSONALIZE SUA HISTÓRIA</Text>
                <div className="grid grid-cols-2 margin-top-xs">
                    <div className="content-end">
                        {
                            img == "" ?
                            <FileUploadRoot alignItems="stretch" maxFiles={1} onFileChange={handleUploadImage}>
                                <FileUploadDropzone w={"36vw"} h={"36vh"}
                                    label="Faça o upload da capa da sua campanha"
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
                        <Text className="text">Título</Text>
                        <Input onChange={titleChange} id="TituloCampanha"></Input>
                        <Text className="text" mt={"4"}>Descreva sua história</Text>
                        <Textarea resize={"none"} onChange={descriptionChange} id="DescricaoCampanha"></Textarea>
                        {!modifiedCampaign ?
                            <Button mt={"4"} disabled>Salvar alterações</Button> 
                            :
                            <Button mt={"4"} onClick={saveChanges}>Salvar alterações</Button>
                        }
                    </div>
                </div>
                <div className="grid grid-cols-28 margin-top-s">
                    <div className="col-span-16 margin-right">
                        <Text className="subtitle-s">HISTÓRICO DE SESSÕES</Text>
                        {/*
                        ---- BACKEND PENDING ----

                        <For each={campaign.diario.fixedSessions}>
                            {(item) => <PinnedDiaryListCard title={item.title} date={item.date}/>
                            }
                        </For>
                        */}
                        
                        <PinnedDiaryListCard/>
                        <PinnedDiaryListCard/>
                        <PinnedDiaryListCard/>
                        <PinnedDiaryListCard/>
                        <PinnedDiaryListCard/>
                        <PinnedDiaryListCard/>
                        {/* aqui vem uma lista de PinnedDiaryListCard. clicar em um card abre a entrada do diário para aquela sessão*/}
                    </div>
                    <Separator orientation={"vertical"} className="col-span-1"></Separator>
                    <div className="col-span-11">
                        <Text className="subtitle-s text-center">PERSONAGENS DOS JOGADORES</Text>
                        <Center>
                            <Flex wrap="wrap" mt='2'>
                                <For each={characters}>
                                    {(itemPlayer) => 
                                    <For each={itemPlayer}>
                                        {(itemCharacter) => <CharacterProfile mt='1' mr='1' ml='1' mb="1" character={itemCharacter}></CharacterProfile>}
                                    </For>}
                                </For>
                            </Flex>
                        </Center>
                        {/* aqui vem uma lista de avatares dos jogadores. clicar neles leva à ficha do personagem*/}
                    </div>
                </div>
            </div>
        </div>
    )
}