import { Avatar, Badge, Heading, HStack, Input, InputGroup, InputLeftElement, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, ThemeTypings, Tr, VStack } from "@chakra-ui/react"
import { FiLock, FiSearch, FiUnlock } from "react-icons/fi"
import Content from "../components/content"
import TableActionButton from "../components/table-action-button"

type Status = 'Activo' | 'Inhabilitado'
const statusColors: Record<Status, ThemeTypings['colorSchemes']> = {
    'Activo': 'green',
    'Inhabilitado': 'red',
}

interface UserData {
    name: string
    lastname: string
    role: string
    status: Status
    email: string
    signUpAt: string
    invitedBy?: string
}

const usersData: UserData[] = [
    { name: 'Federico', lastname: 'De Sía', status: 'Activo', role: 'Administrador', email: 'desiafederico@gmail.com', signUpAt: '12 sep. 2022 15:46 p.m.' },
    { name: 'Milagros', lastname: 'Ratto', status: 'Activo', role: 'Administrador', email: 'milagrosratto@gmail.com', signUpAt: '12 sep. 2022 15:46 p.m.' },
    { name: 'Marcelo', lastname: 'De Lillo', status: 'Activo', role: 'Profesor', email: 'marcelodelillo@gmail.com', signUpAt: '12 sep. 2022 15:46 p.m.', invitedBy: 'Federico De Sía' },
    { name: 'Emmanuel', lastname: 'Pagano', status: 'Activo', role: 'Profesor', email: 'emmanuelpagano@gmail.com', signUpAt: '12 sep. 2022 15:46 p.m.', invitedBy: 'Milagros Ratto' },
    { name: 'Matías', lastname: 'Schettino', status: 'Activo', role: 'Profesor', email: 'matiasschettino@gmail.com', signUpAt: '12 sep. 2022 15:46 p.m.', invitedBy: 'Marcelo De Lillo' },
    { name: 'Persona', lastname: 'Infiltrada', status: 'Inhabilitado', role: 'Alumno', email: 'personainfiltrada@gmail.com', signUpAt: '12 sep. 2022 15:46 p.m.', invitedBy: 'Marcelo De Lillo' },
]

const UsersPage = () => {
    return <Content>
        <VStack align='stretch' spacing='8'>

            <Heading size='md' fontWeight='600'>
                Usuarios
            </Heading>

            <InputGroup color='gray.600' maxW='400px'>
                <InputLeftElement pointerEvents='none' children={<FiSearch />} />
                <Input type='text' placeholder='Buscar por nombre, apellido o email...' />
            </InputGroup>

            <TableContainer p='4' rounded='xl' border='1px' borderColor='gray.200' overflowX='auto' >
                <Table colorScheme='gray' fontSize='15' >
                    <Thead>
                        <Tr>
                            <Th>Nombre</Th>
                            <Th>Tipo de usuario</Th>
                            <Th textAlign='center'>Estado</Th>
                            <Th>Correo electrónico</Th>
                            <Th>Fecha de registro</Th>
                            <Th>Invitado por</Th>
                            <Th w='0' />
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            usersData.map((item, index) => {
                                return <TableItem key={`${item.email} ${index}`} {...item} />
                            })
                        }
                    </Tbody>

                    <TableCaption textAlign='left'>
                        Mostrando {usersData.length} resultados
                    </TableCaption>
                </Table>
            </TableContainer>
        </VStack>
    </Content>
}

const TableItem = (item: UserData) => {
    const name = `${item.name} ${item.lastname}`
    const isActive = item.status === 'Activo'

    return <Tr>
        <Td>
            <HStack spacing='4'>
                <Avatar h='42px' w='42px' size='sm' bg='gray.300' color='blackAlpha.800' name={name} />
                <Text>{name}</Text>
            </HStack>
        </Td>
        <Td>{item.role}</Td>
        <Td textAlign='center'>
            <Badge colorScheme={statusColors[item.status]}>
                {item.status}
            </Badge>
        </Td>
        <Td>{item.email}</Td>
        <Td>{item.signUpAt}</Td>
        <Td>{item.invitedBy ?? '-'}</Td>

        <Td>
            <TableActionButton
                icon={isActive ? <FiLock /> : <FiUnlock />}
                tooltip={isActive ? 'Inhabilitar cuenta' : 'Habilitar cuenta'} />
        </Td>
    </Tr>
}

export default UsersPage