
const Contact = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
        <p className="text-gray-600 mb-8">
          Contact us to publish your content and show ads on our website and get a good reach.
        </p>

        {/* Contact Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Office */}
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full">

            </div>
            <h3 className="text-lg font-semibold text-purple-600 mb-2">Office</h3>
            <p className="text-gray-600">Victoria Street, London, UK</p>
          </div>
          {/* Email */}
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full">
              <i className="fas fa-envelope"></i>
            </div>
            <h3 className="text-lg font-semibold text-purple-600 mb-2">Email</h3>
            <p className="text-gray-600">hello@zarrin.com</p>
          </div>
          {/* Phone */}
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full">
              <i className="fas fa-phone-alt"></i>
            </div>
            <h3 className="text-lg font-semibold text-purple-600 mb-2">Phone</h3>
            <p className="text-gray-600">(001) 2342 3451</p>
          </div>
        </div>

        {/* Background Image with Form */}
        <div className="relative w-full min-h-screen bg-gray-100 flex items-center justify-center">
          {/* Background Image */}
          <div
            className="absolute top-0 w-full h-64 md:h-80 bg-cover bg-center z-0"
            style={{ backgroundImage: "url('src/assets/image/Rectangle 1086.png')" }}
          ></div>

          {/* Contact Form */}
          <div className="relative z-10 w-full max-w-4xl mx-4 mt-32 md:mt-40 bg-white p-8 rounded-lg shadow-lg">
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Your Name"
                  />
                </div>
                {/* Email */}
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Your Email"
                  />
                </div>
                {/* Phone */}
                <div>
                  <label className="block text-gray-700 mb-2">Phone</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Your Phone"
                  />
                </div>
                {/* Subject */}
                <div>
                  <label className="block text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Subject"
                  />
                </div>
              </div>
              {/* Message */}
              <div className="mt-6">
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              {/* Submit Button */}
              <div className="mt-6 text-center">
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
