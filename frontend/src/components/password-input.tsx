import { IconButton, Input, InputGroup, InputProps, InputRightElement } from "@chakra-ui/react"
import { useState } from "react"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5"

const PasswordInput = (props: InputProps) => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    return (
        <InputGroup size='md'>
            <Input
                pr={16}
                type={show ? 'text' : 'password'}
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