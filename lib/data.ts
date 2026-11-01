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
    "https://wa.me/918797303540?text=Namaste%2C%20mujhe%20hospital%20aana%20hai",
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
    bio: "Nawada ke jaane-maane surgeon. Laser piles/fissure/fistula aur laparoscopic surgery me visheshagya — planned aur emergency dono surgery hospital ke apne OT me karte hain.",
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
    bio: "Pregnancy care, delivery aur mahilaon ki health ke liye bharosemand naam. Pehli jaanch se lekar surakshit delivery tak — har kadam par saath.",
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
    icon: "🔬",
    title: "Laser Proctology",
    desc: "Piles, fissure aur fistula ka laser treatment — kam dard, jaldi recovery, aksar same-day discharge.",
  },
  {
    icon: "🩺",
    title: "General & Laparoscopic Surgery",
    desc: "Hernia, appendix, gall bladder aur planned/emergency surgery — apne hi operation theatre me.",
  },
  {
    icon: "🤰",
    title: "Maternity & Women's Health",
    desc: "Pregnancy care, normal delivery, C-section aur mahilaon ki har health problem ka ilaaj.",
  },
  {
    icon: "🚨",
    title: "24×7 Emergency & ICU",
    desc: "Din ho ya raat — emergency care, ICU beds aur OT har samay ready. Centralised oxygen facility.",
  },
  {
    icon: "🧪",
    title: "Pathology Lab",
    desc: "Hospital ki apni lab — blood tests, hormone tests, ECG aur health packages. 24-hour sample collection.",
  },
  {
    icon: "💊",
    title: "In-house Pharmacy",
    desc: "Hospital ke andar hi dawai ki dukaan — ilaaj ke baad bahar bhatakna nahi padta.",
  },
  {
    icon: "👨‍⚕️",
    title: "General Medicine & OPD",
    desc: "Rozana OPD — bukhaar, BP, sugar, pet aur aam bimariyon ki jaanch aur ilaaj MD/MS doctors se.",
  },
  {
    icon: "❤️",
    title: "Health Checkup Packages",
    desc: "Poore parivaar ke liye preventive health checkup — bimari badi hone se pehle pata lagayein.",
  },
];

export const CENTRES: { title: string; desc: string; points: string[] }[] = [
  {
    title: "Laser Proctology & Surgery Centre",
    desc: "1,000+ surgeries performed. Dr. Ranvijay Bharti ke dwara laser aur laparoscopic surgery, hospital ke apne operation theatre me.",
    points: [
      "Laser piles, fissure & fistula — less pain, quicker recovery",
      "Hernia, appendix & gall bladder surgery",
      "10+ years of surgical experience",
    ],
  },
  {
    title: "Women's Health & Maternity Centre",
    desc: "Pregnancy ki pehli jaanch se delivery tak — Dr. Ritu Verma ke saath surakshit aur sammanjanak dekhbhaal, apne hi shahar me.",
    points: [
      "Pregnancy care & regular checkups",
      "Normal delivery & C-section facility",
      "Women's health problems ka poora ilaaj",
    ],
  },
  {
    title: "24×7 Emergency & ICU Centre",
    desc: "Emergency kabhi time dekh kar nahi aati. Isliye Doctors Divine din-raat khula hai — ICU, operation theatre aur trained staff har ghante ready.",
    points: [
      "10+ beds including dedicated ICU",
      "Centralised oxygen facility",
      "Emergency surgery at any hour",
    ],
  },
];

export const LAB_TESTS: { name: string; desc: string; report: string }[] = [
  { name: "Complete Blood Count (CBC)", desc: "Khoon ki poori jaanch", report: "Same day report" },
  { name: "Blood Sugar — Fasting / PP / HbA1c", desc: "Diabetes ki jaanch", report: "Same day report" },
  { name: "Thyroid Profile (T3, T4, TSH)", desc: "Thyroid ki jaanch", report: "Next day report" },
  { name: "Liver & Kidney Function (LFT / KFT)", desc: "Lever aur gurda jaanch", report: "Same day report" },
  { name: "ECG", desc: "Dil ki jaanch — heart attack screening", report: "Turant report" },
  { name: "Hormone Tests", desc: "Hormone profile jaanch", report: "2–3 day report" },
  { name: "Full Body Health Checkup Package", desc: "Poore shareer ki saalana jaanch", report: "Next day report" },
  { name: "Pregnancy Tests & Antenatal Profile", desc: "Garbhavastha ki zaroori jaanch", report: "Same day report" },
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
    q: "Kya hospital 24 ghante khula hai?",
    a: "Haan. Doctors Divine 24×7 chalta hai — emergency care, ICU aur operation theatre din-raat ready hai. OPD ka time doctor ke hisaab se alag ho sakta hai, isliye online slot book karna ya call karke confirm karna sabse achha hai.",
  },
  {
    q: "Hospital kahan hai?",
    a: "Navin Nagar, Nawada, Bihar 805110 — Govardhan Mandir ke paas, Navin Nagar Road par.",
  },
  {
    q: "Kya Nawada me laser piles surgery hoti hai?",
    a: "Haan. Dr. Ranvijay Bharti — general & laparoscopic surgeon aur proctologist — Doctors Divine me hi piles, fissure aur fistula ka laser treatment karte hain. Kam dard, jaldi recovery.",
  },
  {
    q: "Kya hospital me lab aur pharmacy hai?",
    a: "Haan, hospital ki apni pathology lab aur pharmacy dono andar hi hain — jaanch aur dawai ke liye bahar nahi jaana padta.",
  },
  {
    q: "Appointment kaise book karun?",
    a: "Isi website par online book karein — doctor aur time slot khud chunein, token number turant milega. Chahein to WhatsApp ya call (+91 87973 03540) se bhi booking ho jati hai.",
  },
  {
    q: "Kya delivery (prasav) ki suvidha hai?",
    a: "Haan. Dr. Ritu Verma ke nigrani me pregnancy care, normal delivery aur C-section — dono ki suvidha hospital me uplabdh hai.",
  },
];

export const TIMINGS: { label: string; value: string }[] = [
  { label: "Emergency / ICU", value: "24×7 — hamesha khula" },
  { label: "OPD — Dr. Ranvijay Bharti", value: "Subah aur shaam — slot online book karein" },
  { label: "OPD — Dr. Ritu Verma", value: "Subah aur shaam — slot online book karein" },
  { label: "Pathology Lab", value: "24-hour sample collection" },
  { label: "Pharmacy", value: "24×7" },
];
