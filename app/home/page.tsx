'use client'

import { check } from "@/lib/test";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function Home() {
    const supabase = createClient()
    const router = useRouter()
	const signout = async () => {
		const res = await fetch("api/auth/logout", { method: "POST", body: "" });
        router.push('/')
	};

	return (
		<div>
			LOGIN SUCCESSFUL<br></br>
			<button className="bg-yellow-500" onClick={signout}>
				SIGN OUT
			</button>
            <button onClick={async () => {
                const val = await supabase.auth.getUser()
                console.log(val)
            }}>
                CHECK
            </button>
		</div>
	);
}
