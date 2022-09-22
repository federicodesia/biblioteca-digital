import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'
import { breakpoints } from './breakpoints'

export const primaryColorScheme = 'teal'
export const secondaryColorScheme = 'cyan'

const theme = extendTheme(
    {
        breakpoints,
        fonts: {
            heading: `Work Sans, system-ui, sans-serif`,
            body: `Inter, system-ui, sans-serif`,
        },
        components: {
            Badge: {
                baseStyle: {
                    rounded: 'xl',
                    px: '2',
                    py: '2px',
                    fontWeight: '600',
                    textTransform: 'lowercase',
                }
            }
        }
    },
    withDefaultColorScheme({ colorScheme: primaryColorScheme })
)

export default theme