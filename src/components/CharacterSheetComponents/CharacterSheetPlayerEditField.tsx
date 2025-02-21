import {Button, IconButton, Input, Text, Textarea, } from "@chakra-ui/react"
import { NumberInputField, NumberInputRoot } from "../ui/number-input";
import { FileUploadList, FileUploadRoot, FileUploadTrigger } from "../ui/file-upload";
import { HiUpload } from "react-icons/hi";
import { useReducer, useState } from "react";
import { LuDices } from "react-icons/lu";


export interface CharacterSheetFieldProps {
    fieldTitle: string; // mudar para o tipo Rule depois. O tipo rule contém título e descrição, e talvez tag também 
    fieldType: string; //mudar para FieldType depois. O tipo FieldType pode ser string curta, string longa, numérico ou dado.
    fieldId: string;
    characterId:string;
}

export const CharacterSheetPlayerEditField = ({
    fieldTitle,
    fieldType,
    fieldId,
    characterId
}: CharacterSheetFieldProps) => {
    const [,forceUpdate] = useReducer(x=>x+1,0);

    const previousValue = "" //pegar isso da ficha do personagem, pegar o field id e casar com o character id pra pegar o valor anterior caso o jogador esteja atualizando sua ficha

    const [fieldValue,setFieldValue] = useState(previousValue);
    const [field1Value,setField1Value] = useState(previousValue[0]);
    const [field2Value,setField2Value] = useState(previousValue[1]);
    const [field3Value,setField3Value] = useState(previousValue[2]);


    function update(value:string,num:number){
        if(num == 1){
            setField1Value(value);
        }else if(num == 2){
            setField2Value(value);
        }else if(num == 3){
            setField3Value(value);
        }
    }

    function rollDice(){
        //implementar depois e criar um dialogzinho pra mostrar o resultado da rolagem
    }

    return(
        <div>
            <div className="grid grid-cols-6 place-items-around gap-x-4">
                    <Text alignSelf={"center"} textAlign={"end"}>
                        {fieldTitle}
                    </Text>
                    <div className="col-span-5">
                        {
                            fieldType === 'StringLonga' ?
                                <div>
                                    <Textarea onChange={(e)=>setFieldValue(e.target.value)} id={fieldId} value={fieldValue} defaultValue={previousValue} maxH={"200px"} minH={"40px"} resize={"vertical"}></Textarea>
                                </div>
                            :
                            fieldType === 'StringCurta' ?
                                <div>
                                    <Input onChange={(e)=>setFieldValue(e.target.value)} id={fieldId} value={fieldValue} defaultValue={previousValue}></Input>
                                </div>
                            :
                            fieldType === 'Numerico' ?
                                <div>
                                    <NumberInputRoot>
                                        <NumberInputField onChange={(e)=>setFieldValue(e.target.value)} id={fieldId} value={fieldValue} defaultValue={previousValue}></NumberInputField>
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
                                        <NumberInputField onChange={(e)=>update(e.target.value, 1)} id={fieldId+"_1"} value={field1Value} defaultValue={previousValue[0]} placeholder="qtd"></NumberInputField>
                                    </NumberInputRoot>
                                    <Text>d</Text>
                                    <NumberInputRoot>
                                        <NumberInputField onChange={(e)=>update(e.target.value, 2)} id={fieldId+"_2"} value={field2Value} defaultValue={previousValue[1]} placeholder="dado"></NumberInputField>
                                    </NumberInputRoot>
                                    <Text>+</Text>
                                    <NumberInputRoot>
                                        <NumberInputField onChange={(e)=>update(e.target.value, 3)} id={fieldId+"_3"} value={field3Value} defaultValue={previousValue[2]} placeholder="bonus"></NumberInputField>
                                    </NumberInputRoot>
                                    <IconButton onClick={()=>rollDice()} disabled={(!document.getElementById(fieldId+"_1")?.value || !document.getElementById(fieldId+"_2")?.value)}><LuDices /></IconButton>
                            </div>
                        }
                    </div>
            </div>
        </div>
    )
}