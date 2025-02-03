
import { Input, Text, Textarea, Image, Separator, Button, Box, CardBody, CardHeader, CardRoot, CardTitle, Center, Flex, For,} from "@chakra-ui/react";
import { FileUploadDropzone, FileUploadList, FileUploadRoot } from "../ui/file-upload";
import { PinnedDiaryListCard } from "../PinnedDiaryView/PinnedDiaryListCard";
import { SidebarPlayer } from "../SidebarPlayer/SidebarPlayer";
import { ToggleTheme } from "../ToggleTheme/ToggleTheme";
import { CampaignCard } from "../CampaignCard/CampaignCard";
import { CharacterProfile } from "../CharacterProfile/CharacterProfile";
import { AddNewCharacterProfile } from "../CharacterProfile/AddNewCharacterProfile";

export interface CampaignPagePlayerProps {
    user: string;
    campaign: string; //depois mudar pra Campaign
}

export const CampaignPagePlayer = ({
    user,
    campaign,
}: CampaignPagePlayerProps) => {
    const campaign_image = "" //depois mudar pra pegar a imagem cadastrada na campanha

    return(
        <div>

            <div className="grid grid-cols-3 gap-x-8 content-padding">
                <div className="col-span-1">
                    {/* aqui vem a descrição da campanha */}
                    <Text className="text" textAlign={"justify"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus rutrum ipsum ex, at ullamcorper dolor maximus vitae. Suspendisse potenti. Phasellus ultrices erat eu magna iaculis dapibus. Sed placerat augue nibh, ut convallis nulla iaculis a. Praesent turpis velit, bibendum vulputate posuere quis, fringilla sed est. Nunc volutpat nunc ac volutpat tempor. Sed ac orci faucibus, interdum eros in, elementum arcu.</Text>
                </div>
                <div className="col-span-1 max-h-[80vh]">

                    <CardRoot className="w-full h-[38vh]">
                        <CardHeader>
                            <CardTitle className="text-center padding-bottom">MEUS PERSONAGENS</CardTitle>
                            <Separator></Separator>
                        </CardHeader>
                        <CardBody overflowY={"scroll"}  className="flex">
                            <Center>
                                <Flex wrap="wrap" mt='1'>
                                    <For each={['','',]}>
                                        {(item) => <CharacterProfile mt='1' mr='1' ml='1' mb="1" character={item}></CharacterProfile>}
                                    </For>
                                    <AddNewCharacterProfile mt='1' mr='1' ml='1' mb="1"></AddNewCharacterProfile>
                                </Flex>
                            </Center>
                        </CardBody>
                    </CardRoot>

                    <CardRoot className="w-full h-[38vh]">
                        <CardHeader>
                            <CardTitle className="text-center padding-bottom">OUTROS JOGADORES</CardTitle>
                            <Separator></Separator>
                        </CardHeader>
                        <CardBody overflowY={"scroll"}  className="flex">
                            <Center>
                                <Flex alignItems={"center"} wrap="wrap" mt='1'>
                                    <For each={['','','','','','','','','','','','','','','','','','','','','','','','','','','','','',]}>
                                        {(item) => <CharacterProfile mt='1' mr='1' ml='1' mb="1" character={item}></CharacterProfile>}
                                    </For>
                                </Flex>
                            </Center>
                        </CardBody>
                    </CardRoot>
                </div>
                <CardRoot className="max-h-[80vh] col-span-1">
                    <CardHeader>
                        <CardTitle className="text-center padding-bottom">REVISITAR AVENTURAS</CardTitle>
                        <Separator></Separator>
                    </CardHeader>
                    <CardBody  overflowY={"auto"}>
                        <PinnedDiaryListCard/>
                        <PinnedDiaryListCard/>
                        <PinnedDiaryListCard/>
                        <PinnedDiaryListCard/>
                        <PinnedDiaryListCard/>
                    </CardBody>
                </CardRoot>
            </div>
            
        </div>
    )
}