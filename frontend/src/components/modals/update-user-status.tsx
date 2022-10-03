import { Box, Button, HStack, Modal, ModalContent, ModalOverlay, useDisclosure, VStack } from "@chakra-ui/react"
import { ReactNode } from "react"
import { User } from "../../interfaces"
import useAdminStore from "../../zustand/stores/admin-store"
import EmptySpace from "../empty-space"

interface Props {
    user: User
    active: boolean
    trigger: ReactNode
}

const UpdateUserStatusModal = ({ user, active, trigger }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const updateUserStatus = useAdminStore((state) => state.users.updateStatus)

    const handleClick = async () => {
        await updateUserStatus(user.id, active)
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
                        src='safe.svg'
                        title={
                            active
                                ? 'Habilitar cuenta de usuario'
                                : 'Inhabilitar cuenta de usuario'
                        }
                        description={
                            active
                                ? '¿Estás seguro que quieres habilitar esta cuenta? Si continúas, el usuario volverá a tener acceso al sistema.'
                                : '¿Estás seguro que quieres inhabilitar esta cuenta? Si continúas, el usuario no tendrá acceso al sistema.'
                        } />

                    <HStack justify='end' spacing={3}>
                        <Button variant='ghost' colorScheme='gray' onClick={onClose}>Cancelar</Button>
                        <Button onClick={handleClick}>{active ? 'Habilitar' : 'Inhabilitar'}</Button>
                    </HStack>
                </VStack>
            </ModalContent>
        </Modal>
    </>
}

export default UpdateUserStatusModal