export const GOOGLE_REVIEW_URL =
    "https://search.google.com/local/writereview?placeid=ChIJu3nKiL3LBzsR9VXGbHgpEv8";

export interface GuestReview {
    id: string;
    name: string;
    rating: number;
    text: string;
    date?: string;
}

export const guestReviews: GuestReview[] = [
    {
        id: "1",
        name: "Rahul Nair",
        rating: 5,
        text: "Great location and peaceful atmosphere. Perfect base for exploring Vagamon and nearby attractions.",
        date: "June 2026",
    },
    {
        id: "2",
        name: "Sneha Krishnan",
        rating: 5,
        text: "Spotless rooms, warm service, and a calm ambience. Will definitely return on our next Kerala trip.",
        date: "May 2026",
    },
    {
        id: "3",
        name: "Anjali Menon",
        rating: 5,
        text: "Excellent stay with friendly staff and clean rooms. The team went out of their way to make our family feel welcome.",
        date: "March 2026",
    },
    {
        id: "4",
        name: "Priya Thomas",
        rating: 5,
        text: "Comfortable rooms and delicious food. We enjoyed every moment of our stay at Kannamundayil Residency.",
        date: "February 2026",
    },
    {
        id: "5",
        name: "George Mathew",
        rating: 5,
        text: "Wonderful hospitality and beautiful surroundings. Highly recommend for anyone visiting Erattupetta or Poonjar.",
        date: "October 2025",
    },
    {
        id: "6",
        name: "Arun Kumar",
        rating: 4,
        text: "A lovely family-run hotel with genuine Kerala hospitality. Check-in was smooth and the staff were very helpful.",
        date: "August 2024",
    },
];
