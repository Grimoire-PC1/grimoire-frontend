import {Box, Button, CardBody, CardRoot,defineStyle,FieldLabel,FieldRoot,Flex, Grid, IconButton, Image, Input, NumberInput, Text, Textarea } from "@chakra-ui/react"
import { LuChevronDown, LuDices, LuPencil, LuPlus, LuTrash2 } from "react-icons/lu";
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from "../ui/accordion";
import { Field } from "../ui/field";
import { NumberInputField, NumberInputRoot } from "../ui/number-input";
import { FileUploadDropzone, FileUploadList, FileUploadRoot, FileUploadTrigger } from "../ui/file-upload";
import { HiUpload } from "react-icons/hi";


export interface CharacterSheetFieldProps {
    fieldTitle: string; // mudar para o tipo Rule depois. O tipo rule contém título e descrição, e talvez tag também 
    fieldType: string; //mudar para FieldType depois. O tipo FieldType pode ser string curta, string longa, numérico ou dado.
    fieldId: string;
}

const floatingStyles = defineStyle({
    pos: "absolute",
    bg: "bg",
    px: "0.5",
    top: "-3",
    insetStart: "2",
    fontWeight: "normal",
    pointerEvents: "none",
    transition: "position",
    _peerPlaceholderShown: {
      color: "fg.muted",
      top: "2.5",
      insetStart: "3",
    },
    _peerFocusVisible: {
      color: "fg",
      top: "-3",
      insetStart: "2",
    },
  })

export const CharacterSheetField = ({
    fieldTitle,
    fieldType,
    fieldId,
}: CharacterSheetFieldProps) => {
    return(
        <div className="grid grid-cols-6 place-items-around gap-x-4">
                <Flex alignItems={"center"} gapX={2}>
                    <IconButton size={"xs"} variant={"outline"} aria-label="Editar"> <LuPencil/> </IconButton>
                    <IconButton size={"xs"} variant={"outline"} aria-label="Apagar"> <LuTrash2/> </IconButton>
                </Flex>
                <Text alignSelf={"center"} textAlign={"end"}>
                    {fieldTitle}
                </Text>
                <div className="col-span-4">
                    {
                        fieldType === 'StringLonga' ?
                            <div>
                                <Textarea minH={"40px"} resize={"vertical"}></Textarea>
                            </div>
                        :
                        fieldType === 'StringCurta' ?
                            <div>
                                <Input></Input>
                            </div>
                        :
                        fieldType === 'Numerico' ?
                            <div>
                                <NumberInputRoot>
                                    <NumberInputField></NumberInputField>
                                </NumberInputRoot>
                            </div>
                        :
                        fieldType === 'Arquivo' ?
                            <div>
                                <FileUploadRoot>
                                <FileUploadTrigger asChild>
                                    <Button variant="outline" size="sm">
                                    <HiUpload /> Upload file
                                    </Button>
                                </FileUploadTrigger>
                                <FileUploadList />
                                </FileUploadRoot>
                            </div>
                        : //tipo dado
                        
                        <div className="flex gap-x-2 items-center">
                                <NumberInputRoot>
                                    <NumberInputField placeholder="qtd"></NumberInputField>
                                </NumberInputRoot>
                                <Text>d</Text>
                                <NumberInputRoot>
                                    <NumberInputField placeholder="dado"></NumberInputField>
                                </NumberInputRoot>
                                <Text>+</Text>
                                <NumberInputRoot>
                                    <NumberInputField placeholder="bonus"></NumberInputField>
                                </NumberInputRoot>
                        </div>
                    }
                </div>
            
        </div>
    )
}