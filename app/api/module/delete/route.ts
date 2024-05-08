import { createClient } from "@/utils/supabase/server";
import { del } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest){
    const supabase = createClient()
    const body = await req.json()

    await del(body.url);
     
    const { error } = await supabase
      .from('module')
      .delete()
      .eq('url', body.url)
              

    return NextResponse.json(error)
}