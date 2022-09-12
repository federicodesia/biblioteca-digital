import { Text, FormControl, FormLabel, Input, Button, HStack } from '@chakra-ui/react';
import Link from '../link';
import PasswordInput from '../password-input';
import WelcomeForm from './welcome-form';

const RegisterForm = () => {
    return <WelcomeForm
        title='Crear una cuenta'
        description='Por favor, completa tus datos'
        content={
            <>
                <HStack spacing={4}>
                    <FormControl>
                        <FormLabel>Nombre</FormLabel>
                        <Input type='text' />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Apellido</FormLabel>
                        <Input type='text' />
                    </FormControl>
                </HStack>

                <FormControl>
                    <FormLabel>Correo electrónico</FormLabel>
                    <Input type='email' />
                </FormControl>

                <FormControl>
                    <FormLabel>Contraseña</FormLabel>
                    <PasswordInput />
                </FormControl>
            </>
        }
        bottom={
            <>
                <Button colorScheme='blue'>
                    Registrarme
                </Button>

                <Text color='gray.600' align='center'>
                    ¿Ya tienes una cuenta?{' '}
                    <Link to='/' color='blue.400'>
                        Iniciar sesión
                    </Link>
                </Text>
            </>
        }
    />
}

export default RegisterForm