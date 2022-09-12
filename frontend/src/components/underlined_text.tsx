import { Text } from "@chakra-ui/react"
import useColorScheme from "../hooks/use-color-scheme"

interface UnderlinedTextProps {
    children: string,
    color?: string,
    opacity?: string
}

const UnderlinedText = ({ children, color, opacity = '1' }: UnderlinedTextProps) => {
    const { primaryScheme } = useColorScheme()

    return <Text
        as='span'
        position='relative'
        _after={{
            content: "''",
            width: 'full',
            height: '30%',
            position: 'absolute',
            bottom: 1,
            left: 0,
            bg: color ?? primaryScheme[500],
            opacity: opacity,
            zIndex: -1,
        }}>
        {children}
    </Text>
}

export default UnderlinedText