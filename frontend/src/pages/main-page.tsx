import { ReactNode, useEffect } from 'react';
import { Box, Flex, Drawer, DrawerContent, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import { down } from '../theme/breakpoints';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';

interface MainPageProps {
    children?: ReactNode
}

const MainPage = ({ children }: MainPageProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [isDownMd] = useMediaQuery(down('md'))
    useEffect(() => onClose(), [isDownMd])

    return <Flex
        position='fixed'
        top='0'
        left='0'
        bottom='0'
        right='0'
        overflow='hidden'
        bg='gray.100'>

        {
            !isDownMd && <Box w={64} flexShrink={0} >
                <Sidebar onClose={() => onClose} />
            </Box>
        }

        <Drawer
            autoFocus={false}
            isOpen={isOpen}
            placement='left'
            size='full'
            onClose={onClose}
            onOverlayClick={onClose}>

            <DrawerContent>
                <Sidebar onClose={onClose} />
            </DrawerContent>
        </Drawer>

        <Flex direction='column' flex='1'>
            <Navbar showSidebarButton={isDownMd} onOpen={onOpen} />

            <Box flex='1' position='relative' overflowY='auto'>
                {children}
            </Box>
        </Flex>
    </Flex>

}

export default MainPage