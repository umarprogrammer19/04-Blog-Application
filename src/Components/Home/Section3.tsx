import React from 'react'
import Button from '../Button'
import FeatureSection from './Feature'

function Section3() {
    return (
        <section className="w-full pt-12 md:pt-16 lg:pt-24 bg-white flex flex-col items-center">
            <div className="w-[80%] flex justify-between items-center px-4 sm:px-6">
                <h3 className="text-2xl md:text-[40px] font-bold">Our Recent Posts</h3>
                <Button text='View All' bgColor='purple' />
            </div>
            <FeatureSection />
        </section>

    )
}

export default Section3