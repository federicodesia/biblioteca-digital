import { IconButton, Avatar, Flex, HStack, VStack, Text, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { FiMenu, FiLogOut } from 'react-icons/fi';
import useAuthStore from '../zustand/stores/auth-store';

interface NavbarProps {
    showSidebarButton: boolean
    onOpen: () => void;
}

const Navbar = ({ showSidebarButton, onOpen }: NavbarProps) => {
    return (
        <Flex
            h='20'
            px={{base: '4', md: '8'}}
            alignItems='center'
            justifyContent={showSidebarButton ? 'space-between' : 'flex-end'}>

            {
                showSidebarButton && <IconButton
                    variant='outline'
                    aria-label='Abrir menu lateral'
                    icon={<FiMenu />}
                    onClick={onOpen} />
            }

            <UserMenu />
        </Flex >
    );
}

const UserMenu = () => {
    const { user, logout } = useAuthStore((state) => ({
        user: state.user,
        logout: state.logout
    }))

    const fullname = `${user?.name} ${user?.lastname}`

    return <Menu>
        <MenuButton py='2' fontSize='sm'>
            <HStack spacing='3'>
                <Avatar h='42px' w='42px' size='sm' bg='gray.300' color='gray.700' name={fullname} />

                <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems='flex-start'
                    spacing='0'>

                    <Text fontWeight='500'> {fullname} </Text>
                    <Text color='gray.500'> {user?.role.name} </Text>
                </VStack>
            </HStack>
        </MenuButton>

        <MenuList fontSize='sm' rounded='2xl' border='none' shadow='lg'>
            <MenuItem py='2' px='8' icon={<FiLogOut />} onClick={logout}>
                Cerrar sesión
            </MenuItem>
        </MenuList>
    </Menu>
}

export default Navbar