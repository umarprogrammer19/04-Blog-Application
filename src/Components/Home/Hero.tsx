import Image from 'next/image'
import React from 'react'

function Hero() {
    return (
        <div className="w-full bg-purple-600 rounded-lg flex justify-center md:h-[700px]">
            <div className='w-[90%] flex md:flex-row flex-col justify-between'>
                <div className="w-full md:w-1/2 space-y-10 mt-12 md:mt-auto my-auto text-white lg:text-left">
                    <span className="text-xs md:text-sm uppercase font-medium tracking-wide">
                        Featured Post
                    </span>
                    <div className="text-3xl md:text-4xl lg:text-[54px] font-bold flex flex-col md:gap-5">
                        <span>How AI will</span>
                        <span>Change the Future</span>
                    </div>
                    <p className="w-[400px] md:w-[500px] text-[16px] mb-4 md:mb-6 leading-relaxed">
                        The future of AI will see home robots having enhanced intelligence, increased capabilities, and becoming more personal and possibly cute. For example, home robots will overcome navigation, direction
                    </p>
                    <button className="bg-white text-purple-600 px-8 py-3 rounded-md hover:bg-transparent border hover:text-white transition duration-300">
                        Read more
                    </button>
                </div>
                <div className="w-full md:w-1/2 my-auto">
                    <Image
                        src="/assets/image/Haderimg.png"
                        alt="Featured Post"
                        width={1200}
                        height={1200}
                        className="w-full h-[550px] object-contain rounded-lg"
                    />
                </div>
            </div>
        </div>
    )
}

export default Hero