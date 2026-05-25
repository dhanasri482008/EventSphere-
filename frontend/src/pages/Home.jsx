import Navbar from "../components/Navbar"

import { Link } from "react-router-dom"

import { useEffect, useState } from "react"

import { db } from "../firebase/firebase"

import {
  collection,
  getDocs
} from "firebase/firestore"

function Home() {

  const [events, setEvents] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    fetchEvents()

  }, [])

  const fetchEvents = async () => {

    try {

      const querySnapshot = await getDocs(
        collection(db, "events")
      )

      const eventList = querySnapshot.docs.map((doc) => ({

        id: doc.id,

        ...doc.data()

      }))

      setEvents(eventList)

    } catch (error) {

      console.log(error)

    }

    setLoading(false)

  }

  return (

    <div className="bg-slate-900 min-h-screen text-white">

      <Navbar />

      {/* HERO SECTION */}

      <div className="flex flex-col items-center justify-center text-center px-6 py-28">

        <h1 className="text-6xl font-bold leading-tight">

          Discover Amazing
          <span className="text-purple-500">
            {" "}Events
          </span>

        </h1>

        <p className="mt-6 text-gray-300 max-w-2xl text-lg">

          Find, book, and manage the best events
          around you with AI-powered recommendations
          and seamless ticket booking.

        </p>

        <Link to="/events">

          <button className="mt-8 bg-purple-600 px-8 py-4 rounded-2xl text-lg hover:bg-purple-700 transition">

            Explore Events

          </button>

        </Link>

      </div>

      {/* FEATURED EVENTS */}

      <div className="px-10 pb-20">

        <h2 className="text-4xl font-bold mb-10">

          Featured Events

        </h2>

        {

          loading ? (

            <div className="text-2xl text-gray-400">

              Loading Events...

            </div>

          ) : events.length === 0 ? (

            <div className="text-2xl text-gray-400">

              No Events Found

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {

                events.slice(0, 3).map((event) => (

                  <div
                    key={event.id}
                    className="bg-slate-800 rounded-3xl overflow-hidden shadow-xl"
                  >

                    {/* BANNER */}

                    <img
                      src={
                        event.banner ||
                        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
                      }
                      alt={event.title}
                      className="w-full h-56 object-cover"
                    />

                    <div className="p-6">

                      {/* CATEGORY */}

                      <span className="bg-purple-600 px-4 py-1 rounded-full text-sm">

                        {event.category || "Event"}

                      </span>

                      {/* TITLE */}

                      <h3 className="text-3xl font-bold mt-5 mb-4">

                        {event.title || "Untitled Event"}

                      </h3>

                      {/* DATE */}

                      <p className="mb-3 text-gray-300">

                        📅 {event.date || "No Date"}

                      </p>

                      {/* VENUE */}

                      <p className="mb-5 text-gray-300">

                        📍 {event.venue || "No Venue"}

                      </p>

                      {/* PRICE */}

                      <p className="mb-6 text-lg font-semibold">

                        🎟 Starting From ₹
                        {event.tickets?.[0]?.price || 0}

                      </p>

                      {/* BUTTON */}

                      <Link to={`/event/${event.id}`}>

                        <button className="w-full bg-purple-600 py-3 rounded-xl hover:bg-purple-700 transition">

                          View Details

                        </button>

                      </Link>

                    </div>

                  </div>

                ))

              }

            </div>

          )

        }

      </div>

    </div>

  )

}

export default Home