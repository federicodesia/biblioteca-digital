import { Heading, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import CategoryResultsHeader from "../components/category-results-header"
import DocumentItem from "../components/document-item"
import { Category } from "../interfaces"
import { DocumentsResponse } from "../services/documents-service"
import useMainStore from "../zustand/stores/main-store"

const CategoryPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [category, setCategory] = useState<Category | undefined>(undefined)
    const [result, setResult] = useState<DocumentsResponse | undefined>(undefined)

    const fetchDocuments = async () => {
        if (!id) return navigate('/home')
        const parsedId = parseInt(id)

        const categoryResponse = await useMainStore.getState().categories.get(parsedId)
        if (categoryResponse.errorType) return navigate('/home')

        const category = categoryResponse.data
        setCategory(category)

        const reuslt = await useMainStore.getState().documents.fetch({
            filterByCategoryId: category.id
        })
        setResult(reuslt)
    }

    useEffect(() => {
        fetchDocuments()
    }, [])

    if (!result) return <div />

    return <VStack align='stretch' spacing='12'>
        <Heading size='md' fontWeight='600'>
            Resultados
        </Heading>

        {
            category && <CategoryResultsHeader
                category={category}
                resultsCount={!result.errorType ? result.data.documents.length : 0} />
        }

        {
            !result.errorType
                ? <VStack align='start' spacing='8'>
                    {
                        result.data.documents.map((item, index) => {
                            return <DocumentItem
                                key={`${item.id} ${index}`}
                                document={item} />
                        })
                    }
                </VStack>
                : <div />
        }
    </VStack>
}

export default CategoryPage