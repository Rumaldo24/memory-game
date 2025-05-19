import { Suspense } from "react"
import MemoryGame from "@/components/memory-game"
import { Loader2 } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
      <h1 className="text-4xl font-bold text-center mb-6 text-slate-800 dark:text-slate-100">Juego de Memoria</h1>
      <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin" />}>
        <MemoryGame />
      </Suspense>
    </main>
  )
}
