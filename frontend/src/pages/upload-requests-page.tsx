import { Badge, Box, Heading, HStack, IconButton, Input, InputGroup, InputLeftElement, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tooltip, Tr, VStack } from "@chakra-ui/react"
import { FiCheck, FiEye, FiSearch, FiX } from "react-icons/fi"

type Status = 'Esperando respuesta' | 'Aceptado' | 'Rechazado'
interface UploadRequestData {
    id: number
    title: string
    description: string
    status: Status
    requestedBy: string
    requestedAt: string
}

const uploadRequestsData: UploadRequestData[] = [
    { id: 0, title: 'Documento de ejemplo', description: 'Descripción de ejemplo...', status: 'Esperando respuesta', requestedBy: 'Emmanuel Pagano', requestedAt: '12 sep. 2022 15:46 p.m.' },
    { id: 1, title: 'Documento de ejemplo', description: 'Descripción de ejemplo...', status: 'Esperando respuesta', requestedBy: 'Matías Schettino', requestedAt: '12 sep. 2022 15:46 p.m.' },
    { id: 2, title: 'Documento de ejemplo', description: 'Descripción de ejemplo...', status: 'Aceptado', requestedBy: 'Emmanuel Pagano', requestedAt: '12 sep. 2022 15:46 p.m.' },
    { id: 3, title: 'Documento de ejemplo', description: 'Descripción de ejemplo...', status: 'Aceptado', requestedBy: 'Emmanuel Pagano', requestedAt: '12 sep. 2022 15:46 p.m.' },
    { id: 4, title: 'Documento de ejemplo', description: 'Descripción de ejemplo...', status: 'Rechazado', requestedBy: 'Persona infiltrada', requestedAt: '12 sep. 2022 15:46 p.m.' }
]

const UploadRequestsPage = () => {
    return <Box
        position='absolute'
        top='0'
        left='0'
        right='0'
        p='8'>

        <Box bg='white' p='8' rounded='xl' border='1px' borderColor='gray.200' >
            <VStack align='stretch' spacing='8'>

                <Heading size='md' fontWeight='600'>
                    Solicitudes de carga
                </Heading>

                <InputGroup color='gray.600' maxW='400px'>
                    <InputLeftElement pointerEvents='none' children={<FiSearch />} />
                    <Input type='text' placeholder='Buscar por título o persona...' />
                </InputGroup>

                <TableContainer p='4' rounded='xl' border='1px' borderColor='gray.200' overflowX='auto' >
                    <Table colorScheme='gray' fontSize='15' >
                        <Thead>
                            <Tr>
                                <Th>Título</Th>
                                <Th>Descripción</Th>
                                <Th textAlign='center'>Estado</Th>
                                <Th>Solicitado por</Th>
                                <Th>Fecha de solicitud</Th>
                                <Th w='0' />
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                uploadRequestsData.map((item, index) => {
                                    return <TableItem key={`${item.id} ${index}`} {...item} />
                                })
                            }
                        </Tbody>

                        <TableCaption textAlign='left'>
                            Mostrando {uploadRequestsData.length} resultados
                        </TableCaption>
                    </Table>
                </TableContainer>
            </VStack>
        </Box>
    </Box>
}

const TableItem = (item: UploadRequestData) => {
    const { status } = item

    return <Tr>
        <Td>{item.title}</Td>
        <Td>{item.description}</Td>
        <Td textAlign='center'>
            <Badge
                rounded='xl'
                px='2'
                py='2px'
                fontWeight='600'
                textTransform='lowercase'
                colorScheme={
                    status === 'Aceptado'
                        ? 'green'
                        : status === 'Rechazado'
                            ? 'red'
                            : 'blue'
                }>
                {status}
            </Badge>
        </Td>
        <Td>{item.requestedBy}</Td>
        <Td>{item.requestedAt}</Td>

        <Td>
            <HStack spacing='2' justify='flex-end'>
                <Tooltip openDelay={400} bg='white' p='4' rounded='lg' shadow='lg' label='Ver detalles'>
                    <IconButton
                        variant='ghost'
                        colorScheme='gray'
                        aria-label='Ver detalles'
                        icon={<FiEye />} />
                </Tooltip>

                {
                    status === 'Esperando respuesta' && <>
                        <Tooltip openDelay={400} bg='white' p='4' rounded='lg' shadow='lg' label='Rechazar solicitud'>
                            <IconButton
                                variant='ghost'
                                colorScheme='gray'
                                aria-label='Rechazar solicitud'
                                icon={<FiX />} />
                        </Tooltip>

                        <Tooltip openDelay={400} bg='white' p='4' rounded='lg' shadow='lg' label='Aceptar solicitud'>
                            <IconButton
                                variant='ghost'
                                colorScheme='gray'
                                aria-label='Aceptar solicitud'
                                icon={<FiCheck />} />
                        </Tooltip>
                    </>
                }
            </HStack>
        </Td>
    </Tr >
}

export default UploadRequestsPage