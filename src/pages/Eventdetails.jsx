import Navbar from "../components/Navbar"

function EventDetails() {
  return (
    <div>

      <Navbar />

      <div className="px-10 py-10">

        <img
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
          alt="event"
          className="w-full h-[400px] object-cover rounded-3xl"
        />

        <h1 className="text-5xl font-bold mt-10">
          Tech Conference 2026
        </h1>

        <p className="text-gray-400 mt-4 text-lg">
          Chennai • Technology • May 25
        </p>

        <p className="mt-8 text-gray-300 leading-8 text-lg">
          Join the biggest tech conference with industry leaders, AI experts,
          startup founders, and developers from around the world.
        </p>

        <button className="mt-10 bg-purple-600 px-8 py-4 rounded-2xl hover:bg-purple-700">
          Book Ticket
        </button>

      </div>

    </div>
  )
}

export default EventDetails