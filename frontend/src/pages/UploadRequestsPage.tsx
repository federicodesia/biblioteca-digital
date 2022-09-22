import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react';
  import { useState } from 'react';
 
  
  export default function UploadRequestsPage() {
    const [showPassword, setShowPassword] = useState(false);
  
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Solicitar carga de libro
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              Los campos con * son obligatorios
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="autor" isRequired>
                    <FormLabel>Autor</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="fecha" isRequired>
                    <FormLabel>Fecha</FormLabel>
                    <Input  type="date"/>
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="titulo" isRequired>
                <FormLabel>Titulo</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl id="descripcion" isRequired>
                <FormLabel>Descripción</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl id="categoria" isRequired>
                <FormLabel>
                <select>
                <option>Categoria</option>
                <option>Naturales</option>
                <option>Matematicas</option>
                <option>Sociales</option> </select>
                </FormLabel>
                <InputGroup>
                 
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Solicitar
                </Button>
              </Stack>
              
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }
