import type { Difficulty, CardType } from "@/components/memory-game"

// Emojis para usar como valores de las cartas
const emojis = [
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
  "🐨",
  "🐯",
  "🦁",
  "🐮",
  "🐷",
  "🐸",
  "🐵",
  "🐔",
  "🐧",
  "🐦",
  "🦆",
  "🦅",
  "🦉",
  "🦇",
  "🐺",
  "🐗",
  "🐴",
  "🦄",
  "🐝",
  "🐛",
  "🦋",
  "🐌",
  "🐞",
  "🐜",
  "🦟",
  "🦗",
  "🕷️",
  "🦂",
]

export function generateCards(difficulty: Difficulty): CardType[] {
  let pairsCount: number
  let gridSize: { rows: number; cols: number } = { rows: 4, cols: 4 }

  switch (difficulty) {
    case "easy":
      pairsCount = 8 // 4x4 grid
      gridSize = { rows: 4, cols: 4 }
      break
    case "medium":
      pairsCount = 10 // 5x4 grid
      gridSize = { rows: 4, cols: 5 }
      break
    case "hard":
      pairsCount = 18 // 6x6 grid
      gridSize = { rows: 6, cols: 6 }
      break
    default:
      pairsCount = 8
      gridSize = { rows: 4, cols: 4 }
  }

  // Seleccionar emojis aleatorios para este juego
  const shuffledEmojis = [...emojis].sort(() => Math.random() - 0.5)
  const selectedEmojis = shuffledEmojis.slice(0, pairsCount)

  // Crear pares de cartas
  const cardPairs = selectedEmojis.flatMap((emoji) => [
    { id: Math.random(), value: emoji, flipped: false, matched: false },
    { id: Math.random(), value: emoji, flipped: false, matched: false },
  ])

  // Mezclar las cartas
  return cardPairs.sort(() => Math.random() - 0.5)
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
}
