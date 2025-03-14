import {Box, CardBody, CardHeader, CardRoot, CardTitle, Flex, For, IconButton, Separator, Text} from '@chakra-ui/react'
import { LuPlus } from 'react-icons/lu';
import { PinnedDiaryListCard } from '../PinnedDiaryView/PinnedDiaryListCard';
import { useEffect, useReducer, useState } from 'react';
import { JournalNewEntry } from './JournalNewEntry';
import { useMutation} from '@tanstack/react-query';
import { getCampaignSessions } from '@/services/sessionService';
import { Session } from '@/interfaces/Models';

export interface JournalProps {
   campaign:string; //mudar para Campaign
}

export const Journal = ({
    campaign,
}: JournalProps) => {

    const [newEntry,setNewEntry] = useState(false);

    const [,forceUpdate] = useReducer(x=>x+1,0);

    const [data,setData] = useState<Session[]>();
    const [flag,setFlag] = useState(0);
    

    const mutation = useMutation({
        mutationKey: ["sessoes"],
        mutationFn: getCampaignSessions,
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
    }, [data]);

    function fecharEforcar(){
        mutation.mutate();
        setNewEntry(false);
        forceUpdate();
    }

    function fecharEforcar2(){
        mutation.mutate();
        forceUpdate();
    }

    return(
        <div>
            <Flex placeContent={"space-between"}>
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
                            {(s)=><PinnedDiaryListCard handleConfirm={fecharEforcar2} titulo={s.titulo} descricao={s.descricao} data={s.data} id={s.id} tipo={s.tipo_sessao} fixada={s.fixada}/>}
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
                        {(s)=><PinnedDiaryListCard handleConfirm={fecharEforcar2} titulo={s.titulo} descricao={s.descricao} data={s.data} id={s.id} tipo={s.tipo_sessao} fixada={s.fixada}/>}
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
                            {(s)=><PinnedDiaryListCard handleConfirm={fecharEforcar2} titulo={s.titulo} descricao={s.descricao} data={s.data} id={s.id} tipo={s.tipo_sessao} fixada={s.fixada}/>}
                        </For>
                    </CardBody>
                </CardRoot>
            </Box>

            <JournalNewEntry open={newEntry} handleClose={setNewEntry} handleCreate={fecharEforcar} campaignId={campaign}/>
        </div>
    )
}