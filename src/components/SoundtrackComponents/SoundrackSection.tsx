import {CardBody, CardRoot,Flex,For,IconButton, } from "@chakra-ui/react"
import { LuListMusic, LuPause, LuPencil, LuPlay, LuPlus, LuShuffle, LuSkipBack, LuSkipForward, LuSquare, LuTrash2, LuUserRoundPen } from "react-icons/lu";
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from "../ui/accordion";
import { useEffect, useReducer, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { PlaylistSubTab, SheetSubTab } from "@/interfaces/Models";
import { getSystemSheetTemplateSubTabs } from "@/services/systemService";
import { SoundtrackEditSectionDialog } from "./SoundtrackEditSectionDialog";
import { SoundtrackDeleteSectionDialog } from "./SoundtrackDeleteSectionDialog";
import { SoundtrackNewFieldDialog } from "./SoundtrackNewFieldDialog";
import { SoundtrackField } from "./SoundtrackField";
import { getPlaylistSubTabs } from "@/services/playlistService";
import { useAudioPlayer } from "@/context/AudioPlayerContext";


export interface CharacterSheetSectionProps {
    sectionTitle: string;
    sectionId: number;
    handleEdit: (open: boolean) => void;
}

export const SoundtrackSection = ({
    sectionTitle,
    sectionId,
    handleEdit
}: CharacterSheetSectionProps) => {
    const {
        queue,
        currentIndex,
        isPlaying,
        setIsPlaying,
        setQueue,
        next,
        previous,
        shuffle,
        setCurrentIndex
    } = useAudioPlayer();
    const [,forceUpdate] = useReducer(x=>x+1,0);

    const [musics,setMusics] = useState<PlaylistSubTab[]>();
    const [flag,setFlag] = useState(0);
    const [isQueueSet, setIsQueueSet] = useState(false)

    const mutation = useMutation({
        mutationKey: ["playlistsSubTabs"],
        mutationFn: getPlaylistSubTabs,
        onSuccess: (data) => {
          console.log(data)
          setMusics(data.sort((a, b) => {
            return a.id - b.id;
        }));
          setFlag(1);
        },
        onError: (error) => {
          console.log(error);
        },
      });

    useEffect(() => {
        if(flag == 0){
            mutation.mutate(sectionId);
        }
    }, [musics]);

    function fecharEforcar(){
        mutation.mutate(sectionId);
        setNewField(false);
        forceUpdate();
    }

    function fecharEforcar2(){
        setEditSection(false);
        setDeleteSection(false);
        //location.reload();
        handleEdit(false);
    }

    const tocarPlaylist = () => {
        if(!isQueueSet) {
            const videoIds = musicas?.map((music) => {return music.link.split("&")[0].split("https://www.youtube.com/watch?v=")[1]}) || [''];
            console.log(videoIds)
            setQueue(videoIds);
            setIsQueueSet(true);
        }
        setIsPlaying(true)
        setTocando(true)
        setPausado(false)
    }

    const pausarPlaylist = () => {
        setIsPlaying(false)
        setTocando(false)
        setPausado(true)
    }

    const pararPlaylist = () => {
        setCurrentIndex(0)
        setIsPlaying(false)
        setTocando(false)
        setPausado(false)
        setAleatorio(false)
    }

    const musicas: PlaylistSubTab[] = [
        {
            id:1,
            id_playlist:1,
            id_campanha:1,
            link:"https://www.youtube.com/watch?v=6POZlJAZsok&list=RD6POZlJAZsok&start_radio=1",
        },
        {
            id:1,
            id_playlist:1,
            id_campanha:1,
            link:"https://www.youtube.com/watch?v=3-qwqrQXsXQ&list=RD3-qwqrQXsXQ&start_radio=1"
        }
    
    ]
    const [tocando,setTocando] = useState(false)
    const [pausado,setPausado] = useState(false)
    const [aleatorio,setAleatorio] = useState(false)
    
    const [editSection,setEditSection] = useState(false);
    const [newField,setNewField] = useState(false);
    const [deleteSection,setDeleteSection] = useState(false);
    
    return(
        <div>
            <CardRoot size={"sm"} cursor={"pointer"}>
                <CardBody>
                    <AccordionRoot collapsible cursor={"pointer"}>
                        <AccordionItem cursor={"pointer"} key={sectionId} value={String(sectionId)}>
                        <AccordionItemTrigger fontSize={"xl"} placeContent={"space-between"} cursor={"pointer"}>
                            <LuListMusic /> {sectionTitle}
                        </AccordionItemTrigger>
                        <AccordionItemContent display={"grid"} gapY={4}>
                            {/*<For each={musics}>*/}
                            <For each={musicas}>
                                {(item) => <SoundtrackField fieldId={item.id} fieldTitle={item.link} handleEdit={fecharEforcar}/>}
                            </For>
                            <Flex justifyContent={"space-between"}>
                                <Flex gapX={2}>
                                    <IconButton onClick={()=>previous()} rounded={"full"} size={"md"} variant={"outline"} aria-label="Tocar Playlist"> 
                                        <LuSkipBack />
                                    </IconButton>
                                    <IconButton onClick={()=>tocarPlaylist()} rounded={"full"} size={"md"} variant={tocando ? "solid" :"outline"} aria-label="Tocar Playlist"> 
                                        <LuPlay />
                                    </IconButton>
                                    <IconButton onClick={()=>pararPlaylist()} rounded={"full"} size={"md"} variant={"outline"} aria-label="Tocar Playlist"> 
                                        <LuSquare />
                                    </IconButton>
                                    <IconButton onClick={()=>pausarPlaylist()} rounded={"full"} size={"md"} variant={pausado ? "solid" :"outline"} aria-label="Tocar Playlist"> 
                                        <LuPause />
                                    </IconButton>
                                    <IconButton onClick={()=>next()} rounded={"full"} size={"md"} variant={"outline"} aria-label="Tocar Playlist"> 
                                        <LuSkipForward />
                                    </IconButton>
                                    <IconButton onClick={()=>shuffle()} rounded={"full"} size={"md"} variant={aleatorio ? "solid" :"outline"} aria-label="Tocar Playlist"> 
                                        <LuShuffle />
                                    </IconButton>
                                </Flex>
                                <Flex gapX={2}>
                                    <IconButton onClick={()=>setNewField(true)} rounded={"full"} size={"md"} variant={"outline"} aria-label="Novo link"> 
                                        <LuPlus />
                                    </IconButton>
                                    <IconButton onClick={()=>setEditSection(true)} rounded={"full"} size={"md"} variant={"outline"} aria-label="Renomear playlist"> 
                                        <LuPencil />
                                    </IconButton>
                                    <IconButton onClick={()=>setDeleteSection(true)} rounded={"full"} size={"md"} variant={"outline"} aria-label="Excluir playlist"> 
                                        <LuTrash2 />
                                    </IconButton>
                                </Flex>
                            </Flex>
                        </AccordionItemContent>
                        </AccordionItem>
                    </AccordionRoot>
                </CardBody>
            </CardRoot>

            <SoundtrackEditSectionDialog open={editSection} handleClose={setEditSection} handleConfirm={fecharEforcar2} sectionId={sectionId} sectionName={sectionTitle}/>
            <SoundtrackDeleteSectionDialog open={deleteSection} handleClose={setDeleteSection} handleConfirm={fecharEforcar2} sectionId={sectionId} sectionName={sectionTitle}/>
            <SoundtrackNewFieldDialog open={newField} handleClose={setNewField} handleCreate={fecharEforcar} sectionId={sectionId} sectionName={sectionTitle}/>
        </div>
    )
}