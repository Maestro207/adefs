'use client'

import { useContext } from "react"
import { supabase } from "../client"
import { SessionProvider } from "../providers"
import { useRouter } from "next/navigation"

export default function Home() {
    const { session, setSession } = useContext(SessionProvider)      
    const router = useRouter()
    router.push('/')
    
    const signout = async () => {
        await supabase.auth.signOut()
        setSession(false)
      }
    

    return (
        <div>LOGIN SUCCESSFUL<br></br><button className="bg-yellow-500" onClick={signout}>SIGN OUT</button></div>
    )
}