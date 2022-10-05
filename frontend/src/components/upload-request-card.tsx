import { AspectRatio, Box, VStack, Text } from "@chakra-ui/react"
import { UploadRequest } from "../interfaces"
import UploadRequestDetailModal from "./modals/upload-request-detail"

interface Props {
    uploadRequest: UploadRequest
}

const UplaodRequestCard = ({ uploadRequest }: Props) => {
    const { document, status } = uploadRequest
    const { title } = document

    return <VStack spacing='5' w='150px' align='stretch'>
        <UploadRequestDetailModal
            uploadRequest={uploadRequest}
            trigger={
                <AspectRatio w='full' ratio={3 / 4} cursor='pointer'>
                    <Box bg='gray.200' rounded='lg' />
                </AspectRatio>
            } />

        <VStack fontSize='sm' align='start' spacing='1' whiteSpace='nowrap' >
            <Text w='full' textOverflow='ellipsis' overflow='hidden' fontWeight='semibold'>{title}</Text>
            <Text w='full' textOverflow='ellipsis' overflow='hidden'>{status.name}</Text>
        </VStack>
    </VStack>
}

export default UplaodRequestCard