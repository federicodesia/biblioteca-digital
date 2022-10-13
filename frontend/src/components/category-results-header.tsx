import { Box, Heading, Image, Text, VStack } from "@chakra-ui/react"
import { Category } from "../interfaces"
import uploadsService from "../services/uploads-service"
import pluralize from "../utils/pluralize"

interface Props {
    category: Category
    resultsCount: number
}

const CategoryResultsHeader = ({ category, resultsCount }: Props) => {
    return <Box h='250px' rounded='xl' overflow='hidden' position='relative'>
        <Image
            src={uploadsService.getCategoryResultsImage(category.image)}
            w='full'
            h='full'
            objectFit='cover'
            pointerEvents='none'
            position='absolute'
            top='0' left='0' bottom='0' right='0'
            filter='blur(100px)' />

        <Image
            src={uploadsService.getCategoryResultsImage(category.image)}
            w='full'
            h='full'
            objectFit='cover'
            objectPosition='bottom'
            pointerEvents='none'
            position='absolute'
            top='0' left='0' bottom='0' right='0'
            opacity='0.75' />

        <VStack
            position='absolute'
            top='0' left='0' bottom='0' right='0'
            justify='center'
            p='8'
            color='whiteAlpha.900'>

            <Heading size='md' fontWeight='600'>
                {`Documentos de ${category.name}`}
            </Heading>
            <Text>
                {`Se ${pluralize(resultsCount, 'encontró', 'encontraron', false)} ${pluralize(resultsCount, 'resultado')}`}
            </Text>
        </VStack>
    </Box>
}

export default CategoryResultsHeader