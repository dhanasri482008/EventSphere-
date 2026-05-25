import { useEffect, useState } from "react"

import Navbar from "../components/Navbar"

import { db } from "../firebase/firebase"

import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore"

import { CSVLink } from "react-csv"

function Dashboard({ darkMode, setDarkMode }) {

  const [events, setEvents] = useState([])

  const [bookings, setBookings] = useState([])

  const [totalEvents, setTotalEvents] =
    useState(0)

  const [ticketsSold, setTicketsSold] =
    useState(0)

  const [revenue, setRevenue] =
    useState(0)

  const [checkIns, setCheckIns] =
    useState(0)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    fetchDashboardData()

  }, [])

  // FETCH DATA

  const fetchDashboardData = async () => {

    try {

      // FETCH EVENTS

      const querySnapshot = await getDocs(
        collection(db, "events")
      )

      let eventsArray = []

      let totalTickets = 0

      let totalRevenue = 0

      let totalCheckIns = 0

      const today = new Date()

      for (const eventDoc of querySnapshot.docs) {

        const data = eventDoc.data()

        // AUTO DELETE EXPIRED EVENTS

        if (
          data.expiryDate &&
          new Date(data.expiryDate) < today
        ) {

          await deleteDoc(
            doc(db, "events", eventDoc.id)
          )

          continue

        }

        eventsArray.push({

          id: eventDoc.id,

          ...data

        })

        totalTickets +=
          data.registrations || 0

        totalRevenue +=
          data.revenue || 0

        totalCheckIns +=
          data.checkedIn || 0

      }

      setEvents(eventsArray)

      setTotalEvents(eventsArray.length)

      setTicketsSold(totalTickets)

      setRevenue(totalRevenue)

      setCheckIns(totalCheckIns)

      // FETCH BOOKINGS

      const bookingSnapshot = await getDocs(
        collection(db, "bookings")
      )

      let bookingArray = []

      bookingSnapshot.forEach((docSnap) => {

        bookingArray.push({

          id: docSnap.id,

          ...docSnap.data()

        })

      })

      setBookings(bookingArray)

    } catch (error) {

      console.log(error)

    }

    setLoading(false)

  }

  // DELETE EVENT

  const handleDeleteEvent = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this event?"
      )

    if (!confirmDelete) {

      return

    }

    try {

      await deleteDoc(
        doc(db, "events", id)
      )

      alert("Event Deleted Successfully")

      fetchDashboardData()

    } catch (error) {

      console.log(error)

    }

  }

  // LOADING

  if (loading) {

    return (

      <div className="bg-slate-900 min-h-screen text-white flex items-center justify-center">

        <h1 className="text-4xl font-bold">

          Loading Dashboard...

        </h1>

      </div>

    )

  }

  return (

    <div className="bg-slate-900 min-h-screen text-white">

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="p-10">

        {/* TITLE */}

        <h1 className="text-5xl font-bold mb-10">

          Organizer Dashboard

        </h1>

        {/* STATS */}

        <div className="grid md:grid-cols-4 gap-8 mb-14">

          {/* EVENTS */}

          <div className="bg-slate-800 p-8 rounded-3xl">

            <h2 className="text-2xl text-gray-400 mb-4">

              Total Events

            </h2>

            <p className="text-5xl font-bold text-purple-400">

              {totalEvents}

            </p>

          </div>

          {/* TICKETS */}

          <div className="bg-slate-800 p-8 rounded-3xl">

            <h2 className="text-2xl text-gray-400 mb-4">

              Tickets Sold

            </h2>

            <p className="text-5xl font-bold">

              {ticketsSold}

            </p>

          </div>

          {/* REVENUE */}

          <div className="bg-slate-800 p-8 rounded-3xl">

            <h2 className="text-2xl text-gray-400 mb-4">

              Revenue

            </h2>

            <p className="text-5xl font-bold text-green-400">

              ₹{revenue}

            </p>

          </div>

          {/* CHECK INS */}

          <div className="bg-slate-800 p-8 rounded-3xl">

            <h2 className="text-2xl text-gray-400 mb-4">

              Check-Ins

            </h2>

            <p className="text-5xl font-bold text-pink-400">

              {checkIns}

            </p>

          </div>

        </div>

        {/* EVENTS */}

        <div className="mb-16">

          <h2 className="text-4xl font-bold mb-8">

            Created Events

          </h2>

          {

            events.length === 0 ? (

              <div className="text-center text-gray-400 text-2xl mt-20">

                No Events Created

              </div>

            ) : (

              <div className="grid md:grid-cols-3 gap-8">

                {

                  events.map((event) => (

                    <div
                      key={event.id}
                      className="bg-slate-800 rounded-3xl overflow-hidden shadow-xl"
                    >

                      {/* IMAGE */}

                      <img
                        src={
                          event.banner ||
                          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
                        }
                        alt={event.title}
                        className="w-full h-56 object-cover"
                      />

                      {/* CONTENT */}

                      <div className="p-6">

                        <h3 className="text-3xl font-bold mb-4">

                          {event.title}

                        </h3>

                        <div className="space-y-3 text-gray-300">

                          <p>

                            📍 {event.venue}

                          </p>

                          <p>

                            📅 {event.date}

                          </p>

                          <p>

                            🎤 {event.category}

                          </p>

                          <p>

                            🎟 Registrations:
                            {" "}
                            {event.registrations || 0}

                          </p>

                          <p>

                            💰 Revenue:
                            {" "}
                            ₹{event.revenue || 0}

                          </p>

                          <p>

                            ✅ Check-Ins:
                            {" "}
                            {event.checkedIn || 0}

                          </p>

                          {

                            event.expiryDate && (

                              <p className="text-red-400">

                                ⏳ Expires:
                                {" "}
                                {event.expiryDate}

                              </p>

                            )

                          }

                        </div>

                        {/* DELETE */}

                        <button
                          onClick={() =>
                            handleDeleteEvent(
                              event.id
                            )
                          }
                          className="w-full bg-red-600 py-3 rounded-xl hover:bg-red-700 mt-8"
                        >

                          Delete Event

                        </button>

                      </div>

                    </div>

                  ))

                }

              </div>

            )

          }

        </div>

        {/* ATTENDEES */}

        <div className="bg-slate-800 p-8 rounded-3xl">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-4xl font-bold">

              Attendee List

            </h2>

            <CSVLink
              data={bookings}
              filename={"attendees.csv"}
              className="bg-purple-600 px-5 py-3 rounded-xl hover:bg-purple-700"
            >

              Download CSV

            </CSVLink>

          </div>

          {/* TABLE */}

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-slate-700">

                  <th className="p-4 text-left">

                    Name

                  </th>

                  <th className="p-4 text-left">

                    Email

                  </th>

                  <th className="p-4 text-left">

                    Event

                  </th>

                  <th className="p-4 text-left">

                    Ticket

                  </th>

                  <th className="p-4 text-left">

                    Price

                  </th>

                  <th className="p-4 text-left">

                    Check-In

                  </th>

                </tr>

              </thead>

              <tbody>

                {

                  bookings.map((booking) => (

                    <tr
                      key={booking.id}
                      className="border-b border-slate-700"
                    >

                      <td className="p-4">

                        {booking.attendeeName}

                      </td>

                      <td className="p-4">

                        {booking.attendeeEmail}

                      </td>

                      <td className="p-4">

                        {booking.eventTitle}

                      </td>

                      <td className="p-4">

                        {booking.ticketName}

                      </td>

                      <td className="p-4">

                        ₹{booking.ticketPrice}

                      </td>

                      <td className="p-4">

                        {

                          booking.checkedIn
                            ? "✅ Yes"
                            : "❌ No"

                        }

                      </td>

                    </tr>

                  ))

                }

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  )

}

export default Dashboard