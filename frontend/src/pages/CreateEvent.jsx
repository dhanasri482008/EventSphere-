import Navbar from "../components/Navbar"

import { useState } from "react"

import axios from "axios"

import {
  collection,
  addDoc
} from "firebase/firestore"

import {
  db
} from "../firebase/firebase"

function CreateEvent({
  darkMode,
  setDarkMode
}) {

  // EVENT DETAILS

  const [title, setTitle] =
    useState("")

  const [date, setDate] =
    useState("")

  const [time, setTime] =
    useState("")

  const [venue, setVenue] =
    useState("")

  const [category, setCategory] =
    useState("")

  const [description,
    setDescription] =
    useState("")

  const [banner,
    setBanner] =
    useState("")

  // TICKETS

  const [tickets,
    setTickets] =
    useState([

      {
        name: "General",
        price: "",
        quantity: ""
      }

    ])

  // DISCOUNTS

  const [discountCode,
    setDiscountCode] =
    useState("")

  const [discountPercentage,
    setDiscountPercentage] =
    useState("")

  const [discountExpiry,
    setDiscountExpiry] =
    useState("")

  // EARLY BIRD

  const [earlyBirdPrice,
    setEarlyBirdPrice] =
    useState("")

  const [earlyBirdExpiry,
    setEarlyBirdExpiry] =
    useState("")

  // AI DESCRIPTION

  const [aiPrompt,
    setAiPrompt] =
    useState("")

  const [loadingAI,
    setLoadingAI] =
    useState(false)

  // SMART SCHEDULE

  const [sessions,
    setSessions] =
    useState("")

  const [schedule,
    setSchedule] =
    useState("")

  const [loadingSchedule,
    setLoadingSchedule] =
    useState(false)

  // ADD TICKET

  const addTicketTier =
    () => {

      setTickets([

        ...tickets,

        {
          name: "",
          price: "",
          quantity: ""
        }

      ])

    }

  // UPDATE TICKET

  const updateTicket =
    (
      index,
      field,
      value
    ) => {

      const updated =
        [...tickets]

      updated[index][field] =
        value

      setTickets(updated)

    }

  // AI DESCRIPTION

  const generateDescription =
    async () => {

      if (!aiPrompt.trim()) {

        alert(
          "Enter event points"
        )

        return

      }

      try {

        setLoadingAI(true)

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
                    "You are a professional event writer."

                },

                {

                  role: "user",

                  content:
                    `Generate a professional and attractive event description for:

${aiPrompt}

Make it creative and unique.`

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

        setDescription(result)

      }

      catch (error) {

        console.log(error)

        alert(
          "AI Description Failed"
        )

      }

      setLoadingAI(false)

    }

  // SMART SCHEDULE

  const generateSchedule =
    async () => {

      if (!sessions.trim()) {

        alert(
          "Enter sessions"
        )

        return

      }

      try {

        setLoadingSchedule(true)

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
                    "You are an expert event scheduler."

                },

                {

                  role: "user",

                  content:
                    `Create the best professional event schedule for:

${sessions}

Arrange everything professionally with timings.`

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

      setLoadingSchedule(false)

    }

  // CREATE EVENT

  const handleCreateEvent =
    async (e) => {

      e.preventDefault()

      try {

        const newEvent = {

          title,
          date,
          time,
          venue,
          category,
          description,
          banner,

          tickets,

          discountCode,
          discountPercentage,
          discountExpiry,

          earlyBirdPrice,
          earlyBirdExpiry,

          schedule,

          registrations: 0,
          revenue: 0,

          organizer:
            localStorage.getItem(
              "userName"
            ),

          createdAt:
            new Date()

        }

        // SAVE EVENT

        await addDoc(

          collection(
            db,
            "events"
          ),

          newEvent

        )

        // SAVE NOTIFICATION

        await addDoc(

          collection(
            db,
            "notifications"
          ),

          {

            title:
              "🎉 New Event Created",

            message:
              `${title} event was created successfully.`,

            createdAt:
              new Date()

          }

        )

        alert(
          "Event Created Successfully"
        )

        // CLEAR FORM

        setTitle("")
        setDate("")
        setTime("")
        setVenue("")
        setCategory("")
        setDescription("")
        setBanner("")

        setTickets([

          {
            name: "General",
            price: "",
            quantity: ""
          }

        ])

        setDiscountCode("")
        setDiscountPercentage("")
        setDiscountExpiry("")

        setEarlyBirdPrice("")
        setEarlyBirdExpiry("")

        setAiPrompt("")
        setSessions("")
        setSchedule("")

      }

      catch (error) {

        console.log(error)

        alert(
          "Event Creation Failed"
        )

      }

    }

  return (

    <div className="bg-slate-900 min-h-screen text-white">

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="max-w-5xl mx-auto p-10">

        <h1 className="text-5xl font-bold mb-10">

          Create Event

        </h1>

        <form
          onSubmit={handleCreateEvent}
          className="space-y-8"
        >

          {/* BASIC DETAILS */}

          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full p-4 rounded-2xl bg-slate-800"
          />

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            className="w-full p-4 rounded-2xl bg-slate-800"
          />

          <input
            type="time"
            value={time}
            onChange={(e) =>
              setTime(e.target.value)
            }
            className="w-full p-4 rounded-2xl bg-slate-800"
          />

          <input
            type="text"
            placeholder="Venue"
            value={venue}
            onChange={(e) =>
              setVenue(e.target.value)
            }
            className="w-full p-4 rounded-2xl bg-slate-800"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full p-4 rounded-2xl bg-slate-800"
          />

          <input
            type="text"
            placeholder="Banner Image URL"
            value={banner}
            onChange={(e) =>
              setBanner(e.target.value)
            }
            className="w-full p-4 rounded-2xl bg-slate-800"
          />

          {/* AI DESCRIPTION */}

          <div className="bg-slate-800 p-6 rounded-3xl">

            <h2 className="text-3xl font-bold text-purple-400 mb-5">

              AI Description Generator

            </h2>

            <textarea
              rows="5"
              placeholder="Enter event points..."
              value={aiPrompt}
              onChange={(e) =>
                setAiPrompt(e.target.value)
              }
              className="w-full p-5 rounded-2xl bg-slate-700 mb-5"
            />

            <button
              type="button"
              onClick={generateDescription}
              className="bg-purple-600 px-6 py-3 rounded-2xl"
            >

              {
                loadingAI
                  ? "Generating..."
                  : "Generate AI Description"
              }

            </button>

          </div>

          <textarea
            rows="8"
            placeholder="Event Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full p-5 rounded-2xl bg-slate-800"
          />

          {/* TICKETS */}

          <div className="bg-slate-800 p-6 rounded-3xl">

            <h2 className="text-3xl font-bold text-purple-400 mb-5">

              Ticket Types

            </h2>

            {

              tickets.map((ticket, index) => (

                <div
                  key={index}
                  className="grid md:grid-cols-3 gap-4 mb-5"
                >

                  <input
                    type="text"
                    placeholder="Ticket Name"
                    value={ticket.name}
                    onChange={(e) =>
                      updateTicket(
                        index,
                        "name",
                        e.target.value
                      )
                    }
                    className="p-4 rounded-2xl bg-slate-700"
                  />

                  <input
                    type="number"
                    placeholder="Price"
                    value={ticket.price}
                    onChange={(e) =>
                      updateTicket(
                        index,
                        "price",
                        e.target.value
                      )
                    }
                    className="p-4 rounded-2xl bg-slate-700"
                  />

                  <input
                    type="number"
                    placeholder="Capacity"
                    value={ticket.quantity}
                    onChange={(e) =>
                      updateTicket(
                        index,
                        "quantity",
                        e.target.value
                      )
                    }
                    className="p-4 rounded-2xl bg-slate-700"
                  />

                </div>

              ))

            }

            <button
              type="button"
              onClick={addTicketTier}
              className="bg-purple-600 px-5 py-3 rounded-2xl"
            >

              Add Ticket Tier

            </button>

          </div>

          {/* DISCOUNTS */}

          <div className="bg-slate-800 p-6 rounded-3xl space-y-5">

            <h2 className="text-3xl font-bold text-purple-400">

              Pricing & Discounts

            </h2>

            <input
              type="text"
              placeholder="Discount Code"
              value={discountCode}
              onChange={(e) =>
                setDiscountCode(
                  e.target.value
                )
              }
              className="w-full p-4 rounded-2xl bg-slate-700"
            />

            <input
              type="number"
              placeholder="Discount Percentage"
              value={discountPercentage}
              onChange={(e) =>
                setDiscountPercentage(
                  e.target.value
                )
              }
              className="w-full p-4 rounded-2xl bg-slate-700"
            />
            <h4 className="text-3xl font-bold text-purple-400">

              Discount Expiry Date

            </h4>
            <input
              type="date"
              value={discountExpiry}
              onChange={(e) =>
                setDiscountExpiry(
                  e.target.value
                )
              }
              className="w-full p-4 rounded-2xl bg-slate-700"
            />

            <input
              type="number"
              placeholder="Early Bird Price"
              value={earlyBirdPrice}
              onChange={(e) =>
                setEarlyBirdPrice(
                  e.target.value
                )
              }
              className="w-full p-4 rounded-2xl bg-slate-700"
            />
            <h4 className="text-3xl font-bold text-purple-400">

             Early Bird Discount Expiry Date
 
            </h4>
            <input
              type="date"
              value={earlyBirdExpiry}
              onChange={(e) =>
                setEarlyBirdExpiry(
                  e.target.value
                )
              }
              className="w-full p-4 rounded-2xl bg-slate-700"
            />

          </div>

          {/* SMART SCHEDULE */}

          <div className="bg-slate-800 p-6 rounded-3xl">

            <h2 className="text-3xl font-bold text-purple-400 mb-5">

              AI Smart Schedule Builder

            </h2>

            <textarea
              rows="5"
              placeholder="Enter sessions..."
              value={sessions}
              onChange={(e) =>
                setSessions(e.target.value)
              }
              className="w-full p-5 rounded-2xl bg-slate-700 mb-5"
            />

            <button
              type="button"
              onClick={generateSchedule}
              className="bg-purple-600 px-6 py-3 rounded-2xl"
            >

              {
                loadingSchedule
                  ? "Generating..."
                  : "Generate Schedule"
              }

            </button>

            {

              schedule && (

                <div className="bg-slate-700 p-5 rounded-2xl mt-5">

                  <p className="whitespace-pre-line">

                    {schedule}

                  </p>

                </div>

              )

            }

          </div>

          {/* CREATE BUTTON */}

          <button
            type="submit"
            className="w-full bg-purple-600 py-4 rounded-2xl text-xl font-bold hover:bg-purple-700"
          >

            Create Event

          </button>

        </form>

      </div>

    </div>

  )

}

export default CreateEvent