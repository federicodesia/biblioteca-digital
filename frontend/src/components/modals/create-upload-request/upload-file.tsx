import { Button, FormControl, FormErrorMessage, HStack, VStack } from "@chakra-ui/react"
import { UseFormReturn } from "react-hook-form"
import { CreateUploadRequestFormValues } from "."
import EmptySpace from "../../empty-space"
import FileDropzone from "../../file-dropzone"

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
            <Button variant='ghost' colorScheme='gray' onClick={onPrevious}>Volver</Button>
            <Button isLoading={isSubmitting} onClick={handleSubmit(onSubmit)}>Solicitar carga</Button>
        </HStack>
    </VStack>
}

export default UploadFileForm