import { ImageSlider } from "../components/ImageSlider";
const Home = () => {
  return (
    <div className="home">
      <div
        style={{
          maxWidth: "900px",
          width: "100%",
          aspectRatio: "10 / 6",
          margin: "0 auto",
        }}
      >
        <ImageSlider />
      </div>
      <div className="text-white p-6">
        <h2>A broad selection of courses</h2>

        <p>
          Choose from over 210,000 online video courses with new additions
          published every month
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore
        </p>
      </div>
      <div className="mx-auto flex flex-wrap pt-4 pb-12">
        <div className="w-full md:w-1/2 p-6 flex flex-col flex-grow flex-shrink">
          <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
            <a
              href="#"
              className="flex flex-wrap no-underline hover:no-underline"
            >
              <div className="w-full font-bold text-xl text-gray-800 px-6 p-8 pb-4">
                Learn Python Today
              </div>
              <p className="text-gray-800 text-base px-6 mb-5">
                One of the most popular websites at NASA is the Astronomy
                Picture of the Day. In fact, this website is one of the most
                popular websites across all federal agencies. This endpoint
                structures the APOD imagery and associated metadata so that it
                can be repurposed for other applications. In addition, if the
                concept_tags parameter is set to True, then keywords derived
                from the image explanation are returned. View the Astronomy
                Picture of the Day
              </p>
            </a>
          </div>
          <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
            <div className="flex items-center justify-start">
              <button className="mx-auto text-white lg:mx-0 bg-gray-800 hover:underline gradient font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                View
              </button>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-6 flex flex-col flex-grow flex-shrink">
          <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
            <a
              href="#"
              className="flex flex-wrap no-underline hover:no-underline"
            >
              <div className="w-full font-bold text-xl text-gray-800 px-6 p-8 pb-4">
                Start Your Career Today
              </div>
              <p className="text-gray-800 text-base px-6 mb-5">
                This API is designed to collect image data gathered by NASA's
                Curiosity, Opportunity, and Spirit rovers on Mars and make it
                more easily available to other developers, educators, and
                citizen scientists. Each rover has its own set of photos stored
                in the database, which can be queried separately. There are
                several possible queries that can be made against the API.
                Photos are organized by the sol (Martian rotation or day) on
                which they were taken, counting up from the rover's landing
                date.
              </p>
            </a>
          </div>
          <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
            <div className="flex items-center justify-start">
              <button className="mx-auto text-white lg:mx-0 bg-gray-800 hover:underline gradient font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                View
              </button>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-6 flex flex-col flex-grow flex-shrink">
          <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
            <a
              href="#"
              className="flex flex-wrap no-underline hover:no-underline"
            >
              <div className="w-full font-bold text-xl text-gray-800 px-6 p-8 pb-4">
                Pursue your passion
              </div>
              <p className="text-gray-800 text-base px-6 mb-5">
                This API is designed to collect image data gathered by NASA's
                Curiosity, Opportunity, and Spirit rovers on Mars and make it
                more easily available to other developers, educators, and
                citizen scientists. Each rover has its own set of photos stored
                in the database, which can be queried separately. There are
                several possible queries that can be made against the API.
                Photos are organized by the sol (Martian rotation or day) on
                which they were taken, counting up from the rover's landing
                date.
              </p>
            </a>
          </div>
          <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
            <div className="flex items-center justify-start">
              <button className="mx-auto text-white lg:mx-0 bg-gray-800 hover:underline gradient font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                View
              </button>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-6 flex flex-col flex-grow flex-shrink">
          <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
            <a
              href="#"
              className="flex flex-wrap no-underline hover:no-underline"
            >
              <div className="w-full font-bold text-xl text-gray-800 px-6 p-8 pb-4">
                Start Your Career Today
              </div>
              <p className="text-gray-800 text-base px-6 mb-5">
                This API is designed to collect image data gathered by NASA's
                Curiosity, Opportunity, and Spirit rovers on Mars and make it
                more easily available to other developers, educators, and
                citizen scientists. Each rover has its own set of photos stored
                in the database, which can be queried separately. There are
                several possible queries that can be made against the API.
                Photos are organized by the sol (Martian rotation or day) on
                which they were taken, counting up from the rover's landing
                date.
              </p>
            </a>
          </div>
          <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
            <div className="flex items-center justify-start">
              <button className="mx-auto text-white lg:mx-0 bg-gray-800 hover:underline gradient font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
