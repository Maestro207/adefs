import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const supabase = createClient();
	const form = await req.formData();

	const email = form.get("email");
	const password = form.get("password");
	const name = form.get("name");
	const course = form.get("course");

	if (
		typeof email != "string" ||
		typeof password != "string" ||
		typeof name != "string" ||
		typeof course != "string"
	) {
		return Response.json({ error: "Empty Shit bro" });
	}

	const { data, error } = await supabase.auth.signUp({
		email: email,
		password: password,
	});

    if (error) {
		return NextResponse.json({ data, error });
	} else {
		try{
            {
				const { data, error } = await supabase
					.from("teacher")
					.insert([{ course: course }])
					.select();
                
                    await supabase
					.from("user")
					.insert([
						{
                            id: data![0].id,
							name: name,
							role: "teacher",
							uuid: (await supabase.auth.getUser()).data.user?.id,
						},
					])
					.select();
			}
        }catch(error_msg){
                    
            return NextResponse.json({data: null, error: error_msg})
        }
	}
	supabase.auth.signOut();
	return NextResponse.json({ data, error });
}
