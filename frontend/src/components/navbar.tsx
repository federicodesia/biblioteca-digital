import { IconButton, Avatar, Flex, HStack, VStack, Text, Menu, MenuButton, MenuItem, MenuList, InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { FiMenu, FiLogOut, FiSearch } from 'react-icons/fi';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useDebounce from '../hooks/use-debounce';
import useAuthStore from '../zustand/stores/auth-store';
import useMainStore from '../zustand/stores/main-store';

interface NavbarProps {
    showSidebarButton: boolean
    onOpen: () => void;
}

const Navbar = ({ showSidebarButton, onOpen }: NavbarProps) => {
    return (
        <Flex
            h='20'
            p={{ base: '4', md: '8' }}
            pl={{ base: '4', md: '0' }}
            gap='8'
            alignItems='center'
            justifyContent='space-between'>

            <HStack spacing='8' flex='1' >
                {
                    showSidebarButton && <IconButton
                        variant='outline'
                        aria-label='Abrir menu lateral'
                        icon={<FiMenu />}
                        onClick={onOpen} />
                }

                <SearchBar />
            </HStack>

            <UserMenu />
        </Flex >
    );
}

const SearchBar = () => {
    const { q } = useParams()

    const navigate = useNavigate()
    const location = useLocation()
    const isSearchPage = () => location.pathname.startsWith('/search')

    const [searchValue, setSearchValue] = useState((isSearchPage() && q) ? q : '')
    const debouncedSearchValue = useDebounce(searchValue, 500)
    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value)

    useEffect(() => {
        if (debouncedSearchValue !== '') return navigate(`/search/${debouncedSearchValue}`)

        useMainStore.getState().documents.search.update('')
        if (isSearchPage()) navigate('/home')
    }, [debouncedSearchValue])

    useEffect(() => {
        if (!isSearchPage()) setSearchValue('')
    }, [location])

    return <InputGroup color='gray.600' maxW='400px' >
        <InputLeftElement
            pointerEvents='none'
            h={{ base: '40px', md: '48px' }}
            w={{ base: '40px', md: '48px' }}
            children={<FiSearch />} />

        <Input
            type='text'
            placeholder='Buscar documento o autor...'
            border='none'
            rounded='lg'
            bg={{ base: 'gray.100', md: 'white' }}
            h={{ base: '40px', md: '48px' }}
            pl='44px'
            value={searchValue}
            onChange={handleSearch} />
    </InputGroup>
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
                    align='start'
                    textAlign='start'
                    spacing='0'>

                    <Text fontWeight='500' noOfLines={1}> {fullname} </Text>
                    <Text color='gray.500' noOfLines={1}> {user?.role.name} </Text>
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