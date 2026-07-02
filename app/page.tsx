const MOTIVO_FEATURES = [
  "Recomendaciones inteligentes",
  "Comparación objetiva",
  "Costos reales",
  "Explicaciones claras",
];
import Link from "next/link";
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-16 bg-slate-50 px-6 py-16">
      {/* Logo temporal */}
      <span className="text-3xl font-extrabold tracking-tight text-slate-900">
        MOTivo
      </span>

      {/* Hero */}
      <section className="flex max-w-3xl flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl md:text-6xl">
          Encuentra la moto perfecta para ti.
        </h1>

        <p className="max-w-2xl text-lg text-slate-600">
          Responde unas preguntas y recibe una recomendación objetiva basada
          en tu presupuesto, experiencia y necesidades.
        </p>

<Link
  href="/questionnaire"
  className="rounded-full bg-slate-900 px-8 py-3 text-lg font-semibold text-white transition duration-200 hover:bg-slate-800"
>
  Empezar
</Link>
      </section>

      {/* Qué hace MOTivo */}
      <section className="flex w-full max-w-4xl flex-col items-center gap-6">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          ¿Qué hace MOTivo?
        </h2>

        <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
          {MOTIVO_FEATURES.map((feature) => (
            <div
              key={feature}
              className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:shadow-md"
            >
              <p className="font-medium text-slate-700">{feature}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}