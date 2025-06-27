const { OpenAI } = require('openai')
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

exports.generateMessage = async (mood) => {
    const prompt = `지금 사용자의 감정은 "${mood}"입니다. 이 감정에 어울리는 감성적인 한 문장을 만들어줘. 문장은 너무 길지 않고 감정을 잘 표현해야 해.`

    const chat = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-3.5-turbo',
        temperature: 0.8,
    })

    return chat.choices[0].message.content
}
