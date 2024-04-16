'use client'

import { useContext, useEffect } from "react"
import { supabase } from "../client"
import { SessionProvider } from "../providers"
import { sessionContextType } from "../models"
import { redirect } from "next/navigation"
import { useRouter } from "next/router"

export default function Student() {
    const { session, useSession } = useContext(SessionProvider)      
    const signout = async () => {
        await supabase.auth.signOut()
        useSession(false)
        console.log(session)
        redirect("/")
      }
    
    return (
        <div>LOGIN SUCCESSFUL<br></br><button className="bg-yellow-500" onClick={signout}>STUDENT</button></div>
    )
}