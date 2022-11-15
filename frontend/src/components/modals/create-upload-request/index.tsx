import { Box, Modal, ModalContent, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReactNode, useState } from "react"
import { useForm } from "react-hook-form"
import { createUploadRequestSchema } from "../../../schemas/upload-requests.schema"
import setFormError from "../../../utils/form-error"
import useUserStore from "../../../zustand/stores/user-store"
import BasicInformationForm from "./basic-information"
import SelectCategoriesForm from "./select-categories"
import UploadFileForm from "./upload-file"

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

interface StepFormProps {
    onClose: () => void
}

export interface CreateUploadRequestFormValues {
    title: string
    description: string
    categories: { [key: string]: boolean },
    document?: File
}

const StepForm = ({ onClose }: StepFormProps) => {
    const [step, setStep] = useState(0)
    const next = () => setStep(step + 1)
    const previous = () => setStep(step - 1)

    const form = useForm<CreateUploadRequestFormValues>({
        resolver: zodResolver(createUploadRequestSchema),
        defaultValues: { categories: {} }
    })
    const { handleSubmit, trigger, setError } = form

    const toast = useToast()

    const createUploadRequest = useUserStore((state) => state.uploadRequests.create)
    const onFinish = handleSubmit(async (data) => {
        const { title, description, categories, document } = data
        if (!document) return

        const selectedCategories = Object.entries(categories)
            .filter(([k, v]) => v === true)
            .map(([k, v]) => k)
        
            console.log(selectedCategories)

        const response = await createUploadRequest(title, description, document, selectedCategories)

        if (response.errorType === 'form') {
            setFormError(response.error, setError)
            if (response.error.some(e => ['title', 'description'].includes(e.path))) return setStep(0)
            if (response.error.some(e => ['categories'].includes(e.path))) return setStep(1)
            if (response.error.some(e => ['document'].includes(e.path))) return setStep(2)
        }

        if(response.errorType === 'string') toast({
            description: response.error,
            status: 'error',
            duration: 5000,
            position: 'bottom-left',
            variant: 'subtle'
        })

        return onClose()
    })

    return step === 0
        ? <BasicInformationForm
            form={form}
            onSubmit={async () => {
                if (await trigger(['title', 'description'])) next()
            }}
            onClose={onClose} />

        : step === 1
            ? <SelectCategoriesForm
                form={form}
                onPrevious={previous}
                onSubmit={async () => {
                    if (await trigger('categories')) next()
                }} />

            : <UploadFileForm
                form={form}
                onPrevious={previous}
                onSubmit={onFinish} />
}

export default CreateUploadRequestModal