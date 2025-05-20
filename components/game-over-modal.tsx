"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Trophy, Clock, Move, Star } from "lucide-react"
import { formatTime } from "@/lib/game-utils"
import confetti from "canvas-confetti"
import { AdBanner } from "@/components/ad-banner"

interface GameOverModalProps {
  moves: number
  time: number
  score: number
  onPlayAgain: () => void
}

export function GameOverModal({ moves, time, score, onPlayAgain }: GameOverModalProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(true)

    // Trigger confetti
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-2xl">
            <Trophy className="h-6 w-6 text-yellow-500" />
            ¡Juego Completado!
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            Has completado el juego de memoria con éxito.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4 py-4">
          <div className="flex flex-col items-center justify-center p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <Clock className="h-5 w-5 text-slate-600 dark:text-slate-400 mb-1" />
            <span className="text-sm text-slate-500 dark:text-slate-400">Tiempo</span>
            <span className="font-medium">{formatTime(time)}</span>
          </div>

          <div className="flex flex-col items-center justify-center p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <Move className="h-5 w-5 text-slate-600 dark:text-slate-400 mb-1" />
            <span className="text-sm text-slate-500 dark:text-slate-400">Movimientos</span>
            <span className="font-medium">{moves}</span>
          </div>

          <div className="flex flex-col items-center justify-center p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <Star className="h-5 w-5 text-yellow-500 mb-1" />
            <span className="text-sm text-slate-500 dark:text-slate-400">Puntuación</span>
            <span className="font-medium">{score}</span>
          </div>
        </div>

        {/* Anuncio en el modal de fin de juego */}
        <AdBanner 
          adSlot="5566778899" 
          adFormat="rectangle" 
          className="w-full my-4" 
          style={{ minHeight: "250px" }} 
        />
        
        <DialogFooter className="sm:justify-center">
          <Button
            onClick={() => {
              setOpen(false)
              onPlayAgain()
            }}
            className="w-full sm:w-auto"
          >
            Jugar de nuevo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
