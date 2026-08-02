export const siteConfig = {
  name: "વિજ્ઞાન",
  fullName: "વિજ્ઞાન — Gyan Academy",
  tagline: "Gyan Academy",
  description:
    "ધોરણ 6–10 વિજ્ઞાન અને વિજ્ઞાન પદ્ધતિશાસ્ત્ર — થિયરી વાંચો, MCQ ટેસ્ટ આપો અને મૂળ PDF વાંચો. Gyan Academy, ગાંધીનગર.",
  language: "gu",
  phone: ["87582 77555", "87583 77555"],
  email: "web.dev.gyanacademy@gmail.com",
  place: "ગાંધીનગર, ગુજરાત",
} as const;

export const storageKeys = {
  theme: "science-theme",
  fontSize: "science-font-size",
  pdfPagePrefix: "science-pdf-page",
  /** પ્રતિ સેટ best score → science-result-{subjectId}-{topicId}-{setId} */
  resultPrefix: "science-result",
} as const;
