import { Box, VStack, Text, HStack } from "@chakra-ui/react"
import { DocumentData } from "../interfaces"
import { formatDate } from "../utils/date"

interface Props {
    document: DocumentData
}

const DocumentCard = ({ document }: Props) => {
    const { id, title, description, createdBy, publishedAt } = document
    const { name, lastname } = createdBy

    return <HStack align='stretch' spacing='8'>
        <Box h='200px' w='150px' bg='gray.200' rounded='lg' />

        <VStack flex='1' align='start' justify='space-between' py='2' spacing='8'>
            <VStack align='start' maxW='3xl'>
                <Text fontWeight='semibold'>{title}</Text>
                <Text>{description}</Text>
            </VStack>

            <VStack align='start' spacing='1'>
                <Text>{`Creado por: ${name} ${lastname}`}</Text>
                <Text>{`Publicado el: ${publishedAt ? formatDate(publishedAt) : '-'}`}</Text>
            </VStack>
        </VStack>
    </HStack>
}

export default DocumentCard