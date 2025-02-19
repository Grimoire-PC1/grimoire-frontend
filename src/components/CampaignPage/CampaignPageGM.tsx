import { Input, Text, Textarea, Image, Separator, Button, Center, Flex, For,} from "@chakra-ui/react";
import { FileUploadDropzone, FileUploadList, FileUploadRoot } from "../ui/file-upload";
import { PinnedDiaryListCard } from "../PinnedDiaryView/PinnedDiaryListCard";
import { CharacterProfile } from "../CharacterProfile/CharacterProfile";
import { Campaign, Character } from "@/interfaces/Models";
import { useState } from "react";
import { DialogCampaignCode } from "../Dialog/DialogCampaignCode";
import { PinnedDiaryListCardNoEdit } from "../PinnedDiaryView/PinnedDiaryListCardNoEdit";

export interface CampaignPageGMProps {
    user: string;
    campaign: string; //depois mudar pra Campaign
}

export const CampaignPageGM = ({
    user,
    campaign,
}: CampaignPageGMProps) => {

    const campaign_image = "" //depois mudar pra pegar a imagem cadastrada na campanha

    const players = [[''],[''],['','']];
    var characters: string[][] = [];

    for(let i = 0; i < players.length; i++) {
        characters.push(players[i]);
    }

    const [openCampaignCode,setOpenCampaignCode] = useState(false);

    return(
        <div className="h-[80vh] overflow-y-auto">
            <div className="margin-right">
                <Text className="subtitle-s">PERSONALIZE SUA HISTÓRIA</Text>
                <div className="grid grid-cols-2 margin-top-xs">
                    <div className="content-end">
                        {
                            campaign_image == "" ?
                            <FileUploadRoot alignItems="stretch" maxFiles={1}>
                                <FileUploadDropzone w={"36vw"} h={"36vh"}
                                    label="Faça o upload da capa da sua campanha"
                                    description=".png ou .jpg de até 5MB"
                                />
                                <FileUploadList />
                            </FileUploadRoot>
                            :
                            <Image rounded={"xl"} w={"36vw"} h={"36vh"} className="bg-purple-950"></Image>
                        }
                    </div>
                    <div className="padding-left content-end">
                        <Text className="text">Título</Text>
                        <Input></Input>
                        <Text className="text" mt={"4"}>Descreva sua história</Text>
                        <Textarea resize={"none"}></Textarea>
                        <Button mt={"4"} disabled>Salvar alterações</Button> {/* habilitar botão quando alguma alteração for feita nos textos ou na imagem */}
                        <Button onClick={()=>setOpenCampaignCode(true)} w={"max"} mt={"4"}>Compartilhar código da campanha</Button>
                        </div>
                </div>
                <div className="grid grid-cols-28 margin-top-s">
                    <div className="col-span-16 margin-right">
                        <Text className="subtitle-s">HISTÓRICO DE SESSÕES</Text>
                        <PinnedDiaryListCardNoEdit/>
                        <PinnedDiaryListCardNoEdit/>
                        <PinnedDiaryListCardNoEdit/>
                        <PinnedDiaryListCardNoEdit/>
                        <PinnedDiaryListCardNoEdit/>
                        <PinnedDiaryListCardNoEdit/>
                        {/* aqui vem uma lista de PinnedDiaryListCard. clicar em um card abre a entrada do diário para aquela sessão*/}
                    </div>
                    <Separator orientation={"vertical"} className="col-span-1"></Separator>
                    <div className="col-span-11">
                        <Text className="subtitle-s text-center">PERSONAGENS DOS JOGADORES</Text>
                        <Center>
                            <Flex wrap="wrap" mt='2'>
                                <For each={characters}>
                                    {(itemPlayer) => 
                                    <For each={itemPlayer}>
                                        {(itemCharacter) => <CharacterProfile mt='1' mr='1' ml='1' mb="1" character={itemCharacter}></CharacterProfile>}
                                    </For>}
                                </For>
                            </Flex>
                        </Center>
                        {/* aqui vem uma lista de avatares dos jogadores. clicar neles leva à ficha do personagem*/}
                    </div>
                </div>
            </div>

            <DialogCampaignCode open={openCampaignCode} handleClose={setOpenCampaignCode} campaignId={campaign}/>
        </div>
    )
}