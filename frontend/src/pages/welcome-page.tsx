import { Stack, Flex, Box, Heading, Text, useMediaQuery, Image, VStack, HStack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Link from '../components/link';
import UnderlinedText from '../components/underlined_text';
import useColorScheme from '../hooks/use-color-scheme';
import { up } from '../theme/breakpoints';

interface WelcomePageProps {
    form: ReactNode
}

const WelcomePage = ({ form }: WelcomePageProps) => {
    const { secondaryScheme } = useColorScheme()
    const [upMd] = useMediaQuery(up('md'))

    return <Box position='relative' minH='100vh'>
        <Box position='absolute' top='0' left='0' bottom='0' right='0' bgGradient='linear(60deg, transparent, blue.200, purple.100, transparent)' opacity={{ base: '0.5', md: '0.75' }} />
        <Box position='absolute' top='0' left='0' bottom='0' right='0' bgGradient='linear(to-t, white, transparent)' />

        <VStack position='absolute' top='0' left='0' bottom='0' right='0'>

            <HStack w='full' p='8' maxW='7xl' justify={{ md: 'space-between' }} >
                <Link to='/login'>
                    <Image src='logo_cuch.png' objectFit='contain' h={{ base: '72px', sm: '86px' }} />
                </Link>

                <HStack as='nav' spacing='4' display={{ base: 'none', md: 'flex' }}>
                    <NavLink name='Iniciar sesión' to='/login' />
                    <NavLink name='Registrarme' to='/register' />
                </HStack>
            </HStack>

            <Stack flex='1' w='full' p='8' maxW='7xl' spacing='12' align={{ md: 'center' }} direction={{ base: 'column', md: 'row' }}>

                <VStack flex='1' spacing='12' align='flex-start' >
                    <Heading
                        lineHeight={1.1}
                        fontWeight={600}
                        fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
                        color={secondaryScheme[700]}>

                        <UnderlinedText color='#0987a0' opacity='0.3'>
                            Biblioteca digital
                        </UnderlinedText>
                        <br />
                        <Text as='span' color='gray.700'>
                            Centro Universitario Chivilcoy
                        </Text>
                    </Heading>

                    {
                        upMd && <Text color='gray.600' fontSize='lg'>
                            Espacio común entre alumnos y docentes de todas las extensiones universitarias,
                            donde podrás encontrar y compartir material digitalizado
                        </Text>
                    }
                </VStack>

                <Box flex='1'>
                    {
                        upMd
                            ? <Flex flex={1} justify='flex-end' align='center'>
                                <Box bg='white' rounded='2xl' p='10' boxShadow='2xl' w={{ base: 'sm', lg: 'md' }}>
                                    {form}
                                </Box>
                            </Flex>
                            : form
                    }
                </Box>
            </Stack>

            <Box h='86px' />
        </VStack>
    </Box>
}

const NavLink = ({ name, to }: { name: string, to: string }) => {
    return <Link px='4' py='2' rounded='lg' _hover={{ bg: 'blackAlpha.100' }} fontWeight='600' to={to}>
        {name}
    </Link>
}

export default WelcomePage