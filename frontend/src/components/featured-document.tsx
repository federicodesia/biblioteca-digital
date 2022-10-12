import { Box, Image, HStack } from "@chakra-ui/react"
import { DocumentData } from "../interfaces"
import uploadsService from "../services/uploads-service"
import DocumentItem from "./document-item"

interface Props {
    document: DocumentData
}

const FeaturedDocument = ({ document }: Props) => {
    const { fileName } = document

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
            <DocumentItem document={document} type='featured' />
        </HStack>
    </Box>
}

export default FeaturedDocument