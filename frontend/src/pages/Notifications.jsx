import { useEffect, useState }
from "react"

import Navbar
from "../components/Navbar"

import { db }
from "../firebase/firebase"

import {
  collection,
  getDocs,
  orderBy,
  query
} from "firebase/firestore"

function Notifications({
  darkMode,
  setDarkMode
}) {

  const [notifications,
    setNotifications] =
    useState([])

  const [loading,
    setLoading] =
    useState(true)

  // FETCH NOTIFICATIONS

  const fetchNotifications =
    async () => {

      try {

        const q = query(

          collection(
            db,
            "notifications"
          ),

          orderBy(
            "createdAt",
            "desc"
          )

        )

        const querySnapshot =
          await getDocs(q)

        const notificationArray = []

        querySnapshot.forEach(

          (doc) => {

            notificationArray.push({

              id: doc.id,

              ...doc.data()

            })

          }

        )

        setNotifications(
          notificationArray
        )

      }

      catch (error) {

        console.log(error)

      }

      setLoading(false)

    }

  // AUTO REFRESH

  useEffect(() => {

    fetchNotifications()

    const interval =

      setInterval(() => {

        fetchNotifications()

      }, 2000)

    return () =>
      clearInterval(interval)

  }, [])

  // FORMAT DATE

  const formatDate =
    (timestamp) => {

      if (!timestamp) {

        return "Recently"

      }

      try {

        const date =

          timestamp?.seconds

            ? new Date(
                timestamp.seconds * 1000
              )

            : new Date(timestamp)

        return date.toLocaleString()

      }

      catch {

        return "Recently"

      }

    }

  // LOADING

  if (loading) {

    return (

      <div className="bg-slate-900 min-h-screen text-white flex items-center justify-center">

        <h1 className="text-3xl font-bold">

          Loading Notifications...

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

          Notifications

        </h1>

        {/* EMPTY */}

        {

          notifications.length === 0 ? (

            <div className="text-center mt-20">

              <h2 className="text-3xl font-bold text-gray-400">

                No Notifications Found

              </h2>

            </div>

          ) : (

            <div className="space-y-6">

              {

                notifications.map(
                  (notification) => (

                    <div

                      key={notification.id}

                      className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg"

                    >

                      {/* TITLE */}

                      <h2 className="text-2xl font-bold text-purple-400">

                        {
                          notification.title
                        }

                      </h2>

                      {/* MESSAGE */}

                      <p className="text-gray-300 mt-4 text-lg leading-relaxed">

                        {
                          notification.message
                        }

                      </p>

                      {/* FEEDBACK BUTTON */}

                      {

                        notification.feedbackRequest && (

                          <button

                            onClick={() =>

                              window.location.href =
                                `/event/${notification.eventId}`

                            }

                            className="mt-5 bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-xl font-bold transition"

                          >

                            Give Feedback ⭐

                          </button>

                        )

                      }

                      {/* TIME */}

                      <p className="text-sm text-gray-500 mt-5">

                        🕒
                        {" "}

                        {
                          formatDate(
                            notification.createdAt
                          )
                        }

                      </p>

                    </div>

                  )

                )

              }

            </div>

          )

        }

        {/* INFO SECTION */}

        <div className="mt-16 bg-slate-800 p-8 rounded-3xl border border-slate-700">

          <h2 className="text-3xl font-bold mb-6 text-purple-400">

            Notification Types Working

          </h2>

          <div className="space-y-4 text-gray-300 text-lg">

            <p>
              🎟 Ticket Booking Confirmation
            </p>

            <p>
              🔔 Event Reminder Notifications
            </p>

            <p>
              ❤️ Wishlist Event Alerts
            </p>

            <p>
              🚀 New Event Added Alerts
            </p>

            <p>
              ✅ Check-In Notifications
            </p>

            <p>
              ⭐ Post-Event Feedback Requests
            </p>

          </div>

        </div>

      </div>

    </div>

  )

}

export default Notifications