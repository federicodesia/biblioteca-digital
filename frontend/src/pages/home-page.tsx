import { Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import CategoryCard from '../components/category-card';
import DocumentItem from '../components/document-item';
import FeaturedDocument from '../components/featured-document';
import useMainStore from '../zustand/stores/main-store';
import CustomCarousel from '../components/custom-carousel';

const HomePage = () => {

  const { categories, latestDocuments, mostDownloaded } = useMainStore((state) => ({
    categories: state.categories,
    latestDocuments: state.documents.latest,
    mostDownloaded: state.documents.mostDownloaded
  }))

  useEffect(() => {
    categories.fetch()
    latestDocuments.fetch()
    mostDownloaded.fetch()
  }, [])

  return <VStack align='stretch' spacing='12'>

    <VStack align='stretch' spacing='8'>
      <Heading size='md' fontWeight='600'>Documento destacado</Heading>
      <CustomCarousel items={mostDownloaded.items.map((featuredDocument) => {
        return <FeaturedDocument document={featuredDocument} />
      })} />
    </VStack>

    <VStack align='start' spacing='8'>
      <Heading size='md' fontWeight='600'>Últimas publicaciones</Heading>

      <VStack align='start' spacing='10'>
        {
          latestDocuments.items.map((item, index) => {
            return <DocumentItem
              key={`LatestDocument ${item.id} ${index}`}
              document={item} />
          })
        }
      </VStack>
    </VStack>

    <VStack align='stretch' spacing='8'>
      <Heading size='md' fontWeight='600'>Categorías</Heading>

      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing='4' >
        {
          categories.items.map((category, index) => {
            return <CategoryCard
              key={`Category ${category.name} ${index}`}
              category={category} />
          })
        }
      </SimpleGrid>
    </VStack>
  </VStack>
}

export default HomePage