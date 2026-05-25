import { useEffect, useState } from "react"

import {
  useParams,
  Link
} from "react-router-dom"

import Navbar from "../components/Navbar"

import { db } from "../firebase/firebase"

import {
  doc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore"

function EventDetails({
  darkMode,
  setDarkMode
}) {

  const { id } = useParams()

  const [event, setEvent] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  const [wishlistLoading,
    setWishlistLoading] =
    useState(false)

  // REVIEW STATES

  const [rating, setRating] =
    useState(5)

  const [review, setReview] =
    useState("")

  const [reviews, setReviews] =
    useState([])

  // ATTENDEES

  const [attendees,
    setAttendees] =
    useState([])

  // EVENT COMPLETED

  const [eventEnded,
    setEventEnded] =
    useState(false)

  // USER BOOKED

  const [userBooked,
    setUserBooked] =
    useState(false)

  // FETCH DATA

  useEffect(() => {

    fetchEvent()

    fetchReviews()

    fetchAttendees()

    checkUserBooking()

  }, [id])

  // FETCH EVENT

  const fetchEvent =
    async () => {

      try {

        const docRef =
          doc(db, "events", id)

        const docSnap =
          await getDoc(docRef)

        if (docSnap.exists()) {

          const eventData = {

            id: docSnap.id,

            ...docSnap.data()

          }

          setEvent(eventData)

          // CHECK EVENT ENDED

          const today =
            new Date()

          today.setHours(
            0, 0, 0, 0
          )

          const eventDate =
            new Date(
              eventData.date
            )

          eventDate.setHours(
            0, 0, 0, 0
          )

          if (
            eventDate <= today
          ) {

            setEventEnded(true)

          }

        }

      }

      catch (error) {

        console.log(error)

      }

      setLoading(false)

    }

  // CHECK USER BOOKING

  const checkUserBooking =
    async () => {

      try {

        const userName =
          localStorage.getItem(
            "userName"
          )

        const q =
          query(

            collection(
              db,
              "bookings"
            ),

            where(
              "eventId",
              "==",
              id
            ),

            where(
              "attendeeName",
              "==",
              userName
            )

          )

        const snapshot =
          await getDocs(q)

        if (!snapshot.empty) {

          setUserBooked(true)

        }

      }

      catch (error) {

        console.log(error)

      }

    }

  // FETCH REVIEWS

  const fetchReviews =
    async () => {

      try {

        const q =
          query(

            collection(
              db,
              "reviews"
            ),

            where(
              "eventId",
              "==",
              id
            )

          )

        const snapshot =
          await getDocs(q)

        const data =
          snapshot.docs.map(
            (doc) => ({

              id: doc.id,

              ...doc.data()

            })
          )

        setReviews(data)

      }

      catch (error) {

        console.log(error)

      }

    }

  // FETCH ATTENDEES

  const fetchAttendees =
    async () => {

      try {

        const q =
          query(

            collection(
              db,
              "bookings"
            ),

            where(
              "eventId",
              "==",
              id
            )

          )

        const snapshot =
          await getDocs(q)

        const data =
          snapshot.docs.map(
            (doc) => ({

              id: doc.id,

              ...doc.data()

            })
          )

        setAttendees(data)

      }

      catch (error) {

        console.log(error)

      }

    }

  // SUBMIT REVIEW

  const submitReview =
    async () => {

      if (!review.trim()) {

        alert(
          "Write a review"
        )

        return

      }

      try {

        const reviewData = {

          eventId:
            id,

          userName:
            localStorage.getItem(
              "userName"
            ) || "User",

          rating:
            Number(rating),

          review:
            review,

          createdAt:
            new Date()

        }

        await addDoc(

          collection(
            db,
            "reviews"
          ),

          reviewData

        )

        alert(
          "Review Submitted Successfully"
        )

        setReview("")

        setRating(5)

        fetchReviews()

      }

      catch (error) {

        console.log(error)

        alert(
          "Review Failed"
        )

      }

    }

  // ADD TO WISHLIST

  const addToWishlist =
    async () => {

      try {

        setWishlistLoading(true)

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

            date:
              event.date,

            category:
              event.category,

            banner:
              event.banner,

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

      setWishlistLoading(false)

    }

  // LOADING

  if (loading) {

    return (

      <div className="bg-slate-900 min-h-screen text-white flex items-center justify-center">

        <h1 className="text-4xl font-bold">

          Loading Event...

        </h1>

      </div>

    )

  }

  // EVENT NOT FOUND

  if (!event) {

    return (

      <div className="bg-slate-900 min-h-screen text-white flex items-center justify-center">

        <h1 className="text-4xl font-bold">

          Event Not Found

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

        {/* BANNER */}

        <img

          src={
            event.banner ||

            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
          }

          alt={event.title}

          className="w-full h-[450px] object-cover rounded-3xl"

        />

        {/* TITLE */}

        <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-5">

          <h1 className="text-5xl font-bold">

            {event.title}

          </h1>

          <button

            onClick={addToWishlist}

            className="bg-pink-600 px-6 py-3 rounded-xl hover:bg-pink-700"

          >

            {

              wishlistLoading

                ? "Adding..."

                : "❤️ Add To Wishlist"

            }

          </button>

        </div>

        {/* DETAILS */}

        <div className="mt-8 space-y-4 text-xl text-gray-300">

          <p>
            📍 {event.venue}
          </p>

          <p>
            📅 {event.date}
          </p>

          <p>
            🎤 {event.category}
          </p>

        </div>

        {/* DESCRIPTION */}

        <div className="mt-16 bg-slate-800 p-8 rounded-3xl">

          <h2 className="text-3xl font-bold mb-6">

            About Event

          </h2>

          <p className="text-gray-300 leading-8 text-lg">

            {event.description}

          </p>

        </div>

        {/* FEEDBACK */}

        {

          eventEnded &&
          userBooked && (

            <div className="bg-slate-800 p-8 rounded-3xl mt-10">

              <h2 className="text-3xl font-bold mb-6 text-purple-400">

                Post Event Feedback

              </h2>

              <select

                value={rating}

                onChange={(e) =>
                  setRating(
                    e.target.value
                  )
                }

                className="w-full p-4 rounded-xl bg-slate-700 mb-5"

              >

                <option value="5">
                  ⭐⭐⭐⭐⭐
                </option>

                <option value="4">
                  ⭐⭐⭐⭐
                </option>

                <option value="3">
                  ⭐⭐⭐
                </option>

                <option value="2">
                  ⭐⭐
                </option>

                <option value="1">
                  ⭐
                </option>

              </select>

              <textarea

                rows="5"

                placeholder="Write your review..."

                value={review}

                onChange={(e) =>
                  setReview(
                    e.target.value
                  )
                }

                className="w-full p-4 rounded-xl bg-slate-700 mb-5"

              />

              <button

                onClick={submitReview}

                className="bg-purple-600 px-8 py-4 rounded-2xl hover:bg-purple-700"

              >

                Submit Review

              </button>

            </div>

          )

        }

        {/* PUBLIC REVIEWS */}

        <div className="mt-10">

          <h2 className="text-3xl font-bold mb-6 text-purple-400">

            Public Reviews & Ratings

          </h2>

          {

            reviews.length > 0

              ? (

                reviews.map((item) => (

                  <div

                    key={item.id}

                    className="bg-slate-800 p-6 rounded-2xl mb-5"

                  >

                    <h3 className="text-xl font-bold">

                      {item.userName}

                    </h3>

                    <p className="text-yellow-400 text-xl">

                      {"⭐".repeat(
                        item.rating
                      )}

                    </p>

                    <p className="text-gray-300 mt-3">

                      {item.review}

                    </p>

                  </div>

                ))

              )

              : (

                <div className="bg-slate-800 p-6 rounded-2xl text-gray-400">

                  No Reviews Yet

                </div>

              )

          }

        </div>

      </div>

    </div>

  )

}

export default EventDetails