import { Avatar, Badge, Box, Heading, HStack, IconButton, Input, InputGroup, InputLeftElement, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr, VStack } from "@chakra-ui/react"
import { FiLock, FiSearch, FiUnlock } from "react-icons/fi"

type Status = 'Activo' | 'Inhabilitado'
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
    return <Box
        position='absolute'
        top='0'
        left='0'
        right='0'
        p='8'>

        <Box bg='white' p='8' rounded='xl' border='1px' borderColor='gray.200' >
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
        </Box>
    </Box>
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
            <Badge
                rounded='xl'
                px='2'
                py='2px'
                fontWeight='600'
                textTransform='lowercase'
                colorScheme={
                    isActive
                        ? 'green'
                        : 'red'
                }>
                {item.status}
            </Badge>
        </Td>
        <Td>{item.email}</Td>
        <Td>{item.signUpAt}</Td>
        <Td>{item.invitedBy ?? '-'}</Td>

        <Td>
            <HStack spacing='2'>
                <Tooltip openDelay={400} bg='white' p='4' rounded='lg' shadow='lg' label={isActive ? 'Inhabilitar cuenta' : 'Activar cuenta'}>
                    <IconButton
                        variant='ghost'
                        colorScheme='gray'
                        aria-label={isActive ? 'Inhabilitar cuenta' : 'Activar cuenta'}
                        icon={
                            isActive
                                ? <FiLock />
                                : <FiUnlock />
                        } />
                </Tooltip>
            </HStack>
        </Td>
    </Tr>
}

export default UsersPage