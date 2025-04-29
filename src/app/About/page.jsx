export default function About() {
  return (
    <>
      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
            About Us
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center items-center space-y-4">
              <h2 className="text-3xl font-semibold text-gray-800">
                Who We Are
              </h2>
              <p className="text-lg text-gray-600">
                At <strong>E-Store</strong>, we're more than just an online shop
                — we're a team of passionate individuals committed to delivering
                exceptional products and experiences to our customers. Our
                journey began with a simple idea: to make quality products
                accessible to everyone, everywhere.
              </p>
              <img
                src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"
                alt="E-commerce Team"
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            <div className="flex flex-col justify-center items-center space-y-4">
              <h2 className="text-3xl font-semibold text-gray-800">
                Our Vision
              </h2>
              <p className="text-lg text-gray-600">
                We envision a world where shopping online is not only convenient
                but also enjoyable. By curating a diverse range of products and
                providing stellar customer service, we aim to be your trusted
                partner in every purchase.
              </p>
              <img
                src="https://images.pexels.com/photos/305188/pexels-photo-305188.jpeg"
                alt="E-commerce Warehouse"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Our Team
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Behind every order is a dedicated team working tirelessly to
              ensure your satisfaction. From product sourcing to customer
              support, each member plays a vital role in our success.
            </p>
            <img
              src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"
              alt="Team"
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          <div className="mt-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Our Promise
            </h2>
            <ul className="list-disc text-lg text-gray-600 pl-6 space-y-2">
              <li>Quality Products: Carefully selected to meet your needs.</li>
              <li>Fast Shipping: Ensuring timely delivery to your doorstep.</li>
              <li>
                Customer Satisfaction: Providing support every step of the way.
              </li>
            </ul>
            <img
              src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"
              alt="Customer Service"
              className="w-full rounded-lg shadow-lg mt-6"
            />
          </div>
        </div>
      </div>
    </>
  );
}
