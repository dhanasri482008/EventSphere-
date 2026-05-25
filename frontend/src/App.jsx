import {

  BrowserRouter,
  Routes,
  Route

} from "react-router-dom"

import { useState }
from "react"

// PAGES

import Home
from "./pages/Home"

import Events
from "./pages/Events"

import EventDetails
from "./pages/EventDetails"

import CreateEvent
from "./pages/CreateEvent"

import Dashboard
from "./pages/Dashboard"

import Booking
from "./pages/Booking"

import MyTickets
from "./pages/MyTickets"

import Wishlist
from "./pages/Wishlist"

import Notifications
from "./pages/Notifications"

import AIFeatures
from "./pages/AIFeatures"

import UserAI
from "./pages/UserAI"

import SmartSchedule
from "./pages/SmartSchedule"

import CheckIn
from "./pages/CheckIn"

import Feedback
from "./pages/Feedback"

// AUTH

import Login
from "./pages/auth/Login"

import Signup
from "./pages/auth/Signup"
function App() {

  const [darkMode,
    setDarkMode] =

    useState(true)

  // USER ROLE

  const role =

    localStorage.getItem(
      "role"
    )

  return (

    <BrowserRouter>

      <div

        className={

          darkMode

            ? "bg-slate-900 text-white min-h-screen"

            : "bg-white text-black min-h-screen"

        }

      >

        <Routes>

          {/* HOME */}

          <Route

            path="/"

            element={

              <Home

                darkMode={darkMode}

                setDarkMode={setDarkMode}

              />

            }

          />

          {/* EVENTS */}

          <Route

            path="/events"

            element={

              <Events

                darkMode={darkMode}

                setDarkMode={setDarkMode}

              />

            }

          />

          {/* EVENT DETAILS */}

          <Route

            path="/event/:id"

            element={

              <EventDetails

                darkMode={darkMode}

                setDarkMode={setDarkMode}

              />

            }

          />

          {/* CREATE EVENT */}

          <Route

            path="/create-event"

            element={

              role === "organizer"

                ? (

                  <CreateEvent

                    darkMode={darkMode}

                    setDarkMode={setDarkMode}

                  />

                )

                : (

                  <div className="flex items-center justify-center min-h-screen text-4xl font-bold">

                    Only Organizers
                    can create events

                  </div>

                )

            }

          />

          {/* DASHBOARD */}

          <Route

            path="/dashboard"

            element={

              role === "organizer"

                ? (

                  <Dashboard

                    darkMode={darkMode}

                    setDarkMode={setDarkMode}

                  />

                )

                : (

                  <div className="flex items-center justify-center min-h-screen text-4xl font-bold">

                    Dashboard
                    is only for organizers

                  </div>

                )

            }

          />

          {/* BOOKING */}

          <Route

            path="/booking/:id"

            element={

              <Booking

                darkMode={darkMode}

                setDarkMode={setDarkMode}

              />

            }

          />

          {/* MY TICKETS */}

          <Route

            path="/my-tickets"

            element={

              <MyTickets

                darkMode={darkMode}

                setDarkMode={setDarkMode}

              />

            }

          />

          {/* WISHLIST */}

          <Route

            path="/wishlist"

            element={

              <Wishlist

                darkMode={darkMode}

                setDarkMode={setDarkMode}

              />

            }

          />

          {/* NOTIFICATIONS */}

          <Route

            path="/notifications"

            element={

              <Notifications

                darkMode={darkMode}

                setDarkMode={setDarkMode}

              />

            }

          />

          {/* FEEDBACK PAGE */}
<Route
  path="/feedback"
  element={
    <Feedback
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    />
  }
/>

          {/* AI FEATURES */}

          <Route

            path="/ai-features"

            element={

              role === "organizer"

                ? (

                  <AIFeatures

                    darkMode={darkMode}

                    setDarkMode={setDarkMode}

                  />

                )

                : (

                  <UserAI

                    darkMode={darkMode}

                    setDarkMode={setDarkMode}

                  />

                )

            }

          />

          {/* SMART SCHEDULE */}

          <Route

            path="/smart-schedule"

            element={

              role === "organizer"

                ? (

                  <SmartSchedule

                    darkMode={darkMode}

                    setDarkMode={setDarkMode}

                  />

                )

                : (

                  <div className="flex items-center justify-center min-h-screen text-4xl font-bold">

                    Smart Schedule Builder
                    is only for organizers

                  </div>

                )

            }

          />

          {/* CHECK-IN */}

          <Route

            path="/check-in"

            element={

              role === "organizer"

                ? (

                  <CheckIn

                    darkMode={darkMode}

                    setDarkMode={setDarkMode}

                  />

                )

                : (

                  <div className="flex items-center justify-center min-h-screen text-4xl font-bold">

                    Check-In System
                    is only for organizers

                  </div>

                )

            }

          />

          {/* LOGIN */}

          <Route

            path="/login"

            element={

              <Login

                darkMode={darkMode}

                setDarkMode={setDarkMode}

              />

            }

          />

          {/* SIGNUP */}

          <Route

            path="/signup"

            element={

              <Signup

                darkMode={darkMode}

                setDarkMode={setDarkMode}

              />

            }

          />

          {/* PAGE NOT FOUND */}

          <Route

            path="*"

            element={

              <div className="bg-slate-900 text-white min-h-screen flex items-center justify-center text-4xl font-bold">

                Page Not Found

              </div>

            }

          />

        </Routes>

      </div>

    </BrowserRouter>

  )

}

export default App