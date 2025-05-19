"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Difficulty } from "@/components/memory-game"
import { cn } from "@/lib/utils"

interface DifficultySelectorProps {
  difficulty: Difficulty
  onDifficultyChange: (difficulty: Difficulty) => void
  disabled?: boolean
}

export function DifficultySelector({ difficulty, onDifficultyChange, disabled = false }: DifficultySelectorProps) {
  const difficulties: { value: Difficulty; label: string; description: string }[] = [
    {
      value: "easy",
      label: "Fácil",
      description: "4x4 (8 pares)",
    },
    {
      value: "medium",
      label: "Medio",
      description: "5x4 (10 pares)",
    },
    {
      value: "hard",
      label: "Difícil",
      description: "6x6 (18 pares)",
    },
  ]

  return (
    <Card className="w-full p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <span className="font-medium text-slate-700 dark:text-slate-300">Dificultad:</span>
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          {difficulties.map((option) => (
            <Button
              key={option.value}
              variant={difficulty === option.value ? "default" : "outline"}
              className={cn(
                "flex flex-col h-auto py-2",
                difficulty === option.value && "bg-slate-700 hover:bg-slate-800",
              )}
              onClick={() => onDifficultyChange(option.value)}
              disabled={disabled}
            >
              <span>{option.label}</span>
              <span className="text-xs opacity-80">{option.description}</span>
            </Button>
          ))}
        </div>
      </div>
    </Card>
  )
}
