'use server'
import { createClient } from "@/utils/supabase/server";

const supabase = createClient()

export const check = async () => {
    const val = await supabase.auth.getUser()
    const msg = JSON.stringify(val)
    return msg
}