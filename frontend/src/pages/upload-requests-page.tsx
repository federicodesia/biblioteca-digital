import { Badge, Heading, HStack, Input, InputGroup, InputLeftElement, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, ThemeTypings, Tr, VStack } from "@chakra-ui/react"
import { FiCheck, FiEye, FiSearch, FiX } from "react-icons/fi"
import Content from "../components/content"
import TableActionButton from "../components/table-action-button"

type Status = 'Esperando respuesta' | 'Aceptado' | 'Rechazado'
const statusColors: Record<Status, ThemeTypings['colorSchemes']> = {
    'Esperando respuesta': 'gray',
    'Aceptado': 'green',
    'Rechazado': 'red'
}

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
    return <Content>
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
    </Content>
}

const TableItem = (item: UploadRequestData) => {
    const { status } = item

    return <Tr>
        <Td>{item.title}</Td>
        <Td>{item.description}</Td>
        <Td textAlign='center'>
            <Badge colorScheme={statusColors[status]}>
                {status}
            </Badge>
        </Td>
        <Td>{item.requestedBy}</Td>
        <Td>{item.requestedAt}</Td>

        <Td>
            <HStack spacing='2' justify='flex-end'>
                <TableActionButton icon={<FiEye />} tooltip='Ver detalles' />
                {
                    status === 'Esperando respuesta' && <>
                        <TableActionButton icon={<FiX />} tooltip='Rechazar solicitud' />
                        <TableActionButton icon={<FiCheck />} tooltip='Aceptar solicitud' />
                    </>
                }
            </HStack>
        </Td>
    </Tr >
}

export default UploadRequestsPage