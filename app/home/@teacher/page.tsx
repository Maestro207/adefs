"use client";

import { check } from "@/lib/test";
import { createClient } from "@/utils/supabase/client";
import { PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Teacher() {
    const supabase = createClient();
	const router = useRouter();

	const inputFileRef = useRef<HTMLInputElement>(null);
	const [blob, setBlob] = useState<PutBlobResult | null>(null);

	
    return(
        <main className="bg-slate-50 h-[100vh]">
			LOGIN SUCCESSFUL<br></br>
			
			<button
				onClick={async () => {
					const val = await supabase.auth.getUser();
				}}
			>
				CHECK
			</button>
			<>
				<h1>Upload Your Avatar</h1>

				<form
					onSubmit={async (event) => {
						event.preventDefault();

						if (!inputFileRef.current?.files) {
							throw new Error("No file selected");
						}

						const file = inputFileRef.current.files[0];

						const newBlob = await upload(file.name, file, {
							access: "public",
							handleUploadUrl: "/api/module/upload",
						});

						setBlob(newBlob);
					}}
				>
					<input name="file" ref={inputFileRef} type="file" required />
					<button type="submit">Upload</button>
				</form>
				{blob && (
					<div>
						Blob url: <a href={blob.url}>{blob.url}</a>
					</div>
				)}
			</>
		</main>
    )
}