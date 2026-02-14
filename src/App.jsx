import { useState, useEffect, useRef } from "react";

const TRAVELERS = [
  { name: "Charles Coleman", role: "Family" },
  { name: "Barbara Coleman", role: "Family" },
  { name: "Robert Coleman", role: "Family" },
  { name: "Rebecca Gross", role: "Family" },
  { name: "Rachel Coleman", role: "Family" },
  { name: "Daniel Coleman", role: "Family" },
  { name: "Beverly Kae Coleman", role: "Family" },
  { name: "David Noah", role: "Family" },
  { name: "Helena (Ella) Noah", role: "Family" },
  { name: "Elijah Noah", role: "Family" },
];

const DAYS = [
  {
    date: "Wed, Feb 18",
    title: "Arrival Day",
    location: "Liberia → Playa Panamá",
    icon: "✈️",
    color: "#0ea5e9",
    scheduled: [
      { time: "11:44 AM", item: "Daniel arrives — UA 1876 from Newark (EWR)", type: "flight" },
      { time: "12:55 PM", item: "Main group arrives — JetBlue 1691 from JFK", type: "flight" },
      { time: "~1:30 PM", item: "Meet & Greet at LIR — look for green flag + name sign", type: "transfer" },
      { time: "~2:15 PM", item: "Private transfer to El Mangroove Villas (~45 min drive)", type: "transfer" },
      { time: "3:00 PM", item: "Check in at El Mangroove — 4-Bedroom Villa with private pool", type: "hotel" },
    ],
    tips: [
      "Have passports ready for immigration — no plants, seeds, or fruits allowed into Costa Rica",
      "If you can't find the greeter, call 506-4600-9812 (24/7 support)",
      "Villa has full kitchen, BBQ area, rooftop terrace & private plunge pool",
    ],
    recs: [
      { name: "Matiss Restaurant", desc: "Upscale Latin-American fusion right at El Mangroove resort — perfect for a first-night dinner without leaving the property", category: "🍽️ Dining" },
      { name: "Playa Panamá Beach", desc: "Calm, lake-like waters right outside — great for kids to splash and decompress after the flight", category: "🏖️ Beach" },
      { name: "Resort Pool & Cabanas", desc: "Oceanfront infinity pool with service — grab cocktails and watch the sunset on your first evening", category: "🏊 Resort" },
    ],
    gallery: [
      { url: "https://images.trvl-media.com/lodging/13000000/12310000/12306000/12305975/e2ce0b75.jpg", caption: "El Mangroove Resort — Your Home Base" },
      { url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/09/7c/3c/el-mangroove-autograph.jpg", caption: "Oceanfront Pool & Lounge" },
      { url: "https://images.trvl-media.com/lodging/13000000/12310000/12306000/12305975/3e39e05c.jpg", caption: "Playa Panamá — Calm Waters Await" },
      { url: "https://cdn.costaricaexperts.com/images/attractions/PlayaPanama-3.jpg", caption: "Sunset at Playa Panamá" },
    ],
  },
  {
    date: "Thu, Feb 19",
    title: "Beach & Explore",
    location: "El Mangroove Villas",
    icon: "🏖️",
    color: "#f59e0b",
    scheduled: [
      { time: "Morning", item: "Breakfast included at the resort (10 people)", type: "meal" },
      { time: "All Day", item: "Free day — villa, beach, resort amenities", type: "free" },
    ],
    tips: [
      "Bearth Spa has yoga classes, fitness center, and oceanfront treatments",
      "Concierge desk can arrange water sports equipment",
      "Three on-site restaurants plus 24-hour room service",
    ],
    recs: [
      { name: "Snorkeling at Playa Nacascolo", desc: "Hidden gem cove on the peninsula — calm, clear waters perfect for family snorkeling. Spot puffer fish and sea turtles. Free shuttle access through Four Seasons. Pack snorkel gear and lunch!", category: "🤿 Snorkel" },
      { name: "Kayaking Culebra Bay", desc: "Explore hidden coves and mangroves from the water — gear available from hotel concierge. Pack a picnic!", category: "🛶 Adventure" },
      { name: "Ginger Restaurant (Playa Hermosa) 🍸", desc: "#1 rated restaurant in the area. Le Cordon Bleu chef, Asian-fusion tapas. Firecracker shrimp, seared tuna, pork lettuce wraps. Wide selection for all palates — Charlie will like the grilled fish and crispy fries with garlic mayo. 15 min drive. Open 5–10pm. MENU: gingercostarica.com/pdf-menu", category: "🍽️ Dinner" },
      { name: "Hacienda Blu Beach Lounge & Grill", desc: "Beachfront dining with irresistible bruschettas, fresh seafood, juicy beef, and excellent wines. Stunning sunset views. Sushi and live music nights. Family-friendly atmosphere", category: "🍽️ Dinner" },
      { name: "Playas del Coco Town Visit", desc: "The 'real' local beach town — 20 min drive. Lively with bars, restaurants, shops, street food. Try a soda (family-run eatery) for an authentic casado lunch: rice, beans, plantains, salad + meat for ~$6. Locals eat here daily", category: "🏘️ Authentic" },
      { name: "Aqua Sport (Playa Hermosa)", desc: "Peruvian-Costa Rican beachside restaurant with hammocks, tables in the sand, Adirondack chairs. 7 types of ceviche, grilled snapper, Peruvian 'Causa' potato dishes. Live music. Perfect casual family dinner", category: "🍽️ Casual" },
    ],
    gallery: [
      { url: "https://mytanfeet.com/wp-content/uploads/2015/09/gulf-of-papagayo-costa-rica-snorkeling.jpg", caption: "Snorkeling the Gulf of Papagayo" },
      { url: "https://www.gingercostarica.com/uploads/1/1/3/3/113344409/published/img-9363-2.jpg", caption: "Ginger Restaurant — Treehouse Tapas Bar" },
      { url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/7e/9d/07/playa-panama.jpg", caption: "Calm Waters of Playa Panamá" },
      { url: "https://mytanfeet.com/wp-content/uploads/2015/09/gulf-of-papagayo-costa-rica-boat.jpg", caption: "Boat Tour — Gulf of Papagayo" },
    ],
  },
  {
    date: "Fri, Feb 20",
    title: "Nacascolo Beach Day",
    location: "El Mangroove → Playa Nacascolo",
    icon: "🌊",
    color: "#06b6d4",
    scheduled: [
      { time: "Morning", item: "Breakfast included at the resort (10 people)", type: "meal" },
      { time: "~9:30 AM", item: "Noah family (David, Rachel, Elijah 7, Ella 11) — drive to Playa Nacascolo on the Papagayo Peninsula (~20 min)", type: "activity" },
      { time: "10:00 AM", item: "Park at the free public lot at Route 253 roundabout, take the free shuttle to the beach (runs every 15 min through Four Seasons property)", type: "activity" },
      { time: "All Day", item: "Spend the day at Playa Nacascolo — swim, snorkel, wildlife spotting. Pack lunch, snacks & water (no vendors!)", type: "free" },
      { time: "~4:00 PM", item: "Last shuttle back is 5pm — head back to El Mangroove", type: "transfer" },
      { time: "Evening", item: "Everyone reunites for last beach night dinner", type: "meal" },
    ],
    tips: [
      "🏖️ WHY NACASCOLO FOR YOUR FAMILY: Bath-calm water with zero rip currents (rare in Costa Rica!). Shallow enough for Elijah to wade safely. Crystal clear — you can see the sandy bottom at waist depth. Secluded, uncrowded on weekdays. Monkeys and coatis roam the beach!",
      "PACK EVERYTHING: No food vendors at the beach. Bring cooler with lunch, snacks, tons of water. Bring your own snorkel gear (or borrow from hotel). Towels, sunscreen, hats, water shoes",
      "The shuttle ride through the Four Seasons property has stunning ocean views — it's part of the experience!",
      "Spotted eagle rays, puffer fish, and capuchin monkeys are regularly seen here",
      "Last full day at the beach — tomorrow you transfer to the rainforest!",
      "Bathrooms, outdoor showers, drinking fountains and picnic tables are at the shuttle drop-off",
    ],
    recs: [
      { name: "🏖️ Playa Nacascolo (NOAH FAMILY PICK)", desc: "The best family beach in the Papagayo area. Calm, lake-like water sheltered in Culebra Bay — zero waves, zero rip currents, perfect for Elijah (7) and Ella (11). Golden sand, capuchin monkeys in the trees, spotted eagle rays in the shallows. Free public access via shuttle through Four Seasons property. Pack a picnic — no vendors. Bring snorkel gear for exploring. 20 min drive from El Mangroove.", category: "🏖️ Beach" },
      { name: "Private Boat Tour — Gulf of Papagayo", desc: "For the rest of the group while Noah family is at Nacascolo: explore secluded white-sand beaches, snorkel coral reefs, and spot dolphins. 4-hour private charters depart from Playas del Coco — fits 6-8 people. Morning tours have best water clarity.", category: "⛵ Boat" },
      { name: "Ginger Restaurant — FRIDAY MARTINI NIGHT 🍸", desc: "Half-price martinis at the #1 restaurant in Playa Hermosa! Le Cordon Bleu chef Anne Hegney's tapas: firecracker shrimp, pork lettuce wraps in mango-tamarind sauce, seared pepper-crusted tuna. Gluten-free labeled. Outdoor treehouse setting. Open 5–10pm. 15 min drive. MENU: gingercostarica.com/pdf-menu", category: "🍽️ Dinner" },
      { name: "Peninsula CR Steak & Seafood Grill", desc: "Premium steaks and fresh seafood with breathtaking bay views in Playa Panamá. Great for Charlie — straightforward grilled meats and fish, nothing too adventurous. Big portions. Right near the hotel.", category: "🍽️ Dinner" },
      { name: "Africa Mia Safari Park", desc: "Alternative group activity: Giraffes, zebra, antelope roam open savannah — less than an hour away. Kids love feeding the ostriches, camels and deer. Great family half-day trip.", category: "🦒 Wildlife" },
      { name: "Roberto's at La Gaviota (Playa Hermosa)", desc: "Casual beachside spot at La Gaviota Tropical hotel. Traditional Costa Rican cuisine plus international favorites — fish, pork, seafood, chicken. Good for picky eaters. Right on the sand.", category: "🍽️ Casual" },
    ],
    gallery: [
      { url: "https://www.twoweeksincostarica.com/wp-content/uploads/2024/06/playa-nacascolo-views-1024x768.jpg", caption: "Playa Nacascolo — Calm Culebra Bay" },
      { url: "https://www.twoweeksincostarica.com/wp-content/uploads/2024/06/playa-nacascolo-sand-1024x768.jpg", caption: "Golden Sand & Crystal Water" },
      { url: "https://puravidamoms.com/wp-content/uploads/2019/12/playa-nacascolo-costa-rica.jpg", caption: "Secluded Beach on the Peninsula" },
      { url: "https://www.gingercostarica.com/uploads/1/1/3/3/113344409/published/img-9413.jpg", caption: "Ginger — Friday Martini Night" },
    ],
  },
  {
    date: "Sat, Feb 21",
    title: "Beach → Rainforest",
    location: "El Mangroove → Rio Celeste",
    icon: "🌿",
    color: "#10b981",
    scheduled: [
      { time: "Morning", item: "Breakfast at El Mangroove (10 people)", type: "meal" },
      { time: "11:00 AM", item: "Pickup for private transfer: Papagayo → Rio Celeste", type: "transfer" },
      { time: "~1:00 PM", item: "1-hour waiting time (lunch stop en route)", type: "transfer" },
      { time: "2:00 PM", item: "Check in at Rio Celeste Hideaway Boutique Hotel", type: "hotel" },
      { time: "Afternoon", item: "Explore hotel grounds — pool, jacuzzis, nature trails, river trail", type: "free" },
    ],
    tips: [
      "4 casitas booked: 1 Forest View (Queen Beds), 2 Forest View (King), 1 Garden View (Queen)",
      "$200 resort credit PER ROOM for food, drinks & spa — use it!",
      "The hotel trail leads to a Rancho by the river where you can swim in the milky-blue waters",
      "Breakfast is included; restaurant serves a la carte breakfast, lunch & dinner",
    ],
    recs: [
      { name: "Hotel Nature Trail to the River", desc: "A short trail leads to a private rancho by the Rio Celeste with towels — swim in the famous milky-blue waters right from the hotel", category: "🏞️ Nature" },
      { name: "Luna Azul Pool Bar", desc: "Swim-up bar with fresh tropical cocktails and lighter lunch fare — perfect arrival activity. Use your resort credit!", category: "🍹 Resort" },
      { name: "Cantina Delirio Bar & Lounge", desc: "Relaxing spot for aperitifs or after-dinner drinks at the hotel — great way to end your first jungle evening", category: "🍷 Resort" },
      { name: "Restaurante Tilapiera Los Lagitos 🐟", desc: "MUST-VISIT: Family-run tilapia farm restaurant just 0.8 miles from the national park entrance! They net your fish live from the pond, fry it whole, and serve it fresh 5 minutes later with patacones, yuca, and banana ceviche. Hand-carved wooden tables, beautiful garden, horseback riding available too. Only $10/fish. ONLY OPEN SAT & SUN 11am–8pm — go today or tomorrow! Call +506 8482 8415. Menu: riocelestehorsebackride.com/restaurante-tilapiera", category: "🍽️ LOCAL GEM" },
      { name: "Bijagua Town Walk", desc: "The real Costa Rica: a 5,000-person farming village where cows roam the streets and chickens run free. Main street has a few sodas (family-run eateries), banks, and a pharmacy. Ask locals for 'agua de pipa' (fresh coconut water) from roadside stands", category: "🏘️ Authentic" },
    ],
    gallery: [
      { url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/278371539.jpg", caption: "Rio Celeste Hideaway — Your Rainforest Retreat" },
      { url: "https://www.rfrtravel.com/wp-content/uploads/2022/10/DSC06853-1200x800.jpg", caption: "Hideaway Casita in the Jungle" },
      { url: "https://mytanfeet.com/wp-content/uploads/2016/06/bijagua-costa-rica-mountains.jpg", caption: "Bijagua — Mountain Village Life" },
      { url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/f0/38/01/rio-celeste-hideaway.jpg", caption: "Hotel Pool Surrounded by Rainforest" },
    ],
  },
  {
    date: "Sun, Feb 22",
    title: "Zip Line Day!",
    location: "Rio Celeste Hideaway",
    icon: "🌲",
    color: "#22c55e",
    scheduled: [
      { time: "Morning", item: "Breakfast at Rio Celeste Hideaway", type: "meal" },
      { time: "TBD", item: "Zip Lining Adventures on Rio Celeste (7 people)", type: "activity" },
    ],
    tips: [
      "Zip line soars over the rainforest canopy with views of the turquoise Rio Celeste below",
      "Harness and safety equipment provided — professional guides share ecological knowledge",
      "Wear closed-toe shoes and comfortable clothes you don't mind getting sweaty",
    ],
    recs: [
      { name: "Tenorio Volcano National Park", desc: "Hike the 3.7-mile trail to the famous Rio Celeste Waterfall (98 ft plunge into bright blue pool), hot springs, and El Teñidero where two rivers merge to create the blue color. $12 adults, $5 kids. Buy tickets on SINAC website in advance!", category: "🥾 Hike" },
      { name: "Heliconias Hanging Bridges", desc: "Walk amongst the treetops on 3 impressive suspension bridges through the rainforest — unique perspective on wildlife, flora and fauna. Great for all ages", category: "🌿 Nature" },
      { name: "Tapir Valley Nature Reserve", desc: "Guided night or day hike on the foothills of Tenorio Volcano — search for Costa Rica's largest mammal, the Tapir, in untamed rainforest", category: "🦫 Wildlife" },
      { name: "Hotel Spa", desc: "After the zip line adrenaline, unwind with a spa treatment — covered by your $200 resort credit", category: "💆 Wellness" },
    ],
    gallery: [
      { url: "https://images.squarespace-cdn.com/content/v1/5e3f0b1ef2e69e41bbdc10c5/1617381474397-zipline-rainforest-costa-rica.jpg", caption: "Zip Lining Over the Canopy" },
      { url: "https://www.anywhere.com/img-a/costa-rica/attractions/tenorio-volcano/rio-celeste-waterfall.jpg", caption: "Rio Celeste Waterfall — Tenorio National Park" },
      { url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/db/c5/cc/heliconias-hanging-bridges.jpg", caption: "Heliconias Hanging Bridges" },
      { url: "https://www.twoweeksincostarica.com/wp-content/uploads/2024/06/rio-celeste-blue-water-1024x768.jpg", caption: "The Famous Blue Waters of Rio Celeste" },
    ],
  },
  {
    date: "Mon, Feb 23",
    title: "Chocolate Adventure",
    location: "Rio Celeste Hideaway",
    icon: "🍫",
    color: "#92400e",
    scheduled: [
      { time: "Morning", item: "Breakfast at Rio Celeste Hideaway", type: "meal" },
      { time: "1:30 PM", item: "Chocolate Plantations Tour (7 people)", type: "activity" },
    ],
    tips: [
      "Learn about cocoa plantation lifecycle — from grafting to harvest to chocolate making",
      "Tour ends with fresh chocolate and milk + souvenir shopping",
      "Must be 7 years or older. Bring hiking boots, sunscreen, bug spray, long pants, camera",
      "Duration: 1.5–3 hours tour time + 1.5 hours roundtrip transportation",
    ],
    recs: [
      { name: "Maleku Indigenous Village Tour", desc: "Meet the Maleku people (1,000 indigenous residents who speak Maleku Jaica dialect) — learn about their culture, traditions, and way of life. One of the few indigenous communities open to visitors in this region", category: "🏛️ Culture" },
      { name: "Kayaking on Rio Celeste", desc: "Leisurely kayak tour along the enchanting blue waters — deep connection with the river and surrounding rainforest. Arranged through hotel", category: "🛶 Adventure" },
      { name: "Birdwatching in Tenorio Park", desc: "Early morning guided tour promises rare encounters with Costa Rica's diverse birdlife — toucans, quetzals, and hundreds of species in the surrounding wilderness", category: "🦜 Wildlife" },
      { name: "Horseback Riding Trails", desc: "Three different trail rides through the unique terrain surrounding Rio Celeste and Tenorio Volcano — choose your mood from gentle to adventurous", category: "🐴 Adventure" },
      { name: "Tapirus Paradise Restaurant 🪵", desc: "THE dinner spot near Rio Celeste. Stunning interior with hand-carved wood pillars and sculptures. Costa Rican casados, seafood, grilled meats, pizza oven, great cocktails. Views to Arenal Volcano! Very close to Rio Celeste Hideaway — 5 min drive. Much cheaper and better food than the hotel. Even Charlie will love the straightforward grilled options. TripAdvisor: tripadvisor.com (search 'Tapirus Paradise Rio Celeste')", category: "🍽️ Dinner" },
      { name: "Finca Verde Lodge Nature Walk", desc: "Locally-owned lodge offering short guided nature walks — great for spotting frogs, sloths, and birds up close. Educational for the kids, low-intensity", category: "🦥 Wildlife" },
    ],
    gallery: [
      { url: "https://www.anywherecostarica.com/images/attractions/chocolate-tour-la-fortuna.jpg", caption: "Cacao Plantation Tour" },
      { url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/62/d9/01/bijagua-rainforest-tours.jpg", caption: "Rainforest Wildlife — Toucans & More" },
      { url: "https://mytanfeet.com/wp-content/uploads/2016/06/bijagua-costa-rica-town.jpg", caption: "Bijagua Village — Authentic Costa Rica" },
      { url: "https://www.twoweeksincostarica.com/wp-content/uploads/2024/06/rio-celeste-swimming-1024x768.jpg", caption: "Swimming in Rio Celeste" },
    ],
  },
  {
    date: "Tue, Feb 24",
    title: "River Tubing",
    location: "Rio Celeste Hideaway",
    icon: "🛟",
    color: "#0284c7",
    scheduled: [
      { time: "Morning", item: "Breakfast at Rio Celeste Hideaway", type: "meal" },
      { time: "TBD", item: "River Tubing Tour (7 people) — Class I & II Rapids", type: "activity" },
    ],
    tips: [
      "Float down one of the most beautiful rivers in the world on a tube!",
      "Mild temperature water with gentle rapids surrounded by tropical forest",
      "Option for more adventurous: Río Frío with Class III & IV Rapids",
      "Wear water shoes, bring waterproof camera, and sunscreen",
    ],
    recs: [
      { name: "Restaurante Tilapiera — LAST CHANCE 🐟", desc: "If you haven't gone yet, this is it! The family-run tilapia farm is only open Sat & Sun. They catch your fish live from the pond and fry it whole — $10 with 2 sides. Best meal reviewers had in all of Rio Celeste. Beautiful garden with hand-carved furniture. Also offers horseback riding. 0.8 miles from park entrance. Call +506 8482 8415", category: "🍽️ LOCAL GEM" },
      { name: "Caño Negro Wildlife Refuge", desc: "River-boat tour to a Ramsar-designated wetland of worldwide importance — incredible crocodile sightings, exotic birds, and wildlife", category: "🐊 Wildlife" },
      { name: "White Water Rafting — Tenorio River", desc: "For the adrenaline seekers: 7-mile rafting adventure with twists, turns and drops through challenging rapids, then calm gliding along Corobicí River", category: "🌊 Adventure" },
      { name: "Arenal Hot Springs Day Trip", desc: "About 2 hours away — soak in volcanic hot springs surrounded by rainforest. A therapeutic and calming all-day retreat. Arranged through hotel", category: "♨️ Wellness" },
      { name: "Tapirus Paradise — Last Night Dinner 🪵", desc: "Top-rated restaurant near the hotel. Amazing wood carvings, views to Arenal Volcano, great cocktails. Casados ~$11, seafood, steaks, pizza. Way better value than hotel dining. Good options for everyone including Charlie. 5 min drive.", category: "🍽️ Dinner" },
      { name: "The Hummingbird Restaurant (Bijagua)", desc: "Beautiful garden restaurant where hummingbirds feed right next to your table. Nice outdoor seating, great food and service. Worth the drive into the village for a unique local experience", category: "🍽️ Authentic" },
    ],
    gallery: [
      { url: "https://images.squarespace-cdn.com/content/v1/rio-celeste-tubing-costa-rica-adventure.jpg", caption: "River Tubing on Rio Celeste" },
      { url: "https://www.twoweeksincostarica.com/wp-content/uploads/2024/06/rio-celeste-river-1024x768.jpg", caption: "Turquoise Waters — Your Tubing Route" },
      { url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/f0/37/ff/tapirus-paradise.jpg", caption: "Tapirus Paradise — Wood-Carved Dining" },
      { url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/278371545.jpg", caption: "Last Night at Rio Celeste Hideaway" },
    ],
  },
  {
    date: "Wed, Feb 25",
    title: "Departure Day",
    location: "Rio Celeste → LIR → JFK",
    icon: "🏠",
    color: "#6366f1",
    scheduled: [
      { time: "Early AM", item: "Final breakfast at Rio Celeste Hideaway", type: "meal" },
      { time: "10:15 AM", item: "Pickup for transfer: Rio Celeste → Daniel Oduber Int'l Airport (LIR)", type: "transfer" },
      { time: "~12:15 PM", item: "Arrive at LIR — recommended 2 hours before departure", type: "transfer" },
      { time: "2:15 PM", item: "JetBlue 1692 LIR → JFK (all 10 travelers)", type: "flight" },
    ],
    tips: [
      "Check out of casitas by 12:00 PM (but you're leaving at 10:15 AM so pack the night before!)",
      "Arrive at airport 2 hours early for international departure",
      "Last chance to buy Costa Rican coffee, chocolate, and souvenirs at the airport",
      "Vacation Discount applied: $2,660 off your package!",
    ],
    recs: [],
    gallery: [
      { url: "https://www.twoweeksincostarica.com/wp-content/uploads/2024/06/rio-celeste-blue-water-1024x768.jpg", caption: "Pura Vida — Until Next Time!" },
      { url: "https://cdn.costaricaexperts.com/images/attractions/PlayaPanama-3.jpg", caption: "Memories of Playa Panamá" },
    ],
  },
];

const PACKING = {
  essentials: ["Valid passports (all 10)", "Travel insurance docs", "Credit card (no foreign transaction fee)", "Phone chargers + battery packs", "Copies of itinerary + confirmation IDs"],
  clothing: ["Lightweight shorts & t-shirts", "Swimsuits (2+ per person)", "Light long pants for jungle hikes", "Closed-toe hiking shoes/boots", "Water shoes or old sneakers", "Flip-flops/sandals", "Sun hat & sunglasses"],
  gear: ["Sunscreen SPF 30+ (buy before — expensive in CR)", "Bug spray/repellent", "Reusable water bottles", "Dry bag for water activities", "Waterproof phone pouch", "Binoculars for wildlife", "GoPro / waterproof camera"],
  kids: ["Snacks for the plane", "Entertainment for flights", "Kid-sized life vest (if you have one)", "Extra changes of clothes", "Small first aid kit"],
};

const EMERGENCY = {
  support: "506-4600-9812",
  consultant: "Rachel Peck (Travel Consultant)",
  itineraryId: "980256",
};

// --- Component ---

export default function CostaRicaTrip() {
  const [activeDay, setActiveDay] = useState(0);
  const [activeTab, setActiveTab] = useState("schedule");
  const [showTravelers, setShowTravelers] = useState(false);
  const [showPacking, setShowPacking] = useState(false);
  const [expandedRec, setExpandedRec] = useState(null);
  const scrollRef = useRef(null);

  const day = DAYS[activeDay];

  const typeIcon = (type) => {
    switch (type) {
      case "flight": return "✈️";
      case "transfer": return "🚐";
      case "hotel": return "🏨";
      case "meal": return "🍳";
      case "activity": return "⚡";
      case "free": return "☀️";
      default: return "📍";
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #064e3b 0%, #022c22 40%, #0c0a09 100%)",
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      color: "#fafaf9",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative elements */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse at 20% 20%, rgba(16,185,129,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(6,182,212,0.06) 0%, transparent 50%)",
      }} />

      {/* Header */}
      <div style={{
        position: "relative", zIndex: 1, padding: "40px 24px 24px",
        textAlign: "center",
      }}>
        <div style={{ fontSize: "14px", letterSpacing: "4px", color: "#6ee7b7", textTransform: "uppercase", marginBottom: "8px", fontWeight: 600 }}>
          Costa Rica · Feb 18–25, 2026
        </div>
        <h1 style={{
          fontSize: "clamp(28px, 6vw, 48px)", fontWeight: 800, margin: "0 0 8px",
          background: "linear-gradient(135deg, #fafaf9 0%, #a7f3d0 50%, #6ee7b7 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          lineHeight: 1.1,
        }}>
          Coleman & Noah<br />Family Getaway
        </h1>
        <p style={{ color: "#a8a29e", fontSize: "15px", margin: "12px 0 0" }}>
          7 Nights · 8 Days · {TRAVELERS.length} Travelers · Pura Vida! 🌴
        </p>

        {/* Quick action buttons */}
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px", flexWrap: "wrap" }}>
          <button
            onClick={() => setShowTravelers(!showTravelers)}
            style={{
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
              color: "#d6d3d1", padding: "8px 16px", borderRadius: "20px", cursor: "pointer",
              fontSize: "13px", backdropFilter: "blur(10px)", transition: "all 0.2s",
            }}
            onMouseOver={e => { e.target.style.background = "rgba(255,255,255,0.15)"; e.target.style.color = "#fafaf9"; }}
            onMouseOut={e => { e.target.style.background = "rgba(255,255,255,0.08)"; e.target.style.color = "#d6d3d1"; }}
          >
            👥 Travelers
          </button>
          <button
            onClick={() => setShowPacking(!showPacking)}
            style={{
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
              color: "#d6d3d1", padding: "8px 16px", borderRadius: "20px", cursor: "pointer",
              fontSize: "13px", backdropFilter: "blur(10px)", transition: "all 0.2s",
            }}
            onMouseOver={e => { e.target.style.background = "rgba(255,255,255,0.15)"; e.target.style.color = "#fafaf9"; }}
            onMouseOut={e => { e.target.style.background = "rgba(255,255,255,0.08)"; e.target.style.color = "#d6d3d1"; }}
          >
            🎒 Packing List
          </button>
          <button
            onClick={() => {}}
            style={{
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
              color: "#d6d3d1", padding: "8px 16px", borderRadius: "20px", cursor: "pointer",
              fontSize: "13px", backdropFilter: "blur(10px)", transition: "all 0.2s",
            }}
            onMouseOver={e => { e.target.style.background = "rgba(255,255,255,0.15)"; e.target.style.color = "#fafaf9"; }}
            onMouseOut={e => { e.target.style.background = "rgba(255,255,255,0.08)"; e.target.style.color = "#d6d3d1"; }}
          >
            📞 {EMERGENCY.support}
          </button>
        </div>
      </div>

      {/* Travelers Panel */}
      {showTravelers && (
        <div style={{
          margin: "0 16px 16px", padding: "20px", borderRadius: "16px",
          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(20px)", position: "relative", zIndex: 1,
        }}>
          <h3 style={{ margin: "0 0 12px", fontSize: "16px", color: "#6ee7b7" }}>👥 Our Travel Party</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "8px" }}>
            {TRAVELERS.map((t, i) => (
              <div key={i} style={{
                padding: "10px 12px", borderRadius: "10px",
                background: "rgba(255,255,255,0.05)", fontSize: "13px",
                border: "1px solid rgba(255,255,255,0.08)",
              }}>
                {t.name}
              </div>
            ))}
          </div>
          <div style={{ marginTop: "12px", fontSize: "12px", color: "#78716c" }}>
            Flights: JetBlue 1691 (JFK→LIR) & United 1876 (EWR→LIR) · Return: JetBlue 1692 (LIR→JFK, all 10)
          </div>
        </div>
      )}

      {/* Packing Panel */}
      {showPacking && (
        <div style={{
          margin: "0 16px 16px", padding: "20px", borderRadius: "16px",
          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(20px)", position: "relative", zIndex: 1,
        }}>
          <h3 style={{ margin: "0 0 16px", fontSize: "16px", color: "#6ee7b7" }}>🎒 Packing Checklist</h3>
          {Object.entries(PACKING).map(([cat, items]) => (
            <div key={cat} style={{ marginBottom: "16px" }}>
              <div style={{
                fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px",
                color: "#a8a29e", marginBottom: "8px", fontWeight: 600,
              }}>
                {cat === "essentials" ? "📋 Essentials" : cat === "clothing" ? "👕 Clothing" : cat === "gear" ? "🔧 Gear & Sun" : "🧒 Kids"}
              </div>
              {items.map((item, i) => (
                <div key={i} style={{
                  padding: "6px 0", fontSize: "13px", color: "#d6d3d1",
                  borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  display: "flex", alignItems: "center", gap: "8px",
                }}>
                  <span style={{ width: "16px", height: "16px", borderRadius: "4px", border: "1.5px solid rgba(255,255,255,0.2)", display: "inline-block", flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>
          ))}
          <div style={{
            marginTop: "8px", padding: "12px", borderRadius: "10px",
            background: "rgba(250,204,21,0.1)", border: "1px solid rgba(250,204,21,0.2)",
            fontSize: "12px", color: "#fde68a",
          }}>
            ☀️ February = peak dry season in Guanacaste. Expect 86–94°F (30–35°C) at the beach, cooler in the rainforest. Sunscreen is expensive in Costa Rica — bring plenty!
          </div>
        </div>
      )}

      {/* Day Selector — horizontal scroll */}
      <div ref={scrollRef} style={{
        display: "flex", gap: "8px", padding: "8px 16px 16px",
        overflowX: "auto", position: "relative", zIndex: 1,
        scrollbarWidth: "none", msOverflowStyle: "none",
      }}>
        {DAYS.map((d, i) => (
          <button
            key={i}
            onClick={() => { setActiveDay(i); setActiveTab("schedule"); setExpandedRec(null); }}
            style={{
              flexShrink: 0, padding: "12px 14px", borderRadius: "14px", cursor: "pointer",
              border: activeDay === i ? `2px solid ${d.color}` : "1px solid rgba(255,255,255,0.1)",
              background: activeDay === i
                ? `linear-gradient(135deg, ${d.color}22, ${d.color}11)`
                : "rgba(255,255,255,0.04)",
              transition: "all 0.3s ease", minWidth: "90px", textAlign: "center",
            }}
          >
            <div style={{ fontSize: "20px", marginBottom: "4px" }}>{d.icon}</div>
            <div style={{
              fontSize: "11px", fontWeight: 700, color: activeDay === i ? d.color : "#a8a29e",
              letterSpacing: "0.5px",
            }}>
              {d.date.split(",")[0]}
            </div>
            <div style={{ fontSize: "10px", color: activeDay === i ? "#d6d3d1" : "#78716c", marginTop: "2px" }}>
              {d.date.split(", ")[1]}
            </div>
          </button>
        ))}
      </div>

      {/* Day Content */}
      <div style={{ padding: "0 16px 120px", position: "relative", zIndex: 1 }}>
        {/* Day Header */}
        <div style={{
          padding: "24px 20px", borderRadius: "20px", marginBottom: "12px",
          background: `linear-gradient(135deg, ${day.color}18, ${day.color}08)`,
          border: `1px solid ${day.color}30`,
          backdropFilter: "blur(10px)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
            <span style={{ fontSize: "32px" }}>{day.icon}</span>
            <div>
              <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 700 }}>{day.title}</h2>
              <div style={{ fontSize: "13px", color: "#a8a29e", marginTop: "2px" }}>
                {day.date} · {day.location}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "12px" }}>
          {[
            { id: "schedule", label: "📋 Schedule", count: day.scheduled.length },
            { id: "recs", label: "⭐ Recs", count: day.recs.length },
            { id: "gallery", label: "📸 Gallery", count: (day.gallery || []).length },
            { id: "tips", label: "💡 Tips", count: day.tips.length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1, padding: "10px 4px", borderRadius: "12px", cursor: "pointer",
                border: "none", fontSize: "11px", fontWeight: 600, transition: "all 0.2s",
                background: activeTab === tab.id ? `${day.color}25` : "rgba(255,255,255,0.04)",
                color: activeTab === tab.id ? day.color : "#78716c",
                minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}
            >
              {tab.label}
              {tab.count > 0 && (
                <span style={{
                  marginLeft: "4px", fontSize: "10px", padding: "1px 6px", borderRadius: "8px",
                  background: activeTab === tab.id ? `${day.color}30` : "rgba(255,255,255,0.08)",
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Schedule Tab */}
        {activeTab === "schedule" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {day.scheduled.map((s, i) => (
              <div key={i} style={{
                display: "flex", gap: "12px", padding: "14px 16px",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                alignItems: "flex-start",
              }}>
                <div style={{
                  fontSize: "18px", width: "36px", height: "36px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: "10px", background: `${day.color}15`, flexShrink: 0,
                }}>
                  {typeIcon(s.type)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "11px", color: day.color, fontWeight: 700, marginBottom: "2px" }}>
                    {s.time}
                  </div>
                  <div style={{ fontSize: "14px", color: "#e7e5e4", lineHeight: 1.4 }}>
                    {s.item}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recommendations Tab */}
        {activeTab === "recs" && (
          <div>
            {day.recs.length === 0 ? (
              <div style={{
                padding: "40px 20px", textAlign: "center", color: "#78716c",
                borderRadius: "14px", background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}>
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>✈️</div>
                Safe travels home! No local recs for departure day.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {day.recs.map((r, i) => (
                  <div
                    key={i}
                    onClick={() => setExpandedRec(expandedRec === i ? null : i)}
                    style={{
                      padding: "16px", borderRadius: "14px", cursor: "pointer",
                      background: expandedRec === i ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
                      border: expandedRec === i ? `1px solid ${day.color}40` : "1px solid rgba(255,255,255,0.08)",
                      transition: "all 0.2s",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{
                          fontSize: "10px", color: day.color, fontWeight: 700,
                          textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "4px",
                        }}>
                          {r.category}
                        </div>
                        <div style={{ fontSize: "15px", fontWeight: 600, color: "#fafaf9" }}>
                          {r.name}
                        </div>
                      </div>
                      <span style={{
                        color: "#78716c", fontSize: "18px", transition: "transform 0.2s",
                        transform: expandedRec === i ? "rotate(180deg)" : "rotate(0deg)",
                      }}>
                        ▾
                      </span>
                    </div>
                    {expandedRec === i && (
                      <div style={{
                        marginTop: "10px", paddingTop: "10px",
                        borderTop: "1px solid rgba(255,255,255,0.08)",
                        fontSize: "13px", color: "#a8a29e", lineHeight: 1.6,
                      }}>
                        {r.desc}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tips Tab */}
        {activeTab === "tips" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {day.tips.map((tip, i) => (
              <div key={i} style={{
                display: "flex", gap: "12px", padding: "14px 16px",
                borderRadius: "14px",
                background: "rgba(250,204,21,0.05)",
                border: "1px solid rgba(250,204,21,0.12)",
                alignItems: "flex-start",
              }}>
                <span style={{ fontSize: "16px", flexShrink: 0, marginTop: "1px" }}>💡</span>
                <div style={{ fontSize: "13px", color: "#d6d3d1", lineHeight: 1.5 }}>
                  {tip}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {(day.gallery || []).map((img, i) => (
              <div key={i}
                onClick={() => setExpandedRec(expandedRec === `img${i}` ? null : `img${i}`)}
                style={{
                  borderRadius: "14px", overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.04)",
                  gridColumn: expandedRec === `img${i}` ? "1 / -1" : "auto",
                  cursor: "pointer", transition: "all 0.3s ease",
                }}>
                <div style={{
                  width: "100%", height: expandedRec === `img${i}` ? "260px" : "150px",
                  overflow: "hidden", transition: "height 0.3s ease",
                  background: `linear-gradient(135deg, ${day.color}15, ${day.color}08)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <img
                    src={img.url}
                    alt={img.caption}
                    style={{
                      width: "100%", height: "100%", objectFit: "cover",
                      display: "block",
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:${day.color};font-size:36px;">${day.icon}</div>`;
                    }}
                  />
                </div>
                <div style={{
                  padding: "10px 12px", fontSize: "11px",
                  color: "#a8a29e", fontWeight: 500, lineHeight: 1.3,
                }}>
                  {img.caption}
                  {expandedRec !== `img${i}` && <span style={{ color: "#57534e", marginLeft: "6px" }}>tap to expand</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Weather & Emergency Footer */}
        <div style={{
          marginTop: "24px", padding: "20px", borderRadius: "16px",
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
        }}>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "140px" }}>
              <div style={{ fontSize: "11px", color: "#78716c", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "6px", fontWeight: 600 }}>
                ☀️ Weather
              </div>
              <div style={{ fontSize: "13px", color: "#d6d3d1", lineHeight: 1.5 }}>
                {activeDay <= 2
                  ? "Beach: 86–94°F (30–35°C), sunny, dry. Calm waters. Possible Papagayo winds."
                  : activeDay <= 6
                  ? "Rainforest: 80–88°F (27–31°C), mostly sunny, possible brief afternoon showers."
                  : "Dry season — expect sunshine for your flight home!"}
              </div>
            </div>
            <div style={{ flex: 1, minWidth: "140px" }}>
              <div style={{ fontSize: "11px", color: "#78716c", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "6px", fontWeight: 600 }}>
                📞 Emergency
              </div>
              <div style={{ fontSize: "13px", color: "#d6d3d1", lineHeight: 1.5 }}>
                24/7 Support: {EMERGENCY.support}<br />
                Consultant: {EMERGENCY.consultant}<br />
                Itinerary: #{EMERGENCY.itineraryId}
              </div>
            </div>
          </div>
        </div>

        {/* Hotels Summary */}
        <div style={{
          marginTop: "12px", padding: "20px", borderRadius: "16px",
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
        }}>
          <div style={{ fontSize: "11px", color: "#78716c", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "12px", fontWeight: 600 }}>
            🏨 Accommodations
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{
              padding: "12px", borderRadius: "12px",
              background: activeDay <= 2 ? "rgba(245,158,11,0.1)" : "rgba(255,255,255,0.03)",
              border: activeDay <= 2 ? "1px solid rgba(245,158,11,0.2)" : "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: activeDay <= 2 ? "#fbbf24" : "#a8a29e" }}>
                El Mangroove Villas
              </div>
              <div style={{ fontSize: "12px", color: "#78716c", marginTop: "2px" }}>
                Feb 18–21 · 4-BR Villa · Playa Panamá · Check-in 3PM / Out 12PM
              </div>
            </div>
            <div style={{
              padding: "12px", borderRadius: "12px",
              background: activeDay >= 3 && activeDay <= 6 ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.03)",
              border: activeDay >= 3 && activeDay <= 6 ? "1px solid rgba(16,185,129,0.2)" : "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: activeDay >= 3 && activeDay <= 6 ? "#34d399" : "#a8a29e" }}>
                Rio Celeste Hideaway Boutique Hotel
              </div>
              <div style={{ fontSize: "12px", color: "#78716c", marginTop: "2px" }}>
                Feb 21–25 · 4 Casitas · Tenorio Volcano · Check-in 2PM / Out 12PM · $200/room resort credit
              </div>
            </div>
          </div>
        </div>

        {/* Included Services */}
        <div style={{
          marginTop: "12px", padding: "16px 20px", borderRadius: "16px",
          background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)",
          fontSize: "12px", color: "#6ee7b7", lineHeight: 1.6,
        }}>
          <strong>✅ What's Included:</strong> All taxes, 24/7 in-country support, satisfaction guarantee, private transfers, meet & greet, accommodations, breakfasts, tours (zip line, chocolate, tubing), resort credits, and Peace of Mind Vacation Coverage (100% cash back with 14-day notice).
        </div>
      </div>
    </div>
  );
}
