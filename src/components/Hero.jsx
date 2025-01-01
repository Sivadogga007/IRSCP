import groupPhoto from "../files/group.webp"; // Ensure this path is correct

export default function HeroSection() {
  return (
    <>
      {/* Desktop and Tablet View */}
      <div
        style={{ backgroundImage: `url(${groupPhoto})` }} // Using inline styles for background image
        className="hidden sm:flex bg-cover bg-center min-h-screen relative"
      >
        {/* Overlay text */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center backdrop-blur-sm bg-white/70 shadow-lg rounded-xl p-3 md:p-4 max-w-3xl w-4/5">
          <h1 className="text-3xl font-lexend tracking-tight text-purple-900 sm:text-5xl">
            Welcome to IRSCP
          </h1>
          {/* Optional description text */}
          <p className="mt-4 text-md md:text-lg leading-8 text-gray-700">
            A platform to foster interaction and provide support for research scholars, encouraging open and comfortable communication within the community.
          </p>
        </div>
      </div>

      {/* Mobile View */}
      <div
        style={{ backgroundImage: `url(${groupPhoto})` }} // Using inline styles for background image
        className="w-screen h-72 bg-cover bg-center sm:hidden relative"
      >
        {/* Overlay text */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center backdrop-blur-sm bg-white/80 shadow-lg rounded-xl p-2 w-5/6">
          <h1 className="text-xl font-lexend tracking-tight text-purple-900">
            Welcome to IRSCP
          </h1>
          <p className="mt-2 text-sm leading-6 text-gray-700">
            A platform to foster interaction and provide support for research scholars.
          </p>
        </div>
      </div>
    </>
  );
}
