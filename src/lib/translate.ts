// Translation map and helper functions for Roman Hindi (Hinglish)

export const translateCategory = (cat: string): string => {
  const map: Record<string, string> = {
    'All': 'Sabhi Ideas',
    'Online Business': 'Online Business',
    'Offline Business': 'Offline Business',
    'Mobile Earning': 'Mobile se Kamai',
    'Freelancing': 'Freelancing',
    'Content Creation': 'Content Creation',
    'Affiliate Marketing': 'Affiliate Marketing',
    'Digital Products': 'Digital Products',
    'Services': 'Services (Sevaayein)',
    'Local Business': 'Local Business',
    'Low Investment Ideas': 'Kam Investment Ideas',
  };
  return map[cat] || cat;
};

export const translateSkillLevel = (lvl: string): string => {
  const map: Record<string, string> = {
    'Beginner': 'Aasan (Beginner)',
    'Intermediate': 'Medium (Intermediate)',
    'Advanced': 'Expert (Advanced)',
  };
  return map[lvl] || lvl;
};

export const translateTimeToStart = (time: string): string => {
  return time
    .replace(/Days/i, 'Din')
    .replace(/Day/i, 'Din')
    .replace(/Weeks/i, 'Hafte')
    .replace(/Week/i, 'Hafta')
    .replace(/Months/i, 'Mahine')
    .replace(/Month/i, 'Mahina');
};

export const translateEarningPotential = (earning: string): string => {
  return earning
    .replace(/\/ month/i, '/ mahina')
    .replace(/- month/i, '- mahina');
};

export const translateBestFor = (bestFor: string): string => {
  // If list of comma separated, translate some common terms
  return bestFor
    .replace(/Students/i, 'Students')
    .replace(/Housewives/i, 'Housewives (Ghar baithe log)')
    .replace(/Professionals/i, 'Professionals')
    .replace(/Anyone/i, 'Sabhi ke liye')
    .replace(/Video editors/i, 'Video editors')
    .replace(/Motion creators/i, 'Motion creators')
    .replace(/Web designers/i, 'Web designers')
    .replace(/freelancers/i, 'Freelancers')
    .replace(/local micro agencies/i, 'Local micro agencies')
    .replace(/Commerce students/i, 'Commerce students')
    .replace(/visual creators/i, 'Visual creators')
    .replace(/teachers/i, 'Teachers')
    .replace(/Video edit experts/i, 'Video edit experts')
    .replace(/freelance script writers/i, 'Freelance script writers')
    .replace(/AI Art designers/i, 'AI Art designers')
    .replace(/Automobile lovers/i, 'Automobile lovers')
    .replace(/Creative writers/i, 'Creative writers')
    .replace(/Facebook pages managers/i, 'Facebook pages managers')
    .replace(/meme makers/i, 'Meme makers')
    .replace(/No-code software indie builders/i, 'No-code creators')
    .replace(/Local leads collectors/i, 'Local leads coordinators')
    .replace(/social ads runners/i, 'Social ads runners')
    .replace(/College student groups/i, 'College students')
    .replace(/young visual coders/i, 'Young coders')
    .replace(/Frontend developers/i, 'Frontend developers')
    .replace(/visual assets makers/i, 'Visual assets makers')
    .replace(/Outbound agency operators/i, 'Outbound agencies')
    .replace(/business freshers/i, 'Business freshers')
    .replace(/AR developers/i, 'AR developers')
    .replace(/high impact sales agents/i, 'Sales agents')
    .replace(/SEO specialists/i, 'SEO specialists')
    .replace(/technical content copywriters/i, 'Content writers')
    .replace(/Real estate enthusiast/i, 'Real estate lovers')
    .replace(/tourism planners/i, 'Tourism planners')
    .replace(/Logistics planners/i, 'Logistics managers')
    .replace(/brand deal agents/i, 'Brand deal agents')
    .replace(/Communications graduates/i, 'Communications graduates')
    .replace(/HR specialists/i, 'HR specialists')
    .replace(/Content copywriters/i, 'Content copywriters')
    .replace(/property agents beginners/i, 'Beginner property agents')
    .replace(/Fashion minds/i, 'Fashion enthusiasts')
    .replace(/sustainable lifestyle groups/i, 'Sustainable lifestyle groups')
    .replace(/Research experts/i, 'Research experts')
    .replace(/finance students/i, 'Finance students')
    .replace(/3d modelers/i, '3D modelers')
    .replace(/hardware geeks/i, 'Hardware geeks')
    .replace(/gaming enthusiasts/i, 'Gaming lovers')
    .replace(/Local brand makers/i, 'Local brand makers')
    .replace(/visual programmers/i, 'Web programmers')
    .replace(/No-code web builders/i, 'No-code web builders')
    .replace(/visual tool lovers/i, 'Visual tool lovers')
    .replace(/Events organizers/i, 'Events organizers')
    .replace(/travel guides/i, 'Travel guides')
    .replace(/coordinators/i, 'Coordinators')
    .replace(/Drone operators/i, 'Drone operators')
    .replace(/technical surveyors/i, 'Technical surveyors')
    .replace(/Directory builders/i, 'Directory builders')
    .replace(/indie bloggers/i, 'Indie bloggers')
    .replace(/Interior architects/i, 'Interior architects')
    .replace(/design draftsmen/i, 'Design draftsmen')
    .replace(/elderly care enthusiasts/i, 'Elderly care supporters')
    .replace(/Privacy geeks/i, 'Privacy geeks')
    .replace(/online brand consultants/i, 'Online brand consultants')
    .replace(/tech youth/i, 'Tech youth')
    .replace(/Notion masters/i, 'Notion masters')
    .replace(/visual organizing curators/i, 'Visual layout creators')
    .replace(/Passive investing seekers/i, 'Passive investors')
    .replace(/food franchise aspirants/i, 'Food business lovers')
    .replace(/College students/i, 'College students')
    .replace(/remote support workers/i, 'Remote workers')
    .replace(/housewives/i, 'Housewives (Ghar ke log)')
    .replace(/Moms clubs/i, 'Moms clubs')
    .replace(/community networkers/i, 'Community networkers')
    .replace(/home entrepreneurs/i, 'Home entrepreneurs')
    .replace(/Video repurposers/i, 'Video creators')
    .replace(/audio creators/i, 'Audio creators')
    .replace(/channel managers/i, 'Channel managers')
    .replace(/B2B sales managers/i, 'B2B sales managers')
    .replace(/eco designers/i, 'Eco designers')
    .replace(/wholesale curators/i, 'Wholesale curators')
    .replace(/Interior stylist aspirants/i, 'Interior designer lovers')
    .replace(/photography students/i, 'Photography students')
    .replace(/DIY bloggers/i, 'DIY bloggers')
    .replace(/Indie programmers/i, 'Indie programmers')
    .replace(/tech-savvy students/i, 'Tech-savvy students')
    .replace(/Wedding videographers/i, 'Wedding videographers')
    .replace(/smartphone creators/i, 'Smartphone creators')
    .replace(/event hosts/i, 'Event hosts')
    .replace(/Commercial helpers/i, 'Commercial helpers')
    .replace(/Service providers/i, 'Service providers');
};

const EN_DHI_GLOSSARY: Record<string, string> = {
  "Problem:": "Samasya (Problem):",
  "Target Audience:": "Target Audience (Kisko bechein):",
  "How It Works:": "Kaam Kaise Karta Hai (How It Works):",
};

export const translateTextDescription = (desc: string): string => {
  let result = desc;
  Object.entries(EN_DHI_GLOSSARY).forEach(([en, dhi]) => {
    result = result.replaceAll(en, dhi);
  });
  return result;
};

export const translateProOption = (pro: string): string => {
  const map: Record<string, string> = {
    'Flexible time': 'Kaam karne ka samay flexible hai',
    'Scalable': 'Ise bada business banaya ja sakta hai',
    'High demand': 'Is dhande ki bahut zyada demand hai',
    'Low risk': 'Bahut kam risk hai isme',
    'Extremely viral and scroll-stopping format': 'Socio media par tezi se viral hone wala format hai',
    'Requires zero physical inventory setup costs': 'Bina kisi physical stock ke shuru kar sakte hain',
    'Very high profit margins with zero hosting charges': 'Bina hosting ke bahut zyada profit margin',
    'AI tools keep delivery times to single days': 'AI tools se kaam sirf ek din me poora ho jata hai',
    'Excellent passive earnings potential after creation': 'Banane ke baad bina kaam kiye passive kamai',
    'Highly targeted demand peaking during board exams': 'Board exams ke samay iski demand sabsay zyada hoti hai',
    'Outstanding ticket scale, global founders budget clients': 'Bade clients aur global founders se acha paisa',
    'Very corporate and professional premium look': 'Corporate aur professional premium look milta hai',
    'Global direct international dollar earnings': 'Duniya bhar ke clients se seedhe dollars me kamai',
    '100% automated asset delivery maps': 'Digital files ki delivery poori tarah automated hai',
    'Explosive free organic shares and brand attention': 'Muft me organic shares aur tez reach milti hai',
    'Modern brands pay premium for direct connection with teenagers': 'Naye lifestyle brands youngsters tak pahuchne ke liye achha pay karte hain',
    'High potential user virality via organic peer downloads': 'Doston me share hone se tezi se download badhte hain',
    'Highly repetitive app usage parameters': 'Log is app ko baar baar use karte hain',
    'Direct metrics tracking: pay for positive registrations': 'Seedha result track hota hai, registration par hi kharch',
    'Fosters regional skill-building community models': 'Local area me skills sikhane wali community banti hai',
    'Awesome premium tap-experience upgrade': 'Modern NFC tap upgrade se customer khush ho jate hain',
    'Steady monthly hosting fee recurring revenue option': 'Regular monthly hosting fees se pakki kamai ka zariya',
    'Direct impact on job-conversions, high customer delight': 'Job milne ke chances badhte hain, customer khush hota hai',
    'Highly shareable portfolio products': 'Portfolio ko aasani se doston aur clients me share kar sakte hain',
    'Premium corporate retainers': 'Badi companies se har mahine pakki regular income',
    'Direct network building with global directors': 'Bade global directors ke sath sidha business network banta hai',
    'Unmatched wow-factor in commercial interactions': 'Business milne me zabardast "wow" impression padta hai',
    'Premium value perception allows high price requests': 'Premium image ki wajah se aap achha rate charge kar sakte hain',
    'Long lasting retainers agreements': 'Clients ke sath lambe samay tak kaam karne ka agreement',
    'Provides long term direct traffic increase proof': 'Long term me direct traffic badhne ka pakka saboot',
    'Phenomenal cash-flow yield margins': 'Zabardast cash-flow aur profit margins milte hain',
    'Aesthetic eco-tourism market is highly premium': 'Sunder eco-tourism market bahut premium hai',
    'Zero premium marketing costs required as creators promote directly on active reels': 'Marketing ka zero kharch kyunki creators reels par khud promote karte hain',
    'High margin emotional retail purchase habits': 'Emotional retail kharidari se bada profit margin milta hai',
    'Steady monthly corporate contract rates': 'Har mahine monthly corporate contract se fixed kamai',
    'Enhances team retention scores heavily': 'Employees ke kaam chhodne ki samasya door hoti hai',
    'Extremely vast user pool, rapid sale closes': 'Bahut bada customer base aur tezi se deal close hoti hai',
    'Can easily operate anywhere remotely': 'Ghar baithe ya kahin se bhi ise operate kar sakte hain',
    'Exceptional sustainability value, circular fashion': 'Eco-friendly aur sustainable fashion ko badhava milta hai',
    'Steady seasonal college graduates recurring flow': 'College passouts ke aane se lagatar business chalta rehta hai',
    'Zero physical production or stock inventory complications': 'Koi physical production ya inventory ka jhanjhat nahi',
    'High average premium pricing per subscription': 'Har monthly subscription par achha aur premium rate',
    'Extremely distinct hyper-premium bespoke hardware niche': 'Sabse alag aur premium custom hardware niche hai',
    'Outstanding social media video reactions appeal': 'Social media par video reactions se zabardast views aate hain',
    'Massive market adoption margins, highly scalable': 'Bazaari maang bahut zyada hai, asani se bada bana sakte hain',
    'Excellent localized utility value': 'Local area ke hisab se bahut zaroori aur useful dhanda hai',
    'Steady monthly subscription automated cash streams': 'Monthly subscription se har mahine automatic kamai',
    'Extremely low maintenance software requirements': 'Software badalne ya maintain karne ka kharch bilkul kam hai',
    'High value conversions stemming from decision-fatigue relief': 'Couples ka planning ka jhanjhat khatam hota hai, jis-se achha business milta hai',
    'Excellent opportunity to get commissions from partner venues': 'Partner venues (cafes, etc.) se achha commission kamane ka mauka',
    'Highly safety optimization driven corporate billing models': 'Safety checking ke liye corporate level par bade bills milte hain',
    'Bypasses slow physical ladders climbing setups': 'Seedhi chadhne ki mehnat aur khatre se bachata hai drone',
    'Massive traffic potential due to viral social tech lists': 'Viral tech lists se website par bhari traffic aata hai',
    'Extremely evergreen helpful asset': 'Sundar aur evergreen useful assets ban jate hain',
    'Incredibly helpful, highly rewarding, noble purpose': 'Bahut zyada madadgaar, dilon ko chhune wala accha kaam hai',
    'Growing market segment as urban aging rises': 'Shahron me buzurgo ki sankhya badhne se tezi se badhta market',
    'Increasing demand as cancel-culture risk profiles highlight globally': 'Internet publicity ke khatre badhne se iski maang lagatar badh rahi hai',
    'Strict corporate client confidentiality command premium price models': 'Confidential kaam hone ki wajah se clients premium price dete hain',
    'Outstanding peer recommendations growth loops': 'Ek customer dusre ko khud recommend karta hai',
    'Very specialized inclusive niche with lower competition': 'Bilkul alag niche hai aur competition bilkul na ke barabar hai',
    'Outstanding passive earning potential with zero labor requirements': 'Bina zyada mehnat ke badhiya passive earning ka dhanda',
    'Real-time accurate stocking telemetry displays details': 'Stock ki sahi jankari mobile screen par hi dikh jati hai',
    'Extremely simple setup, no coding knowledge required': 'Bahut aasan setup hai, coding sikhne ki koi zaroorat nahi hai',
    'Vast pool of small local lifestyle store owners searching for help': 'Chhote business owners aur boutiques ko lagatar helpline chahiye hoti hai',
    'Excellent recursive business cash flow model': 'Ghar baithe pakka monthly subscription milta rehta hai',
    'Reduces plastic carbon foot prints sustainably': 'Plastic pollution kam karne me madad milti hai',
    'Fantastic opportunity for revenue splits arrangements with creators': 'Creators ke sath ad income ya revenue share karne ka badiya mauka',
    'Multiply content reach exponentially without filming again': 'Bina naye video banaye reach ko kai guna badhayein',
    'Tremendous physical ticket size volumes orders potentials': 'Bulk orders milne se bade paimane par mota maza aata hai',
    'Aligned to high priority corporate environment compliant policies': 'Green policies ke sath fit baithta hai CSR funds ke liye',
    'Client funds the furnishings materials purchases while you get design setups charges': 'Sajaane ka saara kharch client ka hoga aur aapko design setup fees milegi',
    'Insanely strong visual proof of immediate book rate increase': 'Design change hote hi bookings ka rate fast badh jata hai',
    'Extremely fast iteration velocity allows running parallel projects': 'Tezi se kaam hone ki wajah se ek sath kai projects kar sakte hain',
    'Fills block-buster demand gap in digital creations markets': 'Market me early startup ideas check karne ke liye iski bhari demand hai'
  };
  return map[pro] || pro;
};

export const translateCautionOption = (caution: string): string => {
  const map: Record<string, string> = {
    'Competition is high': 'Is field me competition bahut high hai',
    'Requires patience': 'Safar aur sabr rakhna zaroori hai',
    'Consistency needed': 'Lagatar mehnat aur consistency chahiye',
    'Typography custom matching takes manual tracking': 'Custom typography design me manually thoda dhyan dena padega',
    'Must stay updated with social media design trends': 'Social media trends ke mutabiq chalna zaroori hai',
    'Outbound client persuasion skills required initially': 'Shuruaat me clients ko samjhane ki thodi skill chahiye',
    'Basic local domain setup assistance required': 'Domain aur local server setup me thodi madad lag sakti hai',
    'Need exact NCERT mapping precision, zero errors allowed': 'Board syllabus ke mutabiq exact notes hone chahiye, galati ki koi gunjaish nahi hai',
    'Initial organic views acquisition builds momentum': 'Shuru me organic views aane me thoda waqt lag sakta hai',
    'Requires clean storytelling clarity': 'Kahani ko dhang se dikhane ki acchi samajh honi chahiye',
    'Changes handling takes multiple feedback cycles': 'Client ke changes aur feedback coordinate karne me time lagta hai',
    'Automotive active trademark logo bounds precautions': 'Car manufacturers ke direct logos aur trademark ka dhyan rakhein',
    'Needs high aesthetic screen appeal differences': 'Aesthetic design aur wallpapers ki quality bohot high honi chahiye',
    'Legal compliance borders and brand tone protections mandatory': 'Legal rules aur brand ki safety boundaries ka dhyan rakhein',
    'Must stay active on daily internet slangs changes': 'Social media trends ki aam bhasha (slang) se humesha up-to-date rahein',
    'Needs clear transaction verification methods instruction': 'Transaction check karne ka tareeqa bilkul saaf rakhna hoga',
    'Server integrations takes learning curves': 'Database aur server options setup karne me time lag sakta hai',
    'Lead conversions need smooth text templates follow-ups': 'Leads ko client me badalne ke liye WhatsApp messages bhejne honge',
    'Ad spend checks need precise calculations balance': 'Ads badhane ke budget me bariki se calculation karni padegi',
    'Check device compatibility during hardware tap trials': 'Sabhi mobiles me physical chip scan ho rahi hai ya nahi, check karein',
    'Restaurant staff must know how to explain to elder customers': 'Cafe ke staff ko bade-bujurg customers ko ise samjhana padega',
    'Requires precise screen resize adaptation verification': 'Har mobile aur system me layout barabar chal raha hai, check karein',
    'Requires clear content layout inputs from the job candidate': 'Umeedwar se unka sahi experience aur bio details dhang se lein',
    'Email deliverability rules DNS optimizations knowledge is must': 'Emails spam folder me na jayein, iske liye DNS configure seekhna hoga',
    'Needs deep interest alignment for quality matches': 'Interview guest aur podcast host ke interest aapas me milne chahiye',
    'Platform access rates depends on light conditions': 'AR features dhang se chalne ke liye acchi light honi zaroori hai',
    'AR parameters calibration requires technical practice': '3D overlay aur camera mapping ke liye thodi technical practice chahiye',
    'Requires deep subject validation checking to write trustworthy tutorials': 'Trustworthy blogs likhne ke liye topics ki pehle sahi research karein',
    'SEO search impact is slow-building': 'Google SEO ka result aane me thoda waqt (slow build) lagta hai',
    'Check local safety, water buffer loops and terrain security patterns': 'Zameen ki safety aur paani ki suvidha confirm karni zaroori hai',
    'Requires physical inspection and setup effort': 'Kabins banwane aur zameen check karne me physical mehnat lagegi',
    'Packaging design presentation must remain exceptional': 'Box aur packing ka design bilkul premium aur sundar hona chahiye',
    'Returns handle protocols must compile neatly': 'Return aane wale products ki clean policy setup karni padegi',
    'Needs highly adaptable understanding of team workflows (jira, slack, notion platforms)': 'Aapko work digital platforms jaise Slack aur Jira ka acha gyaan hona chahiye',
    'Highly communication active responsibility': 'Ye kaam poori tarah communication aur active messaging par chalta hai',
    'Listing styles must strictly verify against factual realities of spaces': 'Ghar ka layout aur pictures bilkul real aur sachhi honi chahiye',
    'Requires persistent outreach email lists building': 'Brokers aur developers ko dhoondhne ke liye lagatar contact karke bhejte rehna hoga',
    'Maintain neat, absolute hygiene levels, flawless dry wash system': 'Kapdo ki dry cleaning aur safai poori tarah hygienic honi chahiye',
    'Securing clothes from tears needs clear deposit rules': 'Kapde kharab ya phatne se bachane ke liye security deposit zaroori hai',
    'Demands 100% facts correctness and in depth knowledge': 'Newsletters me di gayi knowledge bilkul thik aur barik honi chahiye',
    'Building trust credentials takes initial time': 'Investors ka trust jitne me shuruaat me thoda samay lagta hai',
    'Needs precise calibration knowledge of 3D printers and plastics': '3D printing machine aur plastic chemicals ka gyaan hona chahiye',
    'Each custom design cycle requires unique CAD updates': 'Har ek individual customer ke hisab se design badalna padta hai',
    'Requires secure privacy database protection on scanner screen': 'Owner ki details safe rehne ke liye simple privacy rules lagayein',
    'Print hardware barcode durability should be durable': 'Printeble tags ki printing high quality ho jo barish aur dhul me na mite',
    'Requires absolute high level security protocols for financial records': 'Logon ke financial records ki security par sabse jada dhyan dein',
    'Constant target search outreach in indie circles is target parameter': 'Social networks aur coding circles me lagatar marketing karni hogi',
    'Last minute restaurant slot cancellations require solid backups': 'Aakhiri waqt par cafe/restaurant cancel hone par backup slots rakhein',
    'Client specific food alignments or allergies checks essential': 'Khana mangwane se pehle kisi allergy ka dhyan rakhein',
    'Must conform strictly to municipal drone airspace regulations': 'Drone udaye jaane ke area ke sarkari rules ka poora dhyan rakhein',
    'Takes skill to evaluate technical panel crack reports': 'Solar panel cracks check karne ke liye thodi training zaroori hai',
    'Link structures require active periodic manual maintenance': 'Directory links regular check karne padenge taaki koi link broke na ho',
    'Competitor models dynamic changes take observation': 'Bazaar me dusre free directories par nazar rakhni hogi',
    'Client design accuracy checks are critical for life safety': 'Bathroom aur stairs grips bilkul standard hona chahiye safety ke liye',
    'Requires trusted regional physical plumbers and carpenters contacts': 'Aapke paas achhe aur trusted local mistri aur carpenters hone chahiye',
    'Must obtain completely secure limited permission access parameters safely': 'Client ke purane social accounts check karte waqt dhyan se kaam karein',
    'Some old data requires direct platform API reporting to clear': 'Kuch purani posts delete karne me platform support se baat karni pad sakti hai',
    'Templates formulas are complex, need robust initial checkups': 'Notion formulas aur databases shuruaat me ache se configure karein',
    'Requires active dynamic showcase videos explaining the workflow': 'Logon ko samjhane ke liye active video tutorials banane padenge',
    'High initially required physical capital input for standard smart machinery': 'Shuruaat me smart vending machines kharidne ke liye paise lagenge',
    'Finding high-traffic legal spatial placements takes negotiation effort': 'Co-working spaces ya gym owners ke sath deal negotiate karni padegi',
    'Requires consistent prompt chat responses during customer business hours': 'Customers ke message aane par fatafat reply dena hoga',
    'Managing payment validations correctly needs close tracking': 'Boutique payments aur advance details ko dhang se confirm karein',
    'Ensuring high standard bio safe medical sanitization checkups after each return': 'Har baar khilona wapas aane par sanitization bahot dhyan se karein',
    'Handling missing small toy parts require backup inventories stock': 'Laapata hone wale chhote parts ke liye backup stock rakhna zaroori hai',
    'Must obtain formal legal publishing content authorization contracts': 'YouTube creators se permission aur revenue agreement legal sign karein',
    'Ensuring natural regional cultural phrases mapping to avoid dry robotic voices': 'Dhang ki regional translations use karein taaki awaz robotic na lage',
    'Maintaining delivery timings during bulk corporate cycles': 'Teej-tyoharo par bulk orders sahi samay par deliver karna hoga',
    'Keeping customizable stamp quality consistent': 'Standard stamps aur logos ki print clear honi chahiye',
    'Strict coordination inside constrained budgets with local carpenters': 'Karigaro se tay budget ke andar kaam karwane ki aadat honi chahiye',
    'Must understand short-term rental sturdy furniture standards': 'Airbnb ke furniture ka mazboot aur long-lasting hona zaroori hai',
    'Requires meticulous knowledge of structural error debugs details': 'Web apps setup karne me aane wale errors ko solve karna aana chahiye',
    'Ensure accurate expectation margins set to founders early': 'Founders ko shuruaat me hi batayein ki code me kya ho sakega aur kya nahi',
    'Rooftop working safety processes strict protocols required': 'Chatt par kaam karte waqt safety equipment ka istemaal zaroori hai',
    'Careful installation glass protection while cleanups': 'Solar panels ke kach ko saaf karte waqt unhe phatne se bachana zaroori hai'
  };
  return map[caution] || caution;
};
