import { Text, FormControl, Button, Input, FormErrorMessage } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from '../link';
import WelcomeForm from './welcome-form';
import { verificationSchema } from '../../schemas/auth.schema';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../zustand/stores/auth-store';
import setFormError from '../../utils/form-error';
import TextButton from '../text-button';

type FormValues = {
    code: string
}

const VerificationForm = () => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        setError
    } = useForm<FormValues>({ resolver: zodResolver(verificationSchema) })

    const navigate = useNavigate()
    const verifyAccessCode = useAuthStore((state) => state.verifyAccessCode)

    const onSubmit = handleSubmit(async (data) => {
        const { code } = data
        const response = await verifyAccessCode(code)
        if (response.errorType === undefined) return navigate(`/register/${code}`)
        if (response.errorType === 'form') return setFormError(response.error, setError)
    })

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
                <TextButton colorScheme='blue' isLoading={isSubmitting} onClick={onSubmit} type='submit'>
                    Continuar
                </TextButton>

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