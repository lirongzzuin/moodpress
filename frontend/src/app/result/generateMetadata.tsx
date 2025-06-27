import { Metadata } from 'next'

export async function generateMetadata({
                                           searchParams,
                                       }: {
    searchParams: URLSearchParams
}): Promise<Metadata> {
    const mood = searchParams.get('mood') || 'happy'
    const style = searchParams.get('style') || '테토남'

    const title = `[${style}] 오늘의 감정은 ${mood}`
    const description = 'AI가 분석한 당신의 감정 결과를 확인하세요.'
    const imageUrl = `https://yourdomain.com/thumb/${mood}.jpg`
    const url = `https://yourdomain.com/result?mood=${mood}&style=${style}`

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url,
            images: [{ url: imageUrl }],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [imageUrl],
        },
    }
}
