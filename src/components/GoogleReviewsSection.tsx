"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { guestReviews, GOOGLE_REVIEW_URL } from "@/lib/googleReviews";
import { fadeUp, lineWipe, staggerContainer, RevealGroup } from "@/components/animations";

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={cn(
                        "w-4 h-4",
                        i < rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
                    )}
                />
            ))}
        </div>
    );
}

const HIDDEN_ON_PATHS = ["/", "/finance", "/bakery", "/contact"];

export function GoogleReviewsSection() {
    const pathname = usePathname();

    if (HIDDEN_ON_PATHS.includes(pathname)) {
        return null;
    }

    return (
        <section className="bg-gray-50 py-20 md:py-28 border-t border-gray-100">
            <div className="container px-6 max-w-7xl mx-auto">
                <RevealGroup className="text-center mb-14 md:mb-16">
                    <motion.p
                        variants={fadeUp}
                        className="text-primary uppercase tracking-[0.25em] text-[10px] md:text-xs font-bold mb-3"
                    >
                        What Our Guests Say
                    </motion.p>
                    <motion.h2
                        variants={fadeUp}
                        className="text-4xl md:text-5xl font-serif text-gray-900 mb-4"
                    >
                        Guest Reviews
                    </motion.h2>
                    <motion.div
                        variants={lineWipe}
                        className="h-[2px] w-16 bg-primary mx-auto mb-6"
                    />
                    <motion.p
                        variants={fadeUp}
                        className="text-gray-500 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed"
                    >
                        Hear from travellers who have experienced the warmth and comfort of Kannamundayil Residency.
                    </motion.p>
                </RevealGroup>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {guestReviews.map((review) => (
                        <motion.article
                            key={review.id}
                            variants={fadeUp}
                            className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 transition-all duration-500 flex flex-col"
                        >
                            <StarRating rating={review.rating} />

                            <blockquote className="mt-5 mb-6 flex-grow">
                                <p className="text-gray-600 font-light leading-relaxed text-[15px] md:text-base">
                                    &ldquo;{review.text}&rdquo;
                                </p>
                            </blockquote>

                            <div className="pt-5 border-t border-gray-100">
                                <p className="font-serif text-lg text-gray-900">{review.name}</p>
                                {review.date && (
                                    <p className="text-xs text-gray-400 tracking-wide mt-1 uppercase">
                                        {review.date}
                                    </p>
                                )}
                            </div>
                        </motion.article>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-center mt-14 md:mt-16"
                >
                    <Link
                        href={GOOGLE_REVIEW_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-white rounded-full h-14 px-10 md:px-14 text-xs md:text-sm tracking-widest uppercase shadow-lg hover:shadow-xl transition-all duration-300 group"
                        >
                            Write a Review on Google
                            <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
