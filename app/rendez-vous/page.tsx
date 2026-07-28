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
  "Contrôle Général",
  "Blanchiment",
  "Implants",
  "Invisalign",
  "Urgence Dentaire",
  "Pédiatrie",
];

export default function RendezVousPage() {
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
        "Merci de remplir les champs requis et d’accepter les conditions.",
      );
      return;
    }

    setError(null);
    setSubmitted(true);
  }

  return (
    <div className="fr-page flex min-h-screen w-full flex-col items-center bg-white">
      <Navbar scrolled={true} />

      <main className="mb-44 flex w-full flex-1 justify-center px-6 pb-24 pt-32 sm:pt-36">
        <div className="grid w-full my-44 max-w-4xl grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          {/* LEFT — abstract shape panel */}
          <div className="relative h-[320px] w-[320px] overflow-visible">
            {/* Circular Image */}
            <div className="absolute left-[-400px] top-[-250px] h-[600px] w-[600px] rounded-full overflow-hidden">
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
              className="absolute bottom-[-80px] right-[10px] h-[300px] w-[300px] rounded-2xl object-cover shadow-xl"
            />
          </div>

          {/* RIGHT — form (unchanged) */}
          <div className="w-full max-w-lg mx-auto">
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
                Prenez Rendez-vous
              </h1>
              <p className="mt-2 text-zinc-500">
                Remplissez le formulaire, nous vous recontactons rapidement.
              </p>
            </div>

            {submitted ? (
              <div className="rounded-xl border border-zinc-100 bg-zinc-50 px-6 py-10 text-center">
                <p className="text-lg font-medium text-zinc-900">
                  Merci{fullName ? `, ${fullName.split(" ")[0]}` : ""} !
                </p>
                <p className="mt-2 text-sm text-zinc-500">
                  Votre demande de rendez-vous a bien été envoyée. Nous vous
                  contactons très vite.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <FormField icon={<User className="h-5 w-5 text-zinc-400" />}>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nom et Prenom"
                    className={inputClasses}
                  />
                </FormField>

                <FormField icon={<Phone className="h-5 w-5 text-zinc-400" />}>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Telephone"
                    className={inputClasses}
                  />
                </FormField>

                <FormField icon={<Mail className="h-5 w-5 text-zinc-400" />}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className={inputClasses}
                  />
                </FormField>

                <FormField
                  icon={<Stethoscope className="h-5 w-5 text-zinc-400" />}
                >
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className={`${inputClasses} appearance-none bg-transparent ${
                      service ? "text-zinc-700" : "text-zinc-400"
                    }`}
                  >
                    <option value="" disabled>
                      Quel soin recherchez-vous ?
                    </option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s} className="text-zinc-700">
                        {s}
                      </option>
                    ))}
                  </select>
                </FormField>

                <div className="flex gap-4">
                  <FormField
                    icon={<CalendarDays className="h-5 w-5 text-zinc-400" />}
                  >
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={`${inputClasses} ${date ? "text-zinc-700" : "text-zinc-400"}`}
                    />
                  </FormField>

                  <FormField icon={<Clock className="h-5 w-5 text-zinc-400" />}>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className={`${inputClasses} ${time ? "text-zinc-700" : "text-zinc-400"}`}
                    />
                  </FormField>
                </div>

                <FormField icon={<PenLine className="h-5 w-5 text-zinc-400" />}>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Comment pouvons-nous vous aider ? N’hésitez pas à nous contacter !"
                    rows={2}
                    className={`${inputClasses} resize-none`}
                  />
                </FormField>

                <label className="flex items-start gap-2.5 pt-2 text-sm text-zinc-500">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span>
                    J’accepte que mes données soumises soient{" "}
                    <a
                      href="/confidentialite"
                      className="underline underline-offset-2 hover:text-zinc-700"
                    >
                      collectées et stockées
                    </a>
                    .
                  </span>
                </label>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <button
                  type="submit"
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 py-3.5 font-medium text-white transition-colors duration-150 hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
                >
                  Confirmer le Rendez-vous
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
  "w-full border-b border-zinc-200 bg-transparent py-2 text-zinc-700 placeholder:text-zinc-400 focus:border-teal-600 focus:outline-none";

function FormField({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="shrink-0">{icon}</span>
      <div className="flex-1">{children}</div>
    </div>
  );
}
