import { VStack, Text, HStack } from "@chakra-ui/react"
import { DocumentData } from "../interfaces"
import { formatDate } from "../utils/date"
import DocumentCard from "./document-card";

interface Props {
    document: DocumentData
}

const DocumentItem = ({ document }: Props) => {
    const { id, title, description, createdBy, publishedAt, fileName } = document
    const { name, lastname } = createdBy

    return <HStack align='stretch' spacing='8'>
        <DocumentCard fileName={fileName} />

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

export default DocumentItem