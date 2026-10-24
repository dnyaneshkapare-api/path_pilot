import { AssessmentQuestion } from "@/types";

export const RIASEC_ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // Realistic (R) - Hands-on, practical, physical, machinery, nature
  {
    id: "q1",
    dimension: "R",
    category: "Practical & Physical",
    textEn: "I enjoy assembling electronic devices, repairing hardware, or fixing mechanical things.",
    textHi: "मुझे इलेक्ट्रॉनिक उपकरण जोड़ना, हार्डवेयर ठीक करना या मशीनरी पर काम करना पसंद है।",
    textMr: "मला इलेक्ट्रॉनिक उपकरणे जोडणे, हार्डवेअर दुरुस्त करणे किंवा मशिनरीवर काम करणे आवडते."
  },
  {
    id: "q2",
    dimension: "R",
    category: "Practical & Outdoor",
    textEn: "I prefer working with tangible equipment, outdoor fieldwork, or construction models over sitting at a desk all day.",
    textHi: "मुझे पूरे दिन डेस्क पर बैठने के बजाय वास्तविक उपकरणों, आउटडोर फील्डवर्क या निर्माण मॉडल पर काम करना बेहतर लगता है।",
    textMr: "मला दिवसभर डेस्कवर बसण्यापेक्षा उपकरणांसह, प्रत्यक्ष मैदानी कामात किंवा मॉडेलवर काम करणे जास्त आवडते."
  },
  // Investigative (I) - Analytical, intellectual, scientific, inquiry
  {
    id: "q3",
    dimension: "I",
    category: "Analytical & Research",
    textEn: "I love exploring how things work scientifically, analyzing data patterns, or solving complex mathematical logic puzzles.",
    textHi: "मुझे वैज्ञानिक रूप से चीजें कैसे काम करती हैं यह जानना, डेटा विश्लेषण और गणितीय पहेलियां हल करना पसंद है।",
    textMr: "मला गोष्टी शास्त्रीयदृष्ट्या कशा कार्य करतात हे शोधणे, डेटा विश्लेषण आणि गणिताची कोडी सोडवणे आवडते."
  },
  {
    id: "q4",
    dimension: "I",
    category: "Curiosity & Experimentation",
    textEn: "I enjoy conducting self-driven experiments, writing small software programs, or reading research discoveries.",
    textHi: "मुझे नए प्रयोग करना, छोटे सॉफ्टवेयर प्रोग्राम लिखना या वैज्ञानिक शोध पढ़ना अच्छा लगता है।",
    textMr: "मला स्वतः प्रयोग करणे, छोटे सॉफ्टवेअर प्रोग्रॅम लिहिणे किंवा वैज्ञानिक संशोधन वाचायला आवडते."
  },
  // Artistic (A) - Creative, expressive, original, design
  {
    id: "q5",
    dimension: "A",
    category: "Visual & Creative",
    textEn: "I enjoy designing visual graphics, digital art, video editing, UI layouts, or creative storytelling.",
    textHi: "मुझे विजुअल ग्राफिक्स, डिजिटल कला, वीडियो संपादन, यूआई लेआउट या रचनात्मक कहानियां बनाना पसंद है।",
    textMr: "मला व्हिज्युअल ग्राफिक्स, डिजिटल कला, व्हिडिओ एडिटिंग, यूआय डिझाइन किंवा सर्जनशील लेखन आवडते."
  },
  {
    id: "q6",
    dimension: "A",
    category: "Originality & Expression",
    textEn: "I prefer flexible, open-ended tasks where I can bring my own creative and unconventional ideas without rigid constraints.",
    textHi: "मुझे ऐसे काम पसंद हैं जहां मैं बिना कड़े बंधनों के अपने अनूठे और रचनात्मक विचार लागू कर सकूं।",
    textMr: "मला असे काम आवडते जेथे मी कडक नियमांशिवाय माझ्या स्वतःच्या सर्जनशील कल्पना वापरू शकतो."
  },
  // Social (S) - Helping, teaching, empathetic, collaborating
  {
    id: "q7",
    dimension: "S",
    category: "Mentorship & Helping",
    textEn: "I get deep satisfaction from teaching others, guiding younger students, or resolving people's emotional/health challenges.",
    textHi: "मुझे दूसरों को सिखाने, मार्गदर्शन करने या लोगों की भावनात्मक और स्वास्थ्य समस्याओं को हल करने में खुशी मिलती है।",
    textMr: "मला इतरांना शिकवणे, मार्गदर्शन करणे किंवा लोकांच्या भावनिक व आरोग्याच्या अडचणी दूर करण्यात समाधान मिळते."
  },
  {
    id: "q8",
    dimension: "S",
    category: "Community & Teamwork",
    textEn: "I thrive when organizing group activities, volunteering for social causes, or actively listening to someone's problems.",
    textHi: "मुझे सामाजिक कार्यों में स्वयंसेवा करने, समूह गतिविधियों को व्यवस्थित करने या दूसरों की समस्याओं को ध्यान से सुनने में अच्छा लगता है।",
    textMr: "मला सामाजिक कार्यात सहभाग घेणे, समूह उपक्रम आयोजित करणे किंवा इतरांच्या समस्या लक्षपूर्वक ऐकणे आवडते."
  },
  // Enterprising (E) - Leadership, persuasion, entrepreneurship, initiative
  {
    id: "q9",
    dimension: "E",
    category: "Leadership & Initiative",
    textEn: "I enjoy taking initiative, leading teams, pitching new business ideas, or convincing people to support a vision.",
    textHi: "मुझे नेतृत्व करना, नए व्यावसायिक विचार प्रस्तुत करना या लोगों को किसी लक्ष्य के लिए प्रेरित करना पसंद है।",
    textMr: "मला पुढाकार घेणे, टीमचे नेतृत्व करणे, नवीन व्यावसायिक कल्पना मांडणे किंवा लोकांना पटवून देणे आवडते."
  },
  {
    id: "q10",
    dimension: "E",
    category: "Commercial & Strategic",
    textEn: "I am energized by negotiating deals, understanding market trends, public speaking, or launching revenue-generating ventures.",
    textHi: "मुझे सौदे तय करने, बाजार के रुझान समझने, सार्वजनिक भाषण देने या नए उद्यम शुरू करने में ऊर्जा मिलती है।",
    textMr: "मला सौदे करणे, बाजारातील ट्रेंड समजून घेणे, भाषण देणे किंवा नवीन व्यवसाय सुरू करण्यात उत्साह वाटतो."
  },
  // Conventional (C) - Organized, data-driven, systematic, detail-focused
  {
    id: "q11",
    dimension: "C",
    category: "Organization & Structure",
    textEn: "I like keeping spreadsheets well-organized, maintaining clear schedules, and working with exact procedures.",
    textHi: "मुझे स्प्रेडशीट व्यवस्थित रखना, स्पष्ट शेड्यूल बनाना और सटीक नियमों के अनुसार काम करना पसंद है।",
    textMr: "मला स्प्रेडशीट्स व्यवस्थित ठेवणे, वेळापत्रक सांभाळणे आणि नियमांनुसार पद्धतशीर काम करणे आवडते."
  },
  {
    id: "q12",
    dimension: "C",
    category: "Accuracy & Verification",
    textEn: "I take pride in catching small errors in records, balancing budgets, or reviewing documents for complete compliance.",
    textHi: "मुझे दस्तावेज़ों में छोटी गलतियों को पकड़ने, बजट संतुलित करने या नियमों के पालन की समीक्षा करने में गर्व होता है।",
    textMr: "मला कागदपत्रांमधील लहान चुका शोधणे, बजेटचे ताळेबंद तपासणे आणि अचूकता राखणे आवडते."
  }
];

export const ASSESSMENT_VERSION = "2.4.0-riasec";
