
export interface Professional {
    id: string;
    name: string;
    category: string;
    location: string;
    experience: number;
    rating: number;
    reviewCount: number;
    startingPrice: number;
    currency: string;
    imageUrl: string;
    tagline: string;
    isVerified: boolean;
    isFeatured: boolean;
    // New fields for profile page
    about?: string;
    services?: string[];
    eventTypes?: string[];
    portfolio?: string[];
}

export const PROFESSIONALS: Record<string, Professional[]> = {
    photography: [
        {
            id: "p1",
            name: "Lens & Lights Studio",
            category: "Photography",
            location: "New York, NY",
            experience: 8,
            rating: 4.9,
            reviewCount: 124,
            startingPrice: 1500,
            currency: "Rs. ",
            imageUrl: "https://images.unsplash.com/photo-1554048612-387768052bf7?auto=format&fit=crop&q=80&w=800",
            tagline: "Capturing moments that last a lifetime.",
            isVerified: true,
            isFeatured: true,
            about: "At Lens & Lights Studio, we believe every picture tells a story. With over 8 years of experience in capturing weddings, corporate events, and personal portraits, we bring a cinematic and storytelling approach to photography. Our team uses top-of-the-line equipment to ensure every detail of your special day is preserved in high resolution.",
            services: ["Wedding Photography", "Engagement Shoots", "Corporate Events", "Portrait Sessions", "Photo Albums"],
            eventTypes: ["Wedding", "Corporate", "Birthday", "Anniversary"],
            portfolio: [
                "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1511285560982-1356c11d4606?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1554048612-387768052bf7?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1520854221250-8cbfd21fc220?auto=format&fit=crop&q=80&w=800"
            ]
        },
        {
            id: "p2",
            name: "Elena Rodriguez Photography",
            category: "Photography",
            location: "Brooklyn, NY",
            experience: 5,
            rating: 4.8,
            reviewCount: 86,
            startingPrice: 950,
            currency: "$",
            imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
            tagline: "Natural light specialist for weddings.",
            isVerified: true,
            isFeatured: false,
            about: "I specialize in natural light photography that captures the raw emotion and beauty of your event. My style is unobtrusive and documentary, perfect for those who want candid and authentic memories.",
            services: ["Wedding Photography", "Elopements", "Couple Portraits"],
            eventTypes: ["Wedding", "Elopement", "Engagement"],
            portfolio: [
                "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1505932794465-147d1f1b2c97?auto=format&fit=crop&q=80&w=800"
            ]
        },
        {
            id: "p3",
            name: "Candid Snaps",
            category: "Photography",
            location: "Queens, NY",
            experience: 3,
            rating: 4.5,
            reviewCount: 42,
            startingPrice: 600,
            currency: "$",
            imageUrl: "https://images.unsplash.com/photo-1520854221250-8cbfd21fc220?auto=format&fit=crop&q=80&w=800",
            tagline: "Fun and candid event photography.",
            isVerified: false,
            isFeatured: false,
            about: "Fun, vibrant, and energetic photography for your parties and social gatherings. We make sure to capture the smiles and the laughter.",
            services: ["Party Photography", "Social Events"],
            eventTypes: ["Birthday", "Graduation", "Reunion"],
            portfolio: [
                "https://images.unsplash.com/photo-1520854221250-8cbfd21fc220?auto=format&fit=crop&q=80&w=800"
            ]
        },
        {
            id: "p4",
            name: "Prestige Portraits",
            category: "Photography",
            location: "Manhattan, NY",
            experience: 12,
            rating: 5.0,
            reviewCount: 310,
            startingPrice: 3000,
            currency: "$",
            imageUrl: "https://images.unsplash.com/photo-1452587925703-feed75372be5?auto=format&fit=crop&q=80&w=800",
            tagline: "Award-winning high fashion style imagery.",
            isVerified: true,
            isFeatured: true,
            about: "High-end editorial style photography for the most luxurious events. Featured in Vogue and Harper's Bazaar.",
            services: ["Editorial Photography", "Luxury Weddings", "Fashion Shoots"],
            eventTypes: ["Wedding", "Gala", "Fashion Show"],
            portfolio: [
                "https://images.unsplash.com/photo-1452587925703-feed75372be5?auto=format&fit=crop&q=80&w=800"
            ]
        }
    ],
    videography: [
        {
            id: "v1",
            name: "Cinematic Wedding Films",
            category: "Videography",
            location: "Los Angeles, CA",
            experience: 7,
            rating: 4.9,
            reviewCount: 95,
            startingPrice: 2000,
            currency: "$",
            imageUrl: "https://images.unsplash.com/photo-1535016120720-40c6874c3b1c?auto=format&fit=crop&q=80&w=800",
            tagline: "Your love story, told like a movie.",
            isVerified: true,
            isFeatured: true,
            about: "We create emotional and cinematic wedding films that you will cherish correctly. Using 4K cinematography and drone shots to capture the grandeur of your venue.",
            services: ["Wedding Highlights", "Full Feature Film", "Drone Videography"],
            eventTypes: ["Wedding", "Engagement"],
            portfolio: [
                "https://images.unsplash.com/photo-1535016120720-40c6874c3b1c?auto=format&fit=crop&q=80&w=800"
            ]
        }
    ],
    makeup: [
        {
            id: "m1",
            name: "Glow & Glam by Sarah",
            category: "Makeup Artist",
            location: "Miami, FL",
            experience: 6,
            rating: 4.8,
            reviewCount: 150,
            startingPrice: 150,
            currency: "$",
            imageUrl: "https://images.unsplash.com/photo-1487412947132-26f250167de1?auto=format&fit=crop&q=80&w=800",
            tagline: "Enhancing your natural beauty.",
            isVerified: true,
            isFeatured: false,
            about: "Certified makeup artist specializing in bridal and event makeup. I use premium long-lasting products to ensure you look flawless all day.",
            services: ["Bridal Makeup", "Party Makeup", "Hair Styling"],
            eventTypes: ["Wedding", "Prom", "Party"],
            portfolio: [
                "https://images.unsplash.com/photo-1487412947132-26f250167de1?auto=format&fit=crop&q=80&w=800"
            ]
        }
    ],
    dj: [
        {
            id: "d1",
            name: "DJ Pulse",
            category: "DJ",
            location: "Chicago, IL",
            experience: 10,
            rating: 4.9,
            reviewCount: 200,
            startingPrice: 800,
            currency: "$",
            imageUrl: "https://images.unsplash.com/photo-1571266028243-3716f02d2fc5?auto=format&fit=crop&q=80&w=800",
            tagline: "Keeping the dance floor packed all night.",
            isVerified: true,
            isFeatured: true,
            about: "Open format DJ with 10 years of experience rocking clubs and private events. I know how to read the crowd and keep the energy high.",
            services: ["DJ Services", "MC/Hosting", "Sound System Rental"],
            eventTypes: ["Wedding", "Club Event", "Corporate Party"],
            portfolio: [
                "https://images.unsplash.com/photo-1571266028243-3716f02d2fc5?auto=format&fit=crop&q=80&w=800"
            ]
        }
    ]
};
