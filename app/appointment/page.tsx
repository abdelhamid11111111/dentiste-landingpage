"use client";

import { useState } from "react";
import {
  User,
  Phone,
  Mail,
  Stethoscope,
  CalendarDays,
  Clock,
  PenLine,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SERVICES = [
  "General Check-up",
  "Whitening",
  "Implants",
  "Invisalign",
  "Dental Emergency",
  "Pediatric Care",
];

export default function AppointmentPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim() || !consent) {
      setError(
        "Please fill in the required fields and accept the terms.",
      );
      return;
    }

    setError(null);
    setSubmitted(true);
  }

  return (
    <div className="flex fr-page min-h-screen w-full flex-col items-center bg-[#fafafa] overflow-x-hidden selection:bg-teal-100 selection:text-teal-900">
      

      <Navbar scrolled={true} />

      {/* Increased padding top (pt-40/48) and margin bottom (mb-32/48) for generous spacing */}
      <main className="mb-32 my-40 flex w-full flex-1 justify-center px-5 pt-40 pb-16 sm:px-8 lg:mb-48 lg:pt-48 lg:pb-24">
        <div className="grid w-full my-40 max-w-6xl grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center lg:gap-24">
          
          {/* LEFT — abstract shape panel */}
          <div className="relative mx-auto h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] lg:mx-0 lg:h-[450px] lg:w-[450px] lg:overflow-visible">
            {/* Circular Image */}
            <div className="absolute left-0 top-0 z-0 h-[240px] w-[240px] overflow-hidden rounded-full border-[8px] border-[#fafafa] shadow-2xl sm:h-[320px] sm:w-[320px] lg:left-[-250px] lg:top-[-150px] lg:h-[650px] lg:w-[650px] lg:border-none lg:shadow-none">
              <img
                src="https://www.cityorthopeds.com/wp-content/uploads/2015/05/Young-girl-sitting-on-dental-chair-getting-her-teeth-checked-by-a-dentist.jpg"
                alt="Circle visual"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Square Image */}
            <img
              src="https://www.londondentalsmiles.co.uk/wp-content/uploads/2021/07/invisalign-mobile-.jpg"
              alt="Square visual"
              className="absolute bottom-[-20px] right-[-10px] z-10 h-[180px] w-[180px] rounded-3xl border-[8px] border-[#fafafa] object-cover shadow-2xl sm:h-[240px] sm:w-[240px] lg:bottom-[20px] lg:right-[-60px] lg:h-[320px] lg:w-[320px] lg:border-none"
            />
          </div>

          {/* RIGHT — modern form */}
          <div className="mx-auto w-full max-w-xl lg:mx-0">
            {/* Added mb-12 to push the form down from the heading */}
            <div className="mb-12 text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
                Book an Appointment
              </h1>
              <p className="mt-4 text-base mx-6 text-zinc-500 sm:text-lg">
                Fill in the form below and our team will get back to you very shortly.
              </p>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-zinc-100 bg-white p-12 text-center shadow-xl shadow-zinc-200/40 lg:items-start lg:text-left">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                  <CalendarDays className="h-8 w-8" />
                </div>
                <p className="text-2xl font-semibold text-zinc-900">
                  Thank you{fullName ? `, ${fullName.split(" ")[0]}` : ""}!
                </p>
                <p className="mt-3 text-zinc-500 leading-relaxed">
                  Your request has been received. We&apos;ll call you very soon to confirm the date and time.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl bg-white p-6 shadow-xl shadow-zinc-200/40 sm:p-10">
                <FormField icon={<User className="h-5 w-5" />}>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full name"
                    className={inputClasses}
                  />
                </FormField>

                <FormField icon={<Phone className="h-5 w-5" />}>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                    className={inputClasses}
                  />
                </FormField>

                <FormField icon={<Mail className="h-5 w-5" />}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className={inputClasses}
                  />
                </FormField>

                <FormField icon={<Stethoscope className="h-5 w-5" />}>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className={`${inputClasses} appearance-none bg-transparent ${
                      service ? "text-zinc-900" : "text-zinc-400"
                    }`}
                  >
                    <option value="" disabled>
                      Which treatment are you looking for?
                    </option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s} className="text-zinc-900">
                        {s}
                      </option>
                    ))}
                  </select>
                </FormField>

                <div className="flex flex-col gap-5 sm:flex-row">
                  <FormField icon={<CalendarDays className="h-5 w-5" />}>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={`${inputClasses} ${date ? "text-zinc-900" : "text-zinc-400"}`}
                    />
                  </FormField>

                  <FormField icon={<Clock className="h-5 w-5" />}>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className={`${inputClasses} ${time ? "text-zinc-900" : "text-zinc-400"}`}
                    />
                  </FormField>
                </div>

                <FormField icon={<PenLine className="h-5 w-5" />}>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you?"
                    rows={3}
                    className={`${inputClasses} min-h-[100px] resize-none pt-4`}
                  />
                </FormField>

                <label className="flex items-start gap-4 py-2 text-sm text-zinc-500 cursor-pointer group">
                  <div className="relative flex h-5 w-5 shrink-0 items-center justify-center mt-0.5">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="peer h-5 w-5 appearance-none rounded-md border-2 border-zinc-200 bg-zinc-50 transition-all checked:border-teal-600 checked:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-600/20"
                    />
                    <svg
                      className="pointer-events-none absolute h-3 w-3 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="leading-relaxed transition-colors group-hover:text-zinc-700">
                    I agree that the data I submit may be{" "}
                    <a
                      href="/privacy"
                      className="font-medium text-zinc-900 underline underline-offset-4 hover:text-teal-600"
                    >
                      collected and stored
                    </a>
                    .
                  </span>
                </label>

                {error && <p className="text-sm font-medium text-red-500 px-1">{error}</p>}

                <button
                  type="submit"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#09090b] px-6 py-4 text-base font-semibold text-white shadow-xl shadow-zinc-900/20 transition-all duration-200 hover:scale-[1.01] hover:bg-zinc-800 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-zinc-900/20"
                >
                  Confirm Appointment
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const inputClasses =
  "w-full rounded-2xl border border-zinc-200 bg-zinc-50/50 px-4 py-3.5 pl-12 text-[15px] text-zinc-900 placeholder:text-zinc-400 transition-all focus:border-teal-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-600/10";

function FormField({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="relative group">
      <div className="pointer-events-none absolute left-4 top-[14px] text-zinc-400 transition-colors group-focus-within:text-teal-600">
        {icon}
      </div>
      {children}
    </div>
  );
}