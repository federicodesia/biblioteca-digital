import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'
import { breakpoints } from './breakpoints'

const theme = extendTheme(
    {
        breakpoints,
        fonts: {
            heading: `Work Sans, system-ui, sans-serif`,
            body: `Inter, system-ui, sans-serif`,
        }
    },
    withDefaultColorScheme({ colorScheme: 'blue' })
)

export default theme