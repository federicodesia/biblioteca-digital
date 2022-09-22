import { Box, BoxProps } from "@chakra-ui/react"

const Content = ({ ...props }: BoxProps) => {
    return <Box bg='white' p='8' rounded='xl' border='1px' borderColor='gray.200' {...props} />
}

export default Content