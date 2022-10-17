import { VStack, Text, HStack, Flex } from "@chakra-ui/react"
import { HiOutlineDownload, HiOutlineTag } from "react-icons/hi";
import { DocumentData } from "../interfaces"
import pluralize from "../utils/pluralize";
import DocumentCard from "./document-card";
import Link from "./link";

interface Props {
    document: DocumentData
}

const DocumentItem = ({ document }: Props) => {
    const { id, title, description, createdBy, fileName, categories, downloads } = document
    const { name, lastname } = createdBy

    return <HStack align='stretch' spacing='8' wordBreak='break-word'>
        <Link to={`/document/${id}`}>
            <DocumentCard fileName={fileName} />
        </Link>

        <VStack
            flex='1'
            align='start'
            justify='space-between'
            py='2'
            spacing='8'>

            <VStack align='start' maxW='3xl'>
                <Link to={`/document/${id}`}>
                    <Text fontWeight='semibold'>{title}</Text>
                </Link>

                <Text>{description}</Text>
            </VStack>

            <VStack align='start' spacing='1'>
                <Text noOfLines={1} >{`Publicado por: ${name} ${lastname}`}</Text>

                <Flex columnGap='4' rowGap='1' flexWrap='wrap'>
                    <HStack flexShrink={0}>
                        <HiOutlineDownload />
                        <Text noOfLines={1}>
                            {pluralize(downloads, 'descarga')}
                        </Text>
                    </HStack>

                    <HStack flexShrink={0}>
                        <HiOutlineTag />
                        <Text noOfLines={1}>
                            {categories.map(c => c.name).join(', ')}
                        </Text>
                    </HStack>
                </Flex>
            </VStack>
        </VStack>
    </HStack>
}

export default DocumentItem