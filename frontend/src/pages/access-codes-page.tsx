import { Badge, Button, Heading, HStack, Input, InputGroup, InputLeftElement, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, ThemeTypings, Tr, useClipboard, useToast, VStack } from "@chakra-ui/react"
import { ChangeEvent, useEffect, useState } from "react"
import { FiClipboard, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi"
import GenerateAccessCodeModal from "../components/modals/generate-access-code"
import ImageModal from "../components/modals/image-modal"
import TableActionButton from "../components/table-action-button"
import useDebounce from "../hooks/use-debounce"
import { AccessCode } from "../interfaces"
import { differenceInDays, formatDate, isPast } from "../utils/date"
import pluralize from "../utils/pluralize"
import useAdminStore from "../zustand/stores/admin-store"

type Status = 'Disponible' | 'Utilizado' | 'Expirado'
const statusColors: Record<Status, ThemeTypings['colorSchemes']> = {
    'Disponible': 'green',
    'Utilizado': 'blue',
    'Expirado': 'red'
}

const AccessCodesPage = () => {
    const accessCodes = useAdminStore((state) => state.accessCodes)

    const [searchValue, setSearchValue] = useState('')
    const debouncedSearchValue = useDebounce(searchValue, 500)
    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value)

    const searchAccessCode = useAdminStore((state) => state.searchAccessCode)
    useEffect(() => {
        searchAccessCode(debouncedSearchValue)
    }, [debouncedSearchValue])

    return <VStack align='stretch' spacing='8'>

        <Heading size='md' fontWeight='600'>
            Códigos de acceso
        </Heading>

        <HStack spacing='4' justify='space-between'>
            <InputGroup color='gray.600' maxW='350px'>
                <InputLeftElement pointerEvents='none' children={<FiSearch />} />
                <Input type='text' placeholder='Buscar código o persona...' value={searchValue} onChange={handleSearch} />
            </InputGroup>

            <GenerateAccessCodeModal trigger={
                <Button flexShrink='0' leftIcon={<FiPlus />} variant='outline'>
                    Generar nuevo
                </Button>
            } />
        </HStack>

        <TableContainer p='4' rounded='xl' border='1px' borderColor='gray.200' overflowX='auto' >
            <Table colorScheme='gray' fontSize='15' >
                <Thead>
                    <Tr>
                        <Th>Código</Th>
                        <Th>Tipo de usuario</Th>
                        <Th textAlign='center'>Estado</Th>
                        <Th>Creado por</Th>
                        <Th>Fecha de creación</Th>
                        <Th textAlign='center'>Expira en</Th>
                        <Th w='0' />
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        accessCodes.map(item => {
                            return <TableItem key={item.code} {...item} />
                        })
                    }
                </Tbody>

                <TableCaption textAlign='left'>
                    Mostrando {pluralize(accessCodes.length, 'resultado')}
                </TableCaption>
            </Table>
        </TableContainer>
    </VStack>
}

const TableItem = (item: AccessCode) => {
    const { code, role, createdBy, createdAt, expiresAt, timesUsed } = item

    const status: Status =
        role.name !== 'Alumno' && timesUsed > 0
            ? 'Utilizado'
            : isPast(expiresAt)
                ? 'Expirado'
                : `Disponible`

    const { onCopy } = useClipboard(item.code)

    const toastId = item.code
    const toast = useToast()

    const deleteAccessCode = useAdminStore((state) => state.deleteAccessCode)
    const handleCopyToClipboard = () => {
        onCopy()
        if (toast.isActive(toastId)) return
        toast({
            id: toastId,
            description: "Código copiado al portapapeles!",
            status: 'success',
            duration: 3000,
            position: 'bottom-left',
            variant: 'subtle'
        })
    }

    return <Tr>
        <Td>{code}</Td>
        <Td>{role.name}</Td>
        <Td textAlign='center'>
            <Badge colorScheme={statusColors[status]}>
                {
                    role.name === 'Alumno' && status === 'Disponible'
                        ? `utilizado ${pluralize(timesUsed, 'vez', 'veces')}`
                        : status
                }
            </Badge>
        </Td>
        <Td>{`${createdBy.name} ${createdBy.lastname}`}</Td>
        <Td>{formatDate(createdAt)}</Td>
        <Td textAlign='center'>
            {
                status === 'Disponible' && !isPast(expiresAt)
                    ? pluralize(differenceInDays(new Date(), expiresAt), 'día')
                    : '-'
            }
        </Td>

        <Td>
            <HStack spacing='2'>
                <ImageModal
                    src='notify.svg'
                    title='Eliminar código de acceso'
                    description='¿Estás seguro que quieres eliminar este código de acceso? Después no podrás deshacer esta acción.'
                    buttonText='Eliminar'
                    onClick={() => deleteAccessCode(code)}
                    trigger={
                        <TableActionButton icon={<FiTrash2 />} tooltip='Eliminar código' />
                    } />
                <TableActionButton icon={<FiClipboard />} tooltip='Copiar al portapapeles' onClick={handleCopyToClipboard} />
            </HStack>
        </Td>
    </Tr>
}

export default AccessCodesPage