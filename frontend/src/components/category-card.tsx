import { Box, Image, Text, VStack } from "@chakra-ui/react"
import { Category } from "../interfaces"
import uploadsService from "../services/uploads-service"
import Link from "./link"

interface Props {
    category: Category
}

const CategoryCard = ({ category }: Props) => {
    const { id, name, image } = category

    return <Link to={`/category/${id}`}>
        <Box
            h='135px'
            rounded='lg'
            overflow='hidden'
            p='8'
            bg='gray'
            position='relative'
            cursor='pointer'
            role='group'>

            <Image
                position='absolute'
                top='0'
                left='0'
                right='0'
                bottom='0'
                h='full'
                w='full'
                objectFit='cover'
                filter='blur(0px)'
                opacity='0.5'
                _groupHover={{
                    opacity: '0.6',
                    transform: 'scale(1.01)'
                }}
                transition='all ease 300ms'

                src={uploadsService.getCategoryCardImage(image)} />

            <VStack position='absolute' top='0' left='0' right='0' bottom='0' align='center' justify='center'>
                <Text
                    fontWeight='semibold'
                    color='white'
                    textShadow='black 0px 0px 24px'
                    p='8'
                    textAlign='center'
                    noOfLines={1}>
                    {name}
                </Text>
            </VStack>
        </Box>
    </Link>
}

export default CategoryCard