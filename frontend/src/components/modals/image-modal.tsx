import { Box, Button, HStack, Img, Modal, ModalContent, ModalOverlay, Text, useDisclosure, VStack } from "@chakra-ui/react"
import { ReactNode } from "react"

interface Props {
    src: string
    title: string
    description: string
    content?: ReactNode
    buttonText: string
    onClick?: () => void
    trigger: ReactNode
}

const ImageModal = ({ src, title, description, content, buttonText, trigger, onClick }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleButtonClick = () => {
        if (onClick) onClick()
        onClose()
    }

    return <>
        <Box onClick={onOpen}>
            {trigger}
        </Box>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent rounded='xl'>
                <VStack spacing={12} p={6} pt={12} align='stretch'>
                    <VStack spacing={12}>
                        <Img src={src} h='150px' />
                        <VStack spacing={4}>
                            <Text fontSize='lg' fontWeight='bold'>{title}</Text>
                            <Text textAlign='center'>{description}</Text>

                            {
                                content && <Box w='full' pt={2}>
                                    {content}
                                </Box>
                            }
                        </VStack>
                    </VStack>

                    <HStack justify='end' spacing={3}>
                        <Button variant='ghost' colorScheme='gray' onClick={onClose}>Cancelar</Button>
                        <Button onClick={handleButtonClick}>{buttonText}</Button>
                    </HStack>
                </VStack>
            </ModalContent>
        </Modal>
    </>
}

export default ImageModal