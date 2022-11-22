import { Box, Button, HStack, Modal, ModalContent, ModalOverlay, useDisclosure, useToast, VStack } from "@chakra-ui/react"
import { ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { DocumentData } from "../../interfaces"
import useMainStore from "../../zustand/stores/main-store"
import EmptySpace from "../empty-space"
import TextButton from "../text-button"

interface Props {
    document: DocumentData
    trigger: ReactNode
}

const DeleteDocumentModal = ({ document, trigger }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const navigate = useNavigate()
    const toast = useToast()

    const deleteDocument = useMainStore((state) => state.documents.delete)
    const handleDeleteClick = async () => {
        const response = await deleteDocument(document.id)
        onClose()

        if (response.errorType === undefined) {
            navigate('/home')
            toast({
                description: "Documento eliminado correctamente!",
                status: 'success',
                duration: 3000,
                position: 'bottom-left',
                variant: 'subtle'
            })
        }
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
                        src='/notify.svg'
                        title='Eliminar documento'
                        description='¿Estás seguro que quieres eliminar este documento? Después no podrás deshacer esta acción.' />

                    <HStack justify='end' spacing={3}>
                        <TextButton variant='ghost' colorScheme='gray' onClick={onClose}>Cancelar</TextButton>
                        <TextButton onClick={handleDeleteClick}>Eliminar</TextButton>
                    </HStack>
                </VStack>
            </ModalContent>
        </Modal>
    </>
}

export default DeleteDocumentModal