import { Link } from "@chakra-ui/react"
import React from 'react'
import { FaDiscord } from "react-icons/fa"
import { BaseButton } from "./base"

const discordUrl = 'https://discord.gg/TJtHHPncgW'

export const DiscordButton = () => (
    <Link href={discordUrl} _focus={{ outline: 0 }} _hover={{ textDecoration: 'none' }}>
        <BaseButton as='a' bg='#7289da' color='white' _hover={{ bg: "#6a7fc9"}} _active={{ bg: "#7289da"}} leftIcon={<FaDiscord />}>
            Join the Discord
        </BaseButton>
    </Link>
)