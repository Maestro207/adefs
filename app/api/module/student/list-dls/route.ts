import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export async function GET(){
    const supabase = createClient()

    const { data, error } = await supabase
    .from('modules')
    .select('name, filename, url')

    return NextResponse.json({ data, error })
}