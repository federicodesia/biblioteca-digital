import { Badge, Heading, HStack, Input, InputGroup, InputLeftElement, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, ThemeTypings, Tr, VStack } from "@chakra-ui/react"
import { ChangeEvent, useEffect, useState } from "react"
import { FiCheck, FiEye, FiSearch, FiX } from "react-icons/fi"
import ApproveUploadRequestModal from "../components/modals/approve-upload-request"
import RejectUploadRequestModal from "../components/modals/reject-upload-request"
import TableActionButton from "../components/table-action-button"
import useDebounce from "../hooks/use-debounce"
import { UploadRequest } from "../interfaces"
import { formatDate } from "../utils/date"
import pluralize from "../utils/pluralize"
import useAdminStore from "../zustand/stores/admin-store"

type Status = 'Esperando respuesta' | 'Aceptado' | 'Rechazado'
const statusColors: Record<Status, ThemeTypings['colorSchemes']> = {
    'Esperando respuesta': 'gray',
    'Aceptado': 'green',
    'Rechazado': 'red'
}

const UploadRequestsPage = () => {
    const uploadRequests = useAdminStore((state) => state.uploadRequests.items)

    const [searchValue, setSearchValue] = useState('')
    const debouncedSearchValue = useDebounce(searchValue, 500)
    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value)

    const searchUploadRequest = useAdminStore((state) => state.uploadRequests.search)
    useEffect(() => {
        searchUploadRequest(debouncedSearchValue)
    }, [debouncedSearchValue])

    return <VStack align='stretch' spacing='8'>

        <Heading size='md' fontWeight='600'>
            Solicitudes de carga
        </Heading>

        <InputGroup color='gray.600' maxW='400px'>
            <InputLeftElement pointerEvents='none' children={<FiSearch />} />
            <Input type='text' placeholder='Buscar por título o persona...' value={searchValue} onChange={handleSearch} />
        </InputGroup>

        <TableContainer p='4' rounded='xl' border='1px' borderColor='gray.200' overflowX='auto' >
            <Table colorScheme='gray' fontSize='15' >
                <Thead>
                    <Tr>
                        <Th>Título</Th>
                        <Th textAlign='center'>Estado</Th>
                        <Th>Solicitado por</Th>
                        <Th>Fecha de solicitud</Th>
                        <Th>Revisado por</Th>
                        <Th w='0' />
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        uploadRequests.map((item, index) => {
                            return <TableItem key={`${item.id} ${index}`} {...item} />
                        })
                    }
                </Tbody>

                <TableCaption textAlign='left'>
                    Mostrando {pluralize(uploadRequests.length, 'resultado')}
                </TableCaption>
            </Table>
        </TableContainer>
    </VStack>
}

const TableItem = (item: UploadRequest) => {
    const { document, status, requestedAt, reviewedBy } = item
    const { title, createdBy } = document

    return <Tr>
        <Td>{title}</Td>
        <Td textAlign='center'>
            <Badge colorScheme={statusColors[status.name]}>
                {status.name}
            </Badge>
        </Td>
        <Td>{`${createdBy.name} ${createdBy.lastname}`}</Td>
        <Td>{formatDate(requestedAt)}</Td>
        <Td>{reviewedBy ? `${reviewedBy.name} ${reviewedBy.lastname}` : '-'}</Td>

        <Td>
            <HStack spacing='2' justify='flex-end'>
                <TableActionButton icon={<FiEye />} tooltip='Ver detalles' />
                {
                    status.name === 'Esperando respuesta' && <>

                        <RejectUploadRequestModal
                            uploadRequest={item}
                            trigger={
                                <TableActionButton icon={<FiX />} tooltip='Rechazar solicitud' />
                            } />

                        <ApproveUploadRequestModal
                            uploadRequest={item}
                            trigger={
                                <TableActionButton icon={<FiCheck />} tooltip='Aceptar solicitud' />
                            } />
                    </>
                }
            </HStack>
        </Td>
    </Tr >
}

export default UploadRequestsPage