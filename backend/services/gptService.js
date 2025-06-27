require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') })

const { OpenAI } = require('openai')
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

exports.generateStyledMessage = async (mood, style) => {

    const prompt = `
너는 한국 Z세대·MZ세대에게 SNS에서 퍼질만한 문장을 쓰는 유쾌한 카피라이터야.

현재 사용자의 감정은 "${mood}", 말투 스타일은 "${style}"야.

이 감정과 스타일을 반영해서 다음 조건을 모두 만족하는 **한 문장**을 만들어줘:

1. 100% 한국어, 반드시 한 문장만. (중간 끊김이나 나열 X)
2. 15~40자 길이.
3. 감정을 **비유/과장/풍자**로 표현. (직설적 표현은 피함)
4. "${style}" 스타일의 말투/억양이 자연스럽게 드러나야 함. (예: 테토남 → 도발적, 시니컬)
5. "기분 좋다", "화났다" 같은 **평범한 표현 금지**
6. 최신 **SNS 밈/드라마 대사/유행어** 등을 활용하면 좋음.
7. 문장을 보면 **스크린샷 찍고 공유하고 싶은 느낌**이 나야 함.
8. **감정 과잉이거나**, **빵 터지거나**, **찡한 감성**을 담을 것.
9. 노골적인 욕설이나 성적 표현은 제외하되, **간질간질하거나 도발적인 톤**은 허용.

예시:
- 테토남 + 화남 → "그냥 뜨아 원샷했어. 나 지금 건들면 다친다?"
- 에겐녀 + 슬픔 → "울지 말랬는데… 눈물이 자꾸 말 안 듣는다잉…"
- 테토녀 + 무기력 → "하… 심심한데 대실이나 하까… 농담이야, 진짜루 농담 맞다."
- 에겐남 + 기쁨 → "햇살 좋고 너까지 좋으면, 난 그냥 미쳐버리자~"

조건 어기지 말고, 무조건 최고의 문장 하나만 출력해.
`.trim()

    try {
        const chat = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.95,
            max_tokens: 100,
        })

        return chat.choices[0].message.content
    } catch (error) {
        console.error('GPT 호출 오류:', error.response?.data || error.message)
        return null
    }
}
