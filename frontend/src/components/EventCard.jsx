function EventCard() {
  return (
    <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300">
      
      <img
        src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
        alt="event"
        className="h-56 w-full object-cover"
      />

      <div className="p-5">
        <h2 className="text-2xl font-bold">
          Tech Conference 2026
        </h2>

        <p className="text-gray-400 mt-2">
          Chennai • May 25 • Technology
        </p>

        <div className="flex justify-between items-center mt-5">
          
          <span className="text-purple-400 font-bold text-xl">
            ₹499
          </span>

          <button className="bg-purple-600 px-4 py-2 rounded-xl hover:bg-purple-700">
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventCard
