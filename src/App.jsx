import { useState, useEffect, useRef, useCallback } from "react";

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
      "Have passports ready for immigration — no plants, seeds, or fruits allowed into Costa Rica. LIR is small and efficient — only 20 min from the hotel.",
      "There's a $30/day resort fee charged at check-in (not included in room rate). It covers valet parking, 1 hour of watersport equipment daily, bikes, yoga sessions, and coffee tastings.",
      "Bug spray is NOT provided by the hotel — bring your own. The mangrove setting means mosquitoes, especially at dusk.",
      "If you can't find the greeter at the airport, call 506-4600-9812 (24/7 support line).",
    ],
    recs: [
      { name: "Matiss Restaurant", desc: "Upscale Latin-American fusion right at El Mangroove resort — perfect for a first-night dinner without leaving the property", category: "🍽️ Dining" },
      { name: "Playa Panamá Beach", desc: "Calm, lake-like waters right outside — great for kids to splash and decompress after the flight", category: "🏖️ Beach" },
      { name: "Resort Pool & Cabanas", desc: "Oceanfront infinity pool with service — grab cocktails and watch the sunset on your first evening", category: "🏊 Resort" },
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&fit=crop", caption: "El Mangroove Resort — Your Home Base" },
      { url: "https://images.unsplash.com/photo-1585549071959-94da9dbf8704?w=800&fit=crop", caption: "Oceanfront Pool & Lounge" },
      { url: "https://images.unsplash.com/photo-1718988147041-75ae65dbd63d?w=800&fit=crop", caption: "Playa Panamá — Calm Waters Await" },
      { url: "https://images.unsplash.com/photo-1580787511894-e041123e303f?w=800&fit=crop", caption: "Sunset at Playa Panamá" },
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
      "Bearth Spa offers daily yoga sessions for all levels (included in resort fee), plus an outdoor yoga platform. Spa hours: 8:30 AM–7 PM. Book treatments in advance: bearthspa@enjoyhotels.net or ext. 625.",
      "Your resort fee includes 1 free hour of watersport equipment daily — kayaks, paddleboards. Ask the concierge for LED night paddleboarding (it's incredible).",
      "Breakfast at Makoko gets packed — go early, closer to the 6 AM opening. Four restaurants on-site: Makoko (fine dining), Matiss (poolside), Malu (Mediterranean, 6–9:30 PM), and Izakaya (Japanese).",
      "Consider the all-inclusive add-on if you haven't already — multiple reviewers say dining a la carte adds up fast. Ask at the front desk.",
    ],
    recs: [
      { name: "Snorkeling at Playa Nacascolo", desc: "Hidden gem cove on the peninsula — calm, clear waters perfect for family snorkeling. Spot puffer fish and sea turtles. Free shuttle access through Four Seasons. Pack snorkel gear and lunch!", category: "🤿 Snorkel" },
      { name: "Kayaking Culebra Bay", desc: "Explore hidden coves and mangroves from the water — gear available from hotel concierge. Pack a picnic!", category: "🛶 Adventure" },
      { name: "Ginger Restaurant (Playa Hermosa) 🍸", desc: "#1 rated restaurant in the area. Le Cordon Bleu chef, Asian-fusion tapas. Firecracker shrimp, seared tuna, pork lettuce wraps. Wide selection for all palates — Charlie will like the grilled fish and crispy fries with garlic mayo. 15 min drive. Open 5–10pm. MENU: gingercostarica.com/pdf-menu", category: "🍽️ Dinner" },
      { name: "Hacienda Blu Beach Lounge & Grill", desc: "Beachfront dining with irresistible bruschettas, fresh seafood, juicy beef, and excellent wines. Stunning sunset views. Sushi and live music nights. Family-friendly atmosphere", category: "🍽️ Dinner" },
      { name: "Playas del Coco Town Visit", desc: "The 'real' local beach town — 20 min drive. Lively with bars, restaurants, shops, street food. Try a soda (family-run eatery) for an authentic casado lunch: rice, beans, plantains, salad + meat for ~$6. Locals eat here daily", category: "🏨 Authentic" },
      { name: "Aqua Sport (Playa Hermosa)", desc: "Peruvian-Costa Rican beachside restaurant with hammocks, tables in the sand, Adirondack chairs. 7 types of ceviche, grilled snapper, Peruvian 'Causa' potato dishes. Live music. Perfect casual family dinner", category: "🍽️ Casual" },
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1542299862-97a802f2a7d8?w=800&fit=crop", caption: "Snorkeling the Gulf of Papagayo" },
      { url: "https://images.unsplash.com/photo-1560717844-cd0b22784b00?w=800&fit=crop", caption: "Ginger Restaurant — Treehouse Tapas Bar" },
      { url: "https://images.unsplash.com/photo-1548661651-9adb0e0ccc98?w=800&fit=crop", caption: "Calm Waters of Playa Panamá" },
      { url: "https://images.unsplash.com/photo-1767780931399-9b0aa3afd39c?w=800&fit=crop", caption: "Boat Tour — Gulf of Papagayo" },
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
      { time: "~9:30 AM", item: "Taxi to Playa Nacascolo on the Papagayo Peninsula (~20 min, ~$15). Noah family + anyone else who wants to come!", type: "activity" },
      { time: "10:00 AM", item: "Park entrance at Route 253 roundabout, take the free shuttle to the beach (runs every 15 min through Four Seasons property)", type: "activity" },
      { time: "All Day", item: "Spend the day at Playa Nacascolo — swim, snorkel, wildlife spotting. Pack lunch, snacks & water (no vendors!)", type: "free" },
      { time: "~4:00 PM", item: "Last shuttle back is 5pm — taxi back to El Mangroove", type: "transfer" },
      { time: "Evening", item: "Everyone reunites for last beach night dinner", type: "meal" },
    ],
    tips: [
      "Taxi from El Mangroove to Nacascolo is ~$15 each way — ask the hotel concierge to arrange a trusted local driver. Negotiate the fare before getting in (no meters in Guanacaste). Have the driver's number for pickup.",
      "PACK EVERYTHING: No food vendors or shops at the beach. Bring a cooler with lunch, tons of water, snacks. Towels, sunscreen, hats, water shoes, snorkel gear (or borrow from hotel concierge).",
      "The shuttle from the parking area to the beach is free and runs every 15 min through the Four Seasons grounds. The ride itself has stunning ocean views. Last shuttle back is 5pm — don't miss it!",
      "Bathrooms, outdoor showers, drinking fountains, and picnic tables are at the shuttle drop-off area. No other facilities on the beach itself.",
      "Last full day at the beach — tomorrow you transfer to the rainforest! Make it count.",
    ],
    recs: [
      { name: "Playa Nacascolo (OUR TOP PICK)", desc: "The best family beach in Papagayo. Calm, lake-like water sheltered in Culebra Bay — zero waves, zero rip currents, perfect for kids. Golden sand, capuchin monkeys in the trees, spotted eagle rays in the shallows. Free public access via shuttle through Four Seasons property. Pack a picnic — no vendors. Bring snorkel gear for exploring. ~20 min by taxi from El Mangroove.", category: "🏖️ Beach" },
      { name: "Playa Hermosa (Closest Alternative)", desc: "Only 5–10 min from El Mangroove — the easiest beach day trip. Beautiful gray-sand beach about 1 mile long, nestled between two mountains. Calm, safe water with very gentle waves. More facilities than Nacascolo: small restaurants, shops, Aqua Sport rentals. Great if you want a laid-back beach day without packing a full cooler. Taxi ~$5–8.", category: "🏖️ Beach" },
      { name: "Playa Ocotal (Best Snorkeling)", desc: "Blue Flag-certified dark-sand beach, 20–25 min from El Mangroove. The right side has rocky formations with amazing tropical fish — one of the best shore-accessible snorkeling spots in the area. At low tide, natural tide pools form mini 'kiddie pools.' Father Rooster's restaurant is right on the beach for lunch. Taxi ~$10–15.", category: "🏖️ Beach" },
      { name: "Playa Conchal (Worth the Drive)", desc: "One of Costa Rica's most famous beaches — the sand is 98% crushed white seashells. Gorgeous turquoise water. 45–50 min from El Mangroove. Park in Brasilito village and walk 15–20 min along the beach. Zero facilities on Conchal itself, so bring everything. Best as a half-day trip. Taxi ~$30–40.", category: "🏖️ Beach" },
      { name: "Ginger Restaurant — FRIDAY MARTINI NIGHT 🍸", desc: "Half-price martinis at the #1 restaurant in Playa Hermosa! Le Cordon Bleu chef Anne Hegney's tapas: firecracker shrimp, pork lettuce wraps in mango-tamarind sauce, seared pepper-crusted tuna. Gluten-free labeled. Outdoor treehouse setting. Open 5–10pm. 15 min drive. MENU: gingercostarica.com/pdf-menu", category: "🍽️ Dinner" },
      { name: "Peninsula CR Steak & Seafood Grill", desc: "Premium steaks and fresh seafood with breathtaking bay views in Playa Panamá. Great for Charlie — straightforward grilled meats and fish, nothing too adventurous. Big portions. Right near the hotel.", category: "🍽️ Dinner" },
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1761576881436-310e3b34809c?w=800&fit=crop", caption: "Playa Nacascolo — Calm Culebra Bay" },
      { url: "https://images.unsplash.com/photo-1737398574188-dd79de1fbff9?w=800&fit=crop", caption: "Golden Sand & Crystal Water" },
      { url: "https://images.unsplash.com/flagged/photo-1556982946-787d5a1ec8ac?w=800&fit=crop", caption: "Secluded Beach on the Peninsula" },
      { url: "https://images.unsplash.com/photo-1625321643320-5321f48312b2?w=800&fit=crop", caption: "Ginger — Friday Martini Night" },
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
      "4 casitas booked: 1 Forest View (Queen Beds), 2 Forest View (King), 1 Garden View (Queen). Every room has an outdoor shower — reviewers rave about it.",
      "$200 resort credit PER ROOM for food, drinks & spa — confirm with the hotel exactly what it covers (dining, spa, tours?). Contact: info@riocelestehideaway.com or 954-234-2372.",
      "The Armadillo Trail (700m, ~15 min walk) leads to a natural swimming hole in Rio Celeste — this is the ONLY place you can swim in the blue water (swimming is prohibited inside the national park). Wear closed-toe shoes; trail gets slippery.",
      "The hotel offers a free guided Night Walk daily (weather permitting) to spot nocturnal wildlife on the property trails. Don't miss it!",
      "WiFi is patchy in rooms but solid in common areas. Bring cash — credit cards are not widely accepted in Bijagua town.",
    ],
    recs: [
      { name: "Hotel Nature Trail to the River", desc: "A short trail leads to a private rancho by the Rio Celeste with towels — swim in the famous milky-blue waters right from the hotel", category: "🏞️ Nature" },
      { name: "Luna Azul Pool Bar", desc: "Swim-up bar with fresh tropical cocktails and lighter lunch fare — perfect arrival activity. Use your resort credit!", category: "🍹 Resort" },
      { name: "Cantina Delirio Bar & Lounge", desc: "Relaxing spot for aperitifs or after-dinner drinks at the hotel — great way to end your first jungle evening", category: "🍷 Resort" },
      { name: "Restaurante Tilapiera Los Lagitos 🐟", desc: "MUST-VISIT: Family-run tilapia farm restaurant just 0.8 miles from the national park entrance! They net your fish live from the pond, fry it whole, and serve it fresh 5 minutes later with patacones, yuca, and banana ceviche. Hand-carved wooden tables, beautiful garden, horseback riding available too. Only $10/fish. ONLY OPEN SAT & SUN 11am–8pm — go today or tomorrow! Call +506 8482 8415. Menu: riocelestehorsebackride.com/restaurante-tilapiera", category: "🍽️ LOCAL GEM" },
      { name: "Bijagua Town Walk", desc: "The real Costa Rica: a 5,000-person farming village where cows roam the streets and chickens run free. Main street has a few sodas (family-run eateries), banks, and a pharmacy. Ask locals for 'agua de pipa' (fresh coconut water) from roadside stands", category: "🏨 Authentic" },
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1760067537116-de1f76fe8f95?w=800&fit=crop", caption: "Rio Celeste Hideaway — Your Rainforest Retreat" },
      { url: "https://images.unsplash.com/photo-1657737738312-0f524f5ed190?w=800&fit=crop", caption: "Hideaway Casita in the Jungle" },
      { url: "https://images.unsplash.com/photo-1762379972568-baa79754aca8?w=800&fit=crop", caption: "Bijagua — Mountain Village Life" },
      { url: "https://plus.unsplash.com/premium_photo-1682097702864-b9a9ae179776?w=800&fit=crop", caption: "Hotel Pool Surrounded by Rainforest" },
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
      "Zip line weight limits: min 50 lbs, max 300 lbs. Min height ~5 ft. Min age 6. Harness and all safety equipment provided. Wear closed-toe shoes and clothes you don't mind getting sweaty.",
      "SINAC tickets for Tenorio National Park must be purchased online in advance at serviciosenlinea.sinac.go.cr — they are NOT sold at the gate. Book the 8 AM slot; max 10 tickets per transaction. Have all passport numbers ready (12-minute transaction window).",
      "Park trail to the waterfall is 1.8 km each way (~30 min) with 253 steep steps. The full loop trail is 7 km (3–4 hours). No single-use plastic bottles allowed inside — bring reusable. Only bathroom is at the entrance.",
      "Use your $200 resort credit for spa treatments after the zip line adrenaline — book at the Studio Spa early as it fills up with only 26 casitas on property.",
    ],
    recs: [
      { name: "Tenorio Volcano National Park", desc: "Hike the 3.7-mile trail to the famous Rio Celeste Waterfall (98 ft plunge into bright blue pool), hot springs, and El Teñidero where two rivers merge to create the blue color. $12 adults, $5 kids. Buy tickets on SINAC website in advance!", category: "🦶 Hike" },
      { name: "Heliconias Hanging Bridges", desc: "Walk amongst the treetops on 3 impressive suspension bridges through the rainforest — unique perspective on wildlife, flora and fauna. Great for all ages", category: "🌿 Nature" },
      { name: "Tapir Valley Nature Reserve", desc: "Guided night or day hike on the foothills of Tenorio Volcano — search for Costa Rica's largest mammal, the Tapir, in untamed rainforest", category: "🦫 Wildlife" },
      { name: "Hotel Spa", desc: "After the zip line adrenaline, unwind with a spa treatment — covered by your $200 resort credit", category: "💆 Wellness" },
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1651183993471-ea2391960f6f?w=800&fit=crop", caption: "Zip Lining Over the Canopy" },
      { url: "https://images.unsplash.com/photo-1700474449167-aa7171e64af7?w=800&fit=crop", caption: "Rio Celeste Waterfall — Tenorio National Park" },
      { url: "https://images.unsplash.com/photo-1597693253938-0ba06637f6e5?w=800&fit=crop", caption: "Heliconias Hanging Bridges" },
      { url: "https://images.unsplash.com/photo-1764788799559-824c59d2104a?w=800&fit=crop", caption: "The Famous Blue Waters of Rio Celeste" },
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
      "Tree Chocolate Farm tour is $18/person. You'll walk through organic cacao, coconut, and tropical fruit plantations, learn about medicinal plants, and end with a chocolate tasting. Owner Gerardo often gives tours personally. Duration: 1.5–2 hours + transport.",
      "Must be 7 years or older. Bring hiking boots, sunscreen, bug spray, long pants, camera. The farm is on the slopes of Tenorio Volcano (~25 min from Bijagua).",
      "Call Restaurante Tilapiera (+506 8482-8415) to confirm if they're open today — sources conflict on whether it's daily or weekends only. If open, go for lunch before the chocolate tour. The whole fried tilapia ($13–14) is the reason to visit.",
      "Dinner at Tapirus Paradise is way better value than hotel dining — casados ~$11, wood-fired pizza, ribeye ~$30. Stunning hand-carved wood interior. 5 min drive. Call ahead for a table of 10: WhatsApp +506 8936-1212.",
    ],
    recs: [
      { name: "Maleku Indigenous Village Tour", desc: "Meet the Maleku people (1,000 indigenous residents who speak Maleku Jaica dialect) — learn about their culture, traditions, and way of life. One of the few indigenous communities open to visitors in this region", category: "🏛️ Culture" },
      { name: "Kayaking on Rio Celeste", desc: "Leisurely kayak tour along the enchanting blue waters — deep connection with the river and surrounding rainforest. Arranged through hotel", category: "🛶 Adventure" },
      { name: "Birdwatching in Tenorio Park", desc: "Early morning guided tour promises rare encounters with Costa Rica's diverse birdlife — toucans, quetzals, and hundreds of species in the surrounding wilderness", category: "🦜 Wildlife" },
      { name: "Horseback Riding Trails", desc: "Three different trail rides through the unique terrain surrounding Rio Celeste and Tenorio Volcano — choose your mood from gentle to adventurous", category: "🐴 Adventure" },
      { name: "Tapirus Paradise Restaurant 🪺", desc: "THE dinner spot near Rio Celeste. Stunning interior with hand-carved wood pillars and sculptures. Costa Rican casados, seafood, grilled meats, pizza oven, great cocktails. Views to Arenal Volcano! Very close to Rio Celeste Hideaway — 5 min drive. Much cheaper and better food than the hotel. Even Charlie will love the straightforward grilled options. TripAdvisor: tripadvisor.com (search 'Tapirus Paradise Rio Celeste')", category: "🍽️ Dinner" },
      { name: "Finca Verde Lodge Nature Walk", desc: "Locally-owned lodge offering short guided nature walks — great for spotting frogs, sloths, and birds up close. Educational for the kids, low-intensity", category: "🦥 Wildlife" },
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1615289442666-fed9cec7169a?w=800&fit=crop", caption: "Cacao Plantation Tour" },
      { url: "https://images.unsplash.com/photo-1768557889073-553766722809?w=800&fit=crop", caption: "Rainforest Wildlife — Toucans & More" },
      { url: "https://images.unsplash.com/photo-1664851490956-b45905d6ffba?w=800&fit=crop", caption: "Bijagua Village — Authentic Costa Rica" },
      { url: "https://images.unsplash.com/photo-1766776341444-f8f5c95693cc?w=800&fit=crop", caption: "Swimming in Rio Celeste" },
    ],
  },
  {
    date: "Tue, Feb 24",
    title: "River Tubing",
    location: "Rio Celeste Hideaway",
    icon: "⛵",
    color: "#0284c7",
    scheduled: [
      { time: "Morning", item: "Breakfast at Rio Celeste Hideaway", type: "meal" },
      { time: "TBD", item: "River Tubing Tour (7 people) — Class I & II Rapids", type: "activity" },
    ],
    tips: [
      "Tubing is $50/adult, $40/child through Rio Celeste Aventuras. Class I–II rapids — exciting but safe for beginners and families. Kids as young as 4 can ride in a parent's tube. ~4 km float, ~2 hours. Helmets and life vests provided.",
      "There's a Tarzan Swing along the route (optional fun stop). Wear water shoes, bring a waterproof phone pouch, and lather on sunscreen before getting in — the reflection off the water is brutal.",
      "For adrenaline seekers: Tenorio Adventure Company offers Class III–IV private rafting on the Tenorio River (different from tubing) starting from $195+tax.",
      "Pack the night before! Tomorrow's pickup is 10:15 AM and checkout is supposed to be by noon, but you'll be gone early. Don't forget souvenirs from Bijagua — last chance for authentic Costa Rican coffee and chocolate.",
    ],
    recs: [
      { name: "Restaurante Tilapiera — LAST CHANCE 🐟", desc: "If you haven't gone yet, this is it! The family-run tilapia farm is only open Sat & Sun. They catch your fish live from the pond and fry it whole — $10 with 2 sides. Best meal reviewers had in all of Rio Celeste. Beautiful garden with hand-carved furniture. Also offers horseback riding. 0.8 miles from park entrance. Call +506 8482 8415", category: "🍽️ LOCAL GEM" },
      { name: "Caño Negro Wildlife Refuge", desc: "River-boat tour to a Ramsar-designated wetland of worldwide importance — incredible crocodile sightings, exotic birds, and wildlife", category: "🐊 Wildlife" },
      { name: "White Water Rafting — Tenorio River", desc: "For the adrenaline seekers: 7-mile rafting adventure with twists, turns and drops through challenging rapids, then calm gliding along Corobicí River", category: "🌊 Adventure" },
      { name: "Arenal Hot Springs Day Trip", desc: "About 2 hours away — soak in volcanic hot springs surrounded by rainforest. A therapeutic and calming all-day retreat. Arranged through hotel", category: "♨️ Wellness" },
      { name: "Tapirus Paradise — Last Night Dinner 🪺", desc: "Top-rated restaurant near the hotel. Amazing wood carvings, views to Arenal Volcano, great cocktails. Casados ~$11, seafood, steaks, pizza. Way better value than hotel dining. Good options for everyone including Charlie. 5 min drive.", category: "🍽️ Dinner" },
      { name: "The Hummingbird Restaurant (Bijagua)", desc: "Beautiful garden restaurant where hummingbirds feed right next to your table. Nice outdoor seating, great food and service. Worth the drive into the village for a unique local experience", category: "🍽️ Authentic" },
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1649327838577-caf10c298e8c?w=800&fit=crop", caption: "River Tubing on Rio Celeste" },
      { url: "https://images.unsplash.com/photo-1548164806-9709e698bfc8?w=800&fit=crop", caption: "Turquoise Waters — Your Tubing Route" },
      { url: "https://images.unsplash.com/photo-1770549872541-889645b719bb?w=800&fit=crop", caption: "Tapirus Paradise — Wood-Carved Dining" },
      { url: "https://images.unsplash.com/photo-1767324672978-f26a05319e63?w=800&fit=crop", caption: "Last Night at Rio Celeste Hideaway" },
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
      "Transfer is ~2 hours from Rio Celeste to LIR airport. You should be packed the night before — 10:15 AM pickup means an early start.",
      "LIR airport shops have Costa Rican coffee (Cafe Britt, Doka Estate), chocolate, and souvenirs. Prices are higher than in town but it's your last chance. Credit cards accepted at the airport.",
      "Costa Rica charges a 13% sales tax on everything. The departure tax is included in your JetBlue ticket — you don't need to pay anything extra at the airport.",
      "Vacation Discount applied: $2,660 off your package!",
    ],
    recs: [],
    gallery: [
      { url: "https://images.unsplash.com/photo-1661163091023-b9b4f49e7dad?w=800&fit=crop", caption: "Pura Vida — Until Next Time!" },
      { url: "https://images.unsplash.com/photo-1620550491262-58faf507b6d6?w=800&fit=crop", caption: "Memories of Playa Panamá" },
    ],
  },
];

const EMERGENCY = {
  support: "506-4600-9812",
  consultant: "Rachel Peck (Travel Consultant)",
  itineraryId: "980256",
};

// --- Component ---

export default function CostaRicaTrip() {
  const [activeDay, setActiveDay] = useState(0);
  const [activeTab, setActiveTab] = useState("schedule");
  const [expandedRec, setExpandedRec] = useState(null);
  const [lightbox, setLightbox] = useState(null); // { dayIndex, imgIndex }
  const [stickyVisible, setStickyVisible] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const contentRef = useRef(null);

  const day = DAYS[activeDay];

  const handleDayChange = useCallback((i) => {
    setActiveDay(i);
    setActiveTab("schedule");
    setExpandedRec(null);
    setAnimKey(k => k + 1);
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Sticky mobile header on scroll
  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 280);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (!lightbox) return;
    const gallery = DAYS[lightbox.dayIndex].gallery || [];
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox(prev => ({ ...prev, imgIndex: (prev.imgIndex + 1) % gallery.length }));
      if (e.key === "ArrowLeft") setLightbox(prev => ({ ...prev, imgIndex: (prev.imgIndex - 1 + gallery.length) % gallery.length }));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [lightbox]);

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

  const delayClass = (i) => `animate-slide-up-${Math.min(i + 1, 7)}`;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #064e3b 0%, #022c22 40%, #0c0a09 100%)",
      color: "#fafaf9",
      position: "relative",
    }}>
      {/* Progress Bar */}
      <div className="progress-bar">
        {DAYS.map((d, i) => (
          <div
            key={i}
            onClick={() => handleDayChange(i)}
            style={{
              flex: 1, cursor: "pointer",
              background: i <= activeDay ? d.color : "rgba(255,255,255,0.08)",
              opacity: i === activeDay ? 1 : i < activeDay ? 0.6 : 0.3,
              transition: "all 0.4s ease",
            }}
          />
        ))}
      </div>

      {/* Sticky Mobile Header */}
      <div className={`sticky-mobile-header ${stickyVisible ? "visible" : ""}`} style={{ marginTop: "3px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "20px" }}>{day.icon}</span>
          <div>
            <div style={{ fontSize: "16px", fontWeight: 700, color: day.color }}>{day.title}</div>
            <div style={{ fontSize: "13px", color: "#8a8580" }}>{day.date}</div>
          </div>
        </div>
      </div>

      {/* Decorative ambient glow */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse at 20% 20%, rgba(16,185,129,0.07) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(6,182,212,0.05) 0%, transparent 50%)",
      }} />

      {/* Header */}
      <div className="app-header" style={{
        position: "relative", zIndex: 1, padding: "48px 24px 28px",
        textAlign: "center",
      }}>
        <div style={{
          fontSize: "13px", letterSpacing: "5px", color: "#6ee7b7",
          textTransform: "uppercase", marginBottom: "12px", fontWeight: 600,
        }}>
          Costa Rica &middot; Feb 18&ndash;25, 2026
        </div>
        <h1 style={{
          fontSize: "clamp(32px, 7vw, 52px)", fontWeight: 800, margin: "0 0 8px",
          background: "linear-gradient(135deg, #fafaf9 0%, #a7f3d0 50%, #6ee7b7 100%)",
          backgroundSize: "200% 200%",
          animation: "gradientShift 6s ease infinite",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          lineHeight: 1.1,
        }}>
          Coleman &amp; Noah<br />Family Getaway
        </h1>
        <p style={{ color: "#b5b0ab", fontSize: "17px", margin: "14px 0 0", lineHeight: 1.5 }}>
          7 Nights &middot; 8 Days &middot; 10 Travelers &middot; Pura Vida! 🌴
        </p>

      </div>

      {/* Main Layout: Sidebar + Content */}
      <div className="app-layout" style={{ position: "relative", zIndex: 1 }}>

        {/* Desktop Sidebar */}
        <nav className="desktop-sidebar">
          <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px", color: "#8a8580", fontWeight: 600, marginBottom: "8px", paddingLeft: "12px" }}>
            Trip Days
          </div>
          {DAYS.map((d, i) => (
            <button
              key={i}
              onClick={() => handleDayChange(i)}
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "12px 14px", borderRadius: "14px", cursor: "pointer",
                border: activeDay === i ? `1.5px solid ${d.color}50` : "1.5px solid transparent",
                background: activeDay === i
                  ? `linear-gradient(135deg, ${d.color}18, ${d.color}08)`
                  : "transparent",
                transition: "all 0.3s ease",
                textAlign: "left", width: "100%",
                boxShadow: activeDay === i ? `0 0 20px ${d.color}15` : "none",
              }}
              onMouseOver={e => { if (activeDay !== i) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              onMouseOut={e => { if (activeDay !== i) e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ fontSize: "24px", flexShrink: 0 }}>{d.icon}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{
                  fontSize: "15px", fontWeight: 600,
                  color: activeDay === i ? "#fafaf9" : "#8a8580",
                  letterSpacing: "0.5px",
                }}>
                  {d.date}
                </div>
                <div style={{ fontSize: "16px", fontWeight: activeDay === i ? 700 : 500, color: activeDay === i ? "#fafaf9" : "#d6d3d1" }}>
                  {d.title}
                </div>
              </div>
            </button>
          ))}

          {/* Sidebar Accommodations Summary */}
          <div style={{ marginTop: "16px", padding: "14px", borderRadius: "14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "1.5px", color: "#8a8580", fontWeight: 600, marginBottom: "10px" }}>
              🏨 Stays
            </div>
            <div style={{ fontSize: "14px", color: activeDay <= 2 ? "#fbbf24" : "#8a8580", lineHeight: 1.5, marginBottom: "6px", transition: "color 0.3s" }}>
              El Mangroove Villas<br /><span style={{ fontSize: "13px", color: "#78716c" }}>Feb 18–21</span>
            </div>
            <div style={{ fontSize: "14px", color: activeDay >= 3 && activeDay <= 6 ? "#34d399" : "#8a8580", lineHeight: 1.5, transition: "color 0.3s" }}>
              Rio Celeste Hideaway<br /><span style={{ fontSize: "13px", color: "#78716c" }}>Feb 21–25</span>
            </div>
          </div>
        </nav>

        {/* Mobile Day Selector */}
        <div className="mobile-day-scroller day-scroller" style={{
          gap: "8px", padding: "8px 16px 16px",
          overflowX: "auto",
        }}>
          {DAYS.map((d, i) => (
            <button
              key={i}
              onClick={() => handleDayChange(i)}
              style={{
                flexShrink: 0, padding: "12px 14px", borderRadius: "14px", cursor: "pointer",
                border: activeDay === i ? `2px solid ${d.color}` : "1px solid rgba(255,255,255,0.1)",
                background: activeDay === i
                  ? `linear-gradient(135deg, ${d.color}22, ${d.color}11)`
                  : "rgba(255,255,255,0.04)",
                transition: "all 0.3s ease", minWidth: "90px", textAlign: "center",
                boxShadow: activeDay === i ? `0 0 16px ${d.color}20` : "none",
              }}
            >
              <div style={{ fontSize: "22px", marginBottom: "4px" }}>{d.icon}</div>
              <div style={{
                fontSize: "13px", fontWeight: 700, color: activeDay === i ? d.color : "#b5b0ab",
                letterSpacing: "0.5px",
              }}>
                {d.date.split(",")[0]}
              </div>
              <div style={{ fontSize: "12px", color: activeDay === i ? "#d6d3d1" : "#78716c", marginTop: "2px" }}>
                {d.date.split(", ")[1]}
              </div>
            </button>
          ))}
        </div>

        {/* Day Content */}
        <div ref={contentRef} className="content-area" style={{ padding: "0 16px 100px" }}>
          <div key={animKey} className="animate-fade-in">

            {/* Day Header */}
            <div className="card-hover" style={{
              padding: "28px 24px", borderRadius: "20px", marginBottom: "16px",
              background: `linear-gradient(135deg, ${day.color}15, ${day.color}06)`,
              border: `1px solid ${day.color}25`,
              backdropFilter: "blur(10px)",
              boxShadow: `0 4px 24px ${day.color}10`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{ fontSize: "42px" }}>{day.icon}</span>
                <div>
                  <h2 style={{ margin: 0, fontSize: "clamp(24px, 5vw, 32px)", fontWeight: 700 }}>{day.title}</h2>
                  <div style={{ fontSize: "16px", color: "#b5b0ab", marginTop: "4px" }}>
                    {day.date} &middot; {day.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
              {[
                { id: "schedule", label: "📋 Schedule", count: day.scheduled.length },
                { id: "recs", label: "⭐ Recs", count: day.recs.length },
                { id: "gallery", label: "📸 Gallery", count: (day.gallery || []).length },
                { id: "tips", label: "💡 Tips", count: day.tips.length },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setExpandedRec(null); }}
                  style={{
                    flex: 1, padding: "12px 6px", borderRadius: "12px", cursor: "pointer",
                    border: "none", fontSize: "14px", fontWeight: 600, transition: "all 0.25s",
                    background: activeTab === tab.id ? `${day.color}20` : "rgba(255,255,255,0.04)",
                    color: activeTab === tab.id ? day.color : "#8a8580",
                    boxShadow: activeTab === tab.id ? `0 2px 12px ${day.color}15` : "none",
                  }}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span style={{
                      marginLeft: "5px", fontSize: "12px", padding: "2px 7px", borderRadius: "8px",
                      background: activeTab === tab.id ? `${day.color}25` : "rgba(255,255,255,0.08)",
                    }}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Schedule Tab */}
            {activeTab === "schedule" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {day.scheduled.map((s, i) => (
                  <div key={i} className={`card-hover ${delayClass(i)}`} style={{
                    display: "flex", gap: "14px", padding: "16px 18px",
                    borderRadius: "16px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    alignItems: "flex-start",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}>
                    <div style={{
                      fontSize: "22px", width: "40px", height: "40px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      borderRadius: "12px", background: `${day.color}12`, flexShrink: 0,
                    }}>
                      {typeIcon(s.type)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "14px", color: day.color, fontWeight: 700, marginBottom: "3px" }}>
                        {s.time}
                      </div>
                      <div style={{ fontSize: "16px", color: "#e7e5e4", lineHeight: 1.6 }}>
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
                  <div className="animate-fade-in" style={{
                    padding: "48px 24px", textAlign: "center", color: "#8a8580",
                    borderRadius: "16px", background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}>
                    <div style={{ fontSize: "40px", marginBottom: "12px" }}>✈️</div>
                    <div style={{ fontSize: "17px", lineHeight: 1.5 }}>Safe travels home!<br />No local recs for departure day.</div>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {day.recs.map((r, i) => (
                      <div
                        key={i}
                        className={`card-hover ${delayClass(i)}`}
                        onClick={() => setExpandedRec(expandedRec === i ? null : i)}
                        style={{
                          padding: "18px 20px", borderRadius: "16px", cursor: "pointer",
                          background: expandedRec === i ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
                          border: expandedRec === i ? `1px solid ${day.color}35` : "1px solid rgba(255,255,255,0.07)",
                          transition: "all 0.25s",
                          boxShadow: expandedRec === i ? `0 4px 16px ${day.color}10` : "0 2px 8px rgba(0,0,0,0.1)",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <div style={{ flex: 1 }}>
                            <div style={{
                              fontSize: "12px", color: day.color, fontWeight: 700,
                              textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "5px",
                            }}>
                              {r.category}
                            </div>
                            <div style={{ fontSize: "17px", fontWeight: 600, color: "#fafaf9", lineHeight: 1.3 }}>
                              {r.name}
                            </div>
                          </div>
                          <span style={{
                            color: "#8a8580", fontSize: "20px", transition: "transform 0.3s ease",
                            transform: expandedRec === i ? "rotate(180deg)" : "rotate(0deg)",
                            flexShrink: 0, marginLeft: "12px", marginTop: "4px",
                          }}>
                            ▾
                          </span>
                        </div>
                        <div style={{
                          maxHeight: expandedRec === i ? "300px" : "0",
                          overflow: "hidden",
                          transition: "max-height 0.35s ease, opacity 0.3s ease",
                          opacity: expandedRec === i ? 1 : 0,
                        }}>
                          <div style={{
                            marginTop: "12px", paddingTop: "12px",
                            borderTop: "1px solid rgba(255,255,255,0.07)",
                            fontSize: "16px", color: "#b5b0ab", lineHeight: 1.7,
                          }}>
                            {r.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tips Tab */}
            {activeTab === "tips" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {day.tips.map((tip, i) => (
                  <div key={i} className={`card-hover ${delayClass(i)}`} style={{
                    display: "flex", gap: "14px", padding: "16px 18px",
                    borderRadius: "16px",
                    background: "rgba(250,204,21,0.04)",
                    border: "1px solid rgba(250,204,21,0.10)",
                    alignItems: "flex-start",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  }}>
                    <span style={{ fontSize: "20px", flexShrink: 0, marginTop: "1px" }}>💡</span>
                    <div style={{ fontSize: "16px", color: "#d6d3d1", lineHeight: 1.6 }}>
                      {tip}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Gallery Tab */}
            {activeTab === "gallery" && (
              <div className="gallery-grid" style={{ display: "grid", gap: "12px" }}>
                {(day.gallery || []).map((img, i) => (
                  <div
                    key={i}
                    className={`card-hover ${delayClass(i)}`}
                    onClick={() => setLightbox({ dayIndex: activeDay, imgIndex: i })}
                    style={{
                      borderRadius: "16px", overflow: "hidden",
                      border: "1px solid rgba(255,255,255,0.08)",
                      background: "rgba(255,255,255,0.04)",
                      cursor: "pointer",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                    }}
                  >
                    <div style={{
                      width: "100%", height: "180px",
                      overflow: "hidden",
                      background: `linear-gradient(135deg, ${day.color}12, ${day.color}06)`,
                      position: "relative",
                    }}>
                      <img
                        src={img.url}
                        alt={img.caption}
                        loading="lazy"
                        style={{
                          width: "100%", height: "100%", objectFit: "cover",
                          display: "block", transition: "transform 0.4s ease",
                        }}
                        onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:${day.color};font-size:40px;">${day.icon}</div>`;
                        }}
                      />
                    </div>
                    <div style={{
                      padding: "12px 14px", fontSize: "14px",
                      color: "#b5b0ab", fontWeight: 500, lineHeight: 1.4,
                    }}>
                      {img.caption}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Divider */}
            <div style={{
              height: "1px", margin: "28px 0",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
            }} />

            {/* Weather & Emergency Footer */}
            <div style={{
              padding: "24px", borderRadius: "18px",
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
            }}>
              <div className="footer-grid" style={{ display: "grid", gap: "20px" }}>
                <div>
                  <div style={{ fontSize: "13px", color: "#8a8580", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "8px", fontWeight: 600 }}>
                    ☀️ Weather
                  </div>
                  <div style={{ fontSize: "16px", color: "#d6d3d1", lineHeight: 1.6 }}>
                    {activeDay <= 2
                      ? "Beach: 86–94°F (30–35°C), sunny, dry. Calm waters. Possible Papagayo winds."
                      : activeDay <= 6
                      ? "Rainforest: 80–88°F (27–31°C), mostly sunny, possible brief afternoon showers."
                      : "Dry season — expect sunshine for your flight home!"}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "13px", color: "#8a8580", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "8px", fontWeight: 600 }}>
                    📞 Emergency
                  </div>
                  <div style={{ fontSize: "16px", color: "#d6d3d1", lineHeight: 1.6 }}>
                    24/7 Support: {EMERGENCY.support}<br />
                    Consultant: {EMERGENCY.consultant}<br />
                    Itinerary: #{EMERGENCY.itineraryId}
                  </div>
                </div>
              </div>
            </div>

            {/* Hotels Summary (mobile only — desktop has sidebar) */}
            <div className="mobile-day-scroller" style={{
              display: "block", marginTop: "12px",
            }}>
              <div style={{
                padding: "24px", borderRadius: "18px",
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
              }}>
                <div style={{ fontSize: "13px", color: "#8a8580", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "14px", fontWeight: 600 }}>
                  🏨 Accommodations
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{
                    padding: "14px 16px", borderRadius: "14px",
                    background: activeDay <= 2 ? "rgba(245,158,11,0.08)" : "rgba(255,255,255,0.03)",
                    border: activeDay <= 2 ? "1px solid rgba(245,158,11,0.18)" : "1px solid rgba(255,255,255,0.06)",
                    transition: "all 0.3s",
                  }}>
                    <div style={{ fontSize: "16px", fontWeight: 600, color: activeDay <= 2 ? "#fbbf24" : "#b5b0ab" }}>
                      El Mangroove Villas
                    </div>
                    <div style={{ fontSize: "15px", color: "#8a8580", marginTop: "3px", lineHeight: 1.5 }}>
                      Feb 18–21 &middot; 4-BR Villa &middot; Playa Panamá &middot; Check-in 3PM / Out 12PM
                    </div>
                  </div>
                  <div style={{
                    padding: "14px 16px", borderRadius: "14px",
                    background: activeDay >= 3 && activeDay <= 6 ? "rgba(16,185,129,0.08)" : "rgba(255,255,255,0.03)",
                    border: activeDay >= 3 && activeDay <= 6 ? "1px solid rgba(16,185,129,0.18)" : "1px solid rgba(255,255,255,0.06)",
                    transition: "all 0.3s",
                  }}>
                    <div style={{ fontSize: "16px", fontWeight: 600, color: activeDay >= 3 && activeDay <= 6 ? "#34d399" : "#b5b0ab" }}>
                      Rio Celeste Hideaway Boutique Hotel
                    </div>
                    <div style={{ fontSize: "15px", color: "#8a8580", marginTop: "3px", lineHeight: 1.5 }}>
                      Feb 21–25 &middot; 4 Casitas &middot; Tenorio Volcano &middot; Check-in 2PM / Out 12PM &middot; $200/room resort credit
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Included Services */}
            <div style={{
              marginTop: "12px", padding: "18px 22px", borderRadius: "16px",
              background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.12)",
              fontSize: "15px", color: "#6ee7b7", lineHeight: 1.7,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            }}>
              <strong>✅ What's Included:</strong> All taxes, 24/7 in-country support, satisfaction guarantee, private transfers, meet &amp; greet, accommodations, breakfasts, tours (zip line, chocolate, tubing), resort credits, and Peace of Mind Vacation Coverage (100% cash back with 14-day notice).
            </div>

          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (() => {
        const lbGallery = DAYS[lightbox.dayIndex].gallery || [];
        const lbImg = lbGallery[lightbox.imgIndex];
        if (!lbImg) return null;
        return (
          <div className="lightbox-backdrop" onClick={() => setLightbox(null)}>
            <div className="lightbox-content" onClick={e => e.stopPropagation()}>
              <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
              {lbGallery.length > 1 && (
                <>
                  <button
                    className="lightbox-nav lightbox-prev"
                    onClick={() => setLightbox(prev => ({ ...prev, imgIndex: (prev.imgIndex - 1 + lbGallery.length) % lbGallery.length }))}
                  >
                    ‹
                  </button>
                  <button
                    className="lightbox-nav lightbox-next"
                    onClick={() => setLightbox(prev => ({ ...prev, imgIndex: (prev.imgIndex + 1) % lbGallery.length }))}
                  >
                    ›
                  </button>
                </>
              )}
              <img src={lbImg.url.replace("w=800", "w=1400")} alt={lbImg.caption} />
              <div className="lightbox-caption">
                {lbImg.caption}
                <div style={{ fontSize: "12px", color: "#8a8580", marginTop: "4px" }}>
                  {lightbox.imgIndex + 1} / {lbGallery.length}
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
