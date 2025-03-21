import { Text,Separator, CardBody, CardHeader, CardRoot, CardTitle, Center, Flex, For, Box, Button,} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useMutation,} from "@tanstack/react-query";
import { getCampaignCharacters, getCampaignOtherCharacters } from "@/services/campaignService";
import { Avatar } from "../ui/avatar";
import { getUserCharacters } from "@/services/characterService";
import { getCampaignSessions } from "@/services/sessionService";
import { PinnedDiaryListCardNoEdit } from "../PinnedDiaryView/PinnedDiaryListCardNoEdit";
import { useNavigate } from "react-router-dom";
import { DialogLeaveCampaign } from "../Dialog/DialogLeaveCampaign";
import { Session } from "@/interfaces/Models";

export interface PageProps {
    userId:number;
}

export const CampaignPagePlayer = ({
    userId
}: PageProps) => {
    const campaign = JSON.parse(sessionStorage.getItem('currentCampaign')||'{}')
    const [sessoesDaCampanha,setSessoes] = useState<Session[]>();

    const sessionsMutation = useMutation({
      mutationKey: ["sessoes"],
      mutationFn: getCampaignSessions,
      onSuccess: (data) => {
        console.log(data)
        setSessoes(data.sort((a, b) => {
          return a.id - b.id;
      }))
      },
      onError: (error) => {
        console.log(error);
        
      },
    });

    type MyCharas = {
        id:number;
        foto: any;
    }

    const [myCharas, setMyCharas] = useState<MyCharas[]>([]);
    const [otherCharas, setOtherCharas] = useState<MyCharas[]>([]);
    const [flag1,setFlag1] = useState(0);
    const [flag2,setFlag2] = useState(0);


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
      const myCharasMutation = useMutation({
        mutationKey: ["meusPersonagensCampanha"],
        mutationFn: getUserCharacters, 
        onSuccess: async (data) => {
            console.log(data)
            const updatedMyCharas = [];
            const filteredData = data.filter((c) => c.id_campanha === campaign.id).sort((a, b) => {
                return a.id - b.id;
            })

            for (let c of filteredData || []) {
                const f = await getImage(c.id_foto);
                updatedMyCharas.push({ id: c.id, foto: f });
            }

            console.log("atualizando meus personagens")
            setMyCharas(updatedMyCharas);
            console.log(updatedMyCharas);
        },
        onError: (error) => {
          console.log(error);
        },
      });

    useEffect(() => {
        if (flag1 == 0) {
            myCharasMutation.mutate();
            sessionsMutation.mutate();
            setFlag1(1);
        }
    }, [flag1]);

    const allCharasMutation = useMutation({
    mutationKey: ["personagensDosOutrosCampanha"],
    mutationFn: getCampaignOtherCharacters, 
    onSuccess: async (data) => {
        console.log(data)
        const filteredData = data.filter((c) => c.id_usuario != c.id_campanha_mestre).sort((a, b) => {
            return a.id - b.id;
        })

        console.log('coisa filtrada:')
        console.log(filteredData)
        console.log(userId);

        const updatedOtherCharas = [];

        for (let c of filteredData || []) {
            const f = await getImage(c.id_foto);
            updatedOtherCharas.push({ id: c.id, foto: f });
        }

        console.log("atualizando os outros personagens")
        setOtherCharas(updatedOtherCharas);

        console.log(updatedOtherCharas);
    },
    onError: (error) => {
        console.log(error);
    },
    });

    useEffect(() => {
        if (flag2 < 2) {
            allCharasMutation.mutate();
            sessionsMutation.mutate();
            setFlag2(flag2+1);
        }
    }, [flag2]);

    const navigate = useNavigate();

    const [leaveCampaign,setLeaveCampaign] = useState(false);
    return(
        <div>

            <div className="grid grid-cols-3 gap-x-8 content-padding">
                <Flex flexDirection={"column"} h={"80vh"} justifyContent={"space-between"}>
                    <Text className="text" textAlign={"justify"}>{campaign.descricao}</Text>
                    <Button onClick={()=>setLeaveCampaign(true)} mr={16} ml={16} color={"white"} backgroundColor={"red.700"}>Sair da campanha</Button>
                </Flex>
                    <Flex gapY={4} h={"80vh"} className="flex-col">
                        <CardRoot h={"full"}>
                            <CardHeader>
                                <CardTitle className="text-center padding-bottom">MEUS PERSONAGENS</CardTitle>
                                <Separator></Separator>
                            </CardHeader>
                            <CardBody overflowY={"auto"}  className="flex">
                                <Center>
                                    <Flex wrap="wrap" mt='1'>
                                        <For each={myCharas}>
                                            {(item) => <Box cursor={"pointer"} onClick={()=>navigate("/grimoire/campaign/sheet")}><Avatar size={"xl"} m={1} src={item.foto}/></Box>}
                                        </For>
                                    </Flex>
                                </Center>
                            </CardBody>
                        </CardRoot>

                        <CardRoot h={"full"}>
                            <CardHeader>
                                <CardTitle className="text-center padding-bottom">PERSONAGENS DOS OUTROS JOGADORES</CardTitle>
                                <Separator></Separator>
                            </CardHeader>
                            <CardBody overflowY={"auto"}  className="flex">
                                <Center>
                                    <Flex alignItems={"center"} wrap="wrap" mt='1'>
                                        <For each={otherCharas}>
                                            {(item) => <Avatar size={"xl"} m={1} src={item.foto}/>}
                                        </For>
                                    </Flex>
                                </Center>
                            </CardBody>
                        </CardRoot>
                    </Flex>
                <CardRoot className="max-h-[80vh] col-span-1">
                    <CardHeader>
                        <CardTitle className="text-center padding-bottom">REVISITAR AVENTURAS</CardTitle>
                        <Separator></Separator>
                    </CardHeader>
                    <CardBody  overflowY={"auto"}>
                        <For each={sessoesDaCampanha}>
                            {(item) => item.id_campanha == campaign.id && item.fixada ? 
                                <PinnedDiaryListCardNoEdit titulo={item.titulo} descricao={item.descricao} data={item.data}/> 
                            : <div></div>
                            }
                        </For>
                    </CardBody>
                </CardRoot>
            </div>
            <DialogLeaveCampaign open={leaveCampaign} handleClose={setLeaveCampaign} campaignId={campaign.id} campaignTitle={campaign.titulo}/>
        </div>
    )
}