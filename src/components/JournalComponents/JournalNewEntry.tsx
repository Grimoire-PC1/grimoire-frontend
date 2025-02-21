import { Dialog, DialogBackdrop, DialogPanel, } from '@headlessui/react'
import { Box,Button,createListCollection,Flex,For,IconButton,Input,Text, Textarea } from "@chakra-ui/react";
import { Form } from 'react-router-dom';
import { Radio, RadioGroup } from '../ui/radio';
import { useMemo, useReducer, useState } from 'react';
import { CharacterProfile } from '../CharacterProfile/CharacterProfile';
import { SelectContent, SelectItem, SelectRoot, SelectTrigger } from '../ui/select';
import { LuPlus } from 'react-icons/lu';
import { withMask } from "use-mask-input"

export interface DialogLgProps {
    open:boolean,
    handleClose: (open: boolean) => void;
    campaignId:string;
}

export const JournalNewEntry = ({
    open,
    handleClose,
    campaignId,
}: DialogLgProps) => {

    const [,forceUpdate] = useReducer(x=>x+1,0);

    const allCharacters = useMemo(() => {
        return createListCollection({
            items: ['P1','P2','NPC1','P3','P4','P5','P6','P7','P8','P9','P10','P11','P12','P13','P14','P15','P16','P17','P18','P19','P20','P21',], //pegar todos os personagens da campanha
            itemToString: (item) => item,
            itemToValue: (item) => item,
        })
        }, [])

    const [characters, setCharacters] = useState<string[]>([]);

    function updateCharacters(c:string){
        if(!(characters.find((character) => character === c))){
            const newCharacterList = characters;
            newCharacterList.push(c);
            setCharacters(newCharacterList);
            forceUpdate();
        }
    }

    function updateRemoveCharacter(c:string){
        const newCharacterList = characters;
        newCharacterList.forEach( (item, index) => {
            if(item === c) newCharacterList.splice(index,1);
          });
        setCharacters(newCharacterList);
        forceUpdate();
    }
    return(
    <Dialog open={open} onClose={handleClose} className="relative z-10">
        <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-700/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Box className="rounded-lg" bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }}>
                    <DialogPanel
                        transition
                        className=" h-[90vh] padding-dialog-lg relative transform overflow-y-hidden rounded-lg text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 w-[70vw] data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div className="">
                            <Text fontSize={"2xl"}>Registro de sessão</Text>
                        </div>
                        <Box m={2} maxH={"74vh"} overflowY={"auto"}>

                            <Form>
                                <Flex gapX={2}>
                                    <Input mt={4} placeholder='Título da sessão'></Input>
                                    <Input textAlign={"center"} w={"20%"} mt={4} placeholder='Data da sessão' ref={withMask("99/99/9999")}></Input>
                                </Flex>
                                <Text className='text' mt={4}>Esta sessão já foi jogada?</Text>
                                <RadioGroup mt={"4"} display={"flex"} columnGap={4} defaultValue="sim">
                                    <Radio value="sim">Sim, estou registrando uma sessão passada</Radio>
                                    <Radio value="nao">Não, estou planejando uma sessão futura</Radio>
                                </RadioGroup>
                                <Textarea mt={4} resize={"vertical"} h={"26vh"} placeholder='O que aconteceu ou vai acontecer nesta sessão?'></Textarea>
                                <Text className='text' mt={4}>Que personagens fizeram ou vão fazer parte desta sessão?</Text>

                                <Flex mt={2} flexWrap={"wrap"} gap={1}>
                                    <For each={characters}>
                                        {(character)=><Box onClick={()=>updateRemoveCharacter(character)}><CharacterProfile character={character} mt="" mb="" ml="" mr=""></CharacterProfile></Box>}
                                    </For>
                                    <SelectRoot collection={allCharacters} placeSelf={"center"} w={"47px"} size="xs" variant={"ghost"}>
                                    <SelectTrigger>
                                        <IconButton variant={"outline"} size={"xl"} rounded={"full"}><LuPlus/></IconButton>
                                    </SelectTrigger>
                                    <SelectContent  w={"320px"} maxH={"200px"}>
                                        {allCharacters.items.map((character) => (
                                        <SelectItem onClick={()=>updateCharacters(character)} cursor={"pointer"} item={character} key={character}>
                                            {character}
                                        </SelectItem>
                                        ))}
                                    </SelectContent>
                                    </SelectRoot>
                                </Flex>
                            </Form>
                            
                            <Flex mt={8} justifyContent={"center"}>
                                <Button>Registrar sessão</Button>
                            </Flex>
                        </Box>

                    </DialogPanel>
                </Box>
            </div>
        </div>
    </Dialog>
    )
}