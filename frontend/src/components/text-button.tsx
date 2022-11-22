import { Button, ButtonProps, Text } from "@chakra-ui/react"

interface TextButtonProps extends ButtonProps {
    children: string
}

const TextButton = (props: TextButtonProps) => {
    return <Button {...props}>
        <Text>{props.children}</Text>
    </Button>
}

export default TextButton