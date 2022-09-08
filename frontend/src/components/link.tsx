import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from 'react-router-dom';

const Link = (props: ChakraLinkProps & ReactRouterLinkProps) => {
    return <ChakraLink as={ReactRouterLink} color='blue.400' {...props} />
}

export default Link