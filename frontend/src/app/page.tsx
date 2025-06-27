'use client'

import { useRouter } from 'next/navigation'
import EmotionCard from '@/components/EmotionCard'

const emotions = [
  { emoji: '😢', label: '슬픔', value: 'sad' },
  { emoji: '😡', label: '화남', value: 'angry' },
  { emoji: '😴', label: '무기력', value: 'tired' },
  { emoji: '😊', label: '기쁨', value: 'happy' },
]

export default function HomePage() {
  const router = useRouter()

  const handleSelect = (emotion: string) => {
    router.push(`/result?mood=${emotion}`)
  }

  return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 bg-gray-50">
        <h1 className="text-2xl font-semibold text-gray-800">오늘 당신의 감정은?</h1>
        <div className="grid grid-cols-2 gap-4">
          {emotions.map((e) => (
              <EmotionCard
                  key={e.value}
                  emoji={e.emoji}
                  label={e.label}
                  onClick={() => handleSelect(e.value)}
              />
          ))}
        </div>
      </main>
  )
}
