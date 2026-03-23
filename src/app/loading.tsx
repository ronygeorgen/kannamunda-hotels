"use client";
import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/60 backdrop-blur-md">
            <div className="flex flex-col items-center gap-6">
                {/* Fast spinning loader */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 0.6,
                        ease: "linear"
                    }}
                    className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full shadow-lg"
                />
                
                <div className="text-center space-y-2">
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-gray-900 font-serif text-2xl"
                    >
                        Wait a moment
                    </motion.p>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-gray-500 text-xs uppercase tracking-[0.3em] font-medium"
                    >
                        Your page will render shortly
                    </motion.p>
                </div>
            </div>
        </div>
    );
}
