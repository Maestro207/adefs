import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const supabase = createClient()
    const body = await req.json()

    const { data, error } = await supabase
    .from('module')
    .insert([
      { uuid: (await supabase.auth.getUser()).data.user?.id, url: body.url, filename: body.filename },
    ])
    .select()

    return NextResponse.json({ data, error })
}