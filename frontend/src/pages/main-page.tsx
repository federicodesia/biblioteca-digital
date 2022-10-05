import { ReactNode, useEffect } from 'react';
import { Box, Drawer, DrawerContent, useDisclosure, useMediaQuery, VStack, HStack } from '@chakra-ui/react';
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

    return <Box position='relative' minH='100vh'>
        {
            !isDownMd && <>
                <Box position='absolute' top='0' left='0' bottom='0' right='0' bgGradient='linear(45deg, blue, cyan, teal, green, pink, purple)' opacity='0.1' />
                <Box position='absolute' top='0' left='0' bottom='0' right='0' bgGradient='linear(45deg, purple, transparent)' opacity='0.05' />
            </>
        }

        <HStack position='absolute' top='0' left='0' bottom='0' right='0' p='4' spacing='4' align='stretch'>
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

            <HStack flex='1' align='stretch' justify='center'>
                <VStack flex='1' maxW='8xl' align='stretch' spacing='4'>
                    <Navbar showSidebarButton={isDownMd} onOpen={onOpen} />

                    <Box flex='1' bg='white' rounded='xl' shadow='rgba(149, 157, 165, 0.05) 0px 8px 24px' position='relative'>
                        <Box position='absolute' top='0' left='0' right='0' bottom='0' p={{ base: '4', md: '12' }} overflowY='auto'>
                            {children}
                        </Box>
                    </Box>
                </VStack>
            </HStack>
        </HStack>
    </Box>
}

export default MainPage