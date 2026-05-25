import { useEffect, useState } from "react"

import { Link } from "react-router-dom"

import Navbar from "../components/Navbar"

import { db } from "../firebase/firebase"

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc
} from "firebase/firestore"

function Events({
  darkMode,
  setDarkMode
}) {

  const [events, setEvents] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  // SEARCH FILTERS

  const [search, setSearch] =
    useState("")

  const [searchCategory,
    setSearchCategory] =
    useState("")

  const [searchCity,
    setSearchCity] =
    useState("")

  const [priceFilter,
    setPriceFilter] =
    useState("All")

  // USER ROLE

  const role =
    localStorage.getItem("role")

  // FETCH EVENTS

  useEffect(() => {

    fetchEvents()

  }, [])

  const fetchEvents =
    async () => {

      try {

        const snapshot =
          await getDocs(

            collection(
              db,
              "events"
            )

          )

        const eventList =

          snapshot.docs.map(
            (doc) => ({

              id: doc.id,

              ...doc.data()

            })
          )

        setEvents(eventList)

      }

      catch (error) {

        console.log(error)

      }

      setLoading(false)

    }

  // DELETE EVENT

  const deleteEvent =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this event?"
        )

      if (!confirmDelete)
        return

      try {

        await deleteDoc(

          doc(
            db,
            "events",
            id
          )

        )

        alert(
          "Event Deleted"
        )

        fetchEvents()

      }

      catch (error) {

        console.log(error)

      }

    }

  // ADD TO WISHLIST

  const addToWishlist =
    async (event) => {

      try {

        await addDoc(

          collection(
            db,
            "wishlist"
          ),

          {

            eventId:
              event.id,

            title:
              event.title,

            venue:
              event.venue,

            banner:
              event.banner,

            date:
              event.date,

            category:
              event.category,

            createdAt:
              new Date()

          }

        )

        // NOTIFICATION

        await addDoc(

          collection(
            db,
            "notifications"
          ),

          {

            title:
              "❤️ Wishlist Added",

            message:
              `${event.title} added to wishlist`,

            createdAt:
              new Date()

          }

        )

        alert(
          "Added To Wishlist ❤️"
        )

      }

      catch (error) {

        console.log(error)

      }

    }

  // LOADING

  if (loading) {

    return (

      <div className="bg-slate-900 min-h-screen text-white flex items-center justify-center">

        <h1 className="text-4xl font-bold">

          Loading Events...

        </h1>

      </div>

    )

  }

  // FILTER EVENTS

  const filteredEvents =

    events.filter((event) => {

      const matchesSearch =

        event.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

      const matchesCategory =

        event.category
          ?.toLowerCase()
          .includes(
            searchCategory.toLowerCase()
          )

      const matchesCity =

        event.venue
          ?.toLowerCase()
          .includes(
            searchCity.toLowerCase()
          )

      const firstPrice =
        Number(
          event?.tickets?.[0]?.price || 0
        )

      const matchesPrice =

        priceFilter === "All"

        ||

        (
          priceFilter === "Free"
          &&
          firstPrice === 0
        )

        ||

        (
          priceFilter === "Paid"
          &&
          firstPrice > 0
        )

      return (

        matchesSearch
        &&
        matchesCategory
        &&
        matchesCity
        &&
        matchesPrice

      )

    })

  return (

    <div className="bg-slate-900 min-h-screen text-white">

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="p-10">

        {/* TITLE */}

        <h1 className="text-5xl font-bold mb-10">

          Explore Events

        </h1>

        {/* FILTERS */}

        <div className="grid md:grid-cols-4 gap-5 mb-10">

          <input
            type="text"
            placeholder="Search Event"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="p-4 rounded-xl bg-slate-800 outline-none"
          />

          <input
            type="text"
            placeholder="Category"
            value={searchCategory}
            onChange={(e) =>
              setSearchCategory(
                e.target.value
              )
            }
            className="p-4 rounded-xl bg-slate-800 outline-none"
          />

          <input
            type="text"
            placeholder="City"
            value={searchCity}
            onChange={(e) =>
              setSearchCity(
                e.target.value
              )
            }
            className="p-4 rounded-xl bg-slate-800 outline-none"
          />

          <select
            value={priceFilter}
            onChange={(e) =>
              setPriceFilter(
                e.target.value
              )
            }
            className="p-4 rounded-xl bg-slate-800 outline-none"
          >

            <option value="All">

              All Events

            </option>

            <option value="Free">

              Free Events

            </option>

            <option value="Paid">

              Paid Events

            </option>

          </select>

        </div>

        {/* EVENTS GRID */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {

            filteredEvents.length > 0

              ? (

                filteredEvents.map((event) => (

                  <div
                    key={event.id}
                    className="bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 shadow-xl"
                  >

                    {/* IMAGE */}

                    <img
                      src={
                        event.banner ||

                        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
                      }

                      alt="event"

                      className="w-full h-56 object-cover"
                    />

                    <div className="p-6">

                      {/* CATEGORY */}

                      <span className="bg-purple-600 px-4 py-2 rounded-full text-sm">

                        {
                          event.category ||
                          "Event"
                        }

                      </span>

                      {/* TITLE */}

                      <h2 className="text-3xl font-bold mt-5 mb-4">

                        {
                          event.title ||
                          "Untitled Event"
                        }

                      </h2>

                      {/* DATE */}

                      <p className="mb-3">

                        📅 {event.date}

                      </p>

                      {/* VENUE */}

                      <p className="mb-3">

                        📍 {event.venue}

                      </p>

                      {/* DESCRIPTION */}

                      <p className="text-slate-300 mb-6 line-clamp-3">

                        {
                          event.description ||
                          "No description available"
                        }

                      </p>

                      {/* TICKETS */}

                      <div className="mb-6">

                        <h3 className="font-bold mb-3 text-lg">

                          Ticket Types

                        </h3>

                        {

                          Array.isArray(event.tickets)

                            ? event.tickets.map(

                              (
                                ticket,
                                index
                              ) => (

                                <div
                                  key={index}
                                  className="bg-slate-700 p-4 rounded-xl mb-3"
                                >

                                  <p>

                                    🎫 {ticket.name}

                                  </p>

                                  <p>

                                    💰 ₹ {ticket.price}

                                  </p>

                                  <p>

                                    👥 Capacity:
                                    {" "}
                                    {ticket.quantity}

                                  </p>

                                </div>

                              )

                            )

                            : (

                              <p>

                                No tickets available

                              </p>

                            )

                        }

                      </div>

                      {/* BUTTONS */}

                      <div className="space-y-4">

                        {/* DETAILS */}

                        <Link
                          to={`/event/${event.id}`}
                        >

                          <button className="w-full bg-purple-600 py-3 rounded-xl hover:bg-purple-700">

                            View Details

                          </button>

                        </Link>

                       
{/* BOOK */}

<Link
  to={`/booking/${event.id}`}
>

  <button

    className="w-full bg-green-600 py-3 rounded-xl hover:bg-green-700"

  >

    Book Tickets

  </button>

</Link>

                        {/* WISHLIST */}

                        <button

                          onClick={() =>
                            addToWishlist(event)
                          }

                          className="w-full bg-pink-600 py-3 rounded-xl hover:bg-pink-700"

                        >

                          ❤️ Add To Wishlist

                        </button>

                        {/* DELETE */}

                        {

                          role === "organizer"

                          &&

                          <button

                            onClick={() =>
                              deleteEvent(
                                event.id
                              )
                            }

                            className="w-full bg-red-600 py-3 rounded-xl hover:bg-red-700"

                          >

                            🗑 Delete Event

                          </button>

                        }

                      </div>

                    </div>

                  </div>

                ))

              )

              : (

                <div className="text-3xl font-bold">

                  No Events Found

                </div>

              )

          }

        </div>

      </div>

    </div>

  )

}

export default Events