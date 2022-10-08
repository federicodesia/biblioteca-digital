import { AspectRatio, Box, VStack, Text } from "@chakra-ui/react"
import { UploadRequest } from "../interfaces"
import DocumentCard from "./document-card"
import UploadRequestDetailModal from "./modals/upload-request-detail"

interface Props {
    uploadRequest: UploadRequest
}

const UplaodRequestItem = ({ uploadRequest }: Props) => {
    const { document, status } = uploadRequest
    const { title, fileName } = document

    return <VStack spacing='5' w='150px' align='stretch'>
        <UploadRequestDetailModal
            uploadRequest={uploadRequest}
            trigger={
                <DocumentCard fileName={fileName} cursor='pointer' />
            } />

        <VStack fontSize='sm' align='start' spacing='1' whiteSpace='nowrap' >
            <Text w='full' textOverflow='ellipsis' overflow='hidden' fontWeight='semibold'>{title}</Text>
            <Text w='full' textOverflow='ellipsis' overflow='hidden'>{status.name}</Text>
        </VStack>
    </VStack>
}

export default UplaodRequestItem