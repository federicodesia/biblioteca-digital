import { Text, FormControl, FormLabel, Input, Button, HStack, FormErrorMessage } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from '../link';
import PasswordInput from '../password-input';
import WelcomeForm from './welcome-form';
import { registerSchema } from '../../schemas/auth.schema';

type FormValues = {
    name: string
    lastname: string
    email: string
    password: string
}

const RegisterForm = () => {
    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(registerSchema) })
    const onSubmit = handleSubmit((data) => console.log(data))

    return <WelcomeForm
        title='Crear una cuenta'
        description='Por favor, completa tus datos'
        content={
            <>
                <HStack spacing={4}>
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
                <Button colorScheme='blue' isLoading={isSubmitting} onClick={onSubmit} type='submit'>
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