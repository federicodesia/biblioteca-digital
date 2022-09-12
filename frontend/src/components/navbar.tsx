import { IconButton, Avatar, Flex, HStack, VStack, Text, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { FiMenu, FiLogOut } from 'react-icons/fi';

interface NavbarProps {
    showSidebarButton: boolean
    onOpen: () => void;
}

const Navbar = ({ showSidebarButton, onOpen }: NavbarProps) => {
    return (
        <Flex
            h='20'
            px='8'
            alignItems='center'
            bg='white'
            borderBottomWidth='1px'
            borderBottomColor='gray.200'
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
    return <Menu>
        <MenuButton py='2' fontSize='sm'>
            <HStack spacing='3'>
                <Avatar h='42px' w='42px' size='sm' bg='gray.300' name='Nombre usuario' />

                <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems='flex-start'
                    spacing='0'>

                    <Text fontWeight='500'>Nombre usuario</Text>
                    <Text color='gray.500'>Administrador</Text>
                </VStack>
            </HStack>
        </MenuButton>

        <MenuList fontSize='sm'>
            <MenuItem icon={<FiLogOut />}>Cerrar sesión</MenuItem>
        </MenuList>
    </Menu>
}

export default Navbar