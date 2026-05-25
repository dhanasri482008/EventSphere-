import Navbar from "../components/Navbar"

import { useState } from "react"

import axios from "axios"

function SmartSchedule({
  darkMode,
  setDarkMode
}) {

  const [sessions, setSessions] =
    useState("")

  const [schedule, setSchedule] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const generateSchedule =
    async () => {

      if (!sessions.trim()) {

        alert(
          "Enter session details"
        )

        return

      }

      try {

        setLoading(true)

        setSchedule("")

        const apiKey =
          import.meta.env
            .VITE_GROQ_API_KEY

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
                    "You are an AI smart event schedule planner."

                },

                {

                  role: "user",

                  content:
                    `Create the best event session schedule.

Sessions:
${sessions}

Optimize based on:
- audience flow
- engagement
- session order
- break timing
- speaker timing

Create professional timetable.`

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

        const result =
          response.data
            .choices[0]
            .message.content

        setSchedule(result)

      }

      catch (error) {

        console.log(error)

        alert(
          "Schedule Generation Failed"
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

      <div className="max-w-5xl mx-auto p-10">

        <h1 className="text-5xl font-bold mb-10">

          AI Smart Schedule Builder

        </h1>

        <textarea

          rows="8"

          placeholder={`Example:

Opening Ceremony
AI Workshop
Lunch Break
Startup Pitch
Coding Challenge
Closing Ceremony`}

          value={sessions}

          onChange={(e) =>
            setSessions(
              e.target.value
            )
          }

          className="w-full p-5 rounded-2xl bg-slate-800 outline-none mb-6 text-lg"

        />

        <button

          onClick={
            generateSchedule
          }

          disabled={loading}

          className="bg-purple-600 px-8 py-4 rounded-2xl hover:bg-purple-700"

        >

          {

            loading

              ? "Generating..."

              : "Generate Smart Schedule"

          }

        </button>

        {

          schedule && (

            <div className="bg-slate-800 p-8 rounded-3xl mt-10">

              <h2 className="text-3xl font-bold mb-6 text-purple-400">

                Smart Event Schedule

              </h2>

              <p className="whitespace-pre-line text-lg leading-8 text-gray-300">

                {schedule}

              </p>

            </div>

          )

        }

      </div>

    </div>

  )

}

export default SmartSchedule