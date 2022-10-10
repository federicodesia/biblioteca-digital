import { Box, VStack, Image, HStack, Text } from "@chakra-ui/react"
import { DocumentData } from "../interfaces"
import uploadsService from "../services/uploads-service"
import DocumentCard from "./document-card"

interface Props {
    document: DocumentData
}

const FeaturedDocument = ({ document }: Props) => {
    const { title, description, createdBy, fileName } = document
    const { name, lastname } = createdBy

    return <Box h='300px' rounded='xl' bg='gray.600' overflow='hidden' position='relative'>
        <Image
            src={uploadsService.getPreview(fileName ?? '')}
            w='full'
            h='300px'
            objectFit='cover'
            objectPosition='bottom'
            filter='blur(300px)'
            pointerEvents='none'

            position='absolute'
            top='0' left='0' bottom='0' right='0' />

        <HStack position='absolute' top='0' left='0' bottom='0' right='0' justify='center' p='8'>

            <HStack spacing='8' align='stretch' fontWeight='light' color='whiteAlpha.900'>
                <DocumentCard fileName={fileName} border='none' shadow='xl' />

                <VStack flex='1' align='start' justify='space-between' py='2' spacing='8'>
                    <VStack align='start' maxW='xl'>
                        <Text noOfLines={1} fontWeight='semibold'>{title}</Text>
                        <Text noOfLines={3}>{description}</Text>
                    </VStack>

                    <Text noOfLines={1}>
                        {`Publicado por: ${name} ${lastname}`}
                    </Text>
                </VStack>
            </HStack>
        </HStack>
    </Box>
}

export default FeaturedDocument