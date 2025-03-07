import { Box, CardBody, CardRoot,Flex,Text } from "@chakra-ui/react"
import { useState } from "react";
import { JournalDetails } from "../JournalComponents/JournalDetails";
import { withMask } from "use-mask-input";
import { SessionType } from "@/interfaces/ServicePayload";

export interface JournalProps {
    titulo:string;
    descricao:string;
    data:string;
    id:number;
    tipo:SessionType;
    fixada:boolean;
}

export const PinnedDiaryListCard = ({
    titulo,
    descricao,
    data,
    id,
    tipo,
    fixada
}:JournalProps) => {
    const [showJournalDetails,setShowJournalDetails] = useState(false);
    
    return(
        <div>
            <Box onClick={()=>setShowJournalDetails(true)}>
                <CardRoot mt={"2%"} cursor={"pointer"}>
                    <CardBody className="text">
                        <Flex placeContent={"space-between"} gapX={8}>
                        <Text lineClamp={1}>{titulo}</Text> 
                        <Text ref={withMask("99/99/9999")}>{data}</Text>
                        </Flex>
                    </CardBody>
                </CardRoot>
            </Box>
            <JournalDetails open={showJournalDetails} handleClose={setShowJournalDetails} journalEntryId={id} journalEntryTitle={titulo} journalEntryDate={data} journalEntryContent={descricao} journalEntryType={tipo} journalEntryPinned={fixada}/>
        </div>
    )
}