import { MiniAIResult, RunResult } from '../types';

export function stripComment(line: string): string {
  let inSingle = false;
  let inDouble = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === "'" && !inDouble) inSingle = !inSingle;
    else if (c === '"' && !inSingle) inDouble = !inDouble;
    else if (c === '#' && !inSingle && !inDouble) return line.slice(0, i);
  }
  return line;
}

export function translateExpr(expr: string): string {
  let e = expr;
  e = e.replace(/\bTrue\b/g, 'true').replace(/\bFalse\b/g, 'false').replace(/\bNone\b/g, 'null');
  e = e.replace(/\band\b/g, '&&').replace(/\bor\b/g, '||').replace(/\bnot\b/g, '!');
  return e;
}

export function getIndent(line: string): number {
  const m = line.match(/^[ \t]*/);
  return m ? m[0].replace(/\t/g, '    ').length : 0;
}

export function transpile(source: string): string {
  const rawLines = source.split('\n');
  const lines: { indent: number; text: string }[] = [];
  for (const raw of rawLines) {
    const noComment = stripComment(raw);
    if (noComment.trim() === '') continue;
    lines.push({ indent: getIndent(noComment), text: noComment.trim() });
  }
  const declared = new Set<string>();
  const out: string[] = [];
  const indentStack = [0];

  function closeTo(indent: number) {
    while (indentStack.length > 1 && indentStack[indentStack.length - 1] > indent) {
      indentStack.pop();
      out.push('}');
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const { indent, text } = lines[i];
    const isElif = /^elif\s+(.+):$/.test(text);
    const isElse = text === 'else:';
    if (isElif || isElse) {
      closeTo(indent + 4);
      indentStack.pop();
    } else {
      closeTo(indent);
    }
    let m: RegExpMatchArray | null;
    if ((m = text.match(/^if\s+(.+):$/))) {
      out.push(`if (${translateExpr(m[1])}) {`);
      indentStack.push(indent + 4);
    } else if ((m = text.match(/^elif\s+(.+):$/))) {
      out.push(`} else if (${translateExpr(m[1])}) {`);
      indentStack.push(indent + 4);
    } else if (isElse) {
      out.push(`} else {`);
      indentStack.push(indent + 4);
    } else if ((m = text.match(/^for\s+(\w+)\s+in\s+range\(([^)]+)\):$/))) {
      const varName = m[1];
      const args = m[2].split(',').map((s) => s.trim());
      let start = '0';
      let end: string;
      let step = '1';
      if (args.length === 1) {
        end = args[0];
      } else if (args.length === 2) {
        start = args[0];
        end = args[1];
      } else {
        start = args[0];
        end = args[1];
        step = args[2];
      }
      out.push(`for (let ${varName} = ${start}; ${varName} < ${end}; ${varName} += ${step}) {`);
      indentStack.push(indent + 4);
      declared.add(varName);
    } else if ((m = text.match(/^print\((.*)\)$/))) {
      out.push(`__print(${translateExpr(m[1])});`);
    } else if ((m = text.match(/^([A-Za-z_]\w*)\s*=\s*(.+)$/))) {
      const varName = m[1];
      const rhs = translateExpr(m[2]);
      if (declared.has(varName)) {
        out.push(`${varName} = ${rhs};`);
      } else {
        declared.add(varName);
        out.push(`let ${varName} = ${rhs};`);
      }
    } else {
      out.push(`${translateExpr(text)};`);
    }
  }
  closeTo(0);
  return out.join('\n');
}

export function runMiniPython(source: string, tier?: 'primary' | 'jss' | 'ss'): RunResult {
  // Tier Gating: JSS and Primary tiers get the no-loop subset
  if ((tier === 'jss' || tier === 'primary') && (/\bfor\s+/.test(source) || /\bwhile\s+/.test(source))) {
    return {
      output: [],
      error:
        "Loops ('for' and 'while') are unlocked in the Senior Secondary (SS) tier. In JSS, focus on mastering variables, calculations, string formatting, and if/else decisions!",
    };
  }

  const output: string[] = [];
  const maxOutputLines = 100;
  let truncated = false;

  const __print = (...args: unknown[]) => {
    if (output.length >= maxOutputLines) {
      if (!truncated) {
        output.push('[Output limit reached (100 lines max)]');
        truncated = true;
      }
      return;
    }
    output.push(args.map((a) => (typeof a === 'object' && a !== null ? JSON.stringify(a) : String(a))).join(' '));
  };

  let js: string;
  try {
    js = transpile(source);
  } catch {
    return { output: [], error: "Couldn't understand that code. Try one of the example snippets!" };
  }

  try {
    // Execute inside function scope with safe print wrapper
    const fn = new Function('__print', js);
    fn(__print);
  } catch (e: unknown) {
    const err = e as Error;
    if (err instanceof SyntaxError) {
      return {
        output,
        error: "There's a small mistake in your code (maybe a missing quote, colon, or bracket). Check it and try again!",
      };
    }
    return { output, error: 'Oops — something went wrong while running: ' + (err.message || String(e)) };
  }

  return { output, error: null };
}

// 8.2 Mini AI mood detector (JS)
export const POSITIVE = [
  'happy', 'good', 'great', 'love', 'awesome', 'excited', 'fun', 'amazing',
  'joy', 'wonderful', 'best', 'glad', 'nice', 'cool', 'yes', 'win', 'proud'
];

export const NEGATIVE = [
  'sad', 'bad', 'angry', 'hate', 'terrible', 'awful', 'upset', 'worried',
  'cry', 'annoyed', 'worst', 'tired', 'fear', 'no', 'boring', 'lost', 'sick'
];

export function detectMood(text: string): MiniAIResult {
  const words = text.toLowerCase().match(/[a-z']+/g) || [];
  const posHits = [...new Set(words.filter((w) => POSITIVE.includes(w)))];
  const negHits = [...new Set(words.filter((w) => NEGATIVE.includes(w)))];
  let verdict: 'Positive' | 'Negative' | 'Mixed' | 'Neutral / Not sure';
  let emoji: string;

  if (posHits.length === 0 && negHits.length === 0) {
    verdict = 'Neutral / Not sure';
    emoji = '🤔';
  } else if (posHits.length > negHits.length) {
    verdict = 'Positive';
    emoji = '😊';
  } else if (negHits.length > posHits.length) {
    verdict = 'Negative';
    emoji = '😔';
  } else {
    verdict = 'Mixed';
    emoji = '😐';
  }

  return { verdict, emoji, posHits, negHits };
}
