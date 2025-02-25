import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import {Box, Icon, Text} from "@chakra-ui/react";
import { LuDices } from 'react-icons/lu';
export interface UserSettingsDialogSmProps {
    open:boolean,
    handleClose: (open: boolean) => void;
    value:number;
}

export const DialogRollDice = ({
    open,
    handleClose,
    value
}: UserSettingsDialogSmProps) => {

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
                                className=" padding-dialog-sm relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 w-[35vw] data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                            >
                               
                               <Box display={'flex'} mt={4} mb={4} gapX={2} justifyContent={"center"}>
                                    <Text fontSize={"2xl"}>Sua rolagem deu...</Text>
                                    <Text fontWeight={"bold"} fontSize={"2xl"}>{value}</Text>
                                    <Text fontSize={"2xl"}>!</Text>
                                    <Icon ml={4} size={"2xl"}><LuDices></LuDices></Icon>
                               </Box>

                            </DialogPanel>
                        </Box>
                        </div>
                    </div>
    </Dialog>
    )
}