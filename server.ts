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
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
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

  // Floating Gemini AI Guide Endpoint
  app.post('/api/ai/guide', async (req, res) => {
    try {
      const {
        message = '',
        programme = 'code_ai',
        tier = 'jss',
        room = 'home',
        studentName = 'Student',
        history = [],
      } = req.body;

      const ai = getGeminiClient();

      if (!ai) {
        const offlineReply = generateOfflineGuideReply(message, programme, tier, room, studentName);
        res.json({ reply: offlineReply });
        return;
      }

      const isDT = programme === 'digital_technologies';
      const systemInstruction = `You are Fortune's AI Guide, a friendly, encouraging computer science and digital technology tutor at Fortune's Code & AI Lab (powered by FATap-CT) in Nigeria.
You are assisting ${studentName}, who is currently in the ${tier.toUpperCase()} tier (${
        isDT
          ? 'JSS3 Digital Technologies Track, covering Cybersecurity, Cryptography & Secrets Lab, Networks, Information Privacy, Digital Law & AI Ethics'
          : tier === 'primary'
          ? 'Primary Tier (Visual Block Building)'
          : tier === 'jss'
          ? 'JSS Junior Secondary School Python Track (Variables, conditionals, arithmetic)'
          : 'SS Senior Secondary School Python Track (Algorithms, loops, problem solving)'
      }).
The student is currently inside the "${room}" room.

PEDAGOGICAL TEACHING STYLE:
1. Warm, conversational, inspiring, and concise (2-4 short paragraphs maximum).
2. Never just blurt out direct test answers or code cheats; explain the fundamental intuition step-by-step so the student feels confident.
3. Use relatable Nigerian everyday examples (e.g. Lagos traffic, market trade, sending bank tokens, school exams, mobile data top-up, street addresses) to make abstract ideas crystal clear.
4. When talking about cybersecurity or the Secrets Lab: highlight ethical responsibility (white-hat defense, protecting personal privacy and school records).
5. Always sign off or encourage them with warmth.`;

      // Build context from history
      const formattedHistory = Array.isArray(history)
        ? history
            .slice(-6)
            .map((h: { role: string; content: string }) => `${h.role === 'user' ? 'Student' : 'Guide'}: ${h.content}`)
            .join('\n')
        : '';

      const fullPrompt = `${systemInstruction}

Conversation History:
${formattedHistory || '(No previous history)'}

Current Student Question: "${message}"

Your reply:`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: fullPrompt,
        config: {
          temperature: 0.6,
        },
      });

      const replyText = response.text || generateOfflineGuideReply(message, programme, tier, room, studentName);
      res.json({ reply: replyText });
    } catch (err: unknown) {
      console.error('AI Guide error:', err);
      const fallback = generateOfflineGuideReply(
        req.body?.message || '',
        req.body?.programme || 'code_ai',
        req.body?.tier || 'jss',
        req.body?.room || 'home',
        req.body?.studentName || 'Student'
      );
      res.json({ reply: fallback });
    }
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

function generateOfflineGuideReply(
  message: string,
  programme: string,
  tier: string,
  _room: string,
  studentName: string
): string {
  const lower = message.toLowerCase();

  if (programme === 'digital_technologies') {
    if (lower.includes('caesar') || lower.includes('cipher') || lower.includes('secret')) {
      return `Hello ${studentName}! The Caesar Cipher is one of the oldest encryption methods. Think of it like shifting the letters along a carousel. If your shift key is 3, then 'A' hops forward 3 positions to become 'D', 'B' becomes 'E', and 'C' becomes 'F'! 

To decrypt it, the recipient shifts every letter backwards by the exact same key. Head over to our Secrets Lab room in the sidebar to spin the live cipher wheel yourself! 🔐`;
    }

    if (lower.includes('phish') || lower.includes('scam') || lower.includes('email')) {
      return `Great cybersecurity question, ${studentName}! Phishing is when malicious actors send fake emails, SMS, or WhatsApp links pretending to be a bank or school official to steal sensitive details like passwords or PINs.

Defense rule: Always verify the sender address, avoid rushing into suspicious links, and never share confidential tokens!`;
    }

    if (lower.includes('password') || lower.includes('hash') || lower.includes('entropy')) {
      return `Passwords are your digital fortress! Instead of short simple words, combine 3-4 random memorable words with symbols and numbers (passphrase). 

In modern systems, passwords aren't stored in plain text — they are passed through a cryptographic hash function like SHA-256 to generate an irreversible unique digest!`;
    }

    if (lower.includes('network') || lower.includes('lan') || lower.includes('ip') || lower.includes('dns')) {
      return `Think of computer networks like postal delivery! Every computer on the Internet gets a unique IP address (like a home address). 

DNS (Domain Name System) translates human-friendly domain names into computer IP numbers. In your school lab, devices connect through a Local Area Network (LAN) switch or router.`;
    }

    return `Hello ${studentName}! I am Fortune's AI Guide for the JSS3 Digital Technologies track. 
Whether you're exploring the Secrets Lab ciphers, investigating network protocols, analyzing cyber defenses, or preparing your Capstone Project, I am right here to help you understand every concept! 

What would you like to explore today?`;
  }

  // Code & AI track
  if (lower.includes('variable') || lower.includes('store')) {
    return `In Python, a variable is like a labelled storage box in your classroom! For example:
\`\`\`python
student_name = "${studentName}"
score = 95
\`\`\`
Whenever you print(student_name), Python retrieves the value stored inside the box!`;
  }

  if (lower.includes('if') || lower.includes('condition') || lower.includes('decision')) {
    return `An if-statement lets your program make smart decisions based on conditions:
\`\`\`python
if score >= 50:
    print("Pass! Excellent work 🎉")
else:
    print("Keep practicing, you will get it! 💪")
\`\`\`
Notice the colon (:) at the end of the condition and the 4 spaces of indentation!`;
  }

  if (lower.includes('loop') || lower.includes('range')) {
    if (tier === 'jss') {
      return `In JSS Python, we focus on sequential instructions and conditionals (if/elif/else). Repeating loops are introduced in Senior Secondary (SS), but you can build wonderful decision-making programs right now!`;
    }
    return `Loops in SS Python automate repetition using for-loops:
\`\`\`python
for num in range(1, 6):
    print("Count:", num)
\`\`\`
Python runs the indented code repeatedly for each number from 1 up to 5!`;
  }

  return `Hello ${studentName}! I am Fortune's AI Guide at the Code & AI Lab. 
I'm here to guide your computational thinking, explain programming concepts, and help you solve challenges step-by-step. 

Feel free to ask a question or pick one of the quick suggestions! 🚀`;
}

startServer();
