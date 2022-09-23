import { IconButton, Input, InputGroup, InputProps, InputRightElement } from "@chakra-ui/react"
import { useState } from "react"
import { UseFormRegisterReturn } from "react-hook-form"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5"

interface Props extends InputProps {
    register?: UseFormRegisterReturn
}

const PasswordInput = ({ register, ...props }: Props) => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    return (
        <InputGroup size='md'>
            <Input
                pr={16}
                type={show ? 'text' : 'password'}
                {...register}
                {...props}
            />
            <InputRightElement h='full'>
                <IconButton
                    aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    variant='ghost'
                    colorScheme='gray'
                    onClick={handleClick}
                    icon={
                        show
                            ? <IoEyeOutline />
                            : <IoEyeOffOutline />
                    } />
            </InputRightElement>
        </InputGroup>
    )
}

export default PasswordInput