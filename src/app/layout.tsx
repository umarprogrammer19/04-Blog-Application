import './globals.css'; // Import Tailwind's global styles
import { ReactNode } from 'react';

export const metadata = {
    title: "Blogwave - Professional Blog Platform",
    description: "Share your thoughts and ideas with the world",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className="dark" style={{
            colorScheme: "dark"
        }}>
            <body className="min-h-screen bg-background font-sans antialiased __variable_852510"
                cz-shortcut-listen="true"
            >
                {children}
            </body>
        </html >
    );
}