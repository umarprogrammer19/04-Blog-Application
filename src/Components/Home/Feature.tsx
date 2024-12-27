import React from 'react';
import Image from 'next/image';
import Button from '../ui/Buttons';

const FeatureSection = () => {
    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl flex flex-col md:flex-row items-center gap-8">
                {/* Image Section */}
                <div className="w-full md:w-1/2 rounded-lg overflow-hidden">
                    <Image
                        src="/assets/image/ImagePlaceholder(1).png" 
                        alt="VR & AI Technology"
                        className="object-cover w-full h-full"
                        width={600}
                        height={400}
                    />
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2">
                    <p className="text-purple-600 text-sm font-medium uppercase">
                        Development
                    </p>
                    <p className="text-gray-500 text-xs mb-2">16 March 2023</p>
                    <h2 className="text-gray-900 text-2xl md:text-3xl font-bold leading-tight mb-4">
                        How to make a Game look more attractive with New VR & AI Technology
                    </h2>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                        Google has been investing in AI for many years and bringing its
                        benefits to individuals, businesses, and communities. Whether it's
                        publishing state-of-the-art research, building helpful products, or
                        developing tools and resources that enable others, we’re committed
                        to making AI accessible to everyone.
                    </p>
                    <Button text='Read More' />
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;
