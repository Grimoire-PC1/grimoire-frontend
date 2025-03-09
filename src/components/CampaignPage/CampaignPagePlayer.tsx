import { Text,Separator, CardBody, CardHeader, CardRoot, CardTitle, Center, Flex, For,} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCampaignCharacters } from "@/services/campaignService";
import { Avatar } from "../ui/avatar";
import { getUserCharacters } from "@/services/characterService";
import { getCampaignSessions } from "@/services/sessionService";
import { PinnedDiaryListCardNoEdit } from "../PinnedDiaryView/PinnedDiaryListCardNoEdit";

export const CampaignPagePlayer = () => {
    const campaign = JSON.parse(sessionStorage.getItem('currentCampaign')||'')

    const {data: sessoesDaCampanha} = useQuery({
        queryKey: ["sessoes"],
        queryFn: getCampaignSessions
    })
    sessoesDaCampanha?.sort((a, b) => {
        return a.id - b.id;
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

    let {data: userCharas} = useQuery({
        queryKey: ["getCampaignCharacters"],
        queryFn: getUserCharacters
      })
      userCharas = userCharas?.filter((c)=> c.id_campanha == campaign.id).sort((a, b) => {
          return a.id - b.id;
      });

    useEffect(() => {
        const updateMyCharasArray = async () => {
            const updatedMyCharas = [];

            for (let c of userCharas || []) {
                const f = await getImage(c.id_foto);
                updatedMyCharas.push({ id: c.id, foto: f });
            }

            // Atualiza o estado
            setMyCharas(updatedMyCharas);
        };

        if (userCharas && (flag1 == 0)) {
            updateMyCharasArray();
            setFlag1(1);
        }
    }, [userCharas]);

    let {data: allCharas} = useQuery({
        queryKey: ["getCampaignCharacters"],
        queryFn: getCampaignCharacters
      })
      allCharas = allCharas?.filter((c) => c.id_usuario != c.id_campanha_mestre && !(userCharas?.includes(c))).sort((a, b) => {
          return a.id - b.id;
      });

    useEffect(() => {
        const updateOtherCharasArray = async () => {
            const updatedOtherCharas = [];

            for (let c of allCharas || []) {
                const f = await getImage(c.id_foto);
                updatedOtherCharas.push({ id: c.id, foto: f });
            }

            // Atualiza o estado
            setOtherCharas(updatedOtherCharas);
        };

        if (allCharas && (flag2 == 0)) {
            updateOtherCharasArray();
            setFlag2(1);
        }
    }, [allCharas]);

    return(
        <div>

            <div className="grid grid-cols-3 gap-x-8 content-padding">
                <div className="col-span-1">
                    {/* aqui vem a descrição da campanha */}
                    <Text className="text" textAlign={"justify"}>{campaign.descricao}</Text>
                </div>
                <div className="col-span-1 max-h-[80vh]">

                    <CardRoot className="w-full h-[36vh]">
                        <CardHeader>
                            <CardTitle className="text-center padding-bottom">MEUS PERSONAGENS</CardTitle>
                            <Separator></Separator>
                        </CardHeader>
                        <CardBody overflowY={"scroll"}  className="flex">
                            <Center>
                                <Flex wrap="wrap" mt='1'>
                                    <For each={myCharas}>
                                        {(item) => <Avatar size={"xl"} m={1} src={item.foto}/>}
                                    </For>
                                </Flex>
                            </Center>
                        </CardBody>
                    </CardRoot>

                    <CardRoot mt={"4"} className="w-full h-[36vh]">
                        <CardHeader>
                            <CardTitle className="text-center padding-bottom">PERSONAGENS DOS OUTROS JOGADORES</CardTitle>
                            <Separator></Separator>
                        </CardHeader>
                        <CardBody overflowY={"scroll"}  className="flex">
                            <Center>
                                <Flex alignItems={"center"} wrap="wrap" mt='1'>
                                    <For each={otherCharas}>
                                        {(item) => <Avatar size={"xl"} m={1} src={item.foto}/>}
                                    </For>
                                </Flex>
                            </Center>
                        </CardBody>
                    </CardRoot>
                </div>
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
            
        </div>
    )
}