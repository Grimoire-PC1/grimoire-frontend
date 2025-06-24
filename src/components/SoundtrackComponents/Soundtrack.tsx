import { Text, Flex, For, Grid, IconButton,  } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";
import { useEffect, useState } from "react";
import { PlaylistTab } from "@/interfaces/Models";
import { useMutation } from "@tanstack/react-query";
import { SoundtrackSection } from "./SoundrackSection";
import { SoundtrackSectionDialog } from "./SoundtrackSectionDialog";
import { getPlaylistTabs } from "@/services/playlistService";
import { Izinho1 } from "../Izinho/Izinho1";
import { soundtrackText } from "../Izinho/izinhoText";
import YouTubeAudioPlayer from "@/components/YoutubePlayer/YouTubeAudioPlayer"
import { useAudioPlayer } from "@/context/AudioPlayerContext";

export interface SystemPageComponentProps {
    title: string;
    subtitle: string;
    campaign:string;
}

export const Soundtrack = ({
    title,
    subtitle,
    campaign
}: SystemPageComponentProps) => {

    const [data, setData] = useState<PlaylistTab[]>();
    const [flag,setFlag] = useState(0);

    const mutation = useMutation({
    mutationKey: ["playlists"],
    mutationFn: getPlaylistTabs,
    onSuccess: (data) => {
        console.log(data)
        setData(data.sort((a, b) => {
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
            mutation.mutate();
        }
    }, []);

    const [newSection,setNewSection] = useState(false);

    function fecharEforcar(){
        setNewSection(false);
        mutation.mutate();
    }

    const { videoId, setVideoId, isPlaying, setIsPlaying, volume, setVolume } = useAudioPlayer();
    
    return(
        <div className="">
            <div className="margin-right">
                <Flex placeContent={"space-between"}>
                    <div>
                        <Flex gap={2} alignItems={"center"}>
                            <Text className="subtitle-s">{title}</Text>
                            <Izinho1 texto={soundtrackText.text1}/>
                        </Flex>
                        <Text className="text">{subtitle}</Text>
                    </div>
                                        
                    <IconButton onClick={()=>setNewSection(true)} rounded={"full"} size={"2xl"} variant={"outline"} aria-label="Nova Aba"> 
                        <LuPlus />
                    </IconButton>
                    <div>
                    <p>Video atual: {"k4hjX6ZsplU"}</p>
                    <button onClick={() => setIsPlaying(!isPlaying)}>
                        {isPlaying ? 'Pausar' : 'Tocar'}
                    </button>
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                    />
                    <button onClick={() => setVideoId(prompt('Novo ID do vídeo YouTube:') || videoId)}>
                        Trocar Vídeo
                    </button>
                    </div>
                    {/*
                        <div style={{ padding: 20 }}>
                            <h1>🎧 Player de Áudio do YouTube</h1>
                            <YouTubeAudioPlayer videoId="k4hjX6ZsplU" />
                        </div>
                    */}
                </Flex>
                    <Grid maxH={"66vh"} overflowY={"auto"} className="grid-cols-2 margin-top-s" mb={12} gap={4}>
                        {/*<For each={data}>*/}
                        <For each={[{nome:"jorge", id:1}]}>
                            {(item) => <SoundtrackSection sectionTitle={item.nome} sectionId={item.id} handleEdit={fecharEforcar}/>}
                        </For>
                    </Grid>
            
            </div>

            <SoundtrackSectionDialog open={newSection} handleClose={setNewSection} handleCreate={fecharEforcar}/>
        </div>
    )
}