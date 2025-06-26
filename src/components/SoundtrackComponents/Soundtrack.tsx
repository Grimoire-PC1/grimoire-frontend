import { Text, Flex, For, Grid, IconButton,  } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";
import { useEffect, useState } from "react";
import { PlaylistTab } from "@/interfaces/Models";
import { useMutation } from "@tanstack/react-query";
import { SoundtrackSection } from "./SoundrackSection";
import { SoundtrackSectionDialog } from "./SoundtrackSectionDialog";
import { getPlaylistTabs } from "@/services/playlistService";
import { Izinho1 } from "../Izinho/Izinho1";
import { soundtrackText } from "../Izinho/izinhoText";

export interface SystemPageComponentProps {
    title: string;
    subtitle: string;
    campaign:string;
}

export const Soundtrack = ({
    title,
    subtitle,
    campaign
}: SystemPageComponentProps) => {

    const [data, setData] = useState<PlaylistTab[]>();
    const [flag,setFlag] = useState(0);

    const mutation = useMutation({
    mutationKey: ["playlists"],
    mutationFn: getPlaylistTabs,
    onSuccess: (data) => {
        console.log(data)
        setData(data.sort((a, b) => {
            return a.id - b.id;
        }));
        setFlag(1);
    },
    onError: (error) => {
        console.log(error);
    },
    });

    useEffect(() => {
        if(flag == 0){
            mutation.mutate();
        }
    }, []);

    const [newSection,setNewSection] = useState(false);

    function fecharEforcar(){
        setNewSection(false);
        mutation.mutate();
    }

    
    
    return(
        <div className="">
            <div className="margin-right">
                <Flex placeContent={"space-between"}>
                    <div>
                        <Flex gap={2} alignItems={"center"}>
                            <Text className="subtitle-s">{title}</Text>
                            <Izinho1 texto={soundtrackText.text1}/>
                        </Flex>
                        <Text className="text">{subtitle}</Text>
                    </div>
                                        
                    <IconButton onClick={()=>setNewSection(true)} rounded={"full"} size={"2xl"} variant={"outline"} aria-label="Nova Aba"> 
                        <LuPlus />
                    </IconButton>
                </Flex>
                    <Grid maxH={"66vh"} overflowY={"auto"} className="grid-cols-2 margin-top-s" mb={12} gap={4}>
                        <For each={data}>
                        {/*<For each={[{nome:"jorge", id:1, id_campanha:1},{nome:"regina", id:2, id_campanha:1}]}>*/}
                            {(item) => <SoundtrackSection sectionTitle={item.nome} sectionId={item.id} campaignSectionId={item.id_campanha} handleEdit={fecharEforcar}/>}
                        </For>
                    </Grid>
            
            </div>

            <SoundtrackSectionDialog open={newSection} handleClose={setNewSection} handleCreate={fecharEforcar}/>
        </div>
    )
}