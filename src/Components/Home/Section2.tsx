import React from 'react'

function Section2() {
    return (
        <section className="relative bg-gray-100 py-6 md:py-8 lg:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Image Container */}
                <div className="relative rounded-lg overflow-hidden">
                    <img
                        src="/assets/image/ImagePlaceholder(1).png"
                        alt="VR Game"
                        className="w-full h-auto object-cover rounded-lg"
                    />
                    {/* Card Positioned Over Image (Right-Aligned) */}
                    <div
                        className="absolute bottom-8 right-14 transform translate-y-[10%] translate-x-[10%] z-10 bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg"
                        style={{
                            width: "clamp(60%, 300px, 40%)", // Responsive width using CSS clamp
                        }}
                    >
                        <span className="text-xs md:text-sm text-gray-500 uppercase">
                            01 Jan 2023 - 5 min read
                        </span>
                        <h2 className="text-sm md:text-lg lg:text-xl font-bold mt-2 text-gray-900">
                            How to make a Game look more attractive with New VR & AI Technology
                        </h2>
                        <p className="text-xs md:text-sm lg:text-base text-gray-600 mt-3">
                            Google has been investing in AI for many years and bringing its
                            benefits to individuals, businesses, and communities. Whether it’s
                            publishing state-of-the-art research, building helpful products, or
                            developing tools and resources, we’re committed to making AI
                            accessible to everyone.
                        </p>
                        <a
                            href="/SingleBlog"
                            className="inline-block mt-4 md:mt-6 bg-purple-600 text-white py-2 px-4 md:px-6 rounded hover:bg-purple-700 transition duration-300"
                        >
                            Read More
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section2