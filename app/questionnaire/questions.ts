export interface QuestionOption {
  id: string;
  label: string;
}

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
}

export const QUESTIONNAIRE_QUESTIONS: Question[] = [
  {
    id: "budget",
    text: "¿Cuál es tu presupuesto?",
    options: [
      { id: "under-10m", label: "Menos de $10 millones" },
      { id: "10m-15m", label: "Entre $10 y $15 millones" },
      { id: "15m-20m", label: "Entre $15 y $20 millones" },
      { id: "over-20m", label: "Más de $20 millones" },
    ],
  },
  {
    id: "isFirstMotorcycle",
    text: "¿Será tu primera moto?",
    options: [
      { id: "yes", label: "Sí, es mi primera moto" },
      { id: "no", label: "No, ya he tenido moto antes" },
    ],
  },
  {
    id: "mainUse",
    text: "¿Para qué la usarás?",
    options: [
      { id: "work-delivery", label: "Trabajo o domicilios" },
      { id: "daily-commute", label: "Movilidad urbana diaria" },
      { id: "long-trips", label: "Viajes largos" },
      { id: "mixed", label: "Uso mixto" },
    ],
  },
  {
    id: "priority",
    text: "¿Qué valoras más?",
    options: [
      { id: "low-maintenance", label: "Ahorro en mantenimiento" },
      { id: "comfort", label: "Comodidad" },
      { id: "power", label: "Potencia" },
      { id: "resale", label: "Facilidad de reventa" },
    ],
  },
  {
    id: "dailyDistance",
    text: "¿Cuántos kilómetros recorres al día?",
    options: [
      { id: "under-10km", label: "Menos de 10 km" },
      { id: "10-30km", label: "Entre 10 y 30 km" },
      { id: "30-60km", label: "Entre 30 y 60 km" },
      { id: "over-60km", label: "Más de 60 km" },
    ],
  },
  {
    id: "conditionPreference",
    text: "¿Prefieres moto nueva o usada?",
    options: [
      { id: "new", label: "Nueva" },
      { id: "used", label: "Usada" },
      { id: "either", label: "Cualquiera" },
    ],
  },
];