import { Box, CardBody, CardRoot,Flex,Text } from "@chakra-ui/react"
import { useState } from "react";
import { JournalDetailsNoEdit } from "../JournalComponents/JournalDetailsNoEdit";
import { withMask } from "use-mask-input";

export interface JournalProps {
    titulo:string;
    descricao:string;
    data:string;
}

export const PinnedDiaryListCardNoEdit = ({
    titulo,
    descricao,
    data,
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
            <JournalDetailsNoEdit open={showJournalDetails} handleClose={setShowJournalDetails} journalEntryTitle={titulo} journalEntryDate={data} journalEntryContent={descricao}/>
        </div>
    )
}