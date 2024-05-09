'use client'

import { useRouter } from "next/navigation";
import "@/app/globals.css"
import { useState } from "react";

export default function Header() {

	const router = useRouter();
    const [loading, setLoading] = useState(false)
    const signout = async () => {
		const res = await fetch("api/auth/logout", { method: "POST", body: "" });
		router.push("/");
	};

    return (
        <div className="sticky top-0 left-0 w-[100vw] bg-[#0c0c0c] text-white h-[6.4rem] flex items-center justify-between p-8">
            <div id="logo"/>
            <button className="bg-red-500 font-bold p-2 rounded-full w-[8em] flex justify-center items-center fill-white" onClick={() => {
                setLoading(true)
                signout()
            }}
            disabled={loading}
            >
				{loading ? <span id="loading">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="16px"
									viewBox="0 -960 960 960"
									width="16px"
								>
									<path d="M320-160h320v-120q0-66-47-113t-113-47q-66 0-113 47t-47 113v120Zm160-360q66 0 113-47t47-113v-120H320v120q0 66 47 113t113 47ZM160-80v-80h80v-120q0-61 28.5-114.5T348-480q-51-32-79.5-85.5T240-680v-120h-80v-80h640v80h-80v120q0 61-28.5 114.5T612-480q51 32 79.5 85.5T720-280v120h80v80H160Zm320-80Zm0-640Z" />
								</svg>
							</span> : "Sign Out"}
			</button>
        </div>
    );
}