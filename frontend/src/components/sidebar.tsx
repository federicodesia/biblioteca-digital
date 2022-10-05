import { Box, CloseButton, Flex, Image, Stack, Text } from "@chakra-ui/react"
import { ReactNode } from "react"
import { FiBook, FiHome, FiKey, FiUpload, FiUsers } from "react-icons/fi"
import { useMatch, useResolvedPath } from "react-router-dom"
import { RoleType } from "../interfaces"
import useAuthStore from "../zustand/stores/auth-store"
import Link from "./link"

interface NavigationItemProps {
    to: string
    text: string
    icon: ReactNode
}

type NavigationItemsProps = {
    title?: string
    requiredRole?: RoleType,
    items: NavigationItemProps[]
}[]

const navigationItems: NavigationItemsProps = [
    {
        title: 'Menú',
        items: [
            { to: '/home', text: 'Inicio', icon: <FiHome /> },
            { to: '/my-documents', text: 'Mis documentos', icon: <FiBook /> }
        ]
    },
    {
        title: 'Profesor',
        requiredRole: 'Profesor',
        items: [
            { to: '/access-codes', text: 'Códigos de acceso', icon: <FiKey /> }
        ]
    },
    {
        title: 'Administrador',
        requiredRole: 'Administrador',
        items: [
            { to: '/users', text: 'Usuarios', icon: <FiUsers /> },
            { to: '/access-codes', text: 'Códigos de acceso', icon: <FiKey /> },
            { to: '/upload-requests', text: 'Solicitudes de carga', icon: <FiUpload /> }
        ]
    }
]

interface SidebarProps {
    onClose: () => void
}

const Sidebar = ({ onClose }: SidebarProps) => {
    const user = useAuthStore((state) => state.user)

    return <Box
        transition='1s ease'
        bg='white'
        rounded='xl'
        h='full'
        py='2'
        shadow='rgba(149, 157, 165, 0.05) 0px 8px 24px'
        overflowY='auto'>

        <Flex h='20' alignItems='center' mx='6' justifyContent='space-between'>
            <Image src='logo_cuch.png' objectFit='contain' h='58px' />

            <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>

        <Stack p='4' spacing='6'>
            {
                navigationItems
                    .filter(i => i.requiredRole === undefined ? true : i.requiredRole === user?.role.name)
                    .map((navigation, index) => {
                        return <Stack key={`${navigation.title} ${index}`} spacing='4'>

                            {
                                navigation.title && <Text
                                    ml='12px'
                                    textTransform='uppercase'
                                    fontWeight='700'
                                    fontSize='sm'
                                    letterSpacing='1'>

                                    {navigation.title}
                                </Text>
                            }

                            <Stack spacing={1}>
                                {
                                    navigation.items.map((item, index) => (
                                        <NavigationItem key={`${item.text} ${index}`} {...item} />
                                    ))
                                }
                            </Stack>
                        </Stack>
                    })
            }
        </Stack>
    </Box>
}

const NavigationItem = ({ to, text, icon }: NavigationItemProps) => {
    const resolved = useResolvedPath(to);
    const match = useMatch({ path: resolved.pathname, end: true });
    const isActive = match !== null

    return (
        <Link
            to={to}
            fontSize='sm'
            rounded='xl'
            px='4'
            py='3'
            fontWeight={isActive ? 500 : 400}
            color={isActive ? 'black' : 'gray.700'}
            bg={isActive ? 'blue.50' : 'transparent'}
            _hover={{ bg: isActive ? 'blue.50' : 'gray.100' }}>

            <Flex align='center' gap='4'>
                {icon}
                <Text>{text}</Text>
            </Flex>
        </Link>
    )
}

export default Sidebar