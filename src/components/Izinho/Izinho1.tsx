import { ClientOnly,Text, Skeleton, IconButton, Box, Avatar, HoverCard, HStack, Icon, Link, Portal, Stack } from "@chakra-ui/react"
import { LuSun, LuMoon, LuInfo, LuChartLine } from "react-icons/lu"
import { useColorMode } from "../ui/color-mode"

interface IzinhoProps {
    texto:string;
}

export const Izinho1 = (
    {
        texto
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
                            <Text>{texto}</Text>
                        </HoverCard.Content>
                        </HoverCard.Positioner>
                    </Portal>
                </HoverCard.Root>
        </Box>
       </>
    )
}