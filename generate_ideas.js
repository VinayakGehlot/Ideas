import fs from 'fs';

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

const generatedIdeas = [];
let idCounter = 1;

for (let i = 0; i < 500; i++) {
  const category = categories[i % categories.length];
  const template = templates[i % templates.length];
  const specific = specificIdeas[i % specificIdeas.length] + (i >= specificIdeas.length ? ` ${Math.floor(i / specificIdeas.length) + 1}` : '');
  
  const title = `${template.titlePrefix} ${specific} ${template.titleSuffix}`.trim();
  
  const idea = {
    id: `idea_${idCounter++}`,
    title: title,
    category: category,
    summary: template.summary.replace('{title}', specific),
    description: template.description.replace('{title}', specific),
    steps: template.steps,
    earningPotential: ['10k - 20k / month', '20k - 50k / month', '50k+ / month'][Math.floor(Math.random() * 3)],
    startCost: ['₹0', '₹1000 - ₹5000', '₹5000+'][Math.floor(Math.random() * 3)],
    skillLevel: ['Beginner', 'Intermediate', 'Advanced'][Math.floor(Math.random() * 3)],
    timeToStart: ['1 Day', '1 Week', '1 Month'][Math.floor(Math.random() * 3)],
    bestFor: ['Students', 'Housewives', 'Professionals', 'Anyone'][Math.floor(Math.random() * 4)],
    pros: ['Flexible time', 'Scalable', 'High demand', 'Low risk'].sort(() => 0.5 - Math.random()).slice(0, 2),
    cautions: ['Competition is high', 'Requires patience', 'Consistency needed'].sort(() => 0.5 - Math.random()).slice(0, 2),
    tags: [category.toLowerCase().replace(' ', '-'), specific.toLowerCase().split(' ')[0]],
  };
  generatedIdeas.push(idea);
}

// Add some handcrafted high quality ones at the start to make it look great
const premiumIdeas = [
  {
    id: "premium_1",
    title: "Instagram Page se Affiliate Marketing",
    category: "Affiliate Marketing",
    summary: "Ek niche Instagram page banayein aur affiliate links ke through products promote karein.",
    description: "Instagram par ek specific topic (jaise gym, motivation, ya gadgets) par page banayein. Reels aur posts ke through audience grow karein aur bio me ya story me affiliate links add karein. Jab koi purchase karega, aapko commission milega.",
    steps: [
      "Ek profitable niche select karein (e.g., Tech, Fitness).",
      "Daily 2-3 high-quality Reels upload karein.",
      "Amazon Associates ya ClickBank join karein.",
      "Stories me link share karein."
    ],
    earningPotential: "₹20,000 - ₹1,00,000+ / month",
    startCost: "₹0 (No investment)",
    skillLevel: "Beginner",
    timeToStart: "Immediate to start, 1-2 months to earn",
    bestFor: "Students, Content Creators",
    pros: ["Passive income potential", "Free to start"],
    cautions: ["Growth me time lag sakta hai", "Consistent rehna padega"],
    tags: ["instagram", "affiliate", "mobile", "no-investment"]
  },
  {
    id: "premium_2",
    title: "No-Code Web Design Service (Framer/Webflow)",
    category: "Services",
    summary: "Bina coding ke Framer ya Webflow use karke startups ke liye websites banayein.",
    description: "Aaj kal startups ko fast aur beautiful websites chahiye hoti hain. Framer ek tool hai jisse bina code kiye premium sites banti hain. Aap as a freelancer in platforms ko seekhkar global clients ko apni services offer kar sakte hain.",
    steps: [
      "Framer ya Webflow ke tutorials YouTube se dekhein.",
      "3-4 dummy websites banakar portfolio ready karein.",
      "Twitter (X) aur LinkedIn par founders ko DM karein.",
      "Upwork par profile banakar apply karein."
    ],
    earningPotential: "₹50,000 - ₹3,00,000 / month",
    startCost: "₹0 (Sirf Internet chahiye)",
    skillLevel: "Intermediate",
    timeToStart: "1-2 Weeks to learn",
    bestFor: "Designers, Students, Freelancers",
    pros: ["High paying clients", "Global reach"],
    cautions: ["Client design changes maangte hain", "English communication achi honi chahiye"],
    tags: ["freelancing", "design", "high-income"]
  }  
];

// Replace first 2 with premium ones
generatedIdeas[0] = premiumIdeas[0];
generatedIdeas[1] = premiumIdeas[1];

const generateIds = generatedIdeas.map(id => id.id);
// assign related ideas
generatedIdeas.forEach(idea => {
    const randomIds = [];
    for(let i=0; i<3; i++) {
        let r = generateIds[Math.floor(Math.random()*generateIds.length)];
        while(r === idea.id) {
            r = generateIds[Math.floor(Math.random()*generateIds.length)];
        }
        randomIds.push(r);
    }
    idea.relatedIdeaIds = randomIds;
});

if (!fs.existsSync('src/data')) {
    fs.mkdirSync('src/data');
}
fs.writeFileSync('src/data/ideas.json', JSON.stringify(generatedIdeas, null, 2));
console.log('Ideas generated successfully in src/data/ideas.json');
