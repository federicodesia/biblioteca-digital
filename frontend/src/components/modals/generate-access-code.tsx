import { Box, Button, FormControl, FormErrorMessage, FormLabel, HStack, Modal, ModalContent, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, useDisclosure, VStack } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReactNode, useState } from "react"
import { useForm } from "react-hook-form"
import { RoleType } from "../../interfaces"
import { generateAccessCodeSchema } from "../../schemas/access-codes.schema"
import setFormError from "../../utils/form-error"
import pluralize from "../../utils/pluralize"
import useAdminStore from "../../zustand/stores/admin-store"
import useAuthStore from "../../zustand/stores/auth-store"
import EmptySpace from "../empty-space"
import TextButton from "../text-button"

interface Props {
    trigger: ReactNode
}

const GenerateAccessCodeModal = (props: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return <>
        <Box onClick={onOpen}>
            {props.trigger}
        </Box>

        <Modal isOpen={isOpen} onClose={onClose} size='lg' isCentered>
            <ModalOverlay />
            <ModalContent rounded='xl' m='4'>
                <Form onClose={onClose} />
            </ModalContent>
        </Modal>
    </>
}

type FormValues = {
    role: RoleType
    expiresIn: string
}

interface FromProps {
    onClose: () => void
}

const Form = ({ onClose }: FromProps) => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        setError
    } = useForm<FormValues>({ resolver: zodResolver(generateAccessCodeSchema) })

    const [expiresIn, setExpiresIn] = useState(3)

    const user = useAuthStore((state) => state.user)
    const createAccessCode = useAdminStore((state) => state.accessCodes.create)

    const onSubmit = handleSubmit(async (data) => {
        const response = await createAccessCode(data.role, expiresIn)
        if (response.errorType === 'form') return setFormError(response.error, setError)
        return onClose()
    })

    return <VStack spacing={10} p={6} pt={10} align='stretch'>
        <EmptySpace
            src='online_friends.svg'
            title='Generar código de acceso'
            description='Genera un código de acceso para que nuevas personas puedan registrarse en el sistema.' />

        <VStack spacing='6'>
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

            <FormControl>
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
            </FormControl>
        </VStack>

        <HStack justify='end' spacing={3}>
            <TextButton variant='ghost' colorScheme='gray' onClick={onClose}>Cancelar</TextButton>
            <TextButton isLoading={isSubmitting} onClick={onSubmit}>Generar</TextButton>
        </HStack>
    </VStack>
}

const SelectRoleOption = ({ role }: { role: RoleType }) => {
    return <option value={role}>{role}</option>
}

export default GenerateAccessCodeModal