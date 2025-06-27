const { generateStyledMessage } = require('../services/gptService')

exports.analyzeMood = async (req, res) => {
    const { mood, style } = req.body

    if (!mood || !style) {
        return res.status(400).json({ message: 'mood와 style 모두 필요합니다.' })
    }

    try {
        const message = await generateStyledMessage(mood, style)
        if (!message) throw new Error('메시지 생성 실패')

        res.json({ message })
    } catch (err) {
        console.error('[analyzeMood]', err)
        res.status(500).json({ message: 'GPT 응답 생성 중 오류 발생' })
    }
}
