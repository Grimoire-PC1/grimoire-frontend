import {System } from "@/interfaces/Models"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { SystemListCard } from "../system/SystemListCard";
import { Box } from "@chakra-ui/react";


export interface DialogLgProps {
    open:boolean,
    handleClose: (open: boolean) => void;
    systems:System[];
    title?:string;
    description?:string;
}

export const DialogLg = ({
    open,
    handleClose,
    title,
    description,
}: DialogLgProps) => {
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
                        className=" h-[90vh] padding-dialog-lg relative transform overflow-y-auto rounded-lg text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 w-[70vw] data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <DialogTitle className="text-base subtitle-s font-semibold">
                                    {title}
                                </DialogTitle>
                                <div className=" m-b-s">
                                    <p className="text">
                                        {description}
                                    </p>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <span className="text-large">Seus sistemas</span>
                            <div className="grid grid-cols-3 gap-4 margin-top-s m-b-s">
                                <SystemListCard system={{image:'',name:'My System',description:'Meu sistema muito legal'}}></SystemListCard> {/* Depois mudar pra uma lista dinamica de sistemas */}
                            </div>
                            
                            <span className="text-large">Sistemas da comunidade</span>
                            <div className="grid grid-cols-3 gap-4 margin-top-s">
                                <SystemListCard system={{image:'',name:'My System',description:'Meu sistema muito legal'}}></SystemListCard> {/* Depois mudar pra uma lista dinamica de sistemas */}
                                <SystemListCard system={{image:'',name:'My System',description:'Meu sistema muito legal'}}></SystemListCard> {/* Depois mudar pra uma lista dinamica de sistemas */}
                                <SystemListCard system={{image:'',name:'My System',description:'Meu sistema muito legal'}}></SystemListCard> {/* Depois mudar pra uma lista dinamica de sistemas */}
                                <SystemListCard system={{image:'',name:'My System',description:'Meu sistema muito legal'}}></SystemListCard> {/* Depois mudar pra uma lista dinamica de sistemas */}
                                <SystemListCard system={{image:'',name:'My System',description:'Meu sistema muito legal'}}></SystemListCard> {/* Depois mudar pra uma lista dinamica de sistemas */}
                                <SystemListCard system={{image:'',name:'My System',description:'Meu sistema muito legal'}}></SystemListCard> {/* Depois mudar pra uma lista dinamica de sistemas */}
                                <SystemListCard system={{image:'',name:'My System',description:'Meu sistema muito legal'}}></SystemListCard> {/* Depois mudar pra uma lista dinamica de sistemas */}
                                <SystemListCard system={{image:'',name:'My System',description:'Meu sistema muito legal'}}></SystemListCard> {/* Depois mudar pra uma lista dinamica de sistemas */}
                                <SystemListCard system={{image:'',name:'My System',description:'Meu sistema muito legal'}}></SystemListCard> {/* Depois mudar pra uma lista dinamica de sistemas */}
                                <SystemListCard system={{image:'',name:'My System',description:'Meu sistema muito legal'}}></SystemListCard> {/* Depois mudar pra uma lista dinamica de sistemas */}
                                <SystemListCard system={{image:'',name:'My System',description:'Meu sistema muito legal'}}></SystemListCard> {/* Depois mudar pra uma lista dinamica de sistemas */}
                                <SystemListCard system={{image:'',name:'My System',description:'Meu sistema muito legal'}}></SystemListCard> {/* Depois mudar pra uma lista dinamica de sistemas */}
                                <SystemListCard system={{image:'',name:'My System',description:'Meu sistema muito legal'}}></SystemListCard> {/* Depois mudar pra uma lista dinamica de sistemas */}
                                <SystemListCard system={{image:'',name:'My System',description:'Meu sistema muito legal'}}></SystemListCard> {/* Depois mudar pra uma lista dinamica de sistemas */}
                                <SystemListCard system={{image:'',name:'My System',description:'Meu sistema muito legal'}}></SystemListCard> {/* Depois mudar pra uma lista dinamica de sistemas */}
                                <SystemListCard system={{image:'',name:'My System',description:'Meu sistema muito legal'}}></SystemListCard> {/* Depois mudar pra uma lista dinamica de sistemas */}
                                <SystemListCard system={{image:'',name:'My System',description:'Meu sistema muito legal'}}></SystemListCard> {/* Depois mudar pra uma lista dinamica de sistemas */}
                                <SystemListCard system={{image:'',name:'My System',description:'Meu sistema muito legal'}}></SystemListCard> {/* Depois mudar pra uma lista dinamica de sistemas */}
                                <SystemListCard system={{image:'',name:'My System',description:'Meu sistema muito legal'}}></SystemListCard> {/* Depois mudar pra uma lista dinamica de sistemas */}
                                <SystemListCard system={{image:'',name:'My System',description:'Meu sistema muito legal'}}></SystemListCard> {/* Depois mudar pra uma lista dinamica de sistemas */}
                                <SystemListCard system={{image:'',name:'My System',description:'Meu sistema muito legal'}}></SystemListCard> {/* Depois mudar pra uma lista dinamica de sistemas */}
                                <SystemListCard system={{image:'',name:'My System',description:'Meu sistema muito legal'}}></SystemListCard> {/* Depois mudar pra uma lista dinamica de sistemas */}
                                <SystemListCard system={{image:'',name:'My System',description:'Meu sistema muito legal'}}></SystemListCard> {/* Depois mudar pra uma lista dinamica de sistemas */}
                                <SystemListCard system={{image:'',name:'My System',description:'Meu sistema muito legal'}}></SystemListCard> {/* Depois mudar pra uma lista dinamica de sistemas */}
                                <SystemListCard system={{image:'',name:'My System',description:'Meu sistema muito legal'}}></SystemListCard> {/* Depois mudar pra uma lista dinamica de sistemas */}
                                <SystemListCard system={{image:'',name:'My System',description:'Meu sistema muito legal'}}></SystemListCard> {/* Depois mudar pra uma lista dinamica de sistemas */}
                            </div>
                        </div>

                    </DialogPanel>
                </Box>
            </div>
        </div>
    </Dialog>
    )
}