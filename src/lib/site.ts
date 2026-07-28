export const siteConfig = {
  name: "વિજ્ઞાન",
  fullName: "વિજ્ઞાન — Gyan Academy",
  tagline: "Gyan Academy",
  description:
    "ધોરણ 6 વિજ્ઞાન — થિયરી વાંચો, MCQ ટેસ્ટ આપો અને મૂળ PDF જુઓ. Gyan Academy, ગાંધીનગર.",
  language: "gu",
  phone: ["87582 77555", "87583 77555"],
  email: "web.dev.gyanacademy@gmail.com",
  place: "ગાંધીનગર, ગુજરાત",
} as const;

export const storageKeys = {
  theme: "science-theme",
  fontSize: "science-font-size",
  /** પ્રતિ સેટ best score → science-result-{subjectId}-{topicId}-{setId} */
  resultPrefix: "science-result",
} as const;
