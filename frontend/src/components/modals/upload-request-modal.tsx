import { Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useDisclosure, VStack } from "@chakra-ui/react"
import { ReactNode } from "react"

interface Props {
    trigger: ReactNode
}

const UploadRequestModal = ({ trigger }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return <>
        <Box onClick={onOpen}>
            {trigger}
        </Box>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Solicitar carga de documento</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <VStack align='stretch' spacing={6}>
                        <FormControl isRequired>
                            <FormLabel>Autor</FormLabel>
                            <Input type='text' />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Titulo</FormLabel>
                            <Input type='text' />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Descripción</FormLabel>
                            <Input type='text' />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Categoría</FormLabel>
                            <Select placeholder='Selecciona una opción...'>
                                <option value='option1'>Matematicas</option>
                                <option value='option2'>Naturales</option>
                                <option value='option3'>Historia</option>
                            </Select>
                        </FormControl>
                    </VStack>
                </ModalBody>

                <ModalFooter mt={8}>
                    <Button variant='ghost' mr={3} onClick={onClose}>Cancelar</Button>
                    <Button onClick={onClose}>Solicitar carga</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
}

export default UploadRequestModal