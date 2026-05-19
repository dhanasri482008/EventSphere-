import Navbar from "../components/Navbar"
import EventCard from "../components/EventCard"

function Home() {
  return (
    <div>

      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-6">
        
        <h1 className="text-6xl font-bold leading-tight">
          Discover Amazing
          <span className="text-purple-500"> Events</span>
        </h1>

        <p className="mt-6 text-gray-300 max-w-2xl text-lg">
          Find, book, and manage the best events around you with AI-powered recommendations and seamless ticket booking.
        </p>

        <button className="mt-8 bg-purple-600 px-8 py-4 rounded-2xl text-lg hover:bg-purple-700 transition">
          Explore Events
        </button>
      </div>

      {/* Featured Events */}
      <div className="px-10 pb-20">

        <h2 className="text-4xl font-bold mb-10">
          Featured Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <EventCard />
          <EventCard />
          <EventCard />

        </div>

      </div>

    </div>
  )
}

export default Home