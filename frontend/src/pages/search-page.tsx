import { Heading, VStack } from "@chakra-ui/react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import DocumentItem from "../components/document-item"
import useMainStore from "../zustand/stores/main-store"

const SearchPage = () => {
    const { q } = useParams()

    const results = useMainStore().documents.search.items
    useEffect(() => {
        if (!q) return
        useMainStore.getState().documents.search.update(q)
    }, [q])

    return <VStack align='stretch' spacing='12'>
        <Heading size='md' fontWeight='600'>
            Resultados
        </Heading>

        <VStack align='start' spacing='8'>
            {
                results.map((item, index) => {
                    return <DocumentItem
                        key={`${item.id} ${index}`}
                        document={item} />
                })
            }
        </VStack>
    </VStack>
}

export default SearchPage