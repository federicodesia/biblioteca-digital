import { Badge, Box, Button, Flex, Heading, Hide, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Show, Text, useClipboard, useToast, VStack } from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import { HiOutlineDotsVertical, HiOutlineDownload, HiOutlineShare, HiOutlineTrash } from "react-icons/hi"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { SizeMe } from "react-sizeme"
import DocumentCard from "../components/document-card"
import DocumentOpinion from "../components/document-opinion"
import DeleteDocumentModal from "../components/modals/delete-document"
import PDFDocumentPreview from "../components/pdf-document-preview"
import { DocumentData } from "../interfaces"
import uploadsService from "../services/uploads-service"
import { formatDate } from "../utils/date"
import useAuthStore from "../zustand/stores/auth-store"
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

    const likesCount = useMemo(() => {
        return document?.Opinion.filter(opinion => opinion.like === true).length
    }, [document])

    const location = useLocation()
    const currentUrl = `http://127.0.0.1:5173${location.pathname}`
    const { onCopy } = useClipboard(currentUrl)

    const toast = useToast()
    const handleCopyToClipboard = () => {
        if (!document) return
        onCopy()

        if (toast.isActive(currentUrl)) return
        toast({
            id: currentUrl,
            description: "Enlace copiado al portapapeles!",
            status: 'success',
            duration: 3000,
            position: 'bottom-left',
            variant: 'subtle'
        })
    }

    if (!document) return <div />
    const { title, description, publishedAt, DocumentCategory, createdBy, downloads, fileName } = document
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
                        {
                            fileName && <a href={uploadsService.getDownloadDocument(fileName)} download>
                                <Button
                                    h='44px'
                                    w='full'
                                    variant='outline'
                                    leftIcon={<HiOutlineDownload />}>
                                    Descargar
                                </Button>
                            </a>
                        }

                        <Button
                            h='44px'
                            variant='ghost'
                            colorScheme='gray'
                            color='gray.700'
                            leftIcon={<HiOutlineShare />}
                            onClick={handleCopyToClipboard}>
                            Compartir título
                        </Button>
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
                    <HStack spacing='8' justify='space-between' align='start'>
                        <Heading
                            size='md'
                            fontWeight='600'
                            textAlign={{ base: 'center', lg: 'left' }}
                            maxW={{ base: '450px', lg: 'none' }}
                            m={{ base: 'auto', lg: '0' }}
                            w='full'
                            textOverflow='ellipsis'
                            overflow='hidden'>
                            {title}
                        </Heading>

                        <Show above='lg'>
                            <OptionsMenu document={document} />
                        </Show>
                    </HStack>

                    <HStack
                        spacing='2'
                        justify={{ base: 'center', lg: 'start' }}>
                        {
                            DocumentCategory.map(c => {
                                return <Badge
                                    key={`CategoryBadge ${c.category.id}`}
                                    px='4' py='2' rounded='2xl' textTransform='none' >
                                    {c.category.name}
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
                        {
                            fileName && <a href={uploadsService.getDownloadDocument(fileName)} download>
                                <Button
                                    flex='1'
                                    h='44px'
                                    px='8'
                                    maxW='200px'
                                    variant='outline'
                                    leftIcon={<HiOutlineDownload />}>
                                    Descargar
                                </Button>
                            </a>
                        }

                        <IconButton
                            h='44px'
                            w='44px'
                            variant='outline'
                            colorScheme='gray'
                            color='gray.700'
                            icon={<HiOutlineShare />}
                            aria-label='Compartir título'
                            onClick={handleCopyToClipboard} />

                        <Show below='lg'>
                            <OptionsMenu document={document} />
                        </Show>
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
                        <Text fontWeight='semibold'>{likesCount ?? '-'}</Text>
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

                    <DocumentOpinion
                        document={document}
                        onUpdated={(updated) => setDocument(updated)} />
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

            <DocumentOpinion
                document={document}
                onUpdated={(updated) => setDocument(updated)} />
        </Show>
    </Flex>
}

const OptionsMenu = ({ document }: { document: DocumentData }) => {
    const user = useAuthStore((state) => state.user)
    const show = useMemo(() => {
        return document.createdBy.id === user?.id || user?.role.name === 'Administrador'
    }, [document, user])

    return show ? <Menu placement='bottom-end' >
        <MenuButton>
            <IconButton
                h='44px'
                w='44px'
                variant={{ base: 'outline', lg: 'solid' }}
                colorScheme='gray'
                color='gray.700'
                icon={<HiOutlineDotsVertical />}
                aria-label='Opciones' />
        </MenuButton>
        <MenuList>
            <DeleteDocumentModal
                document={document}
                trigger={
                    <MenuItem gap={4}>
                        <HiOutlineTrash />
                        Eliminar documento
                    </MenuItem>
                } />
        </MenuList>
    </Menu> : null
}

export default DocumentPage