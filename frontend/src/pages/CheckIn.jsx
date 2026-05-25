import Navbar from "../components/Navbar"

import { useEffect, useState }
from "react"

import { Html5QrcodeScanner }
from "html5-qrcode"

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc
} from "firebase/firestore"

import { db }
from "../firebase/firebase"

function CheckIn({
  darkMode,
  setDarkMode
}) {

  const [checkInId,
    setCheckInId] =
    useState("")

  const [message,
    setMessage] =
    useState("")

  const [loading,
    setLoading] =
    useState(false)

  const [attendee,
    setAttendee] =
    useState(null)

  // PROCESS CHECK-IN

  const processCheckIn =
    async (id) => {

      if (!id) {

        setMessage(
          "❌ Invalid QR Code"
        )

        return

      }

      try {

        setLoading(true)

        const cleanedId =

          id
            .replace(/\s/g, "")
            .trim()

        // GET BOOKINGS

        const snapshot =
          await getDocs(

            collection(
              db,
              "bookings"
            )

          )

        let booking = null

        snapshot.forEach((docItem) => {

          const data =
            docItem.data()

          if (
            data.checkInId ===
            cleanedId
          ) {

            booking = {

              id: docItem.id,

              ...data

            }

          }

        })

        // NOT FOUND

        if (!booking) {

          setMessage(
            "❌ Ticket Not Found"
          )

          setAttendee(null)

          setLoading(false)

          return

        }

        // ALREADY CHECKED-IN

        if (
          booking.checkedIn
        ) {

          setMessage(
            "⚠ Already Checked-In"
          )

          setAttendee(
            booking
          )

          setLoading(false)

          return

        }

        // UPDATE BOOKING

        await updateDoc(

          doc(
            db,
            "bookings",
            booking.id
          ),

          {

            checkedIn: true

          }

        )

        // SEND FEEDBACK NOTIFICATION

        await addDoc(

          collection(
            db,
            "notifications"
          ),

          {

            title:
              "⭐ Feedback Form",

            message:
              `${booking.attendeeName}, please give feedback for ${booking.eventTitle}`,

            attendeeEmail:
              booking.attendeeEmail,

            createdAt:
              new Date()

          }

        )

        // SUCCESS

        setMessage(
          "✅ Check-In Successful"
        )

        // SHOW ATTENDEE

        setAttendee({

          ...booking,

          checkedIn: true

        })

        alert(
          "⭐ Feedback Notification Sent Successfully"
        )

        setCheckInId("")

      }

      catch (error) {

        console.log(error)

        setMessage(
          "❌ Check-In Failed"
        )

      }

      setLoading(false)

    }

  // MANUAL CHECK-IN

  const handleManualCheckIn =
    async () => {

      processCheckIn(
        checkInId
      )

    }

  // QR SCANNER

  useEffect(() => {

    let scanner = null

    const startScanner =
      async () => {

        try {

          scanner =
            new Html5QrcodeScanner(

              "reader",

              {

                fps: 10,

                qrbox: {

                  width: 250,

                  height: 250

                }

              },

              false

            )

          scanner.render(

            (decodedText) => {

              processCheckIn(
                decodedText
              )

            },

            () => {

              // ignore errors

            }

          )

        }

        catch (error) {

          console.log(error)

        }

      }

    startScanner()

    return () => {

      if (scanner) {

        scanner.clear()

      }

    }

  }, [])

  return (

    <div className="bg-slate-900 min-h-screen text-white">

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="max-w-4xl mx-auto p-10">

        <h1 className="text-5xl font-bold text-center mb-10">

          QR Check-In System

        </h1>

        {/* QR */}

        <div className="bg-slate-800 p-8 rounded-3xl mb-10">

          <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">

            Scan QR Code

          </h2>

          <div
            id="reader"
            className="overflow-hidden rounded-2xl"
          ></div>

        </div>

        {/* MANUAL */}

        <div className="bg-slate-800 p-8 rounded-3xl">

          <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">

            Manual Check-In

          </h2>

          <input

            type="text"

            placeholder="Enter Check-In ID"

            value={checkInId}

            onChange={(e) =>

              setCheckInId(
                e.target.value
              )

            }

            className="w-full p-4 rounded-xl bg-slate-700 mb-6 outline-none"

          />

          <button

            onClick={
              handleManualCheckIn
            }

            disabled={loading}

            className="w-full bg-purple-600 py-4 rounded-xl hover:bg-purple-700 font-bold"

          >

            {

              loading

                ? "Checking..."

                : "Check-In Attendee"

            }

          </button>

        </div>

        {/* MESSAGE */}

        {

          message && (

            <div className="mt-10 text-center text-3xl font-bold">

              {message}

            </div>

          )

        }

        {/* ATTENDEE DETAILS */}

        {

          attendee && (

            <div className="bg-slate-800 p-10 rounded-3xl mt-10">

              <h2 className="text-4xl font-bold mb-8 text-purple-400">

                Attendee Details

              </h2>

              <div className="space-y-5 text-2xl text-gray-300">

                <p>
                  👤 Name:
                  {" "}
                  {attendee.attendeeName}
                </p>

                <p>
                  📧 Email:
                  {" "}
                  {attendee.attendeeEmail}
                </p>

                <p>
                  🎫 Ticket:
                  {" "}
                  {attendee.ticketName}
                </p>

                <p>
                  👥 Members:
                  {" "}
                  {attendee.members || 1}
                </p>

                <p>
                  💰 Price:
                  ₹
                  {attendee.ticketPrice}
                </p>

                <p className="text-green-400 font-bold">

                  🆔 Check-In ID:
                  {" "}
                  {attendee.checkInId}

                </p>

                <p>
                  🎉 Event:
                  {" "}
                  {attendee.eventTitle}
                </p>

                <p>
                  ✅ Status:
                  {" "}

                  {

                    attendee.checkedIn

                      ? "Checked-In"

                      : "Pending"

                  }

                </p>

              </div>

            </div>

          )

        }

      </div>

    </div>

  )

}

export default CheckIn