import Link from 'next/link'
import React from 'react'

function Button({ text, bgColor, link }: { text: string; bgColor?: string; link?: string }) {
    return (
        <Link
            href={link ? link : ""}
            className={`inline-block mt-4 md:mt-6 py-[10px] px-7 rounded hover:bg-purple-700 transition duration-300 ${bgColor === "purple" ? "bg-purple-700 text-white hover:bg-transparent hover:text-purple-700" : "text-purple-700"} bg-transparent border border-purple-700 hover:text-white`}
        >
            {text}
        </Link>
    )
}

export default Button