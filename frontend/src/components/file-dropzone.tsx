import { Text, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Accept, useDropzone } from 'react-dropzone'
import { FiCheckCircle, FiUploadCloud } from 'react-icons/fi'

interface Props {
    isValid?: boolean
    accept: Accept,
    onChange: (file: File) => void
}

const FileDropzone = ({ isValid = true, accept, onChange }: Props) => {

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        accept: accept,
        maxFiles: 1,
        multiple: false
    })

    const acceptedFile = acceptedFiles.at(0)
    useEffect(() => {
        if (acceptedFile) onChange(acceptedFile)
    }, [acceptedFile])

    return (
        <VStack
            borderWidth='2px'
            borderStyle='dashed'
            borderColor={isValid || isDragActive ? 'gray.300' : 'red.300'}
            rounded='xl'
            p='8'
            pt='2'
            cursor='pointer'
            background={isDragActive ? 'gray.100' : 'gray.50'}
            _hover={{ background: 'gray.100' }}
            transition='background ease 300ms'
            w='full'
            spacing='4'

            {...getRootProps()}>

            <input {...getInputProps()} />

            {
                acceptedFile && !isDragActive
                    ? <FiCheckCircle size='28px' color='#95a7bb' />
                    : <FiUploadCloud size='28px' color='#95a7bb' />
            }

            <VStack spacing='1'>
                {
                    isDragActive
                        ? <Text
                            fontWeight='500'
                            color='teal.500'>
                            Suelta el archivo para subirlo
                        </Text>
                        : acceptedFile
                            ? <Text fontWeight='500' color='teal.500'>
                                Documento cargado correctamente
                            </Text>
                            : <Text>
                                <Text
                                    as='span'
                                    color={isValid ? 'teal.500' : 'red.500'}
                                    fontWeight='500'>
                                    Selecciona un archivo{' '}
                                </Text>
                                o arrastra y suelta aquí
                            </Text>
                }

                <Text fontSize='14px' textAlign='center' >
                    {
                        acceptedFile && !isDragActive
                            ? `${acceptedFile.name} (${(acceptedFile.size / 1024 / 1024).toFixed(2)} MB)`
                            : 'Tamaño máximo del archivo 16MB'
                    }
                </Text>
            </VStack>
        </VStack>
    )
}

export default FileDropzone