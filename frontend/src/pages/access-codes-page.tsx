import { Badge, Button, Heading, HStack, Input, InputGroup, InputLeftElement, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, ThemeTypings, Tr, useClipboard, useToast, VStack } from "@chakra-ui/react"
import { FiClipboard, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi"
import Content from "../components/content"
import GenerateAccessCodeModal from "../components/modals/generate-access-code"
import TableActionButton from "../components/table-action-button"
import pluralize from "../utils/pluralize"

type Status = 'Disponible' | 'Utilizado' | 'Expirado'
const statusColors: Record<Status, ThemeTypings['colorSchemes']> = {
    'Disponible': 'green',
    'Utilizado': 'blue',
    'Expirado': 'red'
}

interface AccessCode {
    code: string
    role: string
    status: Status
    createdBy: string
    createdAt: string
    expiresIn?: number
}

const accessCodes: AccessCode[] = [
    { code: 'zdFI4', role: 'Administrador', status: 'Disponible', createdBy: 'Federico De Sía', createdAt: '12 sep. 2022 15:46 p.m.', expiresIn: 1 },
    { code: 'Fb1Ng', role: 'Administrador', status: 'Disponible', createdBy: 'Milagros Ratto', createdAt: '12 sep. 2022 15:46 p.m.', expiresIn: 1 },
    { code: '3USv5', role: 'Profesor', status: 'Utilizado', createdBy: 'Federico De Sía', createdAt: '12 sep. 2022 15:46 p.m.' },
    { code: 'Oj0CK', role: 'Alumno', status: 'Disponible', createdBy: 'Marcelo De Lillo', createdAt: '12 sep. 2022 15:46 p.m.', expiresIn: 3 },
    { code: 'tOml8', role: 'Alumno', status: 'Expirado', createdBy: 'Emmanuel Pagano', createdAt: '12 sep. 2022 15:46 p.m.' },
    { code: 'vGMjc', role: 'Alumno', status: 'Expirado', createdBy: 'Matías Schettino', createdAt: '12 sep. 2022 15:46 p.m.' },
]

const AccessCodesPage = () => {
    return <Content >
        <VStack align='stretch' spacing='8'>

            <Heading size='md' fontWeight='600'>
                Códigos de acceso
            </Heading>

            <HStack spacing='4' justify='space-between'>
                <InputGroup color='gray.600' maxW='350px'>
                    <InputLeftElement pointerEvents='none' children={<FiSearch />} />
                    <Input type='text' placeholder='Buscar código o persona...' />
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
                        Mostrando {accessCodes.length} resultados
                    </TableCaption>
                </Table>
            </TableContainer>
        </VStack>
    </Content>
}

const TableItem = (item: AccessCode) => {
    const { onCopy } = useClipboard(item.code)

    const toastId = item.code
    const toast = useToast()

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
        <Td>{item.code}</Td>
        <Td>{item.role}</Td>
        <Td textAlign='center'>
            <Badge colorScheme={statusColors[item.status]}>
                {item.status}
            </Badge>
        </Td>
        <Td>{item.createdBy}</Td>
        <Td>{item.createdAt}</Td>
        <Td textAlign='center'>
            {item.expiresIn ? pluralize(item.expiresIn, 'día') : '-'}
        </Td>

        <Td>
            <HStack spacing='2'>
                <TableActionButton icon={<FiTrash2 />} tooltip='Eliminar código' />
                <TableActionButton icon={<FiClipboard />} tooltip='Copiar al portapapeles' onClick={handleCopyToClipboard} />
            </HStack>
        </Td>
    </Tr>
}

export default AccessCodesPage