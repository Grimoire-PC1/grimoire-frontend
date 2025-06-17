import { Input, Text, Textarea, Image, Separator, Button, Center, Flex, For, Grid, IconButton,  } from "@chakra-ui/react";
import { FileUploadRoot, FileUploadDropzone,FileUploadList } from "../ui/file-upload";
import {RadioGroup, Radio } from "../ui/radio";
import { AddNewCharacterProfile } from "../CharacterProfile/AddNewCharacterProfile";
import { RulesCard } from "../RulesCard/RulesCard";
import { CharacterSheetSection } from "../CharacterSheetComponents/CharacterSheetSection";
import { Avatar } from "../ui/avatar";
import { LuPlus } from "react-icons/lu";
import { useEffect, useState } from "react";
import { CharacterSheetDialog } from "../CharacterSheetComponents/CharacterSheetDialog";
import { SheetTab, System } from "@/interfaces/Models";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCampaignSheetTemplateTabs } from "@/services/campaignService";
import { getSystemSheetTemplateTabs } from "@/services/systemService";
import { CharacterSheetSectionSystem } from "../CharacterSheetComponents/CharacterSheetSectionSystem";
import { Izinho } from "../Izinho/Izinho";
import { SoundtrackSection } from "./SoundrackSection";
import { SoundtrackSectionDialog } from "./SoundtrackSectionDialog";

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

    const [data, setData] = useState<SheetTab[]>();
    const [flag,setFlag] = useState(0);

    const mutation = useMutation({
    mutationKey: ["playlists"],
    mutationFn: getSystemSheetTemplateTabs, //mudar isso pra um getPlaylists ou sla
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
                            <Izinho/>
                        </Flex>
                        <Text className="text">{subtitle}</Text>
                    </div>
                                        
                    <IconButton onClick={()=>setNewSection(true)} rounded={"full"} size={"2xl"} variant={"outline"} aria-label="Nova Aba"> 
                        <LuPlus />
                    </IconButton>
                </Flex>
                    <Grid maxH={"66vh"} overflowY={"auto"} className="grid-cols-2 margin-top-s" mb={12} gap={4}>
                        <For each={data}>
                            {(item) => <SoundtrackSection sectionTitle={item.nome} sectionId={item.id} handleEdit={fecharEforcar}/>}
                        </For>
                    </Grid>
            
            </div>

            <SoundtrackSectionDialog open={newSection} handleClose={setNewSection} handleCreate={fecharEforcar}/>
        </div>
    )
}