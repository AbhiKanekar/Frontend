'use client'
import Navbar from "@/Components/layout/Navbar";

export default function Contact (){
    return (
      <>
        <Navbar />
        <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
              Contact Us
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col justify-center items-center space-y-4">
                <h2 className="text-3xl font-semibold text-gray-800">
                  Get In Touch
                </h2>
                <p className="text-lg text-gray-600">
                  We'd love to hear from you! Whether you have questions about
                  our products or need assistance with your order, our team is
                  here to help.
                </p>
                <form className="space-y-4 w-full max-w-lg">
                  <div className="flex flex-col space-y-2">
                    <label className="text-lg text-gray-600">Full Name</label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="border-b-2 border-gray-300 p-2 text-lg focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-md transition-all duration-300"
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="text-lg text-gray-600">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="border-b-2 border-gray-300 p-2 text-lg focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-md transition-all duration-300"
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="text-lg text-gray-600">Message</label>
                    <textarea
                      placeholder="Your Message"
                      className="border-b-2 border-gray-300 p-2 text-lg focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-md transition-all duration-300"
                      rows="4"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-gradient-to-r from-pink-400 via-yellow-400 to-red-500 p-3 rounded-lg text-white w-full font-medium shadow-md transform hover:scale-110 hover:translate-y-1 transition-all duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              <div className="flex flex-col justify-center items-center space-y-4">
                <h2 className="text-3xl font-semibold text-gray-800">
                  Our Office Location
                </h2>
                <p className="text-lg text-gray-600">
                  Come visit us at our headquarters. We're always happy to
                  assist you in person!
                </p>
                <img
                  src="https://images.pexels.com/photos/3182765/pexels-photo-3182765.jpeg"
                  alt="Office Location"
                  className="w-full rounded-lg shadow-lg"
                />

                <div className="space-y-2">
                  <p className="text-lg text-gray-600">
                    <strong>Address:</strong> 123 E-Commerce Street, Suite 45,
                    City, Country
                  </p>
                  <p className="text-lg text-gray-600">
                    <strong>Email:</strong> support@estore.com
                  </p>
                  <p className="text-lg text-gray-600">
                    <strong>Phone:</strong> (123) 456-7890
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}