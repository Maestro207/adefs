import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const supabase = createClient();
	const form = await req.formData();

	const email = form.get("email");
	const password = form.get("password");
	const name = form.get("name");
	const course = form.get("course");
	const level = form.get("level");

	if (
		typeof email != "string" ||
		typeof password != "string" ||
		typeof name != "string" ||
		typeof course != "string" ||
		typeof level != "string"
	) {
		return NextResponse.json({ data: null, error: "Incorrect Details" });
	}

	const year_level = parseInt(level);

	if (year_level <= 0 || year_level > 4) {
		return NextResponse.json({ data: null, error: "Wrong Level" });
	}

	const { data, error } = await supabase.auth.signUp({
		email: email,
		password: password,
	});

	if (error) {
		return NextResponse.json({ data, error });
	} else {
		try {
			{
				const { data, error } = await supabase
					.from("student")
					.insert([{ course: course, level: year_level }])
					.select();
                    console.log(data, error)
                
                    await supabase
					.from("user")
					.insert([
						{
                            id: data![0].id,
							name: name,
							role: "student",
							uuid: (await supabase.auth.getUser()).data.user?.id,
						},
					])
					.select();
                    console.log(data, error)
			}
		} catch (error_msg) {
			return NextResponse.json({ data: null, error: error_msg });
		}
	}

	return NextResponse.json({ data, error });
}
