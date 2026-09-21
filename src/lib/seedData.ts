import {
  CaiClass,
  CaiSchool,
  CaiStudent,
  CaiWeek,
  CaiProgress,
  PrimaryBlock,
  CaiTraining,
  CaiAssignment,
  CaiAssignmentSubmission,
  CaiProject,
  CaiProjectSubmission,
  CaiFile,
  CaiFileVersion,
  CaiQuestion,
} from '../types';

export const SEED_SCHOOLS: CaiSchool[] = [
  {
    id: 'sch-001',
    name: "Fortune's TP Academy (Lagos Campus)",
    created_at: new Date('2026-01-10T08:00:00Z').toISOString(),
  },
  {
    id: 'sch-002',
    name: 'Excel Springfield STEM College',
    created_at: new Date('2026-01-15T08:00:00Z').toISOString(),
  },
];

export const SEED_CLASSES: CaiClass[] = [
  {
    id: 'cls-001',
    school_id: 'sch-001',
    name: 'Primary 4 Emerald',
    tier: 'primary',
    class_pin: 'PRI-401',
    created_at: new Date('2026-01-10T08:30:00Z').toISOString(),
  },
  {
    id: 'cls-002',
    school_id: 'sch-001',
    name: 'Primary 5 Sapphire',
    tier: 'primary',
    class_pin: 'PRI-502',
    created_at: new Date('2026-01-10T08:35:00Z').toISOString(),
  },
  {
    id: 'cls-003',
    school_id: 'sch-001',
    name: 'JSS 2 Gold',
    tier: 'jss',
    class_pin: 'JSS-201',
    created_at: new Date('2026-01-10T08:40:00Z').toISOString(),
  },
  {
    id: 'cls-004',
    school_id: 'sch-002',
    name: 'JSS 3 Diamond',
    tier: 'jss',
    class_pin: 'JSS-302',
    created_at: new Date('2026-01-15T09:00:00Z').toISOString(),
  },
  {
    id: 'cls-005',
    school_id: 'sch-001',
    name: 'SS 1 Blue',
    tier: 'ss',
    class_pin: 'SS-101',
    created_at: new Date('2026-01-10T08:45:00Z').toISOString(),
  },
  {
    id: 'cls-006',
    school_id: 'sch-002',
    name: 'SS 2 Ruby',
    tier: 'ss',
    class_pin: 'SS-202',
    created_at: new Date('2026-01-15T09:15:00Z').toISOString(),
  },
];

export const SEED_STUDENTS: CaiStudent[] = [
  // Primary 4 (cls-001)
  { id: 'stu-101', class_id: 'cls-001', full_name: 'Chinedu Eze', created_at: new Date('2026-01-10T09:00:00Z').toISOString() },
  { id: 'stu-102', class_id: 'cls-001', full_name: 'Amina Bello', created_at: new Date('2026-01-10T09:00:00Z').toISOString() },
  { id: 'stu-103', class_id: 'cls-001', full_name: 'David Okafor', created_at: new Date('2026-01-10T09:00:00Z').toISOString() },
  { id: 'stu-104', class_id: 'cls-001', full_name: 'Tobi Adeleke', created_at: new Date('2026-01-10T09:00:00Z').toISOString() },
  { id: 'stu-105', class_id: 'cls-001', full_name: 'Zainab Musa', created_at: new Date('2026-01-10T09:00:00Z').toISOString() },

  // Primary 5 (cls-002)
  { id: 'stu-106', class_id: 'cls-002', full_name: 'Joy Nnamdi', created_at: new Date('2026-01-10T09:00:00Z').toISOString() },
  { id: 'stu-107', class_id: 'cls-002', full_name: 'Somtochukwu Obi', created_at: new Date('2026-01-10T09:00:00Z').toISOString() },
  { id: 'stu-108', class_id: 'cls-002', full_name: 'Faith Afolabi', created_at: new Date('2026-01-10T09:00:00Z').toISOString() },

  // JSS 2 (cls-003)
  { id: 'stu-201', class_id: 'cls-003', full_name: 'Daniel Mensah', created_at: new Date('2026-01-10T09:00:00Z').toISOString() },
  { id: 'stu-202', class_id: 'cls-003', full_name: 'Fatima Abubakar', created_at: new Date('2026-01-10T09:00:00Z').toISOString() },
  { id: 'stu-203', class_id: 'cls-003', full_name: 'Victor Eze', created_at: new Date('2026-01-10T09:00:00Z').toISOString() },
  { id: 'stu-204', class_id: 'cls-003', full_name: 'Praise Olawale', created_at: new Date('2026-01-10T09:00:00Z').toISOString() },
  { id: 'stu-205', class_id: 'cls-003', full_name: 'Grace Umeh', created_at: new Date('2026-01-10T09:00:00Z').toISOString() },

  // JSS 3 (cls-004)
  { id: 'stu-206', class_id: 'cls-004', full_name: 'Kelechi Okoro', created_at: new Date('2026-01-15T09:30:00Z').toISOString() },
  { id: 'stu-207', class_id: 'cls-004', full_name: 'Mariam Balogun', created_at: new Date('2026-01-15T09:30:00Z').toISOString() },
  { id: 'stu-208', class_id: 'cls-004', full_name: 'Joshua Adeyemi', created_at: new Date('2026-01-15T09:30:00Z').toISOString() },

  // SS 1 (cls-005)
  { id: 'stu-301', class_id: 'cls-005', full_name: 'Emeka Obi', created_at: new Date('2026-01-10T09:00:00Z').toISOString() },
  { id: 'stu-302', class_id: 'cls-005', full_name: 'Halima Sanusi', created_at: new Date('2026-01-10T09:00:00Z').toISOString() },
  { id: 'stu-303', class_id: 'cls-005', full_name: 'Temitope Davies', created_at: new Date('2026-01-10T09:00:00Z').toISOString() },
  { id: 'stu-304', class_id: 'cls-005', full_name: 'Samuel Bassey', created_at: new Date('2026-01-10T09:00:00Z').toISOString() },
  { id: 'stu-305', class_id: 'cls-005', full_name: 'Maryam Ibrahim', created_at: new Date('2026-01-10T09:00:00Z').toISOString() },

  // SS 2 (cls-006)
  { id: 'stu-306', class_id: 'cls-006', full_name: 'Kemi Balogun', created_at: new Date('2026-01-15T09:45:00Z').toISOString() },
  { id: 'stu-307', class_id: 'cls-006', full_name: 'Femi Adeleke', created_at: new Date('2026-01-15T09:45:00Z').toISOString() },
  { id: 'stu-308', class_id: 'cls-006', full_name: 'Aisha Danjuma', created_at: new Date('2026-01-15T09:45:00Z').toISOString() },
];

export const PRIMARY_AVAILABLE_BLOCKS: PrimaryBlock[] = [
  { id: 'b_say', type: 'print_start', value: 'print("', display: 'Say 💬', category: 'say' },
  { id: 'b_hello', type: 'text', value: 'Hello world!', display: 'Hello world!', category: 'words' },
  { id: 'b_name', type: 'text', value: "I'm a young coder!", display: "I'm a young coder!", category: 'words' },
  { id: 'b_happy', type: 'text', value: 'Coding is super fun!', display: 'Coding is super fun!', category: 'words' },
  { id: 'b_robot', type: 'text', value: 'Beep boop, I am a robot!', display: 'Beep boop robot!', category: 'words' },
  { id: 'b_star', type: 'text', value: 'Reach for the stars!', display: 'Reach for the stars!', category: 'words' },
  { id: 'b_rocket', type: 'emoji', value: ' 🚀', display: '🚀 Rocket', category: 'emojis' },
  { id: 'b_party', type: 'emoji', value: ' 🎉', display: '🎉 Party', category: 'emojis' },
  { id: 'b_sparkle', type: 'emoji', value: ' ✨', display: '✨ Sparkles', category: 'emojis' },
  { id: 'b_heart', type: 'emoji', value: ' ❤️', display: '❤️ Heart', category: 'emojis' },
  { id: 'b_fire', type: 'emoji', value: ' 🔥', display: '🔥 Fire', category: 'emojis' },
  { id: 'b_trophy', type: 'emoji', value: ' 🏆', display: '🏆 Winner', category: 'emojis' },
];

export const SEED_WEEKS: CaiWeek[] = [
  // ===================== PRIMARY TIER (WEEKS 1-13) =====================
  {
    id: 'pw-01',
    week_number: 1,
    tier: 'primary',
    title: 'Hello Computer! (First Instructions)',
    learn_text: 'Computers do exactly what we tell them to do! When we tap "Say", we instruct the computer to display our words.',
    do_instructions: 'Tap the blocks to build your first message, then press the big Run button to hear the computer speak!',
    content_json: {
      starterBlocks: [
        { id: 'b1', type: 'print_start', value: 'print("', display: 'Say 💬' },
        { id: 'b2', type: 'text', value: 'Hello world!', display: 'Hello world!' },
        { id: 'b3', type: 'emoji', value: ' 🚀', display: '🚀 Rocket' },
        { id: 'b4', type: 'print_end', value: '")', display: 'Done ✅' },
      ],
      aiExamplePrompts: [
        'I am so happy and excited to learn coding today!',
        'Today is the best day ever, I feel awesome!',
        'I was a little worried at first, but now it is fun!',
      ],
      challenge: 'Add the sparkle emoji block and see it shine in your output!',
    },
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'pw-02',
    week_number: 2,
    tier: 'primary',
    title: 'My Favorite Things',
    learn_text: 'Programmers use words and symbols to describe their favorite things in the real world.',
    do_instructions: 'Build a sentence about what makes you smile and print it out to show your parents!',
    content_json: {
      starterBlocks: [
        { id: 'b1', type: 'print_start', value: 'print("', display: 'Say 💬' },
        { id: 'b2', type: 'text', value: 'Coding is super fun!', display: 'Coding is super fun!' },
        { id: 'b3', type: 'emoji', value: ' 🎉', display: '🎉 Party' },
        { id: 'b4', type: 'print_end', value: '")', display: 'Done ✅' },
      ],
      aiExamplePrompts: [
        'My favorite subject in school is computer science!',
        'I love playing with my friends and building games.',
      ],
    },
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'pw-03',
    week_number: 3,
    tier: 'primary',
    title: 'Secret Agent Codes',
    learn_text: 'Computers can send secret messages using special emojis and greetings.',
    do_instructions: 'Assemble a secret agent greeting with mystery emojis!',
    content_json: {
      aiExamplePrompts: [
        'Agent 007 reporting for duty with great joy!',
        'The secret mission is cool and amazing!',
      ],
    },
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'pw-04',
    week_number: 4,
    tier: 'primary',
    title: 'Talking Robots',
    learn_text: 'Robots have microchips that read instructions one by one from top to bottom.',
    do_instructions: 'Make the robot say its favorite phrase and win a trophy!',
    content_json: {
      aiExamplePrompts: ['Robot is happy to assist you today! Beep boop!'],
    },
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'pw-05',
    week_number: 5,
    tier: 'primary',
    title: 'Animal Kingdom Sounds',
    learn_text: 'Programs can imitate the sounds of the jungle, farm, or ocean!',
    do_instructions: 'Teach the computer to roar like a lion or chirp like a bird.',
    content_json: {},
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'pw-06',
    week_number: 6,
    tier: 'primary',
    title: 'Math Magic with Words',
    learn_text: 'Computers are super fast at numbers and words put together.',
    do_instructions: 'Combine your favorite lucky number with cheerful words.',
    content_json: {},
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'pw-07',
    week_number: 7,
    tier: 'primary',
    title: 'Superhero Badge Maker',
    learn_text: 'Every coder has a superpower: creativity and problem solving!',
    do_instructions: 'Assemble your superhero motto using blocks.',
    content_json: {},
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'pw-08',
    week_number: 8,
    tier: 'primary',
    title: 'Mini Story Builder',
    learn_text: 'Stories have a beginning, a middle, and an exciting ending.',
    do_instructions: 'Create a 3-part tale using your block printer.',
    content_json: {},
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'pw-09',
    week_number: 9,
    tier: 'primary',
    title: 'Space Countdown Station',
    learn_text: 'Astronauts use computers to launch rockets to the moon.',
    do_instructions: 'Create your rocket blast-off message!',
    content_json: {},
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'pw-10',
    week_number: 10,
    tier: 'primary',
    title: 'Cupcake Recipe Card',
    learn_text: 'A recipe is an algorithm: a step-by-step list of instructions.',
    do_instructions: 'Program the instructions for baking sweet cupcakes.',
    content_json: {},
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'pw-11',
    week_number: 11,
    tier: 'primary',
    title: 'Weather Reporter',
    learn_text: 'Sensors check if it is sunny, rainy, or windy outside.',
    do_instructions: 'Publish today’s weather report with weather emojis.',
    content_json: {},
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'pw-12',
    week_number: 12,
    tier: 'primary',
    title: 'Brain Teaser Quiz',
    learn_text: 'Computers can ask questions and wait for clever answers.',
    do_instructions: 'Build a fun riddle for your teacher and classmates!',
    content_json: {},
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'pw-13',
    week_number: 13,
    tier: 'primary',
    title: 'Primary Graduation Celebration 🎉',
    learn_text: 'Congratulations! You have completed 13 weeks of computer thinking and AI basics.',
    do_instructions: 'Build your final graduation speech block and celebrate with your parents!',
    content_json: {
      starterBlocks: [
        { id: 'b1', type: 'print_start', value: 'print("', display: 'Say 💬' },
        { id: 'b2', type: 'text', value: 'I am a Certified Young Coder!', display: 'I am a Certified Young Coder!' },
        { id: 'b3', type: 'emoji', value: ' 🏆 🎉', display: '🏆 Winner' },
        { id: 'b4', type: 'print_end', value: '")', display: 'Done ✅' },
      ],
      aiExamplePrompts: [
        'I am so proud and happy that I finished all my coding lessons!',
        'I loved every week and I am ready for JSS coding next!',
      ],
    },
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },

  // ===================== JSS TIER (WEEKS 1-13) =====================
  {
    id: 'jw-01',
    week_number: 1,
    tier: 'jss',
    title: 'Hello Python: Syntax & print()',
    learn_text: 'In Python, the print() function sends text or calculated results to the screen. Text must be wrapped in matching quotation marks (" or \').',
    do_instructions: 'Type your own customized greeting and run it to verify exact syntax compliance.',
    content_json: {
      starterCode: `# Week 1: First Python program
print("Hello, JSS Coding Lab!")
print("Welcome to Fortune's Code & AI Hublet")
print("Python is clean, readable, and powerful.")`,
      aiExamplePrompts: [
        'I feel very confident and excited about writing real Python code.',
        'It was a bit confusing at first, but now it feels great and awesome.',
        'I hate bugs in code, they make me feel tired and annoyed.',
      ],
      tips: ['Remember to close every parenthesis', 'Quotes inside strings must match'],
      challenge: 'Print your full name, your school, and your favorite subject on three separate lines.',
    },
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'jw-02',
    week_number: 2,
    tier: 'jss',
    title: 'Variables: Storing Data',
    learn_text: 'A variable is a labeled storage container in memory. You assign values using the single equals sign (=).',
    do_instructions: 'Create variables for student_name, age, and country, then print them cleanly.',
    content_json: {
      starterCode: `# Week 2: Variables
student_name = "Daniel Mensah"
grade = "JSS2 Gold"
age = 13

print("Student Profile:")
print(student_name)
print(grade)
print(age)`,
      aiExamplePrompts: [
        'Learning variables feels wonderful and exciting!',
        'I made a mistake in variable naming and felt lost.',
      ],
    },
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'jw-03',
    week_number: 3,
    tier: 'jss',
    title: 'Arithmetic Operations (+, -, *, /)',
    learn_text: 'Python can calculate complex math instantly using +, -, *, and / operators.',
    do_instructions: 'Calculate a student’s total exam scores and average across 3 subjects.',
    content_json: {
      starterCode: `# Week 3: Arithmetic calculations
math_score = 88
science_score = 92
english_score = 85

total = math_score + science_score + english_score
average = total / 3

print("Total Marks:")
print(total)
print("Term Average:")
print(average)`,
      aiExamplePrompts: ['Math and coding together make me feel like a genius!'],
    },
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'jw-04',
    week_number: 4,
    tier: 'jss',
    title: 'String Joins & Concatenation',
    learn_text: 'Strings can be glued together using the + operator or passed into print() separated by commas.',
    do_instructions: 'Join first name and last name into a greeting card banner.',
    content_json: {
      starterCode: `# Week 4: String concatenation
first_name = "Fatima"
last_name = "Abubakar"
greeting = "Welcome, " + first_name + " " + last_name + "!"

print(greeting)
print("Ready for Week 4 AI challenge.")`,
      aiExamplePrompts: ['Joining strings is super cool and neat!'],
    },
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'jw-05',
    week_number: 5,
    tier: 'jss',
    title: 'Conditionals: if and else Decisions',
    learn_text: 'Branching logic lets the computer make decisions based on conditions that evaluate to True or False.',
    do_instructions: 'Write a pass/fail classifier that checks if a score is at least 50.',
    content_json: {
      starterCode: `# Week 5: if / else
exam_score = 74

if exam_score >= 50:
    print("Status: Passed!")
    print("Great effort, keep it up!")
else:
    print("Status: Needs revision.")
    print("Keep practicing!")`,
      aiExamplePrompts: [
        'I passed my test and I am thrilled and overjoyed!',
        'I failed the quiz and I felt awful and worried.',
      ],
    },
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'jw-06',
    week_number: 6,
    tier: 'jss',
    title: 'Multi-Way Decisions: if, elif, else',
    learn_text: 'When there are more than two possibilities (e.g. grades A, B, C, or traffic lights), chain them with elif.',
    do_instructions: 'Assign letter grades based on scores: 80+ is A, 65+ is B, 50+ is C, else D.',
    content_json: {
      starterCode: `# Week 6: Grade decision tree
score = 82

if score >= 80:
    grade = "A - Excellent!"
elif score >= 65:
    grade = "B - Very Good"
elif score >= 50:
    grade = "C - Credit"
else:
    grade = "D - Pass"

print("Evaluation Result:")
print(grade)`,
      aiExamplePrompts: ['Getting an A makes everyone proud and happy.'],
    },
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'jw-07',
    week_number: 7,
    tier: 'jss',
    title: 'Compound Logic: and, or, not',
    learn_text: 'Combine multiple checks using "and" (both must be true) and "or" (at least one must be true).',
    do_instructions: 'Determine scholarship eligibility based on score and attendance.',
    content_json: {
      starterCode: `# Week 7: and / or
score = 85
attendance = 95

if score >= 80 and attendance >= 90:
    print("Scholarship Approved!")
else:
    print("Standard admission.")`,
      aiExamplePrompts: ['Scholarship approval brings so much joy to the whole family!'],
    },
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'jw-08',
    week_number: 8,
    tier: 'jss',
    title: 'Number Comparisons & Thresholds',
    learn_text: 'Use modulo and equality operators to classify numbers into categories.',
    do_instructions: 'Check temperature levels to trigger hot, normal, or chilly alerts.',
    content_json: {
      starterCode: `temp = 32

if temp > 35:
    print("Heat warning! Stay hydrated.")
elif temp < 20:
    print("Cool breeze! Wear a jacket.")
else:
    print("Pleasant weather in Lagos today.")`,
    },
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'jw-09',
    week_number: 9,
    tier: 'jss',
    title: 'Unit Converter Logic',
    learn_text: 'Convert units like Naira to USD or Celsius to Fahrenheit with clean formulas.',
    do_instructions: 'Build a temperature conversion calculator.',
    content_json: {
      starterCode: `celsius = 30
fahrenheit = (celsius * 9 / 5) + 32

print("Celsius value:")
print(celsius)
print("Fahrenheit equivalent:")
print(fahrenheit)`,
    },
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'jw-10',
    week_number: 10,
    tier: 'jss',
    title: 'Shopping Cart & Discount Rules',
    learn_text: 'Simulate e-commerce checkout systems that grant discounts when spending exceeds a threshold.',
    do_instructions: 'Apply a 10% discount if the cart total exceeds 5000.',
    content_json: {
      starterCode: `cart_total = 7500

if cart_total > 5000:
    discount = cart_total * 0.10
    final_price = cart_total - discount
    print("Special Discount Applied!")
else:
    final_price = cart_total

print("Final Payable Amount:")
print(final_price)`,
    },
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'jw-11',
    week_number: 11,
    tier: 'jss',
    title: 'Choose Your Own Adventure Game',
    learn_text: 'Games use branching decision paths where user choices lead to different endings.',
    do_instructions: 'Program a two-step choice path for an ancient treasure hunt.',
    content_json: {
      starterCode: `choice = "right"

if choice == "left":
    print("You found a hidden golden chest!")
elif choice == "right":
    print("You crossed a rope bridge safely!")
else:
    print("You stayed at camp to rest.")`,
    },
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'jw-12',
    week_number: 12,
    tier: 'jss',
    title: 'Mini Chatbot Rules Engine',
    learn_text: 'Rule-based bots look for key patterns or status flags to formulate intelligent responses.',
    do_instructions: 'Build a helpful virtual assistant responder.',
    content_json: {
      starterCode: `query_type = "pricing"

if query_type == "hours":
    print("Lab is open Monday to Friday, 8am to 4pm.")
elif query_type == "pricing":
    print("Code & AI Lab is 100% free for enrolled students!")
else:
    print("A teacher will assist you shortly.")`,
    },
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'jw-13',
    week_number: 13,
    tier: 'jss',
    title: 'JSS Junior Developer Capstone & Certificate',
    learn_text: 'Congratulations! You have mastered variables, math operators, if/elif/else decisions, and string synthesis.',
    do_instructions: 'Build a comprehensive report program demonstrating all concepts learned this term!',
    content_json: {
      starterCode: `# JSS Capstone Program
candidate = "Daniel Mensah"
practical_score = 94
theory_score = 88
overall = (practical_score + theory_score) / 2

print("====================================")
print("FORTUNE'S CODE & AI LAB - JSS AWARDS")
print("Candidate:")
print(candidate)
print("Final Score:")
print(overall)

if overall >= 85:
    print("Award: First Class Honours 🏆")
    print("Ready to advance to Senior Secondary!")
else:
    print("Award: Certificate of Completion 🎖️")
print("====================================")`,
      aiExamplePrompts: [
        'I feel overjoyed, victorious, and ready for advanced coding!',
        'Completing JSS coding was the best achievement of the term.',
      ],
    },
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },

  // ===================== SS TIER (WEEKS 1-13) =====================
  {
    id: 'sw-01',
    week_number: 1,
    tier: 'ss',
    title: 'Senior Python Architecture & Types',
    learn_text: 'In Senior Secondary, we write professional Python scripts with strict logic, dynamic types, and clean syntax formatting.',
    do_instructions: 'Declare structured types, compute metrics, and print formatted outputs.',
    content_json: {
      starterCode: `# SS1-2 Python Architecture
school = "Fortune's TP Academy"
tier = "Senior Secondary"
enrolled = True
student_count = 35
print("System Initialized for:", school)
print("Tier:", tier)
print("Active Session:", enrolled)
print("Class Capacity:", student_count)`,
      aiExamplePrompts: [
        'Writing production-grade Python gives me immense pride and joy.',
        'Debugging algorithmic problems can be challenging and tiring, but rewarding.',
        'This AI sentiment engine accurately detects emotional tone.',
      ],
      tips: ['Consistent indentation is strictly enforced in Python', 'Variables are case-sensitive'],
      challenge: 'Create a system status readout calculating memory allocation and student ratio.',
    },
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'sw-02',
    week_number: 2,
    tier: 'ss',
    title: 'Complex Expressions & Precedence',
    learn_text: 'Order of operations (BODMAS/PEMDAS) governs numerical and logical evaluations in computing.',
    do_instructions: 'Evaluate multi-term financial and physical formulas.',
    content_json: {
      starterCode: `# Week 2: Mathematical formulas
principal = 50000
rate = 0.08
time = 3

simple_interest = (principal * rate * time)
total_repayment = principal + simple_interest

print("Principal Amount:", principal)
print("Simple Interest Accrued:", simple_interest)
print("Total Payable:", total_repayment)`,
      aiExamplePrompts: ['Financial calculations with Python make budgeting so clear and reliable.'],
    },
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'sw-03',
    week_number: 3,
    tier: 'ss',
    title: 'Nested Conditionals & Guard Clauses',
    learn_text: 'Real-world software requires guarding against edge conditions using nested branching.',
    do_instructions: 'Validate account authentication and access authorization.',
    content_json: {
      starterCode: `# Week 3: Guard clauses
is_registered = True
has_paid_fee = True
exam_cleared = True

if is_registered:
    if has_paid_fee and exam_cleared:
        print("Access Granted: Hall Pass Validated")
    else:
        print("Access Denied: Clearance Pending")
else:
    print("Access Denied: Student Not Registered")`,
      aiExamplePrompts: ['Strict access control ensures the integrity and safety of systems.'],
    },
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'sw-04',
    week_number: 4,
    tier: 'ss',
    title: 'for Loops: Iterating with range(stop)',
    learn_text: 'The for loop repeats a code block a specific number of times. range(n) produces numbers from 0 up to n-1.',
    do_instructions: 'Print a repeat sequence of server ping attempts.',
    content_json: {
      starterCode: `# Week 4: for loop with range(stop)
print("Pinging AI Server Cluster:")
for i in range(5):
    print("Attempt #", i, "-> Ping OK (0.24ms)")
print("All 5 packets delivered successfully.")`,
      aiExamplePrompts: ['Automation with loops saves thousands of hours of manual labor!'],
    },
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'sw-05',
    week_number: 5,
    tier: 'ss',
    title: 'for Loops: Custom range(start, stop)',
    learn_text: 'Passing two arguments to range(start, stop) lets you control the lower and upper bounds of iteration.',
    do_instructions: 'Simulate a rocket launch countdown or calendar day generator.',
    content_json: {
      starterCode: `# Week 5: range(start, stop)
print("Simulation Week Tracker:")
for week in range(1, 8):
    print("Generating report for Week", week)
print("Mid-term milestone reached.")`,
      aiExamplePrompts: ['Iterating through numbered weeks keeps our curriculum perfectly on track.'],
    },
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'sw-06',
    week_number: 6,
    tier: 'ss',
    title: 'for Loops: Stepping with range(start, stop, step)',
    learn_text: 'The 3rd argument in range() defines the step interval (e.g. skip by 2s, 5s, or 10s).',
    do_instructions: 'Generate even numbers and audit checkpoints.',
    content_json: {
      starterCode: `# Week 6: range(start, stop, step)
print("Generating Even Checkpoints:")
for val in range(10, 30, 2):
    print("Checkpoint Value:", val)
print("Scan complete.")`,
      aiExamplePrompts: ['Stepping increments allow precise telemetry sampling.'],
    },
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'sw-07',
    week_number: 7,
    tier: 'ss',
    title: 'The Accumulator Pattern (Totals & Counters)',
    learn_text: 'An accumulator variable starts at zero before a loop and collects running totals or counts across iterations.',
    do_instructions: 'Compute the sum of integers from 1 through 10.',
    content_json: {
      starterCode: `# Week 7: Accumulator Pattern
total_sum = 0
for n in range(1, 11):
    total_sum = total_sum + n
    print("Adding", n, "-> Current Subtotal:", total_sum)

print("Final Cumulative Total:", total_sum)`,
      aiExamplePrompts: ['Accumulators are the foundation of statistical aggregation in data science.'],
    },
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'sw-08',
    week_number: 8,
    tier: 'ss',
    title: 'Mathematical Sequences & Multipliers',
    learn_text: 'Generate mathematical tables dynamically without hardcoding rows.',
    do_instructions: 'Construct the 7 times multiplication table up to 12.',
    content_json: {
      starterCode: `base = 7
print("=== 7x Multiplication Table ===")
for i in range(1, 13):
    ans = base * i
    print(base, "x", i, "=", ans)`,
    },
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'sw-09',
    week_number: 9,
    tier: 'ss',
    title: 'Filtering Loops: Loops with Conditionals',
    learn_text: 'Placing an if statement inside a for loop enables selective filtering of stream data.',
    do_instructions: 'Filter out scores that meet distinction criteria.',
    content_json: {
      starterCode: `print("Scanning threshold values:")
for score in range(40, 101, 10):
    if score >= 75:
        print("Score", score, "-> Distinction Tier")
    else:
        print("Score", score, "-> Standard Tier")`,
    },
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'sw-10',
    week_number: 10,
    tier: 'ss',
    title: 'Inventory & Resource Depletion Models',
    learn_text: 'Simulate depleting fuel, warehouse items, or countdown timers.',
    do_instructions: 'Track inventory consumption across daily shifts.',
    content_json: {
      starterCode: `stock = 100
sales_per_day = 12

for day in range(1, 6):
    stock = stock - sales_per_day
    print("Day", day, ": Units remaining in store =", stock)

print("End of week stock audit complete.")`,
    },
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'sw-11',
    week_number: 11,
    tier: 'ss',
    title: 'Algorithm: Factor Summation & Statistics',
    learn_text: 'Compute divisors, averages, and spread across computational loops.',
    do_instructions: 'Find all divisors of number 24 and sum them.',
    content_json: {
      starterCode: `target = 24
divisor_sum = 0
print("Finding divisors of", target)

for d in range(1, 25):
    if (target % d) == 0:
        print("Found factor:", d)
        divisor_sum = divisor_sum + d

print("Total sum of divisors:", divisor_sum)`,
    },
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'sw-12',
    week_number: 12,
    tier: 'ss',
    title: 'Data Validation & State Integrity',
    learn_text: 'Validate incoming payload health checks and summarize status flags.',
    do_instructions: 'Audit 8 simulated telemetry packets.',
    content_json: {
      starterCode: `healthy_packets = 0
total_packets = 8

for packet_id in range(1, 9):
    if packet_id == 4:
        print("Packet #", packet_id, ": Corrupted (Dropped)")
    else:
        print("Packet #", packet_id, ": Verified Valid")
        healthy_packets = healthy_packets + 1

print("Integrity Summary:", healthy_packets, "/", total_packets, "delivered")`,
    },
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'sw-13',
    week_number: 13,
    tier: 'ss',
    title: 'SS Senior Developer Capstone: Full Engine Build',
    learn_text: 'Congratulations! You have completed the senior secondary curriculum: advanced branching, multi-parameter loops, accumulator systems, and algorithmic filtering.',
    do_instructions: 'Run the capstone evaluation engine and sign off on your Senior Developer portfolio!',
    content_json: {
      starterCode: `# Senior Secondary Capstone Engine
student = "Emeka Obi"
tier = "SS1 Senior Honours"

print("==================================================")
print("CODE & AI LAB - SENIOR DEVELOPER GRADUATION ENGINE")
print("Candidate:", student)
print("Tier:", tier)
print("--------------------------------------------------")

score_accumulator = 0
modules_passed = 0

for week in range(1, 13):
    score = 80 + (week % 15)
    score_accumulator = score_accumulator + score
    if score >= 75:
        modules_passed = modules_passed + 1

average_gpa = score_accumulator / 12
print("12-Week Modules Audited:", 12)
print("Distinction Modules:", modules_passed)
print("Cumulative Lab Average:", average_gpa)
print("Graduation Status: CERTIFIED SENIOR PYTHON DEVELOPER 🎓")
print("==================================================")`,
      aiExamplePrompts: [
        'I am genuinely proud and thrilled by how much we have engineered this term.',
        'Learning algorithms and AI pattern matching will shape our future careers.',
      ],
    },
    updated_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
];

export const SEED_PROGRESS: CaiProgress[] = [
  // Chinedu Eze (Primary 4, stu-101) - Week 1 completed
  {
    id: 'prg-001',
    student_id: 'stu-101',
    week_number: 1,
    submission: {
      type: 'blocks',
      code: 'print("Hello world! 🚀")',
      blocks: [
        { id: 'b1', type: 'print_start', value: 'print("', display: 'Say 💬' },
        { id: 'b2', type: 'text', value: 'Hello world!', display: 'Hello world!' },
        { id: 'b3', type: 'emoji', value: ' 🚀', display: '🚀 Rocket' },
        { id: 'b4', type: 'print_end', value: '")', display: 'Done ✅' },
      ],
    },
    output_captured: 'Hello world! 🚀',
    ai_demo_input: 'I am so happy and excited to learn coding today!',
    ai_demo_result: {
      verdict: 'Positive',
      emoji: '😊',
      posHits: ['happy', 'excited'],
      negHits: [],
    },
    completed_at: new Date('2026-01-12T11:20:00Z').toISOString(),
    parent_signoff: true,
    parent_signoff_at: new Date('2026-01-12T18:30:00Z').toISOString(),
  },
  // Daniel Mensah (JSS 2, stu-201) - Week 1 & 2 completed
  {
    id: 'prg-002',
    student_id: 'stu-201',
    week_number: 1,
    submission: {
      type: 'typed_code',
      code: 'print("Hello, JSS Coding Lab!")\nprint("I am Daniel Mensah from JSS2 Gold.")',
    },
    output_captured: 'Hello, JSS Coding Lab!\nI am Daniel Mensah from JSS2 Gold.',
    ai_demo_input: 'I feel very confident and excited about writing real Python code.',
    ai_demo_result: {
      verdict: 'Positive',
      emoji: '😊',
      posHits: ['excited'],
      negHits: [],
    },
    completed_at: new Date('2026-01-14T14:10:00Z').toISOString(),
    parent_signoff: true,
    parent_signoff_at: new Date('2026-01-14T20:00:00Z').toISOString(),
  },
  {
    id: 'prg-003',
    student_id: 'stu-201',
    week_number: 2,
    submission: {
      type: 'typed_code',
      code: 'student_name = "Daniel Mensah"\nage = 13\nprint("Student:", student_name)\nprint("Age next year:", age + 1)',
    },
    output_captured: 'Student: Daniel Mensah\nAge next year: 14',
    ai_demo_input: 'Learning variables was fun and awesome!',
    ai_demo_result: {
      verdict: 'Positive',
      emoji: '😊',
      posHits: ['fun', 'awesome'],
      negHits: [],
    },
    completed_at: new Date('2026-01-21T15:00:00Z').toISOString(),
    parent_signoff: false,
    parent_signoff_at: null,
  },
  // Emeka Obi (SS 1, stu-301) - Week 1 & 4 completed
  {
    id: 'prg-004',
    student_id: 'stu-301',
    week_number: 1,
    submission: {
      type: 'typed_code',
      code: 'school = "Fortune\'s TP Academy"\ntier = "Senior Secondary"\nprint("Welcome to:", school)\nprint("Enrolled in:", tier)',
    },
    output_captured: "Welcome to: Fortune's TP Academy\nEnrolled in: Senior Secondary",
    ai_demo_input: 'Writing production-grade Python gives me immense pride and joy.',
    ai_demo_result: {
      verdict: 'Positive',
      emoji: '😊',
      posHits: ['pride', 'joy'],
      negHits: [],
    },
    completed_at: new Date('2026-01-13T16:45:00Z').toISOString(),
    parent_signoff: true,
    parent_signoff_at: new Date('2026-01-13T21:15:00Z').toISOString(),
  },
];

export const SEED_FILES: CaiFile[] = [
  // JSS Student Daniel Mensah (stu-201)
  {
    id: 'file-201-1',
    student_id: 'stu-201',
    filename: 'main.py',
    content: `# JSS 2 Student Scratchpad
name = "Daniel Mensah"
grade = 8
print("Welcome to my Python project!")
print("Student:", name)
print("Grade:", grade)

if grade >= 8:
    print("Status: Eligible for Senior Coding Club")
else:
    print("Keep practicing!")`,
    tier: 'jss',
    created_at: new Date('2026-01-15T10:00:00Z').toISOString(),
    updated_at: new Date('2026-01-15T10:30:00Z').toISOString(),
  },
  {
    id: 'file-201-2',
    student_id: 'stu-201',
    filename: 'unit_converter.py',
    content: `# Kilograms to Grams Converter
kg = 5
grams = kg * 1000
print("Converting", kg, "kg to grams:")
print("Result:", grams, "g")`,
    tier: 'jss',
    created_at: new Date('2026-01-18T11:00:00Z').toISOString(),
    updated_at: new Date('2026-01-18T11:20:00Z').toISOString(),
  },
  // SS Student Emeka Obi (stu-301)
  {
    id: 'file-301-1',
    student_id: 'stu-301',
    filename: 'main.py',
    content: `# SS 1 Algorithms & Range Iterations
student = "Emeka Obi"
school = "Fortune's TP Academy"
print("Running Senior Python System for:", student)

# Compute cumulative sum
total = 0
for i in range(1, 11):
    total = total + i
    print("Step", i, "-> Running Sum:", total)

print("Final Sum 1..10:", total)`,
    tier: 'ss',
    created_at: new Date('2026-01-12T09:00:00Z').toISOString(),
    updated_at: new Date('2026-01-12T09:45:00Z').toISOString(),
  },
  {
    id: 'file-301-2',
    student_id: 'stu-301',
    filename: 'multiplication_table.py',
    content: `# Multiplication Engine
factor = 7
print("Multiplication Table for", factor)
for i in range(1, 13):
    res = factor * i
    print(factor, "x", i, "=", res)`,
    tier: 'ss',
    created_at: new Date('2026-01-16T14:00:00Z').toISOString(),
    updated_at: new Date('2026-01-16T14:30:00Z').toISOString(),
  },
];

export const SEED_FILE_VERSIONS: CaiFileVersion[] = [
  {
    id: 'ver-001',
    file_id: 'file-201-1',
    content_snapshot: `# JSS 2 Student Scratchpad\nname = "Daniel Mensah"\nprint("Welcome to my Python project!")`,
    saved_at: new Date('2026-01-15T10:00:00Z').toISOString(),
  },
  {
    id: 'ver-002',
    file_id: 'file-201-1',
    content_snapshot: `# JSS 2 Student Scratchpad\nname = "Daniel Mensah"\ngrade = 8\nprint("Welcome to my Python project!")\nprint("Student:", name)\nprint("Grade:", grade)\n\nif grade >= 8:\n    print("Status: Eligible for Senior Coding Club")\nelse:\n    print("Keep practicing!")`,
    saved_at: new Date('2026-01-15T10:30:00Z').toISOString(),
  },
  {
    id: 'ver-003',
    file_id: 'file-301-1',
    content_snapshot: `# SS 1 Algorithms\nprint("Running Senior Python System")`,
    saved_at: new Date('2026-01-12T09:00:00Z').toISOString(),
  },
  {
    id: 'ver-004',
    file_id: 'file-301-1',
    content_snapshot: `# SS 1 Algorithms & Range Iterations\nstudent = "Emeka Obi"\nschool = "Fortune's TP Academy"\nprint("Running Senior Python System for:", student)\n\n# Compute cumulative sum\ntotal = 0\nfor i in range(1, 11):\n    total = total + i\n    print("Step", i, "-> Running Sum:", total)\n\nprint("Final Sum 1..10:", total)`,
    saved_at: new Date('2026-01-12T09:45:00Z').toISOString(),
  },
];

export const SEED_TRAININGS: CaiTraining[] = [
  {
    id: 'trn-001',
    tier: 'primary',
    title: 'How Computers Listen: Input vs Output',
    content: `Computers do not guess what we want — they follow every single instruction in order! 
Watch this short recap on how computer commands turn into real speech and visuals on screen.
Video resource: https://www.youtube.com/watch?v=mCq8-xTH7jA`,
    created_at: new Date('2026-01-10T10:00:00Z').toISOString(),
  },
  {
    id: 'trn-002',
    tier: 'jss',
    title: 'Demystifying Python Variables & Memory Boxes',
    content: `Think of a variable as a labeled storage box in your computer's RAM. 
When you type 'score = 100', the box named 'score' stores the integer 100.
Rule of thumb: Variable names cannot start with numbers, cannot have spaces, and are case-sensitive.
Video reference: https://www.youtube.com/watch?v=kqtD5dpn9C8`,
    created_at: new Date('2026-01-12T11:00:00Z').toISOString(),
  },
  {
    id: 'trn-003',
    tier: 'jss',
    title: 'Conditional Branching: Making Decisions with If/Else',
    content: `Real programs react to user input. If a score is above 50, award a badge; otherwise, offer encouragement.
Always remember the 4-space indentation rule in Python!`,
    created_at: new Date('2026-01-15T09:30:00Z').toISOString(),
  },
  {
    id: 'trn-004',
    tier: 'ss',
    title: 'Computational Complexity & The Range() Function',
    content: `The range(start, stop, step) generator is the backbone of high-performance loops in Python.
Remember: 'range(1, 10)' generates 1 through 9. It stops strictly before the upper bound.
Review: How iteration algorithms enable batch processing and data analytics.`,
    created_at: new Date('2026-01-14T14:00:00Z').toISOString(),
  },
  {
    id: 'trn-005',
    tier: 'ss',
    title: 'Pattern Matching vs Neural Networks in AI',
    content: `In our Mini AI Mood Detector, we use token keyword scoring. 
This training explains the evolutionary leap from rule-based heuristic systems to Large Language Models (LLMs) like Gemini.`,
    created_at: new Date('2026-01-18T16:00:00Z').toISOString(),
  },
];

export const SEED_ASSIGNMENTS: CaiAssignment[] = [
  {
    id: 'asg-001',
    tier: 'jss',
    school_id: null,
    title: 'Grade Calculator Challenge',
    instructions: `Create a script that stores an exam score (0–100) in a variable 'score'. 
Use if/elif/else statements to print 'Distinction' if score >= 75, 'Pass' if score >= 50, and 'Needs Improvement' otherwise.`,
    due_note: 'by Friday 5:00 PM',
    created_at: new Date('2026-01-16T12:00:00Z').toISOString(),
  },
  {
    id: 'asg-002',
    tier: 'jss',
    school_id: null,
    title: 'Currency Converter: Naira to USD',
    instructions: `Write a program that takes an amount in Naira (e.g. 15,000) and converts it to USD using an exchange rate variable. Print both the original Naira and resulting USD clearly.`,
    due_note: 'by next Monday',
    created_at: new Date('2026-01-20T10:00:00Z').toISOString(),
  },
  {
    id: 'asg-003',
    tier: 'ss',
    school_id: null,
    title: 'Prime Number Checker / Range Filter',
    instructions: `Using a for loop and the range() function, write a script that iterates through numbers from 1 to 20 and prints whether each number is Even or Odd using the modulus operator '%'.`,
    due_note: 'by Wednesday class',
    created_at: new Date('2026-01-17T15:00:00Z').toISOString(),
  },
  {
    id: 'asg-004',
    tier: 'ss',
    school_id: null,
    title: 'Fibonacci Sequence or Step Generator',
    instructions: `Write a Python script that uses range(start, stop, step) to count backwards from 100 down to 10 in steps of 10, printing 'Countdown: [number]' at every stage.`,
    due_note: 'by Friday evening',
    created_at: new Date('2026-01-22T08:00:00Z').toISOString(),
  },
];

export const SEED_ASSIGNMENT_SUBMISSIONS: CaiAssignmentSubmission[] = [
  {
    id: 'sub-001',
    assignment_id: 'asg-001',
    student_id: 'stu-201',
    file_id: 'file-201-1',
    submitted_at: new Date('2026-01-17T16:00:00Z').toISOString(),
  },
];

export const SEED_PROJECTS: CaiProject[] = [
  {
    id: 'prj-001',
    tier: 'jss',
    title: 'Interactive School Store Billing Kiosk',
    description: `Build an automated cashier console for Fortune's TP tuck shop.
Requirements:
1. Define prices for Notebooks, Pens, and Rulers.
2. Store quantities purchased by a student in variables.
3. Calculate subtotal, apply a 5% discount if subtotal exceeds 2,000 Naira, and print a formatted receipt.`,
    created_at: new Date('2026-01-15T08:00:00Z').toISOString(),
  },
  {
    id: 'prj-002',
    tier: 'ss',
    title: 'Automated Weather Station & Climate Analytics',
    description: `Design a data analytics script simulating 7 days of temperature readings.
Requirements:
1. Loop through daily temperatures using range(1, 8).
2. Compute the highest recorded temperature and weekly average.
3. Print an advisory warning ('Heat Alert') if the average exceeds 32°C.`,
    created_at: new Date('2026-01-15T08:00:00Z').toISOString(),
  },
];

export const SEED_PROJECT_SUBMISSIONS: CaiProjectSubmission[] = [
  {
    id: 'psub-001',
    project_id: 'prj-001',
    student_id: 'stu-201',
    file_id: 'file-201-1',
    submitted_at: new Date('2026-01-20T17:30:00Z').toISOString(),
  },
];

export const SEED_QUESTIONS: CaiQuestion[] = [
  {
    id: 'q-001',
    student_id: 'stu-201',
    question_text: 'Why does Python give an IndentationError when I do not press space four times?',
    answer_text: 'Great question Daniel! Unlike languages that use curly brackets {}, Python uses indentation spaces to know which lines belong inside an if/else block. Four spaces is the standard Python convention.',
    answered: true,
    created_at: new Date('2026-01-16T14:10:00Z').toISOString(),
    student_name: 'Daniel Mensah',
    class_name: 'JSS 2 Gold',
  },
  {
    id: 'q-002',
    student_id: 'stu-301',
    question_text: 'Can we use negative numbers as the step parameter in range(start, stop, step)?',
    answer_text: 'Yes Emeka! When you pass a negative step like range(10, 0, -1), Python counts backwards from 10 down to 1. Just make sure your start value is greater than your stop value.',
    answered: true,
    created_at: new Date('2026-01-18T10:20:00Z').toISOString(),
    student_name: 'Emeka Obi',
    class_name: 'SS 1 Blue',
  },
  {
    id: 'q-003',
    student_id: 'stu-202',
    question_text: 'What happens if a student writes code that runs in an infinite loop?',
    answer_text: null,
    answered: false,
    created_at: new Date('2026-01-22T09:15:00Z').toISOString(),
    student_name: 'Amina Bello',
    class_name: 'JSS 2 Gold',
  },
];
