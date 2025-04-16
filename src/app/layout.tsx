import './globals.css'; // Import Tailwind's global styles
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className="dark" style={{
            colorScheme: "dark"
        }}>
            <body className="__variable_1e4310 __variable_c3aa02 antialiased" cz-shortcut-listen="true">
                {children}
            </body>
        </html >
    );
}