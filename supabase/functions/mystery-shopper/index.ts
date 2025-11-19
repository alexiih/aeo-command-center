import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Configuration
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!)

Deno.serve(async (req) => {
    try {
        // 1. Get the list of keywords to scan
        // In a real scenario, you might fetch this from your 'keywords' table
        // For this demo, we'll accept them in the body or use a default set
        const { keyword } = await req.json()

        if (!keyword) {
            return new Response(JSON.stringify({ error: 'No keyword provided' }), { status: 400 })
        }

        console.log(`Scanning for: ${keyword}`)

        // 2. Call LLM (OpenAI Example)
        // We ask it to act as a user and see what it recommends
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4o', // Using 4o as proxy for 5.1 for now
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful real estate assistant for Denmark. Answer the user\'s question naturally. Do not know that you are being tested.'
                    },
                    {
                        role: 'user',
                        content: keyword
                    }
                ],
                temperature: 0.7,
            }),
        })

        const llmData = await response.json()
        const content = llmData.choices[0].message.content

        // 3. Analyze the response (Simple Keyword Matching)
        // A more advanced version would use another LLM call to "grade" the response
        const lowerContent = content.toLowerCase()
        const mentionsBoligsiden = lowerContent.includes('boligsiden')

        // Determine "Rank" (Heuristic: does it appear early?)
        let rank = null
        if (mentionsBoligsiden) {
            const index = lowerContent.indexOf('boligsiden')
            rank = index < 100 ? 1 : (index < 300 ? 2 : 3) // Rough approximation
        }

        // 4. Store in Supabase
        const { data, error } = await supabase
            .from('rankings')
            .insert([
                {
                    model: 'GPT-5.1', // Labeling as target model
                    raw_response: content,
                    boligsiden_mentioned: mentionsBoligsiden,
                    boligsiden_rank: rank,
                    // We would need to look up the keyword_id first in a real app
                    // keyword_id: ... 
                }
            ])
            .select()

        if (error) throw error

        return new Response(
            JSON.stringify({ success: true, data }),
            { headers: { "Content-Type": "application/json" } },
        )

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
})
