import { Button, Heading, VStack, HStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import DocumentCard from '../components/document-card';
import CreateUploadRequestModal from '../components/modals/create-upload-request';
import UplaodRequestCard from '../components/upload-request-card';
import useMainStore from '../zustand/stores/main-store';

const MyDocumentsPage = () => {

  const { uploadRequests, fetchUploadRequests, documents, fetchDocuments } = useMainStore((state) => ({
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
              <Button flexShrink='0' leftIcon={<FiPlus />} variant='outline'>
                Solicitar carga
              </Button>
            } />
        </HStack>

        <HStack spacing='8'>
          {
            uploadRequests.map((item, index) => {
              return <UplaodRequestCard
                key={`${item.id} ${index}`}
                uploadRequest={item} />
            })
          }
        </HStack>
      </VStack>
    }

    <VStack align='start' spacing='8'>
      <HStack w='full' justify='space-between'>
        <Heading size='md' fontWeight='600'>Mis documentos</Heading>
        {
          uploadRequests.length === 0 && <CreateUploadRequestModal
            trigger={
              <Button flexShrink='0' leftIcon={<FiPlus />} variant='outline'>
                Solicitar carga
              </Button>
            } />
        }
      </HStack>

      <VStack align='start' spacing='10'>
        {
          documents.map((item, index) => {
            return <DocumentCard
              key={`${item.id} ${index}`}
              document={item} />
          })
        }
      </VStack>
    </VStack>
  </VStack>
}

export default MyDocumentsPage