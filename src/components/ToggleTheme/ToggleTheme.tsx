import { ClientOnly, Skeleton, IconButton } from "@chakra-ui/react"
import { LuSun, LuMoon } from "react-icons/lu"
import { useColorMode } from "../ui/color-mode"

export const ToggleTheme = () => {
    const { toggleColorMode, colorMode } = useColorMode()
    
    return(
        <div className="text-right right-bottom">
            <ClientOnly fallback={<Skeleton boxSize="8" />}>
            <IconButton onClick={toggleColorMode} variant="outline" size="sm">
                {colorMode === "light" ? <LuSun /> : <LuMoon />}
            </IconButton>
            </ClientOnly>
        </div>
    )
}