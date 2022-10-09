import { Heading, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import DocumentItem from '../components/document-item';
import useMainStore from '../zustand/stores/main-store';

const HomePage = () => {

  const { latestDocuments } = useMainStore((state) => ({
    latestDocuments: state.documents.latest
  }))

  useEffect(() => {
    latestDocuments.fetch()
  }, [])

  return <VStack align='stretch' spacing='16'>

    <VStack align='start' spacing='8'>
      <Heading size='md' fontWeight='600'>Últimas publicaciones</Heading>

      <VStack align='start' spacing='10'>
        {
          latestDocuments.items.map((item, index) => {
            return <DocumentItem
              key={`${item.id} ${index}`}
              document={item} />
          })
        }
      </VStack>
    </VStack>
  </VStack>
}

export default HomePage