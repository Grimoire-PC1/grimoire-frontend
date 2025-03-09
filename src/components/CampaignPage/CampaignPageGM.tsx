import { Input, Text, Textarea, Image, Separator, Button, Center, Flex, For, FileUploadTrigger,} from "@chakra-ui/react";
import { FileUploadDropzone, FileUploadList, FileUploadRoot } from "../ui/file-upload";
import { PinnedDiaryListCard } from "../PinnedDiaryView/PinnedDiaryListCard";
import { CharacterProfile } from "../CharacterProfile/CharacterProfile";
import { useEffect, useReducer, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCampaignById, getCampaignCharacters, updateCampaign } from "@/services/campaignService";
import { TemporaryCampaignPayload, UpdateCampaignPayload } from "@/interfaces/ServicePayload";
import { HiUpload } from "react-icons/hi";
import { toaster, Toaster } from "../ui/toaster";
import { getCampaignSessions } from "@/services/sessionService";
import { Avatar } from "../ui/avatar";

export const CampaignPageGM = () => {
    const [,forceUpdate] = useReducer(x=>x+1,0); 

    const {data: sessoesDaCampanha} = useQuery({
      queryKey: ["sessoes"],
      queryFn: getCampaignSessions
    })
    sessoesDaCampanha?.sort((a, b) => {
        return a.id - b.id;
    });

    const campaign = JSON.parse(sessionStorage.getItem('currentCampaign')||'');

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
        const title = campaignTilte['value']||'';
        const description = campaignDescription['value']||'';
        const image = await handleImageSubmit();
        console.log(image)
        console.log("title ---->", title, "description --->", description); 
        const updateCampaignPayload: UpdateCampaignPayload = {
            novo_titulo: title != "" ? title : campaign.titulo,
            nova_descricao: description != "" ? description : campaign.descricao,
            nova_id_foto: campaign?.id_foto,
            id_novo_sistema: 4
        }
        console.log(campaign?.id)
        const temporaryCampaignPayload: TemporaryCampaignPayload = {
            payload: updateCampaignPayload,
            campaignId: Number(campaign?.id)
        }
        console.log(updateCampaignPayload)
        mutation.mutate(temporaryCampaignPayload);

        forceUpdate();
        setModifiedCampaign(false);
     };

    const mutation = useMutation({
        mutationKey: ["updateCampaign"],
        mutationFn: updateCampaign,
        onSuccess: (data) => {
          console.log(data)
          toaster.create({
                      description: "Campanha atualizada com sucesso!",
                      type: "success",
                      })
        },
        onError: (error) => {
          console.log(error);
          toaster.create({
            description: "Houve um problema salvando sua campanha",
            type: "error",
            })
        },
      });


    // -------------------------------------- SEÇÃO DE TRATAMENTO DE IMAGEM ----------------------------------------------------------
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

  const getPlayerImage = async (id:string) => {
    const res = await fetch(`http://localhost:8081/get/${id}`, {
        method:"GET",
        headers: {
          "content-type" : "application/json"
        }
      })
      const data = await res.json()
      return data.image;
}

    type MyCharas = {
      id:number;
      foto: any;
      nome:string;
  }

    const [otherCharas, setOtherCharas] = useState<MyCharas[]>([]);
    const [flag,setFlag] = useState(0);

    let {data: allCharas} = useQuery({
        queryKey: ["getCampaignCharacters"],
        queryFn: getCampaignCharacters
      })
      allCharas = allCharas?.filter((c) => c.id_usuario != c.id_campanha_mestre).sort((a, b) => {
          return a.id - b.id;
      });

    useEffect(() => {
        const updateOtherCharasArray = async () => {
            const updatedOtherCharas = [];

            for (let c of allCharas || []) {
                const f = await getPlayerImage(c.id_foto);
                updatedOtherCharas.push({ id: c.id, foto: f,nome:c.nome });
            }

            // Atualiza o estado
            setOtherCharas(updatedOtherCharas);
        };

        if (allCharas && (flag == 0)) {
            updateOtherCharasArray();
            setFlag(1);
            console.log(otherCharas)
        }
    }, [allCharas]);


    if(!img || img == "") {
        getImage(campaign?.id_foto)
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
          const res = await fetch(`http://localhost:8081/update/${campaign?.id_foto}`, {
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
                        <Input defaultValue={campaign.titulo} onChange={titleChange} id="TituloCampanha"></Input>
                        <Text className="text" mt={"4"}>Descreva sua história</Text>
                        <Textarea defaultValue={campaign.descricao} resize={"none"} onChange={descriptionChange} id="DescricaoCampanha"></Textarea>
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
                        <For each={sessoesDaCampanha}>
                            {(item) => item.id_campanha == campaign.id && item.fixada ? 
                                <PinnedDiaryListCard titulo={item.titulo} descricao={item.descricao} data={item.data} id={item.id} tipo={item.tipo_sessao} fixada={item.fixada} /> 
                            : <div></div>
                            }
                        </For>
                        {/* aqui vem uma lista de PinnedDiaryListCard. clicar em um card abre a entrada do diário para aquela sessão*/}
                    </div>
                    <Separator orientation={"vertical"} className="col-span-1"></Separator>
                    <div className="col-span-11">
                        <Text className="subtitle-s text-center">PERSONAGENS DOS JOGADORES</Text>
                        <Center>
                            <Flex wrap="wrap" mt='2'>
                                      <For each={otherCharas}>
                                          {(item) => <Avatar name={item.nome} size={"xl"} m={1} src={item.foto}/>}
                                      </For>
                            </Flex>
                        </Center>
                        {/* aqui vem uma lista de avatares dos jogadores. clicar neles leva à ficha do personagem*/}
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    )
}