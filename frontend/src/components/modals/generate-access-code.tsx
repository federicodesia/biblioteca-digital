import { Box, Button, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, useDisclosure, VStack } from "@chakra-ui/react"
import { ReactNode, useState } from "react"
import pluralize from "../../utils/pluralize"

interface Props {
    trigger: ReactNode
}

const GenerateAccessCodeModal = ({ trigger }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [expiresIn, setExpiresIn] = useState('3')
    const formatExpiresIn = (value: string) => pluralize(parseInt(value), 'día')
    const parseExpiresIn = (value: string) => value.split(' ')[0]

    return <>
        <Box onClick={onOpen}>
            {trigger}
        </Box>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Generar código de acceso</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                    <VStack align='stretch' spacing={6}>
                        <VStack align='flex-start'>
                            <FormLabel>Tipo de usuario</FormLabel>
                            <Select placeholder='Selecciona una opción...'>
                                <option value='option1'>Administrador</option>
                                <option value='option2'>Profesor</option>
                                <option value='option3'>Alumno</option>
                            </Select>
                        </VStack>

                        <VStack align='flex-start'>
                            <FormLabel>Expiración</FormLabel>
                            <NumberInput
                                onChange={(value) => setExpiresIn(parseExpiresIn(value))}
                                value={formatExpiresIn(expiresIn)}
                                min={1}
                                max={7}>

                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </VStack>
                    </VStack>

                </ModalBody>

                <ModalFooter>
                    <Button variant='ghost' mr={3} onClick={onClose}>Cancelar</Button>
                    <Button onClick={onClose}>Generar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>

}

export default GenerateAccessCodeModal