import { Button, Checkbox, FormControl, FormErrorMessage, HStack, SimpleGrid, VStack } from "@chakra-ui/react"
import { useEffect } from "react"
import { Controller, UseFormReturn } from "react-hook-form"
import { CreateUploadRequestFormValues } from "."
import useMainStore from "../../../zustand/stores/main-store"
import EmptySpace from "../../empty-space"

interface Props {
    form: UseFormReturn<CreateUploadRequestFormValues, any>
    onPrevious: () => void
    onSubmit: () => void
}

const SelectCategoriesForm = ({ form, onPrevious, onSubmit }: Props) => {
    const { formState: { errors }, control, getFieldState } = form

    const categories = useMainStore((state) => state.categories.items)
    useEffect(() => {
        useMainStore.getState().categories.fetch()
    }, [])

    return <VStack spacing={10} p={6} pt={12} align='stretch'>
        <EmptySpace
            src='choose.svg'
            title='Selecciona las categorías'
            description='Permite que otros usuarios encuentren más fácilmente tu documento filtrando por categoría' />

        <VStack align='stretch' px='4'>
            <SimpleGrid spacing='3' columns={2}>
                {
                    categories.map((category, index) => {
                        const { name } = category

                        return <Controller
                            key={`${name} ${index}`}
                            control={control}
                            name={`categories.${name}`}
                            render={({ field: { onChange, value, ref } }) => {
                                return <Checkbox
                                    onChange={onChange}
                                    ref={ref}
                                    isChecked={value}>

                                    {category.name}
                                </Checkbox>
                            }} />
                    })
                }
            </SimpleGrid>

            <FormControl isInvalid={errors.categories !== undefined}>
                <FormErrorMessage>
                    {getFieldState('categories').error?.message}
                </FormErrorMessage>
            </FormControl>
        </VStack>

        <HStack justify='end' spacing={3}>
            <Button variant='ghost' colorScheme='gray' onClick={onPrevious}>Volver</Button>
            <Button onClick={onSubmit}>Continuar</Button>
        </HStack>
    </VStack>
}

export default SelectCategoriesForm