import { useEffect, useState } from "react"

import Navbar from "../components/Navbar"

import { db } from "../firebase/firebase"

import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore"

import { Link } from "react-router-dom"

function Wishlist() {

  const [wishlist, setWishlist] = useState([])

  const [loading, setLoading] = useState(true)

  // FETCH WISHLIST

  useEffect(() => {

    const fetchWishlist = async () => {

      try {

        const querySnapshot = await getDocs(
          collection(db, "wishlist")
        )

        const wishlistArray = []

        querySnapshot.forEach((doc) => {

          wishlistArray.push({

            id: doc.id,

            ...doc.data()

          })

        })

        setWishlist(wishlistArray)

      } catch (error) {

        console.log(error)

      }

      setLoading(false)

    }

    fetchWishlist()

  }, [])

  // REMOVE FROM WISHLIST

  const removeFromWishlist = async (id) => {

    try {

      await deleteDoc(doc(db, "wishlist", id))

      setWishlist(

        wishlist.filter((item) => item.id !== id)

      )

      alert("Removed From Wishlist")

    } catch (error) {

      console.log(error)

    }

  }

  // LOADING

  if (loading) {

    return (

      <div className="bg-slate-900 min-h-screen text-white flex items-center justify-center">

        <h1 className="text-3xl font-bold">

          Loading Wishlist...

        </h1>

      </div>

    )

  }

  return (

    <div className="bg-slate-900 min-h-screen text-white">

      <Navbar />

      <div className="p-10">

        <h1 className="text-5xl font-bold mb-10">

          Wishlist Events

        </h1>

        {/* EMPTY WISHLIST */}

        {wishlist.length === 0 ? (

          <div className="text-center mt-20">

            <h2 className="text-3xl font-bold text-gray-400">

              No Wishlist Events

            </h2>

          </div>

        ) : (

          <div className="grid md:grid-cols-3 gap-8">

            {wishlist.map((event) => (

              <div
                key={event.id}
                className="bg-slate-800 rounded-3xl overflow-hidden"
              >

                {/* IMAGE */}

                <img
                  src={
                    event.banner ||
                    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
                  }
                  alt={event.title}
                  className="w-full h-52 object-cover"
                />

                <div className="p-6">

                  {/* CATEGORY */}

                  <span className="bg-pink-600 px-4 py-1 rounded-full text-sm">

                    {event.category || "Event"}

                  </span>

                  {/* TITLE */}

                  <h2 className="text-3xl font-bold mt-5 mb-4">

                    {event.title}

                  </h2>

                  {/* VENUE */}

                  <p className="text-gray-300 mb-3">

                    📍 {event.venue}

                  </p>

                  {/* DATE */}

                  <p className="text-gray-300 mb-6">

                    📅 {event.date}

                  </p>

                  {/* BUTTONS */}

                  <div className="space-y-4">

                    {/* VIEW EVENT */}

                    <Link to={`/event/${event.eventId}`}>

                      <button className="w-full bg-purple-600 py-3 rounded-xl hover:bg-purple-700">

                        View Event

                      </button>

                    </Link>

                    {/* REMOVE */}

                    <button
                      onClick={() =>
                        removeFromWishlist(event.id)
                      }
                      className="w-full bg-red-600 py-3 rounded-xl hover:bg-red-700"
                    >

                      Remove From Wishlist

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  )
}

export default Wishlist