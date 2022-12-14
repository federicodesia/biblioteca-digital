import { Heading, Text, Stack } from "@chakra-ui/react"
import { ReactNode } from "react"

interface WelcomeFormProps {
    title: string
    description: string
    content: ReactNode
    bottom: ReactNode
}

const WelcomeForm = ({ title, description, content, bottom }: WelcomeFormProps) => {
    return <Stack
        spacing={12}
        minH='20rem'
        justify='space-between'>
        <Stack textAlign={{ md: 'center' }}>
            <Heading fontSize='2xl'>
                {title}
            </Heading>
            <Text color='gray.600'>
                {description}
            </Text>
        </Stack>

        <Stack spacing={4}>
            {content}
        </Stack>

        <Stack spacing={4}>
            {bottom}
        </Stack>
    </Stack>
}

export default WelcomeForm