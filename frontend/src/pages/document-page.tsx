import { Button, Flex, Heading, Hide, HStack, IconButton, Show, Text, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { HiOutlineDownload, HiOutlineShare, HiOutlineTag } from "react-icons/hi"
import { useNavigate, useParams } from "react-router-dom"
import DocumentCard from "../components/document-card"
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

    if (!document) return <div />
    const { title, description, publishedAt, categories, createdBy, downloads, fileName } = document
    const { name, lastname } = createdBy

    return <Flex direction='row'>

        <Flex
            direction={{ base: 'column', lg: 'row' }}
            gap={{ base: '6', lg: '16' }}
            align={{ base: 'center', lg: 'start' }} >

            <VStack flexShrink={0} align='stretch' spacing='6'>
                <DocumentCard
                    fileName={fileName}
                    h={{ base: '200px', lg: '300px' }}
                    w={{ base: '150px', lg: '225px' }} />

                <Show above='lg'>
                    <VStack align='stretch' spacing='3'>
                        <Button h='44px' variant='outline' leftIcon={<HiOutlineDownload />}>Descargar</Button>
                        <Button h='44px' variant='outline' colorScheme='gray' color='gray.700' leftIcon={<HiOutlineShare />}>Compartir título</Button>
                    </VStack>
                </Show>
            </VStack>

            <VStack
                align={{ base: 'stretch', lg: 'start' }}
                spacing='8'
                py='2'>

                <VStack align='stretch' spacing='6'>
                    <Heading
                        size='md'
                        fontWeight='600'
                        textAlign={{ base: 'center', lg: 'left' }}
                        maxW={{ base: '450px', lg: 'none' }}
                        m='auto'>
                        {title}
                    </Heading>

                    <Hide above='lg'>
                        <HStack justify='center' spacing='3'>
                            <Button flex='1' h='44px' maxW='200px' variant='outline' leftIcon={<HiOutlineDownload />}>Descargar</Button>
                            <IconButton h='44px' w='44px' variant='outline' colorScheme='gray' color='gray.700' icon={<HiOutlineShare />} aria-label='Compartir título' />
                        </HStack>
                    </Hide>
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

                    <VStack align='start' spacing='1' pt='4'>
                        <HStack>
                            <HiOutlineDownload />
                            <Text noOfLines={1}>
                                {`Cantidad de descargas: ${downloads}`}
                            </Text>
                        </HStack>

                        <HStack>
                            <HiOutlineTag />
                            <Text noOfLines={1}>
                                {`Categorías: ${categories.map(c => c.name).join(', ')}`}
                            </Text>
                        </HStack>
                    </VStack>
                </VStack>
            </VStack>
        </Flex>
    </Flex>
}

export default DocumentPage