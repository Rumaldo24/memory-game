"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RefreshCw, Clock, Move, X } from "lucide-react"
import { formatTime } from "@/lib/game-utils"

interface ControlPanelProps {
  moves: number
  time: number
  onReset: () => void
  onEndGame?: () => void
  gameStarted?: boolean
}

export function ControlPanel({ moves, time, onReset, onEndGame, gameStarted = false }: ControlPanelProps) {
  return (
    <Card className="w-full p-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          <span className="text-lg font-medium">{gameStarted ? formatTime(time) : "00:00"}</span>
        </div>

        <div className="flex items-center gap-2">
          <Move className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          <span className="text-lg font-medium">{gameStarted ? moves : 0}</span>
        </div>
      </div>

      {gameStarted && (
        <div className="flex gap-2">
          <Button onClick={onReset} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Reiniciar
          </Button>

          <Button onClick={onEndGame} variant="destructive" className="gap-2">
            <X className="h-4 w-4" />
            Terminar
          </Button>
        </div>
      )}
    </Card>
  )
}
