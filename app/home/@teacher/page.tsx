"use client";

import File from "@/components/FileCard";
import { createClient } from "@/utils/supabase/client";
import { PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Teacher() {
	const supabase = createClient();

	const inputFileRef = useRef<HTMLInputElement>(null);
	const [blob, setBlob] = useState<PutBlobResult | null>(null);
	const [uploads, setUploads] = useState<null | [] | [
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
			await fetch("/api/module/list-ups", { method: "GET" })
		).json();

		if (!res.error) {
			setUploads(res.data);
		}else{
			setUploads([])
		}
		console.log()
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
			<div className="p-8 border-t-[1px] border-gray-400">
				<h1 className="text-3xl border-gray-800">Upload a Module (pdf only!)</h1>
			</div>
			<form
				onSubmit={async (event) => {
					event.preventDefault();
					msg.current = "Uploading";

					if (!inputFileRef.current?.files) {
						throw new Error("No file selected");
					}

					const file = inputFileRef.current.files[0];

					try {
						const newBlob = await upload(file.name, file, {
							access: "public",
							handleUploadUrl: "/api/module/upload",
						});

						if (newBlob) {
							const data = {
								url: newBlob.url,
								filename: file.name,
								name: user
							}
							const res = await fetch("/api/module/update", {
								body: JSON.stringify(data),
								method: "POST",
							});
							setBlob(newBlob);
							const updated = uploads
							updated?.push((data as never));
							setUploads(updated);
							msg.current = "Uploaded!";	
						} else {
							msg.current = "Upload Failed!";
						}
					} catch (error) {
						if((error as Error).message == "Vercel Blob: Failed to  retrieve the client token"){
							msg.current =
							"Upload Failed, Incorrect file type";
						}else{
							msg.current =
								"Upload Failed, the file already exists or you are not authorized";
						}
						console.log(msg.current)
					}finally{
						setTimeout(() => {
							msg.current = "";
						}, 5000);
					}
				}}
			>
				<input
					name="file"
					ref={inputFileRef}
					type="file"
					className="bg-white/[0.2] border-gray-200 border-[1px] p-2 m-4 rounded-2xl"
					required
				/>
				<button
					type="submit"
					className="py-2 px-4 rounded-full bg-red-500 text-white border-gray-200 border-[1px]"
					disabled={msg.current == "Uploading" ? true : false}
				>
					Upload
				</button>
			</form>
			<div className="text-xl font-light p-8">{msg.current}</div>
			<div className="border-t-2 border-gray-400">
				<h1 className="text-3xl p-8 text-gray-800">Your Modules</h1>
				<div className="flex flex-wrap justify-center items-center gap-8 m-2 p-2 lg:m-8 lg:p-8 rounded-3xl border-2 border-gray-200">
					{uploads == null
						? "Loading"
						: uploads.length == 0 ? "No Modules" : uploads.map((file) => {
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
