import { Text, FormControl, Button, HStack, PinInputField, PinInput } from '@chakra-ui/react';
import Link from '../link';
import WelcomeForm from './welcome-form';

const VerificationForm = () => {
    return <WelcomeForm
        title='Verificación de acceso'
        description='Por favor ingresa el código de acceso otorgado por un profesor o administrador'
        content={
            <FormControl>
                <HStack justify='center' spacing={4} >
                    <PinInput type='alphanumeric'>
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                    </PinInput>
                </HStack>
            </FormControl>
        }
        bottom={
            <>
                <Button>
                    Continuar
                </Button>

                <Text color='gray.600' align='center'>
                    ¿Ya tienes una cuenta?{' '}
                    <Link to='/login'>
                        Iniciar sesión
                    </Link>
                </Text>
            </>
        }
    />
}

export default VerificationForm