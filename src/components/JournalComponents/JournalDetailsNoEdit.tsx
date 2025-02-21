import { Dialog, DialogBackdrop, DialogPanel} from '@headlessui/react'
import { Box,Flex,For,Text } from "@chakra-ui/react";
import { CharacterProfile } from "../CharacterProfile/CharacterProfile";
import { withMask } from 'use-mask-input';


export interface DialogLgProps {
    open:boolean,
    handleClose: (open: boolean) => void;
    campaignId:string;
    journalEntryId:string;
    journalEntryTitle:string;
    journalEntryDate:string;
    journalEntryContent:string;
    journalEntryCharacters:string[]; //mudar para Character[]
}

export const JournalDetailsNoEdit = ({
    open,
    handleClose,
    campaignId,
    journalEntryId,
    journalEntryTitle,
    journalEntryDate,
    journalEntryContent,
    journalEntryCharacters,
}: DialogLgProps) => {

    function formatDate(d:Date){
       const date_String = d.getFullYear() +
            "/" +
            (d.getMonth() + 1) +
            "/" +
            +d.getDate()
        return date_String;
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
                            <div className="">
                                <div className="">
                                        <Flex mb={4} placeContent={"space-between"} alignItems={"center"}>
                                            <Text fontSize={"2xl"}>{journalEntryTitle}</Text>
                                            <Text ref={withMask("99/99/9999")} fontSize={"2xl"}>{journalEntryDate}</Text>
                                        </Flex>
                                </div>
                            </div>
                        </div>
                        <Box maxH={"74vh"} overflowY={"auto"}>

                            <Box m={1}>
                                <Text textAlign={"justify"}>{journalEntryContent}</Text>
                                
                            </Box>
                            
                            <Text mt={4} fontSize={"2xl"}>Personagens presentes</Text>
                            <Flex mt={2} flexWrap={"wrap"} gap={1}>
                                <For each={journalEntryCharacters}>
                                    {(character)=><CharacterProfile character={character} mt="" mb="" ml="" mr=""></CharacterProfile>}
                                </For>
                            </Flex>

                        </Box>

                    </DialogPanel>
                </Box>
            </div>
        </div>
    </Dialog>
    )
}