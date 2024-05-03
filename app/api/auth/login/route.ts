import { supabase } from "@/util/client";

export async function POST(req: Request){
    const creds = await req.formData()
    const email = creds.get('email')
    const password = creds.get('password')

    if(typeof email != 'string' || typeof password != 'string' ){
        return Response.json({error : "Empty Shit bro"})
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })
    console.log({data, error})
    return Response.json({ data, error })
}