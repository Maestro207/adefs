import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const supabase = createClient()
    const form = await req.formData()
    const email = form.get('email')
    const password = form.get('password')

    if(typeof email != 'string' || typeof password != 'string' ){
        return Response.json({error : "Empty Shit bro"})
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })

    return NextResponse.json({ data, error })
}