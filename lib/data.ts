/**
 * Shared hospital content. All facts here come from the hospital's own
 * website (doctorsdivine.com) and the earlier demo site — nothing is invented.
 * Phone numbers: appointments +91 74115 90340, alt +91 87973 03540.
 */

export const HOSPITAL = {
  name: "Doctors Divine Multispeciality Hospital",
  shortName: "Doctors Divine",
  addressLines: [
    "Navin Nagar Road, near Govardhan Temple",
    "Nawada, Bihar 805110",
  ],
  addressShort: "Navin Nagar, Nawada, Bihar 805110",
  phoneDisplay: "+91 87973 03540",
  phoneAltDisplay: "+91 74115 90340",
  phoneAltHref: "+917411590340",
  phoneHref: "+918797303540",
  whatsappHref:
    "https://wa.me/918797303540?text=Hello%2C%20I%20want%20to%20visit%20the%20hospital",
  email: "drranvijay@gmail.com",
  website: "doctorsdivine.com",
  since: 2020,
};

export type DoctorOption = "Dr. Ranvijay Bharti" | "Dr. Ritu Verma" | "Other";

export const DOCTORS: {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  specialties: string[];
  opd: string;
}[] = [
  {
    name: "Dr. Ranvijay Bharti",
    title: "General & Laparoscopic Surgeon · Proctologist",
    tagline: "Founder & MD, Doctors Divine · 10+ years experience · 1,000+ surgeries",
    bio: "A well-known surgeon in Nawada. Specialist in laser piles, fissure and fistula treatment and laparoscopic surgery — planned and emergency surgeries are performed in the hospital's own operation theatre.",
    specialties: [
      "Laser Piles",
      "Fissure / Fistula",
      "Laparoscopy",
      "Hernia",
      "Gall Bladder",
      "General Surgery",
    ],
    opd: "OPD — Mon to Sun",
  },
  {
    name: "Dr. Ritu Verma",
    title: "Gynaecologist & Obstetrician",
    tagline: "Women's Health & Maternity Specialist",
    bio: "A trusted name for pregnancy care, delivery and women's health. From the first check-up to a safe delivery — with you at every step.",
    specialties: [
      "Pregnancy Care",
      "Normal Delivery",
      "C-Section",
      "Women's Health",
      "High-risk Pregnancy",
    ],
    opd: "OPD — Mon to Sun",
  },
];

export const MORNING_SLOTS = [
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
];

export const EVENING_SLOTS = [
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
  "07:00 PM",
  "07:30 PM",
];

export const SERVICES: { icon: string; title: string; desc: string }[] = [
  {
    icon: "target",
    title: "Laser Proctology",
    desc: "Laser treatment for piles, fissure and fistula — less pain, faster recovery, often same-day discharge.",
  },
  {
    icon: "scissors",
    title: "General & Laparoscopic Surgery",
    desc: "Hernia, appendix, gall bladder and planned or emergency surgery — in our own operation theatre.",
  },
  {
    icon: "heart",
    title: "Maternity & Women's Health",
    desc: "Pregnancy care, normal delivery, C-section and treatment for every women's health problem.",
  },
  {
    icon: "alert",
    title: "24×7 Emergency & ICU",
    desc: "Day or night — emergency care, ICU beds and OT ready at all times. Centralised oxygen facility.",
  },
  {
    icon: "flask",
    title: "Pathology Lab",
    desc: "The hospital's own lab — blood tests, hormone tests, ECG and health packages. 24-hour sample collection.",
  },
  {
    icon: "capsule",
    title: "In-house Pharmacy",
    desc: "A medicine shop inside the hospital — no need to go elsewhere after treatment.",
  },
  {
    icon: "person",
    title: "General Medicine & OPD",
    desc: "Daily OPD — check-up and treatment for fever, BP, sugar, stomach and common illnesses by MD/MS doctors.",
  },
  {
    icon: "clipboard",
    title: "Health Checkup Packages",
    desc: "Preventive health check-ups for the whole family — detect illness before it grows.",
  },
];

export const CENTRES: { title: string; desc: string; points: string[] }[] = [
  {
    title: "Laser Proctology & Surgery Centre",
    desc: "1,000+ surgeries performed. Laser and laparoscopic surgery by Dr. Ranvijay Bharti, in the hospital's own operation theatre.",
    points: [
      "Laser piles, fissure & fistula — less pain, quicker recovery",
      "Hernia, appendix & gall bladder surgery",
      "10+ years of surgical experience",
    ],
  },
  {
    title: "Women's Health & Maternity Centre",
    desc: "From the first pregnancy check-up to delivery — safe and respectful care with Dr. Ritu Verma, in your own city.",
    points: [
      "Pregnancy care & regular checkups",
      "Normal delivery & C-section facility",
      "Complete treatment for women's health problems",
    ],
  },
  {
    title: "24×7 Emergency & ICU Centre",
    desc: "An emergency never comes at a convenient time. That is why Doctors Divine is open day and night — ICU, operation theatre and trained staff ready every hour.",
    points: [
      "10+ beds including dedicated ICU",
      "Centralised oxygen facility",
      "Emergency surgery at any hour",
    ],
  },
];

export const LAB_TESTS: { name: string; desc: string; report: string }[] = [
  { name: "Complete Blood Count (CBC)", desc: "Complete blood test", report: "Same day report" },
  { name: "Blood Sugar — Fasting / PP / HbA1c", desc: "Diabetes test", report: "Same day report" },
  { name: "Thyroid Profile (T3, T4, TSH)", desc: "Thyroid test", report: "Next day report" },
  { name: "Liver & Kidney Function (LFT / KFT)", desc: "Liver and kidney test", report: "Same day report" },
  { name: "ECG", desc: "Heart test — heart attack screening", report: "Instant report" },
  { name: "Hormone Tests", desc: "Hormone profile test", report: "2–3 day report" },
  { name: "Full Body Health Checkup Package", desc: "Annual full-body test", report: "Next day report" },
  { name: "Pregnancy Tests & Antenatal Profile", desc: "Essential pregnancy tests", report: "Same day report" },
];

export type GalleryItem = {
  src: string;
  caption: string;
  real: boolean; // true = hospital's own real photo; false = illustrative
};

export const GALLERY: GalleryItem[] = [
  { src: "/images/team.jpg", caption: "Our team — Doctors Divine, Navin Nagar", real: true },
  { src: "/images/building.jpg", caption: "Hospital building, Navin Nagar", real: true },
  { src: "/images/surgery.jpg", caption: "Laser & Laparoscopic Surgery", real: true },
  { src: "/images/ot.webp", caption: "Operation Theatre", real: false },
  { src: "/images/icu.jpg", caption: "ICU & Emergency Care", real: false },
  { src: "/images/maternity.jpg", caption: "Maternity Care", real: false },
  { src: "/images/pharmacy.jpg", caption: "In-house Pharmacy", real: false },
];

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Is the hospital open 24 hours?",
    a: "Yes. Doctors Divine runs 24×7 — emergency care, ICU and the operation theatre are ready day and night. OPD timings may vary by doctor, so booking a slot online or confirming by phone is best.",
  },
  {
    q: "Where is the hospital?",
    a: "Navin Nagar, Nawada, Bihar 805110 — near Govardhan Temple, on Navin Nagar Road.",
  },
  {
    q: "Is laser piles surgery available in Nawada?",
    a: "Yes. Dr. Ranvijay Bharti — general & laparoscopic surgeon and proctologist — performs laser treatment for piles, fissure and fistula at Doctors Divine itself. Less pain, faster recovery.",
  },
  {
    q: "Does the hospital have a lab and pharmacy?",
    a: "Yes, the hospital has its own pathology lab and pharmacy inside — no need to go outside for tests or medicines.",
  },
  {
    q: "How do I book an appointment?",
    a: "Book online on this website — choose the doctor and time slot yourself and get a token number instantly. You can also book via WhatsApp or by calling (+91 87973 03540).",
  },
  {
    q: "Is delivery facility available?",
    a: "Yes. Under Dr. Ritu Verma's supervision, pregnancy care, normal delivery and C-section — both facilities are available at the hospital.",
  },
];

export const TIMINGS: { label: string; value: string }[] = [
  { label: "Emergency / ICU", value: "24×7 — always open" },
  { label: "OPD — Dr. Ranvijay Bharti", value: "Morning and evening — book a slot online" },
  { label: "OPD — Dr. Ritu Verma", value: "Morning and evening — book a slot online" },
  { label: "Pathology Lab", value: "24-hour sample collection" },
  { label: "Pharmacy", value: "24×7" },
];
