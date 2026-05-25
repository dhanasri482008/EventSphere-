import { useState } from "react"

import Navbar from "../components/Navbar"

import {
  addDoc,
  collection
} from "firebase/firestore"

import { db }
from "../firebase/firebase"

import { useNavigate }
from "react-router-dom"

function Feedback({
  darkMode,
  setDarkMode
}) {

  const [name,
    setName] =
    useState("")

  const [rating,
    setRating] =
    useState(5)

  const [review,
    setReview] =
    useState("")

  const [loading,
    setLoading] =
    useState(false)

  const navigate =
    useNavigate()

  // SUBMIT FEEDBACK

  const submitFeedback =
    async () => {

      if (
        !name ||
        !review
      ) {

        alert(
          "Please fill all fields"
        )

        return

      }

      try {

        setLoading(true)

        await addDoc(

          collection(
            db,
            "reviews"
          ),

          {

            name,

            rating,

            review,

            createdAt:
              new Date()

          }

        )

        alert(
          "⭐ Feedback Submitted Successfully"
        )

        navigate(
          "/notifications"
        )

      }

      catch (error) {

        console.log(error)

        alert(
          "❌ Failed to submit feedback"
        )

      }

      setLoading(false)

    }

  return (

    <div className="bg-slate-900 min-h-screen text-white">

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="max-w-3xl mx-auto p-10">

        <h1 className="text-5xl font-bold mb-10 text-center">

          Post-Event Feedback

        </h1>

        <div className="bg-slate-800 p-10 rounded-3xl shadow-xl">

          {/* NAME */}

          <input

            type="text"

            placeholder="Your Name"

            value={name}

            onChange={(e) =>

              setName(
                e.target.value
              )

            }

            className="w-full p-4 rounded-xl bg-slate-700 mb-6 outline-none"

          />

          {/* RATING */}

          <div className="mb-6">

            <label className="text-xl font-bold">

              Rating ⭐

            </label>

            <select

              value={rating}

              onChange={(e) =>

                setRating(
                  e.target.value
                )

              }

              className="w-full mt-3 p-4 rounded-xl bg-slate-700 outline-none"

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

          </div>

          {/* REVIEW */}

          <textarea

            placeholder="Write your review..."

            value={review}

            onChange={(e) =>

              setReview(
                e.target.value
              )

            }

            rows="6"

            className="w-full p-4 rounded-xl bg-slate-700 outline-none mb-8"

          ></textarea>

          {/* BUTTON */}

          <button

            onClick={
              submitFeedback
            }

            disabled={loading}

            className="w-full bg-yellow-500 hover:bg-yellow-600 py-4 rounded-xl font-bold text-xl transition"

          >

            {

              loading
                ? "Submitting..."
                : "Submit Feedback"

            }

          </button>

        </div>

      </div>

    </div>

  )

}

export default Feedback