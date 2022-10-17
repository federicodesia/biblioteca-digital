import { Badge, Box, Button, Flex, Heading, Hide, HStack, IconButton, Show, Text, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { HiOutlineDownload, HiOutlineShare } from "react-icons/hi"
import { useNavigate, useParams } from "react-router-dom"
import { SizeMe } from "react-sizeme"
import DocumentCard from "../components/document-card"
import PDFDocumentPreview from "../components/pdf-document-preview"
import { DocumentData } from "../interfaces"
import { formatDate } from "../utils/date"
import useMainStore from "../zustand/stores/main-store"

const DocumentPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [document, setDocument] = useState<DocumentData | undefined>(undefined)
    const getDocument = async () => {
        if (!id) return
        const parsedId = parseInt(id)
        const response = await useMainStore.getState().documents.get(parsedId)
        if (response.errorType) return navigate('/home')
        return setDocument(response.data)
    }

    useEffect(() => {
        getDocument()
    }, [])

    const [documentPages, setDocumentPages] = useState<number | undefined>(undefined)
    const onLoadDocument = (pdf: { numPages: number }) => {
        setDocumentPages(pdf.numPages)
    }

    if (!document) return <div />
    const { title, description, publishedAt, categories, createdBy, downloads, fileName } = document
    const { name, lastname } = createdBy

    return <Flex direction='column' gap='16'>

        <Flex
            direction={{ base: 'column', lg: 'row' }}
            gap={{ base: '6', lg: '16' }}
            align={{ base: 'center', lg: 'start' }}>

            <VStack flexShrink={0} align='stretch' spacing='6'>
                <DocumentCard
                    fileName={fileName}
                    h={{ base: '200px', lg: '300px' }}
                    w={{ base: '150px', lg: '225px' }} />

                <Show above='lg'>
                    <VStack align='stretch' spacing='3'>
                        <Button h='44px' variant='outline' leftIcon={<HiOutlineDownload />}>Descargar</Button>
                        <Button h='44px' variant='ghost' colorScheme='gray' color='gray.700' leftIcon={<HiOutlineShare />}>Compartir título</Button>
                    </VStack>
                </Show>
            </VStack>

            <VStack
                w='full'
                maxW='2xl'
                align='stretch'
                spacing='8'
                py='2'
                overflow='hidden'>

                <VStack align='stretch' spacing='6'>
                    <Heading
                        size='md'
                        fontWeight='600'
                        textAlign={{ base: 'center', lg: 'left' }}
                        maxW={{ base: '450px', lg: 'none' }}
                        m={{ base: 'auto', lg: '0' }}>
                        {title}
                    </Heading>

                    <HStack
                        spacing='2'
                        justify={{ base: 'center', lg: 'start' }}>
                        {
                            categories.map(c => {
                                return <Badge px='4' py='2' rounded='2xl' textTransform='none' >
                                    {c.name}
                                </Badge>
                            })
                        }
                    </HStack>
                </VStack>

                <VStack align='start' spacing='4' maxW='2xl'>
                    <Text fontWeight='semibold'>Descripción</Text>
                    <Text>{description} </Text>
                </VStack>

                <VStack align='start' spacing='4' maxW='2xl'>
                    <Text fontWeight='semibold'>Detalles</Text>
                    <VStack align='start' spacing='1'>
                        <Text>{`Publicado por: ${name} ${lastname}`} </Text>
                        <Text>{`Fecha de publicación: ${publishedAt ? formatDate(publishedAt) : '-'}`} </Text>
                    </VStack>
                </VStack>

                <Hide above='lg'>
                    <HStack justify='start' spacing='3'>
                        <Button flex='1' h='44px' maxW='200px' variant='outline' leftIcon={<HiOutlineDownload />}>Descargar</Button>
                        <IconButton h='44px' w='44px' variant='outline' colorScheme='gray' color='gray.700' icon={<HiOutlineShare />} aria-label='Compartir título' />
                    </HStack>
                </Hide>

                <HStack bg='#F0F5FF' rounded='xl' py='4' px='6' align='stretch' justify='space-evenly'>
                    <VStack spacing='0'>
                        <Text fontWeight='semibold'>{documentPages ?? '-'}</Text>
                        <Text fontSize='sm'>Páginas</Text>
                    </VStack>

                    <Box w='1px' bg='blackAlpha.200' />

                    <VStack spacing='0'>
                        <Text fontWeight='semibold'>{downloads}</Text>
                        <Text fontSize='sm'>Descargas</Text>
                    </VStack>

                    <Box w='1px' bg='blackAlpha.200' />

                    <VStack spacing='0'>
                        <Text fontWeight='semibold'>8</Text>
                        <Text fontSize='sm'>Me gusta</Text>
                    </VStack>
                </HStack>

                <Show breakpoint='(min-width: 1100px)'>
                    <SizeMe>
                        {
                            ({ size }) => (
                                <PDFDocumentPreview
                                    fileName={fileName}
                                    pages={documentPages ?? 0}
                                    maxPages={4}
                                    width={size.width ?? 1}
                                    onLoadSuccess={onLoadDocument} />
                            )
                        }
                    </SizeMe>
                </Show>
            </VStack>
        </Flex>

        <Show breakpoint='(max-width: 1100px)'>
            <SizeMe>
                {
                    ({ size }) => (
                        <PDFDocumentPreview
                            fileName={fileName}
                            pages={documentPages ?? 0}
                            maxPages={4}
                            width={size.width ?? 1}
                            onLoadSuccess={onLoadDocument} />
                    )
                }
            </SizeMe>
        </Show>
    </Flex>
}

export default DocumentPage