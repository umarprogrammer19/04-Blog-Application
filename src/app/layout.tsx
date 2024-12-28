import './globals.css'; // Import Tailwind's global styles
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className="__variable_1e4310 __variable_c3aa02 antialiased">
                {children}
            </body>
        </html>
    );
}