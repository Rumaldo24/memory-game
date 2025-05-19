"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import type { CardType } from "@/components/memory-game"
import { cn } from "@/lib/utils"

interface CardProps {
  card: CardType
  onClick: () => void
}

export function Card({ card, onClick }: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    setIsFlipped(card.flipped || card.matched)
  }, [card.flipped, card.matched])

  return (
    <div className="aspect-square relative cursor-pointer max-w-[80px] w-full mx-auto" onClick={onClick}>
      <motion.div
        className={cn(
          "w-full h-full rounded-lg absolute backface-hidden",
          "flex items-center justify-center text-3xl font-bold",
          "bg-slate-700 dark:bg-slate-800 text-white",
          "shadow-md hover:shadow-lg transition-shadow",
        )}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ backfaceVisibility: "hidden" }}
      >
        ?
      </motion.div>

      <motion.div
        className={cn(
          "w-full h-full rounded-lg absolute backface-hidden",
          "flex items-center justify-center text-3xl font-bold",
          card.matched ? "bg-green-500 dark:bg-green-600" : "bg-white dark:bg-slate-700",
          "shadow-md transition-colors",
          card.matched ? "text-white" : "text-slate-800 dark:text-white",
        )}
        initial={false}
        animate={{ rotateY: isFlipped ? 0 : -180 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ backfaceVisibility: "hidden" }}
      >
        {card.value}
      </motion.div>
    </div>
  )
}
