
import { Input, Text, Textarea, Image, Separator, Button, Box, CardBody, CardHeader, CardRoot, CardTitle, Center, Flex, For,} from "@chakra-ui/react";
import { PinnedDiaryListCard } from "../PinnedDiaryView/PinnedDiaryListCard";
import { CharacterProfile } from "../CharacterProfile/CharacterProfile";
import { AddNewCharacterProfile } from "../CharacterProfile/AddNewCharacterProfile";
import { Campaign, Character, Player, User } from "@/interfaces/Models";

export interface CampaignPagePlayerProps {
    user: User | undefined;
    campaign: Campaign | undefined; //depois mudar pra Campaign
}

export const CampaignPagePlayer = ({
    user,
    campaign,
}: CampaignPagePlayerProps) => {
    const campaign_image = campaign?.image //depois mudar pra pegar a imagem cadastrada na campanha

    var players: Player | any[]
    if(!campaign) {
        players = []
    } else {
        players = campaign.players;
    }

    var yourCharacters: Character[][] = [];
    var otherCharacters: Character[][] = [];

    for(let i = 0; i < players.length; i++) {
        if(players[i].id == user?.id) {
            yourCharacters.push(players[i].characters);
        } else {
            otherCharacters.push(players[i].characters)
        }
    }

    return(
        <div>

            <div className="grid grid-cols-3 gap-x-8 content-padding">
                <div className="col-span-1">
                    <Text className="text" textAlign={"justify"}>{campaign?.description}</Text>
                </div>
                <div className="col-span-1 max-h-[80vh]">

                    <CardRoot className="w-full h-[38vh]">
                        <CardHeader>
                            <CardTitle className="text-center padding-bottom">MEUS PERSONAGENS</CardTitle>
                            <Separator></Separator>
                        </CardHeader>
                        <CardBody ml={4} overflowY={"scroll"}  className="flex">
                            <Center>
                                <Flex wrap="wrap" mt='1'>
                                    <For each={yourCharacters}>
                                        {(itemPlayer) => 
                                        <For each={itemPlayer}>
                                            {(itemCharacter) => <CharacterProfile mt='1' mr='1' ml='1' mb="1" character={itemCharacter}></CharacterProfile>}
                                        </For>}
                                    </For>
                                    <AddNewCharacterProfile mt='1' mr='1' ml='1' mb="1"></AddNewCharacterProfile>
                                </Flex>
                            </Center>
                        </CardBody>
                    </CardRoot>

                    <CardRoot mt={6} className="w-full h-[38vh]">
                        <CardHeader>
                            <CardTitle className="text-center padding-bottom">OUTROS JOGADORES</CardTitle>
                            <Separator></Separator>
                        </CardHeader>
                        <CardBody ml={4} overflowY={"scroll"}  className="flex">
                            <Center>
                                <Flex alignItems={"center"} wrap="wrap" mt='1'>
                                    <For each={otherCharacters}>
                                        {(itemPlayer) => 
                                        <For each={itemPlayer}>
                                            {(itemCharacter) => <CharacterProfile mt='1' mr='1' ml='1' mb="1" character={itemCharacter}></CharacterProfile>}
                                        </For>}
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