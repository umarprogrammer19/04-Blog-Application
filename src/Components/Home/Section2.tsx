import Image from 'next/image';
import Link from 'next/link';
import Button from '../Button';

function Section2() {
    return (
        <section className="bg-gray-300 w-full h-[700px] hidden md:flex justify-center items-center">
            <div className='w-4/5 h-4/5 relative'>
                <Image
                    src={"/assets/image/ImagePlaceholder(1).png"}
                    alt='None'
                    width={1500}
                    height={1500}
                    className='w-full h-full'
                />
                <div
                    className="w-[80%] h-[60%] absolute -bottom-28 right-0 z-10 bg-gray-100 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg"
                >
                    <span className="text-xs md:text-sm text-gray-500 uppercase">
                        01 Jan 2023 - 5 min read
                    </span>
                    <h2 className="text-sm md:text-lg lg:text-3xl tracking-wide font-bold mt-2 text-gray-900">
                        How to make a Game look more attractive with New VR & AI Technology
                    </h2>
                    <p className="w-[90%] text-xs md:text-sm lg:text-base text-gray-700 mt-3">
                        Google has been investing in AI for many years and bringing its
                        benefits to individuals, businesses, and communities. Whether it’s
                        publishing state-of-the-art research, building helpful products, or
                        developing tools and resources, we’re committed to making AI
                        accessible to everyone.
                    </p>
                    <Button text='Read More'></Button>
                </div>
            </div>
        </section>
    )
}

export default Section2;