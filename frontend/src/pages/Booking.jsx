import { useEffect, useState }
from "react"

import {
  useParams
} from "react-router-dom"

import Navbar
from "../components/Navbar"

import { db }
from "../firebase/firebase"

import {
  collection,
  addDoc,
  doc,
  updateDoc,
  increment,
  getDoc
} from "firebase/firestore"

import QRCode
from "react-qr-code"

function Booking({
  darkMode,
  setDarkMode
}) {

  const { id } =
    useParams()

  const [event,
    setEvent] =
    useState(null)

  const [loadingEvent,
    setLoadingEvent] =
    useState(true)

  const [selectedTicket,
    setSelectedTicket] =
    useState("")

  const [selectedPrice,
    setSelectedPrice] =
    useState(0)

  const [members,
    setMembers] =
    useState(1)

  const [email,
    setEmail] =
    useState("")

  const [linkedin,
    setLinkedin] =
    useState("")

  const [paymentMethod,
    setPaymentMethod] =
    useState("UPI")

  // DISCOUNT

  const [discountCode,
    setDiscountCode] =
    useState("")

  const [earlyBirdCode,
    setEarlyBirdCode] =
    useState("")

  const [discountAmount,
    setDiscountAmount] =
    useState(0)

  const [finalPrice,
    setFinalPrice] =
    useState(0)

  const [loading,
    setLoading] =
    useState(false)

  const [bookingSuccess,
    setBookingSuccess] =
    useState(false)

  const [qrValue,
    setQrValue] =
    useState("")

  const [checkInId,
    setCheckInId] =
    useState("")

  const currentUserName =

    localStorage.getItem(
      "userName"
    ) || "User"

  // FETCH EVENT

  useEffect(() => {

    fetchEvent()

  }, [])

  const fetchEvent =
    async () => {

      try {

        const docRef =
          doc(
            db,
            "events",
            id
          )

        const docSnap =
          await getDoc(docRef)

        if (docSnap.exists()) {

          const eventData = {

            id: docSnap.id,

            ...docSnap.data()

          }

          if (
            !Array.isArray(
              eventData.tickets
            )
          ) {

            eventData.tickets = []

          }

          setEvent(eventData)

        }

      }

      catch (error) {

        console.log(error)

      }

      setLoadingEvent(false)

    }

  // SELECT TICKET

  const handleTicketSelect =
    (e) => {

      const ticketName =
        e.target.value

      setSelectedTicket(
        ticketName
      )

      const ticket =
        event?.tickets?.find(
          (t) =>
            t.name === ticketName
        )

      setSelectedPrice(

        Number(
          ticket?.price || 0
        )

      )

    }

  // DISCOUNT CALCULATION

  useEffect(() => {

    const total =

      Number(selectedPrice) *
      Number(members)

    let discount = 0

    // DISCOUNT CODE

    if (

      discountCode
        .trim()
        .toUpperCase()

      ===

      "SAVE10"

    ) {

      discount +=
        total * 0.10

    }

    // EARLY BIRD

    if (

      earlyBirdCode
        .trim()
        .toUpperCase()

      ===

      "EARLY20"

    ) {

      discount +=
        total * 0.20

    }

    // FINAL PRICE

    const finalPriceValue =

      Math.max(
        total - discount,
        0
      )

    setDiscountAmount(

      Math.round(discount)

    )

    setFinalPrice(

      Math.round(
        finalPriceValue
      )

    )

  }, [

    selectedPrice,

    members,

    discountCode,

    earlyBirdCode

  ])

  // BOOKING

  const handleBooking =
    async () => {

      if (

        !selectedTicket ||

        !linkedin ||

        !email ||

        members < 1

      ) {

        alert(
          "Please fill all fields"
        )

        return

      }

      try {

        setLoading(true)

        // CHECK-IN ID

        const generatedCheckInId =

          "CHK-" +

          Math.floor(
            100000 +
            Math.random() * 900000
          )

        setCheckInId(
          generatedCheckInId
        )

        // QR

        const generatedQR =
          generatedCheckInId

        setQrValue(
          generatedQR
        )

        // PAYMENT

        alert(
          `Payment Successful via ${paymentMethod}`
        )

        // SAVE BOOKING

        await addDoc(

          collection(
            db,
            "bookings"
          ),

          {

            eventId:
              event.id,

            eventTitle:
              event.title,

            eventDate:
              event.date,

            ticketName:
              selectedTicket,

            ticketPrice:
              finalPrice,

            members,

            attendeeName:
              currentUserName,

            attendeeEmail:
              email,

            linkedin,

            paymentMethod,

            discountCode,

            earlyBirdCode,

            discountAmount,

            qrCode:
              generatedQR,

            checkInId:
              generatedCheckInId,

            checkedIn:
              false,

            feedbackPending:
              false,

            createdAt:
              new Date()

          }

        )

        // UPDATE EVENT

        const eventRef =
          doc(
            db,
            "events",
            event.id
          )

        await updateDoc(

          eventRef,

          {

            registrations:
              increment(members),

            revenue:
              increment(
                finalPrice
              )

          }

        )

        // NOTIFICATION

        await addDoc(

          collection(
            db,
            "notifications"
          ),

          {

            title:
              "🎟 Ticket Confirmed",

            message:
              `${currentUserName} booked ${members} ticket(s) for ${event.title}`,

            attendeeEmail:
              email,

            eventId:
              event.id,

            createdAt:
              new Date()

          }

        )

        // SAVE EMAIL

        localStorage.setItem(
          "userEmail",
          email
        )

        // SUCCESS

        setBookingSuccess(true)

      }

      catch (error) {

        console.log(error)

        alert(
          "Booking Failed"
        )

      }

      setLoading(false)

    }

  // LOADING

  if (loadingEvent) {

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

      <div className="flex justify-center items-center py-20 px-5">

        <div className="bg-slate-800 p-10 rounded-3xl w-full max-w-[550px] shadow-2xl">

          <h1 className="text-4xl font-bold mb-8 text-center">

            Book Ticket

          </h1>

          {/* EVENT */}

          <div className="bg-slate-700 p-6 rounded-2xl mb-8">

            <h2 className="text-2xl font-bold mb-4">

              {event.title}

            </h2>

            <p className="text-gray-300">

              📍 {event.venue}

            </p>

            <p className="text-gray-300 mt-2">

              📅 {event.date}

            </p>

          </div>

          {

            bookingSuccess

              ? (

                <div className="text-center">

                  <h2 className="text-3xl font-bold text-green-400 mb-6">

                    Booking Successful 🎉

                  </h2>

                  {/* QR */}

                  <div className="flex justify-center">

                    <div className="bg-white p-5 rounded-2xl inline-block">

                      <QRCode
                        value={qrValue || "TEST"}
                        size={220}
                      />

                    </div>

                  </div>

                  {/* CHECK-IN */}

                  <p className="mt-6 text-purple-400 text-xl font-bold">

                    🆔 Check-In ID:
                    {" "}
                    {checkInId}

                  </p>

                  <p className="mt-4 text-gray-300">

                    Show this QR at entry

                  </p>

                </div>

              )

              : (

                <>

                  {/* TICKET */}

                  <select

                    value={selectedTicket}

                    onChange={handleTicketSelect}

                    className="w-full p-4 rounded-xl bg-slate-700 mb-5 outline-none"

                  >

                    <option value="">

                      Select Ticket Type

                    </option>

                    {

                      event?.tickets?.map(

                        (
                          ticket,
                          index
                        ) => (

                          <option
                            key={index}
                            value={ticket.name}
                          >

                            {ticket.name}
                            {" "}
                            -
                            ₹{ticket.price}

                          </option>

                        )

                      )

                    }

                  </select>

                  {/* MEMBERS */}

                  <input

                    type="number"

                    min="1"

                    value={members}

                    onChange={(e) =>

                      setMembers(
                        Number(
                          e.target.value
                        )
                      )

                    }

                    placeholder="Number of Members"

                    className="w-full p-4 rounded-xl bg-slate-700 mb-5 outline-none"

                  />

                  {/* PRICE DETAILS */}

                  {

                    selectedPrice > 0 && (

                      <div className="bg-slate-700 p-5 rounded-xl mb-5 space-y-3">

                        <p className="text-lg">

                          🎟 Ticket Price:
                          ₹
                          {selectedPrice}

                        </p>

                        <p className="text-lg">

                          👥 Members:
                          {members}

                        </p>

                        <p className="text-lg">

                          💰 Subtotal:
                          ₹
                          {
                            selectedPrice * members
                          }

                        </p>

                        {

                          discountCode && (

                            <p className="text-green-400 text-lg">

                              🏷 Discount Code Applied:
                              {discountCode}

                            </p>

                          )

                        }

                        {

                          earlyBirdCode && (

                            <p className="text-blue-400 text-lg">

                              🐦 Early Bird Applied:
                              {earlyBirdCode}

                            </p>

                          )

                        }

                        <p className="text-lg text-green-400 font-bold">

                          💸 Total Discount:
                          ₹
                          {discountAmount}

                        </p>

                        <hr className="border-slate-500" />

                        <p className="text-3xl font-bold text-purple-400">

                          Final Price:
                          ₹
                          {finalPrice}

                        </p>

                      </div>

                    )

                  }

                  {/* USER */}

                  <div className="bg-slate-700 p-4 rounded-xl mb-5">

                    👤 {currentUserName}

                  </div>

                  {/* EMAIL */}

                  <input

                    type="email"

                    placeholder="Enter Your Email"

                    value={email}

                    onChange={(e) =>

                      setEmail(
                        e.target.value
                      )

                    }

                    className="w-full p-4 rounded-xl bg-slate-700 mb-5 outline-none"

                  />

                  {/* DISCOUNT */}

                  <input

                    type="text"

                    placeholder="Discount Code (Optional)"

                    value={discountCode}

                    onChange={(e) =>

                      setDiscountCode(
                        e.target.value
                      )

                    }

                    className="w-full p-4 rounded-xl bg-slate-700 mb-5 outline-none"

                  />

                  {/* EARLY BIRD */}

                  <input

                    type="text"

                    placeholder="Early Bird Code (Optional)"

                    value={earlyBirdCode}

                    onChange={(e) =>

                      setEarlyBirdCode(
                        e.target.value
                      )

                    }

                    className="w-full p-4 rounded-xl bg-slate-700 mb-5 outline-none"

                  />

                  {/* LINKEDIN */}

                  <input

                    type="text"

                    placeholder="LinkedIn URL"

                    value={linkedin}

                    onChange={(e) =>

                      setLinkedin(
                        e.target.value
                      )

                    }

                    className="w-full p-4 rounded-xl bg-slate-700 mb-5 outline-none"

                  />

                  {/* PAYMENT */}

                  <select

                    value={paymentMethod}

                    onChange={(e) =>

                      setPaymentMethod(
                        e.target.value
                      )

                    }

                    className="w-full p-4 rounded-xl bg-slate-700 mb-8 outline-none"

                  >

                    <option>
                      UPI
                    </option>

                    <option>
                      Credit Card
                    </option>

                    <option>
                      Debit Card
                    </option>

                    <option>
                      Net Banking
                    </option>

                  </select>

                  {/* BUTTON */}

                  <button

                    onClick={handleBooking}

                    disabled={loading}

                    className="w-full bg-purple-600 py-4 rounded-xl hover:bg-purple-700 transition font-bold"

                  >

                    {

                      loading
                        ? "Booking..."
                        : "Confirm Booking"

                    }

                  </button>

                </>

              )

          }

        </div>

      </div>

    </div>

  )

}

export default Booking