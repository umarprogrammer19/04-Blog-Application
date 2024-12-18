import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50">
      {/* ABOUT  SECTION */}
      <section className="text-center py-12 px-4">
        <h2 className="text-sm uppercase text-gray-500 mb-2">About Us</h2>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Creative Blog Writing and Publishing Site
        </h1>
        <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
          Leverage agile frameworks to provide a robust synopsis for high-level
          overviews. Iterative approaches to corporate strategy foster
          collaborative thinking to further the overall value proposition.
        </p>
      </section>

      {/* IMAGE SECTION */}
      <div className="flex justify-center">
        <img
          src="/assets/image/Container.png" // Replace with your image path
          alt="Team working"
          className="w-full max-w-4xl rounded-lg"
        />
      </div>

      {/* HOW WE WORK SECTION */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm uppercase text-gray-500 mb-2">How We Work</h2>
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            I will show you how our team works
          </h1>

          {/* WORK PROCESS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg hover:bg-purple-600 hover:text-white transition-colors duration-300">
              <h3 className="text-4xl font-bold text-gray-300 hover:text-white mb-4">01</h3>
              <h4 className="text-lg font-semibold text-gray-700 hover:text-white mb-2">
                Brainstorming
              </h4>
              <p className="text-sm text-gray-600 hover:text-gray-200">
                Bring to the table win-win strategies to ensure proactive domination. At the end of the day, a new normal.
              </p>
              <a
                href="#"
                className="inline-block mt-4 underline font-semibold hover:text-white"
              >
                Learn More
              </a>
            </div>

            {/* Card 2 */}
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg hover:bg-purple-600 hover:text-white transition-colors duration-300">
              <h3 className="text-4xl font-bold text-gray-300 hover:text-white mb-4">02</h3>
              <h4 className="text-lg font-semibold text-gray-700 hover:text-white mb-2">
                Analyzing
              </h4>
              <p className="text-sm text-gray-600 hover:text-gray-200">
                Iterate approaches to corporate strategy foster collaborative thinking to further the overall.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg hover:bg-purple-600 hover:text-white transition-colors duration-300">
              <h3 className="text-4xl font-bold text-gray-300 hover:text-white mb-4">03</h3>
              <h4 className="text-lg font-semibold text-gray-700 hover:text-white mb-2">
                News Publishing
              </h4>
              <p className="text-sm text-gray-600 hover:text-gray-200">
                At the end of the day, a new normal that has evolved from generation is on the runway.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
export default About;