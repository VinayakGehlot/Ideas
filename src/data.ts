import { Idea } from './types.ts';
import { MORE_IDEAS } from './more-ideas';

const categories = [
  'Online Business',
  'Offline Business',
  'Mobile Earning',
  'Freelancing',
  'Content Creation',
  'Affiliate Marketing',
  'Digital Products',
  'Services',
  'Local Business',
  'Low Investment Ideas'
];

const templates = [
  {
    titlePrefix: 'Start a',
    titleSuffix: 'Business',
    summary: '{title} start karke achi income generate karein.',
    description: 'Yeh ek bahut hi badhiya earning opportunity hai jisme aap {title} shuru karke paise kama sakte hain.',
    steps: [
      'Market research karein aur demand samjhein.',
      'Ek solid plan banayein.',
      'Execution start karein aur clients dhundhein.'
    ],
  },
  {
    titlePrefix: 'Become a',
    titleSuffix: 'Expert',
    summary: 'Agar aapko skills aati hain to {title} ban kar kamayein.',
    description: 'Aaj ke digital jamane me {title} ki bahut demand hai. Aap ghar baithe kama sakte hain.',
    steps: [
      'Apni skills ko refine karein.',
      'Portfolio banayein.',
      'Freelance platforms ya direct clients approach karein.'
    ]
  },
  {
    titlePrefix: 'Mobile se',
    titleSuffix: 'Karein',
    summary: 'Apne smartphone ka use karke {title} se earning shuru karein.',
    description: 'Bina kisi laptop ya desktop ke aap sirf mobile se {title} kar sakte hain.',
    steps: [
      'Required apps download karein.',
      'Account setup karein.',
      'Daily time de kar earning start karein.'
    ]
  }
];

const specificIdeas = [
  "YouTube Channel", "Blogging", "Dropshipping", "Social Media Management",
  "SEO Consulting", "Website Flipping", "Domain Flipping", "E-book Selling",
  "Online Tutoring", "Virtual Assistant", "Podcast Editing", "Video Editing",
  "Graphic Design", "Logo Design", "Copywriting", "Translation Services",
  "App Development", "Web Development", "Stock Photography", "Instagram Theme Page",
  "Facebook Ads Agency", "Print on Demand", "Handmade Crafts", "Local SEO",
  "Cloud Kitchen", "Tiffin Service", "Event Management", "Real Estate Brokering",
  "Car Wash Service", "Pet Grooming", "Fitness Coaching", "Diet Plan Consulting",
  "Language Classes", "Music Lessons", "Dance Classes", "Tuition Classes",
  "Resume Building", "Interview Prep coaching", "Data Entry", "Online Surveys"
];

function generateIdeas(): Idea[] {
  const generatedIdeas: Idea[] = [];
  let idCounter = 1;

  for (let i = 0; i < 500; i++) {
    const category = categories[i % categories.length];
    const template = templates[i % templates.length];
    const specific = specificIdeas[i % specificIdeas.length] + (i >= specificIdeas.length ? ` ${Math.floor(i / specificIdeas.length) + 1}` : '');
    
    const title = `${template.titlePrefix} ${specific} ${template.titleSuffix}`.trim();
    
    // Deterministic random replacements for consistency
    const epIdx = (i * 7) % 3;
    const scIdx = (i * 11) % 3;
    const slIdx = (i * 13) % 3;
    const tsIdx = (i * 17) % 3;
    const bfIdx = (i * 19) % 4;

    const idea: Idea = {
      id: `idea_${idCounter++}`,
      title: title,
      category: category,
      summary: template.summary.replace('{title}', specific),
      description: template.description.replace('{title}', specific),
      steps: template.steps,
      earningPotential: ['10k - 20k / month', '20k - 50k / month', '50k+ / month'][epIdx],
      startCost: ['₹0', '₹1000 - ₹5000', '₹5000+'][scIdx],
      skillLevel: ['Beginner', 'Intermediate', 'Advanced'][slIdx],
      timeToStart: ['1 Day', '1 Week', '1 Month'][tsIdx],
      bestFor: ['Students', 'Housewives', 'Professionals', 'Anyone'][bfIdx],
      pros: ['Flexible time', 'Scalable', 'High demand', 'Low risk'].slice(0, 2),
      cautions: ['Competition is high', 'Requires patience', 'Consistency needed'].slice(0, 2),
      tags: [category.toLowerCase().replace(/ /g, '-'), specific.toLowerCase().split(' ')[0]],
      relatedIdeaIds: [], // filled later
    };
    generatedIdeas.push(idea);
  }

  const premiumIdeas: Idea[] = [
    {
      id: "premium_1",
      title: "AI WhatsApp Booking Bot",
      category: "Services",
      summary: "WhatsApp API ka use karke local businesses ke liye appointments aur queries auto-manage karein.",
      description: "Missed customer bookings aur manual replies mein time waste se local salons, spas, aur clinics ko bachein. WhatsApp API ka use karke AI chatbot set up karein jo 24/7 client queries ke answers dega aur standard spaces book karega.",
      steps: [
        "WhatsApp Cloud API platform set up karein.",
        "Simple visual flowchart setup banayein queries resolve karne ke liye.",
        "Salons ya clinics me direct dynamic demo present karein."
      ],
      earningPotential: "₹15,000 - ₹50,000 / month",
      startCost: "₹1000 - ₹5000",
      skillLevel: "Intermediate",
      timeToStart: "1-2 Weeks",
      bestFor: "Students, Freelancers",
      pros: ["Passive recurring setup fee", "Extremely low competition in local areas"],
      cautions: ["WhatsApp API updates handle karne hote hain", "Warm client outreach required initially"],
      tags: ["whatsapp", "automation", "ai-bot", "local-business"],
      relatedIdeaIds: []
    },
    {
      id: "premium_2",
      title: "LinkedIn Ghostwriting for Founders",
      category: "Freelancing",
      summary: "Startup founders, CEOs aur brand managers ka personal brand profile grow karein.",
      description: "Startup founders ke paas personal brand banane ka time nahi hota. Unka interview lein unke thoughts capture karne ke liye aur high-engaging LinkedIn posts aur system standard profiles publish karein.",
      steps: [
        "LinkedIn content formatting aur algorithms seekhein.",
        "Founder ya CEO ke audio samples se raw ideas compile karein.",
        "Dynamic high-hook post series likhein, daily schedule manage karein."
      ],
      earningPotential: "₹30,000 - ₹1,00,000 / month",
      startCost: "₹0",
      skillLevel: "Intermediate",
      timeToStart: "1 Week",
      bestFor: "Content Writers, Students",
      pros: ["High paying B2B clients", "Ghar baithe high-paying work opportunity"],
      cautions: ["Client design/voice matches properly matching is crucial", "Needs high consistency and deadlines"],
      tags: ["linkedin", "copywriting", "freelancing", "high-income"],
      relatedIdeaIds: []
    },
    {
      id: "premium_3",
      title: "Calorie-Tracked Cloud Kitchen",
      category: "Local Business",
      summary: "Office-goers aur gym lovers ko nutrition balanced premium healthy home food deliver karein.",
      description: "Busy gym-goers aur fitness enthusiasts ko macro-calculated (Exact protein, carbs, fats mapping) khana provide karein. Ek small home style cloud kitchen start karein packaging standards ke sath.",
      steps: [
        "Macro calculation based healthy recipe menu curate karein.",
        "Local license aur standard kitchen space acquire karein.",
        "Gyms, corporate offices aur housing societies me subscriptions introduce karein."
      ],
      earningPotential: "₹40,000 - ₹2,00,000 / month",
      startCost: "₹5000+",
      skillLevel: "Beginner",
      timeToStart: "2-3 Weeks",
      bestFor: "Housewives, Gym Trainers, Chefs",
      pros: ["Loyal recurring subscribers", "Excellent profit margins on premium diet plans"],
      cautions: ["Strict food preparation quality and hygiene required", "Local delivery mechanics maintain consistency"],
      tags: ["cloud-kitchen", "healthy-food", "local-business", "diet"],
      relatedIdeaIds: []
    },
    {
      id: "premium_4",
      title: "Senior Citizen Tech Support",
      category: "Services",
      summary: "Seniors ko smartphones, safe UPI payments aur digital apps use karna sikhayein.",
      description: "Senior citizens ko smart device usage, direct online bank transfer, UPI apps use karne me support karein aur fraud/scams se bache rehne ke pure patterns comfort zone me samjhayein.",
      steps: [
        "Professional yet soft, empathetic trainer profile ready karein.",
        "Local housing societies aur family associations me services introduce karein.",
        "UPI payments, online safety, medicine booking steps physically practice karwayein."
      ],
      earningPotential: "₹10,000 - ₹30,000 / month",
      startCost: "₹0",
      skillLevel: "Beginner",
      timeToStart: "1 Day",
      bestFor: "Kind students, Empathetic youths",
      pros: ["Unique solution, highly appreciated", "Satisfaction and direct offline reference"],
      cautions: ["Patience level highest rakhna hoga", "Ensure complete offline client trust"],
      tags: ["tech-support", "elderly-care", "services", "low-investment"],
      relatedIdeaIds: []
    },
    {
      id: "premium_5",
      title: "Podcast Audio Fixer (Editor)",
      category: "Content Creation",
      summary: "Podcasters aur interviews ke raw records ko professionally clean aur edit karein.",
      description: "Aesthetic podcasters aur startup interviews ke raw high-level audios edit karein. Background noise reduction aur professional intro/outro sound mixing ke sath publish-ready episodes design karein.",
      steps: [
        "Editing softwares seekhein (Audacity, Premiere or Audition).",
        "Raw noise cancel karne wale AI setup tools leverage karein.",
        "Yeni podcasters platforms ko target karke samples deliver karein."
      ],
      earningPotential: "₹20,000 - ₹80,000 / month",
      startCost: "₹0",
      skillLevel: "Intermediate",
      timeToStart: "1 Week",
      bestFor: "Audio editors, Music students",
      pros: ["Boombastic Creator market demand", "Ghar baithe scalable digital task"],
      cautions: ["Deadline commitment strictly mandatory", "Audio software dynamic knowledge require"],
      tags: ["podcast", "audio-editing", "freelancing", "content-creation"],
      relatedIdeaIds: []
    },
    {
      id: "premium_6",
      title: "Notion Workspace Architect",
      category: "Services",
      summary: "Small agencies aur remote startups ke liye database CRM and workspaces configure karein.",
      description: "Teams ko files aur tracking manage karne me hone wale messy friction se bachein. Workspace architect ban kar startups ke liye custom client databases, task charts aur clean wikis set up karein.",
      steps: [
        "Notion structural database, formula tools aur templates seekhein.",
        "Custom, functional templates design karke portfolio showcase build karein.",
        "B2B service providers aur agencies ko package systems pitch outreach target karein."
      ],
      earningPotential: "₹30,000 - ₹1,50,000 / month",
      startCost: "₹0",
      skillLevel: "Intermediate",
      timeToStart: "1-2 Weeks",
      bestFor: "Productivity lovers, Organization freaks",
      pros: ["Premium project budget ticket size", "Zero capital requirement"],
      cautions: ["Needs clear structure analysis of customer workflow", "Formula editing issues resolving parameters"],
      tags: ["notion", "templates", "b2b", "organization"],
      relatedIdeaIds: []
    },
    {
      id: "premium_7",
      title: "Short-Form Video Repurposer",
      category: "Content Creation",
      summary: "Creators ke horizontal long content se vertical reels aur viral clips curate karein.",
      description: "Interviews aur long video podcasts se crucial engaging hooks aur elements carve karein. Visual elements (motion graphic lines, captions, sound alerts) embed karke mobile-optimized format ready karein.",
      steps: [
        "Horizontal to vertical scaling editing flow seekhein (Capcut, Premiere).",
        "High hook detection parameters extract out karein.",
        "Creators direct cold dynamic DM with samples outreach plan."
      ],
      earningPotential: "₹25,000 - ₹90,000 / month",
      startCost: "₹0",
      skillLevel: "Intermediate",
      timeToStart: "3-5 Days",
      bestFor: "Video editors, Reel designers",
      pros: ["Unlimited demand, fast-changing vertical format", "Excellent scale-up opportunities"],
      cautions: ["High competitive standard across platforms", "Slight aesthetic layout trends focus required"],
      tags: ["reels", "shorts", "editing", "video-repurposer"],
      relatedIdeaIds: []
    },
    {
      id: "premium_8",
      title: "Freelancer Tax Micro-SaaS",
      category: "Digital Products",
      summary: "Freelancers aur creators ke tax calculations aur custom invoicing ke liye low-code software.",
      description: "Indian gig-workers aur freelancers ke simplified monthly bookkeeping, dynamic tax slot estimation aur elegant dynamic standard layout receipts automation generator application release.",
      steps: [
        "Simple visual wireframe and tax tables construct plan.",
        "Deploy in no-code platform tools (Glide, Bubble, Retool).",
        "Introduce to freelancer online forums, communities."
      ],
      earningPotential: "₹50,000 - ₹3,00,000 / month",
      startCost: "₹1000 - ₹5000",
      skillLevel: "Advanced",
      timeToStart: "1 Month",
      bestFor: "No-code enthusiasts, Product makers",
      pros: ["Monthly automatic recurring revenue stream", "High value retention from local developers"],
      cautions: ["Requires legal calculations dynamic accuracy", "Initial target marketing system focus necessary"],
      tags: ["saas", "tax", "nocode", "digital-product"],
      relatedIdeaIds: []
    },
    {
      id: "premium_9",
      title: "Regional Job Newsletter",
      category: "Low Investment Ideas",
      summary: "Tier-2/3 cities ke youth ke liye weekly verified hyper-local listings system.",
      description: "Local levels par job notifications channels (stores, schools, factories) offline display space tak simulation rehte hain. Un listings ko secure verify karke structured job notifications list deliver channels ready karein.",
      steps: [
        "Regional WhatsApp/Telegram channels create karke target groups banayein.",
        "Scrape local physical boards, classified notes and verify validity.",
        "Consistent weekly email/pdf alerts template compile run."
      ],
      earningPotential: "₹15,000 - ₹60,000 / month",
      startCost: "₹0",
      skillLevel: "Beginner",
      timeToStart: "3 Days",
      bestFor: "Networkers, Local micro influencers",
      pros: ["Solving a critical gap in smaller cities", "Monetization through trusted local sponsorships"],
      cautions: ["Filtering spam and fraudulent jobs is essential", "Takes minor organic initial marketing setup"],
      tags: ["newsletter", "regional-jobs", "wa-notify", "community"],
      relatedIdeaIds: []
    },
    {
      id: "premium_10",
      title: "Cold Email Setup Service",
      category: "Online Business",
      summary: "B2B client email outreach ke liye stable, spam-free technically qualified system bundle.",
      description: "Direct sales ke key problems (email bouncing, spam redirection) ko solve karein. Client domains configure parameters (SPF, DKIM, DMARC custom alignment) optimization ke sath launch setup compile execute karein.",
      steps: [
        "Domain registration mechanics, parameters DNS settings seekhein.",
        "Auto-warmup tools, tracking system connect design templates.",
        "Acquire client bases globally through direct cold pitching."
      ],
      earningPotential: "₹40,000 - ₹1,20,000 / month",
      startCost: "₹1000 - ₹2000",
      skillLevel: "Intermediate",
      timeToStart: "4-5 Days",
      bestFor: "Technical tech support, Agency founders",
      pros: ["Extremely premium ticket scale, quick deployment", "Prevents massive marketing lead drops"],
      cautions: ["Domain registration metrics tracking details required", "Continuous customer maintenance support issues"],
      tags: ["dns", "cold-email", "b2b", "lead-gen"],
      relatedIdeaIds: []
    },
    {
      id: "premium_11",
      title: "Shopify Speed Optimizer",
      category: "Services",
      summary: "E-commerce platforms (Shopify/Woo) ke load time optimize karke sales loss recover karein.",
      description: "Heavy image compression, redundant scripts removal aur fast loading protocols upgrade system config. Web traffic drop ratios block karke storefront load speeds 3 seconds se kam karein.",
      steps: [
        "Web optimization metrics analysis processes seekhein.",
        "Shopify templates codebase optimize, custom image compressors use.",
        "Store owners direct audits share karke speed pitch initiate."
      ],
      earningPotential: "₹30,000 - ₹1,00,000 / month",
      startCost: "₹0",
      skillLevel: "Intermediate",
      timeToStart: "1 Week",
      bestFor: "Web developers, Tech-savvy freelancers",
      pros: ["Direct performance comparison before-after validation", "High priority optimization budget client priority"],
      cautions: ["Code issues resolving requires careful backup steps", "Each store configuration might differ slightly"],
      tags: ["shopify", "performance", "web-dev", "ecom"],
      relatedIdeaIds: []
    },
    {
      id: "premium_12",
      title: "Airbnb Co-hosting",
      category: "Online Business",
      summary: "Property key managers - owners ke layout space system end-to-end organize manage.",
      description: "Property owners ke behalf par listing coordination, guests query resolving, housekeeping routines aur pricing optimization parameters look after karke percentage revenue model system operate.",
      steps: [
        "Target aesthetic property spaces locally or tourist locations.",
        "Pitch property managers/owners standard operating workflows.",
        "Upload listing aesthetic formats, manage reviews proactively."
      ],
      earningPotential: "₹50,000 - ₹2,50,000 / month",
      startCost: "₹0",
      skillLevel: "Intermediate",
      timeToStart: "1-2 Weeks",
      bestFor: "Real estate enthusiast, Operations masters",
      pros: ["Zero physical investment structure", "Passive percentage cut scale"],
      cautions: ["High level guest coordination accountability", "Emergency repairs and housekeeping management"],
      tags: ["airbnb", "real-estate", "hospitality", "co-hosting"],
      relatedIdeaIds: []
    },
    {
      id: "premium_13",
      title: "Drone Photography for Real Estate",
      category: "Offline Business",
      summary: "Cinematic aerial coverage package for premium construction projects, properties and resorts.",
      description: "Construction sites or luxury resorts ke spectacular wide drone video edits curate karein, video profiles design karke target agency systems and builders ko render quality output provide write.",
      steps: [
        "Premium micro-drone hardware aur controls acquire, practice flying.",
        "Creative framing patterns video compiles build.",
        "Social-ready edit template bundles properties platform present."
      ],
      earningPotential: "₹25,000 - ₹1,20,000 / month",
      startCost: "₹5000+",
      skillLevel: "Intermediate",
      timeToStart: "1-2 Weeks",
      bestFor: "Photographers, Travel creators",
      pros: ["Premium brand positioning, high pay scale", "Aesthetically rewarding output"],
      cautions: ["Drone permissions and flying regulations compliance local awareness", "Handling high cost camera equipment risk factors"],
      tags: ["drone", "real-estate-media", "cinematic", "photography"],
      relatedIdeaIds: []
    },
    {
      id: "premium_14",
      title: "Pet Sitting & Boarding Network",
      category: "Low Investment Ideas",
      summary: "Travel-goers ke dynamic safe pets care, home-boarding secure monitoring network.",
      description: "Pet lovers travelling plan times par professional comfort space support package. Daily feeding routines, proper playtimes tracking along with dynamic video updates systems map.",
      steps: [
        "Safe home, feeding structures alignment setups verification.",
        "Local target communities, pet groups listings register.",
        "Provide direct safety guidelines details and insurance trust values."
      ],
      earningPotential: "₹10,000 - ₹35,000 / month",
      startCost: "₹0",
      skillLevel: "Beginner",
      timeToStart: "1-2 Days",
      bestFor: "Animal lovers, Housewives",
      pros: ["Instant monetization scale", "Emotionally comforting and satisfying"],
      cautions: ["Requires active alertness 24/7 care", "Medical emergency support knowledge necessity"],
      tags: ["pets", "boarding", "local-service", "low-cost"],
      relatedIdeaIds: []
    },
    {
      id: "premium_15",
      title: "Solar Panel Cleaning Service",
      category: "Offline Business",
      summary: "Efficiency optimization monthly standard washing package for local rooftop solar installations.",
      description: "Local apartments, spaces or offices rooftop solar panel systems cleaner setup systems maintenance. Removal of dust, debris and birds marks using safe soft structures to increase power output up to 25%.",
      steps: [
        "Soft washing setup, standard scrapers & water filter tools acquire.",
        "Direct local rooftop houses directories outreach pitch.",
        "Prepare dynamic energy recovery reports analysis chart proofs."
      ],
      earningPotential: "₹20,000 - ₹70,000 / month",
      startCost: "₹5000+",
      skillLevel: "Beginner",
      timeToStart: "3-5 Days",
      bestFor: "Commercial helpers, Service providers",
      pros: ["Steady monthly subscription recurrence model", "Direct visibility on power outputs client side"],
      cautions: ["Rooftop working safety processes strict protocols required", "Careful installation glass protection while cleanups"],
      tags: ["solar", "maintenance", "roof-clean", "offline-service"],
      relatedIdeaIds: []
    }
  ];

  generatedIdeas[0] = premiumIdeas[0];
  generatedIdeas[1] = premiumIdeas[1];
  generatedIdeas[2] = premiumIdeas[2];
  generatedIdeas[3] = premiumIdeas[3];
  generatedIdeas[4] = premiumIdeas[4];
  generatedIdeas[5] = premiumIdeas[5];
  generatedIdeas[6] = premiumIdeas[6];
  generatedIdeas[7] = premiumIdeas[7];
  generatedIdeas[8] = premiumIdeas[8];
  generatedIdeas[9] = premiumIdeas[9];
  generatedIdeas[10] = premiumIdeas[10];
  generatedIdeas[11] = premiumIdeas[11];
  generatedIdeas[12] = premiumIdeas[12];
  generatedIdeas[13] = premiumIdeas[13];
  generatedIdeas[14] = premiumIdeas[14];

  MORE_IDEAS.forEach((idea, index) => {
    if (15 + index < generatedIdeas.length) {
      generatedIdeas[15 + index] = idea;
    }
  });

  // 50 Unique Niches for multi-model combination
  const NEW_NICHES = [
    "Real Estate Agents", "DTC E-commerce Brands", "Private Practice Therapists", "YouTube Video Creators",
    "Boutique Fitness Studios", "Premium Pet Services", "Remote Hybrid Workers", "Bootstrapped SaaS Founders",
    "Independent Restaurants", "Corporate Event Organizers", "Destination Wedding Services", "Gen-Z Retail Investors",
    "Aging-in-Place Seniors", "UI/UX Freelance Designers", "Indie Game Developers", "Smart Home Systems",
    "Zero-Waste Green Brands", "Urban Balcony Gardeners", "Bedroom Music Producers", "Niche Podcast Creators",
    "Crypto Web3 Projects", "No-Code Micro Saas Labs", "AI Prompt Engineering Agency", "DTC Supply Chains",
    "Online Course Coaches", "Artisanal Handmade Sellers", "Local Retail Showrooms", "Local SEO Client Hunter",
    "B2B Leads Prospecting", "Aesthetic Interior Designers", "Vintage Clothing Thrift Shops", "Corporate Wellness Planners",
    "Productivity Habits Coaching", "Custom API Connections", "Local Eco-Tourism Guides", "High Ticket Sales Reps",
    "Regional Language Schools", "Freelancer Cyber-Security Packs", "Clean Solar Consulting", "Virtual Reality Asset Devs",
    "Kids Coding Bootcamps", "Diet Meal Subscription Boxes", "Legal-Tech Document Helpers", "Organic Botanical Skincare",
    "Micro-Influencer Marketing agencies", "Customized Mechanical Keyboards", "Aesthetic Presentation Decks",
    "Neighborhood Delivery Couriers", "Meditation Apps Local Marketing", "Airbnb Cozy Accommodations"
  ];

  // 10 Unique Models/Templates representing growth trends in next 3-5 years
  const NEW_MODELS = [
    {
      type: "AI Workflow Engine",
      category: "Services",
      summary: "{niche} ke operational work ko smart AI integrations aur APIs se auto-pilot par set karein.",
      description: "Yeh ek custom specialized automation micro SaaS model hai jo {niche} ke routine workflows (invoices tracking, emails response coordination, document sorting) ko bina manual efforts ke run karta hai. Local businesses aur service providers isme manual repetitive tasks se chhutkara paate hain.",
      steps: [
        "Target {niche} ke common software tools aur systems ko understand karein.",
        "Custom APIs connects, AI auto-replies aur automated spreadsheets workflow design karein.",
        "Local businesses ko direct live demo aur speed enhancements package demonstrate pitch karein."
      ],
      earningPotential: "₹25,000 - ₹80,000 / month",
      startCost: "₹1000 - ₹5000",
      skillLevel: "Intermediate",
      timeToStart: "1-2 Weeks",
      bestFor: "Students, Freelancers, Tech enthusiasts",
      pros: ["Automated recurring income source", "Extremely high service value save client hours"],
      cautions: ["Requires active understanding of software APIs updates", "Outbound dynamic relationship with local brands initially required"],
      tags: ["ai-agent", "automation", "workflow", "services"]
    },
    {
      type: "Done-For-You Repurposing Agency",
      category: "Content Creation",
      summary: "{niche} ke raw media, portfolio ya long-form assets ko viral short reels aur posts me badlein.",
      description: "Niche content marketing model. {niche} professionals aur business owners ke historical video/text databases ko capture karke visually absolute stunning vertical reels, engaging visual grids aur newsletters curate karein.",
      steps: [
        "Clients ke historical content channels aur directories track examine karein.",
        "Short vertical segments, highly engaging custom hooks aur animations write up compile karein.",
        "Manage social templates with active calendar posting systems hands-off."
      ],
      earningPotential: "₹30,000 - ₹1,00,000 / month",
      startCost: "₹0",
      skillLevel: "Intermediate",
      timeToStart: "1 Week",
      bestFor: "Video Editors, Content Creators, Students",
      pros: ["Highly scalable work from anywhere structure", "Extremely massive market demand for vertical templates"],
      cautions: ["Needs sharp editorial sense of current media hooks metrics", "Client delivery deadlines must match standard protocols"],
      tags: ["content-marketing", "repurposing", "agency", "reels"]
    },
    {
      type: "Exclusive Mastermind Network",
      category: "Online Business",
      summary: "High-Signal paid community network platform for {niche} experts, builders aur seekers.",
      description: "Create a private paid membership channel (hosted on modern channels like Discord, Skool or Slack) dedicated strictly to high signal discussions inside {niche}. Members deal flows, expert guidelines, feedback templates share karte hain.",
      steps: [
        "Select dynamic hosting systems (Skool/Discord Group) configuration.",
        "Invite initial 5 core experts to publish high value insights, seed conversations.",
        "Promote community value through insightful targeted newsletter lists."
      ],
      earningPotential: "₹40,000 - ₹1,80,000 / month",
      startCost: "₹0",
      skillLevel: "Intermediate",
      timeToStart: "1-2 Weeks",
      bestFor: "Community Managers, Networkers, Influencers",
      pros: ["Phenomenal recurring monthly monetization margins", "Passive community-led growth driven by members interaction"],
      cautions: ["Strict selection requirements necessary to keep signal-to-noise ratio high", "Continuous community moderations, live AMAs scheduling required"],
      tags: ["mastermind", "community", "subscription", "niche-network"]
    },
    {
      type: "Low-Code Micro SaaS Tool",
      category: "Digital Products",
      summary: "{niche} ke complex calculations, reports aur daily logging ke liye customized single-page dashboard.",
      description: "Simplified single utility web tool that handles unique math formulas, formatting checks or daily progress charts specifically for {niche} operators. Eliminates tedious excel sheet rows with an appealing premium visual dashboard.",
      steps: [
        "Analyze {niche} operational formulas, templates and data processing needs.",
        "Deploy a simplified custom user interface using modern responsive web systems or no-code plugins.",
        "Market directly inside developer directories, subreddits and specialized groups."
      ],
      earningPotential: "₹50,000 - ₹2,50,000 / month",
      startCost: "₹1000 - ₹5000",
      skillLevel: "Advanced",
      timeToStart: "3-4 Weeks",
      bestFor: "No-code Creators, Developers, Students",
      pros: ["Passive recurrent subscription model", "Can be built completely using modern drag-and-drop tools"],
      cautions: ["Requires precise data accuracy checks inside backend math systems", "Consistent user feedback loop integration required in starting phases"],
      tags: ["micro-saas", "dashboard", "no-code", "software-tool"]
    },
    {
      type: "Hyper-Local Premium Marketplace",
      category: "Local Business",
      summary: "Your city ke verified and rated {niche} experts ki service directory booking portal.",
      description: "Local level aggregator model. City consumers face massive issues to find well-vetted professionals in {niche}. Build a local micro-platform and charge commission per successful direct booking connection.",
      steps: [
        "Onboard bottom 15 trusted verified local {niche} performers by physical vetting.",
        "Launch a clean mobile-friendly listings panel showing real client ratings.",
        "Drive geographical target promotions on social feeds strictly in local areas."
      ],
      earningPotential: "₹20,000 - ₹90,000 / month",
      startCost: "₹1000 - ₹5000",
      skillLevel: "Beginner",
      timeToStart: "1-2 Weeks",
      bestFor: "Marketing professionals, Networkers",
      pros: ["High physical direct authority in your regional locality", "Scales into a beautiful physical franchise branding"],
      cautions: ["Supplier quality regulation strictly managed to secure platform trust", "Initially takes physical outreach work to tie up standard vendors"],
      tags: ["marketplace", "local-aggregator", "booking-portal", "city-service"]
    },
    {
      type: "Cozy Premium Digital Assets Bundle",
      category: "Digital Products",
      summary: "Creative assets, templates, overlays aur presets bundle to help {niche} save hours.",
      description: "Premium downloadable packs specifically formulated matching aesthetic style guidelines inside {niche}. Curated visual mockups, Figma structures, high resolution asset assets package.",
      steps: [
        "Create high quality elements that look incredibly beautiful and polished.",
        "Build descriptive dynamic product page demonstrating live look-and-feel of items.",
        "List resources on global sales sites with elegant mockups. Use organic short reels showcase."
      ],
      earningPotential: "₹15,000 - ₹60,000 / month",
      startCost: "₹0",
      skillLevel: "Intermediate",
      timeToStart: "5-7 Days",
      bestFor: "Asset creators, graphic designers, UI experts",
      pros: ["Incredibly passive income streams peaking instantly", "Zero continuous maintenance or direct customer support required"],
      cautions: ["Product aesthetics standards must exceed standard free internet files", "Requires continuous dynamic keyword analytics of global store algorithms"],
      tags: ["design-pack", "assets", "creators", "gumroad"]
    },
    {
      type: "Consulting Audit & Fix Pack",
      category: "Freelancing",
      summary: "Actionable analytical scorecards aur troubleshooting review reports for {niche} systems.",
      description: "Specialized performance auditing. Review clients public online pages, systems or workspace parameters, formulate detailed color coded correction reports indicating precise performance bugs, load times, graphic flows.",
      steps: [
        "Select public profile listings or setups in {niche} with high user visibility.",
        "Formulate a beautiful PDF review highlighting top 10 mistakes and simple custom fixes.",
        "Pitch outline with live screen recorded clip, deliver premium detailed troubleshoot advice guides."
      ],
      earningPotential: "₹30,000 - ₹1,20,000 / month",
      startCost: "₹0",
      skillLevel: "Intermediate",
      timeToStart: "2-4 Days",
      bestFor: "Analytical minds, developers, specialized freelancers",
      pros: ["Premium project size scale with very high conversions to closed deals", "Extremely quick turnaround results build instant client trust"],
      cautions: ["Requires exact domain industry knowledge of conversion mechanics", "Needs highly polite, professional communication tone while presenting analysis"],
      tags: ["audits", "troubleshoot", "consulting", "high-ticket"]
    },
    {
      type: "Done-With-You Cohort Bootcamp",
      category: "Low Investment Ideas",
      summary: "Live interactive 2-weeks bootcamps teaching {niche} practical skills step-by-step.",
      description: "Say goodbye to pre-recorded video tutorials that people never complete. Conduct interactive online classes showing exact live screen examples, helping attendees get their first standard setups ready in single days.",
      steps: [
        "Formulate simple 4-part lecture plan showing direct action outcomes.",
        "Deploy a beautiful high-conversion visual enrollment page with live registration dates.",
        "Publish student feedback loops, visual portfolios constructed in cohort reviews."
      ],
      earningPotential: "₹20,000 - ₹75,000 / month",
      startCost: "₹0",
      skillLevel: "Beginner",
      timeToStart: "1 Week",
      bestFor: "Trainers, Students, Visual facilitators",
      pros: ["Very high completion rates resulting in beautiful authentic feedback", "Establishes your high premium authority inside the industry space"],
      cautions: ["Needs direct scheduling time commitments for live sessions", "Ensuring standard initial enrollment momentum takes focus"],
      tags: ["bootcamp", "live-cohort", "education", "low-investment"]
    },
    {
      type: "Elite Subscription Product Box",
      category: "Offline Business",
      summary: "Curated aesthetic physical boxes containing high utility premium products for {niche}.",
      description: "Monthly box subscription service. Every 30 days, pack handpicked high quality products, organic items, customized cards, or custom specialized items specifically matching the vibe of {niche} directly to customers houses.",
      steps: [
        "Source beautiful unique lifestyle goods directly from reliable wholesale vendors.",
        "Design eco-friendly minimal signature branded carrying box shapes.",
        "Market memberships dynamically using beautiful unboxing aesthetics videos on TikTok/Instagram feeds."
      ],
      earningPotential: "₹40,000 - ₹2,20,000 / month",
      startCost: "₹5000+",
      skillLevel: "Intermediate",
      timeToStart: "2-3 Weeks",
      bestFor: "Product curation fans, packaging visualizers, local physical players",
      pros: ["Stunning customer retention margins based on monthly surprises", "Amazing visual leverage for lifestyle viral content creation marketing"],
      cautions: ["Shipping networks logistics must maintain speed on fixed timelines", "Product price points require intense margins negotiations"],
      tags: ["subscription-box", "ecommerce", "offline-goods", "physical-pack"]
    },
    {
      type: "Automated Interactive Support Bot",
      category: "Mobile Earning",
      summary: "Instant conversational helpers config on WhatsApp/Telegram matching {niche} queries.",
      description: "Configure conversational AI bot adapters linking exact answers flow maps solving generic inquiries, appointments schedule or instant diagnostic checklists exclusively in Roman Hindi for {niche} seekers.",
      steps: [
        "Write visual flow path templates map of most repeating questions in {niche}.",
        "Deploy bot codes connecting webhook platforms with standard API channels.",
        "Onboard the clients with initial easy launch campaigns to trigger automated referrals."
      ],
      earningPotential: "₹15,000 - ₹55,000 / month",
      startCost: "₹1000 - ₹3000",
      skillLevel: "Intermediate",
      timeToStart: "3-5 Days",
      bestFor: "Low-code coders, automation experts, remote enthusiasts",
      pros: ["Passive maintenance fees with simple low-overhead operations", "Instant visual before-after value proof to businesses"],
      cautions: ["API standard tokens tracking costs require initial checks", "Client specific guidelines must map properly inside the logic grids"],
      tags: ["telegram-bot", "automation", "whatsapp-helper", "conversational-ai"]
    }
  ];

  // Dynamic loop to generate the 500 naye unique ideas (combinational indexes)
  for (let k = 0; k < 500; k++) {
    const niche = NEW_NICHES[k % NEW_NICHES.length];
    const model = NEW_MODELS[Math.floor(k / NEW_NICHES.length)];

    const id = `idea_${501 + k}`;
    const title = `${niche} ${model.type}`;
    const summary = model.summary.replace(/{niche}/g, niche);
    const description = model.description.replace(/{niche}/g, niche);
    const steps = model.steps.map(step => step.replace(/{niche}/g, niche));

    const idea: Idea = {
      id: id,
      title: title,
      category: model.category,
      summary: summary,
      description: description,
      steps: steps,
      earningPotential: model.earningPotential,
      startCost: model.startCost,
      skillLevel: model.skillLevel,
      timeToStart: model.timeToStart,
      bestFor: ['Students', 'Housewives', 'Professionals', 'Anyone'][k % 4],
      pros: model.pros,
      cautions: model.cautions,
      tags: [...model.tags, niche.toLowerCase().replace(/ /g, '-').split('-')[0]],
      relatedIdeaIds: []
    };
    generatedIdeas.push(idea);
  }

  const generateIds = generatedIdeas.map(i => i.id);
  generatedIdeas.forEach((idea, index) => {
    if (index < 500) {
      const r1 = generateIds[(Math.abs(index * 13) + 11) % 500];
      const r2 = generateIds[(Math.abs(index * 17) + 23) % 500];
      const r3 = generateIds[(Math.abs(index * 19) + 47) % 500];
      idea.relatedIdeaIds = [r1, r2, r3];
    } else {
      const r1 = generateIds[(Math.abs(index * 13) + 11) % 1000];
      const r2 = generateIds[(Math.abs(index * 17) + 23) % 1000];
      const r3 = generateIds[(Math.abs(index * 19) + 47) % 1000];
      idea.relatedIdeaIds = [r1, r2, r3];
    }
  });

  return generatedIdeas;
}

export const IDEAS = generateIdeas();

export const CATEGORIES = categories;
