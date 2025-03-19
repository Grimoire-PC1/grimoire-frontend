import {Text,Flex, Grid, For, } from "@chakra-ui/react";
import { CharacterSheetNoEditSection } from "../CharacterSheetComponents/CharacterSheetNoEditSection";
import { SheetTab, System } from "@/interfaces/Models";
import { getSystemSheetTemplateTabs } from "@/services/systemService";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CharacterSheetSectionSystem } from "../CharacterSheetComponents/CharacterSheetSectionSystem";

export interface SystemPageComponentProps {
    system: System; //depois mudar pra System
    title: string; //nao mude isso, esse parâmetro é algo pra deixar partes da pagina adaptaveis
    subtitle?: string; //nao mude isso, esse parâmetro é algo pra deixar partes da pagina adaptaveis
}

export const SystemPageSheetNoEditComponent = ({
    system,
    title,
    subtitle
}: SystemPageComponentProps) => {

    const [data, setData] = useState<SheetTab[]>();
    const [flag,setFlag] = useState(0);

    const mutation = useMutation({
    mutationKey: ["tabs"],
    mutationFn: getSystemSheetTemplateTabs,
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
    
    return(
        <div className="">
            <div className="margin-right">
                <Flex placeContent={"space-between"}>
                    <div>
                        <Text className="subtitle-s">{title}</Text>
                        {subtitle? 
                        <Text className="text">{subtitle}</Text>
                        : <div></div>}
                    </div>
                </Flex>
                    <Grid maxH={"70vh"} overflowY={"auto"} className="grid-cols-2 margin-top-s" mb={12} gap={4}>
                        <For each={data}>
                            {(item) => <CharacterSheetNoEditSection sectionTitle={item.nome} sectionId={item.id}/>}
                        </For>
                    </Grid>
            
            </div>
        </div>
    )
}