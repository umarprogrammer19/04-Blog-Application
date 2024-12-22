export interface Card {
    image: string;
    title: string;
    category: string;
    description: string;
    link: string;
}

export const cardData: Card[] = [
    {
        image: "/assets/image/ImagePlaceholder(2).png",
        title: "8 Rules Of Travelling In Sea You Need To Know",
        category: "Travel",
        description:
            "Travelling in the sea has many advantages, from better scenery to more relaxed settings.",
        link: "#",
    },
    {
        image: "/assets/image/ImagePlaceholder(1).png",
        title: "How to build strong portfolio and get a Job in UI/UX",
        category: "Design",
        description:
            "Capitalize on key hiring factors and design strategies to land your dream role.",
        link: "#",
    },
    {
        image: "/assets/image/ImagePlaceholder(2).png",
        title: "How to Be a Professional Footballer in 2023",
        category: "Sports",
        description:
            "Organizing your life to initiate a strong career path in football and sports.",
        link: "#",
    },
];