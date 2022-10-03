import { Box, Button, HStack, Modal, ModalContent, ModalOverlay, useDisclosure, VStack } from "@chakra-ui/react"
import { ReactNode } from "react"
import { UploadRequest } from "../../interfaces"
import useAdminStore from "../../zustand/stores/admin-store"
import EmptySpace from "../empty-space"

interface Props {
    uploadRequest: UploadRequest
    trigger: ReactNode
}

const ApproveUploadRequestModal = ({ uploadRequest, trigger }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const answerUploadRequest = useAdminStore((state) => state.uploadRequests.answer)

    const handleApproveClick = async () => {
        await answerUploadRequest(uploadRequest.document.id, true)
        onClose()
    }

    return <>
        <Box onClick={onOpen}>
            {trigger}
        </Box>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />

            <ModalContent rounded='xl' m='4'>
                <VStack spacing={12} p={6} pt={12} align='stretch'>
                    <EmptySpace
                        src='terms.svg'
                        title='Aceptar solicitud de carga'
                        description='¿Estás seguro que quieres aceptar esta solicitud? Una vez aceptada, el documento será visible por todos los usuarios.' />

                    <HStack justify='end' spacing={3}>
                        <Button variant='ghost' colorScheme='gray' onClick={onClose}>Cancelar</Button>
                        <Button onClick={handleApproveClick}>Aceptar</Button>
                    </HStack>
                </VStack>
            </ModalContent>
        </Modal>
    </>
}

export default ApproveUploadRequestModal