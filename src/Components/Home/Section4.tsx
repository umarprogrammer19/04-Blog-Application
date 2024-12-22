import { cardData } from '@/Data/Home-Cards';
import React from 'react';
import Card from '../Cards';

function Section4() {
    return (
        <section className="py-6 md:py-8 lg:py-12 bg-gray-50 mt-20">
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {cardData.map((card, index) => (
                        <Card {...card} key={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Section4;
