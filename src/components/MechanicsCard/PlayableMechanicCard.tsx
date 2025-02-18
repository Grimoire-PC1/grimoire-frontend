import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import {Box, Button, createListCollection, Flex, IconButton, Input, Presence,Text, Textarea} from "@chakra-ui/react";
import { Form } from 'react-router-dom';
import { NumberInputField, NumberInputRoot } from '../ui/number-input';
import { useMemo, useState } from 'react';
import { Radio, RadioGroup } from '../ui/radio';
import { CharacterProfile } from '../CharacterProfile/CharacterProfile';
import { LuPlus } from 'react-icons/lu';
import { SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText } from '../ui/select';


export interface UserSettingsDialogSmProps {
    open:boolean,
    handleClose: (open: boolean) => void;
    mechanicId:string;
    mechanicName:string;
    mechanicDesc:string;
    mechanicActions:string[];
    mechanicReactions:string[];
    mechanicRoundCounter:number|undefined;
    campaign:string;
}

export const PlayableMechanicCard = ({
    open,
    handleClose,
    mechanicId,
    mechanicActions,
    mechanicDesc,
    mechanicName,
    mechanicReactions,
    mechanicRoundCounter,
    campaign
}: UserSettingsDialogSmProps) => {

    //const allCharacters = ['P1','P2','NPC1','P1','P2','NPC1','P1','P2','NPC1','P1','P2','NPC1',] //getCharacters da campanha

    const allCharacters = useMemo(() => {
        return createListCollection({
          items: ['P1','P2','NPC1','P3','P4','P5','P6','P7','P8','P9','P10','P11','P12','P12','P13','P14','P15','P16','P17','P18','P19','P20','P21',], //pegar todos os personagens da campanha
          itemToString: (item) => item,
          itemToValue: (item) => item,
        })
      }, [])

    const [characters,setCharacters] = useState<string[]>([]);

    return(
    <Dialog open={open} onClose={handleClose} className="relative z-10">
        <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-700/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Box className="rounded-lg" bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }} >
                            <DialogPanel
                                transition
                                className=" padding-dialog-sm relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 w-[70vw] data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                            >
                                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <DialogTitle className="text-base text-large font-semibold">
                                        Iniciar {mechanicName}
                                    </DialogTitle>
                                    </div>
                                </div>
                                </div>
                                <div className="px-4 py-3">
                                    <Text mt={4} className='text'>Personagens na cena</Text>
                                    <Flex mt={2} flexWrap={"wrap"} gap={4}>
                                        
                                        <Box>
                                            <SelectRoot collection={allCharacters} placeSelf={"center"} w={"47px"} size="xs" variant={"ghost"}>
                                            <SelectTrigger>
                                                <IconButton variant={"outline"} size={"xl"} rounded={"full"}><LuPlus/></IconButton>
                                            </SelectTrigger>
                                            <SelectContent w={"320px"} maxH={"200px"}>
                                                {allCharacters.items.map((character) => (
                                                <SelectItem item={character} key={character}>
                                                    {character}
                                                </SelectItem>
                                                ))}
                                            </SelectContent>
                                            </SelectRoot>
                                        </Box>
                                        <Flex gap={1} flexWrap={"wrap"}>
                                            {/* <CharacterProfile character={"NPC"} mt={''} mr={''} ml={''} mb={''}></CharacterProfile> um For com todos os personagens selecionados */}
                                        </Flex>
                                        
                                    </Flex>
                                </div>

                            </DialogPanel>
                        </Box>
                        </div>
                    </div>
    </Dialog>
    )
}