import Navbar from "../components/Navbar"

import { useState, useEffect } from "react"

import axios from "axios"

import {
  collection,
  getDocs
} from "firebase/firestore"

import { db } from "../firebase/firebase"

function UserAI({
  darkMode,
  setDarkMode
}) {

  // USER PAST EVENTS

  const attendedEvents = [

    "AI Hackathon",
    "Startup Meetup",
    "Web Development Workshop"

  ]

  // USER SAVED CATEGORIES

  const savedCategories = [

    "Technology",
    "Coding",
    "Innovation",
    "Artificial Intelligence"

  ]

  // STATES

  const [events, setEvents] =
    useState([])

  const [recommendations,
    setRecommendations] =
    useState("")

  const [loading,
    setLoading] =
    useState(false)

  // FETCH WEBSITE EVENTS

  useEffect(() => {

    fetchEvents()

  }, [])

  const fetchEvents = async () => {

    try {

      const snapshot =
        await getDocs(
          collection(db, "events")
        )

      const data =
        snapshot.docs.map((doc) => ({

          id: doc.id,

          ...doc.data()

        }))

      setEvents(data)

    }

    catch (error) {

      console.log(error)

    }

  }

  // GENERATE AI RECOMMENDATIONS

  const generateRecommendations =
    async () => {

      try {

        setLoading(true)

        setRecommendations("")

        // API KEY

        const apiKey =
          import.meta.env
            .VITE_GROQ_API_KEY

        console.log(
          "API KEY:",
          apiKey
        )

        // CHECK KEY

        if (!apiKey) {

          alert(
            "Groq API Key Missing"
          )

          setLoading(false)

          return

        }

        // CHECK EVENTS

        if (events.length === 0) {

          alert(
            "No events found in website"
          )

          setLoading(false)

          return

        }

        // WEBSITE EVENTS

        const websiteEvents =
          events.map((event) =>

            `Title: ${event.title || event.name}
Category: ${event.category}
Description: ${event.description || "No description"}`

          ).join("\n\n")

        // AI REQUEST

        const response =
          await axios.post(

            "https://api.groq.com/openai/v1/chat/completions",

            {

              model:
                "llama-3.1-8b-instant",

              messages: [

                {

                  role: "system",

                  content:
                    "You are an AI event recommendation assistant."

                },

                {

                  role: "user",

                  content:
                    `Recommend ONLY events from this website.

Available Website Events:

${websiteEvents}

Past events attended:
${attendedEvents.join(", ")}

Saved categories:
${savedCategories.join(", ")}

Recommend the best matching website events with reasons.

DO NOT create imaginary events.
ONLY recommend events from the given website events.`

                }

              ]

            },

            {

              headers: {

                Authorization:
                  `Bearer ${apiKey}`,

                "Content-Type":
                  "application/json"

              }

            }

          )

        console.log(
          response.data
        )

        // GET RESULT

        const result =
          response.data
            .choices[0]
            .message.content

        // SAVE RESULT

        setRecommendations(result)

      }

      catch (error) {

        console.log(error)

        if (
          error.response &&
          error.response.data
        ) {

          alert(
            JSON.stringify(
              error.response.data
            )
          )

        }

        else {

          alert(
            "Recommendation Failed"
          )

        }

      }

      setLoading(false)

    }

  return (

    <div className="bg-slate-900 min-h-screen text-white">

      {/* NAVBAR */}

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* MAIN */}

      <div className="max-w-6xl mx-auto p-10">

        {/* TITLE */}

        <h1 className="text-5xl font-bold mb-10">

          AI Event Recommendations

        </h1>

        {/* USER DATA */}

        <div className="bg-slate-800 p-8 rounded-3xl mb-10">

          <h2 className="text-3xl font-bold mb-6 text-purple-400">

            User Interests

          </h2>

          {/* PAST EVENTS */}

          <div className="mb-8">

            <h3 className="text-2xl font-semibold mb-4">

              Past Events Attended

            </h3>

            <ul className="list-disc ml-8 text-gray-300 space-y-2">

              {

                attendedEvents.map(

                  (event, index) => (

                    <li key={index}>

                      {event}

                    </li>

                  )

                )

              }

            </ul>

          </div>

          {/* SAVED CATEGORIES */}

          <div>

            <h3 className="text-2xl font-semibold mb-4">

              Saved Categories

            </h3>

            <div className="flex flex-wrap gap-3">

              {

                savedCategories.map(

                  (category, index) => (

                    <span
                      key={index}
                      className="bg-purple-600 px-4 py-2 rounded-xl"
                    >

                      {category}

                    </span>

                  )

                )

              }

            </div>

          </div>

        </div>

        {/* WEBSITE EVENTS */}

        <div className="bg-slate-800 p-8 rounded-3xl mb-10">

          <h2 className="text-3xl font-bold mb-6 text-purple-400">

            Website Events

          </h2>

          {

            events.length === 0

              ? (

                <p className="text-gray-400">

                  No events available

                </p>

              )

              : (

                <div className="grid md:grid-cols-2 gap-6">

                  {

                    events.map((event) => (

                      <div
                        key={event.id}
                        className="bg-slate-700 p-5 rounded-2xl"
                      >

                        <h3 className="text-2xl font-bold mb-3">

                          {event.title || event.name}

                        </h3>

                        <p className="text-purple-400 mb-2">

                          {event.category}

                        </p>

                        <p className="text-gray-300">

                          {event.description}

                        </p>

                      </div>

                    ))

                  }

                </div>

              )

          }

        </div>

        {/* BUTTON */}

        <button

          onClick={
            generateRecommendations
          }

          disabled={loading}

          className="bg-purple-600 px-8 py-4 rounded-2xl hover:bg-purple-700 disabled:opacity-50 text-lg font-semibold"

        >

          {

            loading

              ? "Generating..."

              : "Get AI Recommendations"

          }

        </button>

        {/* RESULT */}

        {

          recommendations && (

            <div className="bg-slate-800 p-8 rounded-3xl mt-10 shadow-xl">

              <h2 className="text-3xl font-bold mb-6 text-purple-400">

                Recommended Events

              </h2>

              <p className="whitespace-pre-line text-lg leading-8 text-gray-300">

                {recommendations}

              </p>

            </div>

          )

        }

      </div>

    </div>

  )

}

export default UserAI