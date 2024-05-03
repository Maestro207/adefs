import { supabase } from "@/util/client";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest){
    const creds = await req.formData()
    const email = creds.get('email')
    const password = creds.get('password')

    if(typeof email != 'string' || typeof password != 'string' ){
        return Response.json({error : "Empty Shit bro"})
    }

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    })

    return Response.json({ data, error })
}