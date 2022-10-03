import { Button, Heading, VStack, HStack } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import CreateUploadRequestModal from '../components/modals/create-upload-request';

const MyDocumentsPage = () => {
  return <VStack align='stretch' spacing='8'>

    <Heading size='md' fontWeight='600'>
      Mis documentos
    </Heading>

    <HStack spacing='4' justify='end'>
      <CreateUploadRequestModal
        trigger={
          <Button flexShrink='0' leftIcon={<FiPlus />} variant='outline'>
            Solicitar carga
          </Button>
        } />
    </HStack>
  </VStack>
}

export default MyDocumentsPage