import { Text, FormControl, FormLabel, Input, Button, FormErrorMessage } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from '../link';
import PasswordInput from '../password-input';
import WelcomeForm from './welcome-form';
import { loginSchema } from '../../schemas/auth.schema';

type FormValues = {
    email: string
    password: string
}

const LoginForm = () => {
    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(loginSchema) })
    const onSubmit = handleSubmit((data) => console.log(data))

    return <WelcomeForm
        title='¡Bienvenido!'
        description='Ingresa tu cuenta para continuar'
        content={
            <>
                <FormControl isInvalid={errors.email !== undefined}>
                    <FormLabel>Correo electrónico</FormLabel>
                    <Input type='email' {...register('email')} />

                    <FormErrorMessage>
                        {errors.email?.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.password !== undefined}>
                    <FormLabel>Contraseña</FormLabel>
                    <PasswordInput register={register('password')} />

                    <FormErrorMessage>
                        {errors.password?.message}
                    </FormErrorMessage>
                </FormControl>
            </>
        }
        bottom={
            <>
                <Button colorScheme='blue' isLoading={isSubmitting} onClick={onSubmit} type='submit'>
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