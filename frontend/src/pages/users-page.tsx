import { Avatar, Badge, Heading, HStack, Input, InputGroup, InputLeftElement, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react"
import { useEffect } from "react"
import { FiLock, FiSearch, FiUnlock } from "react-icons/fi"
import Content from "../components/content"
import TableActionButton from "../components/table-action-button"
import { User } from "../interfaces"
import pluralize from "../utils/pluralize"
import useAdminStore from "../zustand/stores/admin-store"
import useAuthStore from "../zustand/stores/auth-store"

const UsersPage = () => {

    const users = useAdminStore((state) => state.users)
    const getUsers = useAdminStore((state) => state.getUsers)

    useEffect(() => {
        getUsers()
    }, [])

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
                            users.map((item, index) => {
                                return <TableItem key={`${item.email} ${index}`} {...item} />
                            })
                        }
                    </Tbody>

                    <TableCaption textAlign='left'>
                        Mostrando {pluralize(users.length, 'resultado')}
                    </TableCaption>
                </Table>
            </TableContainer>
        </VStack>
    </Content>
}

const TableItem = (item: User) => {
    const user = useAuthStore((state) => state.user)
    const updateUserStatus = useAdminStore((state) => state.updateUserStatus)

    const { id, name, lastname, email, role, isActive, invitedBy, createdAt } = item
    const fullName = `${name} ${lastname}`

    return <Tr>
        <Td>
            <HStack spacing='4'>
                <Avatar h='42px' w='42px' size='sm' bg='gray.300' color='blackAlpha.800' name={fullName} />
                <Text>{fullName}</Text>
            </HStack>
        </Td>
        <Td>{role.name}</Td>
        <Td textAlign='center'>
            <Badge colorScheme={isActive ? 'green' : 'red'}>
                {isActive ? 'Activo' : 'Inhabilitado'}
            </Badge>
        </Td>
        <Td>{email}</Td>
        <Td>{new Date(createdAt).toLocaleString('es-AR', { dateStyle: 'medium', timeStyle: 'short', hour12: true })}</Td>
        <Td>{invitedBy ? `${invitedBy.name} ${invitedBy.lastname}` : '-'} </Td>

        <Td>
            {
                user?.id !== id && <TableActionButton
                    icon={isActive ? <FiUnlock /> : <FiLock />}
                    tooltip={isActive ? 'Inhabilitar cuenta' : 'Habilitar cuenta'}
                    onClick={() => updateUserStatus(id, !isActive)} />
            }
        </Td>
    </Tr>
}

export default UsersPage