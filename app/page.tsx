'use client'

import Sample from "./Sample";
import { model } from "./models"
import { supabase } from "./client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { SessionProvider } from "./providers";

export default function Home() {
  
  const content: Array<model> = [{
    'title' : "ABAKADA",
    'desc': "BURAT",
  },
  {
    'title' : "AIDJOA*W",
    'desc': "DROGA",
  },{
    'title' : "ABAKADA",
    'desc': "BURAT",
  }]
  
  const [testd, setData] = useState('')

  const getData = async () => {

    let { data: notes, error } = await supabase
    .from('test')
    .select('*')

    setData(JSON.stringify(notes))
    
  }
  const signout = async () => {
    await supabase.auth.signOut()
    let {data, error} = await supabase.auth.getSession()
    if(data){
      updateSession(false)
    }
  }
  const isSession = async () => {
    let {data, error} = await supabase.auth.getSession()
    console.log(data["session"])
    if(data["session"]){
      updateSession(true)
    }
  }
  const getURL = () => {
    let url =
      process.env.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process.env.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      'http://localhost:3000/home'
    // Make sure to include `https://` when not localhost.
    url = url.includes('http') ? url : `https://${url}`
    // Make sure to include a trailing `/`.
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
    console.log(process.env.NEXT_PUBLIC_SITE_URL)
    return url
  }
  const withGoogle = async () => {
    const {data, error} = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: getURL()
      }
    })
    console.log(data)
  }

  const [session, updateSession] = useState(false)
  const setSession = (val: boolean) => {
    updateSession(val)
  }

  useEffect(() => {
    console.log(session)
    if(session){
      redirect('/home')
    }
  }, [session])

  return(
    <main className="gap-8">
      <SessionProvider.Provider value={{
        session,
        setSession
      }}>
        <section>
          ASDASD
        </section>
          {testd}<br></br>
          <button className="bg-green-500" onClick={() => {
            isSession()
            getData()
          }}>UPDATE</button><br></br>
          <button className="bg-red-100" onClick={signout}>SGN OUT</button>
        <section>
          adsADaDASd
        </section>
        <button onClick={withGoogle}>SIGN IN WITH GOOGLE</button>
      </SessionProvider.Provider>
    </main>
  );
}
