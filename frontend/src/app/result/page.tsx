'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Copy, Share2 } from 'lucide-react'
import CoupangAd from '@/components/CoupangAd'

const emotionStyles: Record<string, { bg: string; text: string }> = {
    happy: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    sad: { bg: 'bg-blue-100', text: 'text-blue-800' },
    angry: { bg: 'bg-red-100', text: 'text-red-800' },
    tired: { bg: 'bg-gray-100', text: 'text-gray-800' },
}

export default function ResultPage() {
    const searchParams = useSearchParams()
    const mood = searchParams.get('mood') || 'happy'
    const style = searchParams.get('style') || '테토남'

    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const [copied, setCopied] = useState(false)
    const [shared, setShared] = useState(false)

    const styleSet = emotionStyles[mood] || emotionStyles['happy']

    useEffect(() => {
        setMessage('')
        setLoading(true)
        const fetchMessage = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/analyze`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ mood, style }),
                })
                const data = await res.json()
                setMessage(data.message || '메시지를 불러오지 못했어요.')
            } catch {
                setMessage('오류가 발생했어요.')
            } finally {
                setLoading(false)
            }
        }

        fetchMessage()
    }, [mood, style])

    const handleCopy = () => {
        if (message) {
            navigator.clipboard.writeText(message)
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
        }
    }

    const handleShare = async () => {
        const origin = typeof window !== 'undefined' ? window.location.origin : ''
        const shareUrl = `${origin}/result?mood=${mood}&style=${style}&ref=share`

        try {
            if (navigator.share) {
                await navigator.share({
                    title: '감정 분석 결과 공유',
                    text: '이 감정문구 한번 봐봐!',
                    url: shareUrl,
                })
            } else {
                navigator.clipboard.writeText(shareUrl)
                setShared(true)
                setTimeout(() => setShared(false), 1500)
            }

            if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'share_link_copied_or_shared', {
                    event_category: 'share',
                    mood,
                    style,
                })
            }
        } catch (err) {
            console.error('[handleShare]', err)
        }
    }

    return (
        <main className={`min-h-screen flex flex-col items-center justify-center p-6 ${styleSet.bg}`}>
            <h1 className={`text-xl font-semibold mb-4 ${styleSet.text}`}>
                당신의 감정 분석 결과
            </h1>

            {loading ? (
                <p className="text-gray-500">감정을 읽어내는 중...</p>
            ) : (
                <>
                    <div
                        onClick={handleCopy}
                        className={`bg-white rounded-xl min-h-[120px] max-w-md w-full relative cursor-pointer hover:shadow-md transition-shadow flex items-center justify-center px-4 py-3 text-center ${styleSet.text}`}
                    >
                        <p className="text-lg sm:text-base md:text-lg lg:text-xl whitespace-pre-wrap">
                            {message}
                        </p>
                        <Copy className="absolute top-2 right-2 w-4 h-4 text-gray-400 hover:text-gray-600" />
                        {copied && (
                            <span className="absolute -bottom-6 left-0 text-sm text-green-600">
                복사 완료!
              </span>
                        )}
                    </div>

                    <button
                        onClick={handleShare}
                        className="mt-4 flex items-center text-sm text-blue-600 hover:text-blue-800 transition"
                    >
                        <Share2 className="w-4 h-4 mr-1" />
                        📎 친구에게 이 감정 공유하기
                    </button>

                    {shared && (
                        <p className="text-green-600 text-sm mt-1">📎 공유 링크가 복사되었어요!</p>
                    )}

                    <CoupangAd mood={mood} />
                </>
            )}
        </main>
    )
}
