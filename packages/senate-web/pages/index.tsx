import { NextPage } from 'next'
import { Container, forwardRef, VStack, HStack, Box, useColorModeValue, BoxProps, Button, Link } from "@chakra-ui/react"
import React from "react"
import { PrimaryHeading } from '../components/typeography'
import { DiscordButton } from '../components/button/discord-button'

export interface SectionProps extends BoxProps {
  opaque?: boolean;
}

export const Section = forwardRef<SectionProps, typeof Box>(({ opaque, ...props }, ref) => {
  const bg = useColorModeValue(opaque ? "white" : "whiteAlpha.900", opaque ? "black" : "blackAlpha.700")
  const borderColor = useColorModeValue('black', 'whiteAlpha.600')
  const color = useColorModeValue('black', 'white')

  return (
    <Box borderRadius="md" borderWidth="1px" p={4} boxShadow="md" borderColor={borderColor} background={bg} ref={ref} {...props} color={color}>
      {props.children}
    </Box>
  )
})


const Home: NextPage = () => {
  return (
    <Container p={4} maxW="container.xl">
      <VStack spacing={6} align="stretch">
      <Section>
        <VStack spacing={4} align="stretch">
          <Box>
            <HStack justifyContent="space-between">
              <PrimaryHeading>Senate Server</PrimaryHeading>
              <DiscordButton />
            </HStack>
          </Box>
        </VStack>
      </Section>
      </VStack>
    </Container>
  )
}

export default Home
