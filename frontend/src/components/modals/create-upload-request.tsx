import { Box, Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, Modal, ModalContent, ModalOverlay, Textarea, useDisclosure, VStack } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReactNode, useState } from "react"
import { useForm, UseFormReturn } from "react-hook-form"
import { createUploadRequestSchema, uploadRequestFileSchema } from "../../schemas/upload-requests.schema"
import setFormError from "../../utils/form-error"
import useMainStore from "../../zustand/stores/main-store"
import EmptySpace from "../empty-space"
import FileDropzone from "../file-dropzone"

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
                <Input type='text' placeholder='Título del documento' {...register('title')} />

                <FormErrorMessage>
                    {errors.title?.message}
                </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.description !== undefined}>
                <FormLabel>Descripción</FormLabel>
                <Textarea resize='none' placeholder='Descripción del documento' {...register('description')} />

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

type UploadFileFormValues = {
    document?: File
}

interface UploadFileFormProps extends StepFormProps {
    previousForm: UseFormReturn<FormValues, any>
    onPrevious: () => void
}

const UploadFileForm = ({ previousForm, onPrevious, onClose }: UploadFileFormProps) => {
    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        setValue,
        trigger
    } = useForm<UploadFileFormValues>({ resolver: zodResolver(uploadRequestFileSchema) })

    const createUploadRequest = useMainStore((state) => state.uploadRequests.create)
    const onSubmit = handleSubmit(async (data) => {
        const document = data.document
        if (!document) return

        const { title, description } = previousForm.getValues()
        const response = await createUploadRequest(title, description, document)

        if (!response.errorType) return onClose()
        if (response.errorType === 'form') {
            const previousFormKeys = Object.keys(previousForm.getValues())
            if (response.error.some(e => previousFormKeys.includes(e.path))) {
                setFormError(response.error, previousForm.setError)
                return onPrevious()
            }
            return setFormError(response.error, setError)
        }
        return onClose()
    })

    return <VStack spacing={8} p={6} pt={12} align='stretch'>
        <EmptySpace
            src='add_files.svg'
            title='Carga el documento'
            description='Asegúrate que el documento que cargues cumpla con las normas de contribución del sistema.' />

        <FormControl isInvalid={errors.document !== undefined}>
            <FileDropzone
                isValid={errors.document === undefined}
                accept={{
                    'application/pdf': ['.pdf']
                }}
                onChange={(file) => {
                    setValue('document', file)
                    trigger()
                }} />

            <FormErrorMessage>
                {errors.document?.message}
            </FormErrorMessage>
        </FormControl>

        <HStack justify='end' spacing={3}>
            <Button variant='ghost' colorScheme='gray' onClick={onPrevious}>Volver</Button>
            <Button isLoading={isSubmitting} onClick={onSubmit}>Solicitar carga</Button>
        </HStack>
    </VStack>
}

export default CreateUploadRequestModal