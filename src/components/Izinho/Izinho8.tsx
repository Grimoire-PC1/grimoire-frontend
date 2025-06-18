import { ClientOnly,Text, Skeleton, IconButton, Box, Avatar, HoverCard, HStack, Icon, Link, Portal, Stack, Flex } from "@chakra-ui/react"
import { LuSun, LuMoon, LuInfo, LuChartLine } from "react-icons/lu"
import { useColorMode } from "../ui/color-mode"

interface IzinhoProps {
    texto1:string;
    texto2:string;
    texto3:string;
    texto4:string;
    texto5:string;
    texto6:string;
    texto7:string;
    texto8:string;
}

export const Izinho8 = (
    {
        texto1,
        texto2,
        texto3,
        texto4,
        texto5,
        texto6,
        texto7,
        texto8
    }:IzinhoProps
) => {
    return(
    <>
        <Box>
                <HoverCard.Root size="sm">
                    <HoverCard.Trigger asChild>
                        <IconButton rounded={"full"} bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }} variant="outline" size="sm">
                            <LuInfo/>
                        </IconButton>
                    </HoverCard.Trigger>
                    <Portal>
                        <HoverCard.Positioner>
                        <HoverCard.Content>
                            <HoverCard.Arrow>
                                <HoverCard.ArrowTip />
                            </HoverCard.Arrow>
                            <Flex flexDir={"column"} gap={2}>
                                <Text>{texto1}</Text>
                                <Text>{texto2}</Text>
                                <Text>{texto3}</Text>
                                <Text>{texto4}</Text>
                                <Text>{texto5}</Text>
                                <Text>{texto6}</Text>
                                <Text>{texto7}</Text>
                                <Text>{texto8}</Text>
                            </Flex>
                        </HoverCard.Content>
                        </HoverCard.Positioner>
                    </Portal>
                </HoverCard.Root>
        </Box>
       </>
    )
}