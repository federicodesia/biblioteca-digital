import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, Textarea, VStack } from "@chakra-ui/react"
import { UseFormReturn } from "react-hook-form"
import { CreateUploadRequestFormValues } from "."
import EmptySpace from "../../empty-space"

interface Props {
    form: UseFormReturn<CreateUploadRequestFormValues, any>
    onClose: () => void
    onSubmit: () => void
}

const BasicInformationForm = ({ form, onSubmit, onClose }: Props) => {
    const { register, formState: { errors } } = form

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
            <Button onClick={onSubmit}>Continuar</Button>
        </HStack>
    </VStack>
}

export default BasicInformationForm