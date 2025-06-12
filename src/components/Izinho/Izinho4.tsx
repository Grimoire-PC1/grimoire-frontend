import { ClientOnly,Text, Skeleton, IconButton, Box, Avatar, HoverCard, HStack, Icon, Link, Portal, Stack, Flex } from "@chakra-ui/react"
import { LuSun, LuMoon, LuInfo, LuChartLine } from "react-icons/lu"
import { useColorMode } from "../ui/color-mode"

interface IzinhoProps {
    texto:string;
    texto2:string;
}

export const Izinho4 = (
    {
        texto,
        texto2
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
                                <Text>{texto}</Text>
                                <Text>{texto2}</Text>
                            </Flex>
                        </HoverCard.Content>
                        </HoverCard.Positioner>
                    </Portal>
                </HoverCard.Root>
        </Box>
       </>
    )
}