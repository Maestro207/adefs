"use client";

import File from "@/components/UploadCard";
import { createClient } from "@/utils/supabase/client";
import { PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";

export default function Teacher() {
	const supabase = createClient();
	const router = useRouter()
	const inputFileRef = useRef<HTMLInputElement>(null);
	const [blob, setBlob] = useState<PutBlobResult | null>(null);
	const [message, setMessage] = useState("");
	const [uploads, setUploads] = useState<
		| null
		| []
		| [
				{
					filename: string;
					name: string;
					url: string;
				}
		  ]
		| {
				filename: string;
				name: string;
				url: string;
		  }[]
	>(null);
	const [user, setUser] = useState("");

	const deleteFile = async (url: string, set: Dispatch<SetStateAction<boolean>>) => {
		set(true)
		const res = await fetch("/api/module/delete", {
			method: "DELETE",
			body: JSON.stringify({
				url: url,
			}),
		});
		const updated = uploads?.filter((val) => {
			return val.url != url;
		});
		if (typeof updated != "undefined") {
			setUploads(updated);
			set(false)
		}
	};

	const getUploads = useCallback(async () => {
		const res = await (
			await fetch("/api/module/list-ups", { method: "GET" })
		).json();

		if (!res.error) {
			setUploads(res.data);
		} else {
			setUploads([]);
		}

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
		if(!supabase.auth.getUser()){
			router.push('/')
		}
	}, [supabase]);

	return (
		<main className="bg-none h-[100vh] w-auto p-8 z-10	">
			<span className="text-[4em] flex flex-wrap font-light relative w-auto h-auto">
				<h1 className=" flex flex-row flex-wrap align-middle capitalize gap-x-3 h-auto">
					<span>Welcome!</span>
					<span className=" font-bold flex justify-center">
						
						{user == "" ? (
							<span
								id="loading"
								className="flex justify-center h-[24px]"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="#222222"
								>
									<path d="M320-160h320v-120q0-66-47-113t-113-47q-66 0-113 47t-47 113v120Zm160-360q66 0 113-47t47-113v-120H320v120q0 66 47 113t113 47ZM160-80v-80h80v-120q0-61 28.5-114.5T348-480q-51-32-79.5-85.5T240-680v-120h-80v-80h640v80h-80v120q0 61-28.5 114.5T612-480q51 32 79.5 85.5T720-280v120h80v80H160Zm320-80Zm0-640Z" />
								</svg>
							</span>
						) : (
							user
						)}
					</span>
				</h1>
			</span>
			<div className="p-8 border-t-[1px] border-gray-400">
				<h1 className="text-3xl border-gray-800">Upload a Module</h1>
			</div>
			<div className="flex flex-col w-auto justify-center flex-wrap h-auto p-4 items-center">
				<form
					onSubmit={async (event) => {
						event.preventDefault();

						setMessage("Uploading");

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
									name: user,
								};
								const res = await fetch("/api/module/update", {
									body: JSON.stringify(data),
									method: "POST",
								});
								setBlob(newBlob);
								const updated = uploads;
								updated?.push(data as never);
								setUploads(updated);
								setMessage("File Uploaded");
							} else {
								setMessage("Upload Failed");
							}
						} catch (error) {
							if (
								(error as Error).message ==
								"Vercel Blob: Failed to  retrieve the client token"
							) {
								setMessage("Upload Failed, Incorrect file type");
							} else {
								setMessage(
									"Upload Failed, the file already exists or you are not authorized"
								);
							}
						} finally {
							setTimeout(() => {
								setMessage("");
							}, 5000);
						}
					}}
					className="flex justify-center flex-col items-center"
				>
					<input
						name="file"
						ref={inputFileRef}
						type="file"
						className="bg-white/[0.2] border-gray-200 border-[1px] p-2 m-4 rounded-2xl"
						accept=".pdf, .docx, application/pdf, application/msword,
					application/vnd.openxmlformats-officedocument.wordprocessingml.document"
						required
					/>
					<button
						type="submit"
						className="py-2 w-[10vw] px-4 rounded-full bg-red-500 text-white border-gray-200 border-[1px]"
						disabled={message == "Uploading" ? true : false}
					>
						Upload
					</button>
				</form>
				<div className="text-xl font-light py-2 pl-4 pr-2 h-[2.5rem]">
					<span
						id={`${message == "Uploading" ? "loading" : ""}`}
						className="flex w-full items-center justify-center "
					>
						{message == "Uploading" ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24px"
								viewBox="0 -960 960 960"
								width="24px"
								fill="#222222"
							>
								<path d="M320-160h320v-120q0-66-47-113t-113-47q-66 0-113 47t-47 113v120Zm160-360q66 0 113-47t47-113v-120H320v120q0 66 47 113t113 47ZM160-80v-80h80v-120q0-61 28.5-114.5T348-480q-51-32-79.5-85.5T240-680v-120h-80v-80h640v80h-80v120q0 61-28.5 114.5T612-480q51 32 79.5 85.5T720-280v120h80v80H160Zm320-80Zm0-640Z" />
							</svg>
						) : (
							message
						)}
					</span>
				</div>
			</div>
			<div className="border-t-2 border-gray-400">
				<h1 className="text-3xl p-8 text-gray-800">Your Modules</h1>
				<div className="flex flex-wrap justify-center items-center gap-8 p-2 lg:m-8 lg:p-8 rounded-3xl border-2 bg-slate-100 border-gray-200">
					{uploads == null ? (
						<span
							id="loading"
							className="flex w-full items-center justify-center "
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24px"
								viewBox="0 -960 960 960"
								width="24px"
								fill="#222222"
							>
								<path d="M320-160h320v-120q0-66-47-113t-113-47q-66 0-113 47t-47 113v120Zm160-360q66 0 113-47t47-113v-120H320v120q0 66 47 113t113 47ZM160-80v-80h80v-120q0-61 28.5-114.5T348-480q-51-32-79.5-85.5T240-680v-120h-80v-80h640v80h-80v120q0 61-28.5 114.5T612-480q51 32 79.5 85.5T720-280v120h80v80H160Zm320-80Zm0-640Z" />
							</svg>
						</span>
					) : uploads.length == 0 ? (
						"No Modules"
					) : (
						uploads.map((file) => {
							return (
								<File
									key={file.url}
									name={file.name}
									url={file.url}
									filename={file.filename}
									callback={deleteFile}
								/>
							);
						})
					)}
				</div>
			</div>
		</main>
	);
}
