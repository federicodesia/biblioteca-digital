import { Box, Button, HStack, Modal, ModalContent, ModalOverlay, useDisclosure, VStack } from "@chakra-ui/react"
import { ReactNode } from "react"
import { AccessCode } from "../../interfaces"
import useAdminStore from "../../zustand/stores/admin-store"
import EmptySpace from "../empty-space"
import TextButton from "../text-button"

interface Props {
    accessCode: AccessCode
    trigger: ReactNode
}

const DeleteAccessCodeModal = ({ accessCode, trigger }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const deleteAccessCode = useAdminStore((state) => state.accessCodes.delete)

    const handleDeleteClick = async () => {
        await deleteAccessCode(accessCode.code)
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
                        src='notify.svg'
                        title='Eliminar código de acceso'
                        description='¿Estás seguro que quieres eliminar este código de acceso? Después no podrás deshacer esta acción.' />

                    <HStack justify='end' spacing={3}>
                        <TextButton variant='ghost' colorScheme='gray' onClick={onClose}>Cancelar</TextButton>
                        <TextButton onClick={handleDeleteClick}>Eliminar</TextButton>
                    </HStack>
                </VStack>
            </ModalContent>
        </Modal>
    </>
}

export default DeleteAccessCodeModal