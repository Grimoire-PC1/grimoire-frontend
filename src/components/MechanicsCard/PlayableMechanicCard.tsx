import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import {Box, Button, createListCollection, Flex, For, Group, IconButton,Tag,Text,} from "@chakra-ui/react";
import { useMemo, useReducer, useState } from 'react';
import { CharacterProfile } from '../CharacterProfile/CharacterProfile';
import { LuPlus,LuUser } from 'react-icons/lu';
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from '../ui/select';
import { StepsCompletedContent, StepsContent, StepsItem, StepsList, StepsNextTrigger, StepsPrevTrigger, StepsRoot } from '../ui/steps';


export interface UserSettingsDialogSmProps {
    open:boolean,
    handleClose: (open: boolean) => void;
    mechanicId:number;
    mechanicName:string;
    mechanicActions:string[];
    mechanicReactions:string[]
}

export const PlayableMechanicCard = ({
    open,
    handleClose,
    mechanicId,
    mechanicActions,
    mechanicName,
    mechanicReactions
}: UserSettingsDialogSmProps) => {
    const [,forceUpdate] = useReducer(x=>x+1,0);

    type personagem = {
        nome:string;
        iniciativa:number;
    }

    //const allCharacters = ['P1','P2','NPC1','P1','P2','NPC1','P1','P2','NPC1','P1','P2','NPC1',] //getCharacters da campanha

    const [round,setRound] = useState(0);

    const allCharacters = useMemo(() => {
        return createListCollection({
          items: ['P1','P2','NPC1','P3','P4','P5','P6','P7','P8','P9','P10','P11','P12','P13','P14','P15','P16','P17','P18','P19','P20','P21',], //pegar todos os personagens da campanha
          itemToString: (item) => item,
          itemToValue: (item) => item,
        })
      }, [])

    const allActions = useMemo(()=>{
        return createListCollection({
            items: mechanicActions,
            itemToString: (item) => item,
            itemToValue: (item) => item,
          })
        }, [mechanicActions]
    )

    const allReactions = useMemo(()=>{
        return createListCollection({
            items: mechanicReactions,
            itemToString: (item) => item,
            itemToValue: (item) => item,
          })
        }, [mechanicReactions]
    )

    const [characters,setCharacters] = useState<personagem[]>([]); //inicia vazio na prática
    const [chosenAction,setChosenAction] = useState<string[]>([]);
    const [chosenReaction,setChosenReaction] = useState<string[]>([]);
    const [chosenCharacter,setCharacter] = useState<string[]>([]);

    function close(){
        console.log(characters);
        setCharacters([]);
        console.log(characters);
        setChosenAction([]);
        setChosenReaction([]);
        handleClose(false);
    }

    const charactersCollection = useMemo(()=>{
        return createListCollection({
            items: characters,
            itemToString: (item) => item.nome,
            itemToValue: (item) => item.nome,
          })
        }, [characters]
    )
    
    function updateCharacters(c:personagem){
        if(!(characters.find((character) => character.nome === c.nome))){
            const newCharacterList = characters;
            newCharacterList.push(c);
            setCharacters(newCharacterList);
            forceUpdate();
        }
        console.log(round)
    }

    function updateRemoveCharacter(c:personagem){
        const newCharacterList = characters;
        newCharacterList.forEach( (item, index) => {
            if(item === c) newCharacterList.splice(index,1);
          });
        setCharacters(newCharacterList);
        forceUpdate();
    }

    function numeroAleatorio(){
        return Math.floor(Math.random() * 21)
    }

    function rolariniciativa(){
        for(let c of characters){
            c.iniciativa = numeroAleatorio();
        }
        forceUpdate();
    }

    function proximaRodada(){
        setRound(0);
    }

    return(
    <Dialog open={open} onClose={close} className="relative z-10">
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
                                <div className="">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <DialogTitle className="text-base text-large font-semibold">
                                        <Flex placeContent={"space-between"}>
                                            <Text>{mechanicName}</Text>
                                            <Button disabled={characters.length == 0 || !(round == 0)}
                                                    onClick={()=>rolariniciativa()}>
                                                Rolar Iniciativa
                                            </Button>
                                        </Flex>
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
                                            <SelectContent  w={"320px"} maxH={"200px"}>
                                                {allCharacters.items.map((character) => (
                                                <SelectItem onClick={()=>updateCharacters({nome: character, iniciativa: 0})} cursor={"pointer"} item={character} key={character}>
                                                    {character}
                                                </SelectItem>
                                                ))}
                                            </SelectContent>
                                            </SelectRoot>
                                        </Box>
                                        <Flex gap={1} flexWrap={"wrap"}>
                                            <For each={characters}>
                                                {(character)=><Box onClick={()=>updateRemoveCharacter(character)}><CharacterProfile character={character} mt="" mb="" ml="" mr=""></CharacterProfile></Box>}
                                            </For>
                                        </Flex>
                                    </Flex>
                                        <div>
                                            <Text mt={4} className='text'>Ordem de iniciativa</Text>
                                            <Flex justifyContent={"center"} mt={2} gapY={1} gapX={4} flexWrap={"wrap"}>
                                                <For each={characters.sort((a, b) => {
                                                                                return b.iniciativa - a.iniciativa;
                                                                            })}>
                                                    {(character)=>
                                                        <Box textAlign={"center"}>
                                                            <CharacterProfile character={character} mt="" mb="" ml="" mr=""/>
                                                            <Text>{character.iniciativa}</Text>
                                                        </Box>
                                                    }
                                                </For>
                                            </Flex>

                                            <Text mt={4} className='text'>Rodada atual</Text>
                                            <StepsRoot step={round} mt={2} defaultStep={0} count={characters.length}>
                                                <StepsList>
                                                    <For each={characters.sort((a, b) => {
                                                                                return b.iniciativa - a.iniciativa;
                                                                            })}>
                                                        {(item,index) => <StepsItem icon={<LuUser />} index={index} title={item.nome} />}
                                                    </For>
                                                </StepsList>

                                                <Box display={"grid"} className={'grid-cols-'+(characters.length)}>
                                                    <For each={characters}>
                                                            {(item,index) => 
                                                            chosenAction[index] ?
                                                            <Box className={'col-start-'+index+' col-end-'+index}>
                                                                <StepsContent placeSelf={"center"} index={index}>
                                                                    <Tag.Root>
                                                                        <Tag.Label>Ação: {chosenAction[index]}</Tag.Label>
                                                                    </Tag.Root>
                                                                    <br></br>
                                                                    <Tag.Root>
                                                                        <Tag.Label>Alvo: {chosenCharacter[index]}</Tag.Label>
                                                                    </Tag.Root>
                                                                    <br></br>
                                                                    <Tag.Root>
                                                                        <Tag.Label>Efeito: {chosenReaction[index]}</Tag.Label>
                                                                    </Tag.Root>

                                                                </StepsContent>

                                                            </Box>
                                                            :
                                                            <StepsContent className={'col-span-'+(characters.length)} index={index}>
                                                                <SelectRoot w={"200px"} collection={allActions} placeSelf={"center"}>
                                                                <SelectTrigger>
                                                                <SelectValueText placeholder="Ação do jogador" />
                                                                </SelectTrigger>
                                                                <SelectContent  w={"200px"} maxH={"200px"}>
                                                                    {allActions.items.map((character) => (
                                                                    <SelectItem onClick={()=>chosenAction.push(character)} cursor={"pointer"} item={character} key={character}>
                                                                        {character}
                                                                    </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                                </SelectRoot>
                                                                <SelectRoot mt={2} w={"200px"} collection={charactersCollection} placeSelf={"center"}>
                                                                <SelectTrigger>
                                                                <SelectValueText placeholder="Alvo da ação" />
                                                                </SelectTrigger>
                                                                <SelectContent  w={"200px"} maxH={"200px"}>
                                                                    {charactersCollection.items.map((character) => (
                                                                    <SelectItem onClick={()=>chosenCharacter.push(character.nome)} cursor={"pointer"} item={character.nome} key={character.nome}>
                                                                        {character.nome}
                                                                    </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                                </SelectRoot>
                                                                <SelectRoot mt={2} w={"200px"} collection={allReactions} placeSelf={"center"}>
                                                                <SelectTrigger>
                                                                <SelectValueText placeholder="Efeito sobre o jogador" />
                                                                </SelectTrigger>
                                                                <SelectContent  w={"200px"} maxH={"200px"}>
                                                                    {allReactions.items.map((character) => (
                                                                    <SelectItem onClick={()=>chosenReaction.push(character)} cursor={"pointer"} item={character} key={character}>
                                                                        {character}
                                                                    </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                                </SelectRoot>
                                                            </StepsContent>
                                                            }
                                                    </For>
                                                </Box>
                                                <StepsCompletedContent>{characters.length == 0 ? "Coloque personagens na cena para iniciar a mecânica!" : "Rodada concluída!"}</StepsCompletedContent>

                                                <Group justifyContent={"center"}>
                                                    <StepsPrevTrigger asChild>
                                                    <Button onClick={()=>setRound(round-1)} variant="outline" size="sm">
                                                        Turno anterior
                                                    </Button>
                                                    </StepsPrevTrigger>
                                                    <StepsNextTrigger asChild>
                                                    <Button onClick={()=>setRound(round+1)} variant="outline" size="sm">
                                                        Próximo turno
                                                    </Button>
                                                    </StepsNextTrigger>
                                                </Group>
                                            </StepsRoot>
                                        </div>
                                </div>

                                <Flex placeContent={"end"}>
                                    <Button disabled={round == 0 || characters.length < 2 || !(round == characters.length)}
                                            onClick={()=>proximaRodada()}>
                                        {"Próxima rodada"}
                                    </Button>
                                </Flex>

                            </DialogPanel>
                        </Box>
                        </div>
                    </div>
    </Dialog>
    )
}