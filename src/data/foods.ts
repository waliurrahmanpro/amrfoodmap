import { Food } from '@/types';

export const FOODS: Food[] = [
  // Dhaka
  {
    id: 'dhaka-bakarkhani',
    districtId: 'dhaka',
    name: 'Dhakaiya Bakarkhani',
    bnName: 'ঢাকাই বাকরখানি',
    englishTitle: 'Crisp Layered Tandoor Bread',
    description: 'A crisp, flaky Mughlai unleavened bread baked in traditional coal tandoors, layered with ghee and sprinkled with sesame seeds. Cherished with morning milk tea or beef curry.',
    category: 'bakery',
    verificationStatus: 'heritage-verified',
    source: 'Dhaka Heritage Culinary Archive & Historical Accounts (Agha Baker Era)',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    tags: ['Traditional', 'Breakfast', 'Mughlai', 'Old Dhaka']
  },
  {
    id: 'dhaka-kacchi-biryani',
    districtId: 'dhaka',
    name: 'Puron Dhakar Kacchi Biryani',
    bnName: 'পুরান ঢাকার কাচ্চি বিরিয়ানি',
    englishTitle: 'Old Dhaka Dum Mutton Biryani',
    description: 'Raw marinated tender mutton pieces layered directly with fragrant Chinigura rice, saffron-infused milk, dried prunes (alubokhara), and spiced golden potatoes, sealed and slow-cooked over burning wood coals.',
    category: 'rice',
    verificationStatus: 'heritage-verified',
    source: 'National Culinary Heritage Registry & Old Dhaka Guild of Khansamas',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80',
    tags: ['Dum Cooking', 'Mutton', 'Feast', 'Iconic']
  },

  // Gazipur
  {
    id: 'gazipur-jackfruit',
    districtId: 'gazipur',
    name: 'Bhawal-er Kathal',
    bnName: 'ভাওয়ালের মিষ্টি কাঁঠাল',
    englishTitle: 'Sweet Forest Honey Jackfruit',
    description: 'The prized golden-fleshed jackfruit grown across the red soil of the Bhawal forest tracts, famed for natural sweetness and crisp pods.',
    category: 'fruit',
    verificationStatus: 'locally-verified',
    source: 'Bangladesh Agricultural Research Institute (BARI) Horticulture Survey',
sourceUrl: 'http://www.bari.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=600&auto=format&fit=crop&q=80',
    tags: ['National Fruit', 'Seasonal', 'Bhawal Estate']
  },

  // Narayanganj
  {
    id: 'narayanganj-panam-pitha',
    districtId: 'narayanganj',
    name: 'Sonargaon-er Pitha & Shondesh',
    bnName: 'সোনারগাঁয়ের ঐতিহ্যবাহী পিঠা ও সন্দেশ',
    englishTitle: 'Heritage Rice Cakes of Sonargaon',
    description: 'Traditional winter pitha and pure chhana confections rooted in the medieval trade capital of Sonargaon along the Meghna river.',
    category: 'snack',
    verificationStatus: 'locally-verified',
    source: 'Sonargaon Folk Art and Craft Foundation Heritage Records',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    tags: ['Folk Heritage', 'Winter Specialty']
  },

  // Narsingdi
  {
    id: 'narsingdi-sagar-kola',
    districtId: 'narsingdi',
    name: 'Narsingdir Sagar Kola',
    bnName: 'নরসিংদীর সাগর কলা',
    englishTitle: 'Heritage Cavendish Dessert Banana',
    description: 'Plump, highly aromatic, and naturally sweet Sagar bananas cultivated extensively along the fertile riverbanks of Narsingdi.',
    category: 'fruit',
    verificationStatus: 'locally-verified',
    source: 'Department of Agricultural Extension (DAE) Bangladesh',
sourceUrl: 'http://dae.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80',
    tags: ['Fruit', 'Riverside Agriculture']
  },

  // Tangail
  {
    id: 'tangail-porabari-chomchom',
    districtId: 'tangail',
    name: 'Porabarir Chomchom',
    bnName: 'পোড়াবাড়ির চমচম',
    englishTitle: 'King of Sweets - Caramelized Porabari Sweet',
    description: 'GI-certified Bengali sweet pioneered in the early 19th century by Joshoroth Gope in Porabari. Featuring a dark brownish caramelized outer shell, tender juicy porous cottage cheese center, and thick grated mawa topping.',
    category: 'sweet',
    verificationStatus: 'gi-certified',
    source: 'Geographical Indication (GI) Certificate Registry of Bangladesh',
sourceUrl: 'https://dpdt.portal.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    tags: ['GI Certified', 'Porabari', 'Heritage Sweet']
  },

  // Kishoreganj
  {
    id: 'kishoreganj-haor-fish',
    districtId: 'kishoreganj',
    name: 'Nikli Haor-er Boal o Baim',
    bnName: 'নিকলী হাওরের বোয়াল ও বাইম মাছ',
    englishTitle: 'Freshwater Haor Fish Curry',
    description: 'Wild freshwater predatory fish caught from the vast wetlands of Nikli Haor, traditionally cooked with mustard paste, green chilies, and pure mustard oil.',
    category: 'fish',
    verificationStatus: 'locally-verified',
    source: 'Department of Fisheries Wetland Documentation',
sourceUrl: 'http://fisheries.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80',
    tags: ['Freshwater', 'Haor', 'Traditional']
  },

  // Manikganj
  {
    id: 'manikganj-hajari-gur',
    districtId: 'manikganj',
    name: 'Hajari Gur',
    bnName: 'হাজারী গুড়',
    englishTitle: 'Heritage Date Palm Jaggery of Jhitka',
    description: 'Precious crystalline date palm jaggery boiled from pure early-dawn tree sap in Jhitka. Famed for its pale creamy color, delicate aroma, and smooth melt-in-mouth texture.',
    category: 'sweet',
    verificationStatus: 'heritage-verified',
    source: 'Manikganj District Administration & National Folk Archives',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&auto=format&fit=crop&q=80',
    tags: ['Winter Jaggery', 'Artisanal', 'Jhitka']
  },

  // Munshiganj
  {
    id: 'munshiganj-bhagyakul-sweets',
    districtId: 'munshiganj',
    name: 'Bhagyakul-er Mawa Mishti',
    bnName: 'ভাগ্যকুলের খাঁটি মাওয়া মিষ্টি',
    englishTitle: 'Artisanal Dairy Mawa Sweets of Bikrampur',
    description: 'Centuries-old dairy confectionery originating in the river port estate of Bhagyakul, using slow-simmered whole buffalo and cow milk reduced into rich fragrant mawa.',
    category: 'sweet',
    verificationStatus: 'heritage-verified',
    source: 'Bikrampur Historical Society Records',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80',
    tags: ['Bikrampur', 'Mawa', 'Dairy Heritage']
  },

  // Faridpur
  {
    id: 'faridpur-baghat-malpua',
    districtId: 'faridpur',
    name: 'Baghat-er Malpua',
    bnName: 'বাঘাটের ঐতিহ্যবাহী মালপোয়া',
    englishTitle: 'Golden Syrup-Soaked Fried Pancakes',
    description: 'A legendary sweet delicacy from Baghat in Modhukhali, prepared with semolina, thickened milk, and fennel seeds, fried to golden amber and dipped in cardamom syrup.',
    category: 'sweet',
    verificationStatus: 'locally-verified',
    source: 'Faridpur Cultural Heritage Directory',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    tags: ['Modhukhali', 'Pancake', 'Traditional']
  },

  // Gopalganj
  {
    id: 'gopalganj-orakandi-jilapi',
    districtId: 'gopalganj',
    name: 'Orakandir Roshalo Jilapi',
    bnName: 'ওড়াকান্দির রসালো জিলাপি',
    englishTitle: 'Crisp Fermented Batter Jilapi',
    description: 'Crunchy spiral treats crafted during traditional fairs and festivals at Orakandi, fried in boiling ghee and submerged in pure cardamom sugar syrup.',
    category: 'sweet',
    verificationStatus: 'locally-verified',
    source: 'Gopalganj District Cultural Heritage Archive',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80',
    tags: ['Crispy', 'Festival Food', 'Ghee Fried']
  },

  // Madaripur
  {
    id: 'madaripur-roshogolla',
    districtId: 'madaripur',
    name: 'Madaripurer Roshogolla',
    bnName: 'মাদারীপুরের রসগোল্লা',
    englishTitle: 'Spongy Cottage Cheese Balls in Light Syrup',
    description: 'Tender fresh chhana dumplings gently boiled in clarified light sugar syrup, celebrated across the riverside markets of the Arial Khan river.',
    category: 'sweet',
    verificationStatus: 'locally-verified',
    source: 'Madaripur Chamber of Commerce Local Specialty Records',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80',
    tags: ['Chhana', 'Spongy', 'Traditional']
  },

  // Rajbari
  {
    id: 'rajbari-chomchom',
    districtId: 'rajbari',
    name: 'Rajbarir Chomchom',
    bnName: 'রাজবাড়ীর ঐতিহ্যবাহী চমচম',
    englishTitle: 'Carmelized Chhana Confection',
    description: 'Rich oval milk sweet slowly cooked in copper cauldrons with pure dairy milk and sugar syrup until richly browned, garnished with mawa shavings.',
    category: 'sweet',
    verificationStatus: 'locally-verified',
    source: 'Rajbari District Administration Heritage Documentation',
sourceUrl: 'http://www.bari.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    tags: ['Heritage Sweet', 'Mawa']
  },

  // Shariatpur
  {
    id: 'shariatpur-bibikhana-pitha',
    districtId: 'shariatpur',
    name: 'Shariatpurer Bibikhana Pitha',
    bnName: 'শরীয়তপুরের বিবিখানা পিঠা',
    englishTitle: 'Royal Steamed Coconut Date-Cake',
    description: 'An aristocratic winter steamed cake made with freshly ground rice flour, date molasses (khejur gur), thick coconut milk, and cardamoms.',
    category: 'snack',
    verificationStatus: 'locally-verified',
    source: 'Bangladesh Folk Heritage Pitha Registry',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    tags: ['Pitha', 'Winter', 'Date Molasses']
  },

  // Chattogram
  {
    id: 'chattogram-mezban-beef',
    districtId: 'chattogram',
    name: 'Mezbani Gosht',
    bnName: 'মেজবানি মাংস',
    englishTitle: 'Traditional Festive Spiced Beef Feast',
    description: 'A celebrated culinary centerpiece of community feasts (Mezban) in Chittagong. Prepared with mustard oil, freshly pounded red chilies, fenugreek, and a secret blend of fragrant spices cooked in giant copper Degchis.',
    category: 'curry',
    verificationStatus: 'heritage-verified',
    source: 'Chittagong Heritage Association & Intangible Cultural Heritage Records',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1545247181-516773ca83e3?w=600&auto=format&fit=crop&q=80',
    tags: ['Mezban', 'Spicy', 'Beef', 'Heritage Feast']
  },
  {
    id: 'chattogram-kala-bhuna',
    districtId: 'chattogram',
    name: 'Chattogramer Kala Bhuna',
    bnName: 'চট্টগ্রামের ঐতিহ্যবাহী কালা ভুনা',
    englishTitle: 'Slow Caramelized Dark Spiced Beef',
    description: 'Legendary dark mahogany dry-roasted beef prepared through days of patient slow frying in pure mustard oil, star anise, cubeb pepper, and caramelized onions without ever scorching the meat.',
    category: 'curry',
    verificationStatus: 'heritage-verified',
    source: 'Chittagong Chamber of Commerce Heritage Documentation',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&auto=format&fit=crop&q=80',
    tags: ['Kala Bhuna', 'Mustard Oil', 'Signature Dish']
  },

  // Cox's Bazar
  {
    id: 'coxsbazar-rupchanda-fry',
    districtId: 'coxsbazar',
    name: 'Rupchanda Fish Fry & Loitta Shutki',
    bnName: 'রূপচাঁদা ফ্রাই ও লইট্টা শুঁটকি ভর্তা',
    englishTitle: 'Silver Pomfret Fry & Spicy Dried Fish Mash',
    description: 'Fresh Bay of Bengal silver pomfret scored and marinated with crushed turmeric, chili, and garlic pan-fried crisp; served alongside fiery sun-dried Bombay duck (Loitta) mash with roasted red chilies and mustard oil.',
    category: 'fish',
    verificationStatus: 'heritage-verified',
    source: 'Coxs Bazar Coastal Tourism & Culinary Registry',
sourceUrl: 'https://tourismboard.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80',
    tags: ['Coastal', 'Seafood', 'Shutki', 'Spicy']
  },

  // Cumilla
  {
    id: 'cumilla-rasmalai',
    districtId: 'cumilla',
    name: 'Cumillar Rasmalai',
    bnName: 'কুমিল্লার রসমালাই',
    englishTitle: 'GI-Certified Creamy Malai Cottage Cheese Dumplings',
    description: 'GI-certified authentic delicacy created in 1930 by brothers Khanindra Sen and Manindra Sen (Matri Bhandar). Tiny, delicate oval chhana balls soaked in slow-reduced, velvety cardamom milk clotted cream.',
    category: 'sweet',
    verificationStatus: 'gi-certified',
    source: 'Geographical Indication (GI) Registry Certificate No. 5 (Bangladesh)',
sourceUrl: 'https://dpdt.portal.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    tags: ['GI Certified', 'Matri Bhandar', 'Iconic Sweet']
  },

  // Brahmanbaria
  {
    id: 'brahmanbaria-chhanar-mukhi',
    districtId: 'brahmanbaria',
    name: 'Chhanar Mukhi',
    bnName: 'ছানারমুখী',
    englishTitle: 'GI-Certified Crispy Sugar-Crusted Chhana Cubes',
    description: 'GI-certified sweet invented in the British period by Kashi Shiv. Solid square cubes of pure cottage cheese deep-boiled in dense sugar syrup until an exquisite crisp, translucent crystallized sugar crust forms over the soft cheese.',
    category: 'sweet',
    verificationStatus: 'gi-certified',
    source: 'Geographical Indication (GI) Registry of Bangladesh',
sourceUrl: 'https://dpdt.portal.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80',
    tags: ['GI Certified', 'Sugar Crusted', 'Pure Chhana']
  },

  // Chandpur
  {
    id: 'chandpur-padma-ilish',
    districtId: 'chandpur',
    name: 'Chandpurer Padma Ilish',
    bnName: 'চাঁদপুরের পদ্মার ইলিশ',
    englishTitle: 'Silver King - Fresh Estuarine Hilsa',
    description: 'Fresh Padma-Meghna confluence Hilsa (Tenualosa ilisha), prized worldwide for unparalleled natural fat content, cooked simply with freshly ground mustard seeds (Shorshe Ilish) or steamed with green chilies.',
    category: 'fish',
    verificationStatus: 'gi-certified',
    source: 'Geographical Indication Registry (National Fish of Bangladesh)',
sourceUrl: 'https://dpdt.portal.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80',
    tags: ['GI Certified', 'National Fish', 'Hilsa', 'River Confluence']
  },

  // Feni
  {
    id: 'feni-khandal-mishti',
    districtId: 'feni',
    name: 'Khandaler Mishti',
    bnName: 'ফেনীর খণ্ডলের মিষ্টি',
    englishTitle: 'Heritage Syrupy Sweet of Khandal',
    description: 'Traditional round cottage cheese sweets cooked with pure local cow milk in Khandal, celebrated for their moist texture and balanced sweetness.',
    category: 'sweet',
    verificationStatus: 'locally-verified',
    source: 'Feni District Cultural Documentation',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    tags: ['Heritage Sweet', 'Feni']
  },

  // Lakshmipur
  {
    id: 'lakshmipur-buffalo-curd',
    districtId: 'lakshmipur',
    name: 'Mohish-er Doodh-er Dahi',
    bnName: 'মহিষের দুধের দই',
    englishTitle: 'Coastal Buffalo Milk Curd',
    description: 'Thick, creamy curd made from unpasteurized milk of free-grazing river delta buffaloes, set naturally in porous unglazed clay bowls.',
    category: 'sweet',
    verificationStatus: 'locally-verified',
    source: 'Lakshmipur Agricultural Extension Records',
sourceUrl: 'http://dae.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80',
    tags: ['Buffalo Milk', 'Clay Pot', 'Coastal']
  },

  // Noakhali
  {
    id: 'noakhali-kholajali-pitha',
    districtId: 'noakhali',
    name: 'Kholajali Pitha',
    bnName: 'নোয়াখালীর খোলাজালি পিঠা',
    englishTitle: 'Lacy Earthenware Crepe',
    description: 'Delicate, web-like crepe prepared by pouring a thin batter of rice flour and eggs into a heated earthen pot (Khola), swirling swiftly without any oil. Served with spicy beef curry or duck bhuna.',
    category: 'snack',
    verificationStatus: 'heritage-verified',
    source: 'National Folk and Culinary Traditions of Noakhali',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    tags: ['Folk Crepe', 'Earthenware', 'Traditional']
  },

  // Bandarban
  {
    id: 'bandarban-bamboo-chicken',
    districtId: 'bandarban',
    name: 'Hill Tracts Bamboo Chicken & Mundi',
    bnName: 'বাঁশ মুরগি ও পাহাড়ি মুন্ডি নুডলস',
    englishTitle: 'Bamboo-Roasted Chicken & Indigenous Rice Noodles',
    description: 'Country chicken marinated with wild hill spices, ginger, and wild lime, stuffed inside hollow green bamboo culms and roasted over glowing wood coals. Served with hot sour-spicy Mundi rice noodles.',
    category: 'curry',
    verificationStatus: 'heritage-verified',
    source: 'Chittagong Hill Tracts Cultural Institute Heritage Registry',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1545247181-516773ca83e3?w=600&auto=format&fit=crop&q=80',
    tags: ['Indigenous', 'Hill Cuisine', 'Bamboo Cooked']
  },

  // Khagrachhari
  {
    id: 'khagrachhari-bamboo-shoots',
    districtId: 'khagrachhari',
    name: 'Bashkorol Bhaaji & Forest Curries',
    bnName: 'বাঁশকোড়ল ভাজি ও পাহাড়ি সুস্বাদু খাবার',
    englishTitle: 'Tender Bamboo Shoot Stir-Fry',
    description: 'Fresh seasonal tender bamboo shoots harvested from hillside bamboo groves, sliced thinly and sautéed with green chilies, wild turmeric, and hill herbs.',
    category: 'curry',
    verificationStatus: 'locally-verified',
    source: 'Chittagong Hill Tracts Ethnobotanical & Culinary Archive',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    tags: ['Hill Herbs', 'Bamboo Shoot', 'Tribal Cuisine']
  },

  // Rangamati
  {
    id: 'rangamati-lake-fish',
    districtId: 'rangamati',
    name: 'Kaptai Lake Fish Kebang',
    bnName: 'কাপ্তai হ্রদের কেবাং ও ফিশ ফ্রাই',
    englishTitle: 'Banana Leaf Wrapped Spiced Fish Kebang',
    description: 'Freshly harvested Chapila and Keski fish from turquoise Kaptai Lake, seasoned with wild mountain pepper, crushed shallots, and wrapped in banana leaves before charcoal roasting.',
    category: 'fish',
    verificationStatus: 'locally-verified',
    source: 'Rangamati Cultural Academy Documentation',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80',
    tags: ['Kaptai Lake', 'Banana Leaf', 'Smoked Fish']
  },

  // Rajshahi
  {
    id: 'rajshahi-kalai-roti',
    districtId: 'rajshahi',
    name: 'Kalai Roti with Duck Bhuna & Begun Bhorta',
    bnName: 'কলাই রুটি, হাঁসের মাংস ও বেগুন ভর্তা',
    englishTitle: 'Black Gram Flatbread with Spicy Duck Curry',
    description: 'Artisanal thick flatbread kneaded from black gram (Mashkalai) flour and rice flour, patted entirely by hand and baked on fiery earthenware stoves. Accompanied by scorching chili-eggplant mash and slow-cooked winter duck curry.',
    category: 'snack',
    verificationStatus: 'heritage-verified',
    source: 'Rajshahi Cultural Academy & Folk Culinary Registry',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=80',
    tags: ['Hand Patted', 'Black Gram', 'Duck Curry', 'Varendra']
  },
  {
    id: 'rajshahi-himsagar-mango',
    districtId: 'rajshahi',
    name: 'Rajshahir Himsagar Mango',
    bnName: 'রাজশাহীর হিমসাগর আম',
    englishTitle: 'GI-Certified Himsagar Mango',
    description: 'World-renowned GI-tagged dessert mango known for thin skin, complete absence of fibre, bright golden pulp, and rich intoxicating floral sweetness.',
    category: 'fruit',
    verificationStatus: 'gi-certified',
    source: 'Geographical Indication (GI) Registry of Bangladesh',
sourceUrl: 'https://dpdt.portal.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80',
    tags: ['GI Certified', 'Mango Capital', 'Fibreless']
  },

  // Bogura
  {
    id: 'bogura-doi',
    districtId: 'bogura',
    name: 'Bogurar Doi',
    bnName: 'বগুড়ার দই',
    englishTitle: 'GI-Certified Sweet Fermented Curd in Clay Saraf',
    description: 'The crowning glory of Bangladeshi dairy confections, pioneered in Sherpur (Bogura) by Goura Gopal Ghosh in the 1930s. Pure full-cream cow milk boiled for hours until caramel-hued, fermented with heirloom culture in porous terracotta pots that absorb excess whey.',
    category: 'sweet',
    verificationStatus: 'gi-certified',
    source: 'Geographical Indication (GI) Certificate Registry of Bangladesh',
sourceUrl: 'https://dpdt.portal.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80',
    tags: ['GI Certified', 'Terracotta Fermented', 'Famous Worldwide']
  },

  // Joypurhat
  {
    id: 'joypurhat-jamalganj-sandesh',
    districtId: 'joypurhat',
    name: 'Jamalganj-er Pera Sandesh',
    bnName: 'জামালগঞ্জের প্যারা সন্দেশ',
    englishTitle: 'Solidified Condensed Milk Fudge',
    description: 'Traditional oval sweet made exclusively from pure cow milk chhana and sugar, kneaded and dried into firm, long-lasting fudge patties.',
    category: 'sweet',
    verificationStatus: 'locally-verified',
    source: 'Joypurhat District Administration Historical Accounts',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80',
    tags: ['Pera Sandesh', 'Dairy Fudge']
  },

  // Naogaon
  {
    id: 'naogaon-patnitala-sandesh',
    districtId: 'naogaon',
    name: 'Patnitalar Pera Sandesh',
    bnName: 'পত্নীতলার প্যারা সন্দেশ',
    englishTitle: 'Heritage Pure Chhana Dry Confection',
    description: 'Renowned preservative-free dry milk sweet traditionally offered at shrines and historic zamindar houses across North Bengal.',
    category: 'sweet',
    verificationStatus: 'locally-verified',
    source: 'Naogaon Heritage Directory',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80',
    tags: ['Dry Sandesh', 'Temple Offering']
  },

  // Natore
  {
    id: 'natore-kachagolla',
    districtId: 'natore',
    name: 'Natorer Kachagolla',
    bnName: 'নাটোরের কাঁচাগোল্লা',
    englishTitle: 'GI-Certified Luscious Raw Chhana Delicacy',
    description: 'GI-certified sweetmeat dating back to 1760 in the royal kitchens of Rani Bhabani. Crafted by lightly folding soft raw fresh cow chhana into hot cardamom sugar syrup, retaining a delicate melt-in-the-mouth creamy texture.',
    category: 'sweet',
    verificationStatus: 'gi-certified',
    source: 'Geographical Indication (GI) Certificate Registry of Bangladesh',
sourceUrl: 'https://dpdt.portal.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    tags: ['GI Certified', 'Rani Bhabani', 'Raw Chhana', 'Historical 1760']
  },

  // Chapainawabganj
  {
    id: 'chapainawabganj-khirshapat',
    districtId: 'chapainawabganj',
    name: 'Khirshapat Mango & Shibganj Chomchom',
    bnName: 'ক্ষীরশাপাত আম ও শিবগঞ্জের চমচম',
    englishTitle: 'GI-Certified Khirshapat (Himsagar) & Spongy Chomchom',
    description: 'GI-certified royal mango boasting honeyed sweetness and rich fragrance, paired with the iconic elongated dairy chomchom of Shibganj.',
    category: 'fruit',
    verificationStatus: 'gi-certified',
    source: 'Geographical Indication (GI) Certificate No. 3 (Bangladesh)',
sourceUrl: 'https://dpdt.portal.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80',
    tags: ['GI Certified', 'Royal Mango', 'Shibganj']
  },

  // Pabna
  {
    id: 'pabna-gawa-ghee',
    districtId: 'pabna',
    name: 'Pabnar Gawa Ghee & Shondesh',
    bnName: 'পাবনার খাঁটি গাওয়া ঘি ও মিষ্টি',
    englishTitle: 'Clarified Cow Butter & Traditional Sandesh',
    description: 'Legendary pure golden ghee churned from fresh cow milk in the pastoral pastures of Chalan Beel, known for fragrant grainy consistency.',
    category: 'sweet',
    verificationStatus: 'heritage-verified',
    source: 'Pabna Dairy Cooperative Heritage Documentation',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    tags: ['Ghee', 'Pure Dairy', 'Pastoral']
  },

  // Sirajganj
  {
    id: 'sirajganj-roshogolla',
    districtId: 'sirajganj',
    name: 'Ghoshpally Roshogolla & Pantua',
    bnName: 'সিরাজগঞ্জের ঘোষপাড়ার রসগোল্লা ও পানতুয়া',
    englishTitle: 'Pure Dairy Roshogolla of Ghoshpara',
    description: 'Renowned melt-in-mouth spongy roshogollas and deep-fried golden pantua crafted by traditional dairy artisan families of Ghoshpara.',
    category: 'sweet',
    verificationStatus: 'locally-verified',
    source: 'Sirajganj District Heritage Association',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80',
    tags: ['Roshogolla', 'Dairy Haven']
  },

  // Khulna
  {
    id: 'khulna-chui-jhal',
    districtId: 'khulna',
    name: 'Chui Jhal Gosht',
    bnName: 'চুইঝাল দিয়ে খাসির মাংস',
    englishTitle: 'Mutton Curry Simmered with Piper Chaba Wood',
    description: 'A fiery, pungent South-Western delicacy where tender mutton or beef is braised with thick chunks of mature Chui Jhal vine stem (Piper chaba) and whole garlic bulbs, creating an earthy peppery heat that tingles the palate.',
    category: 'curry',
    verificationStatus: 'heritage-verified',
    source: 'Khulna Cultural Heritage Archive & Botanical Records',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1545247181-516773ca83e3?w=600&auto=format&fit=crop&q=80',
    tags: ['Chui Jhal', 'Mustard Oil', 'Signature Dish']
  },

  // Bagerhat
  {
    id: 'bagerhat-chingri-malai',
    districtId: 'bagerhat',
    name: 'Golda Chingri Malai Curry & Sundarban Honey',
    bnName: 'সুন্দরবনের গলদা চিংড়ির মালাইকারি ও খাঁটি মধু',
    englishTitle: 'Giant River Prawn in Coconut Milk & Wild Mangrove Honey',
    description: 'Jumbo freshwater river prawns (Macrobrachium rosenbergii) simmered in freshly extracted thick coconut milk, ghee, and whole garam masala, complemented by wild raw honey collected by Mouwals from the Sundarbans.',
    category: 'fish',
    verificationStatus: 'heritage-verified',
    source: 'Sundarbans Biosphere Heritage & Bagerhat Administration',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80',
    tags: ['River Prawn', 'Coconut Curry', 'Sundarbans Honey']
  },

  // Chuadanga
  {
    id: 'chuadanga-darshana-chomchom',
    districtId: 'chuadanga',
    name: 'Darshana Chomchom & Sarbhaja',
    bnName: 'দর্শনার চমচম ও সরভাজা',
    englishTitle: 'Cream Layered Fried Sweets of Darshana',
    description: 'Crisp, golden milk-layer sweetmeat prepared by deep-frying dense layers of clotted milk cream (sar) and soaking in aromatic syrup.',
    category: 'sweet',
    verificationStatus: 'locally-verified',
    source: 'Chuadanga Heritage Association',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    tags: ['Sarbhaja', 'Cream Layer']
  },

  // Jashore
  {
    id: 'jashore-khejur-gur',
    districtId: 'jashore',
    name: 'Khejurer Patali Gur & Pitha',
    bnName: 'যশোরের খেজুরের গুড় ও পাটালি',
    englishTitle: 'Authentic Date Palm Jaggery Blocks',
    description: 'The national benchmark for pure date palm jaggery. Collected before sunrise by Gachhis from mature date palm trees and simmered over open earthen furnaces until solidifying into rich mahogany Patali cakes.',
    category: 'sweet',
    verificationStatus: 'heritage-verified',
    source: 'Department of Agricultural Extension & Jashore District Administration',
sourceUrl: 'http://dae.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&auto=format&fit=crop&q=80',
    tags: ['Date Palm', 'Winter Molasses', 'Iconic']
  },

  // Jhenaidah
  {
    id: 'jhenaidah-jhola-gur',
    districtId: 'jhenaidah',
    name: 'Kotchandpur-er Jhola Gur',
    bnName: 'কোটচাঁদপুরের খাঁটি ঝোলা গুড়',
    englishTitle: 'Liquid Date Molasses of Kotchandpur',
    description: 'Fragrant liquid date syrup poured hot over fresh winter rice cakes, renowned across Bengal for its delicate floral notes.',
    category: 'sweet',
    verificationStatus: 'locally-verified',
    source: 'Jhenaidah Agriculture Records',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&auto=format&fit=crop&q=80',
    tags: ['Liquid Jaggery', 'Kotchandpur']
  },

  // Kushtia
  {
    id: 'kushtia-tiler-khaja',
    districtId: 'kushtia',
    name: 'Kushtiar Tiler Khaja',
    bnName: 'কুষ্টিয়ার তিলের খাজা',
    englishTitle: 'Crispy Honeycomb Sesame Wafer Candy',
    description: 'Heritage artisanal confectionery perfected in Kushtia by Jagadish Chandra Roy. Boiled sugar-cardamom dough pulled hundreds of times until forming delicate internal air chambers, coated with roasted white sesame seeds.',
    category: 'snack',
    verificationStatus: 'heritage-verified',
    source: 'Kushtia Chamber of Commerce & Intangible Heritage Documentation',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80',
    tags: ['Sesame Candy', 'Honeycomb', 'Crispy']
  },

  // Magura
  {
    id: 'magura-chhana-sandesh',
    districtId: 'magura',
    name: 'Magurar Chhana Sandesh',
    bnName: 'মাগুরার খাঁটি ছানার সন্দেশ',
    englishTitle: 'Pure Cottage Cheese Sandesh',
    description: 'Tender fresh chhana sweets crafted with locally sourced pure cow milk, flavored with crushed green cardamoms.',
    category: 'sweet',
    verificationStatus: 'locally-verified',
    source: 'Magura Heritage Documentation',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80',
    tags: ['Chhana', 'Sandesh']
  },

  // Meherpur
  {
    id: 'meherpur-sabitri',
    districtId: 'meherpur',
    name: 'Sabitri & Rasakadamba',
    bnName: 'মেহেরপুরের সাবিত্রী ও রসকদম্ব',
    englishTitle: 'Centuries-Old Royal Chhana Confection',
    description: 'Historic pure cottage cheese sweet developed in 1861 by Basudeb Saha. Made without adding a drop of flour or artificial flavoring, gently roasted over coal fires to an everlasting subtle sweetness.',
    category: 'sweet',
    verificationStatus: 'heritage-verified',
    source: 'Meherpur Historical Society & District Administration Documentation',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    tags: ['Heritage 1861', 'Basudeb Saha', 'Pure Chhana']
  },

  // Narail
  {
    id: 'narail-pera-sandesh',
    districtId: 'narail',
    name: 'Narailer Pera Sandesh',
    bnName: 'নড়াইলের পেঁড়া সন্দেশ',
    englishTitle: 'Grainy Cottage Cheese Fudge',
    description: 'Traditional solid dairy sweet prepared in rural cottages along the Chitra river, prized for natural sweetness.',
    category: 'sweet',
    verificationStatus: 'locally-verified',
    source: 'Narail District Heritage Records',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80',
    tags: ['Pera Sandesh', 'Rural Dairy']
  },

  // Satkhira
  {
    id: 'satkhira-honey-sandesh',
    districtId: 'satkhira',
    name: 'Satkhirar Sandesh & Sundarban Wild Honey',
    bnName: 'সাতক্ষীরার সন্দেশ ও সুন্দরবনের খাঁটি মধু',
    englishTitle: 'Coastal Chhana Sandesh & Raw Forest Honey',
    description: 'Velvety cottage cheese sweets paired with amber-colored wild honey gathered from Khalisha and Goran blossoms in the deep Sundarbans.',
    category: 'sweet',
    verificationStatus: 'heritage-verified',
    source: 'Satkhira District Administration & Forest Department Records',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80',
    tags: ['Sundarbans', 'Wild Honey', 'Sandesh']
  },

  // Barishal
  {
    id: 'barishal-shorshe-ilish',
    districtId: 'barishal',
    name: 'Barishaler Shorshe Ilish & Balam Chal',
    bnName: 'বরিশালের শর্ষে ইলিশ ও বালাম চাল',
    englishTitle: 'Mustard Hilsa Curry with Fragrant Balam Rice',
    description: 'Fresh Hilsa fish stewed with freshly stone-ground yellow mustard, green chilies, and cold-pressed mustard oil, served over fragrant heritage Balam rice.',
    category: 'fish',
    verificationStatus: 'heritage-verified',
    source: 'Barishal Division Culinary Heritage Documentation',
sourceUrl: 'http://www.bari.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80',
    tags: ['Mustard Fish', 'Balam Rice', 'Riverine Heritage']
  },

  // Barguna
  {
    id: 'barguna-chhaiya-pitha',
    districtId: 'barguna',
    name: 'Chhaiya Pitha & Nodir Mach',
    bnName: 'বরগুনার ছাইয়া পিঠা ও মিষ্টি',
    englishTitle: 'Coastal Steamed Rice Delicacy',
    description: 'Traditional coastal steamed rice cakes prepared with fresh coconut shreds and river fish curries of the Payra river basin.',
    category: 'snack',
    verificationStatus: 'locally-verified',
    source: 'Barguna Cultural Society Records',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    tags: ['Coastal', 'Rice Pitha']
  },

  // Bhola
  {
    id: 'bhola-mohish-doi',
    districtId: 'bhola',
    name: 'Bholar Mohish-er Doi',
    bnName: 'ভোলার মহিষের টক দই',
    englishTitle: 'Riverine Buffalo Curd in Terracotta Bowls',
    description: 'Thick, creamy, naturally tangy curd fermented in unglazed clay pots from the whole milk of wild-grazing island buffaloes. Traditionally enjoyed with Khejur Gur (date molasses) or hot boiled rice.',
    category: 'sweet',
    verificationStatus: 'heritage-verified',
    source: 'Bhola Island Cultural Heritage Association & District Registry',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80',
    tags: ['Buffalo Milk', 'Clay Pot Fermented', 'Island Special']
  },

  // Jhalokati
  {
    id: 'jhalokati-amra-guava',
    districtId: 'jhalokati',
    name: 'Kirtipashar Amra & Swarupkathi Peyara',
    bnName: 'কীর্তিপাশার মিষ্টি আমড়া ও পেয়ারা',
    englishTitle: 'Hog Plum & Floating Market Guava',
    description: 'Juicy, fiberless golden hog plums (Amra) and crisp guavas traded on historic floating wooden boats along the canals of Kirtipasha and Bhimruli.',
    category: 'fruit',
    verificationStatus: 'heritage-verified',
    source: 'Department of Agricultural Extension (DAE) Bangladesh',
sourceUrl: 'http://dae.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80',
    tags: ['Floating Market', 'Hog Plum', 'Guava']
  },

  // Patuakhali
  {
    id: 'patuakhali-kuakata-shutki',
    districtId: 'patuakhali',
    name: 'Kuakata Shutki & Doodh-er Pitha',
    bnName: 'কুয়াকাটার শুঁটকি ও দুধের ক্ষীর',
    englishTitle: 'Coastal Sun-Dried Marine Delicacy',
    description: 'Traditional marine sun-dried fish processed along the coastal shores of Kuakata, cooked into fiery spicy chutneys and curries.',
    category: 'fish',
    verificationStatus: 'locally-verified',
    source: 'Patuakhali Tourism & Fishery Documentation',
sourceUrl: 'https://tourismboard.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80',
    tags: ['Coastal', 'Sun Dried', 'Kuakata']
  },

  // Pirojpur
  {
    id: 'pirojpur-malai-roshogolla',
    districtId: 'pirojpur',
    name: 'Pirojpurer Malai Roshogolla',
    bnName: 'পিরোজপুরের মালাই রসগোল্লা',
    englishTitle: 'Spongy Roshogolla in Clotted Cream',
    description: 'Tender cottage cheese roshogollas immersed in thick reduced creamy milk, celebrated across the delta river ports.',
    category: 'sweet',
    verificationStatus: 'locally-verified',
    source: 'Pirojpur District Heritage Directory',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    tags: ['Malai', 'Roshogolla']
  },

  // Sylhet
  {
    id: 'sylhet-satkora-beef',
    districtId: 'sylhet',
    name: 'Satkora Beef Curry',
    bnName: 'সাতকড়া দিয়ে গরুর মাংস',
    englishTitle: 'Slow-Cooked Beef with Wild Citrus Macroptera',
    description: 'The defining culinary jewel of the Surma valley. Thick chunks of beef cooked with wild bitter-sour Satkora citrus peel, releasing an intoxicating aromatic citrus-infused richness unmatched in Bengali cuisine.',
    category: 'curry',
    verificationStatus: 'heritage-verified',
    source: 'Sylhet Chamber of Commerce & Folk Culture Society Documentation',
sourceUrl: 'https://en.banglapedia.org/',
    imageUrl: 'https://images.unsplash.com/photo-1545247181-516773ca83e3?w=600&auto=format&fit=crop&q=80',
    tags: ['Satkora Citrus', 'Beef Curry', 'Sylhet Heritage']
  },
  {
    id: 'sylhet-chunga-pitha',
    districtId: 'sylhet',
    name: 'Chunga Pitha',
    bnName: 'চুঙ্গা পিঠা',
    englishTitle: 'Bamboo-Steamed Glutinous Rice Cake',
    description: 'Ancestral winter rice delicacy prepared by stuffing sticky Binni rice into green wild bamboo stems (Chunga) and slowly roasting over smoldering paddy straw fires. Eaten with thick milk cream or date molasses.',
    category: 'snack',
    verificationStatus: 'heritage-verified',
    source: 'National Folk Culture Institute of Bangladesh',
sourceUrl: 'https://en.banglapedia.org/',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    tags: ['Bamboo Steamed', 'Binni Rice', 'Ancestral Pitha']
  },

  // Habiganj
  {
    id: 'habiganj-tea-pitha',
    districtId: 'habiganj',
    name: 'Tea Garden Brew & Kolar Pitha',
    bnName: 'হবিগঞ্জের চা বাগান ও কলার পিঠা',
    englishTitle: 'Estate Black Tea & Ripe Banana Fritters',
    description: 'Fresh first-flush black tea leaves from historic tea gardens paired with golden fried banana-coconut rice fritters.',
    category: 'beverage',
    verificationStatus: 'locally-verified',
    source: 'Habiganj District Administration & Tea Board Records',
sourceUrl: 'http://www.teaboard.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
    tags: ['Tea Estate', 'Banana Pitha']
  },

  // Moulvibazar
  {
    id: 'moulvibazar-seven-color-tea',
    districtId: 'moulvibazar',
    name: 'Sreemangal-er Sat Rong-er Cha',
    bnName: 'শ্রীমঙ্গলের সাত রঙের চা',
    englishTitle: 'Legendary Seven-Layered Rainbow Tea',
    description: 'Invented in Sreemangal by Ramesh Ram Gope at Nilkantha Tea Cabin. Seven distinct vibrant layers of tea, milk, cloves, and lemon precisely arranged by density in a single transparent glass.',
    category: 'beverage',
    verificationStatus: 'heritage-verified',
    source: 'Bangladesh Tea Research Institute (BTRI) & Sreemangal Tourism Board',
sourceUrl: 'http://www.teaboard.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
    tags: ['Seven Layers', 'Sreemangal', 'Tea Capital', 'Unique']
  },

  // Sunamganj
  {
    id: 'sunamganj-haor-fish',
    districtId: 'sunamganj',
    name: 'Tanguar Haor-er Boal o Chital Mach',
    bnName: 'টাঙ্গুয়ার হাওরের তাজা মাছের ঝোল',
    englishTitle: 'Tanguar Haor Freshwater Wild Fish Broth',
    description: 'Fresh wild catches from the pristine Ramsar site of Tanguar Haor, simmered with wild herbs and mustard oil.',
    category: 'fish',
    verificationStatus: 'locally-verified',
    source: 'Department of Fisheries Wetland Registry',
sourceUrl: 'http://fisheries.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80',
    tags: ['Ramsar Site', 'Haor', 'Freshwater Fish']
  },

  // Rangpur
  {
    id: 'rangpur-haribhanga-mango',
    districtId: 'rangpur',
    name: 'Mithapukur-er Haribhanga Mango',
    bnName: 'রংপুরের হাঁড়িভাঙা আম',
    englishTitle: 'GI-Certified Plump Fiberless Mango',
    description: 'GI-certified northern mango native to Mithapukur. Known for spherical round shape, curved beak, thick fragrant skin, and rich fiberless pulp.',
    category: 'fruit',
    verificationStatus: 'gi-certified',
    source: 'Geographical Indication (GI) Certificate Registry of Bangladesh',
sourceUrl: 'https://dpdt.portal.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80',
    tags: ['GI Certified', 'Fiberless', 'Mithapukur']
  },

  // Dinajpur
  {
    id: 'dinajpur-katari-bhog',
    districtId: 'dinajpur',
    name: 'Katari Bhog Rice & Bedana Litchi',
    bnName: 'দিনাজপুরের কাটারিভোগ চাল ও বেদানা লিচু',
    englishTitle: 'GI-Certified Aromatic Fine Rice & Juicy Litchis',
    description: 'GI-certified delicate fine aromatic rice historically offered to deities, coupled with succulent ruby-red Bedana litchis famous for small seeds and sweet floral nectar.',
    category: 'rice',
    verificationStatus: 'gi-certified',
    source: 'Geographical Indication (GI) Certificate Registry of Bangladesh',
sourceUrl: 'https://dpdt.portal.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
    tags: ['GI Certified', 'Aromatic Rice', 'Litchi']
  },

  // Gaibandha
  {
    id: 'gaibandha-roshmonjuri',
    districtId: 'gaibandha',
    name: 'Rome-er Roshmonjuri',
    bnName: 'গাইবান্ধার রসমঞ্জুরী',
    englishTitle: 'Artisanal Chhana Droplets in Creamy Milk Rabri',
    description: 'Originated in 1948 by Ramesh Chandra Ghosh (Rome) in Gaibandha. Small hand-rolled cottage cheese droplets cooked and immersed in thick caramelized condensed milk.',
    category: 'sweet',
    verificationStatus: 'heritage-verified',
    source: 'Gaibandha Cultural Heritage Directory',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    tags: ['Roshmonjuri', 'Caramelized Milk', 'Historic 1948']
  },

  // Kurigram
  {
    id: 'kurigram-kheer-tulai',
    districtId: 'kurigram',
    name: 'Kheer-Tulai & Chepa Shutki',
    bnName: 'কুড়িগ্রামের ক্ষীর তুলাই ও চ্যাঁপা শুঁটকি',
    englishTitle: 'Spongy Milk Sweet & Fermented Fish Curry',
    description: 'Traditional northern cottage milk sweets and spicy semi-fermented Chepa fish stews made with green chilies.',
    category: 'sweet',
    verificationStatus: 'locally-verified',
    source: 'Kurigram District Administration Cultural Records',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80',
    tags: ['Milk Sweet', 'Traditional']
  },

  // Lalmonirhat
  {
    id: 'lalmonirhat-bairali-fish',
    districtId: 'lalmonirhat',
    name: 'Teesta Nodir Bairali Mach',
    bnName: 'তিস্তার বৈরালী মাছের চচ্চড়ি',
    englishTitle: 'Crisp Teesta River Bairali Fish',
    description: 'Prized silver miniature fish caught wild from the rapid cold waters of the Teesta river, cooked crispy with chopped onions, green chilies, and turmeric.',
    category: 'fish',
    verificationStatus: 'locally-verified',
    source: 'Lalmonirhat Fisheries Documentation',
sourceUrl: 'http://fisheries.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80',
    tags: ['Teesta River', 'Wild Fish', 'Crispy']
  },

  // Nilphamari
  {
    id: 'nilphamari-syedpur-chumchum',
    districtId: 'nilphamari',
    name: 'Syedpurer Chumchum',
    bnName: 'সৈয়দপুরের ঐতিহ্যবাহী চমচম',
    englishTitle: 'Railway Junction Soft Dairy Sweet',
    description: 'Spongy, succulent cottage cheese sweet crafted in historic railway city Syedpur, soaked in balanced cardamom syrup.',
    category: 'sweet',
    verificationStatus: 'locally-verified',
    source: 'Nilphamari Chamber of Commerce Heritage Notes',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    tags: ['Syedpur', 'Chomchom']
  },

  // Panchagarh
  {
    id: 'panchagarh-organic-tea',
    districtId: 'panchagarh',
    name: 'Plainland Organic Green Tea',
    bnName: 'পঞ্চগড়ের অর্গানিক সমতল চা',
    englishTitle: 'Sub-Himalayan Organic Plainland Green & White Tea',
    description: 'Pioneering organic tea harvested from gentle slopes in Tetulia at the base of the Himalayas, yielding light, floral, antioxidant-rich tea.',
    category: 'beverage',
    verificationStatus: 'heritage-verified',
    source: 'Bangladesh Tea Board Plainland Plantation Records',
sourceUrl: 'http://www.teaboard.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
    tags: ['Organic Tea', 'Himalayan Foothills', 'Tetulia']
  },

  // Thakurgaon
  {
    id: 'thakurgaon-shurjomukhi-sandesh',
    districtId: 'thakurgaon',
    name: 'Shurjomukhi Sandesh',
    bnName: 'ঠাকুরগাঁওয়ের সূর্যমুখী সন্দেশ',
    englishTitle: 'Sunflower-Embossed Cottage Cheese Sweet',
    description: 'Hand-crafted cottage cheese sweet molded into the shape of a sunflower, featuring a soft buttery center.',
    category: 'sweet',
    verificationStatus: 'locally-verified',
    source: 'Thakurgaon District Administration Cultural Notes',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80',
    tags: ['Sunflower Shape', 'Sandesh']
  },

  // Mymensingh
  {
    id: 'mymensingh-muktagacha-monda',
    districtId: 'mymensingh',
    name: 'Muktagachar Monda',
    bnName: 'মুক্তাগাছার মণ্ডা',
    englishTitle: 'GI-Certified Aristocratic Condensed Milk Patties',
    description: 'GI-certified royal sweet invented in 1824 by Ramgopal Modak for Maharaja Suryakanta Acharya Chowdhury. Prepared by slow-cooking pure cottage cheese and solid buffalo milk into soft disc patties served fresh over Sal leaves.',
    category: 'sweet',
    verificationStatus: 'gi-certified',
    source: 'Geographical Indication (GI) Certificate Registry of Bangladesh',
sourceUrl: 'https://dpdt.portal.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    tags: ['GI Certified', 'Ramgopal Modak', 'Maharaja Legacy', '1824']
  },

  // Jamalpur
  {
    id: 'jamalpur-chhanar-polao',
    districtId: 'jamalpur',
    name: 'Jamalpur-er Chhanar Polao',
    bnName: 'জামালপুরের ছানার পোলাও',
    englishTitle: 'Sweet Grain-Like Cottage Cheese Polao',
    description: 'Delightful confectionery crafted by frying tiny grain-sized cottage cheese droplets in ghee and tossing them in aromatic saffron sugar syrup, resembling sweet polao rice.',
    category: 'sweet',
    verificationStatus: 'heritage-verified',
    source: 'Jamalpur District Cultural Directory',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80',
    tags: ['Chhana Polao', 'Unique Confectionery']
  },

  // Netrokona
  {
    id: 'netrokona-balish-mishti',
    districtId: 'netrokona',
    name: 'Goyanather Balish Mishti',
    bnName: 'গয়ানাথের বালিশ মিষ্টি',
    englishTitle: 'Giant Pillow Sweet of Goyanath Ghosh',
    description: 'Legendary oversized sweetmeat invented over a century ago by Goyanath Ghosh. A soft, massive pillow-shaped cottage cheese sweet soaked in sugar syrup and generously rolled in fragrant fresh mawa.',
    category: 'sweet',
    verificationStatus: 'heritage-verified',
    source: 'Netrokona District Administration & Folk Heritage Archive',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    tags: ['Pillow Sweet', 'Goyanath Ghosh', 'Iconic Giant Sweet']
  },

  // Sherpur
  {
    id: 'sherpur-chhanar-payesh',
    districtId: 'sherpur',
    name: 'Sherpur-er Chhanar Payesh',
    bnName: 'শেরপুরের ঐতিহ্যবাহী ছানার পায়েস',
    englishTitle: 'Cottage Cheese Cardamom Milk Pudding',
    description: 'A decadent royal pudding cooked with delicate fresh cottage cheese nuggets simmered slowly in whole milk reduced to half volume, perfumed with green cardamom.',
    category: 'sweet',
    verificationStatus: 'locally-verified',
    source: 'Sherpur District Cultural Documentation',
sourceUrl: 'https://bangladesh.gov.bd/',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80',
    tags: ['Chhanar Payesh', 'Pudding', 'Royal Treat']
  },

  // Sunamganj - Community Proposal / Verification Pending
  {
    id: 'sunamganj-haor-duck-curry',
    districtId: 'sunamganj',
    name: 'Tanguar Haor Duck Curry',
    bnName: 'টাঙ্গুয়ার হাওরের হাঁসের মাংস ভুনার প্রস্তাবনা',
    englishTitle: 'Wetland Spiced Duck Curry (Verification Pending)',
    description: 'হাওরাঞ্চলে শীতকালে হাঁসের মাংসের ভুনা স্থানীয়ভাবে তুমুল জনপ্রিয় ও প্রচলিত হলেও প্রাতিষ্ঠানিক রন্ধন ঐতিহ্য রেজিস্ট্রি বা সরকারি তথ্যে এর আনুষ্ঠানিক গেজেট অন্তর্ভুক্তির তথ্য যাচাই প্রক্রিয়াধীন রয়েছে।',
    category: 'curry',
    verificationStatus: 'coming-soon',
    source: 'স্থানীয় প্রচলিত রন্ধন প্রস্তাবনা (ঐতিহাসিক প্রামাণ্য নথি যাচাই প্রক্রিয়াধীন)',
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
    tags: ['হাওর', 'হাঁসের মাংস', 'যাচাই প্রক্রিয়াধীন', 'প্রস্তাবনা']
  },

  // Cox's Bazar - Coastal Special / Verification Pending
  {
    id: 'coxsbazar-loitta-fry',
    districtId: 'coxsbazar',
    name: 'Coxs Bazar Crispy Loitta Fry',
    bnName: 'কক্সবাজারের ক্রিস্পি লইট্টা ফ্রাই',
    englishTitle: 'Crispy Coastal Bombay Duck Fish (Verification Pending)',
    description: 'কক্সবাজার সমুদ্র সৈকত অঞ্চলে বহুল পরিচিত ঐতিহ্যবাহী সামুদ্রিক লইট্টা মাছের ক্রিস্পি ফ্রাই। স্থানীয় পর্যটন খাদ্যসংস্কৃতির অবিচ্ছেদ্য অংশ হলেও জেলা ঐতিহ্যিক খাদ্য গেজেটে এর আনুষ্ঠানিক ঐতিহাসিক সনদ যাচাই প্রক্রিয়াধীন।',
    category: 'fish',
    verificationStatus: 'coming-soon',
    source: 'পর্যটন ও স্থানীয় রন্ধন সংস্কৃতি (ঐতিহাসিক নথি যাচাই প্রক্রিয়াধীন)',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80',
    tags: ['কক্সবাজার', 'লইট্টা মাছ', 'যাচাই প্রক্রিয়াধীন', 'সামুদ্রিক']
  }
];

export const FOODS_BY_DISTRICT = FOODS.reduce<Record<string, Food[]>>((acc, food) => {
  if (!acc[food.districtId]) {
    acc[food.districtId] = [];
  }
  acc[food.districtId].push(food);
  return acc;
}, {});
