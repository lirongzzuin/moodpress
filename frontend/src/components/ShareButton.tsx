'use client'

import { useState } from 'react'
import { Share2 } from 'lucide-react'

export default function ShareButton({ mood, style }: { mood: string; style: string }) {
    const [copied, setCopied] = useState(false)

    const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/result?mood=${mood}&style=${style}`

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: '감정 분석 결과',
                    text: '내 감정, 너도 한 번 분석해봐!',
                    url: shareUrl,
                })

                window.gtag?.('event', 'share_result', {
                    mood,
                    style,
                })
            } else {
                // fallback: 복사
                await navigator.clipboard.writeText(shareUrl)
                setCopied(true)
                setTimeout(() => setCopied(false), 1500)
            }
        } catch (e) {
            console.error('[Share Error]', e)
        }
    }

    return (
        <div className="mt-4 flex flex-col items-center">
            <button
                onClick={handleShare}
                className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
            >
                <Share2 className="w-4 h-4" />
                공유하기
            </button>
            {copied && <span className="text-xs text-green-600 mt-1">링크 복사 완료!</span>}
        </div>
    )
}
