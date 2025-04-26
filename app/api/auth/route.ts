
export async function POST(request: Request){
    const { code } = await request.json();
    const body = new URLSearchParams({
        client_id: process.env.OAUTH_CLIENT_ID!,
        client_secret: process.env.OAUTH_CLIENT_SECRET!,
        code: code,
        redirect_uri: process.env.OAUTH_REDIRECT_URI!,
    });
    const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
    });
    const data = await response.json();
    //console.log('GitHub Token Response:', data);
    return Response.json(data);
}