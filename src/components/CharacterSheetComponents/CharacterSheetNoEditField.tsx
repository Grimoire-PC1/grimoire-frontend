import {Button, Input, Text, Textarea, } from "@chakra-ui/react"
import { NumberInputField, NumberInputRoot } from "../ui/number-input";
import { FileUploadList, FileUploadRoot, FileUploadTrigger } from "../ui/file-upload";
import { HiUpload } from "react-icons/hi";


export interface CharacterSheetFieldProps {
    fieldTitle: string; // mudar para o tipo Rule depois. O tipo rule contém título e descrição, e talvez tag também 
    fieldType: string; //mudar para FieldType depois. O tipo FieldType pode ser string curta, string longa, numérico ou dado.
    fieldId: string;
}

export const CharacterSheetNoEditField = ({
    fieldTitle,
    fieldType,
    fieldId,
}: CharacterSheetFieldProps) => {

    return(
        <div>
            <div className="grid grid-cols-6 place-items-around gap-x-4">
                    <Text alignSelf={"center"} textAlign={"end"}>
                        {fieldTitle}
                    </Text>
                    <div className="col-span-5">
                        {
                            fieldType === 'TEXTO' ?
                                <div>
                                    <Textarea disabled maxH={"200px"} minH={"40px"} resize={"vertical"}></Textarea>
                                </div>
                            :
                            fieldType === 'StringCurta' ?
                                <div>
                                    <Input disabled></Input>
                                </div>
                            :
                            fieldType === 'INTEIRO' ?
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
        </div>
    )
}