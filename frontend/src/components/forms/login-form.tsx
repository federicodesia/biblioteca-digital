import { Text, FormControl, FormLabel, Input, Button, FormErrorMessage } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from '../link';
import PasswordInput from '../password-input';
import WelcomeForm from './welcome-form';
import { loginSchema } from '../../schemas/auth.schema';
import useAuthStore from '../../zustand/stores/auth-store';
import setFormError from '../../utils/form-error';
import { useNavigate } from 'react-router-dom';

type FormValues = {
    email: string
    password: string
}

function LoginForm() {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        setError
    } = useForm<FormValues>({ resolver: zodResolver(loginSchema) })

    const navigate = useNavigate()
    const login = useAuthStore((state) => state.login)

    const onSubmit = handleSubmit(async (data) => {
        const { email, password } = data
        const response = await login(email, password)
        if (response.errorType === undefined) return navigate('/home')
        if (response.errorType === 'form') return setFormError(response.error, setError)
    })

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