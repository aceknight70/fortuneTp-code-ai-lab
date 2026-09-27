import { CaiAssignment, CaiProject, CaiTraining, CaiWeek } from '../types';

export interface OfficeSecret {
  id: string;
  app: 'Word' | 'PowerPoint';
  title: string;
  codename: string;
  tagline: string;
  difficulty: 'Essential' | 'Advanced' | 'Master' | 'Legendary';
  description: string;
  whyItsASecret: string;
  keyboardShortcuts: string[];
  beforeState: string;
  studentAction: string;
  afterState: string;
  badgeReward: string;
  interactiveType: 'section_break' | 'table_math' | 'mail_merge' | 'animation_painter' | 'morph';
}

export const MS_OFFICE_SECRETS: OfficeSecret[] = [
  {
    id: 'secret-01',
    app: 'Word',
    title: 'Section Breaks: Independent Page Layouts in a Single Document',
    codename: 'THE ORIENTATION ISOLATOR',
    tagline: 'Make Page 2 Landscape for a wide table without flipping Pages 1 and 3!',
    difficulty: 'Advanced',
    description: `A standard Page Break (Ctrl+Enter) only pushes text to the next page, but all pages remain bound to the same orientation, margins, and headers. Section Breaks ('Next Page' and 'Continuous') create isolated layout partitions in Word. With a Section Break, you can change margins, switch orientation from Portrait to Landscape, unlink headers/footers ('Link to Previous' off), and start new page numbering systems (e.g. roman numerals i, ii for front matter and arabic 1, 2, 3 for body text).`,
    whyItsASecret: `Over 90% of students and office workers believe you have to create separate Word files for portrait pages and landscape tables. Section Breaks solve this cleanly in a single master document.`,
    keyboardShortcuts: ['Layout > Breaks > Section Breaks > Next Page', 'Alt + P, B, N (Word Shortcut)', 'Double-click Header > Uncheck Link to Previous'],
    beforeState: `Document is 3 pages long. All pages are in Portrait orientation with standard 1-inch margins and identical linked headers.`,
    studentAction: `1. Place cursor at the end of Page 1 and insert a Section Break (Next Page). 2. Move cursor to Section 2 (Page 2) and uncheck 'Link to Previous' on the Header & Footer tab. 3. Change Section 2 orientation to Landscape. 4. Insert another Section Break (Next Page) at the end of Page 2 and set Section 3 back to Portrait.`,
    afterState: `Page 1 is Portrait (Cover/Intro), Page 2 is Landscape (Wide Expenditure Table), and Page 3 is Portrait (Summary). Section 2 has its own independent header. Pass Check: Verified clean orientation isolation without whole-document distortion.`,
    badgeReward: 'Section Break Architect 📄✨',
    interactiveType: 'section_break',
  },
  {
    id: 'secret-02',
    app: 'Word',
    title: 'Dynamic Table Formulas: Math Calculations Without Excel',
    codename: 'THE TABLE CALCULATOR (=SUM(ABOVE))',
    tagline: 'Calculate sums, averages, and counts directly inside MS Word tables with F9 updates!',
    difficulty: 'Essential',
    description: `You do not need to launch Microsoft Excel or hand-type calculator figures to sum rows or columns in Word tables. Word has a built-in calculation engine using formulas like =SUM(ABOVE), =SUM(LEFT), =AVERAGE(ABOVE), and =COUNT(ABOVE). Furthermore, by pressing Alt+F9, you reveal the underlying field codes { =SUM(ABOVE) \\# "₦#,##0.00" }, and whenever table values change, selecting the result and tapping F9 automatically recalculates the total.`,
    whyItsASecret: `Most users manually compute numbers and type them into Word tables, which causes massive discrepancies when invoices or fees are revised. =SUM(ABOVE) provides automated arithmetic precision.`,
    keyboardShortcuts: ['Table Tools Layout > Formula', '=SUM(ABOVE)', 'F9 (Update Field)', 'Alt + F9 (Toggle Field Codes)'],
    beforeState: `A 4-row PTA invoice table with empty Grand Total and Average score cells at the bottom.`,
    studentAction: `1. Click in the bottom Total cell. 2. Open Table Tools Layout > Formula. 3. Insert '=SUM(ABOVE)' with number format '₦#,##0.00'. 4. Modify a tuition fee row and press F9 to trigger automated recalculation.`,
    afterState: `Grand Total cell dynamically computes all cells above it in formatted Nigerian Naira. Pressing F9 reflects the updated figures instantly. Pass Check: Formula code verified and recalculated.`,
    badgeReward: 'Word Math Virtuoso 🧮⚡',
    interactiveType: 'table_math',
  },
  {
    id: 'secret-03',
    app: 'Word',
    title: 'Mail Merge Rules: Conditional If...Then...Else Personalization',
    codename: 'THE CONDITIONAL MERGE ENGINE',
    tagline: 'Automatically change sentences based on recipient data (Scholarships, balances, honours)!',
    difficulty: 'Master',
    description: `Basic Mail Merge replaces simple tokens like «First_Name». But the real secret weapon of executive secretaries and registrar offices is Mailings > Rules > 'If...Then...Else...'. This allows dynamic document branching: If a student's score is >= 75, Word inserts a scholarship commendation sentence; if score < 75, Word inserts standard registration instructions. You can also use 'Next Record If', 'Merge Record #', and 'Fill-in' prompts.`,
    whyItsASecret: `Schools and businesses spend hours creating separate letters for different student categories. Mail Merge Rules allow one master template to produce hundreds of customized letters with variable logic.`,
    keyboardShortcuts: ['Mailings > Rules > If...Then...Else...', 'Ctrl + F9 (Insert Blank Field Brackets)', 'Mailings > Preview Results'],
    beforeState: `A template admission letter connected to a 4-student class database with fields: Name, EntranceScore, and School.`,
    studentAction: `1. Select the recommendation paragraph. 2. Click Mailings > Rules > 'If...Then...Else...'. 3. Specify Condition: IF EntranceScore >= 75 THEN insert 'Awarded Principal Merit Scholarship' ELSE insert 'Standard Registration Required'. 4. Preview and toggle through all 4 student records.`,
    afterState: `High-scoring candidates receive the scholarship paragraph, while other candidates receive standard guidelines. Pass Check: Both conditional branches dynamically verified across dataset.`,
    badgeReward: 'Mail Merge Maestro ✉️🎯',
    interactiveType: 'mail_merge',
  },
  {
    id: 'secret-04',
    app: 'PowerPoint',
    title: 'The Animation Painter: Instant Multi-Effect Motion Cloning',
    codename: 'THE MOTION BRUSH',
    tagline: 'Copy intricate 3-layer animation sequences to multiple objects in a single double-click!',
    difficulty: 'Advanced',
    description: `Creating a professional presentation card often requires stacking 3 animation effects: an Entrance (Zoom), an Emphasis (Pulse), and exact timing with a 0.3s delay. Manually repeating this on 8 different cards takes dozens of tedious clicks. With the Animation Painter (on the Animations ribbon), selecting the animated source object and double-clicking the paintbrush locks the brush so you can click Card A, Card B, and Card C consecutively to clone the exact animation stack in 2 seconds!`,
    whyItsASecret: `Almost everyone knows about the Format Painter for text styling, but few discover the Animation Painter for cloning complex motion and timing choreography.`,
    keyboardShortcuts: ['Animations > Animation Painter', 'Double-Click to Lock Brush Mode', 'Esc to release brush', 'Alt + Shift + C (Copy Animation) / Alt + Shift + V (Paste Animation)'],
    beforeState: `Master Hero Card has a 3-step animation sequence (Zoom Entrance, Gold Pulse Emphasis, 0.4s Duration). Target Cards A, B, and C have 0 animations.`,
    studentAction: `1. Select Master Hero Card. 2. Double-click the 'Animation Painter' button to lock multi-paint mode. 3. Sequentially click Card A, Card B, and Card C. 4. Tap Esc to exit brush mode and launch Slide Preview.`,
    afterState: `All 4 cards possess identical animation timing, duration, and effects, triggering in rhythmic succession. Pass Check: Multi-object animation stack verified.`,
    badgeReward: 'Choreography Painter 🎨🏃',
    interactiveType: 'animation_painter',
  },
  {
    id: 'secret-05',
    app: 'PowerPoint',
    title: 'The Morph Transition: Seamless Cinematic Keynote Animations',
    codename: 'THE MORPH ILLUSIONIST',
    tagline: 'Create Apple/Pixar-level fluid slide transformations without drawing motion paths!',
    difficulty: 'Legendary',
    description: `Morph is PowerPoint's most powerful visual transition. Instead of jerky slide cuts, Morph analyzes identical objects across two consecutive slides and smoothly animates their position, size, rotation, and color. By duplicating Slide 1, moving and resizing an element on Slide 2, and applying Transitions > Morph with a 1.5s duration, PowerPoint creates a continuous cinematic camera zoom. You can even use the exclamation naming trick (naming objects '!!icon' in the Selection Pane) to morph completely different shapes into one another!`,
    whyItsASecret: `Novice presenters clutter slides with dozens of chaotic entrance effects. Professional keynote designers use Morph to create a calm, cinematic storytelling flow that captivates audiences.`,
    keyboardShortcuts: ['Transitions > Morph', 'Effect Options: Objects / Words / Characters', 'Alt + F10 (Selection Pane for !! naming trick)', 'Duration: 1.50s'],
    beforeState: `Slide 1 shows a small planetary system overview. Slide 2 contains an enlarged, highlighted focal planet with detailed spec callouts, but transitions with an abrupt Cut.`,
    studentAction: `1. Select Slide 2. 2. Navigate to Transitions and select 'Morph'. 3. Set Effect Options to 'Objects'. 4. Set duration to 1.75 seconds. 5. Play the slide show transition to preview fluid interpolation.`,
    afterState: `The planetary element glides across the screen, smoothly enlarging while text cards gently dissolve into view. Pass Check: Continuous coordinate and scale interpolation verified.`,
    badgeReward: 'Cinematic Morph Master 🎬🪐',
    interactiveType: 'morph',
  },
];

export const DT_WEEKS: CaiWeek[] = [
  {
    id: 'dt-01',
    week_number: 1,
    tier: 'jss',
    programme: 'digital_technologies',
    title: 'Revision of JSS2 Concepts & Introduction to Digital Technologies',
    learn_text: `Welcome to JSS3 Digital Technologies! Digital technology is the branch of scientific computing that uses electronic microchips, software algorithms, and networked systems to solve practical human problems.

In this introductory module, we review core digital competencies:
1. Review of JSS2 Computing: Hardware fundamentals, operating systems, file directories, and basic data processing.
2. Introduction to Digital Entrepreneurship: How young creators in Nigeria leverage digital skills to build websites, launch educational platforms, design media content, and automate office tasks.
3. Management of E-Waste: As devices become obsolete, electronic waste (discarded computers, mobile phones, printed circuit boards) poses severe toxic hazards (lead, mercury, cadmium). Students learn safe handling, device refurbishment, and circular recycling protocols.`,
    do_instructions: `Review the e-waste lifecycle audit, inspect the digital entrepreneurship opportunity matrix, and complete the Week 1 checkpoint quiz.`,
    content_json: {
      dtConcept: 'Digital technologies combine hardware, software, and ethical digital stewardship including e-waste reduction.',
      dtRealWorldCase: 'In the computer markets of Computer Village (Ikeja, Lagos), technicians refurbish discarded corporate desktop computers, replacing damaged capacitors and hard drives with fast SSDs to supply affordable learning machines to public schools while preventing toxic lead contamination.',
      dtInteractiveType: 'concept',
      challenge: 'Identify which computer disposal methods are environmentally sound versus illegal dumping.',
      quiz: [
        {
          question: 'What is the primary danger of disposing of old computer monitors and circuit boards in open municipal dumps?',
          options: [
            'They occupy too much physical space in dump trucks',
            'Heavy metals like lead, mercury, and cadmium leach into groundwater and soil',
            'They cause radio waves to interfere with television broadcasts',
            'They immediately catch fire in normal sunlight'
          ],
          correctIndex: 1,
          explanation: 'E-waste contains hazardous heavy metals like lead and mercury that poison water tables and agricultural land if not recycled in specialized facilities.'
        },
        {
          question: 'Which of the following is an example of digital entrepreneurship for a secondary school student in Nigeria?',
          options: [
            'Selling physical exercise books outside the school gate',
            'Designing event flyers and social media banners for local businesses using desktop publishing software',
            'Cleaning chalkboard erasers after lessons',
            'Writing handwritten letters for neighborhood post'
          ],
          correctIndex: 1,
          explanation: 'Digital entrepreneurship involves providing services or building products using digital computing skills like graphic design, document layout, or web development.'
        },
        {
          question: 'What is the most environmentally responsible first step when a school computer becomes sluggish?',
          options: [
            'Throw it into the school incinerator immediately',
            'Diagnose faults, clean internal dust, upgrade RAM/SSD, and refurbish the unit for younger pupils',
            'Bury it behind the science laboratory',
            'Leave it in the rain to wash the microchips'
          ],
          correctIndex: 1,
          explanation: 'Refurbishing and upgrading extend device lifespan, reduce carbon footprint, and prevent premature e-waste generation.'
        }
      ]
    },
    updated_at: new Date('2026-01-10T08:00:00Z').toISOString(),
  },
  {
    id: 'dt-02',
    week_number: 2,
    tier: 'jss',
    programme: 'digital_technologies',
    title: 'Advanced Word Processing I: Page Layout, Tables & Mail Merge',
    learn_text: `Advanced Microsoft Word features allow professionals to build structured, publication-quality documents with dynamic data. 

Part A — The Three Subtopic Real-World Examples (verbatim, unchanged from the original Lesson Notes):

1. Page Layout
Real-World Example: Designing an official multi-page school terminal magazine or government report. The cover and introduction pages require standard A4 Portrait layout with 1-inch margins, while Page 3 features a wide financial expenditure spreadsheet table requiring Landscape orientation, and Page 4 returns to Portrait with a 2-column newsletter article format. Without Section Breaks, changing Page 3 to Landscape would flip the entire 20-page document! Section Breaks ('Next Page' and 'Continuous') isolate layout rules so margins, orientation, headers, and column counts change independently per section.

2. Tables
Real-World Example: Preparing an official student term bill or PTA financial invoice inside Microsoft Word. The table consists of columns for Fee Description, Term Quantity, Unit Rate, and Total Amount. Instead of calculating sums by hand or copying back and forth from Excel, Word tables allow dynamic formula fields. Placing =SUM(ABOVE) in the bottom cell dynamically totals all currency values above it. When an amount changes (e.g. tuition adjustment), selecting the field and pressing F9 immediately recalculates the total, eliminating arithmetic errors in official correspondence.

3. Mail Merge
Real-World Example: A secondary school principal issuing individualized admission offer and scholarship award letters to 250 admitted candidates. Each student has a distinct name, guardian address, admission number, entrance score, and scholarship eligibility. Instead of typing 250 separate documents, the secretary maintains a single recipient data spreadsheet and links it to a master Word letter template using Mail Merge fields («First_Name», «Exam_Score»). By applying Mail Merge Rules (IF...THEN...ELSE), students with scores above 80 automatically receive a scholarship commendation paragraph, while others receive standard enrollment guidelines, generating 250 unique personalized PDFs in seconds.`,
    do_instructions: `Execute the Week 2 Precision Test Specifications below: Test 1 (Page Layout Section Break Isolation), Test 2 (Table =SUM(ABOVE) Calculation & F9 Recalculation), and Test 3 (Mail Merge IF...THEN...ELSE Conditional Personalization).`,
    content_json: {
      dtConcept: 'Advanced Word skills (Section Breaks, Table Math, Mail Merge Rules) eliminate manual repetition and enable dynamic document engineering.',
      dtRealWorldCase: 'Fortune Academy registrar office automated 600 terminal parent reports using a single Word template with =SUM(ABOVE) fee auditing and conditional scholarship rules, saving 35 hours of manual re-typing.',
      dtInteractiveType: 'concept',
      challenge: 'Demonstrate Before State -> Student Action -> After State for Section Breaks, =SUM(ABOVE), and Mail Merge Rules.',
      quiz: [
        {
          question: 'How do you switch Page 2 of a Word document to Landscape without changing Page 1 and Page 3?',
          options: [
            'Use standard Page Break (Ctrl+Enter) twice',
            'Insert Section Break (Next Page) before and after Page 2, unlink headers, and set Section 2 orientation to Landscape',
            'Zoom out to 50% and rotate the monitor physically',
            'Print the entire document as PDF and rotate the PDF page in Acrobat'
          ],
          correctIndex: 1,
          explanation: 'Section Breaks create separate formatting partitions. Page orientation is a section-level setting, so isolating Page 2 inside its own section allows it to be Landscape independently.'
        },
        {
          question: 'What is the function of pressing F9 in a Microsoft Word table containing formulas?',
          options: [
            'It deletes the selected row permanently',
            'It updates and recalculates the active formula field code (e.g. =SUM(ABOVE))',
            'It changes the font color to blue',
            'It saves the document as an Excel spreadsheet'
          ],
          correctIndex: 1,
          explanation: 'F9 is the Microsoft Word universal field update key. When table values change, F9 recalculates =SUM(ABOVE) without having to re-enter formulas.'
        },
        {
          question: 'In Microsoft Word Mail Merge, what does the IF...THEN...ELSE rule accomplish?',
          options: [
            'It crashes the computer if a student score is zero',
            'It inserts variable text or fields into a merged letter depending on whether recipient data meets a specified condition',
            'It sorts the recipient contact list in reverse alphabetical order',
            'It forces the printer to print in black-and-white only'
          ],
          correctIndex: 1,
          explanation: 'The IF...THEN...ELSE rule evaluates recipient spreadsheet criteria (such as entrance scores or fee clearance) and automatically inserts custom clauses for each individual recipient.'
        }
      ]
    },
    updated_at: new Date('2026-01-10T08:00:00Z').toISOString(),
  },
  {
    id: 'dt-03',
    week_number: 3,
    tier: 'jss',
    programme: 'digital_technologies',
    title: 'Advanced MS PowerPoint: Custom Animations, Animation Painter & Morph',
    learn_text: `Presentation software is a vital tool for communicating ideas persuasively. Advanced PowerPoint goes far beyond basic slide bullet points:

1. Animation Layers & Timing:
- Entrance effects (Fade In, Zoom, Float In) introduce content smoothly.
- Emphasis effects (Pulse, Spin, Color Change) draw attention to critical statistics.
- Motion Paths direct objects across custom visual trajectories.
- Timing: Setting 'Start With Previous' or 'Start After Previous' with specified delays creates cinematic choreography without clicking.

2. The Animation Painter Secret:
When you have created a 3-layer animation stack on one shape, manually repeating those 8 steps on 10 other shapes is frustrating. Double-clicking the 'Animation Painter' button locks copy mode, letting you brush the identical motion sequence across multiple elements in seconds.

3. The Morph Slide Transition:
Morph analyzes shapes across consecutive slides and creates seamless, Apple-keynote style fluid motion. By duplicating a slide and shifting an object's position, size, or color, Morph produces high-end 3D-like zoom and panning effects without complex path editing.`,
    do_instructions: `Configure a 2-slide presentation with Morph transition, clone animations using Animation Painter, and answer the PowerPoint mastery questions.`,
    content_json: {
      dtConcept: 'The Animation Painter and Morph Transition elevate presentations into cinematic storytelling engines.',
      dtRealWorldCase: 'During the Lagos State STEM Fair, the winning JSS3 team used Morph transitions to simulate microscopic cell division across 4 slides, captivating the panel of engineering judges.',
      dtInteractiveType: 'concept',
      challenge: 'Set up an animation sequence and duplicate it across 3 cards using the Animation Painter.',
      quiz: [
        {
          question: 'What is the major advantage of double-clicking the Animation Painter instead of single-clicking it?',
          options: [
            'It makes the animation 2x faster',
            'It locks the painter so you can paint the animation onto multiple objects consecutively until pressing Esc',
            'It automatically deletes the original object',
            'It converts the animation into an MP4 video file'
          ],
          correctIndex: 1,
          explanation: 'Single-clicking the Animation Painter applies the effect to one target object and turns off. Double-clicking keeps the tool active for multi-object cloning.'
        },
        {
          question: 'For the PowerPoint Morph transition to animate an object smoothly between Slide 1 and Slide 2, what must be true?',
          options: [
            'The slides must both be blank with no text',
            'At least one common object or shape must exist on both slides so PowerPoint can interpolate its position, size, or color',
            'The computer must have an active internet connection to download Pixar templates',
            'The user must draw a manual bezier curve motion path on both slides'
          ],
          correctIndex: 1,
          explanation: 'Morph automatically tracks objects that persist across consecutive slides and smoothly calculates intermediate frames.'
        },
        {
          question: 'Which animation trigger setting allows visual cards to appear one after another automatically without requiring mouse clicks?',
          options: ['On Click', 'Start After Previous', 'Pause When Idle', 'Loop Forever'],
          correctIndex: 1,
          explanation: "'Start After Previous' triggers the animation as soon as the preceding animation completes, creating an automated sequence."
        }
      ]
    },
    updated_at: new Date('2026-01-10T08:00:00Z').toISOString(),
  },
  {
    id: 'dt-04',
    week_number: 4,
    tier: 'jss',
    programme: 'digital_technologies',
    title: 'Advanced Word Processing II: Document Structuring & Citations',
    learn_text: `Creating long-form academic documents, dissertations, and project reports requires standardized structural controls:

1. Automatic Table of Contents (TOC):
Instead of typing chapter titles and dotted lines manually, students format headings using Word Styles (Heading 1, Heading 2, Heading 3). Going to References > Table of Contents automatically compiles a clickable TOC with exact page numbers. If text moves, right-click > 'Update Field' syncs page numbers instantly.

2. Unlinking Headers & Footers for Roman/Arabic Pagination:
Formal reports require roman numerals (i, ii, iii) for the Title Page, Acknowledgements, and Table of Contents, and Arabic numbers (1, 2, 3...) starting on Chapter 1. By inserting a Section Break before Chapter 1, deselecting 'Link to Previous' on the Header/Footer tab, and configuring Page Number Format > 'Start at 1', two completely different numbering systems coexist in one file.

3. Footnotes, Endnotes & Bibliographic References:
Using References > Insert Footnote adds superscript numbers and citation text at the bottom of the page, maintaining academic integrity.`,
    do_instructions: `Structure a 5-page mock academic report with styled Headings, an automated Table of Contents, and unlinked roman/arabic page numbering.`,
    content_json: {
      dtConcept: 'Word Styles and unlinked Section Headers automate long-document indexing and professional academic formatting.',
      dtRealWorldCase: 'A student preparing a 25-page junior secondary science project report updated their TOC in 2 seconds before printing by right-clicking Update Table, avoiding 3 hours of manual page auditing.',
      dtInteractiveType: 'concept',
      challenge: 'Configure a document where front matter has roman page numbers and Chapter 1 begins at page 1 in Arabic numerals.',
      quiz: [
        {
          question: 'What prerequisite is required before Word can generate an automatic Table of Contents?',
          options: [
            'All text must be bolded and centered',
            'Headings must be formatted using built-in heading styles (Heading 1, Heading 2, etc.)',
            'The document must be saved with an .xls file extension',
            'The document must have at least 100 pages'
          ],
          correctIndex: 1,
          explanation: 'Word scans the document for Paragraph Styles tagged as Heading 1, 2, or 3 to construct the hierarchical Table of Contents.'
        },
        {
          question: 'Why must you uncheck "Link to Previous" when setting up different headers in Section 2?',
          options: [
            'To prevent Section 2 from inheriting the header text and page numbering scheme of Section 1',
            'To delete all previous paragraphs in the document',
            'To turn off the computer spelling checker',
            'To lock the file against external editing'
          ],
          correctIndex: 0,
          explanation: "'Link to Previous' binds the current section header to the previous section. Unlinking grants total design independence."
        }
      ]
    },
    updated_at: new Date('2026-01-10T08:00:00Z').toISOString(),
  },
  {
    id: 'dt-05',
    week_number: 5,
    tier: 'jss',
    programme: 'digital_technologies',
    title: 'Advanced Spreadsheets: Logical IF Functions & Conditional Formatting',
    learn_text: `Microsoft Excel and Google Sheets are the world's most widely used tools for quantitative analysis and financial modeling:

1. Formula Architecture & Cell Referencing:
- Relative references (A1, B2) adjust automatically when formulas are dragged.
- Absolute references ($A$1, $B$2) stay fixed on a constant value like tax rate or bonus multiplier.

2. The Logical =IF() Function:
Syntax: =IF(logical_test, value_if_true, value_if_false)
Example: =IF(C2 >= 50, "PASS", "FAIL")
Nested IFs allow multi-tier grading:
=IF(C2 >= 75, "Distinction", IF(C2 >= 50, "Credit", "Remedial"))

3. Conditional Formatting:
Conditional formatting automatically highlights cells with colors, icons, or data bars based on rules (e.g. green for scores >= 70, red for scores < 40), allowing instant visual outlier detection in large datasets.`,
    do_instructions: `Construct a 10-student term score spreadsheet with weighted totals, automated IF grading formulas, and conditional color highlighting.`,
    content_json: {
      dtConcept: 'Logical IF formulas and conditional formatting transform raw numeric grids into automated business intelligence dashboards.',
      dtRealWorldCase: 'The examination committee of an educational district uses Excel conditional formatting to instantly flag students with sub-40 scores for intervention classes.',
      dtInteractiveType: 'concept',
      challenge: 'Write a nested IF formula that assigns letter grades (A, B, C, F) based on terminal exam averages.',
      quiz: [
        {
          question: 'What does the formula =IF(D4>=70, "A", "Needs Review") do?',
          options: [
            'It adds 70 to the number in cell D4',
            'It evaluates cell D4: if it is 70 or higher, it displays "A"; otherwise, it displays "Needs Review"',
            'It rounds cell D4 to the nearest integer',
            'It sends an email notification to student D4'
          ],
          correctIndex: 1,
          explanation: 'The IF function evaluates the condition (D4>=70) and returns the corresponding branch output.'
        },
        {
          question: 'What does placing dollar signs like $C$2 in an Excel formula signify?',
          options: [
            'It converts the number to American Dollars ($)',
            'It makes the cell reference absolute so it does not change when copied across rows or columns',
            'It hides the formula from other users',
            'It calculates bank interest'
          ],
          correctIndex: 1,
          explanation: 'Dollar signs lock the column and row coordinates (absolute reference) so dragging formulas does not alter the referenced cell.'
        }
      ]
    },
    updated_at: new Date('2026-01-10T08:00:00Z').toISOString(),
  },
  {
    id: 'dt-06',
    week_number: 6,
    tier: 'jss',
    programme: 'digital_technologies',
    title: 'Database Management & Simple Queries (MS Access / Data Tables)',
    learn_text: `While spreadsheets handle basic calculations, large systems rely on Relational Database Management Systems (RDBMS) like Microsoft Access, MySQL, and PostgreSQL:

1. Relational Database Concepts:
- Table: A structured collection of related data.
- Field (Column): A specific category of information (e.g. Student_ID, First_Name, Date_of_Birth).
- Record (Row): A complete set of fields belonging to one entity (e.g. all information about Student #104).
- Primary Key: A unique identifier that ensures no two records are duplicated (e.g. National Identity Number NIN, Admission PIN).

2. Designing Queries:
A query extracts specific records matching criteria from thousands of rows:
- SELECT Student_Name, Exam_Score FROM Students WHERE Exam_Score > 75 ORDER BY Exam_Score DESC;
Students learn how to use Query By Example (QBE) grids in MS Access to filter, sort, and calculate aggregate summaries.`,
    do_instructions: `Design a school library database schema with Books and Borrowers tables, assign primary keys, and execute a filter query for overdue books.`,
    content_json: {
      dtConcept: 'Databases maintain data integrity through unique Primary Keys and enable instantaneous search queries across massive collections.',
      dtRealWorldCase: 'The Joint Admissions and Matriculation Board (JAMB) uses enterprise relational databases to register over 1.8 million candidates and query examination venues in milliseconds.',
      dtInteractiveType: 'concept',
      challenge: 'Differentiate between a Field, a Record, and a Primary Key in an institutional database.',
      quiz: [
        {
          question: 'Why is a Primary Key essential in a database table?',
          options: [
            'It makes the table look colorful on screen',
            'It uniquely identifies each individual record and prevents duplicate or conflicting entries',
            'It encrypts the hard drive so hackers cannot boot the computer',
            'It allows the database to open without entering a password'
          ],
          correctIndex: 1,
          explanation: 'A Primary Key must contain unique, non-null values for every record, guaranteeing that individual entities (like students or invoices) can never be confused.'
        },
        {
          question: 'In database terminology, what corresponds to a single horizontal row containing all data for one student?',
          options: ['A Field', 'A Record (or Tuple)', 'A Data Type', 'A Form'],
          correctIndex: 1,
          explanation: 'A Record represents a single complete data entry containing all relevant attributes (fields) for that specific entity.'
        }
      ]
    },
    updated_at: new Date('2026-01-10T08:00:00Z').toISOString(),
  },
  {
    id: 'dt-07',
    week_number: 7,
    tier: 'jss',
    programme: 'digital_technologies',
    title: 'Graphic Design & Digital Media Content (Canva / DTP Fundamentals)',
    learn_text: `Digital Media encompasses graphics, audio, video, and animation produced and distributed electronically. Students explore visual communication principles using Desktop Publishing (DTP) and Canva:

1. Principles of Graphic Design:
- Visual Hierarchy: Arranging titles, subtitles, and body text in size order so the human eye reads the most critical information first.
- Contrast & Readability: Dark text on light backgrounds (or white text on deep navy) ensures readability from a distance.
- Balance & White Space: Giving elements breathing room prevents cluttered, amateur designs.
- Typography: Pairing heading fonts (bold sans-serif) with readable body fonts.

2. Creating Educational Posters & Event Flyers:
Students practice assembling high-impact flyers for school exhibitions, sports meets, and STEM fairs, applying grid layouts, high-resolution vector icons, and balanced composition.`,
    do_instructions: `Apply visual hierarchy rules to draft a high-contrast promotional flyer for the School Annual Science & Digital Tech Exhibition.`,
    content_json: {
      dtConcept: 'Visual hierarchy, typography discipline, and contrast govern effective graphic design and digital media creation.',
      dtRealWorldCase: 'A student-designed digital flyer for a school robotics fundraiser achieved a 400% higher attendance rate because the headline, venue, and date were organized with strong visual contrast.',
      dtInteractiveType: 'concept',
      challenge: 'Audit a cluttered design layout and identify 3 visual hierarchy corrections to improve readability.',
      quiz: [
        {
          question: 'What is "visual hierarchy" in graphic design?',
          options: [
            'Using only 3D graphics in every design',
            'Arranging visual elements in order of importance so viewers naturally see the primary message first',
            'Making all text exactly the same font size and color',
            'Placing images upside down to surprise viewers'
          ],
          correctIndex: 1,
          explanation: 'Visual hierarchy guides the viewer through the layout logically: Headline -> Sub-headline -> Call to Action -> Supporting Details.'
        },
        {
          question: 'Why should you avoid using low-contrast color combinations like light yellow text on a white background?',
          options: [
            'Printers refuse to print yellow ink',
            'It creates visual strain and is virtually illegible for readers',
            'Yellow font files consume excessive computer storage',
            'Yellow text crashes the graphics software'
          ],
          correctIndex: 1,
          explanation: 'High contrast between background and foreground is required for readability and accessibility.'
        }
      ]
    },
    updated_at: new Date('2026-01-10T08:00:00Z').toISOString(),
  },
  {
    id: 'dt-08',
    week_number: 8,
    tier: 'jss',
    programme: 'digital_technologies',
    title: 'Photo Editing, Digital Rights & Online Safety',
    learn_text: `Digital creators must understand both the technical tools of media editing and the ethical legal framework governing digital content:

1. Photo Editing Fundamentals:
- Cropping: Eliminating background distractions and framing the subject with the rule of thirds.
- Color Balance & Exposure: Adjusting brightness, contrast, and saturation to enhance clarity.
- Resolution & Formats: Differentiating JPEG (compressed photos), PNG (transparent backgrounds), and SVG (scalable vector graphics).

2. Intellectual Property, Copyright & Fair Use:
- Copyright gives authors, photographers, and musicians exclusive rights over their work.
- Fair Use allows limited educational excerpting with proper citation.
- Creative Commons (CC) licenses permit sharing under specified attribution terms.

3. Managing Your Digital Footprint:
Everything published online leaves a persistent trace. Students learn privacy settings, safe password hygiene, and compliance with the Nigeria Data Protection Act (NDPA).`,
    do_instructions: `Evaluate copyright attribution scenarios, crop and adjust an academic banner image, and review privacy settings for personal media.`,
    content_json: {
      dtConcept: 'Ethical digital citizenship combines creative image editing with copyright respect and active privacy protection.',
      dtRealWorldCase: 'A Nigerian startup creator received a formal copyright infringement notice for using an uncredited commercial photo from Google Images; they resolved the issue by switching to Creative Commons licensed photography with clear artist attribution.',
      dtInteractiveType: 'concept',
      challenge: 'Differentiate between Creative Commons (CC-BY), Public Domain, and full commercial copyright.',
      quiz: [
        {
          question: 'If you find an image on Google Images search, can you freely use it on your commercial company website without permission?',
          options: [
            'Yes, everything on Google Images is completely free for everyone',
            'No, search engines display copyrighted works that require permission or an appropriate license (e.g. Creative Commons)',
            'Yes, as long as you crop the top border',
            'Yes, if you view it on a mobile phone'
          ],
          correctIndex: 1,
          explanation: 'Google merely indexes photos; the copyright belongs to the creator unless explicitly released under Creative Commons or Public Domain.'
        },
        {
          question: 'What is a "digital footprint"?',
          options: [
            'The physical size of your laptop keyboard keys',
            'The permanent record of data and activity left behind when using digital devices and online services',
            'The ink left by a digital receipt printer',
            'A special computer mouse shaped like a foot'
          ],
          correctIndex: 1,
          explanation: 'Your digital footprint consists of browsing history, social media posts, comments, photos, and login logs recorded across digital platforms.'
        }
      ]
    },
    updated_at: new Date('2026-01-10T08:00:00Z').toISOString(),
  },
  {
    id: 'dt-09',
    week_number: 9,
    tier: 'jss',
    programme: 'digital_technologies',
    title: 'Web Design Basics: HTML5 Semantic Structure & Inline CSS',
    learn_text: `The World Wide Web is powered by markup and styling standards:

1. HTML5 (HyperText Markup Language):
HTML tags structure page content:
- Document Declaration: <!DOCTYPE html>
- Enclosing container: <html>, <head> for metadata, <body> for visible content.
- Semantic Tags: <header>, <nav>, <main>, <section>, <article>, <footer>.
- Content elements: <h1> to <h6> (headings), <p> (paragraphs), <a> (hyperlinks), <img> (images), <ul>/<ol>/<li> (lists).

2. CSS (Cascading Style Sheets) Fundamentals:
CSS controls visual styling:
- Inline styling: <h1 style="color: #17182B; font-family: sans-serif;">
- Properties: color, background-color, font-size, padding, margin, border.

Students build their first personal biography or school club webpage directly using clean HTML and inline CSS.`,
    do_instructions: `Write semantic HTML5 markup for a personal academic profile page including heading, profile summary, photo link, and skills list with inline CSS colors.`,
    content_json: {
      dtConcept: 'HTML provides the structural skeleton of web pages while CSS defines typography, colors, and layout aesthetics.',
      dtRealWorldCase: 'Over 1.9 billion websites worldwide rely on HTML5 semantic tags to ensure web accessibility for visually impaired screen readers and search engine indexers.',
      dtInteractiveType: 'concept',
      challenge: 'Assemble an HTML document structure containing header, paragraph, image link, and an unordered skills list.',
      quiz: [
        {
          question: 'Which HTML tag is used to create a clickable hyperlink to another web page?',
          options: ['<link>', '<a> (anchor tag with href attribute)', '<href>', '<click>'],
          correctIndex: 1,
          explanation: 'The <a> tag with href attribute (<a href="https://example.com">Visit</a>) creates navigational hyperlinks.'
        },
        {
          question: 'What does the <!DOCTYPE html> declaration at the very top of a web document do?',
          options: [
            'It sets the administrator password for the server',
            'It tells the web browser that the document is written in modern standard HTML5',
            'It downloads the entire Internet into computer memory',
            'It turns off CSS styling'
          ],
          correctIndex: 1,
          explanation: '<!DOCTYPE html> instructs web browsers to render the document in modern standards compliance mode.'
        }
      ]
    },
    updated_at: new Date('2026-01-10T08:00:00Z').toISOString(),
  },
  {
    id: 'dt-10',
    week_number: 10,
    tier: 'jss',
    programme: 'digital_technologies',
    title: 'ICT in Everyday Life: Fintech, E-Governance & Modern Services',
    learn_text: `Information and Communication Technology (ICT) has transformed commerce, health, governance, and daily life in Nigeria and worldwide:

1. Digital Payments & Fintech:
- Automated Clearing (NIBSS Instant Payment): How bank transfers settle in seconds between different financial institutions.
- USSD Banking (*737#, *919#): Enabling financial inclusion on basic feature phones without internet connections.
- Point of Sale (POS) Terminals & QR Codes: Transforming retail market transactions across Lagos, Abuja, and Kano.

2. E-Governance & Citizen Services:
- Digital Identity (National Identification Number NIN): Centralized verification preventing identity fraud.
- Online Passport Applications (NIS) & Driving License renewals (FRSC).
- Examination Portals (JAMB, WAEC, NECO): Online candidate registration, computerized testing (CBT), and digital scratch-card result checking.

3. Telemedicine & Cloud Education:
Remote consultations, electronic patient records, and virtual learning platforms like Fortune's Code & AI Lab.`,
    do_instructions: `Trace the electronic pathway of a mobile bank transfer from customer smartphone to merchant terminal, and evaluate ICT impact on Nigerian commerce.`,
    content_json: {
      dtConcept: 'ICT infrastructure powers seamless instant transactions, decentralized public services, and educational access.',
      dtRealWorldCase: 'During peak examination seasons, over 2 million Nigerian candidates check their WAEC and JAMB results simultaneously via secure web portals, replacing physical paper dispatch to thousands of secondary schools.',
      dtInteractiveType: 'concept',
      challenge: 'Map how USSD protocol enables digital banking on non-smart feature phones in rural areas.',
      quiz: [
        {
          question: 'Why is USSD (Unstructured Supplementary Service Data) technology vital for financial inclusion in Nigeria?',
          options: [
            'It requires a high-end 5G smartphone with expensive cameras',
            'It works over GSM cellular signal on basic button feature phones without requiring internet data bundles',
            'It only works inside commercial bank branches',
            'It converts physical cash into gold coins'
          ],
          correctIndex: 1,
          explanation: 'USSD operates over standard GSM signaling channels, allowing anyone with a basic phone to transfer funds and check balances without mobile internet.'
        },
        {
          question: 'What is a primary benefit of Computer-Based Testing (CBT) for examinations like JAMB?',
          options: [
            'Students can change answers after leaving the hall',
            'Instant grading, elimination of paper leakage, and rapid nationwide result processing',
            'Printers never have to be used again anywhere in the world',
            'The examination lasts 24 hours continuously'
          ],
          correctIndex: 1,
          explanation: 'CBT systems automate question randomization, immediate electronic grading, and tamper-resistant security.'
        }
      ]
    },
    updated_at: new Date('2026-01-10T08:00:00Z').toISOString(),
  },
  {
    id: 'dt-11',
    week_number: 11,
    tier: 'jss',
    programme: 'digital_technologies',
    title: 'Computer Maintenance, E-Waste & System Troubleshooting',
    learn_text: `Preventive maintenance keeps computing equipment operating reliably and extends hardware lifespans:

1. Preventive Hardware Care:
- Keeping workstations free of dust, liquid spills, and food particles.
- Ensuring adequate ventilation around CPU cooling fans and power supplies.
- Cable management: Preventing cord tangling and tripping hazards.
- Surge Protection: Using Uninterruptible Power Supplies (UPS) and voltage stabilizers to protect electronics against power fluctuations.

2. Software Diagnostics & Optimization:
- Disk Cleanup: Removing temporary cache files and freeing SSD space.
- Task Manager: Identifying rogue background programs consuming 100% CPU.
- Safe Mode & Malware Scans: Isolating corrupted drivers and system faults.

3. Safe E-Waste Disposal & Device Refurbishment:
Recycling decommissioned motherboards, batteries, and LCD screens through authorized e-waste aggregators to recover copper and gold while sequestering toxic pollutants.`,
    do_instructions: `Perform a diagnostic triage on 3 common computer faults (Overheating CPU, Unresponsive App, and Corrupted USB Drive) and prescribe corrective actions.`,
    content_json: {
      dtConcept: 'Regular preventive maintenance, surge protection, and diagnostic troubleshooting protect hardware investments and prevent premature electronic waste.',
      dtRealWorldCase: 'A secondary school computer lab doubled the lifespan of its 40 desktop PCs by performing termly compressed-air dust cleaning and installing a central 10kVA solar inverter to prevent power-cut damage.',
      dtInteractiveType: 'concept',
      challenge: 'Diagnose why a computer suddenly powers off after 15 minutes of intensive usage.',
      quiz: [
        {
          question: 'If a desktop computer runs loudly and powers off abruptly after 15 minutes of use, what is the most likely physical hardware fault?',
          options: [
            'The mouse pad is upside down',
            'CPU overheating due to dust-clogged fans or dried thermal paste triggering thermal shutdown',
            'The computer monitor has too many pixels',
            'The keyboard cable is too long'
          ],
          correctIndex: 1,
          explanation: 'CPUs have built-in thermal protection that automatically cuts power if temperatures exceed safe thresholds (usually 90-100°C).'
        },
        {
          question: 'What is the role of an Uninterruptible Power Supply (UPS) in a computing lab?',
          options: [
            'It provides instant battery backup power during blackouts so work can be saved safely without hardware shock',
            'It increases the internet download speed by 500%',
            'It prints color photos automatically',
            'It replaces the computer CPU chip'
          ],
          correctIndex: 0,
          explanation: 'A UPS provides battery backup and surge suppression, preventing sudden shutdowns and data corruption when mains power fails.'
        }
      ]
    },
    updated_at: new Date('2026-01-10T08:00:00Z').toISOString(),
  },
  {
    id: 'dt-12',
    week_number: 12,
    tier: 'jss',
    programme: 'digital_technologies',
    title: 'Term Revision & Practical Skills Assessment',
    learn_text: `A comprehensive evaluation consolidating the full JSS3 Digital Technologies curriculum:

1. Advanced MS Word Mastery Drill:
- Creating multi-section documents with mixed Portrait and Landscape pages.
- Applying Section Breaks (Next Page & Continuous) with independent headers/footers.
- Building structured financial tables with dynamic =SUM(ABOVE) formulas.
- Implementing Mail Merge with conditional IF...THEN...ELSE rules.

2. Presentation & Spreadsheets Drill:
- Applying PowerPoint Animation Painter to clone animation stacks.
- Configuring seamless Morph slide transitions.
- Writing Excel =IF() grading formulas and conditional formatting heatmaps.

3. Digital Citizenship & Systems Knowledge:
- Intellectual property, NDPR compliance, safe e-waste management, and database query concepts.`,
    do_instructions: `Complete the comprehensive 12-week review evaluation covering Word, PowerPoint, Excel, databases, and digital ethics.`,
    content_json: {
      dtConcept: 'Synthesizing word processing automation, presentation choreography, spreadsheet logic, and digital ethics into professional capability.',
      dtRealWorldCase: 'Students benchmark their practical skills against international digital literacy standards (ICDL and Microsoft Office Specialist certifications).',
      dtInteractiveType: 'concept',
      challenge: 'Audit and troubleshoot a multi-page document containing formatting and formula errors.',
      quiz: [
        {
          question: 'Which tool allows you to replicate an animation effect stack from one PowerPoint shape to three other shapes without repeating settings?',
          options: ['Format Painter', 'Animation Painter', 'Slide Master', 'Design Ideas'],
          correctIndex: 1,
          explanation: 'The Animation Painter copies timing, duration, and effects from a selected animated object to target objects.'
        },
        {
          question: 'To calculate the total sum of numbers in the column directly above the active cell in a Word table, what formula do you enter?',
          options: ['=TOTAL(COLUMN)', '=SUM(ABOVE)', '=ADD(UP)', '=MATH(TOP)'],
          correctIndex: 1,
          explanation: '=SUM(ABOVE) is the standard built-in formula in Word table calculation fields.'
        },
        {
          question: 'What happens to page numbering if you insert a Section Break, unlink headers, and choose Page Number Format > "Start at 1"?',
          options: [
            'All previous pages are deleted',
            'The new section restarts numbering at 1 independently of preceding pages',
            'The printer prints page numbers in red ink',
            'Page numbers become invisible forever'
          ],
          correctIndex: 1,
          explanation: 'Unlinking and restarting numbering allows front matter (i, ii) and body chapters (1, 2, 3) to possess independent numbering sequences.'
        }
      ]
    },
    updated_at: new Date('2026-01-10T08:00:00Z').toISOString(),
  },
  {
    id: 'dt-13',
    week_number: 13,
    tier: 'jss',
    programme: 'digital_technologies',
    title: 'Capstone Showcase, Digital Portfolio & Parent Exhibition',
    learn_text: `Congratulations on reaching the grand finale of JSS3 Digital Technologies! 

This capstone week focuses on curating your achievements into a Master Digital Portfolio:
1. Compiling Digital Deliverables:
- Professional Multi-Section Word Document (incorporating Section Breaks, =SUM(ABOVE) tables, and Mail Merge logic).
- Cinematic PowerPoint Presentation (featuring Morph transitions and Animation Painter choreography).
- Financial Spreadsheet Model with nested IF statements.
- Semantic HTML/CSS Web Profile.

2. Presentation to Parents & Teachers:
Students present their projects to teachers and parents, demonstrating the tangible productivity and technical excellence developed across the term. Graduation certificates are endorsed by Fortune's Code & AI Lab (FATap-CT).`,
    do_instructions: `Assemble your term digital deliverables, submit your capstone project, send the one-tap WhatsApp notification to your teacher and Fortune, and celebrate with your parents!`,
    content_json: {
      dtConcept: 'The Digital Portfolio serves as tangible proof of applied computing fluency, document automation, and presentation mastery.',
      dtRealWorldCase: 'Fortune Academy graduates showcase their digital portfolios during secondary school admissions and scholarship interviews, demonstrating mastery far beyond ordinary computer basics.',
      dtInteractiveType: 'concept',
      challenge: 'Present your completed capstone project and review all verified parent signoffs in your booklet.',
      quiz: [
        {
          question: 'What is the primary purpose of compiling a student Digital Portfolio at the conclusion of the JSS3 Digital Technologies programme?',
          options: [
            'To delete all computer hard drives before vacation',
            'To provide a comprehensive, verifiable showcase of applied document automation, presentation, and analytical skills for parents and future academic admissions',
            'To sell computer mice to classmates',
            'To hide class notes from teachers'
          ],
          correctIndex: 1,
          explanation: 'A digital portfolio provides authentic evidence of mastery, showcasing real artifacts, reports, and presentations produced throughout the curriculum.'
        }
      ]
    },
    updated_at: new Date('2026-01-10T08:00:00Z').toISOString(),
  },
];

export const DT_ASSIGNMENTS: CaiAssignment[] = [
  {
    id: 'asg-dt-001',
    tier: 'jss',
    programme: 'digital_technologies',
    title: 'Advanced MS Word: Multi-Section School Newsletter with Mixed Orientations',
    instructions: `Construct a 3-page publication in Microsoft Word demonstrating section isolation:
1. Page 1 (Cover / Foreword): Portrait orientation, 1-inch margins, Title in Heading 1 style.
2. Section Break (Next Page) between Page 1 and Page 2.
3. Page 2 (Term Budget & Facility Expenditure): Set orientation to Landscape. Create a 5x4 table with Fee Description, Term Quantity, Unit Cost, and Total. Place =SUM(ABOVE) in the total cell and format with ₦ currency symbol.
4. Section Break (Next Page) between Page 2 and Page 3. Set Page 3 back to Portrait with a 2-column layout for student club news.
5. Unlink Header on Section 2 so it displays 'FINANCIAL APPENDIX - TABLE 2.1' without affecting Page 1.`,
    due_note: 'Upload your .docx file or paste your step-by-step verification log below.',
    created_at: new Date('2026-01-12T08:00:00Z').toISOString(),
  },
  {
    id: 'asg-dt-002',
    tier: 'jss',
    programme: 'digital_technologies',
    title: 'Mail Merge Conditional Logic: Individualized Parent Notification Letters',
    instructions: `Configure a dynamic Mail Merge operation using Microsoft Word:
1. Connect a 5-record student spreadsheet containing: StudentName, GuardianName, AttendanceRate, TermScore, and FeeStatus.
2. Build the master letter template with merge fields: 'Dear «GuardianName», Re: End of Term Assessment for «StudentName»'.
3. Insert Mail Merge Rule (If...Then...Else...):
   - IF TermScore >= 75 THEN insert: 'We are thrilled to announce that your ward has earned Academic Honours for this term.'
   - ELSE insert: 'Please schedule an academic consultation during next week’s parent conference.'
4. Verify dynamic clause changes across all 5 recipient records.`,
    due_note: 'Turn in your merge template and verification summary.',
    created_at: new Date('2026-01-16T08:00:00Z').toISOString(),
  },
  {
    id: 'asg-dt-003',
    tier: 'jss',
    programme: 'digital_technologies',
    title: 'PowerPoint Kinetic Presentation: Morph Transitions & Animation Painter',
    instructions: `Create a 4-slide presentation showcasing an African Innovation invention:
1. Slide 1: Introduction with Hero Device icon.
2. Slide 2: Exploded component view using PowerPoint Morph transition with a 1.75s duration.
3. Apply a 3-layer animation stack (Float In + Gold Pulse Emphasis + Delay) to Card 1.
4. Double-click the Animation Painter to clone the identical animation timing onto Cards 2, 3, and 4.
5. Record automated timings and export presentation summary.`,
    due_note: 'Submit your slide presentation link or notes.',
    created_at: new Date('2026-01-20T08:00:00Z').toISOString(),
  },
  {
    id: 'asg-dt-004',
    tier: 'jss',
    programme: 'digital_technologies',
    title: 'Spreadsheet Gradebook Engine: Nested IF Formulas & Conditional Highlighting',
    instructions: `Build an automated student performance tracker in MS Excel or Google Sheets:
1. Enter names and test scores for 8 students across 3 subjects (Math, English, Digital Tech).
2. Calculate Total Marks using =SUM() and Term Average using =AVERAGE().
3. Write a nested IF formula for Remark:
   =IF(Average>=75, "Distinction", IF(Average>=50, "Credit", "Remedial"))
4. Apply Conditional Formatting: Green fill for scores >= 70, Red fill for scores < 50.`,
    due_note: 'Turn in formula sheet screenshot or file link.',
    created_at: new Date('2026-01-24T08:00:00Z').toISOString(),
  },
];

export const DT_PROJECTS: CaiProject[] = [
  {
    id: 'prj-dt-001',
    tier: 'jss',
    programme: 'digital_technologies',
    title: 'School Annual Academic Prospectus & Financial Ledger (Advanced MS Word)',
    description: `Engineer a comprehensive 6-page institutional prospectus for Fortune Academy utilizing advanced Microsoft Word document architecture.
Deliverables:
1. Front Matter & Pagination: Title page and Table of Contents using roman numerals (i, ii), formatted with automated Heading 1/2 styles.
2. Section Break Isolation: Insert Section Break (Next Page) between Front Matter and Body chapters. Unlink headers so Chapter 1 starts on page 1 with Arabic numerals.
3. Mixed Orientation Spread: Page 4 must be configured as Landscape orientation to accommodate a wide 6-column school budget table.
4. Dynamic Table Formulas: Implement =SUM(ABOVE) and =AVERAGE(ABOVE) inside the financial table with custom Naira (₦) number formatting, verified with F9 recalculation.
5. Print-Ready PDF Export: Compile document into a publication-grade PDF file.`,
    deliverables: [
      'Multi-Section Master Prospectus (.docx / PDF)',
      'Automated Table of Contents & Unlinked Pagination Schema',
      'Landscape Financial Table with Verified =SUM(ABOVE) Field Codes'
    ],
    created_at: new Date('2026-01-10T08:00:00Z').toISOString(),
  },
  {
    id: 'prj-dt-002',
    tier: 'jss',
    programme: 'digital_technologies',
    title: 'Interactive Multimedia STEM Pitch Deck (PowerPoint Morph & Animation Painter)',
    description: `Produce a 6-slide cinematic pitch deck presenting an eco-friendly solar cold-storage solution for Nigerian agricultural markets.
Deliverables:
1. Morph Keynote Transitions: Connect Slide 2 (National Overview Map) and Slide 3 (Regional Lagos/Kano Hubs) using seamless Morph object scaling and repositioning.
2. Animation Choreography: Build an intricate entrance and emphasis animation sequence for the hero innovation card, and use the Animation Painter to clone the choreography across all 4 feature pillars.
3. Multimedia Integration: Embed audio voiceover narration and an interactive looping video prototype.
4. Export: Interactive self-running slide show (.ppsx) and presentation speaker notes.`,
    deliverables: [
      '6-Slide Interactive Presentation (.pptx / .ppsx)',
      'Morph Transition Demonstration Video / Screencast',
      'Animation Painter Timing & Sequence Cue Sheet'
    ],
    created_at: new Date('2026-01-12T08:00:00Z').toISOString(),
  },
  {
    id: 'prj-dt-003',
    tier: 'jss',
    programme: 'digital_technologies',
    title: 'Mass Communication Mail Merge Engine & Automated Parent Dispatch',
    description: `Design an enterprise-grade automated dispatch system for a secondary school issuing individualized term report cards and admission letters.
Deliverables:
1. Clean Recipient Database: 15-record spreadsheet with student biodata, scores, fee balances, and guardian contact details.
2. Master Template Letter: Formal institutional letterhead, date field codes (Alt+Shift+D), and merge field placeholders.
3. Multi-Rule Conditional Logic: Implement nested IF...THEN...ELSE mail merge rules for scholarship awards, PTA levy balances, and academic probation notices.
4. Output: Generate merged test batch of 15 individual personalized PDF letters.
5. One-Tap WhatsApp Dispatch: Use the platform WhatsApp notification integration to dispatch project completion proof to the class teacher and Fortune.`,
    deliverables: [
      'Master Mail Merge Template Document (.docx)',
      '15-Record Structured Recipient Database (.xlsx / .csv)',
      'Sample Generated Letters with Verified Conditional Branches'
    ],
    created_at: new Date('2026-01-15T08:00:00Z').toISOString(),
  },
];

export const DT_TRAININGS: CaiTraining[] = [
  {
    id: 'trn-dt-001',
    tier: 'jss',
    programme: 'digital_technologies',
    title: 'Mastering MS Word Section Breaks & Independent Layout Isolation',
    content: `Comprehensive Masterclass on Microsoft Word Section Breaks:
- Why Page Breaks (Ctrl+Enter) fail when you need different orientations: Page breaks merely advance the cursor to the next page while leaving margin, orientation, and header bindings intact.
- The 4 Types of Section Breaks:
  1. Next Page: Starts the new section on the next page (essential for landscape tables or starting new chapters).
  2. Continuous: Starts the new section on the exact same page (essential for switching from a 1-column title to a 3-column newsletter layout).
  3. Even Page & Odd Page: Forces sections to start on facing booklet pages.
- The "Link to Previous" Secret: When you enter Header & Footer edit mode in Section 2, Word by default enables 'Link to Previous'. Deselect this button immediately to customize headers, omit running heads on chapter openers, or restart page numbering.`,
    created_at: new Date('2026-01-12T08:00:00Z').toISOString(),
  },
  {
    id: 'trn-dt-002',
    tier: 'jss',
    programme: 'digital_technologies',
    title: 'The Hidden Calculation Engine in Microsoft Word Tables',
    content: `Mastering Math Formulas in Word Without Opening Excel:
- How Table Cell Addressing Works in Word: Like Excel, columns are lettered A, B, C, D... and rows are numbered 1, 2, 3, 4... The top-left cell is A1.
- Built-in Positional Arguments:
  - =SUM(ABOVE): Totals all numeric cells directly above until a blank cell or header is encountered.
  - =SUM(LEFT): Totals all numeric cells to the left.
  - =AVERAGE(ABOVE), =COUNT(ABOVE), =MAX(ABOVE), =MIN(ABOVE).
- The Field Code Hotkeys:
  - Press Alt + F9 to toggle between the calculated number (e.g. ₦85,000) and the underlying field code { =SUM(ABOVE) \\# "₦#,##0.00" }.
  - Press F9 while selecting any field to force recalculation when values in the table are adjusted.`,
    created_at: new Date('2026-01-14T08:00:00Z').toISOString(),
  },
  {
    id: 'trn-dt-003',
    tier: 'jss',
    programme: 'digital_technologies',
    title: 'Automating Personalization: Word Mail Merge Rules & Conditional Branching',
    content: `Mastering Advanced Mail Merge Logic:
- How Mailings > Rules Transforms Mass Correspondence:
  - 'If...Then...Else...': Compares recipient spreadsheet data (e.g. BalanceDue > 0) to insert customized reminders for debtors while inserting thank-you receipts for paid accounts.
  - 'Next Record If': Skips specific records (e.g. inactive students).
  - 'Merge Record #': Inserts sequential numbering (e.g. Certificate #001, #002...).
- Step-by-Step Procedure:
  1. Mailings > Select Recipients > Use an Existing List (Excel spreadsheet).
  2. Insert Merge Fields for name and address.
  3. Mailings > Rules > If...Then...Else...
  4. Preview Results to test both conditional paths.
  5. Finish & Merge > Edit Individual Documents to generate the final batch.`,
    created_at: new Date('2026-01-16T08:00:00Z').toISOString(),
  },
  {
    id: 'trn-dt-004',
    tier: 'jss',
    programme: 'digital_technologies',
    title: 'PowerPoint Animation Painter & The Morph Slide Transition',
    content: `Professional Keynote Choreography in Microsoft PowerPoint:
- The Animation Painter Double-Click Secret:
  - Single-click applies animation to one object.
  - Double-click locks the brush! You can rapidly click 10 different shapes across the canvas to clone entrance, emphasis, delay, and duration timings simultaneously. Press Esc to release.
- The Morph Transition:
  - Duplicate your base slide (Ctrl+D).
  - On Slide 2, move, enlarge, rotate, or recolor elements.
  - Apply Transitions > Morph. PowerPoint automatically calculates vector transformation frames, creating Pixar/Apple-style continuous camera movement.
  - The exclamation mark naming trick: Name objects with '!!shape1' in the Selection Pane (Alt+F10) on both slides to force Morph between completely different geometry types!`,
    created_at: new Date('2026-01-18T08:00:00Z').toISOString(),
  },
];
