import { Stack, Flex, Box, Heading, Text, Icon, IconProps, useMediaQuery } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { up } from '../theme/breakpoints';

interface WelcomePageProps {
    form: ReactNode
}

const WelcomePage = ({ form }: WelcomePageProps) => {
    const [upMd] = useMediaQuery(up('md'))

    return <Flex
        minH='100vh'
        justify='center'
        align={{ base: 'start', md: 'center' }}>

        <Stack
            w='full'
            direction={{ base: 'column', md: 'row' }}
            align={{ md: 'center' }}
            maxW='7xl'
            p={8}
            spacing={12}>

            <Stack
                flex={1}
                spacing={{ base: 5, md: 10 }}>

                <Heading
                    lineHeight={1.1}
                    fontWeight={600}
                    fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
                    <Text
                        as='span'
                        position='relative'
                        _after={{
                            content: "''",
                            width: 'full',
                            height: '30%',
                            position: 'absolute',
                            bottom: 1,
                            left: 0,
                            bg: 'cyan.700',
                            zIndex: -1,
                        }}>
                        Biblioteca digital
                    </Text>
                    <br />
                    <Text as='span' color='cyan.700'>
                        Centro Universitario Chivilcoy
                    </Text>
                </Heading>

                {
                    upMd && <Text color='gray.500'>
                        Espacio común entre alumnos y docentes de todas las extensiones universitarias,
                        donde podrás encontrar y compartir material digitalizado
                    </Text>
                }
            </Stack>

            {
                upMd
                    ? <Flex
                        flex={1}
                        justify='center'
                        align='center'
                        position='relative'>

                        <Blob
                            w='150%'
                            h='100%'
                            position='absolute'
                            top={6}
                            zIndex={-1}
                            color='cyan.50' />

                        <Box
                            position='relative'
                            bg='white'
                            rounded='2xl'
                            p={10}
                            boxShadow='2xl'
                            w={{ base: 'sm', lg: 'md' }}>

                            {form}
                        </Box>
                    </Flex>
                    : form
            }
        </Stack>
    </Flex>
}

const Blob = (props: IconProps) => {
    return (
        <Icon
            width='100%'
            viewBox="0 0 578 440"
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}>
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z'
                fill='currentColor'
            />
        </Icon>
    );
};

export default WelcomePage