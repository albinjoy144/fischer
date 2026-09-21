/**
 * fischer Promotion Management - Seed Master Data & State Store
 * Updated with authentic tracking data for Salesmen (Zanhar, Mehul, Affan, Benjamin)
 */

const DEFAULT_EVENT_TYPES = [
  {
    id: "et_1",
    name: "Events",
    description: "Retail road shows, product training, awards, dealer events, sports & negotiation trainings",
    status: "Active",
    activities: [
      { id: "act_101", name: "Roadshow", samplePhoto: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_102", name: "Training", samplePhoto: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_104", name: "Sub dealer event", samplePhoto: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_103", name: "Retail Awards", samplePhoto: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_105", name: "Product launch / FEC launch", samplePhoto: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&auto=format&fit=crop&q=60", status: "Active" }
    ]
  },
  {
    id: "et_2",
    name: "Celebration",
    description: "Festival celebrations, sweet boxes, corporate occasion gift distributions",
    status: "Active",
    activities: [
      { id: "act_201", name: "Onam sweet", samplePhoto: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_202", name: "Ramadan Dates Box", samplePhoto: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_203", name: "Diwali Sweet box", samplePhoto: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_204", name: "National day", samplePhoto: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=500&auto=format&fit=crop&q=60", status: "Active" }
    ]
  },
  {
    id: "et_3",
    name: "POS",
    description: "Point of Sale retail merchandising, displays, standees, danglers & rollups",
    status: "Active",
    activities: [
      { id: "act_301", name: "premium Stand", samplePhoto: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_302", name: "Standared display", samplePhoto: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_306", name: "FSU stand", samplePhoto: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_308", name: "Video Screen", samplePhoto: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_303", name: "dangler", samplePhoto: "https://images.unsplash.com/photo-1568667256549-094345857637?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_304", name: "Roll up", samplePhoto: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_309", name: "Flag", samplePhoto: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=500&auto=format&fit=crop&q=60", status: "Active" }
    ]
  },
  {
    id: "et_4",
    name: "Print",
    description: "Printed product catalogues, technical brochures, calendars and planners",
    status: "Active",
    activities: [
      { id: "act_401", name: "Catalogue", samplePhoto: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_402", name: "Brochure", samplePhoto: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_403", name: "desk calendar", samplePhoto: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_404", name: "Wall Planner", samplePhoto: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_405", name: "Sales Policy", samplePhoto: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=500&auto=format&fit=crop&q=60", status: "Active" }
    ]
  },
  {
    id: "et_5",
    name: "Branding",
    description: "Dealer storefront & interior fischer brand visibility",
    status: "Active",
    activities: [
      { id: "act_502", name: "Signboard", samplePhoto: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_503", name: "Inside sticker", samplePhoto: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_504", name: "Outside sticker", samplePhoto: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_501", name: "Vinyl sticker", samplePhoto: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop&q=60", status: "Active" }
    ]
  },
  {
    id: "et_6",
    name: "Campaigns",
    description: "Seasonal incentives, promotional merchandise and dealer schemes",
    status: "Active",
    activities: [
      { id: "act_601", name: "Chemical Scheme tshirts", samplePhoto: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_602", name: "Fixing Expert Promo", samplePhoto: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&auto=format&fit=crop&q=60", status: "Active" }
    ]
  },
  {
    id: "et_7",
    name: "Online",
    description: "Digital presence, dealer e-commerce leads, social media & web portal",
    status: "Active",
    activities: [
      { id: "act_701", name: "Social Media", samplePhoto: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_702", name: "Online presents from dealer site", samplePhoto: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_703", name: "Product Lead Ad", samplePhoto: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_704", name: "Loyalty App & Web portal", samplePhoto: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=500&auto=format&fit=crop&q=60", status: "Active" }
    ]
  },
  {
    id: "et_8",
    name: "Giveaways",
    description: "Official fischer executive gifts and merchandise",
    status: "Active",
    activities: [
      { id: "act_801", name: "Bag", samplePhoto: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_802", name: "Base ball Cap", samplePhoto: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_803", name: "Travel Mug", samplePhoto: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_804", name: "Headphone", samplePhoto: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60", status: "Active" }
    ]
  },
  {
    id: "et_9",
    name: "Product videos",
    description: "Retail application videos, fixing guides and product spotlights",
    status: "Active",
    activities: [
      { id: "act_901", name: "Retail Intro", samplePhoto: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_902", name: "SB craft", samplePhoto: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_903", name: "MS cristal", samplePhoto: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_904", name: "PVC 500", samplePhoto: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=500&auto=format&fit=crop&q=60", status: "Active" }
    ]
  }
];

const DEFAULT_SALES_HEADS = [
  {
    id: "head_1",
    name: "Alex Johnson",
    email: "alex.johnson@fischer.ae",
    phone: "+971 50 123 4567",
    region: "UAE - North & Dubai",
    status: "Active"
  },
  {
    id: "head_2",
    name: "Priya Nair",
    email: "priya.nair@fischer.ae",
    phone: "+971 55 987 6543",
    region: "UAE - South & Abu Dhabi",
    status: "Active"
  },
  {
    id: "head_3",
    name: "Carlos Mendes",
    email: "carlos.m@fischer.ae",
    phone: "+971 52 456 7890",
    region: "Western Region",
    status: "Active"
  },
  {
    id: "head_4",
    name: "Omar Hassan",
    email: "omar.hassan@fischer.ae",
    phone: "+971 56 321 0987",
    region: "Eastern Region",
    status: "Active"
  },
  {
    id: "head_5",
    name: "Fatima Khan",
    email: "fatima.k@fischer.ae",
    phone: "+971 54 654 3210",
    region: "Central Region",
    status: "Active"
  }
];

// Salesmen / Sales Supervisors from uploaded Excel
const DEFAULT_SUPERVISORS = [
  {
    id: "sup_1",
    name: "Zanhar",
    headId: "head_1",
    email: "zanhar@fischer.ae",
    phone: "+971 50 223 3445",
    territory: "Dubai, Fujairah & Ras Al Khaimah",
    status: "Active"
  },
  {
    id: "sup_2",
    name: "Mehul",
    headId: "head_2",
    email: "mehul@fischer.ae",
    phone: "+971 55 334 4556",
    territory: "Abu Dhabi & Dubai",
    status: "Active"
  },
  {
    id: "sup_3",
    name: "Affan",
    headId: "head_1",
    email: "affan@fischer.ae",
    phone: "+971 52 445 5667",
    territory: "Sharjah, Ajman & Northern Emirates",
    status: "Active"
  },
  {
    id: "sup_4",
    name: "Benjamin",
    headId: "head_3",
    email: "benjamin@fischer.ae",
    phone: "+971 56 556 6778",
    territory: "Western Region & Central",
    status: "Active"
  }
];

// 16 Dealers across UAE from uploaded Excel
const DEFAULT_DEALERS = [
  // --- Zanhar's Dealers ---
  {
    id: "deal_1",
    name: "Leminar Gulf",
    headId: "head_1",
    supervisorId: "sup_1",
    logo: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=100&auto=format&fit=crop&q=60",
    salesTarget: 120000,
    location: "Dubai",
    city: "Dubai",
    address: "Um Ramool Industrial, Dubai",
    contactName: "Praveen Nair",
    contactPhone: "+971 4 333 1234",
    email: "info@leminargulf.ae",
    username: "leminar",
    status: "Active",
    branches: [
      { id: "br_101", name: "Um Ramool", location: "Dubai", contactPhone: "+971 4 333 1235", photo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&auto=format&fit=crop&q=60", target: 120000 }
    ]
  },
  {
    id: "deal_2",
    name: "Mohd Al Qama",
    headId: "head_1",
    supervisorId: "sup_1",
    logo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100&auto=format&fit=crop&q=60",
    salesTarget: 350000,
    location: "Dubai",
    city: "Dubai",
    address: "Al Quoz Industrial Area 3, Dubai",
    contactName: "Mohd Al Qama",
    contactPhone: "+971 4 347 5566",
    email: "sales@alqama.ae",
    username: "alqama",
    status: "Active",
    branches: [
      { id: "br_201", name: "Al Quoz 3", location: "Dubai", contactPhone: "+971 4 347 5567", photo: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=400&auto=format&fit=crop&q=60", target: 80000 },
      { id: "br_202", name: "Al Quoz 4", location: "Dubai", contactPhone: "+971 4 347 5568", photo: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400&auto=format&fit=crop&q=60", target: 70000 },
      { id: "br_203", name: "DIP 1", location: "Dubai", contactPhone: "+971 4 885 1234", photo: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=60", target: 45000 },
      { id: "br_204", name: "Ras Al Khor", location: "Dubai", contactPhone: "+971 4 320 5678", photo: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&auto=format&fit=crop&q=60", target: 40000 },
      { id: "br_205", name: "Jebel Ali Freezone", location: "Dubai", contactPhone: "+971 4 881 9900", photo: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=400&auto=format&fit=crop&q=60", target: 45000 },
      { id: "br_206", name: "Satwa", location: "Dubai", contactPhone: "+971 4 344 8811", photo: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=60", target: 40000 },
      { id: "br_207", name: "Ceramics Division", location: "Dubai", contactPhone: "+971 4 347 5569", photo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&auto=format&fit=crop&q=60", target: 20000 },
      { id: "br_208", name: "RAK Showroom", location: "Ras Al Khaimah", contactPhone: "+971 7 222 3456", photo: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&auto=format&fit=crop&q=60", target: 15000 }
    ]
  },
  {
    id: "deal_3",
    name: "Fujairah General Trading",
    headId: "head_1",
    supervisorId: "sup_1",
    logo: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=100&auto=format&fit=crop&q=60",
    salesTarget: 780000,
    location: "Fujairah",
    city: "Fujairah",
    address: "Main Commercial Area, Fujairah",
    contactName: "Rashid Al Fujairi",
    contactPhone: "+971 9 222 7890",
    email: "contact@fgtuae.com",
    username: "fgt_zanhar",
    status: "Active",
    branches: [
      { id: "br_301", name: "Fujairah Branch", location: "Fujairah", contactPhone: "+971 9 222 7891", photo: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=400&auto=format&fit=crop&q=60", target: 150000 },
      { id: "br_302", name: "Al Quoz Store", location: "Dubai", contactPhone: "+971 4 338 6789", photo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&auto=format&fit=crop&q=60", target: 550000 },
      { id: "br_303", name: "Deira Branch", location: "Dubai", contactPhone: "+971 4 227 1234", photo: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&auto=format&fit=crop&q=60", target: 65000 },
      { id: "br_304", name: "Sharjah Branch", location: "Sharjah", contactPhone: "+971 6 533 4567", photo: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=60", target: 15000 }
    ]
  },
  {
    id: "deal_4",
    name: "Fasteners King",
    headId: "head_1",
    supervisorId: "sup_1",
    logo: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=100&auto=format&fit=crop&q=60",
    salesTarget: 200000,
    location: "Dubai",
    city: "Dubai",
    address: "Al Quoz Industrial Area 4, Dubai",
    contactName: "Tariq Mahmood",
    contactPhone: "+971 4 340 9876",
    email: "sales@fastenersking.ae",
    username: "fastenersking",
    status: "Active",
    branches: [
      { id: "br_401", name: "Al Quoz 4", location: "Dubai", contactPhone: "+971 4 340 9877", photo: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400&auto=format&fit=crop&q=60", target: 200000 }
    ]
  },
  {
    id: "deal_5",
    name: "Al Rawae Building Materials",
    headId: "head_1",
    supervisorId: "sup_1",
    logo: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=100&auto=format&fit=crop&q=60",
    salesTarget: 550000,
    location: "Dubai",
    city: "Dubai",
    address: "Al Qusais Industrial Area, Dubai",
    contactName: "Saeed Al Rawae",
    contactPhone: "+971 4 267 4321",
    email: "info@alrawae.ae",
    username: "alrawae",
    status: "Active",
    branches: [
      { id: "br_501", name: "Al Qusais", location: "Dubai", contactPhone: "+971 4 267 4322", photo: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=60", target: 550000 }
    ]
  },
  {
    id: "deal_6",
    name: "Reza Trading LLC",
    headId: "head_1",
    supervisorId: "sup_1",
    logo: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=100&auto=format&fit=crop&q=60",
    salesTarget: 60000,
    location: "Dubai",
    city: "Dubai",
    address: "Nakheel, Deira, Dubai",
    contactName: "Reza Khan",
    contactPhone: "+971 4 272 8899",
    email: "sales@rezatrading.ae",
    username: "rezatrading",
    status: "Active",
    branches: [
      { id: "br_601", name: "Nakheel", location: "Dubai", contactPhone: "+971 4 272 8890", photo: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=400&auto=format&fit=crop&q=60", target: 60000 }
    ]
  },

  // --- Mehul's Dealers ---
  {
    id: "deal_7",
    name: "Al Madina Hardware Trading LLC",
    headId: "head_2",
    supervisorId: "sup_2",
    logo: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=100&auto=format&fit=crop&q=60",
    salesTarget: 15000,
    location: "Abu Dhabi",
    city: "Abu Dhabi",
    address: "Madina Zayed, Abu Dhabi",
    contactName: "Abdul Rahman",
    contactPhone: "+971 2 632 1122",
    email: "contact@almadina.ae",
    username: "almadina",
    status: "Active",
    branches: [
      { id: "br_701", name: "Madina Zayed", location: "Abu Dhabi", contactPhone: "+971 2 632 1123", photo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&auto=format&fit=crop&q=60", target: 5000 },
      { id: "br_702", name: "Abu Dhabi Main", location: "Abu Dhabi", contactPhone: "+971 2 633 4455", photo: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&auto=format&fit=crop&q=60", target: 5000 },
      { id: "br_703", name: "Al Ain", location: "Abu Dhabi", contactPhone: "+971 3 766 8899", photo: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=60", target: 5000 }
    ]
  },
  {
    id: "deal_8",
    name: "QCON General Trading LLC",
    headId: "head_2",
    supervisorId: "sup_2",
    logo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100&auto=format&fit=crop&q=60",
    salesTarget: 25000,
    location: "Dubai",
    city: "Dubai",
    address: "Al Quoz Industrial Area, Dubai",
    contactName: "Sameer Sheikh",
    contactPhone: "+971 4 339 2233",
    email: "info@qconuae.com",
    username: "qcon",
    status: "Active",
    branches: [
      { id: "br_801", name: "Sharjah", location: "Sharjah", contactPhone: "+971 6 543 9900", photo: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&auto=format&fit=crop&q=60", target: 8000 },
      { id: "br_802", name: "Al Quoz 2", location: "Dubai", contactPhone: "+971 4 339 2234", photo: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400&auto=format&fit=crop&q=60", target: 5000 },
      { id: "br_803", name: "Al Quoz 4", location: "Dubai", contactPhone: "+971 4 339 2235", photo: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=400&auto=format&fit=crop&q=60", target: 5000 },
      { id: "br_804", name: "Abu Dhabi", location: "Abu Dhabi", contactPhone: "+971 2 554 1122", photo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&auto=format&fit=crop&q=60", target: 7000 }
    ]
  },
  {
    id: "deal_9",
    name: "FGT LLC",
    headId: "head_2",
    supervisorId: "sup_2",
    logo: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=100&auto=format&fit=crop&q=60",
    salesTarget: 20000,
    location: "Abu Dhabi",
    city: "Abu Dhabi",
    address: "Sector M-14, Mussafah, Abu Dhabi",
    contactName: "Faisal Al Mansoori",
    contactPhone: "+971 2 555 7766",
    email: "sales@fgtad.ae",
    username: "fgt_mehul",
    status: "Active",
    branches: [
      { id: "br_901", name: "Al Ain", location: "Abu Dhabi", contactPhone: "+971 3 755 4321", photo: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=60", target: 10000 },
      { id: "br_902", name: "Mussafah", location: "Abu Dhabi", contactPhone: "+971 2 555 7767", photo: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=400&auto=format&fit=crop&q=60", target: 10000 }
    ]
  },
  {
    id: "deal_10",
    name: "Imperial General Trading",
    headId: "head_2",
    supervisorId: "sup_2",
    logo: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=100&auto=format&fit=crop&q=60",
    salesTarget: 25000,
    location: "Abu Dhabi",
    city: "Abu Dhabi",
    address: "Mussafah Industrial Area, Abu Dhabi",
    contactName: "Khalfan Al Suwaidi",
    contactPhone: "+971 2 551 3344",
    email: "info@imperialgt.ae",
    username: "imperial",
    status: "Active",
    branches: [
      { id: "br_1001", name: "Mussafah", location: "Abu Dhabi", contactPhone: "+971 2 551 3345", photo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&auto=format&fit=crop&q=60", target: 15000 },
      { id: "br_1002", name: "Abu Dhabi Main", location: "Abu Dhabi", contactPhone: "+971 2 551 3346", photo: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&auto=format&fit=crop&q=60", target: 10000 }
    ]
  },

  // --- Affan's Dealers ---
  {
    id: "deal_11",
    name: "Adnan Haji Hardware Trading LLC",
    headId: "head_1",
    supervisorId: "sup_3",
    logo: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=100&auto=format&fit=crop&q=60",
    salesTarget: 30000,
    location: "Sharjah",
    city: "Sharjah",
    address: "Sharjah Industrial Area",
    contactName: "Adnan Haji",
    contactPhone: "+971 6 533 8811",
    email: "adnan@adnanhaji.ae",
    username: "adnanhaji",
    status: "Active",
    branches: [
      { id: "br_1101", name: "Sharjah Industrial", location: "Sharjah", contactPhone: "+971 6 533 8812", photo: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=60", target: 15000 },
      { id: "br_1102", name: "Ajman Safa", location: "Ajman", contactPhone: "+971 6 744 2233", photo: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400&auto=format&fit=crop&q=60", target: 7500 },
      { id: "br_1103", name: "Ajman Jurf 3", location: "Ajman", contactPhone: "+971 6 748 5566", photo: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=400&auto=format&fit=crop&q=60", target: 7500 }
    ]
  },
  {
    id: "deal_12",
    name: "Media General Trading LLC",
    headId: "head_1",
    supervisorId: "sup_3",
    logo: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=100&auto=format&fit=crop&q=60",
    salesTarget: 25000,
    location: "Ajman",
    city: "Ajman",
    address: "Ajman Jurf Industrial Area",
    contactName: "Gopal V.",
    contactPhone: "+971 6 745 1100",
    email: "info@mediagt.ae",
    username: "mediagt",
    status: "Active",
    branches: [
      { id: "br_1201", name: "Sajjah", location: "Sharjah", contactPhone: "+971 6 536 2200", photo: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&auto=format&fit=crop&q=60", target: 5000 },
      { id: "br_1202", name: "Ajman Jurf", location: "Ajman", contactPhone: "+971 6 745 1101", photo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&auto=format&fit=crop&q=60", target: 5000 },
      { id: "br_1203", name: "Umm Al Quwain", location: "Umm Al Quwain", contactPhone: "+971 6 766 3344", photo: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=60", target: 5000 },
      { id: "br_1204", name: "Al Qusais 2", location: "Dubai", contactPhone: "+971 4 258 7766", photo: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&auto=format&fit=crop&q=60", target: 5000 },
      { id: "br_1205", name: "Ras Al Khaimah", location: "Ras Al Khaimah", contactPhone: "+971 7 233 4455", photo: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=400&auto=format&fit=crop&q=60", target: 5000 }
    ]
  },
  {
    id: "deal_13",
    name: "Speedex International LLC",
    headId: "head_1",
    supervisorId: "sup_3",
    logo: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=100&auto=format&fit=crop&q=60",
    salesTarget: 40000,
    location: "Dubai",
    city: "Dubai",
    address: "Sheikh Zayed Road, Al Quoz, Dubai",
    contactName: "Vikram Mehta",
    contactPhone: "+971 4 339 1929",
    email: "sales@speedex.ae",
    username: "speedex",
    status: "Active",
    branches: [
      { id: "br_1301", name: "Al Quoz - SZR", location: "Dubai", contactPhone: "+971 4 339 1930", photo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&auto=format&fit=crop&q=60", target: 15000 },
      { id: "br_1302", name: "Abu Dhabi", location: "Abu Dhabi", contactPhone: "+971 2 677 8899", photo: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=60", target: 10000 },
      { id: "br_1303", name: "Ajman Jurf", location: "Ajman", contactPhone: "+971 6 748 1122", photo: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400&auto=format&fit=crop&q=60", target: 8000 },
      { id: "br_1304", name: "Deira", location: "Dubai", contactPhone: "+971 4 228 3344", photo: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&auto=format&fit=crop&q=60", target: 7000 }
    ]
  },
  {
    id: "deal_14",
    name: "Fakri Tools",
    headId: "head_1",
    supervisorId: "sup_3",
    logo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100&auto=format&fit=crop&q=60",
    salesTarget: 38000,
    location: "Ajman",
    city: "Ajman",
    address: "Industrial Area, Ajman",
    contactName: "Mustafa Fakri",
    contactPhone: "+971 6 743 6677",
    email: "contact@fakritools.ae",
    username: "fakritools",
    status: "Active",
    branches: [
      { id: "br_1401", name: "Ajman Ind", location: "Ajman", contactPhone: "+971 6 743 6678", photo: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=400&auto=format&fit=crop&q=60", target: 10000 },
      { id: "br_1402", name: "Ajman Jurf", location: "Ajman", contactPhone: "+971 6 748 7788", photo: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&auto=format&fit=crop&q=60", target: 8000 },
      { id: "br_1403", name: "Sajjah", location: "Sharjah", contactPhone: "+971 6 536 9900", photo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&auto=format&fit=crop&q=60", target: 10000 },
      { id: "br_1404", name: "Al Quoz 3", location: "Dubai", contactPhone: "+971 4 338 5566", photo: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=60", target: 10000 }
    ]
  },
  {
    id: "deal_15",
    name: "Haris Trading LLC",
    headId: "head_1",
    supervisorId: "sup_3",
    logo: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=100&auto=format&fit=crop&q=60",
    salesTarget: 15000,
    location: "Sharjah",
    city: "Sharjah",
    address: "Rolla, Sharjah",
    contactName: "Haris Qasim",
    contactPhone: "+971 6 562 3344",
    email: "sales@haristrading.ae",
    username: "haristrading",
    status: "Active",
    branches: [
      { id: "br_1501", name: "Rolla", location: "Sharjah", contactPhone: "+971 6 562 3345", photo: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=60", target: 15000 }
    ]
  },

  // --- Benjamin's Dealers ---
  {
    id: "deal_16",
    name: "Apex Engineering Supplies",
    headId: "head_3",
    supervisorId: "sup_4",
    logo: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=100&auto=format&fit=crop&q=60",
    salesTarget: 60000,
    location: "Abu Dhabi",
    city: "Abu Dhabi",
    address: "Sector M-14, Mussafah Industrial",
    contactName: "Zaid Bin Mansoor",
    contactPhone: "+971 2 555 4321",
    email: "zaid@apexsupplies.ae",
    username: "apex",
    status: "Active",
    branches: [
      { id: "br_1601", name: "Mussafah Central", location: "Abu Dhabi", contactPhone: "+971 2 555 4322", photo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&auto=format&fit=crop&q=60", target: 35000 },
      { id: "br_1602", name: "Western Region Branch", location: "Abu Dhabi", contactPhone: "+971 2 678 9988", photo: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=60", target: 25000 }
    ]
  }
];

// Promotional Events matching checkmarks (✓) in Excel
const DEFAULT_EVENTS = [
  // Zanhar -> Mohd Al Qama -> Al Quoz 3
  {
    id: "ev_1",
    dealerId: "deal_2",
    branchId: "br_201",
    eventTypeId: "et_1",
    activityId: "act_101", // Roadshow
    amountSpend: 3500,
    date: "2024-03-12",
    location: "Dubai",
    status: "Active",
    notes: "High-engagement retail roadshow demonstrating DuoPower & concrete anchors.",
    photos: ["https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&auto=format&fit=crop&q=60"]
  },
  {
    id: "ev_2",
    dealerId: "deal_2",
    branchId: "br_201",
    eventTypeId: "et_3",
    activityId: "act_306", // FSU stand
    amountSpend: 2200,
    date: "2024-02-15",
    location: "Dubai",
    status: "Active",
    notes: "Floor Standing Unit (FSU) installation at store entrance.",
    photos: ["https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=500&auto=format&fit=crop&q=60"]
  },
  {
    id: "ev_3",
    dealerId: "deal_2",
    branchId: "br_201",
    eventTypeId: "et_3",
    activityId: "act_302", // Standared display
    amountSpend: 1800,
    date: "2024-02-18",
    location: "Dubai",
    status: "Active",
    notes: "fischer standard wall display fixture installed.",
    photos: ["https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&auto=format&fit=crop&q=60"]
  },
  {
    id: "ev_4",
    dealerId: "deal_2",
    branchId: "br_201",
    eventTypeId: "et_3",
    activityId: "act_308", // Video Screen
    amountSpend: 4200,
    date: "2024-02-20",
    location: "Dubai",
    status: "Active",
    notes: "High-definition video screen showcasing retail fixing demonstrations.",
    photos: ["https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&auto=format&fit=crop&q=60"]
  },
  {
    id: "ev_5",
    dealerId: "deal_2",
    branchId: "br_201",
    eventTypeId: "et_5",
    activityId: "act_503", // Inside sticker
    amountSpend: 950,
    date: "2024-02-10",
    location: "Dubai",
    status: "Active",
    notes: "Inside shop shelf branding stickers and product matrix strips.",
    photos: ["https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop&q=60"]
  },
  {
    id: "ev_6",
    dealerId: "deal_2",
    branchId: "br_201",
    eventTypeId: "et_3",
    activityId: "act_303", // dangler
    amountSpend: 650,
    date: "2024-02-10",
    location: "Dubai",
    status: "Active",
    notes: "Ceiling hanging fischer danglers along retail aisles.",
    photos: ["https://images.unsplash.com/photo-1568667256549-094345857637?w=500&auto=format&fit=crop&q=60"]
  },

  // Zanhar -> Mohd Al Qama -> Al Quoz 4
  {
    id: "ev_7",
    dealerId: "deal_2",
    branchId: "br_202",
    eventTypeId: "et_3",
    activityId: "act_306", // FSU stand
    amountSpend: 2200,
    date: "2024-02-16",
    location: "Dubai",
    status: "Active",
    notes: "FSU stand positioned in heavy-duty fixing section.",
    photos: ["https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=500&auto=format&fit=crop&q=60"]
  },
  {
    id: "ev_8",
    dealerId: "deal_2",
    branchId: "br_202",
    eventTypeId: "et_3",
    activityId: "act_302", // Standared display
    amountSpend: 1800,
    date: "2024-02-19",
    location: "Dubai",
    status: "Active",
    notes: "Standard display setup for nylon plugs and frames.",
    photos: ["https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&auto=format&fit=crop&q=60"]
  },
  {
    id: "ev_9",
    dealerId: "deal_2",
    branchId: "br_202",
    eventTypeId: "et_3",
    activityId: "act_308", // Video Screen
    amountSpend: 4200,
    date: "2024-02-22",
    location: "Dubai",
    status: "Active",
    notes: "Interactive retail product video screen setup.",
    photos: ["https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&auto=format&fit=crop&q=60"]
  },
  {
    id: "ev_10",
    dealerId: "deal_2",
    branchId: "br_202",
    eventTypeId: "et_5",
    activityId: "act_503", // Inside sticker
    amountSpend: 950,
    date: "2024-02-11",
    location: "Dubai",
    status: "Active",
    notes: "Inside storefront vinyl branding stickers.",
    photos: ["https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop&q=60"]
  },

  // Zanhar -> Mohd Al Qama -> DIP 1
  {
    id: "ev_11",
    dealerId: "deal_2",
    branchId: "br_203",
    eventTypeId: "et_3",
    activityId: "act_306", // FSU stand
    amountSpend: 2200,
    date: "2024-02-25",
    location: "Dubai",
    status: "Active",
    notes: "DIP branch FSU stand erected.",
    photos: ["https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=500&auto=format&fit=crop&q=60"]
  },
  {
    id: "ev_12",
    dealerId: "deal_2",
    branchId: "br_203",
    eventTypeId: "et_5",
    activityId: "act_503", // Inside sticker
    amountSpend: 950,
    date: "2024-02-25",
    location: "Dubai",
    status: "Active",
    notes: "Interior wall & pillar sticker branding.",
    photos: ["https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop&q=60"]
  },

  // Zanhar -> Mohd Al Qama -> Ras Al Khor
  {
    id: "ev_13",
    dealerId: "deal_2",
    branchId: "br_204",
    eventTypeId: "et_3",
    activityId: "act_306", // FSU stand
    amountSpend: 2200,
    date: "2024-03-01",
    location: "Dubai",
    status: "Active",
    notes: "FSU stand delivered and placed at Ras Al Khor showroom.",
    photos: ["https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=500&auto=format&fit=crop&q=60"]
  },

  // Zanhar -> Mohd Al Qama -> Jebel Ali Freezone
  {
    id: "ev_14",
    dealerId: "deal_2",
    branchId: "br_205",
    eventTypeId: "et_3",
    activityId: "act_306", // FSU stand
    amountSpend: 2200,
    date: "2024-03-02",
    location: "Dubai",
    status: "Active",
    notes: "FSU stand for JAFZA branch contractors.",
    photos: ["https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=500&auto=format&fit=crop&q=60"]
  },

  // Zanhar -> FUJAIRAH GENERAL TRADING -> Fujairah Branch
  {
    id: "ev_15",
    dealerId: "deal_3",
    branchId: "br_301",
    eventTypeId: "et_3",
    activityId: "act_301", // premium Stand
    amountSpend: 5500,
    date: "2024-03-05",
    location: "Fujairah",
    status: "Active",
    notes: "New illuminated Premium Wall Display Stand inaugurated in Fujairah.",
    photos: ["https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=500&auto=format&fit=crop&q=60"]
  },

  // Zanhar -> FUJAIRAH GENERAL TRADING -> Al Quoz Store
  {
    id: "ev_16",
    dealerId: "deal_3",
    branchId: "br_302",
    eventTypeId: "et_3",
    activityId: "act_306", // FSU stand
    amountSpend: 2200,
    date: "2024-02-14",
    location: "Dubai",
    status: "Active",
    notes: "FSU stand with fischer complete fasteners display.",
    photos: ["https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=500&auto=format&fit=crop&q=60"]
  },

  // Zanhar -> FUJAIRAH GENERAL TRADING -> Deira Branch
  {
    id: "ev_17",
    dealerId: "deal_3",
    branchId: "br_303",
    eventTypeId: "et_3",
    activityId: "act_306", // FSU stand
    amountSpend: 2200,
    date: "2024-02-15",
    location: "Dubai",
    status: "Active",
    notes: "FSU stand deployed in Deira hardware corridor.",
    photos: ["https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=500&auto=format&fit=crop&q=60"]
  },

  // Zanhar -> FUJAIRAH GENERAL TRADING -> Sharjah Branch
  {
    id: "ev_18",
    dealerId: "deal_3",
    branchId: "br_304",
    eventTypeId: "et_3",
    activityId: "act_301", // premium Stand
    amountSpend: 5500,
    date: "2024-03-08",
    location: "Sharjah",
    status: "Active",
    notes: "Sharjah showroom premium display stand installation.",
    photos: ["https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=500&auto=format&fit=crop&q=60"]
  },

  // Zanhar -> Reza Trading LLC -> Nakheel
  {
    id: "ev_19",
    dealerId: "deal_6",
    branchId: "br_601",
    eventTypeId: "et_3",
    activityId: "act_306", // FSU stand
    amountSpend: 2200,
    date: "2024-02-28",
    location: "Dubai",
    status: "Active",
    notes: "FSU stand unit delivered to Nakheel showroom.",
    photos: ["https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=500&auto=format&fit=crop&q=60"]
  },

  // Mehul -> QCON GENERAL TRADING LLC -> Abu Dhabi
  {
    id: "ev_20",
    dealerId: "deal_8",
    branchId: "br_804",
    eventTypeId: "et_3",
    activityId: "act_301", // premium Stand
    amountSpend: 5500,
    date: "2024-03-10",
    location: "Abu Dhabi",
    status: "Active",
    notes: "Premium fixing stand installed at QCON Abu Dhabi flagship store.",
    photos: ["https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=500&auto=format&fit=crop&q=60"]
  },

  // Affan -> Adnan Haji -> Ajman Jurf 3
  {
    id: "ev_21",
    dealerId: "deal_11",
    branchId: "br_1103",
    eventTypeId: "et_3",
    activityId: "act_302", // Standared display
    amountSpend: 1800,
    date: "2024-02-20",
    location: "Ajman",
    status: "Active",
    notes: "Standard display board fitted in Adnan Haji Ajman Jurf 3 store.",
    photos: ["https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&auto=format&fit=crop&q=60"]
  },

  // Affan -> Speedex -> Abu Dhabi
  {
    id: "ev_22",
    dealerId: "deal_13",
    branchId: "br_1302",
    eventTypeId: "et_1",
    activityId: "act_101", // Roadshow
    amountSpend: 3500,
    date: "2024-03-15",
    location: "Abu Dhabi",
    status: "Active",
    notes: "Speedex Abu Dhabi retail promotion roadshow with technician demos.",
    photos: ["https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&auto=format&fit=crop&q=60"]
  },
  {
    id: "ev_23",
    dealerId: "deal_13",
    branchId: "br_1302",
    eventTypeId: "et_3",
    activityId: "act_302", // Standared display
    amountSpend: 1800,
    date: "2024-02-12",
    location: "Abu Dhabi",
    status: "Active",
    notes: "Standard display setup in Speedex Abu Dhabi retail wing.",
    photos: ["https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&auto=format&fit=crop&q=60"]
  }
];

// Helper to assemble sales records from monthly figures
function createSaleRecord(id, dealerId, branchId, yearMonth, amount, note = "") {
  const [year, month] = yearMonth.split("-");
  const lastDay = new Date(Number(year), Number(month), 0).getDate();
  return {
    id: "sal_" + id,
    dealerId: dealerId,
    branchId: branchId,
    startDate: `${yearMonth}-01`,
    endDate: `${yearMonth}-${lastDay < 10 ? '0' + lastDay : lastDay}`,
    monthYear: yearMonth,
    salesAmount: Number(amount),
    notes: note || `Monthly retail sales for ${yearMonth}`
  };
}

// Monthly sales matching the uploaded Excel tables
const DEFAULT_SALES = [
  // ==========================
  // ZANHAR (Supervisor sup_1)
  // ==========================

  // 1. LEMINAR GULF -> Um Ramool (br_101)
  createSaleRecord("101_1", "deal_1", "br_101", "2024-01", 10068.90),
  createSaleRecord("101_2", "deal_1", "br_101", "2024-02", 4924.00),
  createSaleRecord("101_3", "deal_1", "br_101", "2024-03", 40550.00),
  createSaleRecord("101_4", "deal_1", "br_101", "2024-04", 8460.00),
  createSaleRecord("101_5", "deal_1", "br_101", "2024-05", 5627.50),
  createSaleRecord("101_6", "deal_1", "br_101", "2024-06", 9909.00),
  createSaleRecord("101_7", "deal_1", "br_101", "2024-07", 13432.25),
  createSaleRecord("101_8", "deal_1", "br_101", "2024-08", 24148.75),

  // 2. MOHD AL QAMA -> Al Quoz 3 (br_201)
  createSaleRecord("201_1", "deal_2", "br_201", "2024-01", 13504.14),
  createSaleRecord("201_2", "deal_2", "br_201", "2024-02", 15975.63),
  createSaleRecord("201_3", "deal_2", "br_201", "2024-03", 9213.00),
  createSaleRecord("201_4", "deal_2", "br_201", "2024-04", 6514.95),
  createSaleRecord("201_5", "deal_2", "br_201", "2024-05", 7890.00),
  createSaleRecord("201_6", "deal_2", "br_201", "2024-06", 8049.30),
  createSaleRecord("201_7", "deal_2", "br_201", "2024-07", 9197.41),
  createSaleRecord("201_8", "deal_2", "br_201", "2024-08", 9085.90),

  // MOHD AL QAMA -> Al Quoz 4 (br_202)
  createSaleRecord("202_1", "deal_2", "br_202", "2024-01", 9705.50),
  createSaleRecord("202_2", "deal_2", "br_202", "2024-02", 7916.00),
  createSaleRecord("202_3", "deal_2", "br_202", "2024-03", 1549.00),
  createSaleRecord("202_4", "deal_2", "br_202", "2024-04", 5415.50),
  createSaleRecord("202_5", "deal_2", "br_202", "2024-05", 9353.50),
  createSaleRecord("202_6", "deal_2", "br_202", "2024-06", 14694.00),
  createSaleRecord("202_7", "deal_2", "br_202", "2024-07", 9705.50),
  createSaleRecord("202_8", "deal_2", "br_202", "2024-08", 11450.50),

  // MOHD AL QAMA -> DIP 1 (br_203)
  createSaleRecord("203_1", "deal_2", "br_203", "2024-01", 3254.00),
  createSaleRecord("203_2", "deal_2", "br_203", "2024-02", 4138.00),
  createSaleRecord("203_3", "deal_2", "br_203", "2024-03", 7847.00),
  createSaleRecord("203_4", "deal_2", "br_203", "2024-04", 4538.00),
  createSaleRecord("203_5", "deal_2", "br_203", "2024-05", 5690.00),
  createSaleRecord("203_6", "deal_2", "br_203", "2024-06", 3645.50),
  createSaleRecord("203_7", "deal_2", "br_203", "2024-07", 4848.92),
  createSaleRecord("203_8", "deal_2", "br_203", "2024-08", 7699.50),

  // MOHD AL QAMA -> Ras Al Khor (br_204)
  createSaleRecord("204_1", "deal_2", "br_204", "2024-01", 3929.20),
  createSaleRecord("204_2", "deal_2", "br_204", "2024-02", 5391.00),
  createSaleRecord("204_3", "deal_2", "br_204", "2024-03", 4239.00),
  createSaleRecord("204_4", "deal_2", "br_204", "2024-04", 3679.00),
  createSaleRecord("204_5", "deal_2", "br_204", "2024-05", 3685.00),
  createSaleRecord("204_6", "deal_2", "br_204", "2024-06", 1986.00),
  createSaleRecord("204_7", "deal_2", "br_204", "2024-07", 6353.54),
  createSaleRecord("204_8", "deal_2", "br_204", "2024-08", 7231.76),

  // MOHD AL QAMA -> Jebel Ali Freezone (br_205)
  createSaleRecord("205_1", "deal_2", "br_205", "2024-01", 6184.69),
  createSaleRecord("205_2", "deal_2", "br_205", "2024-02", 6635.50),
  createSaleRecord("205_3", "deal_2", "br_205", "2024-03", 4605.50),
  createSaleRecord("205_4", "deal_2", "br_205", "2024-04", 4619.00),
  createSaleRecord("205_5", "deal_2", "br_205", "2024-05", 4485.25),
  createSaleRecord("205_6", "deal_2", "br_205", "2024-06", 2447.00),
  createSaleRecord("205_7", "deal_2", "br_205", "2024-07", 5946.00),
  createSaleRecord("205_8", "deal_2", "br_205", "2024-08", 5653.50),

  // MOHD AL QAMA -> Satwa (br_206)
  createSaleRecord("206_1", "deal_2", "br_206", "2024-01", 6400.00),
  createSaleRecord("206_2", "deal_2", "br_206", "2024-02", 5431.00),
  createSaleRecord("206_3", "deal_2", "br_206", "2024-03", 4241.50),
  createSaleRecord("206_4", "deal_2", "br_206", "2024-04", 5312.00),
  createSaleRecord("206_5", "deal_2", "br_206", "2024-05", 2347.00),
  createSaleRecord("206_6", "deal_2", "br_206", "2024-06", 2580.00),
  createSaleRecord("206_7", "deal_2", "br_206", "2024-07", 3293.00),
  createSaleRecord("206_8", "deal_2", "br_206", "2024-08", 6923.50),

  // MOHD AL QAMA -> Ceramics Division (br_207)
  createSaleRecord("207_1", "deal_2", "br_207", "2024-01", 2128.00),
  createSaleRecord("207_2", "deal_2", "br_207", "2024-02", 3074.00),
  createSaleRecord("207_3", "deal_2", "br_207", "2024-03", 1554.50),
  createSaleRecord("207_4", "deal_2", "br_207", "2024-04", 3285.62),
  createSaleRecord("207_5", "deal_2", "br_207", "2024-05", 1791.50),
  createSaleRecord("207_6", "deal_2", "br_207", "2024-06", 1796.90),
  createSaleRecord("207_7", "deal_2", "br_207", "2024-07", 2983.00),
  createSaleRecord("207_8", "deal_2", "br_207", "2024-08", 808.20),

  // MOHD AL QAMA -> RAK Showroom (br_208)
  createSaleRecord("208_1", "deal_2", "br_208", "2024-01", 1469.00),
  createSaleRecord("208_2", "deal_2", "br_208", "2024-02", 1436.00),
  createSaleRecord("208_3", "deal_2", "br_208", "2024-03", 245.00),
  createSaleRecord("208_4", "deal_2", "br_208", "2024-04", 1015.04),
  createSaleRecord("208_5", "deal_2", "br_208", "2024-05", 2422.00),
  createSaleRecord("208_6", "deal_2", "br_208", "2024-06", 233.00),
  createSaleRecord("208_7", "deal_2", "br_208", "2024-07", 1873.50),
  createSaleRecord("208_8", "deal_2", "br_208", "2024-08", 1047.75),

  // 3. FUJAIRAH GENERAL TRADING -> Fujairah Branch (br_301)
  createSaleRecord("301_1", "deal_3", "br_301", "2024-01", 14111.78),
  createSaleRecord("301_2", "deal_3", "br_301", "2024-02", 11691.87),
  createSaleRecord("301_3", "deal_3", "br_301", "2024-03", 16712.08),
  createSaleRecord("301_4", "deal_3", "br_301", "2024-04", 12748.10),
  createSaleRecord("301_5", "deal_3", "br_301", "2024-05", 8186.04),
  createSaleRecord("301_6", "deal_3", "br_301", "2024-06", 16428.04),
  createSaleRecord("301_7", "deal_3", "br_301", "2024-07", 39190.49),
  createSaleRecord("301_8", "deal_3", "br_301", "2024-08", 20943.86),

  // FUJAIRAH GENERAL TRADING -> Al Quoz Store (br_302)
  createSaleRecord("302_1", "deal_3", "br_302", "2024-01", 60254.23),
  createSaleRecord("302_2", "deal_3", "br_302", "2024-02", 47397.59),
  createSaleRecord("302_3", "deal_3", "br_302", "2024-03", 55347.76),
  createSaleRecord("302_4", "deal_3", "br_302", "2024-04", 84062.13),
  createSaleRecord("302_5", "deal_3", "br_302", "2024-05", 76676.25),
  createSaleRecord("302_6", "deal_3", "br_302", "2024-06", 62875.02),
  createSaleRecord("302_7", "deal_3", "br_302", "2024-07", 99476.14),
  createSaleRecord("302_8", "deal_3", "br_302", "2024-08", 76314.78),

  // FUJAIRAH GENERAL TRADING -> Deira Branch (br_303)
  createSaleRecord("303_1", "deal_3", "br_303", "2024-01", 4647.50),
  createSaleRecord("303_2", "deal_3", "br_303", "2024-02", 4765.90),
  createSaleRecord("303_3", "deal_3", "br_303", "2024-03", 4966.00),
  createSaleRecord("303_4", "deal_3", "br_303", "2024-04", 18504.00),
  createSaleRecord("303_5", "deal_3", "br_303", "2024-05", 5469.32),
  createSaleRecord("303_6", "deal_3", "br_303", "2024-06", 5457.40),
  createSaleRecord("303_7", "deal_3", "br_303", "2024-07", 14386.50),
  createSaleRecord("303_8", "deal_3", "br_303", "2024-08", 3798.00),

  // FUJAIRAH GENERAL TRADING -> Sharjah Branch (br_304)
  createSaleRecord("304_1", "deal_3", "br_304", "2024-01", 1469.00),
  createSaleRecord("304_2", "deal_3", "br_304", "2024-02", 1436.00),
  createSaleRecord("304_3", "deal_3", "br_304", "2024-03", 245.00),
  createSaleRecord("304_4", "deal_3", "br_304", "2024-04", 1015.04),
  createSaleRecord("304_5", "deal_3", "br_304", "2024-05", 2422.00),
  createSaleRecord("304_6", "deal_3", "br_304", "2024-06", 233.00),
  createSaleRecord("304_7", "deal_3", "br_304", "2024-07", 1873.50),
  createSaleRecord("304_8", "deal_3", "br_304", "2024-08", 1047.75),

  // 4. FASTENERS KING -> Al Quoz 4 (br_401)
  createSaleRecord("401_1", "deal_4", "br_401", "2024-01", 22359.85),
  createSaleRecord("401_2", "deal_4", "br_401", "2024-02", 14909.20),
  createSaleRecord("401_4", "deal_4", "br_401", "2024-04", 31496.45),
  createSaleRecord("401_5", "deal_4", "br_401", "2024-05", 34009.00),
  createSaleRecord("401_6", "deal_4", "br_401", "2024-06", 22812.00),
  createSaleRecord("401_7", "deal_4", "br_401", "2024-07", 23889.50),
  createSaleRecord("401_8", "deal_4", "br_401", "2024-08", 34555.00),

  // 5. AL RAWAE BUILDING MATERIALS -> Al Qusais (br_501)
  createSaleRecord("501_1", "deal_5", "br_501", "2024-01", 1272.25),
  createSaleRecord("501_2", "deal_5", "br_501", "2024-02", 19386.40),
  createSaleRecord("501_4", "deal_5", "br_501", "2024-04", 50779.31),
  createSaleRecord("501_5", "deal_5", "br_501", "2024-05", 89483.00),
  createSaleRecord("501_6", "deal_5", "br_501", "2024-06", 74178.70),
  createSaleRecord("501_7", "deal_5", "br_501", "2024-07", 161778.34),
  createSaleRecord("501_8", "deal_5", "br_501", "2024-08", 166372.62),

  // 6. REZA TRADING LLC -> Nakheel (br_601)
  createSaleRecord("601_1", "deal_6", "br_601", "2024-01", 5000.00),
  createSaleRecord("601_2", "deal_6", "br_601", "2024-02", 6500.00),
  createSaleRecord("601_3", "deal_6", "br_601", "2024-03", 8200.00),
  createSaleRecord("601_4", "deal_6", "br_601", "2024-04", 7400.00),
  createSaleRecord("601_5", "deal_6", "br_601", "2024-05", 6800.00),
  createSaleRecord("601_6", "deal_6", "br_601", "2024-06", 5900.00),
  createSaleRecord("601_7", "deal_6", "br_601", "2024-07", 8100.00),
  createSaleRecord("601_8", "deal_6", "br_601", "2024-08", 7500.00),

  // ==========================
  // MEHUL (Supervisor sup_2)
  // ==========================

  // 7. AL MADINA HARDWARE TRADING LLC
  createSaleRecord("701_6", "deal_7", "br_701", "2024-06", 55.00), // Madina Zayed
  createSaleRecord("702_7", "deal_7", "br_702", "2024-07", 55.00), // Abu Dhabi
  createSaleRecord("703_8", "deal_7", "br_703", "2024-08", 55.00), // Al Ain

  // 8. QCON GENERAL TRADING LLC
  createSaleRecord("801_1", "deal_8", "br_801", "2024-01", 200.00), // Sharjah
  createSaleRecord("801_2", "deal_8", "br_801", "2024-02", 1000.00),
  createSaleRecord("802_4", "deal_8", "br_802", "2024-04", 5.00),   // Al Quoz 2
  createSaleRecord("803_6", "deal_8", "br_803", "2024-06", 55.00),  // Al Quoz 4
  createSaleRecord("804_7", "deal_8", "br_804", "2024-07", 55.00),  // Abu Dhabi

  // 9. FGT LLC
  createSaleRecord("901_8", "deal_9", "br_901", "2024-08", 55.00),  // Al Ain
  createSaleRecord("902_1", "deal_9", "br_902", "2024-01", 5000.00), // Mussafah
  createSaleRecord("902_9", "deal_9", "br_902", "2024-09", 55.00),

  // 10. IMPERIAL GENERAL TRADING
  createSaleRecord("1001_1", "deal_10", "br_1001", "2024-01", 5000.00), // Mussafah
  createSaleRecord("1002_1", "deal_10", "br_1002", "2024-01", 5000.00), // Abu Dhabi

  // ==========================
  // AFFAN (Supervisor sup_3)
  // ==========================

  // 11. ADNAN HAJI HARDWARE TRADING LLC
  createSaleRecord("1101_1", "deal_11", "br_1101", "2024-01", 5000.00), // Sharjah Ind
  createSaleRecord("1101_2", "deal_11", "br_1101", "2024-02", 3000.00),

  // 12. MEDIA GENERAL TRADING LLC
  createSaleRecord("1203_1", "deal_12", "br_1203", "2024-01", 500.00),  // Umm Al Quwain

  // 13. SPEEDEX INTERNATIONAL LLC
  createSaleRecord("1301_1", "deal_13", "br_1301", "2024-01", 200.00),  // Al Quoz SZR
  createSaleRecord("1301_2", "deal_13", "br_1301", "2024-02", 1000.00),

  // 14. FAKRI TOOLS
  createSaleRecord("1401_1", "deal_14", "br_1401", "2024-01", 5000.00), // Ajman Ind
  createSaleRecord("1403_1", "deal_14", "br_1403", "2024-01", 5000.00), // Sajjah
  createSaleRecord("1404_1", "deal_14", "br_1404", "2024-01", 5000.00), // Al Quoz 3

  // 15. HARIS TRADING LLC
  createSaleRecord("1501_1", "deal_15", "br_1501", "2024-01", 2500.00), // Rolla

  // ==========================
  // BENJAMIN (Supervisor sup_4)
  // ==========================

  // 16. APEX ENGINEERING SUPPLIES
  createSaleRecord("1601_1", "deal_16", "br_1601", "2024-01", 18500.00),
  createSaleRecord("1601_2", "deal_16", "br_1601", "2024-02", 16000.00),
  createSaleRecord("1601_3", "deal_16", "br_1601", "2024-03", 22000.00)
];

class StateStore {
  constructor() {
    this.storageKey = "fischer_promo_mgmt_v2";
    this.currency = "AED";
    this.currentUser = {
      role: "Company Admin", // "Company Admin" | "Sales / Marketing Head" | "Sales Supervisor" | "Dealer User"
      id: "admin_1",
      name: "Corporate Admin",
      email: "admin@fischer.ae"
    };
    this.isLoggedIn = true;
    this.loadState();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.eventTypes = parsed.eventTypes || DEFAULT_EVENT_TYPES;
        this.salesHeads = parsed.salesHeads || DEFAULT_SALES_HEADS;
        this.supervisors = parsed.supervisors || DEFAULT_SUPERVISORS;
        this.dealers = parsed.dealers || DEFAULT_DEALERS;
        this.events = parsed.events || DEFAULT_EVENTS;
        this.sales = parsed.sales || DEFAULT_SALES;
        this.currency = parsed.currency || "AED";
        if (parsed.currentUser) this.currentUser = parsed.currentUser;
        if (typeof parsed.isLoggedIn !== "undefined") {
          this.isLoggedIn = !!parsed.isLoggedIn;
        } else {
          this.isLoggedIn = true;
        }
      } else {
        this.resetToDefaults();
      }
    } catch (e) {
      console.error("Failed to parse stored state, falling back to defaults", e);
      this.resetToDefaults();
    }
  }

  saveState() {
    try {
      const data = {
        eventTypes: this.eventTypes,
        salesHeads: this.salesHeads,
        supervisors: this.supervisors,
        dealers: this.dealers,
        events: this.events,
        sales: this.sales,
        currency: this.currency,
        currentUser: this.currentUser,
        isLoggedIn: !!this.isLoggedIn
      };
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save state to localStorage", e);
    }
  }

  resetToDefaults() {
    this.eventTypes = JSON.parse(JSON.stringify(DEFAULT_EVENT_TYPES));
    this.salesHeads = JSON.parse(JSON.stringify(DEFAULT_SALES_HEADS));
    this.supervisors = JSON.parse(JSON.stringify(DEFAULT_SUPERVISORS));
    this.dealers = JSON.parse(JSON.stringify(DEFAULT_DEALERS));
    this.events = JSON.parse(JSON.stringify(DEFAULT_EVENTS));
    this.sales = JSON.parse(JSON.stringify(DEFAULT_SALES));
    this.currency = "AED";
    this.isLoggedIn = true;
    this.saveState();
  }

  setRole(roleName, entityId = null) {
    this.currentUser.role = roleName;
    if (roleName === "Company Admin") {
      this.currentUser.name = "Corporate Admin";
      this.currentUser.email = "admin@fischer.ae";
      this.currentUser.id = "admin_1";
    } else if (roleName === "Sales / Marketing Head") {
      const head = entityId ? this.salesHeads.find(h => h.id === entityId) || this.salesHeads[0] : this.salesHeads[0];
      this.currentUser.name = head.name;
      this.currentUser.email = head.email;
      this.currentUser.id = head.id;
    } else if (roleName === "Sales Supervisor") {
      const sup = entityId ? this.supervisors.find(s => s.id === entityId) || this.supervisors[0] : this.supervisors[0];
      this.currentUser.name = sup.name;
      this.currentUser.email = sup.email;
      this.currentUser.id = sup.id;
    } else if (roleName === "Dealer User") {
      const deal = entityId ? this.dealers.find(d => d.id === entityId) || this.dealers[0] : this.dealers[0];
      this.currentUser.name = deal.name + " (" + deal.contactName + ")";
      this.currentUser.email = deal.email;
      this.currentUser.id = deal.id;
    }
    this.saveState();
  }

  // Helpers
  getDealer(dealerId) {
    return this.dealers.find(d => d.id === dealerId);
  }

  getBranch(dealerId, branchId) {
    const dealer = this.getDealer(dealerId);
    if (!dealer || !dealer.branches) return null;
    return dealer.branches.find(b => b.id === branchId);
  }

  getSupervisor(supId) {
    return this.supervisors.find(s => s.id === supId);
  }

  getHead(headId) {
    return this.salesHeads.find(h => h.id === headId);
  }

  getEventType(typeId) {
    return this.eventTypes.find(et => et.id === typeId);
  }

  getActivity(typeId, activityId) {
    const et = this.getEventType(typeId);
    if (!et || !et.activities) return null;
    return et.activities.find(a => a.id === activityId);
  }

  formatMoney(amount) {
    const num = Number(amount) || 0;
    return this.currency + " " + num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  getAchievementBadge(actual, target) {
    if (!target || target <= 0) return { label: "N/A", class: "badge-neutral", pct: 0, text: "No Target" };
    const pct = Math.round((actual / target) * 100);
    if (pct < 60) {
      return { label: pct + "%", class: "badge-danger", text: "Critical (<60%)", pct };
    } else if (pct <= 80) {
      return { label: pct + "%", class: "badge-warning", text: "Moderate (60-80%)", pct };
    } else if (pct < 100) {
      return { label: pct + "%", class: "badge-info", text: "On Track (80-99%)", pct };
    } else {
      return { label: pct + "%", class: "badge-success", text: "Achieved (100%+)", pct };
    }
  }
}

window.store = new StateStore();
