const { generateStyledMessage } = require('../services/gptService')

exports.analyzeEmotion = async (req, res) => {
    const { mood, style } = req.body

    if (!mood || !style) {
        return res.status(400).json({ message: 'mood와 style 모두 필요합니다.' })
    }

    try {
        const message = await generateStyledMessage(mood, style)
        if (!message) throw new Error('GPT 응답 실패')

        res.json({ message })
    } catch (err) {
        console.error('[analyzeEmotion]', err)
        res.status(500).json({ message: 'GPT 응답 중 오류 발생' })
    }
}
