'use client'

type EmotionCardProps = {
    emoji: string
    label: string
    onClick: () => void
}

export default function EmotionCard({ emoji, label, onClick }: EmotionCardProps) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow hover:scale-105 transition"
        >
            <div className="text-4xl">{emoji}</div>
            <div className="mt-2 text-sm text-gray-700">{label}</div>
        </button>
    )
}
