import Navbar from "../components/Navbar"

import { useEffect, useState }
from "react"

import { db }
from "../firebase/firebase"

import {
  collection,
  getDocs,
  addDoc
} from "firebase/firestore"

import { QRCodeCanvas }
from "qrcode.react"

function MyTickets({
  darkMode,
  setDarkMode
}) {

  const [tickets,
    setTickets] =
    useState([])

  const [loading,
    setLoading] =
    useState(true)

  // FETCH BOOKINGS

  useEffect(() => {

    fetchTickets()

  }, [])

  const fetchTickets =
    async () => {

      try {

        const snapshot =
          await getDocs(

            collection(
              db,
              "bookings"
            )

          )

        // CURRENT USER EMAIL

        const currentUser =

          localStorage.getItem(
            "userEmail"
          )

        console.log(
          "CURRENT USER:",
          currentUser
        )

        // FILTER TICKETS

        const ticketData =

          snapshot.docs

            .map((doc) => ({

              id: doc.id,

              ...doc.data()

            }))

            .filter((ticket) => {

              return (

                ticket.attendeeEmail
                  ?.trim()
                  .toLowerCase()

                ===

                currentUser
                  ?.trim()
                  .toLowerCase()

              )

            })

        console.log(
          "FILTERED TICKETS:",
          ticketData
        )

        setTickets(ticketData)

      }

      catch (error) {

        console.log(error)

      }

      setLoading(false)

    }

  // REFUND

  const requestRefund =
    async (ticket) => {

      try {

        await addDoc(

          collection(
            db,
            "refundRequests"
          ),

          {

            bookingId:
              ticket.id,

            attendeeName:
              ticket.attendeeName,

            attendeeEmail:
              ticket.attendeeEmail,

            eventTitle:
              ticket.eventTitle,

            status:
              "Pending",

            createdAt:
              new Date()

          }

        )

        alert(
          "Refund Requested Successfully"
        )

      }

      catch (error) {

        console.log(error)

        alert(
          "Refund Failed"
        )

      }

    }

  // DOWNLOAD

  const downloadTicket =
    (ticket) => {

      const canvas =
        document.getElementById(
          `qr-${ticket.id}`
        )

      if (!canvas) {

        alert(
          "QR Code not found"
        )

        return

      }

      const qrImage =
        canvas.toDataURL(
          "image/png"
        )

      const printWindow =
        window.open(
          "",
          "",
          "width=900,height=700"
        )

      printWindow.document.write(`

      <html>

      <head>

      <title>

      ${ticket.eventTitle}

      Ticket

      </title>

      <style>

      body {

        font-family: Arial;

        background: #0f172a;

        color: white;

        padding: 40px;

        display: flex;

        justify-content: center;

      }

      .ticket {

        background: #1e293b;

        padding: 40px;

        border-radius: 20px;

        width: 500px;

        text-align: center;

      }

      h1 {

        color: #a855f7;

      }

      p {

        font-size: 18px;

        margin: 12px 0;

        text-align: left;

      }

      img {

        width: 220px;

        height: 220px;

        background: white;

        padding: 10px;

        border-radius: 15px;

      }

      </style>

      </head>

      <body>

      <div class="ticket">

      <h1>

      ${ticket.eventTitle}

      </h1>

      <p>
      🎫 Ticket:
      ${ticket.ticketName}
      </p>

      <p>
      👥 Members:
      ${ticket.members || 1}
      </p>

      <p>
      💰 Price:
      ₹${ticket.ticketPrice}
      </p>

      <p>
      👤 Name:
      ${ticket.attendeeName}
      </p>

      <p>
      📧 Email:
      ${ticket.attendeeEmail}
      </p>

      <p>
      🎟 Status:
      ${ticket.checkedIn ? "Checked-In ✅" : "Active"}
      </p>

      <p>
      🆔 Check-In ID:
      ${ticket.checkInId}
      </p>

      <div>

      <img src="${qrImage}" />

      </div>

      </div>

      <script>

      window.onload = () => {

        window.print()

      }

      </script>

      </body>

      </html>

      `)

      printWindow.document.close()

    }

  // LOADING

  if (loading) {

    return (

      <div className="bg-slate-900 min-h-screen text-white flex items-center justify-center">

        <h1 className="text-4xl font-bold">

          Loading Tickets...

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

        <h1 className="text-5xl font-bold mb-10">

          My Tickets

        </h1>

        {

          tickets.length === 0

            ? (

              <div className="text-center mt-20">

                <h2 className="text-3xl font-bold text-gray-400">

                  No Tickets Found

                </h2>

              </div>

            )

            : (

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                {

                  tickets.map((ticket) => (

                    <div
                      key={ticket.id}
                      className="bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-700"
                    >

                      <h2 className="text-4xl font-bold mb-6 text-purple-400">

                        {ticket.eventTitle}

                      </h2>

                      <div className="space-y-4 text-gray-300 mb-8">

                        <p>
                          🎫 Ticket:
                          {" "}
                          {ticket.ticketName}
                        </p>

                        <p>
                          👥 Members:
                          {" "}
                          {ticket.members || 1}
                        </p>

                        <p>
                          💰 Price:
                          ₹{ticket.ticketPrice}
                        </p>

                        <p>
                          👤 Name:
                          {" "}
                          {ticket.attendeeName}
                        </p>

                        <p className="break-all">
                          📧 Email:
                          {" "}
                          {ticket.attendeeEmail}
                        </p>

                        <p>

                          🎟 Status:
                          {" "}

                          {

                            ticket.checkedIn

                              ? (
                                <span className="text-green-400 font-bold">
                                  Checked-In ✅
                                </span>
                              )

                              : (
                                <span className="text-yellow-400 font-bold">
                                  Active
                                </span>
                              )

                          }

                        </p>

                        <p className="text-green-400 font-bold break-all">

                          🆔 Check-In ID:
                          {" "}
                          {ticket.checkInId}

                        </p>

                      </div>

                      {/* REFUND */}

                      {

                        !ticket.checkedIn && (

                          <button

                            onClick={() =>
                              requestRefund(ticket)
                            }

                            className="w-full mb-4 bg-red-500 hover:bg-red-600 py-3 rounded-xl font-bold transition"

                          >

                            Request Refund

                          </button>

                        )

                      }

                      {/* FEEDBACK */}

                      {

                        ticket.checkedIn && (

                          <button

                            onClick={() =>

                              window.location.href =
                                "/feedback"

                            }

                            className="w-full mb-4 bg-yellow-500 hover:bg-yellow-600 py-3 rounded-xl font-bold transition"

                          >

                            Post-Event Feedback Form ⭐

                          </button>

                        )

                      }

                      {/* QR */}

                      <div className="bg-white p-5 rounded-2xl w-fit mx-auto">

                        <QRCodeCanvas
                          id={`qr-${ticket.id}`}
                          value={ticket.checkInId}
                          size={220}
                        />

                      </div>

                      {/* DOWNLOAD */}

                      <button

                        onClick={() =>
                          downloadTicket(ticket)
                        }

                        className="w-full mt-8 bg-purple-600 py-4 rounded-xl hover:bg-purple-700 transition font-bold"

                      >

                        Download Ticket

                      </button>

                    </div>

                  ))

                }

              </div>

            )

        }

      </div>

    </div>

  )

}

export default MyTickets