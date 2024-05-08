'use client'

import { useRouter } from "next/navigation";
import "@/app/globals.css"

export default function Header() {

	const router = useRouter();

    const signout = async () => {
		const res = await fetch("api/auth/logout", { method: "POST", body: "" });
		router.push("/");
	};

    return (
        <div className="sticky top-0 left-0 w-full bg-[#0c0c0c] text-white h-[6.4rem] flex items-center justify-between p-8">
            <div id="logo"/>
            <button className="bg-red-500 font-bold p-2 rounded-full" onClick={signout}>
				SIGN OUT
			</button>
        </div>
    );
}