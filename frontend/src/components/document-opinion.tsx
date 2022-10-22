import { Text, HStack, IconButton } from "@chakra-ui/react"
import { useMemo } from "react"
import { DocumentData } from "../interfaces"
import useAuthStore from "../zustand/stores/auth-store"
import useMainStore from "../zustand/stores/main-store"

interface Props {
    document: DocumentData,
    onUpdated: (updated: DocumentData) => void
}

const DocumentOpinion = ({ document, onUpdated }: Props) => {
    const { id, Opinion } = document

    const user = useAuthStore((state) => state.user)
    const hasLike = useMemo(() => {
        if (!user) return
        return Opinion.find(opinion => opinion.userId === user.id)?.like
    }, [Opinion, user])

    const setLike = async (like?: boolean) => {
        const response = await useMainStore.getState().documents.likeOrDislike(id, like)
        if (!response.errorType) onUpdated(response.data)
    }

    const onLike = () => {
        if (hasLike === true) return setLike(undefined)
        return setLike(true)
    }

    const onDislike = () => {
        if (hasLike === false) return setLike(undefined)
        return setLike(false)
    }

    return <HStack
        rounded='xl'
        p='8'
        border='1px' borderColor='gray.200'
        justify='space-between'>
        <Text noOfLines={2} fontSize='md' fontWeight='bold'>
            ¿Ya lo leíste? ¿Qué te pareció?
        </Text>

        <HStack>
            <OpinionButton
                label='Me gusta'
                icon='👍'
                isSelected={hasLike === true}
                onClick={onLike} />

            <OpinionButton
                label='No me gusta'
                icon='👎'
                isSelected={hasLike === false}
                onClick={onDislike} />
        </HStack>
    </HStack>
}

const OpinionButton = ({ icon, label, isSelected, onClick }: {
    icon: string
    label: string
    isSelected: boolean
    onClick: () => void
}) => {
    return <IconButton
        aria-label={label}
        icon={<Text>{icon}</Text>}
        colorScheme='gray'
        bg={isSelected ? 'gray.300' : undefined}
        w='86px'
        rounded='full'
        onClick={onClick} />
}

export default DocumentOpinion