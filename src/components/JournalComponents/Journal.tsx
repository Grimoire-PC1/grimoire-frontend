import {Box, CardBody, CardHeader, CardRoot, CardTitle, Flex, IconButton, Separator, Text} from '@chakra-ui/react'
import { LuPlus } from 'react-icons/lu';
import { PinnedDiaryListCard } from '../PinnedDiaryView/PinnedDiaryListCard';
import { useState } from 'react';
import { JournalNewEntry } from './JournalNewEntry';

export interface JournalProps {
   campaign:string; //mudar para Campaign
}

export const Journal = ({
    campaign,
}: JournalProps) => {

    const [newEntry,setNewEntry] = useState(false);

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
                        <PinnedDiaryListCard/>
                        <PinnedDiaryListCard/>
                    </CardBody>
                </CardRoot>
                <CardRoot h={"67.5vh"}>
                    <CardHeader>
                            <CardTitle className="text-center padding-bottom">SESSÕES PASSADAS</CardTitle>
                        <Separator></Separator>
                    </CardHeader>
                    <CardBody  overflowY={"auto"}>
                    <PinnedDiaryListCard/>
                    <PinnedDiaryListCard/>
                    <PinnedDiaryListCard/>
                    <PinnedDiaryListCard/>
                    <PinnedDiaryListCard/>
                    <PinnedDiaryListCard/>
                    <PinnedDiaryListCard/>
                    <PinnedDiaryListCard/>
                    <PinnedDiaryListCard/>
                    <PinnedDiaryListCard/>
                        
                    </CardBody>
                </CardRoot>

                <CardRoot h={"67.5vh"}>
                    <CardHeader>
                            <CardTitle className="text-center padding-bottom">SESSÕES FUTURAS</CardTitle>
                        <Separator></Separator>
                    </CardHeader>
                    <CardBody  overflowY={"auto"}>
                        <Box zIndex={"99999"}>
                            
                        </Box>
                        <PinnedDiaryListCard/>
                        <PinnedDiaryListCard/>
                        <PinnedDiaryListCard/>
                        <PinnedDiaryListCard/>
                        <PinnedDiaryListCard/>
                        <PinnedDiaryListCard/>
                        <PinnedDiaryListCard/>
                        <PinnedDiaryListCard/>
                        <PinnedDiaryListCard/>
                        <PinnedDiaryListCard/>
                    </CardBody>
                </CardRoot>
            </Box>

            <JournalNewEntry open={newEntry} handleClose={setNewEntry} campaignId=""/>
        </div>
    )
}