import { Img, Text, VStack } from "@chakra-ui/react"

interface Props {
    src: string
    imageHeight?: string
    title: string
    description: string
}

const EmptySpace = ({ src, imageHeight, title, description }: Props) => {
    return <VStack spacing={12} >
        <Img src={src} h={imageHeight ?? '150px'} />
        <VStack spacing={4} maxW='400px'>
            <Text fontSize='lg' fontWeight='bold' textAlign='center'>{title}</Text>
            <Text textAlign='center'>{description}</Text>
        </VStack>
    </VStack >
}

export default EmptySpace