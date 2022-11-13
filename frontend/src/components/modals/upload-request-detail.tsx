import { Box, HStack, Modal, ModalContent, ModalOverlay, useDisclosure, VStack, Text, Badge, ThemeTypings, Button, Flex, ModalCloseButton } from "@chakra-ui/react"
import { ReactNode } from "react"
import { HiOutlineTag } from "react-icons/hi"
import { UploadRequest } from "../../interfaces"
import uploadsService from "../../services/uploads-service"
import { formatDate } from "../../utils/date"
import DocumentCard from "../document-card"

type Status = 'Esperando respuesta' | 'Aceptado' | 'Rechazado'
const statusColors: Record<Status, ThemeTypings['colorSchemes']> = {
    'Esperando respuesta': 'gray',
    'Aceptado': 'green',
    'Rechazado': 'red'
}

interface Props {
    uploadRequest: UploadRequest
    trigger: ReactNode
}

const UploadRequestDetailModal = ({ uploadRequest, trigger }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { id, document, requestedAt, status, review, reviewedAt } = uploadRequest
    const { title, description, fileName, DocumentCategory } = document

    return <>
        <Box onClick={onOpen}>
            {trigger}
        </Box>

        <Modal isOpen={isOpen} onClose={onClose} size='lg' isCentered>
            <ModalOverlay />

            <ModalContent rounded='xl' m='4' p='8'>
                <ModalCloseButton top='3' />

                <VStack align='start' spacing='6' pb='2'>
                    <Text fontSize='lg' fontWeight='bold' textAlign='center'>
                        {`Solicitud de carga #${id}`}
                    </Text>

                    <VStack spacing='4' align='stretch' w='full'>
                        <Text fontWeight='semibold'>Documento</Text>

                        <Flex gap='6'>
                            <DocumentCard fileName={fileName} />

                            <VStack flex='1' minH='200px' align='stretch' justify='space-between' spacing='6' wordBreak='break-word'>
                                <VStack align='start'>
                                    <Text fontWeight='semibold'>{title}</Text>
                                    <Text>{description} </Text>
                                </VStack>

                                <VStack align='stretch' spacing='4'>
                                    {
                                        DocumentCategory.length > 0 && <HStack spacing='1' flexShrink={0}>
                                            <HiOutlineTag />
                                            <Text noOfLines={1}>
                                                {DocumentCategory.map(c => c.category.name).join(', ')}
                                            </Text>
                                        </HStack>
                                    }
                                    {
                                        fileName && <a href={uploadsService.getDocument(fileName)} target='_blank' >
                                            <Button w='full' variant='outline'>Ver documento</Button>
                                        </a>
                                    }
                                </VStack>
                            </VStack>
                        </Flex>
                    </VStack>

                    <VStack spacing='4' align='start'>
                        <Text fontWeight='semibold'>Detalles</Text>

                        <VStack align='start'>
                            {
                                reviewedAt
                                    ? <Text>{`Revisado el: ${formatDate(reviewedAt)}`} </Text>
                                    : <Text>{`Solicitado el: ${formatDate(requestedAt)}`} </Text>
                            }

                            <HStack>
                                <Text>Estado:</Text>
                                <Badge colorScheme={statusColors[status.name]}>
                                    {status.name}
                                </Badge>
                            </HStack>

                            {
                                status.name === 'Rechazado' && <Text>
                                    {
                                        `Descripción: ${review !== undefined && review.length > 0
                                            ? review
                                            : 'No se incluyó un motivo'
                                        }`
                                    }
                                </Text>
                            }
                        </VStack>
                    </VStack>
                </VStack>
            </ModalContent>
        </Modal>
    </>
}

export default UploadRequestDetailModal