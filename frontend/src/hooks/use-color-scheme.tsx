import { useTheme } from "@chakra-ui/react"
import { primaryColorScheme, secondaryColorScheme } from "../theme";

type Token = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
type ColorScheme = {
    [key in Token]: string
}

const useColorScheme = () => {
    const theme = useTheme()
    const primaryScheme: ColorScheme = theme.colors[primaryColorScheme]
    const secondaryScheme: ColorScheme = theme.colors[secondaryColorScheme]
    return { primaryScheme, secondaryScheme }
}

export default useColorScheme