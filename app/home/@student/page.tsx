"use client";

import File from "@/components/FileCard";
import { createClient } from "@/utils/supabase/client";
import { PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Student() {
	const supabase = createClient();

	const inputFileRef = useRef<HTMLInputElement>(null);
	const [downloads, setDownloads] = useState<null | [] | [
		{
			filename: string,
			name: string,
			url: string
		}
	]>(null);
	const [user, setUser] = useState("");
	const msg = useRef("");

	const getUploads = useCallback(async () => {
		const res = await (
			await fetch("/api/module/list-dls", { method: "GET" })
		).json();
        console.log(res)
		if (!res.error) {
			setDownloads(res.data);
		} else {
			setDownloads([]);
		}
		console.log();
	}, [supabase]);

	const getUser = useCallback(async () => {
		const res = await (await fetch("/api/user", { method: "GET" })).json();
		if (!res.error) {
			setUser(res.data[0].name);
		}
	}, [supabase]);

	useEffect(() => {
		getUploads();
		getUser();
	}, [supabase]);

	return (
		<main className="bg-slate-50 h-[100vh] p-8 ">
			<span className="text-[4em] font-light block relative w-auto h-auto">
				<h1 className="">Welcome! {user}</h1>
			</span>
			<div className="border-t-2 border-gray-400">
				<h1 className="text-3xl p-8 text-gray-800">Your Modules</h1>
				<div className="flex gap-8 m-8 p-8 rounded-3xl border-2 border-gray-200">
					{downloads == null
						? "Loading"
						: downloads.length == 0
						? "No Modules"
						: downloads.map((file) => {
								return (
									<File
										key={file.url}
										name={file.name}
										url={file.url}
										filename={file.filename}
									/>
								);
						  })}
				</div>
			</div>
		</main>
	);
}
