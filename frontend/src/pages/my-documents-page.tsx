import { Button, Heading, VStack, HStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import DocumentItem from '../components/document-item';
import CreateUploadRequestModal from '../components/modals/create-upload-request';
import TextButton from '../components/text-button';
import UplaodRequestItem from '../components/upload-request-item';
import useUserStore from '../zustand/stores/user-store';

const MyDocumentsPage = () => {

  const { uploadRequests, fetchUploadRequests, documents, fetchDocuments } = useUserStore((state) => ({
    uploadRequests: state.uploadRequests.items,
    fetchUploadRequests: state.uploadRequests.fetch,
    documents: state.documents.items,
    fetchDocuments: state.documents.fetch
  }))

  useEffect(() => {
    fetchUploadRequests()
    fetchDocuments()
  }, [])

  return <VStack align='stretch' spacing='16'>

    {
      uploadRequests.length > 0 && <VStack align='start' spacing='8'>
        <HStack w='full' justify='space-between'>
          <Heading size='md' fontWeight='600'>Solicitudes de carga</Heading>
          <CreateUploadRequestModal
            trigger={
              <TextButton flexShrink='0' leftIcon={<FiPlus />} variant='outline'>
                Solicitar carga
              </TextButton>
            } />
        </HStack>

        <HStack spacing='8'>
          {
            uploadRequests.map((item, index) => {
              return <UplaodRequestItem
                key={`${item.id} ${index}`}
                uploadRequest={item} />
            })
          }
        </HStack>
      </VStack>
    }

    <VStack align='start' spacing='8'>
      <HStack w='full' justify='space-between'>
        {
          uploadRequests.length === 0 || documents.length > 0
            ? <Heading size='md' fontWeight='600'>Mis documentos</Heading>
            : <div />
        }

        {
          uploadRequests.length === 0 && <CreateUploadRequestModal
            trigger={
              <TextButton flexShrink='0' leftIcon={<FiPlus />} variant='outline'>
                Solicitar carga
              </TextButton>
            } />
        }
      </HStack>

      <VStack align='start' spacing='10'>
        {
          documents.map((item, index) => {
            return <DocumentItem
              key={`${item.id} ${index}`}
              document={item} />
          })
        }
      </VStack>
    </VStack>
  </VStack>
}

export default MyDocumentsPage