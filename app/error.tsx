'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Error() {
    const router = useRouter()
    useEffect(() => {router.push('/')})
    return <div>No page exists</div>
}