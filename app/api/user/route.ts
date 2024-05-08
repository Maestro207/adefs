import { createClient } from "@/utils/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(){
    const supabase = createClient()

    const { data, error } = await supabase
    .from('users')
    .select('role, name')
    .eq('uuid', (await supabase.auth.getUser()).data.user?.id)

    return NextResponse.json({ data, error })
}