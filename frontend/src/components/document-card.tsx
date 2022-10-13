import { Image, ImageProps } from "@chakra-ui/react"
import uploadsService from "../services/uploads-service"

interface Props extends ImageProps {
    fileName?: string
}

const DocumentCard = ({ fileName, ...rest }: Props) => {
    return <Image
        h={{ base: '150px', md: '200px' }}
        w={{ base: '112px', md: '150px' }}
        bg='gray.200'
        rounded='lg'
        borderStyle='solid'
        borderWidth='1px'
        borderColor='gray.200'
        objectFit='cover'
        src={fileName ? uploadsService.getPreview(fileName) : undefined}
        {...rest} />
}

export default DocumentCard