import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = { mono: `'Menlo', monospace` }

const breakpoints = createBreakpoints({
    sm: '40em',
    md: '52em',
    lg: '64em',
    xl: '80em',
})

const theme = extendTheme(
    {
        semanticTokens: {
            colors: {
                error: "red.500",
                success: "green.500",
                link: "blue.400"
            }
        }
    },
    withDefaultColorScheme({
        colorScheme: "facebook"
    }),
    {
        config: {
            initialColorMode: "dark"
        },
        colors: {
            black: '#16161D',
        },
        fonts,
        breakpoints,
        text: {
            default: "white"
        }
    })

export default theme