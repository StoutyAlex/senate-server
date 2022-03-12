import '../styles/globals.css'
import React from 'react'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme, withDefaultColorScheme, DarkMode, Box, useColorModeValue } from '@chakra-ui/react'

const theme = extendTheme({}, withDefaultColorScheme({ colorScheme: 'red' }))

const SenateWebApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ChakraProvider theme={theme} >
    <DarkMode>
      <Box backgroundColor='gray.800' height='100vh'>
        <Component { ...pageProps }/>
      </Box>
    </DarkMode>
  </ChakraProvider>
)

export default SenateWebApp
