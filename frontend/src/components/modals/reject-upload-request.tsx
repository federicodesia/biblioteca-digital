import { Box, Button, FormControl, FormErrorMessage, HStack, Modal, ModalContent, ModalOverlay, Textarea, useDisclosure, VStack } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReactNode } from "react"
import { useForm } from "react-hook-form"
import { UploadRequest } from "../../interfaces"
import { rejectUploadRequestSchema } from "../../schemas/upload-requests.schema"
import setFormError from "../../utils/form-error"
import useAdminStore from "../../zustand/stores/admin-store"
import EmptySpace from "../empty-space"

interface Props {
    uploadRequest: UploadRequest
    trigger: ReactNode
}

type FormValues = {
    review: string
}

const RejectUploadRequestModal = (props: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<FormValues>({ resolver: zodResolver(rejectUploadRequestSchema) })

    const answerUploadRequest = useAdminStore((state) => state.uploadRequests.answer)
    const onSubmit = handleSubmit(async (data) => {
        const response = await answerUploadRequest(props.uploadRequest.document.id, false, data.review)
        if (response.errorType === 'form') return setFormError(response.error, setError)
        return onClose()
    })

    return <>
        <Box onClick={onOpen}>
            {props.trigger}
        </Box>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />

            <ModalContent rounded='xl' m='4'>
                <VStack spacing={8} p={6} pt={10} align='stretch'>
                    <EmptySpace
                        src='pending_approval.svg'
                        title='Rechazar solicitud de carga'
                        description='¿Estás seguro que quieres rechazar esta solicitud? Una vez rechazada, el documento será eliminado.' />

                    <FormControl isInvalid={errors.review !== undefined}>
                        <Textarea resize='none' placeholder='Ingresa el motivo por el cual se rechaza' {...register('review')} />

                        <FormErrorMessage>
                            {errors.review?.message}
                        </FormErrorMessage>
                    </FormControl>

                    <HStack justify='end' spacing={3}>
                        <Button variant='ghost' colorScheme='gray' onClick={onClose}>Cancelar</Button>
                        <Button isLoading={isSubmitting} onClick={onSubmit}>Rechazar</Button>
                    </HStack>
                </VStack>
            </ModalContent>
        </Modal>
    </>
}

export default RejectUploadRequestModal