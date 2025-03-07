import {Box, CardBody, CardHeader, CardRoot, CardTitle, Flex, For, IconButton, Separator, Text} from '@chakra-ui/react'
import { LuPlus } from 'react-icons/lu';
import { PinnedDiaryListCard } from '../PinnedDiaryView/PinnedDiaryListCard';
import { useState } from 'react';
import { JournalNewEntry } from './JournalNewEntry';
import { useQuery } from '@tanstack/react-query';
import { getCampaignSessions } from '@/services/sessionService';

export interface JournalProps {
   campaign:string; //mudar para Campaign
}

export const Journal = ({
    campaign,
}: JournalProps) => {

    const [newEntry,setNewEntry] = useState(false);

    const {data} = useQuery({
        queryKey: ["sessoes"],
        queryFn: getCampaignSessions
    })
    data?.sort((a, b) => {
        return a.id - b.id;
    });

    return(
        <div>
            <Flex alignItems={"center"} placeContent={"space-between"}>
                <Text className="subtitle-s">REVISITE OU PLANEJE UMA SESSÃO!</Text>
                
                <IconButton onClick={()=>setNewEntry(true)} rounded={"full"} size={"2xl"} variant={"outline"} aria-label="Novo Registro de Sessão"> 
                    <LuPlus />
                </IconButton>
                                        
            </Flex>

            <Box mt={"6"} gap={"4"} className='grid grid-cols-3'>
                <CardRoot h={"67.5vh"}>
                    <CardHeader>
                        <CardTitle className="text-center padding-bottom">SESSÕES FIXADAS</CardTitle>
                        <Separator></Separator>
                    </CardHeader>
                    <CardBody  overflowY={"auto"}>
                        <For each={data?.filter((s) => s.id_campanha === parseInt(campaign) && s.fixada == true)}>
                            {(s)=><PinnedDiaryListCard titulo={s.titulo} descricao={s.descricao} data={s.data} id={s.id} tipo={s.tipo_sessao} fixada={s.fixada}/>}
                        </For>
                    </CardBody>
                </CardRoot>
                <CardRoot h={"67.5vh"}>
                    <CardHeader>
                            <CardTitle className="text-center padding-bottom">SESSÕES PASSADAS</CardTitle>
                        <Separator></Separator>
                    </CardHeader>
                    <CardBody  overflowY={"auto"}>
                    <For each={data?.filter((s) => s.id_campanha === parseInt(campaign) && s.tipo_sessao === "PASSADA")}>
                        {(s)=><PinnedDiaryListCard titulo={s.titulo} descricao={s.descricao} data={s.data} id={s.id} tipo={s.tipo_sessao} fixada={s.fixada}/>}
                    </For>
                    </CardBody>
                </CardRoot>

                <CardRoot h={"67.5vh"}>
                    <CardHeader>
                            <CardTitle className="text-center padding-bottom">SESSÕES FUTURAS</CardTitle>
                        <Separator></Separator>
                    </CardHeader>
                    <CardBody  overflowY={"auto"}>
                        <For each={data?.filter((s) => s.id_campanha === parseInt(campaign) && s.tipo_sessao === "FUTURA")}>
                            {(s)=><PinnedDiaryListCard titulo={s.titulo} descricao={s.descricao} data={s.data} id={s.id} tipo={s.tipo_sessao} fixada={s.fixada}/>}
                        </For>
                    </CardBody>
                </CardRoot>
            </Box>

            <JournalNewEntry open={newEntry} handleClose={setNewEntry} campaignId={campaign}/>
        </div>
    )
}