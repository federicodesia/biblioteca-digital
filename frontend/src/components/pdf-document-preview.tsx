import { Box, Button, VStack } from '@chakra-ui/react';
import { Document, Page } from 'react-pdf';
import uploadsService from '../services/uploads-service';

import { pdfjs } from 'react-pdf';
import EmptySpace from './empty-space';
import clamp from '../utils/clamp';
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

interface Props {
    fileName?: string
    pages: number
    maxPages: number
    width: number
    onLoadSuccess: (pdf: { numPages: number }) => void
}

const PDFDocumentPreview = ({ fileName, pages, maxPages, width, onLoadSuccess }: Props) => {
    const showingPages = clamp(pages, 0, maxPages)

    return <Document
        file={fileName ? uploadsService.getDocument(fileName) : undefined}
        loading='Cargando documento...'
        onLoadSuccess={onLoadSuccess}>

        <VStack spacing='4'>
            {
                [...Array(showingPages)].map((_, index) => {
                    const isBlurPage = showingPages < pages
                        ? index + 1 === showingPages
                        : false

                    return <Box
                        key={`${fileName} ${index}`}
                        rounded='lg'
                        overflow='hidden'
                        border='1px' borderColor='gray.200'
                        position='relative'
                        w={width}>

                        <Box
                            filter={isBlurPage ? 'blur(4px) grayscale(100%)' : undefined}
                            userSelect='none'>
                            <Page pageNumber={index + 1} width={width} />
                        </Box>

                        {
                            isBlurPage && <VStack
                                position='absolute'
                                top='0' left='0' right='0' bottom='0'
                                justify='center'>

                                <VStack rounded='xl' bg='white' p='8' shadow='xl' spacing='8' >
                                    <EmptySpace
                                        src='/reading_book.svg'
                                        title='Está leyendo una previsualización'
                                        description='Llegaste al final de la vista previa. Abre el documento completo para continuar.' />

                                    {
                                        fileName && <a href={uploadsService.getDocument(fileName)} target='_blank' >
                                            <Button mb='8'>
                                                Ver documento completo
                                            </Button>
                                        </a>
                                    }
                                </VStack>
                            </VStack>
                        }
                    </Box>
                })
            }
        </VStack>
    </Document>
}

export default PDFDocumentPreview