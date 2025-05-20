"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/card"
import { ControlPanel } from "@/components/control-panel"
import { DifficultySelector } from "@/components/difficulty-selector"
import { GameOverModal } from "@/components/game-over-modal"
import { generateCards } from "@/lib/game-utils"
import { useSound } from "@/hooks/use-sound"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AdBanner } from "@/components/ad-banner"

export type Difficulty = "easy" | "medium" | "hard"
export type CardType = {
  id: number
  value: string
  flipped: boolean
  matched: boolean
}

export default function MemoryGame() {
  const [cards, setCards] = useState<CardType[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [time, setTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [difficulty, setDifficulty] = useState<Difficulty>("easy")
  const [score, setScore] = useState(0)
  const [isChecking, setIsChecking] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const { play: playFlip, hasError: flipError } = useSound("/sounds/flip.mp3")
  const { play: playMatch, hasError: matchError } = useSound("/sounds/match.mp3")
  const { play: playComplete, hasError: completeError } = useSound("/sounds/complete.mp3")

  // Initialize game
  useEffect(() => {
    if (gameStarted) {
      const newCards = generateCards(difficulty)
      setCards(newCards)
      setFlippedCards([])
      setMoves(0)
      setTime(0)
      setGameCompleted(false)
      setGameEnded(false)
      setIsChecking(false)
    }
  }, [difficulty, gameStarted])

  // Timer logic
  useEffect(() => {
    if (isPlaying && !gameCompleted && !gameEnded && gameStarted) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isPlaying, gameCompleted, gameEnded, gameStarted])

  // Check if game is completed
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      endGame(true)
    }
  }, [cards])

  // Check for matches when two cards are flipped
  useEffect(() => {
    if (flippedCards.length === 2 && !isChecking) {
      setIsChecking(true)
      const [firstCardId, secondCardId] = flippedCards
      const firstCard = cards.find((card) => card.id === firstCardId)
      const secondCard = cards.find((card) => card.id === secondCardId)

      if (firstCard?.value === secondCard?.value) {
        // Match found
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstCardId || card.id === secondCardId ? { ...card, matched: true } : card,
            ),
          )
          setFlippedCards([])
          // Solo reproducir si no hay error
          if (!matchError) {
            playMatch()
          }
          // playMatch()
          setIsChecking(false)
        }, 500)
      } else {
        // No match
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstCardId || card.id === secondCardId ? { ...card, flipped: false } : card,
            ),
          )
          setFlippedCards([])
          setIsChecking(false)
        }, 1000)
      }
    }
  }, [flippedCards, cards, playMatch, matchError, isChecking])

  const startGame = () => {
    const newCards = generateCards(difficulty)
    setCards(newCards)
    setFlippedCards([])
    setMoves(0)
    setTime(0)
    setIsPlaying(true)
    setGameCompleted(false)
    setGameEnded(false)
    setGameStarted(true)
    setIsChecking(false)
  }

  const endGame = (completed = false) => {
    setIsPlaying(false)

    if (completed) {
      setGameCompleted(true)
      // Solo reproducir si no hay error
      if (!completeError) {
        playComplete()
      }
    } else {
      setGameEnded(true)
    }

    // Calculate score based on difficulty, moves and time
    const difficultyMultiplier = difficulty === "easy" ? 1 : difficulty === "medium" ? 2 : 3

    const baseScore = 1000 * difficultyMultiplier
    const movesPenalty = moves * 10
    const timePenalty = time * 2

    const finalScore = Math.max(baseScore - movesPenalty - timePenalty, 100)
    setScore(finalScore)

    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  const handleEndGame = () => {
    endGame(false)
    setGameStarted(false)
  }

  const handleCardClick = (id: number) => {
    // No permitir clics si estamos verificando coincidencias
    if (isChecking) return

    // No permitir clics en cartas ya volteadas o emparejadas
    const clickedCard = cards.find((card) => card.id === id)
    if (!clickedCard || clickedCard.flipped || clickedCard.matched) return

    // No permitir voltear más de 2 cartas a la vez
    if (flippedCards.length >= 2) return

    // Solo reproducir si no hay error
    if (!flipError) {
      playFlip()
    }

    // Flip the card
    setCards((prevCards) => prevCards.map((card) => (card.id === id ? { ...card, flipped: true } : card)))

    // Añadir la carta a las volteadas
    setFlippedCards((prev) => [...prev, id])

    // Si esta es la segunda carta, incrementar movimientos
    if (flippedCards.length === 1) {
      setMoves((prevMoves) => prevMoves + 1)
    }
  }

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty)
  }

  const getBoardSize = () => {
    switch (difficulty) {
      case "easy":
        return "grid-cols-4"
      case "medium":
        return "grid-cols-5"
      case "hard":
        return "grid-cols-6"
      default:
        return "grid-cols-4"
    }
  }

  return (
    <div className="w-full max-w-4xl flex flex-col items-center gap-6">
      {/* Anuncio en la parte superior */}
      <AdBanner 
        adSlot="1234567890" 
        adFormat="horizontal" 
        className="w-full mb-4" 
        style={{ minHeight: "90px" }} 
      />

      <DifficultySelector
        difficulty={difficulty}
        onDifficultyChange={handleDifficultyChange}
        disabled={isPlaying && !gameCompleted && !gameEnded}
      />

      <ControlPanel moves={moves} time={time} onReset={startGame} onEndGame={handleEndGame} gameStarted={gameStarted} />

      {!gameStarted ? (
        <div className="w-full flex justify-center my-4">
          <Button
            onClick={startGame}
            size="lg"
            className="px-8 py-6 text-lg font-semibold bg-green-600 hover:bg-green-700"
          >
            Iniciar Juego
          </Button>

          {/* Anuncio antes de iniciar el juego (más visible) */}
          <AdBanner 
            adSlot="0987654321" 
            adFormat="rectangle" 
            className="w-full my-4" 
            style={{ minHeight: "250px" }} 
          />
        </div>
      ) : (
        <div className={cn("grid gap-2 w-full", getBoardSize())}>
          {cards.map((card) => (
            <Card key={card.id} card={card} onClick={() => handleCardClick(card.id)} />
          ))}
        </div>
      )}

      {/* Anuncio en la parte inferior */}
      <AdBanner 
        adSlot="1122334455" 
        adFormat="horizontal" 
        className="w-full mt-4" 
        style={{ minHeight: "90px" }} 
      />
      
      {gameCompleted && <GameOverModal moves={moves} time={time} score={score} onPlayAgain={startGame} />}
    </div>
  )
}
