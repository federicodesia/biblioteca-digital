import { UseFormSetError } from "react-hook-form"
import { FormError } from "../services/dto"

const setFormError = (
    formError: FormError[],
    setError: UseFormSetError<any>
) => {
    formError.forEach(item => {
        const { path, message } = item
        setError(
            path,
            {
                type: 'custom',
                message: message
            }
        )
    })
}

export default setFormError