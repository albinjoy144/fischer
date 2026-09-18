/**
 * fischer Promotion Management - Seed Master Data & State Store
 */

const DEFAULT_EVENT_TYPES = [
  {
    id: "et_1",
    name: "Events",
    description: "Retail road shows, product training, awards, dealer events, sports & negotiation trainings",
    status: "Active",
    activities: [
      { id: "act_101", name: "Retail Road Show", samplePhoto: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_102", name: "Retail Product Training", samplePhoto: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_103", name: "Retail Awards", samplePhoto: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_104", name: "Sub Dealer Event", samplePhoto: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_105", name: "Product launch / FEC launch", samplePhoto: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_106", name: "FEC Sports - Badminton", samplePhoto: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_107", name: "Retail Sports - Cricket", samplePhoto: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_108", name: "External sales negotiation Training", samplePhoto: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&auto=format&fit=crop&q=60", status: "Active" }
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
      { id: "act_301", name: "Premium Wall Display", samplePhoto: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_302", name: "Standards wall Display", samplePhoto: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_303", name: "Dangler", samplePhoto: "https://images.unsplash.com/photo-1568667256549-094345857637?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_304", name: "Roll up", samplePhoto: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_305", name: "RM ll", samplePhoto: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_306", name: "FSU", samplePhoto: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_307", name: "Retail Big stand", samplePhoto: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=500&auto=format&fit=crop&q=60", status: "Active" }
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
      { id: "act_501", name: "Vinyl sticker", samplePhoto: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop&q=60", status: "Active" },
      { id: "act_502", name: "Signage Boards", samplePhoto: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500&auto=format&fit=crop&q=60", status: "Active" }
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
    email: "priya.nair@fischer.in",
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

const DEFAULT_SUPERVISORS = [
  {
    id: "sup_1",
    name: "Ramesh Kumar",
    headId: "head_1",
    email: "ramesh.kumar@fischer.ae",
    phone: "+971 50 223 3445",
    territory: "Dubai - Al Quoz & Deira",
    status: "Active"
  },
  {
    id: "sup_2",
    name: "Sara Ahmed",
    headId: "head_1",
    email: "sara.ahmed@fischer.ae",
    phone: "+971 55 334 4556",
    territory: "Sharjah & Northern Emirates",
    status: "Active"
  },
  {
    id: "sup_3",
    name: "Mohammed Ali",
    headId: "head_2",
    email: "mohammed.ali@fischer.ae",
    phone: "+971 52 445 5667",
    territory: "Abu Dhabi Industrial & Mussafah",
    status: "Active"
  },
  {
    id: "sup_4",
    name: "Anita Sharma",
    headId: "head_2",
    email: "anita.sharma@fischer.ae",
    phone: "+971 56 556 6778",
    territory: "Al Ain & Western Zone",
    status: "Active"
  },
  {
    id: "sup_5",
    name: "David Lee",
    headId: "head_3",
    email: "david.lee@fischer.ae",
    phone: "+971 54 667 7889",
    territory: "Ras Al Khaimah & Ajman",
    status: "Active"
  }
];

const DEFAULT_DEALERS = [
  {
    id: "deal_1",
    name: "Fine Tools",
    headId: "head_1",
    supervisorId: "sup_1",
    logo: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=100&auto=format&fit=crop&q=60",
    salesTarget: 100000,
    location: "Dubai",
    city: "Dubai",
    address: "Warehouse 14, Street 8, Al Quoz Industrial Area 3",
    contactName: "Mustafa K.",
    contactPhone: "+971 4 338 1234",
    email: "contact@finetools.ae",
    username: "finetools",
    status: "Active",
    branches: [
      { id: "br_101", name: "Al Quoz Branch", location: "Dubai", contactPhone: "+971 4 338 1235", photo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&auto=format&fit=crop&q=60", target: 55000 },
      { id: "br_102", name: "Deira Showroom", location: "Dubai", contactPhone: "+971 4 227 5678", photo: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&auto=format&fit=crop&q=60", target: 45000 }
    ]
  },
  {
    id: "deal_2",
    name: "BuildRight Trading",
    headId: "head_1",
    supervisorId: "sup_1",
    logo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100&auto=format&fit=crop&q=60",
    salesTarget: 70000,
    location: "Dubai",
    city: "Dubai",
    address: "Bldg 4, Hardware Market, Deira",
    contactName: "John Matthews",
    contactPhone: "+971 4 295 4321",
    email: "sales@buildright.ae",
    username: "buildright",
    status: "Active",
    branches: [
      { id: "br_201", name: "Deira Branch", location: "Dubai", contactPhone: "+971 4 295 4322", photo: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=400&auto=format&fit=crop&q=60", target: 40000 },
      { id: "br_202", name: "Rashidiya Depot", location: "Dubai", contactPhone: "+971 4 285 9911", photo: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400&auto=format&fit=crop&q=60", target: 30000 }
    ]
  },
  {
    id: "deal_3",
    name: "Pro Hardware",
    headId: "head_1",
    supervisorId: "sup_2",
    logo: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=100&auto=format&fit=crop&q=60",
    salesTarget: 50000,
    location: "Sharjah",
    city: "Sharjah",
    address: "Industrial Area 10, Near BMW Showroom",
    contactName: "Farhan Qureshi",
    contactPhone: "+971 6 534 8765",
    email: "info@prohardware.ae",
    username: "prohardware",
    status: "Active",
    branches: [
      { id: "br_301", name: "Sharjah Main Branch", location: "Sharjah", contactPhone: "+971 6 534 8766", photo: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=60", target: 30000 },
      { id: "br_302", name: "Industrial Area 4 Store", location: "Sharjah", contactPhone: "+971 6 533 1122", photo: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&auto=format&fit=crop&q=60", target: 20000 }
    ]
  },
  {
    id: "deal_4",
    name: "Al Najm Tools",
    headId: "head_3",
    supervisorId: "sup_5",
    logo: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=100&auto=format&fit=crop&q=60",
    salesTarget: 40000,
    location: "Ajman",
    city: "Ajman",
    address: "Sheikh Rashid Bin Saeed Al Maktoum St",
    contactName: "Nasser Al Najm",
    contactPhone: "+971 6 742 3344",
    email: "nasser@alnajmtools.ae",
    username: "alnajm",
    status: "Active",
    branches: [
      { id: "br_401", name: "Ajman Main Branch", location: "Ajman", contactPhone: "+971 6 742 3345", photo: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=60", target: 40000 }
    ]
  },
  {
    id: "deal_5",
    name: "Modern Build",
    headId: "head_3",
    supervisorId: "sup_5",
    logo: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=100&auto=format&fit=crop&q=60",
    salesTarget: 30000,
    location: "Ras Al Khaimah",
    city: "Ras Al Khaimah",
    address: "Al Nakheel, Near Clock Tower",
    contactName: "Girish Patel",
    contactPhone: "+971 7 222 9876",
    email: "sales@modernbuild.ae",
    username: "modernbuild",
    status: "Active",
    branches: [
      { id: "br_501", name: "RAK City Branch", location: "Ras Al Khaimah", contactPhone: "+971 7 222 9877", photo: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=400&auto=format&fit=crop&q=60", target: 30000 }
    ]
  },
  {
    id: "deal_6",
    name: "Apex Engineering Supplies",
    headId: "head_2",
    supervisorId: "sup_3",
    logo: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=100&auto=format&fit=crop&q=60",
    salesTarget: 95000,
    location: "Abu Dhabi",
    city: "Abu Dhabi",
    address: "Sector M-14, Mussafah Industrial",
    contactName: "Zaid Bin Mansoor",
    contactPhone: "+971 2 555 4321",
    email: "zaid@apexsupplies.ae",
    username: "apex",
    status: "Active",
    branches: [
      { id: "br_601", name: "Mussafah Central", location: "Abu Dhabi", contactPhone: "+971 2 555 4322", photo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&auto=format&fit=crop&q=60", target: 60000 },
      { id: "br_602", name: "Tourist Club Branch", location: "Abu Dhabi", contactPhone: "+971 2 678 9988", photo: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=60", target: 35000 }
    ]
  }
];

const DEFAULT_EVENTS = [
  {
    id: "ev_1",
    dealerId: "deal_1",
    branchId: "br_101",
    eventTypeId: "et_1",
    activityId: "act_101",
    amountSpend: 2500,
    date: "2024-03-12",
    location: "Dubai",
    status: "Active",
    notes: "High footfall retail roadshow showcasing fischer Duopower & ULTRACUT anchors. 120+ contractors attended.",
    photos: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: "ev_2",
    dealerId: "deal_2",
    branchId: "br_201",
    eventTypeId: "et_3",
    activityId: "act_301",
    amountSpend: 1800,
    date: "2024-03-08",
    location: "Dubai",
    status: "Active",
    notes: "Installation of brand new red illuminated fischer fixing matrix premium display bay.",
    photos: [
      "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: "ev_3",
    dealerId: "deal_3",
    branchId: "br_301",
    eventTypeId: "et_6",
    activityId: "act_601",
    amountSpend: 3200,
    date: "2024-02-28",
    location: "Sharjah",
    status: "Active",
    notes: "Distribution of Chemical Injection Scheme branded t-shirts to top tier applicators.",
    photos: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: "ev_4",
    dealerId: "deal_4",
    branchId: "br_401",
    eventTypeId: "et_8",
    activityId: "act_802",
    amountSpend: 950,
    date: "2024-02-15",
    location: "Ajman",
    status: "Active",
    notes: "fischer red branded baseball caps distributed to walk-in MEP technicians and installers.",
    photos: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: "ev_5",
    dealerId: "deal_5",
    branchId: "br_501",
    eventTypeId: "et_5",
    activityId: "act_502",
    amountSpend: 4500,
    date: "2024-02-10",
    location: "Ras Al Khaimah",
    status: "Active",
    notes: "External LED flex-face signage board erected on main road highway facing shopfront.",
    photos: [
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: "ev_6",
    dealerId: "deal_6",
    branchId: "br_601",
    eventTypeId: "et_1",
    activityId: "act_102",
    amountSpend: 3800,
    date: "2024-03-01",
    location: "Abu Dhabi",
    status: "Active",
    notes: "Hands-on heavy duty steel anchor and chemical mortar training session for 45 engineers.",
    photos: [
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&auto=format&fit=crop&q=60"
    ]
  }
];

const DEFAULT_SALES = [
  {
    id: "sal_1",
    dealerId: "deal_1",
    branchId: "br_101",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    monthYear: "2024-03",
    salesAmount: 52500,
    notes: "Spurred by Road show event on Mar 12th"
  },
  {
    id: "sal_2",
    dealerId: "deal_1",
    branchId: "br_102",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    monthYear: "2024-03",
    salesAmount: 30000,
    notes: "Consistent stock turn"
  },
  {
    id: "sal_3",
    dealerId: "deal_2",
    branchId: "br_201",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    monthYear: "2024-03",
    salesAmount: 43200,
    notes: "Strong chemical fixing sales after POS wall display installation"
  },
  {
    id: "sal_4",
    dealerId: "deal_2",
    branchId: "br_202",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    monthYear: "2024-03",
    salesAmount: 20000,
    notes: "Regular retail demand"
  },
  {
    id: "sal_5",
    dealerId: "deal_3",
    branchId: "br_301",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    monthYear: "2024-03",
    salesAmount: 28800,
    notes: "Sharjah main branch"
  },
  {
    id: "sal_6",
    dealerId: "deal_3",
    branchId: "br_302",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    monthYear: "2024-03",
    salesAmount: 17000,
    notes: "Industrial branch"
  },
  {
    id: "sal_7",
    dealerId: "deal_4",
    branchId: "br_401",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    monthYear: "2024-03",
    salesAmount: 38600,
    notes: "Near 100% target achievement"
  },
  {
    id: "sal_8",
    dealerId: "deal_5",
    branchId: "br_501",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    monthYear: "2024-03",
    salesAmount: 16900,
    notes: "Needs supervisor intervention - 56% target achievement"
  },
  {
    id: "sal_9",
    dealerId: "deal_6",
    branchId: "br_601",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    monthYear: "2024-03",
    salesAmount: 64500,
    notes: "Mussafah major anchor delivery"
  },
  {
    id: "sal_10",
    dealerId: "deal_6",
    branchId: "br_602",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    monthYear: "2024-03",
    salesAmount: 36500,
    notes: "Overachieved 104%"
  }
];

class StateStore {
  constructor() {
    this.storageKey = "fischer_promo_mgmt_v1";
    this.currency = "AED"; // or INR, USD
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
    return this.currency + " " + num.toLocaleString();
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
