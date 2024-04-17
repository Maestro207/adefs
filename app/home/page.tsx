'use client'

import { useContext } from "react"
import { supabase } from "@/util/client"
import { SessionProvider } from "@/util/providers"
import { useRouter } from "next/navigation"

export default function Home() {
    const { session, setSession } = useContext(SessionProvider)      
    const router = useRouter()
    
    
    const signout = async () => {
        await supabase.auth.signOut()
        setSession(false)
        router.push('/')
      }
    

    return (
        <div>LOGIN SUCCESSFUL<br></br><button className="bg-yellow-500" onClick={signout}>SIGN OUT</button></div>
    )
}
