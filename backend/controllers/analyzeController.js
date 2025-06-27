const { generateMessage } = require('../services/gptService')

exports.analyzeEmotion = async (req, res) => {
    const { mood } = req.body
    if (!mood) return res.status(400).json({ error: 'Mood is required' })

    try {
        const message = await generateMessage(mood)
        res.json({ message })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to generate message' })
    }
}
