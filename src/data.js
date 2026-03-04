export const siteData = {
  company: {
    name: "Visual Edit Studio",
    tagline: "We Build Authority & Scale Brands.",
    description: "Creative and performance-driven studio. We build authority for professionals and scale revenue for businesses.",
    stats: { clients: "750+", years_impact: "5+", avg_roi_spike: "4x" },
    contact: {
      phone: "+91 8961633327",
      email: "hr.veseditstudio@gmail.com",
      address: "Charubala Apartment, Thakurpukur, Kolkata, West Bengal 700063",
      response_time: "Under 2 hours",
      social: {
        instagram: "https://instagram.com/visualeditstudio",
        facebook: "https://facebook.com/visualeditstudio",
        linkedin: "https://linkedin.com/company/visualeditstudio",
        twitter: "https://twitter.com/visualeditstudio",
        whatsapp: "https://wa.me/918961633327"
      }
    }
  },
  navigation: {
    links: [
      { label: "Home", href: "/" },
      { label: "VES Branding", href: "/branding" },
      { label: "VES Business", href: "/business" },
      { label: "Courses", href: "/courses" },
      { label: "Contact", href: "#contact" }
    ],
    cta: "Start Growing"
  },
  divisions: {
    ves_branding: {
      title: "VES Branding",
      subtitle: "Personal branding for high-impact professionals.",
      hero_label: "For Doctors & Coaches",
      description: "For the last 5+ years, VES Branding has worked exclusively with doctors — helping them build strong trust, authority, ethical digital presence, and consistent business growth.",
      target_audience: "Doctors, Coaches, Professionals",
      clients_count: "750+ doctors across India",
      trusted_clients: [
        "Dr. Sapna Kaswan", "Dr. Deepti Arora", "Dr. Saqlain Mohamed",
        "Dr. Md Rizwan", "Vedgarbha Ayurveda", "Dr. Sunny Khurana"
      ],
      services: [
        { icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" /></svg>`, title: "Content Strategy", desc: "Customized monthly content plans that resonate with your audience." },
        { icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.89 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.89l12.673-12.673Zm0 0L19.5 7.125" /></svg>`, title: "Scriptwriting", desc: "Professional scripts crafted to communicate authority and trust." },
        { icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 6.75v9a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>`, title: "Reels Editing", desc: "High-quality short-form video editing that drives engagement." },
        { icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.671ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.546L6.166 4.364" /></svg>`, title: "SEO Captions", desc: "Optimized captions that boost discoverability across platforms." },
        { icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>`, title: "Medical Compliance", desc: "Ethical and compliant branding tailored for healthcare professionals." }
      ],
      videos: [
        { src: '/doctors video/4k colour.mp4', label: 'Doctor' },
        { src: '/doctors video/Doctor demo.mp4', label: 'Doctor' },
        { src: '/doctors video/medical important topic.mp4', label: 'Doctor' },
      ],
      youtube_videos: [
        { id: "M7lc1UVf-VE", title: "Dr. Aditya | Personal Branding", specialty: "Dermatology · Mumbai", views: "142K views" },
        { id: "kJQP7kiw5Fk", title: "Dr. Kapoor | Medical Authority", specialty: "Orthopedics · Pune", views: "85K views" },
        { id: "tPEE9ZwTmy0", title: "Dr. Verma | Clinic Growth", specialty: "Cosmetology · Delhi", views: "210K views" },
        { id: "3JZ_D3ELwOQ", title: "Dr. Reddy | Clinical Success", specialty: "Cardiology · Hyderabad", views: "65K views" },
        { id: "dQw4w9WgXcQ", title: "Dr. Sharma | Branding Masterclass", specialty: "Oncology · Bengaluru", views: "115K views" }
      ],
      posters: [
        { src: "https://res.cloudinary.com/debvroycl/image/upload/v1772431725/ves5_ecg7ou.jpg", alt: "Client Poster 1", title: "Clinic Launch Promo" },
        { src: "https://res.cloudinary.com/debvroycl/image/upload/v1772431725/ves9_o3twjb.jpg", alt: "Client Poster 2", title: "Health Awareness Campaign" },
        { src: "https://res.cloudinary.com/debvroycl/image/upload/v1772431725/ves8_fzaswv.jpg", alt: "Client Poster 3", title: "Medical Seminar Event" },
        { src: "https://res.cloudinary.com/debvroycl/image/upload/v1772431725/ves3_xd9rvo.jpg", alt: "Client Poster 4", title: "Doctor Profile Showcase" },
        { src: "https://res.cloudinary.com/debvroycl/image/upload/v1772431725/ves6_fuwv3p.jpg", alt: "Client Poster 5", title: "Wellness Package" },
        { src: "https://res.cloudinary.com/debvroycl/image/upload/v1772431725/ves7_zgv6fs.jpg", alt: "Client Poster 6", title: "Expert Consultation" },
        { src: "https://res.cloudinary.com/debvroycl/image/upload/v1772436066/ves_20_gffmxe.png", alt: "Client Poster 7", title: "Brand Showcase" },
        { src: "https://res.cloudinary.com/debvroycl/image/upload/v1772431725/ves10_mxy3fr.jpg", alt: "Client Poster 8", title: "Digital Presence" },
        { src: "https://res.cloudinary.com/debvroycl/image/upload/v1772431724/ves2_tzkxlc.jpg", alt: "Client Poster 9", title: "Marketing Campaign" },
        { src: "https://res.cloudinary.com/debvroycl/image/upload/v1772431724/ves11_l8yffv.jpg", alt: "Client Poster 10", title: "Social Media Strategy" },
        { src: "https://res.cloudinary.com/debvroycl/image/upload/v1772431724/ves1_nr5cu9.jpg", alt: "Client Poster 11", title: "Authority Building" }
      ],
      video_categories: [
        { category: "Healthcare", title: "Medical Branding", client_type: "Healthcare Professional", color: "#0088aa" },
        { category: "Education", title: "Educational Content", client_type: "Learning Institute", color: "#006688" },
        { category: "Beauty", title: "Beauty Tutorial", client_type: "Makeup Artist", color: "#004466" },
        { category: "Portfolio", title: "VES Showcase", client_type: "VES Brand", color: "#0088aa" },
        { category: "Lifestyle", title: "Astrology Content", client_type: "Spiritual Guide", color: "#005577" },
        { category: "Fitness", title: "Fitness Coaching", client_type: "Personal Trainer", color: "#007799" }
      ]
    },
    ves_business: {
      title: "VES Business",
      subtitle: "Performance marketing for businesses ready to scale.",
      hero_label: "For Agencies & Scale",
      description: "Performance marketing and ad production for businesses ready to scale. We turn viewers into high-ticket clients through data-driven visual strategy.",
      target_audience: "Agencies, Businesses, E-commerce",
      notable_clients: ["Ayurnnath", "Suvankar Saha"],
      services: [
        { icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" /></svg>`, title: "Meta Ads", desc: "High-converting Facebook and Instagram ad campaigns that drive real revenue." },
        { icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22M21.375 8.625l-.75-3.375-3.375-.75" /></svg>`, title: "Google Ads", desc: "Search and display campaigns that capture intent and convert at scale." },
        { icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 6.75v9a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>`, title: "Ad Film Production", desc: "Cinematic ad videos that stop the scroll and demand attention." },
        { icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>`, title: "Funnel Strategy", desc: "End-to-end funnel systems engineered for maximum conversion." },
        { icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.3A6 6 0 0 1 2.27 15.6a6 6 0 0 1 7.3-5.842M15.59 14.37a6 6 0 0 0 5.84-7.3 6 6 0 0 0-7.3-5.84 6 6 0 0 0-5.842 7.3M15.59 14.37A6.002 6.002 0 0 0 9.75 9.75" /></svg>`, title: "Brand Campaigns", desc: "Full rebrand and awareness campaigns that transform market positioning." }
      ],
      video_categories: [
        { category: "Fitness", title: "Gym Promo Video", client_type: "Fitness Center", color: "#0088aa" },
        { category: "Fashion", title: "Fashion Campaign", client_type: "Style Studio", color: "#006688" },
        { category: "Food & Beverage", title: "Cooking Show", client_type: "Food Channel", color: "#004466" },
        { category: "Corporate", title: "VES Business Reel", client_type: "VES Brand", color: "#0088aa" },
        { category: "Commercial", title: "Business Promo", client_type: "Corporate Client", color: "#005577" },
        { category: "Corporate", title: "Business Ad Film", client_type: "Enterprise", color: "#007799" }
      ]
    }
  },
  case_studies: [
    { client: "TechCorp", type: "Meta Ads + Funnel", result: "4x ROAS", detail: "Scaled from $5K to $45K/month in revenue within 90 days using optimized ad funnels." },
    { client: "Dr. Arjun", type: "Personal Branding", result: "10K+ Followers", detail: "Built a professional brand from scratch, reaching 10K engaged followers in 60 days." },
    { client: "StyleHub", type: "E-Commerce Ads", result: "320% Revenue", detail: "Complete Meta & Google Ads strategy that tripled online store revenue quarter-over-quarter." },
    { client: "FinAdvisor", type: "LinkedIn Growth", result: "50K Reach", detail: "Built a dominant LinkedIn presence that generates consistent inbound leads weekly." },
    { client: "SaaS Pro", type: "Google Ads", result: "2.1x Pipeline", detail: "Strategic Google Ads restructure that doubled qualified pipeline in under 45 days." },
    { client: "FreshBite", type: "Full Rebrand", result: "8x Engagement", detail: "Complete brand overhaul including visual identity and social presence transformation." }
  ],
  testimonials: [
    { name: "Rahul Mehta", role: "Founder, TechCorp", quote: "VES transformed our ad strategy completely. We went from burning money to printing it. The ROI speaks for itself." },
    { name: "Dr. Arjun Sharma", role: "Healthcare Professional", quote: "I never thought personal branding could change my career this much. VES made me the go-to authority in my field." },
    { name: "Priya Kapoor", role: "CEO, StyleHub", quote: "The team at VES doesn't just run ads — they engineer growth systems. Our revenue tripled in one quarter." },
    { name: "Vikram Singh", role: "Financial Advisor", quote: "From zero online presence to 50K reach in weeks. VES understands how to build trust at scale." }
  ],
  courses: [
    {
      id: "personal-branding-masterclass",
      title: "Personal Branding Masterclass",
      description: "Learn how to build a powerful personal brand that attracts high-ticket clients and establishes you as an authority in your niche.",
      instructor: "VES Experts",
      duration: "4 Weeks",
      level: "Beginner to Advanced",
      price: "$299",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "meta-ads-blueprint",
      title: "The Ultimate Meta Ads Blueprint",
      description: "Master Facebook and Instagram advertising. Learn the exact strategies we use to generate 4x+ ROAS for our agency clients.",
      instructor: "VES Experts",
      duration: "6 Weeks",
      level: "Intermediate",
      price: "$499",
      image: "https://images.unsplash.com/photo-1432888117426-1d5ac0c@auto=format&fit=crop&q=80&w=800" // Fallback style image
    },
    {
      id: "content-creation-system",
      title: "Content Creation System",
      description: "A complete workflow for scripting, shooting, and editing high-converting vertical video content (Reels/Shorts/TikTok) in under 2 hours a week.",
      instructor: "VES Experts",
      duration: "3 Weeks",
      level: "All Levels",
      price: "$199",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
    }
  ]
};
