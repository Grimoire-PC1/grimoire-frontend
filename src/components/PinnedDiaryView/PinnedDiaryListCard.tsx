import { Box, CardBody, CardRoot,Flex,Text } from "@chakra-ui/react"
import { useState } from "react";
import { JournalDetails } from "../JournalComponents/JournalDetails";
import { withMask } from "use-mask-input";

export interface JournalProps {
    titulo:string;
    descricao:string;
    data:string;
    personagens:string[];
}

export const PinnedDiaryListCard = ({
    titulo,
    descricao,
    data,
    personagens
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
            <JournalDetails open={showJournalDetails} handleClose={setShowJournalDetails} journalEntryId="" journalEntryTitle={titulo} journalEntryDate={data} journalEntryContent={descricao} journalEntryCharacters={personagens} campaignId={""}/>
        </div>
    )
}