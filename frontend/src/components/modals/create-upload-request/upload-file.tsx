import { Button, FormControl, FormErrorMessage, HStack, VStack } from "@chakra-ui/react"
import { UseFormReturn } from "react-hook-form"
import { CreateUploadRequestFormValues } from "."
import EmptySpace from "../../empty-space"
import FileDropzone from "../../file-dropzone"
import TextButton from "../../text-button"

interface Props {
    form: UseFormReturn<CreateUploadRequestFormValues, any>
    onPrevious: () => void
    onSubmit: () => void
}

const UploadFileForm = ({ form, onPrevious, onSubmit }: Props) => {
    const { handleSubmit, formState: { errors, isSubmitting }, setValue, trigger } = form

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
            <TextButton variant='ghost' colorScheme='gray' onClick={onPrevious}>Volver</TextButton>
            <TextButton isLoading={isSubmitting} onClick={handleSubmit(onSubmit)}>Solicitar carga</TextButton>
        </HStack>
    </VStack>
}

export default UploadFileForm