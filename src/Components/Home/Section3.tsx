import React from 'react'
import Button from '../Button'

function Section3() {
    return (
        <section className="w-full pt-12 md:pt-16 lg:pt-24 bg-white flex flex-col items-center">
            <div className="w-[80%] flex justify-between items-center px-4 sm:px-6">
                <h3 className="text-2xl md:text-5xl font-bold">Our Recent Posts</h3>
                {/* <Link
                    href="/Blogs"
                    className="bg-purple-600 text-white py-2 px-10 rounded-lg hover:bg-transparent transition duration-300 text-md border border-purple-700 hover:text-purple-700"
                >
                    View All
                </Link> */}
                <Button text='View All' bgColor='purple'/>
            </div>
        </section>

    )
}

export default Section3