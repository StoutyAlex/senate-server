import { forwardRef, Heading, HeadingProps, useColorModeValue } from "@chakra-ui/react";

export type PrimaryHeadingProps = HeadingProps;

export const PrimaryHeading = forwardRef<HeadingProps, typeof Heading>((props, ref) => (
  <Heading
    size="2xl"
    as="h1"
    fontWeight="semibold"
    fontFamily='sans-serif'
    color={useColorModeValue("red.600", "blue.200")}
    ref={ref}
    {...props}
  />
))
