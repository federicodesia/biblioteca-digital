import { Text, FormControl, Button, Input, FormErrorMessage } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from '../link';
import WelcomeForm from './welcome-form';
import { verificationSchema } from '../../schemas/auth.schema';

type FormValues = {
    code: string
}

const VerificationForm = () => {
    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(verificationSchema) })
    const onSubmit = handleSubmit((data) => console.log(data))

    return <WelcomeForm
        title='Verificación'
        description='Por favor ingresa el código de acceso otorgado por un profesor o administrador'
        content={
            <FormControl isInvalid={errors.code !== undefined}>
                <Input placeholder='Código de acceso' {...register('code')} />

                <FormErrorMessage>
                    {errors.code?.message}
                </FormErrorMessage>
            </FormControl>
        }
        bottom={
            <>
                <Button colorScheme='blue' isLoading={isSubmitting} onClick={onSubmit} type='submit'>
                    Continuar
                </Button>

                <Text color='gray.600' align='center'>
                    ¿Ya tienes una cuenta?{' '}
                    <Link to='/login' color='blue.400'>
                        Iniciar sesión
                    </Link>
                </Text>
            </>
        }
    />
}

export default VerificationForm