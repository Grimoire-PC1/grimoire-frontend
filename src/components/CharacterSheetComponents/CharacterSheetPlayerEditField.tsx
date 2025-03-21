import {Button, IconButton, Input, Text, Textarea, } from "@chakra-ui/react"
import { NumberInputField, NumberInputRoot } from "../ui/number-input";
import { FileUploadList, FileUploadRoot, FileUploadTrigger } from "../ui/file-upload";
import { HiUpload } from "react-icons/hi";
import { useEffect, useReducer, useState } from "react";
import { LuDices, LuSave } from "react-icons/lu";
import { DialogRollDice } from "../Dialog/DialogRollDice";
import { useMutation } from "@tanstack/react-query";
import { createCharacterSheetContent, getCharacterSheetContent, updateCharacterSheetContent } from "@/services/characterService";
import { CharacterSheetInfo } from "@/interfaces/ServicePayload";
import { Toaster, toaster } from "../ui/toaster";


export interface CharacterSheetFieldProps {
    fieldTitle: string; // mudar para o tipo Rule depois. O tipo rule contém título e descrição, e talvez tag também 
    fieldType: string; //mudar para FieldType depois. O tipo FieldType pode ser string curta, string longa, numérico ou dado.
    fieldId: number;
    sectionId:number;
    characterId:number;
}

export const CharacterSheetPlayerEditField = ({
    fieldTitle,
    fieldType,
    fieldId,
    sectionId,
    characterId
}: CharacterSheetFieldProps) => {
    const [,forceUpdate] = useReducer(x=>x+1,0);

    const [previousValue,setPreviousValue] = useState<string[]>();
    const [contentId, setContentId] = useState(0);
    const [flag,setFlag] = useState(0);
    const [flag2,setFlag2] = useState(0);

    const mutation = useMutation({
        mutationKey: ["getInfo"],
        mutationFn: getCharacterSheetContent,
        onSuccess: (data) => {
          console.log(data);
          setPreviousValue(data[0].conteudo);
          setContentId((data[0].id||0));
          console.log(previousValue)
          console.log("id do conteudo de ficha:")
          console.log(contentId)
        },
        onError: (error) => {
          console.log(error);
          setPreviousValue(['','','']);
        },
      });

    useEffect(() => {
        if(flag == 0){
            mutation.mutate({id_personagem:characterId,id_aba_ficha:sectionId,id_sub_aba_ficha:fieldId});
            setFlag(1);
        }
    }, [characterId, fieldId, flag, mutation, previousValue, sectionId]);

    const [fieldValue,setFieldValue] = useState("");
    const [field1Value,setField1Value] = useState("0");
    const [field2Value,setField2Value] = useState("0");
    const [field3Value,setField3Value] = useState("0");

    useEffect(() => {
        if(flag2 == 0){
            if(previousValue){
                setFieldValue(previousValue[0]);
                setField1Value(previousValue[0]);
                setField2Value(previousValue[1]);
                setField3Value(previousValue[2]);
            }
            setFlag(1);
        }
    }, [flag2, previousValue]);

    const [diceRoll, setDiceRoll] = useState(false);
    const [rollValue,setRollValue] = useState(0);



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
        let v = 0;
        for(let i = 0; i < parseInt(field1Value);i++){
            const r = Math.floor(Math.random() * (parseInt(field2Value)) + 1)
            v+=r;
        }

        if(field3Value){
            v+=parseInt(field3Value);
        }

        setRollValue(v);
        setDiceRoll(true);
    }

    const updateMutation = useMutation({
        mutationKey: ["editInfo"],
        mutationFn: updateCharacterSheetContent,
        onSuccess: (data) => {
          console.log(data);
          toaster.create({
            description: "Personagem salvo com sucesso!",
            type: "success",
            })
        },
        onError: (error) => {
          console.log(error);
          toaster.create({
            description: "Houve um problema salvando o personagem",
            type: "error",
            })
        },
      });

    const createMutation = useMutation({
        mutationKey: ["createInfo"],
        mutationFn: createCharacterSheetContent,
        onSuccess: (data) => {
          console.log(data);
          toaster.create({
            description: "Personagem salvo com sucesso!",
            type: "success",
            })
        },
        onError: (error) => {
          console.log(error);
          toaster.create({
            description: "Houve um problema salvando o personagem",
            type: "error",
            })
        },
      });

    const [disableSaveButton,setDisableSaveButton] = useState(false);
    function saveCharacter(){
        setDisableSaveButton(true);
    
        const changes = [];

        const str = [];
        if(fieldType === "DADO"){
            str.push(document.getElementById(String(fieldId)+"_1")?.value||"0");
            str.push(document.getElementById(String(fieldId)+"_2")?.value||"0");
            str.push(document.getElementById(String(fieldId)+"_3")?.value||"0");
        }else{
            str.push(document.getElementById(String(fieldId))?.value)
        }
        changes.push({id_conteudo_ficha: contentId,novo_conteudo:str,id_personagem:characterId,id_sub_aba_ficha:fieldId,conteudo:str})

        console.log(changes)

        if(contentId == 0){
            createMutation.mutate(changes[0]);
        }else{
            updateMutation.mutate(changes[0]);
        }

        //depois do processamento acabar, habilitar o botao novamente
        setDisableSaveButton(false);
    }

    return(
        <div>
            <div className="grid grid-cols-9 place-items-around gap-x-4">
                    <IconButton variant={"outline"} disabled={disableSaveButton} onClick={()=>saveCharacter()}><LuSave /></IconButton>
                    <Text className="col-span-2" alignSelf={"center"} textAlign={"end"}>
                        {fieldTitle}
                    </Text>
                    <div className="col-span-6">
                        {
                            fieldType === "TEXTO" ?
                                <div>
                                    <Textarea onChange={(e)=>setFieldValue(e.target.value)} id={String(fieldId)} value={fieldValue} defaultValue={previousValue} maxH={"200px"} minH={"40px"} resize={"vertical"}></Textarea>
                                </div>
                            :
                            fieldType === 'StringCurta' ?
                                <div>
                                    <Input onChange={(e)=>setFieldValue(e.target.value)} id={String(fieldId)} value={fieldValue} defaultValue={previousValue}></Input>
                                </div>
                            :
                            fieldType === "INTEIRO" ?
                                <div>
                                    <NumberInputRoot value={fieldValue} onValueChange={(e) => setFieldValue(e.value)}>
                                        <NumberInputField onChange={(e)=>setFieldValue(e.target.value)} id={String(fieldId)} value={fieldValue} defaultValue={previousValue}></NumberInputField>
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
                                    <NumberInputRoot value={field1Value} onValueChange={(e) => update(e.value, 1)}>
                                        <NumberInputField onChange={(e)=>update(e.target.value, 1)} id={fieldId+"_1"} value={field1Value} defaultValue={previousValue ? previousValue[0]:0} placeholder="qtd"></NumberInputField>
                                    </NumberInputRoot>
                                    <Text>d</Text>
                                    <NumberInputRoot value={field2Value} onValueChange={(e) => update(e.value, 2)}>
                                        <NumberInputField onChange={(e)=>update(e.target.value, 2)} id={fieldId+"_2"} value={field2Value} defaultValue={previousValue ? previousValue[1]:0} placeholder="dado"></NumberInputField>
                                    </NumberInputRoot>
                                    <Text>+</Text>
                                    <NumberInputRoot value={field3Value} onValueChange={(e) => update(e.value, 3)}>
                                        <NumberInputField onChange={(e)=>update(e.target.value, 3)} id={fieldId+"_3"} value={field3Value} defaultValue={previousValue ? previousValue[2]:0} placeholder="bonus"></NumberInputField>
                                    </NumberInputRoot>
                                    <IconButton onClick={()=>rollDice()} disabled={(!document.getElementById(fieldId+"_1")?.value || !document.getElementById(fieldId+"_2")?.value)}><LuDices /></IconButton>
                            </div>
                        }
                    </div>
            </div>

            <DialogRollDice open={diceRoll} handleClose={setDiceRoll} value={rollValue}/>
            <Toaster/>
        </div>
    )
}