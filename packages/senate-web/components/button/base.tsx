import { Button, ButtonProps, forwardRef } from '@chakra-ui/react'
import React from 'react'

export const BaseButton = forwardRef<ButtonProps, typeof Button>((props, ref) => (
    <Button _focus={{ outline: 0 }} {...props} ref={ref} />
))
