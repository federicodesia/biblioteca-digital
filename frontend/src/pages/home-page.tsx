import { Box, Heading, Image, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import DocumentItem from '../components/document-item';
import FeaturedDocument from '../components/featured-document';
import uploadsService from '../services/uploads-service';
import useMainStore from '../zustand/stores/main-store';

const HomePage = () => {

  const { latestDocuments } = useMainStore((state) => ({
    latestDocuments: state.documents.latest
  }))

  useEffect(() => {
    latestDocuments.fetch()
  }, [])

  const featuredDocument = latestDocuments.items.at(0)

  return <VStack align='stretch' spacing='12'>

    <VStack align='stretch' spacing='8'>
      <Heading size='md' fontWeight='600'>Documento destacado</Heading>
      {
        featuredDocument && <FeaturedDocument document={featuredDocument} />
      }
    </VStack>

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