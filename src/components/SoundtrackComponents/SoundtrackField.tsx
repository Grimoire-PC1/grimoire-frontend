import {Box, Flex, IconButton,Input} from "@chakra-ui/react"
import { LuTrash2 } from "react-icons/lu";
import { useState } from "react";
import { SoundtrackDeleteFieldDialog } from "./SoundtrackDeleteFieldDialog";


export interface SoundtrackFieldProps {
    fieldTitle: string;
    fieldId: number;
    handleEdit: (open: boolean) => void;
}

export const SoundtrackField = ({
    fieldTitle,
    fieldId,
    handleEdit
}: SoundtrackFieldProps) => {
    const [deleteField,setDeleteField] = useState(false);

    return(
        <div>
            <Flex alignItems={"center"} gapX={4}>
                    <IconButton onClick={()=>setDeleteField(true)} size={"xs"} variant={"outline"} aria-label="Apagar"> <LuTrash2/> </IconButton>
                    <Input w={"full"} value={fieldTitle} disabled></Input>
            </Flex>
            
            <SoundtrackDeleteFieldDialog open={deleteField} handleClose={setDeleteField} handleConfirm={handleEdit} fieldId={fieldId} fieldName={fieldTitle}/>
        </div>
    )
}