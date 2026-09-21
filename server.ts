import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '5mb' }));

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'Code & AI Lab Server' });
  });

  // AI Assist Endpoint
  app.post('/api/ai/assist', async (req, res) => {
    try {
      const {
        code = '',
        action = 'explain', // 'explain' | 'fix' | 'hint' | 'comment' | 'ask'
        question = '',
        tier = 'jss',
        filename = 'main.py',
      } = req.body;

      const ai = getGeminiClient();

      if (!ai) {
        // High quality offline fallback tutor if API key is not yet set
        const offlineResponse = generateOfflineTutorResponse(code, action, question, tier);
        res.json(offlineResponse);
        return;
      }

      const prompt = `You are a friendly, encouraging computer science teacher at Fortune's TP Code & AI Lab in Nigeria.
You are helping a student in tier: ${tier.toUpperCase()} (${
        tier === 'jss'
          ? 'Junior Secondary School, ages 11-14. Curriculum covers variables, strings, arithmetic, if/elif/else decisions. Loops are not yet introduced in JSS.'
          : 'Senior Secondary School, ages 14-17. Curriculum covers algorithms, for loops with range(), logic operators, and modular problem-solving.'
      }).

Current file: "${filename}"
Student's current Python code:
\`\`\`python
${code || '# (Empty file)'}
\`\`\`

Action requested: ${action.toUpperCase()}
${question ? `Student Question: "${question}"` : ''}

PEDAGOGICAL DIRECTIVES:
1. YOU ARE A TEACHING TOOL, NOT AN ANSWER MACHINE. Break concepts down gently with short paragraphs and relatable everyday examples (e.g. market shopping, school scores, sports).
2. WHEN FIXING OR IMPROVING SOMETHING: You MUST say what you changed and why, in 1-3 crisp bullet lines, rather than silently rewriting and staying quiet.
3. TIER APPROPRIATE: ${
        tier === 'jss'
          ? 'Do NOT suggest for-loops or while-loops. Use variables, arithmetic, and if/elif/else.'
          : 'Use loops, range(start, stop, step), and structured algorithms where appropriate.'
      }
4. Respond in valid JSON with this exact schema:
{
  "explanation": "Your clear, educational explanation or guidance",
  "whatChanged": "If you fixed/altered code: a 1-2 sentence explanation of what was changed and why (or empty string if not applicable)",
  "suggestedCode": "The complete updated Python code if fixing or commenting, or null if just explaining/hinting"
}
Output only the JSON object without markdown code blocks if possible, or inside \`\`\`json \`\`\`.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          temperature: 0.3,
        },
      });

      const responseText = response.text || '';
      // Clean JSON formatting
      const cleanJson = responseText
        .replace(/^```json/im, '')
        .replace(/^```/im, '')
        .replace(/```$/im, '')
        .trim();

      try {
        const parsed = JSON.parse(cleanJson);
        res.json(parsed);
      } catch {
        res.json({
          explanation: responseText,
          whatChanged: '',
          suggestedCode: null,
        });
      }
    } catch (err: unknown) {
      console.error('AI Assist error:', err);
      const fallback = generateOfflineTutorResponse(
        req.body?.code || '',
        req.body?.action || 'explain',
        req.body?.question || '',
        req.body?.tier || 'jss'
      );
      res.json(fallback);
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Code & AI Lab Server running on http://0.0.0.0:${PORT}`);
  });
}

function generateOfflineTutorResponse(
  code: string,
  action: string,
  question: string,
  tier: string
): { explanation: string; whatChanged: string; suggestedCode: string | null } {
  if (action === 'fix') {
    let fixed = code;
    const changes: string[] = [];

    // Check common indentation or syntax issues
    if (code.includes('if ') && !code.includes(':')) {
      fixed = fixed.replace(/if\s+(.+)$/gm, 'if $1:');
      changes.push('Added missing colon (:) after the if condition.');
    }
    if (code.includes('else') && !code.includes('else:')) {
      fixed = fixed.replace(/else\s*$/gm, 'else:');
      changes.push('Added missing colon (:) after else statement.');
    }
    if (code.includes('print ') && !code.includes('print(')) {
      fixed = fixed.replace(/print\s+(.+)$/gm, 'print($1)');
      changes.push('Wrapped print arguments in parentheses print(...).');
    }

    if (changes.length > 0) {
      return {
        explanation:
          'I spotted a few syntax items that Python needs to run smoothly. Python relies on colons and parentheses to understand instruction blocks.',
        whatChanged: changes.join(' '),
        suggestedCode: fixed,
      };
    }

    return {
      explanation:
        'Your code syntax looks clean! Make sure all your variables are defined before using them, and check the Run console for output.',
      whatChanged: 'No syntax errors detected; kept code intact.',
      suggestedCode: code,
    };
  }

  if (action === 'hint') {
    if (tier === 'jss') {
      return {
        explanation:
          'Hint for JSS: Remember you can store information into variables like `score = 85`, and compare them using `if score >= 50:` with 4 spaces of indentation on the next line!',
        whatChanged: '',
        suggestedCode: null,
      };
    }
    return {
      explanation:
        'Hint for SS: Use `for i in range(1, 11):` to loop from 1 through 10. You can accumulate running sums or multiply numbers inside the loop body.',
      whatChanged: '',
      suggestedCode: null,
    };
  }

  if (action === 'comment') {
    const lines = code.split('\n');
    const commented = lines
      .map((l) => {
        if (!l.trim()) return l;
        if (l.trim().startsWith('#')) return l;
        if (l.includes('=')) return `# Store value in variable\n${l}`;
        if (l.includes('print(')) return `# Display output to screen\n${l}`;
        if (l.includes('if ')) return `# Check condition\n${l}`;
        if (l.includes('for ')) return `# Iterate through sequence\n${l}`;
        return l;
      })
      .join('\n');

    return {
      explanation: 'I added educational inline comments to describe what each instruction does.',
      whatChanged: 'Added explanatory comments above variables, logic tests, and print statements.',
      suggestedCode: commented,
    };
  }

  return {
    explanation: question
      ? `Regarding "${question}": In Python, every command is executed line-by-line from top to bottom. Keep your code indented with 4 spaces under if/else blocks and always use print() to see results!`
      : `Here is how your code works: It prepares variables and steps through your logic sequentially. Use the "Run" button above to execute it in real time!`,
    whatChanged: '',
    suggestedCode: null,
  };
}

startServer();
