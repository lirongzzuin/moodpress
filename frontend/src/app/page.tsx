'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import EmotionCard from '@/components/EmotionCard'

const emotions = [
    { emoji: '😢', label: '슬픔', value: 'sad' },
    { emoji: '😡', label: '화남', value: 'angry' },
    { emoji: '😴', label: '무기력', value: 'tired' },
    { emoji: '😊', label: '기쁨', value: 'happy' },
]

const styles = [
    { label: '테토남', value: '테토남' },
    { label: '테토녀', value: '테토녀' },
    { label: '에겐남', value: '에겐남' },
    { label: '에겐녀', value: '에겐녀' },
]

export default function HomePage() {
    const router = useRouter()
    const [selectedStyle, setSelectedStyle] = useState('테토남')

    const handleSelect = (emotion: string) => {
        router.push(`/result?mood=${emotion}&style=${selectedStyle}`)
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center gap-8 p-6 bg-gray-50">
            <h1 className="text-2xl font-semibold text-gray-800">오늘 당신의 감정은?</h1>

            {/* 감정 선택 */}
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

            {/* 스타일 선택 */}
            <div className="mt-6 flex gap-4 flex-wrap justify-center">
                {styles.map((s) => (
                    <button
                        key={s.value}
                        onClick={() => setSelectedStyle(s.value)}
                        className={`px-4 py-2 rounded-full border ${
                            selectedStyle === s.value
                                ? 'bg-black text-white'
                                : 'bg-white text-gray-700 border-gray-300'
                        } transition`}
                    >
                        {s.label}
                    </button>
                ))}
            </div>
        </main>
    )
}
