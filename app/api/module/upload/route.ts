import { createClient } from '@/utils/supabase/server';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
 
export async function POST(request: Request): Promise<NextResponse> {
  const data = (await request.json()) 
  const filename = data.payload.pathname;
  const body = data as HandleUploadBody;
  const supabase = createClient();
  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (
        pathname,
        /* clientPayload */
      ) => {
        // Generate a client token for the browser to upload the file
        // ⚠️ Authenticate and authorize users before generating the token.
        // Otherwise, you're allowing anonymous uploads.
        
        if(!supabase.auth.getUser()){
          throw new Error("Unauthorized Access!");
        }

        return {
          addRandomSuffix: false,
          allowedContentTypes: ['application/pdf','application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
          tokenPayload: JSON.stringify({
            // optional, sent to your server on upload completion
            // you could pass a user id from auth, or a value from clientPayload
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Get notified of client upload completion
        // ⚠️ This will not work on `localhost` websites,
        // Use ngrok or similar to get the full upload flow
 
        console.log('blob upload completed', blob, tokenPayload);
 
        try {
          // Run any logic after the file upload completed
          // const { userId } = JSON.parse(tokenPayload);
          // await db.update({ avatar: blob.url, userId });
          
          const { data, error } = await supabase
          .from('module')
          .insert([
            { uuid: (await supabase.auth.getUser()).data.user?.id, url: blob.url, filename: filename },
          ])
          .select()
          console.log(data ,error )
        } catch (error) {
          throw new Error('Could not update user');
        }
      },
    });
 
    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }, // The webhook will retry 5 times waiting for a 200
    );
  }
}