import Navbar from "../components/Navbar"
import { useState } from "react"
import axios from "axios"

function AIFeatures({
  darkMode,
  setDarkMode
}) {

  const [points, setPoints] =
    useState("")

  const [description,
    setDescription] =
    useState("")

  const [loading,
    setLoading] =
    useState(false)

  const generateDescription =
    async () => {

      // EMPTY CHECK

      if (!points.trim()) {

        alert(
          "Please enter event details"
        )

        return

      }

      try {

        setLoading(true)

        setDescription("")

        // GET API KEY

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

        // API REQUEST

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
                    "You are a professional event description writer."

                },

                {

                  role: "user",

                  content:
                    `Generate a professional, attractive and creative event description for:

${points}

Make it unique every time.`

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

        // SET RESULT

        setDescription(result)

      }

      catch (error) {

        console.log(error)

        // SHOW REAL ERROR

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
            "AI Generation Failed"
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

      <div className="max-w-5xl mx-auto p-10">

        {/* TITLE */}

        <h1 className="text-5xl font-bold mb-10">

          AI Event Description Generator

        </h1>

        {/* TEXTAREA */}

        <textarea

          rows="8"

          placeholder={`Example:

AI Hackathon
24 Hours
Cash Prize
Innovation
Students
Workshops`}

          value={points}

          onChange={(e) =>
            setPoints(
              e.target.value
            )
          }

          className="w-full p-5 rounded-2xl bg-slate-800 outline-none mb-6 text-lg"

        />

        {/* BUTTON */}

        <button

          onClick={
            generateDescription
          }

          disabled={loading}

          className="bg-purple-600 px-8 py-4 rounded-2xl hover:bg-purple-700 disabled:opacity-50 text-lg font-semibold"

        >

          {

            loading
              ? "Generating..."
              : "Generate AI Description"

          }

        </button>

        {/* RESULT */}

        {

          description && (

            <div className="bg-slate-800 p-8 rounded-3xl mt-10 shadow-xl">

              <h2 className="text-3xl font-bold mb-6 text-purple-400">

                AI Generated Description

              </h2>

              <p className="text-gray-300 whitespace-pre-line leading-8 text-lg">

                {description}

              </p>

            </div>

          )

        }

      </div>

    </div>

  )

}

export default AIFeatures