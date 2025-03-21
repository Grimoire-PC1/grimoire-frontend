import {Button, Flex, IconButton,Input, Text, Textarea, useStatStyles } from "@chakra-ui/react"
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { NumberInputField, NumberInputRoot } from "../ui/number-input";
import { FileUploadList, FileUploadRoot, FileUploadTrigger } from "../ui/file-upload";
import { HiUpload } from "react-icons/hi";
import { useState } from "react";
import { CharacterSheetDeleteFieldDialog } from "./CharacterSheetDeleteFieldDialog";
import { CharacterSheetEditFieldDialog } from "./CharacterSheetEditFieldDialog";


export interface CharacterSheetFieldProps {
    fieldTitle: string;
    fieldType: string;
    fieldId: number;
    handleEdit: (open: boolean) => void;
}

export const CharacterSheetField = ({
    fieldTitle,
    fieldType,
    fieldId,
    handleEdit
}: CharacterSheetFieldProps) => {

    const [editField,setEditField] = useState(false);
    const [deleteField,setDeleteField] = useState(false);

    return(
        <div>
            <div className="grid grid-cols-6 place-items-around gap-x-4">
                    <Flex alignItems={"center"} gapX={2}>
                        <IconButton onClick={()=>setEditField(true)} size={"xs"} variant={"outline"} aria-label="Editar"> <LuPencil/> </IconButton>
                        <IconButton onClick={()=>setDeleteField(true)} size={"xs"} variant={"outline"} aria-label="Apagar"> <LuTrash2/> </IconButton>
                    </Flex>
                    <Text alignSelf={"center"} textAlign={"end"}>
                        {fieldTitle}
                    </Text>
                    <div className="col-span-4">
                        {
                            fieldType === "TEXTO" ?
                                <div>
                                    <Textarea disabled maxH={"200px"} minH={"40px"} resize={"vertical"}></Textarea>
                                </div>
                            :
                            fieldType === 'StringCurta' ?
                                <div>
                                    <Input disabled></Input>
                                </div>
                            :
                            fieldType === "INTEIRO" ?
                                <div>
                                    <NumberInputRoot disabled>
                                        <NumberInputField disabled></NumberInputField>
                                    </NumberInputRoot>
                                </div>
                            :
                            fieldType === 'Arquivo' ?
                                <div>
                                    <FileUploadRoot>
                                    <FileUploadTrigger asChild>
                                        <Button disabled variant="outline" size="sm">
                                        <HiUpload /> Upload file
                                        </Button>
                                    </FileUploadTrigger>
                                    <FileUploadList />
                                    </FileUploadRoot>
                                </div>
                            : //tipo dado
                            
                            <div className="flex gap-x-2 items-center">
                                    <NumberInputRoot disabled>
                                        <NumberInputField disabled placeholder="qtd"></NumberInputField>
                                    </NumberInputRoot>
                                    <Text>d</Text>
                                    <NumberInputRoot disabled>
                                        <NumberInputField disabled placeholder="dado"></NumberInputField>
                                    </NumberInputRoot>
                                    <Text>+</Text>
                                    <NumberInputRoot disabled>
                                        <NumberInputField disabled placeholder="bonus"></NumberInputField>
                                    </NumberInputRoot>
                            </div>
                        }
                    </div>
            </div>

            <CharacterSheetEditFieldDialog open={editField} handleClose={setEditField} handleConfirm={handleEdit} fieldId={fieldId} fieldName={fieldTitle}/>
            <CharacterSheetDeleteFieldDialog open={deleteField} handleClose={setDeleteField} handleConfirm={handleEdit} fieldId={fieldId} fieldName={fieldTitle}/>
        </div>
    )
}