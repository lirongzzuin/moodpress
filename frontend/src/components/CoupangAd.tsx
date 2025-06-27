'use client'

import React from 'react'

interface CoupangAdProps {
    mood: string
}

const adMap: Record<string, { text: string; url: string }> = {
    happy: {
        text: '😎 기분 좋을 땐 더 기분 좋아지는 꿀템 모아봤어!',
        url: 'https://link.coupang.com/re/your-partner-id?item=happy-ad',
    },
    sad: {
        text: '😭 위로가 필요할 땐 이걸로 힐링해봐...',
        url: 'https://link.coupang.com/re/your-partner-id?item=sad-ad',
    },
    angry: {
        text: '😤 화났을 땐 이걸로 스트레스 날려버리자!',
        url: 'https://link.coupang.com/re/your-partner-id?item=angry-ad',
    },
    tired: {
        text: '😮‍💨 무기력할 땐 이템 하나면 충분해.',
        url: 'https://link.coupang.com/re/your-partner-id?item=tired-ad',
    },
}

export default function CoupangAd({ mood }: CoupangAdProps) {
    const ad = adMap[mood] || adMap['happy']

    const handleAdClick = () => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
            ;(window as any).gtag('event', 'click_ad', {
                ad_type: 'coupang',
                mood,
            })
        }
    }

    return (
        <div className="mt-6 text-center">
            <p className="text-md font-medium text-gray-700">{ad.text}</p>
            <a
                href={ad.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleAdClick}
                className="inline-block mt-2 px-4 py-2 bg-[#346AFF] text-white rounded-full text-sm hover:bg-[#1f4fe2] transition"
            >
                쿠팡에서 확인하기
            </a>
        </div>
    )
}
