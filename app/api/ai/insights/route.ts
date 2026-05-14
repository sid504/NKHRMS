import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, context } = body

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API Key is not configured. Please add GEMINI_API_KEY to your .env file.' },
        { status: 500 }
      )
    }

    const ai = new GoogleGenAI({ apiKey })

    // Provide some system context if not provided
    const systemInstruction = `You are NKHR, an advanced AI-Powered HR assistant. 
You provide insights based on the given HR data. Be concise, professional, and helpful. 
Context data: ${JSON.stringify(context || {})}`

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    })

    return NextResponse.json({ result: response.text })
  } catch (error: any) {
    console.error('Gemini API Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate AI insights' },
      { status: 500 }
    )
  }
}
