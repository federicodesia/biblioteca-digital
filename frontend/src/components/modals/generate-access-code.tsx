import { Box, Button, FormControl, FormErrorMessage, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, useDisclosure, VStack } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReactNode, useState } from "react"
import { useForm } from "react-hook-form"
import { RoleType } from "../../interfaces"
import { generateAccessCodeSchema } from "../../schemas/access-codes.schema"
import pluralize from "../../utils/pluralize"
import useAdminStore from "../../zustand/stores/admin-store"
import useAuthStore from "../../zustand/stores/auth-store"

type FormValues = {
    role: RoleType
    expiresIn: string
}

interface Props {
    trigger: ReactNode
}

const GenerateAccessCodeModal = ({ trigger }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return <>
        <Box onClick={onOpen}>
            {trigger}
        </Box>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <Form onClose={onClose} />
        </Modal>
    </>
}

const Form = ({ onClose }: {
    onClose: () => void
}) => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm<FormValues>({ resolver: zodResolver(generateAccessCodeSchema) })

    const [expiresIn, setExpiresIn] = useState(3)

    const user = useAuthStore((state) => state.user)
    const createAccessCode = useAdminStore((state) => state.createAccessCode)

    const onSubmit = handleSubmit(async (data) => {
        const response = await createAccessCode(data.role, expiresIn)
        onClose()
    })

    return <ModalContent>
        <ModalHeader>Generar código de acceso</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
            <VStack align='stretch' spacing={6}>
                <VStack align='flex-start'>

                    <FormControl isInvalid={errors.role !== undefined}>
                        <FormLabel>Tipo de usuario</FormLabel>
                        <Select placeholder='Selecciona una opción...' {...register('role')}>
                            {
                                user?.role.name === 'Administrador' && <>
                                    <SelectRoleOption role='Administrador' />
                                    <SelectRoleOption role='Profesor' />
                                </>
                            }
                            <SelectRoleOption role='Alumno' />
                        </Select>
                        <FormErrorMessage>
                            {errors.role?.message}
                        </FormErrorMessage>
                    </FormControl>
                </VStack>

                <VStack align='flex-start'>
                    <FormLabel>Expiración</FormLabel>
                    <NumberInput
                        onChange={(_, valueAsNumber) => setExpiresIn(valueAsNumber)}
                        value={pluralize(expiresIn, 'día')}
                        min={1}
                        max={7}>

                        <NumberInputField {...register('expiresIn')} />
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
            <Button isLoading={isSubmitting} onClick={onSubmit} type='submit'>Generar</Button>
        </ModalFooter>
    </ModalContent>
}

const SelectRoleOption = ({ role }: { role: RoleType }) => {
    return <option value={role}>{role}</option>
}

export default GenerateAccessCodeModal