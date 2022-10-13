import { Box, Image, HStack, Flex, VStack, Text, Show } from "@chakra-ui/react"
import { HiOutlineDownload, HiOutlineTag } from "react-icons/hi"
import { DocumentData } from "../interfaces"
import uploadsService from "../services/uploads-service"
import pluralize from "../utils/pluralize"
import DocumentCard from "./document-card"

interface Props {
    document: DocumentData
}

const FeaturedDocument = ({ document }: Props) => {
    const { title, description, fileName, downloads, categories, createdBy } = document
    const { name, lastname } = createdBy

    return <Box h={{ base: '400px', lg: '300px' }} rounded='xl' bg='gray.600' overflow='hidden' position='relative'>
        <Image
            src={uploadsService.getPreview(fileName ?? '')}
            w='full'
            h='300px'
            objectFit='cover'
            objectPosition='bottom'
            filter='blur(300px)'
            pointerEvents='none'

            position='absolute'
            top='0' left='0' bottom='0' right='0' />

        <HStack position='absolute' top='0' left='0' bottom='0' right='0' justify='center' p='8'>
            <Flex
                direction={{ base: 'column', lg: 'row' }}
                align='center'
                gap='8'
                textAlign={{ base: 'center', lg: 'start' }}
                wordBreak='break-word'>

                <DocumentCard fileName={fileName} border='none' shadow='xl' />

                <VStack
                    flex='1'
                    align={{ base: 'center', lg: 'start' }}
                    justify='space-between'
                    py='2'
                    spacing='8'
                    color='whiteAlpha.900'
                    fontWeight='light'>

                    <VStack align={{ base: 'center', lg: 'start' }} maxW='xl'>
                        <Text noOfLines={1} fontWeight='semibold'>{title}</Text>
                        <Text noOfLines={3} >{description}</Text>
                    </VStack>

                    <Show above='lg'>
                        <VStack align='start' spacing='1'>
                            <Text noOfLines={1} >{`Publicado por: ${name} ${lastname}`}</Text>
                        
                            <Flex columnGap='4' rowGap='1'>
                                <HStack flexShrink={0}>
                                    <HiOutlineDownload />
                                    <Text noOfLines={1}>
                                        {pluralize(downloads, 'descarga')}
                                    </Text>
                                </HStack>
                        
                                {
                                    categories.length > 0 && <HStack flexShrink={0}>
                                        <HiOutlineTag />
                                        <Text noOfLines={1}>
                                            {categories.map(c => c.name).join(', ')}
                                        </Text>
                                    </HStack>
                                }
                            </Flex>
                        </VStack>
                    </Show>
                </VStack>
            </Flex>
        </HStack>
    </Box>
}

export default FeaturedDocument