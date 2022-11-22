import { Text, FormControl, FormLabel, Input, Button, HStack, FormErrorMessage } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from '../link';
import PasswordInput from '../password-input';
import WelcomeForm from './welcome-form';
import { registerSchema } from '../../schemas/auth.schema';
import { useNavigate, useParams } from 'react-router-dom';
import setFormError from '../../utils/form-error';
import useAuthStore from '../../zustand/stores/auth-store';
import TextButton from '../text-button';

type FormValues = {
    name: string
    lastname: string
    email: string
    password: string
}

const RegisterForm = () => {
    const { code } = useParams();

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        setError
    } = useForm<FormValues>({ resolver: zodResolver(registerSchema) })

    const navigate = useNavigate()
    const registerUser = useAuthStore((state) => state.register)

    const onSubmit = handleSubmit(async (data) => {
        if (!code) return navigate('/verification')

        const { name, lastname, email, password } = data
        const response = await registerUser(code, name, lastname, email, password)
        if (response.errorType === undefined) return navigate('/home')
        if (response.errorType !== 'form') return

        if (response.error.some(e => e.path === 'code')) return navigate('/verification')
        return setFormError(response.error, setError)
    })

    return <WelcomeForm
        title='Crear una cuenta'
        description='Por favor, completa tus datos'
        content={
            <>
                <HStack spacing={4} align='start'>
                    <FormControl isInvalid={errors.name !== undefined}>
                        <FormLabel>Nombre</FormLabel>
                        <Input type='text' {...register('name')} />

                        <FormErrorMessage>
                            {errors.name?.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.lastname !== undefined}>
                        <FormLabel>Apellido</FormLabel>
                        <Input type='text' {...register('lastname')} />

                        <FormErrorMessage>
                            {errors.lastname?.message}
                        </FormErrorMessage>
                    </FormControl>
                </HStack>

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
                <TextButton colorScheme='blue' isLoading={isSubmitting} onClick={onSubmit} type='submit'>
                    Registrarme
                </TextButton>

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