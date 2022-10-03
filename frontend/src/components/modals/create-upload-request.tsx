import { Box, Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, Modal, ModalContent, ModalOverlay, Textarea, useDisclosure, VStack } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReactNode, useState } from "react"
import { useForm, UseFormReturn } from "react-hook-form"
import { createUploadRequestSchema } from "../../schemas/upload-requests.schema"
import setFormError from "../../utils/form-error"
import useMainStore from "../../zustand/stores/main-store"
import EmptySpace from "../empty-space"

interface Props {
    trigger: ReactNode
}

const CreateUploadRequestModal = ({ trigger }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return <>
        <Box onClick={onOpen}>
            {trigger}
        </Box>

        <Modal isOpen={isOpen} onClose={onClose} size='lg' isCentered>
            <ModalOverlay />
            <ModalContent rounded='xl' m='4'>
                <StepForm onClose={onClose} />
            </ModalContent>
        </Modal>
    </>
}

type FormValues = {
    title: string
    description: string
}

interface StepFormProps {
    onClose: () => void
}

const StepForm = ({ onClose }: StepFormProps) => {
    const [step, setStep] = useState(0)
    const next = () => setStep(step + 1)
    const previous = () => setStep(step - 1)

    const basicInformationForm = useForm<FormValues>({ resolver: zodResolver(createUploadRequestSchema) })

    return step === 0
        ? <BasicInformationForm
            form={basicInformationForm}
            onSubmit={next}
            onClose={onClose} />

        : <UploadFileForm
            previousForm={basicInformationForm}
            onPrevious={previous}
            onClose={onClose} />
}

interface BasicInformationFormProps extends StepFormProps {
    form: UseFormReturn<FormValues, any>
    onSubmit: () => void
}

const BasicInformationForm = ({ form, onSubmit, onClose }: BasicInformationFormProps) => {
    const { handleSubmit, register, formState: { errors } } = form

    return <VStack spacing={8} p={6} pt={12} align='stretch'>
        <EmptySpace
            src='documents.svg'
            title='Solicitar carga de documento'
            description='Un administrador revisará tu solicitud para que el documento sea visible por todos los usuarios.' />

        <VStack spacing='6'>
            <FormControl isInvalid={errors.title !== undefined}>
                <FormLabel>Titulo</FormLabel>
                <Input type='text' {...register('title')} />

                <FormErrorMessage>
                    {errors.title?.message}
                </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.description !== undefined}>
                <FormLabel>Descripción</FormLabel>
                <Textarea resize='none' {...register('description')} />

                <FormErrorMessage>
                    {errors.description?.message}
                </FormErrorMessage>
            </FormControl>
        </VStack>

        <HStack justify='end' spacing={3}>
            <Button variant='ghost' colorScheme='gray' onClick={onClose}>Cancelar</Button>
            <Button onClick={handleSubmit(onSubmit)}>Continuar</Button>
        </HStack>
    </VStack>
}

interface UploadFileFormProps extends StepFormProps {
    previousForm: UseFormReturn<FormValues, any>
    onPrevious: () => void
}

const UploadFileForm = ({ previousForm, onPrevious, onClose }: UploadFileFormProps) => {

    const createUploadRequest = useMainStore((state) => state.uploadRequests.create)
    const onSubmit = async () => {
        const { title, description } = previousForm.getValues()
        const response = await createUploadRequest(title, description)

        if (!response.errorType) return onClose()

        if (response.errorType === 'form') {
            const previousFormKeys = Object.keys(previousForm.getValues())
            if (response.error.some(e => previousFormKeys.includes(e.path))) {
                setFormError(response.error, previousForm.setError)
                return onPrevious()
            }
        }
    }

    return <VStack spacing={8} p={6} pt={12} align='stretch'>
        <EmptySpace
            src='add_files.svg'
            title='Carga el archivo del documento'
            description='Asegúrate que el documento que cargues cumpla con las normas de contribución del sistema.' />

        <VStack spacing='6'>
            
        </VStack>

        <HStack justify='end' spacing={3}>
            <Button variant='ghost' colorScheme='gray' onClick={onPrevious}>Volver</Button>
            <Button onClick={onSubmit}>Enviar</Button>
        </HStack>
    </VStack>
}

export default CreateUploadRequestModal