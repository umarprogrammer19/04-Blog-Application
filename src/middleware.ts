import { getCookie } from 'cookies-next';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    try {
        const accessToken = await getCookie('accessToken', { req });
        if (!accessToken) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    } catch (error) {
        console.log('Error during token verification:', error);
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

// On These Routes The Middleware Works
export const config = {
    matcher: ['/dashboard', '/dashboard/posts', '/dashboard/create'],
};
