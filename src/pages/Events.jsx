import Navbar from "../components/Navbar"
import EventCard from "../components/EventCard"

function Events() {
  return (
    <div>

      <Navbar />

      <div className="px-10 py-10">

        <h1 className="text-5xl font-bold mb-10">
          All Events
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />

        </div>

      </div>

    </div>
  )
}

export default Events