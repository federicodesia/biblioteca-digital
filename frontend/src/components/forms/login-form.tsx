import { Text, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import Link from '../link';
import PasswordInput from '../password-input';
import WelcomeForm from './welcome-form';

const LoginForm = () => {
    return <WelcomeForm
        title='¡Bienvenido!'
        description='Ingresa tu cuenta para continuar'
        content={
            <>
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
                    Iniciar sesión
                </Button>

                <Text color='gray.600' align='center'>
                    ¿No tienes una cuenta?{' '}
                    <Link to='/verification' color='blue.400'>
                        Registrarme
                    </Link>
                </Text>
            </>
        }
    />
}

export default LoginForm