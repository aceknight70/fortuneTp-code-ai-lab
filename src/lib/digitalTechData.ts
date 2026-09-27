import { CaiAssignment, CaiProject, CaiTraining, CaiWeek } from '../types';

export const DT_WEEKS: CaiWeek[] = [
  {
    id: 'dt-01',
    week_number: 1,
    tier: 'jss',
    programme: 'digital_technologies',
    title: 'Digital Systems & Technology Ecosystem',
    learn_text: `Digital technology is the integration of electronic computing hardware, software, telecommunications, and digital networks to gather, store, process, and transmit data. 

In Nigeria and across the globe, we are transitioning from basic computer awareness to digital fluency. Digital systems operate on binary principles (0s and 1s) and power everything from ATM bank networks (NIBSS) and cellular SIM towers to cloud servers.

Key components of every digital system:
1. Input: Sensors, keyboards, cameras, biometric scanners.
2. Processing: CPU (Central Processing Unit) & GPU computing chips.
3. Storage: Primary memory (RAM) and non-volatile storage (SSD, Flash, Cloud).
4. Output: Displays, audio speakers, automated actuators.
5. Communication: Network interfaces (Wi-Fi, 4G/5G, Ethernet).`,
    do_instructions: `Examine the digital systems diagram, review the 5 core stages of a modern electronic transaction, and complete the digital systems checkpoint quiz below!`,
    content_json: {
      dtConcept: 'The 5 essential stages of digital processing: Input -> Processing -> Storage -> Communication -> Output.',
      dtRealWorldCase: 'When you tap an ATM card in Lagos, the chip reader (Input) transmits encrypted packets via fiber optic routers (Communication) to the bank core database (Storage/Processing) to approve your cash disbursement (Output).',
      dtInteractiveType: 'concept',
      challenge: 'Identify which hardware component performs data transformation versus communication in a smart device.',
      quiz: [
        {
          question: 'What is the primary function of the CPU in a digital system?',
          options: [
            'To display colors on the screen',
            'To execute arithmetic and logical processing instructions',
            'To store files permanently when power is turned off',
            'To connect cables to the power socket'
          ],
          correctIndex: 1,
          explanation: 'The CPU (Central Processing Unit) is the "brain" responsible for calculating instructions and executing program logic.'
        },
        {
          question: 'Which of the following is considered volatile primary memory?',
          options: ['Hard Disk Drive (HDD)', 'RAM (Random Access Memory)', 'USB Flash Drive', 'MicroSD Card'],
          correctIndex: 1,
          explanation: 'RAM is volatile memory; it holds data currently in use and loses its contents when power is switched off.'
        },
        {
          question: 'In the Nigerian digital economy, what is an example of an input device in banking?',
          options: ['Receipt printer', 'Biometric fingerprint scanner', 'Cash dispenser motor', 'ATM speaker'],
          correctIndex: 1,
          explanation: 'Biometric fingerprint scanners capture physical data and convert it into digital input for verification.'
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
    title: 'The Internet, Protocols & Web Ecology',
    learn_text: `The Internet is a global network of interconnected computer networks communicating through standardized protocol suites (TCP/IP).

How the Web Works:
1. IP Address: Every device has a numerical Internet Protocol address (e.g. 102.89.23.44) indicating its location on the global grid.
2. DNS (Domain Name System): The "phonebook" of the Internet. Instead of memorizing numerical IP addresses, DNS translates human names like "fortuneacademy.edu.ng" into machine-readable IP addresses.
3. HTTP & HTTPS: Hypertext Transfer Protocol. The "S" stands for Secure — meaning traffic between your phone and the server is encrypted using TLS/SSL so eavesdroppers cannot see your passwords.
4. Packets & Routers: Files and messages are split into small chunks called packets, routed across various pathways, and reassembled at their destination.`,
    do_instructions: `Trace how a web request travels from a student's phone through DNS resolution to a cloud server, and answer the protocol evaluation questions.`,
    content_json: {
      dtConcept: 'The Internet relies on TCP/IP packet switching, DNS name resolution, and HTTPS transport encryption.',
      dtRealWorldCase: 'When checking your school terminal report online, your browser queries a DNS server in milliseconds to find the school host IP, then initiates an HTTPS encrypted handshake to prevent anyone on public Wi-Fi from reading your grades.',
      dtInteractiveType: 'network',
      challenge: 'Simulate resolving a domain name to an IP address and inspecting why HTTPS with SSL certificates is critical.',
      quiz: [
        {
          question: 'What does DNS stand for and what is its role?',
          options: [
            'Digital Network System: charges mobile data',
            'Domain Name System: translates domain names into numerical IP addresses',
            'Data Navigation Software: draws webpage graphics',
            'Direct Net Security: blocks all viruses'
          ],
          correctIndex: 1,
          explanation: 'DNS resolves human-friendly names (like google.com) into numerical IP addresses computers use to route packets.'
        },
        {
          question: 'What key security advantage does HTTPS provide over standard HTTP?',
          options: [
            'It makes the internet connection 10 times faster',
            'It encrypts all communication between browser and server',
            'It deletes all cookies immediately',
            'It allows browsing without any data bundle'
          ],
          correctIndex: 1,
          explanation: 'HTTPS encrypts data in transit using TLS/SSL, preventing attackers from eavesdropping or tampering with sensitive credentials.'
        },
        {
          question: 'How is data transferred across the Internet?',
          options: [
            'As one unbroken giant file',
            'Broken down into smaller numbered packets that routers forward',
            'Through television antenna radio waves exclusively',
            'By storing it on physical hard disks transported by courier'
          ],
          correctIndex: 1,
          explanation: 'Packet switching breaks data into manageable packets, each routed independently and reassembled at the destination.'
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
    title: 'Digital Communication, Netiquette & Cloud Collaboration',
    learn_text: `Digital communication empowers millions of people to learn, work, and collaborate across geographic boundaries. However, digital spaces require Netiquette (network etiquette) and responsible digital citizenship.

Core Principles of Netiquette:
1. Respect and Empathy: Remember that behind every screen is a real human being. Avoid cyberbullying, insults, or harassment.
2. Tone & Typing: Typing in ALL CAPITAL LETTERS is perceived as shouting. Use clear punctuation and polite greetings.
3. Verification: Never forward unverified rumors, fake news, or forwarded chain messages without fact-checking sources.
4. Privacy Boundaries: Never share someone else's personal photo, phone number, or private conversation without explicit permission.
5. Cloud Collaboration: Tools like Google Drive, Docs, and Microsoft 365 allow synchronous co-editing, version history audits, and access control (Viewer, Commenter, Editor).`,
    do_instructions: `Review the collaboration scenario, identify proper netiquette responses, and test your knowledge of cloud permission levels.`,
    content_json: {
      dtConcept: 'Positive digital citizenship balances efficient cloud collaboration with respect, fact-checking, and strict privacy boundaries.',
      dtRealWorldCase: 'In a shared student class document, a student accidentally deleted a classmate’s paragraph. Using Cloud Version History, the teacher restored the previous revision in one click without losing any new additions.',
      dtInteractiveType: 'concept',
      challenge: 'Differentiate between Viewer, Commenter, and Editor access roles when sharing school study documents.',
      quiz: [
        {
          question: 'Why is typing messages in ALL CAPS considered poor netiquette?',
          options: [
            'It consumes double the mobile battery',
            'It is interpreted as shouting or aggressive tone',
            'It causes printers to run out of ink faster',
            'It breaks the computer keyboard'
          ],
          correctIndex: 1,
          explanation: 'In digital communication conventions, text in full uppercase signifies shouting and aggressive speech.'
        },
        {
          question: 'If you want classmates to read your project notes without accidentally modifying them, which permission should you grant?',
          options: ['Editor', 'Viewer', 'Co-Owner', 'Administrator'],
          correctIndex: 1,
          explanation: 'Viewer permission allows others to read the content without having rights to delete or alter text.'
        },
        {
          question: 'What should a responsible digital citizen do when receiving an alarming viral forward on social media?',
          options: [
            'Immediately forward it to all class WhatsApp groups',
            'Fact-check the source with credible news outlets before sharing',
            'Demand money from the sender',
            'Post it on their public status to get more followers'
          ],
          correctIndex: 1,
          explanation: 'Fact-checking stops the dangerous spread of misinformation and rumors.'
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
    title: 'Cyber Threats & Malware Anatomy',
    learn_text: `In the digital landscape, understanding adversary tactics is essential for defense. Cyber threats target system availability, data integrity, and personal confidentiality.

Common Categories of Malware (Malicious Software):
1. Virus: Attaches itself to legitimate software programs and replicates when the host program is executed.
2. Worm: Self-replicating malware that spreads across local networks without requiring user interaction, consuming network bandwidth.
3. Trojan Horse: Disguises itself as a legitimate file (e.g. a free game or homework helper) to trick the user into installing it.
4. Ransomware: Encrypts the victim's files, holding their private data hostage until an extortion fee is paid.
5. Spyware & Keyloggers: Secretly monitors keystrokes and webcam/microphone activity to steal bank login credentials.

Social Engineering & Phishing:
Adversaries frequently use psychological manipulation instead of technical hacking. Phishing involves sending fraudulent emails or SMS with urgent warnings ("Your account will be blocked in 10 minutes!") to steal credentials.`,
    do_instructions: `Inspect three simulated emails to identify red flags of phishing, and complete the cyber threat defense challenge.`,
    content_json: {
      dtConcept: 'Malware categories (Viruses, Worms, Trojans, Ransomware) and social engineering techniques (Phishing).',
      dtRealWorldCase: 'A student received an SMS claiming: "CBN has suspended your school account. Click http://cbn-verify-login.xyz to update immediately." The suspicious domain and manufactured urgency are classic signs of a phishing attack.',
      dtInteractiveType: 'phishing',
      challenge: 'Examine sender addresses, spelling anomalies, and deceptive links to spot malicious traps.',
      quiz: [
        {
          question: 'What distinguishes a Trojan Horse from a computer virus?',
          options: [
            'A Trojan is always harmless',
            'A Trojan masquerades as useful, harmless software to trick the user',
            'A Trojan only targets Macintosh computers',
            'A Trojan runs only when the internet is disconnected'
          ],
          correctIndex: 1,
          explanation: 'Trojan horses pretend to be desirable software (like a media player or game mod) while concealing malicious payloads.'
        },
        {
          question: 'What is the primary objective of Ransomware?',
          options: [
            'To clean up unnecessary duplicate files',
            'To encrypt the victim’s files and demand money for the decryption key',
            'To speed up computer startup time',
            'To send free emails to your friends'
          ],
          correctIndex: 1,
          explanation: 'Ransomware locks down files with strong encryption and extorts the victim for ransom.'
        },
        {
          question: 'Which of the following is a classic indicator of a Phishing email?',
          options: [
            'A personalized greeting with accurate invoice details from your confirmed teacher',
            'Urgent emotional threats, mismatched sender domain names, and suspicious links',
            'An email coming from the official school domain @fortuneacademy.edu.ng',
            'A calendar invitation for next term’s sports day'
          ],
          correctIndex: 1,
          explanation: 'Phishing emails often manufacture artificial urgency and use lookalike domain names to panic victims into submitting passwords.'
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
    title: 'Digital Privacy, Passwords & Identity Protection',
    learn_text: `Every time you search, post, browse, or click online, you leave a trail called your Digital Footprint.

Passive vs Active Footprint:
- Passive Footprint: Data gathered without your direct action (IP address, device type, tracking cookies, location history).
- Active Footprint: Content you deliberately post (photos, comments, status updates, submitted forms).

Building an Impenetrable Password Fortress:
1. Entropy & Length: A 14-character passphrase made of unrelated words (e.g. "Elephant#Plate@River99") takes supercomputers trillions of years to crack, whereas "password123" takes less than a second.
2. Avoid Personal Details: Never use your birthday, pet name, or phone number.
3. Multi-Factor Authentication (MFA / 2FA): Requires two pieces of evidence to log in:
   - Something you know (your password)
   - Something you have (an authenticator app token or SMS OTP)
   - Something you are (biometric fingerprint or facial recognition).`,
    do_instructions: `Test password strength in the entropy calculator, identify high-risk footprint exposures, and learn how MFA prevents unauthorized takeovers.`,
    content_json: {
      dtConcept: 'Digital footprints, password entropy, and multi-factor authentication (MFA).',
      dtRealWorldCase: 'Even if an attacker guesses your password through a leak, with 2FA enabled they are blocked because they do not have your physical phone generating the 6-digit one-time code.',
      dtInteractiveType: 'password',
      challenge: 'Construct a 14+ character high-entropy passphrase that achieves a 100% fortress rating in the Secrets Lab.',
      quiz: [
        {
          question: 'Which of the following is considered an active digital footprint?',
          options: [
            'The web server logging your device IP address in background logs',
            'A public comment and photograph you posted on an Instagram forum',
            'A cookie storing your screen resolution',
            'The cellular antenna pinging your nearest tower'
          ],
          correctIndex: 1,
          explanation: 'Active footprints consist of data you intentionally publish or upload online.'
        },
        {
          question: 'Why is a 4-word passphrase like "Sunset#Bridge@Orange42" superior to "P@ss1"?',
          options: [
            'It is shorter and easier for computers to guess',
            'Higher entropy and character length make brute-force attacks mathematically infeasible',
            'It contains no letters',
            'It can only be used once per year'
          ],
          correctIndex: 1,
          explanation: 'Length is the single most important factor in password entropy; combining random words yields immense complexity.'
        },
        {
          question: 'What are the three common authentication factors in MFA?',
          options: [
            'Something you know, something you have, and something you are',
            'Your name, your school, and your uniform',
            'Credit card, debit card, and cash',
            'Email, username, and nickname'
          ],
          correctIndex: 0,
          explanation: 'MFA relies on combinations of knowledge (password), possession (phone/key), and inherence (biometrics).'
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
    title: 'Cryptography: The Science of Secrets',
    learn_text: `Cryptography is the practice and study of techniques for secure communication in the presence of adversaries. It transforms readable Plaintext into scrambled Ciphertext.

The Golden Vocabulary of Cryptography:
- Plaintext: The original, readable message (e.g. "MEET AT THE LAB").
- Cipher: The mathematical algorithm used to encrypt and decrypt.
- Key: The secret parameter used by the cipher to control the transformation.
- Ciphertext: The scrambled, unreadable result (e.g. "PHHW DW WKH ODE").
- Decryption: Reversing the process using the key to restore the plaintext.

The Caesar Cipher (Shift Cipher):
Invented by Julius Caesar to protect military orders. Each letter in the plaintext is shifted by a fixed number of positions down the alphabet:
- With Shift Key = 3: A -> D, B -> E, C -> F ... X -> A, Y -> B, Z -> C.
- ROT13 (Rotate by 13): A special case where shifting by 13 twice returns you back to the start (because 13 + 13 = 26).

Symmetric vs Asymmetric Encryption:
- Symmetric: The same secret key is used to both encrypt and decrypt (fast, used for bulk files).
- Asymmetric: Uses a mathematical key pair — a Public Key (anyone can encrypt) and a Private Key (only the owner can decrypt).`,
    do_instructions: `Enter the Secrets Lab room! Spin the Caesar Cipher wheel, adjust the shift key, and decode the classified intercept.`,
    content_json: {
      dtConcept: 'Plaintext, ciphertext, encryption keys, Caesar shift substitution, and asymmetric key pairs.',
      dtRealWorldCase: 'WhatsApp uses end-to-end encryption based on asymmetric Signal protocol keys. Only you and your friend hold the private keys; not even the telecom network or server can read your messages in transit.',
      dtInteractiveType: 'cipher',
      challenge: 'Decrypt the message "WKH VHFUHW FRGH LV IDWDS" using Caesar Shift 3 in the Secrets Lab.',
      quiz: [
        {
          question: 'If you encrypt the letter "C" using a Caesar Cipher with a shift key of 3, what is the ciphertext letter?',
          options: ['D', 'E', 'F', 'G'],
          correctIndex: 2,
          explanation: 'C is the 3rd letter. Shifting forward by 3: C -> D(1), E(2), F(3). The encrypted letter is F.'
        },
        {
          question: 'What is ROT13?',
          options: [
            'A robot with 13 wheels',
            'A Caesar cipher with a shift of 13, which is self-reversing after two applications',
            'A computer virus created in 2013',
            'A 13-digit bank verification code'
          ],
          correctIndex: 1,
          explanation: 'Since the Latin alphabet has 26 letters, rotating by 13 twice returns the original text.'
        },
        {
          question: 'In asymmetric public-key cryptography, which key can be safely shared with anyone?',
          options: ['The Private Key', 'The Master Root Key', 'The Public Key', 'The ATM PIN'],
          correctIndex: 2,
          explanation: 'The Public Key can be distributed openly to anyone who wants to send you an encrypted message.'
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
    title: 'Mid-Term Review & Capstone Project Phase 1',
    learn_text: `Congratulations on reaching Week 7! This week marks the synthesis milestone for JSS3 Digital Technologies.

Over the past 6 weeks, you have mastered:
1. The hardware/software input-processing-output ecosystem.
2. How packets, routers, DNS, and HTTPS power the Internet.
3. Responsible digital communication and cloud collaboration netiquette.
4. Identifying malware and spotting social engineering/phishing.
5. Password entropy, MFA, and digital privacy defense.
6. The mathematical principles of ciphers and cryptography.

Capstone Project Launch:
In the Projects Room, your multi-week term project is now active. You will design, build, and submit your project artifact, and notify your classroom teacher and Fortune with one tap via WhatsApp!`,
    do_instructions: `Review your progress across all rooms, complete your mid-term checkpoint evaluation, and initiate your Capstone Project submission draft.`,
    content_json: {
      dtConcept: 'Comprehensive mid-term evaluation of digital literacy, cybersecurity hygiene, and cryptography concepts.',
      dtRealWorldCase: 'Major technology companies conduct quarterly security audits where teams review their system defenses, revoke stale permissions, and patch vulnerabilities before launching new software.',
      dtInteractiveType: 'concept',
      challenge: 'Inspect your completed weeks in the Scheme of Work and prepare your project notes.',
      quiz: [
        {
          question: 'Which sequence accurately represents the journey of a secure web transaction?',
          options: [
            'User input -> DNS resolution -> HTTPS encrypted packet transfer -> Server processing -> Display output',
            'Display output -> User input -> DNS resolution -> Delete files',
            'Server processing -> Unencrypted email -> Password guessing -> Print receipt',
            'None of the above'
          ],
          correctIndex: 0,
          explanation: 'Digital web transactions start with user input, resolve the server address via DNS, transfer packets securely via HTTPS, and render output.'
        },
        {
          question: 'Why is practicing cyber hygiene ongoing rather than a one-time event?',
          options: [
            'Because computers expire every 24 hours',
            'Because threat actors continuously evolve new malware and social engineering tactics',
            'Because software cannot be updated once installed',
            'Because school terms are only 13 weeks long'
          ],
          correctIndex: 1,
          explanation: 'Adversaries constantly develop new attack vectors, making proactive security updates and vigilance an ongoing necessity.'
        },
        {
          question: 'What is the role of FATap-CT in Fortune\'s Code & AI Lab?',
          options: [
            'Selling computer cables',
            'Providing pedagogical framework for computational thinking, digital literacy, and practical lab innovation',
            'A game console controller',
            'An offline music player'
          ],
          correctIndex: 1,
          explanation: 'FATap-CT powers the pedagogical foundation of computational thinking and practical digital technology skills.'
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
    title: 'Network Architectures & Wireless Technologies',
    learn_text: `Computer networks link two or more devices to share resources, printers, storage, and internet bandwidth.

Network Scales:
1. PAN (Personal Area Network): Under 10 meters — Bluetooth headphones connected to your smartphone.
2. LAN (Local Area Network): A single building or campus — your school computer lab or home Wi-Fi.
3. MAN (Metropolitan Area Network): Covers an entire city — Lagos state surveillance camera fiber backbone.
4. WAN (Wide Area Network): Spans countries and continents — the global Internet connected through undersea submarine fiber cables.

Network Topologies:
- Star Topology: Every device connects to a central switch/hub. If one cable fails, only that device disconnects.
- Mesh Topology: Every node connects to multiple nodes, offering maximum fault tolerance.

Wireless Security (Wi-Fi):
Open public Wi-Fi without passwords exposes packets to interception. Modern secure Wi-Fi uses WPA2 or WPA3 encryption with strong pre-shared keys. Virtual Private Networks (VPNs) create an encrypted tunnel over untrusted networks.`,
    do_instructions: `Compare Star vs Mesh topologies, examine how a school lab router isolates student traffic, and answer the network architecture questions.`,
    content_json: {
      dtConcept: 'Network scopes (PAN, LAN, MAN, WAN), topologies (Star, Mesh), and wireless security (WPA3, VPN).',
      dtRealWorldCase: 'When MainOne and WACS undersea cables broke off the West African coast, international WAN traffic experienced delays, but local LAN systems inside Nigerian bank branches continued processing local queues.',
      dtInteractiveType: 'network',
      challenge: 'Determine why Star topology is the standard design for secondary school computer labs.',
      quiz: [
        {
          question: 'Which type of network covers an entire school compound or office building?',
          options: ['PAN', 'LAN', 'MAN', 'WAN'],
          correctIndex: 1,
          explanation: 'LAN (Local Area Network) connects devices within a limited geographical area like a school campus or building.'
        },
        {
          question: 'In a Star network topology, what happens if one computer’s cable is accidentally unplugged?',
          options: [
            'The entire school network crashes immediately',
            'Only that disconnected computer loses network access; all others continue working normally',
            'The central switch catches fire',
            'All data on the network is permanently deleted'
          ],
          correctIndex: 1,
          explanation: 'Star topology isolates each workstation connection to the central switch, preventing single-cable failures from taking down the whole network.'
        },
        {
          question: 'What is the primary benefit of using a VPN (Virtual Private Network) on public Wi-Fi?',
          options: [
            'It downloads music without consuming storage',
            'It encrypts your internet traffic through a secure tunnel so nearby snoopers cannot inspect your data',
            'It increases physical screen brightness',
            'It bypasses the need for electricity'
          ],
          correctIndex: 1,
          explanation: 'A VPN wraps your data in an encrypted tunnel, protecting credentials from being captured over open public Wi-Fi.'
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
    title: 'Data Representation: Binary, Hexadecimal & ASCII',
    learn_text: `Underneath all software, graphics, and video games, computers operate purely on electrical voltages: High Voltage (1) and Low Voltage (0). This is the Binary System (Base-2).

Bits and Bytes:
- Bit (Binary Digit): The smallest unit of digital data (0 or 1).
- Nibble: 4 bits (e.g. 1010).
- Byte: 8 bits (e.g. 01000001). A byte can represent 256 distinct values (from 0 to 255).
- Kilobyte (KB): 1,024 bytes.
- Megabyte (MB): 1,024 KB.
- Gigabyte (GB): 1,024 MB.

ASCII & Character Encoding:
The American Standard Code for Information Interchange (ASCII) assigns a unique numerical value to each letter:
- Letter 'A' is decimal 65 -> Binary: 01000001
- Letter 'B' is decimal 66 -> Binary: 01000010
- Space ' ' is decimal 32 -> Binary: 00100000

Hexadecimal (Base-16):
Because binary strings are long and difficult for humans to read, engineers group 4 bits into one Hex digit (0-9, A-F). 
For example: Binary 1111 1111 is Hex FF (Decimal 255). Used for web colors (e.g. #F5A623) and MAC addresses.`,
    do_instructions: `Open the Secrets Lab! Translate your name into 8-bit binary and hexadecimal, and decode the binary mystery word.`,
    content_json: {
      dtConcept: 'Binary (Base-2), Hexadecimal (Base-16), ASCII character encoding, and byte measurement scales.',
      dtRealWorldCase: 'When you take a digital photo on a phone, every pixel is stored as 3 bytes (Red, Green, Blue levels from 0 to 255). A 12-megapixel picture contains over 36 million bytes of binary numbers!',
      dtInteractiveType: 'binary',
      challenge: 'Convert binary 01000001 (65) and 01000010 (66) to their ASCII letters.',
      quiz: [
        {
          question: 'How many bits make up one standard byte?',
          options: ['4 bits', '8 bits', '16 bits', '32 bits'],
          correctIndex: 1,
          explanation: 'There are exactly 8 bits in one byte, capable of representing 256 unique states (2^8).'
        },
        {
          question: 'In ASCII encoding, what English letter corresponds to binary 01000001 (decimal 65)?',
          options: ['Z', 'a', 'A', '1'],
          correctIndex: 2,
          explanation: 'In ASCII standard, uppercase "A" is decimal 65 (binary 01000001).'
        },
        {
          question: 'Why do computer scientists frequently use Hexadecimal (Base-16) instead of long binary strings?',
          options: [
            'Hexadecimal is more compact and directly represents 4 bits with a single character',
            'Hexadecimal is made of secret alien symbols',
            'Hexadecimal uses less battery power',
            'Computers only understand letters and not numbers'
          ],
          correctIndex: 0,
          explanation: 'Hexadecimal provides a clean, human-readable shorthand for binary; one hex character exactly represents one 4-bit nibble.'
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
    title: 'Artificial Intelligence & Algorithmic Ethics',
    learn_text: `Artificial Intelligence (AI) refers to computer systems engineered to perform tasks that traditionally require human intelligence — such as recognizing speech, identifying objects in images, making decisions, and translating languages.

How Modern AI Learns:
Traditional software follows hardcoded rules written by a programmer: "IF score > 50 THEN print Pass".
Machine Learning (ML), however, discovers patterns from massive datasets. By examining thousands of labeled examples, the model learns mathematical weights to predict outputs.

The Pillars of Algorithmic Ethics:
1. Algorithmic Bias: If training data lacks diversity or reflects historical prejudices, the AI will perpetuate unfair outcomes (e.g. facial recognition failing on darker skin tones).
2. Deepfakes & Synthetic Media: Generative AI can create realistic fake audio and video. Citizens must critically verify media sources.
3. Intellectual Property: Respecting original creators, artists, and writers whose work contributes to training sets.
4. Human Agency: AI should empower human capability, not replace accountability for critical healthcare, judicial, or educational decisions.`,
    do_instructions: `Review the ethical case studies on algorithmic fairness and synthetic media, and test your comprehension of AI principles.`,
    content_json: {
      dtConcept: 'Machine learning fundamentals, algorithmic bias, deepfakes, and ethical AI responsibility.',
      dtRealWorldCase: 'In agriculture across Nigeria, computer vision models on farmers’ mobile phones scan cassava and maize leaves to diagnose plant diseases days before human eyes can detect symptoms, saving entire harvests.',
      dtInteractiveType: 'ethics',
      challenge: 'Evaluate how training data quality directly influences the fairness and reliability of an AI model.',
      quiz: [
        {
          question: 'How does machine learning differ from conventional rule-based computer programming?',
          options: [
            'Machine learning requires no computers at all',
            'Machine learning learns patterns and weights from data rather than relying exclusively on hand-written rules',
            'Machine learning only works in television sets',
            'Conventional programming is always powered by solar energy'
          ],
          correctIndex: 1,
          explanation: 'In machine learning, algorithms extract statistical relationships from data examples to make predictions.'
        },
        {
          question: 'What is "algorithmic bias" in AI systems?',
          options: [
            'When the computer screen tilts to one side',
            'When an AI produces systematically unfair or discriminatory predictions due to biased training data',
            'When the internet speed fluctuates',
            'A brand of computer headphones'
          ],
          correctIndex: 1,
          explanation: 'Algorithmic bias occurs when training data or flawed assumptions cause the AI to favor or disadvantage particular groups.'
        },
        {
          question: 'What is a "deepfake"?',
          options: [
            'A very deep hole in the ground',
            'Synthetic video or audio generated by AI that convincingly impersonates real people saying things they never said',
            'An encrypted submarine cable',
            'A math formula used in geometry'
          ],
          correctIndex: 1,
          explanation: 'Deepfakes use generative deep neural networks to produce deceptive media impersonations.'
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
    title: 'Digital Law, Cybercrimes & Nigerian Regulations',
    learn_text: `The digital domain is governed by legal frameworks that protect individuals, businesses, and critical national infrastructure.

The Cybercrimes (Prohibition, Prevention, etc.) Act of Nigeria:
Enacted to tackle cybercrime, protect citizens, and enforce accountability:
1. Unauthorized Access & Hacking: Accessing a computer system, database, or school server without permission is a serious criminal offense punishable by fines and imprisonment.
2. Identity Theft & Impersonation: Creating fake profiles or impersonating individuals online to defraud or deceive carries severe penal consequences.
3. Cyberstalking & Harassment: Using digital devices to intimidate, threaten, or bully another person.
4. Interception of Communications: Wiretapping or packet sniffing without lawful warrant.

Intellectual Property & Copyright:
Software, written articles, photographs, and musical compositions are intellectual property. Software piracy (distributing cracked commercial software) violates copyright laws. Responsible technologists utilize Open Source or legitimately licensed digital tools.`,
    do_instructions: `Review real-world digital legal scenarios in Nigeria, learn how to report cyber incidents, and complete the compliance evaluation.`,
    content_json: {
      dtConcept: 'The Nigerian Cybercrime Act, computer misuse, identity theft, copyright, and reporting mechanisms.',
      dtRealWorldCase: 'A student who gained access to the school exam database using a leaked administrator password faced formal expulsion and legal sanctions under Section 6 of the Cybercrimes Act, demonstrating that digital actions carry real-world legal repercussions.',
      dtInteractiveType: 'concept',
      challenge: 'Distinguish between ethical (white-hat) security research and unlawful computer intrusion.',
      quiz: [
        {
          question: 'Under the Nigerian Cybercrime Act, is accessing another person’s account without authorization considered a crime?',
          options: [
            'No, it is just a harmless prank',
            'Yes, unauthorized access and hacking are punishable by law with severe penalties',
            'Only if the computer was made in Nigeria',
            'Only on weekends'
          ],
          correctIndex: 1,
          explanation: 'The Cybercrimes Act explicitly classifies unauthorized computer access as a serious criminal offense.'
        },
        {
          question: 'What is software piracy?',
          options: [
            'Sailing a ship with a laptop onboard',
            'The illegal copying, distribution, or unauthorized use of copyrighted software',
            'Writing free open-source software',
            'Formatting a flash drive'
          ],
          correctIndex: 1,
          explanation: 'Software piracy involves illegally reproducing or distributing proprietary commercial code without purchasing a license.'
        },
        {
          question: 'What differentiates an Ethical Hacker (White Hat) from a Malicious Hacker (Black Hat)?',
          options: [
            'Ethical hackers only hack at night',
            'Ethical hackers have explicit written permission to test vulnerabilities and report them to help organizations defend systems',
            'Ethical hackers do not use computers',
            'There is no difference between them'
          ],
          correctIndex: 1,
          explanation: 'White-hat ethical hackers operate with authorization, adhering to strict legal and ethical guidelines to discover and remediate vulnerabilities.'
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
    title: 'Digital Career Pathways & Future Innovation',
    learn_text: `The digital transformation of Africa and the global economy has generated high-impact, rewarding career pathways for students equipped with digital fluency.

In-Demand Tech Specializations:
1. Cybersecurity Analyst & Incident Responder: Defends organizations against threat actors, analyzes malware, and enforces fortress policies.
2. Cloud Architect & Systems Engineer: Designs scalable distributed cloud infrastructure on Google Cloud, AWS, or Azure.
3. Data Scientist & AI Engineer: Builds statistical models, neural networks, and algorithms to extract actionable insights from data.
4. Full-Stack Software Engineer: Develops client web interfaces and server architectures powering mobile apps and fintech solutions.
5. Digital Forensics Investigator: Works with law enforcement to gather admissible digital evidence from electronic storage devices.

Future Frontiers:
- Internet of Things (IoT): Smart agriculture, connected traffic systems, and smart energy grids.
- Edge Computing: Processing calculations locally on devices rather than waiting for distant data centers.`,
    do_instructions: `Explore the interactive technology careers roadmap, identify your areas of technical passion, and answer the career readiness questions.`,
    content_json: {
      dtConcept: 'Career paths in cybersecurity, software engineering, cloud systems, and data science.',
      dtRealWorldCase: 'Nigerian fintech startups like Paystack and Flutterwave were built by software engineers and cybersecurity specialists who began their journeys by mastering digital technologies in school labs.',
      dtInteractiveType: 'concept',
      challenge: 'Identify the key foundational skills common across both software development and cybersecurity careers.',
      quiz: [
        {
          question: 'Which technology professional is specifically responsible for defending networks and responding to security breaches?',
          options: [
            'Graphic Print Operator',
            'Cybersecurity Analyst / Security Engineer',
            'Hardware Delivery Driver',
            'Social Media Influencer'
          ],
          correctIndex: 1,
          explanation: 'Cybersecurity analysts monitor network traffic, identify vulnerabilities, and prevent unauthorized security intrusions.'
        },
        {
          question: 'What is the Internet of Things (IoT)?',
          options: [
            'A website that sells used phones',
            'A network of physical devices embedded with sensors, software, and connectivity to exchange data',
            'The total number of internet cables in the world',
            'A software program that deletes viruses'
          ],
          correctIndex: 1,
          explanation: 'IoT connects everyday physical objects (smart meters, sensors, connected appliances) to the internet.'
        },
        {
          question: 'Which fundamental mindset is most essential across all technology careers?',
          options: [
            'Memorizing answers without understanding how they work',
            'Computational thinking, curiosity, continuous learning, and structured problem-solving',
            'Refusing to ask questions when stuck',
            'Never updating computer software'
          ],
          correctIndex: 1,
          explanation: 'Continuous learning and computational problem-solving form the enduring backbone of technological excellence.'
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
    title: 'Capstone Exhibition & Secrets Lab Final Defense',
    learn_text: `Welcome to Week 13 — the Grand Capstone Exhibition for JSS3 Digital Technologies at Fortune's Code & AI Lab!

Over this comprehensive 13-week journey powered by FATap-CT, you have progressed from digital literacy foundations to cyber defense, cryptographic ciphers in the Secrets Lab, network topology engineering, binary computation, ethical AI discernment, and digital law.

Final Capstone Requirements:
1. Ensure your Capstone Project in the Projects Room is turned in with complete solution notes.
2. Complete all 4 classified operative challenges in the Secrets Lab to attain Master Cryptographer clearance.
3. Send your one-tap WhatsApp notification to your teacher and to Fortune for review!
4. Present your completed booklet to your parent/guardian for their end-of-term sign-off.`,
    do_instructions: `Perform your final review, verify that your project has been submitted with WhatsApp notification sent, and achieve your certification badge!`,
    content_json: {
      dtConcept: 'Term culmination: Capstone defense, Secrets Lab operative master certification, and WhatsApp project notification.',
      dtRealWorldCase: 'In professional software and security projects, the final defense and client signoff certify that deliverables meet all architectural standards and regulatory requirements.',
      dtInteractiveType: 'concept',
      challenge: 'Confirm that your term booklet shows full progress and that parent sign-off is ready for completion.',
      quiz: [
        {
          question: 'What is the final step after completing your Capstone Project submission in the Projects Room?',
          options: [
            'Delete all your project files immediately',
            'Tap the one-tap WhatsApp notification button to alert your teacher and Fortune',
            'Turn off the computer forever',
            'Switch schools'
          ],
          correctIndex: 1,
          explanation: 'The one-tap WhatsApp notification provides instant verification to both your classroom teacher and Fortune (FATap-CT).'
        },
        {
          question: 'What security clearance is earned by solving all 4 missions in the Secrets Lab room?',
          options: [
            'Novice Visitor',
            'Master Cipher Analyst & Cyber Detective',
            'Password Guesser',
            'Guest Student'
          ],
          correctIndex: 1,
          explanation: 'Solving the Caesar dispatch, Trojan binary, steganography carrier, and hash match unlocks Master Cipher Analyst status.'
        },
        {
          question: 'How do parents verify their child’s term achievements in Fortune’s Code & AI Lab?',
          options: [
            'By traveling to a physical headquarters in another country',
            'Via the Parent Booklet View with one-tap digital verification signoff for each week',
            'Through postal mail only',
            'They cannot see any progress'
          ],
          correctIndex: 1,
          explanation: 'The dedicated Parent Booklet View enables parents to review completed weekly labs, outputs, and sign off digitally.'
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
    school_id: null,
    title: 'School Cyber Safety & Anti-Phishing Guide',
    instructions: `Create an informative digital safety briefing for new junior secondary students.
Requirements:
1. Explain what phishing is using a relatable Nigerian banking or social media scenario.
2. List 4 distinct red flags that indicate an incoming message is fraudulent.
3. Formulate 3 golden rules for maintaining bulletproof password security (including passphrase entropy).`,
    due_note: 'by Friday 5:00 PM',
    created_at: new Date('2026-01-18T08:00:00Z').toISOString(),
  },
  {
    id: 'asg-dt-002',
    tier: 'jss',
    programme: 'digital_technologies',
    school_id: null,
    title: 'Secrets Lab Caesar & Binary Cryptanalysis',
    instructions: `Analyze encrypted dispatch samples from the Secrets Lab room:
1. Decrypt the ciphertext "KHOOR ZRUOG" (Shift 3).
2. Encode your first name into 8-bit binary ASCII representation.
3. Explain why Caesar ciphers are vulnerable to frequency analysis in modern computing.`,
    due_note: 'by Wednesday morning',
    created_at: new Date('2026-01-25T08:00:00Z').toISOString(),
  },
  {
    id: 'asg-dt-003',
    tier: 'jss',
    programme: 'digital_technologies',
    school_id: null,
    title: 'Local Area Network (LAN) Diagram Specification',
    instructions: `Draft a network topology proposal for a 30-computer secondary school laboratory.
Requirements:
1. Select between Star and Bus topology, explaining why your choice provides better reliability.
2. Detail the roles of the central network switch, Wi-Fi router, and firewall.
3. Recommend security policies for guest Wi-Fi access.`,
    due_note: 'by next Monday',
    created_at: new Date('2026-02-01T08:00:00Z').toISOString(),
  },
];

export const DT_PROJECTS: CaiProject[] = [
  {
    id: 'prj-dt-001',
    tier: 'jss',
    programme: 'digital_technologies',
    title: 'School Cyber Safety & Digital Citizenship Protocol',
    description: `Design a comprehensive cybersecurity policy and awareness charter for secondary school students.
Deliverables:
1. Threat Audit: Identify top 3 cyber risks facing students (phishing, identity theft, malware downloads).
2. Action Protocol: Step-by-step guidance on creating high-entropy passphrases, configuring 2FA, and protecting personal footprints.
3. Legal Awareness: Summary of key provisions from the Nigerian Cybercrime Act regarding unauthorized computer access and cyberbullying.
4. Emergency Response: Clear reporting procedure if a student suspects an account breach.`,
    deliverables: [
      'Comprehensive Cyber Defense Policy Write-Up',
      'Anti-Phishing Checklist & Real-World Examples',
      'Nigerian Cybercrime Act Student Compliance Guide'
    ],
    created_at: new Date('2026-01-15T08:00:00Z').toISOString(),
  },
  {
    id: 'prj-dt-002',
    tier: 'jss',
    programme: 'digital_technologies',
    title: 'The Secrets Lab Cryptosystem & Anti-Phishing Defense Portal',
    description: `Construct a practical cryptography and social engineering defense project utilizing the Secrets Lab tools.
Deliverables:
1. Cryptographic Analysis: Implement a multi-stage cipher transmission (combining Caesar shift + binary ASCII stream).
2. Decryption Key Distribution Plan: Explain how the sender securely shares the key with the recipient without interception.
3. Phishing Email Deconstruction: Create an annotated case study of a deceptive phishing email, pointing out 5 disguised indicators.
4. Steganography Demonstration: Document how a hidden secret was concealed inside a standard school text message.`,
    deliverables: [
      'Secrets Lab Cipher Decryption Proof & Findings',
      'Annotated Phishing Defense Dossier',
      'Steganography Concealment & Extraction Report'
    ],
    created_at: new Date('2026-01-15T08:00:00Z').toISOString(),
  },
  {
    id: 'prj-dt-003',
    tier: 'jss',
    programme: 'digital_technologies',
    title: 'School Computer Lab LAN Network Design & Disaster Plan',
    description: `Develop a complete architectural blueprint for a state-of-the-art, secure secondary school computing laboratory.
Deliverables:
1. Network Topology: Star topology design blueprint connecting 40 student PCs, 1 teacher workstation, and 2 network printers to a managed switch.
2. IP Addressing & Subnetting: Assign private IP address ranges (e.g. 192.168.1.x) with gateway and DNS server specifications.
3. Wireless Defense: Configure WPA3-Enterprise security with isolated VLANs for staff and students.
4. Disaster Recovery Plan: Regular encrypted backups, power surge protection (UPS/Inverter), and ransomware containment protocols.`,
    deliverables: [
      'Network Topology Architecture Blueprint',
      'IP Addressing Table & Security Parameter Sheet',
      'Disaster Recovery & Backup Continuity Protocol'
    ],
    created_at: new Date('2026-01-15T08:00:00Z').toISOString(),
  },
];

export const DT_TRAININGS: CaiTraining[] = [
  {
    id: 'trn-dt-001',
    tier: 'jss',
    programme: 'digital_technologies',
    title: 'How Modern Encryption Works: From Caesar to RSA',
    content: `Master notes on the historical evolution of cryptography:
- The limitation of classical substitution ciphers: Letter frequency analysis can crack them in seconds.
- Why modern public-key cryptography (RSA and Elliptic Curve) relies on the mathematical difficulty of factoring enormous prime numbers.
- How your web browser creates a temporary symmetric session key during an SSL/TLS handshake.`,
    created_at: new Date('2026-01-12T08:00:00Z').toISOString(),
  },
  {
    id: 'trn-dt-002',
    tier: 'jss',
    programme: 'digital_technologies',
    title: 'Zero-Trust Architecture & Securing School Records',
    content: `Security best practices for institutional networks:
- "Never trust, always verify": The foundational motto of modern cybersecurity.
- Principle of Least Privilege (PoLP): Users only get access to the specific files they need for their immediate role.
- Segmenting networks to prevent lateral movement of malware.`,
    created_at: new Date('2026-01-14T08:00:00Z').toISOString(),
  },
  {
    id: 'trn-dt-003',
    tier: 'jss',
    programme: 'digital_technologies',
    title: 'The Anatomy of a Social Engineering Attack',
    content: `In-depth case studies on human deception techniques:
- Pretexting: Creating an invented scenario to steal information.
- Baiting: Leaving an infected USB drive labeled "Exam Questions 2026" in a classroom.
- Urgent Impersonation: Posing as a company executive or principal requesting immediate gift card or token transfers.`,
    created_at: new Date('2026-01-16T08:00:00Z').toISOString(),
  },
];

export interface SecretMission {
  id: string;
  title: string;
  codename: string;
  difficulty: 'Novice' | 'Intermediate' | 'Advanced' | 'Master';
  description: string;
  hint: string;
  challengeType: 'caesar' | 'binary' | 'stego' | 'hash';
  encryptedPayload: string;
  solutionKey: string;
  expectedAnswer: string; // uppercase normalized
  badgeReward: string;
}

export const SECRETS_LAB_MISSIONS: SecretMission[] = [
  {
    id: 'mis-01',
    title: 'Intercepted Military Dispatch',
    codename: 'OPERATION CAESAR',
    difficulty: 'Novice',
    description: 'An intercepted transmission was captured on a radio frequency. The sender used a classical Caesar cipher with a shift of 3.',
    encryptedPayload: 'WKH VHFUHW FRGH LV IDWDS',
    solutionKey: 'Shift 3 backwards',
    hint: 'Every letter is shifted 3 positions ahead. Reverse it by shifting 3 steps back: W -> T, K -> H, H -> E...',
    challengeType: 'caesar',
    expectedAnswer: 'THE SECRET CODE IS FATAP',
    badgeReward: 'Caesar Decryption Specialist 🎖️',
  },
  {
    id: 'mis-02',
    title: 'The Trojan Binary Stream',
    codename: 'OPERATION BITSTREAM',
    difficulty: 'Intermediate',
    description: 'A network packet sniffer intercepted this 8-bit ASCII binary sequence from an incoming server request.',
    encryptedPayload: '01000011 01001111 01000100 01000101',
    solutionKey: '8-bit ASCII binary',
    hint: '01000011 is 67 (C), 01001111 is 79 (O), 01000100 is 68 (D), 01000101 is 69 (E).',
    challengeType: 'binary',
    expectedAnswer: 'CODE',
    badgeReward: 'Binary Codebreaker ⚡',
  },
  {
    id: 'mis-03',
    title: 'Hidden Steganography Token',
    codename: 'OPERATION GHOSTWRITER',
    difficulty: 'Advanced',
    description: 'A classified password was concealed inside a school newsletter carrier text using covert keyword extraction.',
    encryptedPayload: 'Fortune Always Trains Ambitious Pupils - Computational Thinking',
    solutionKey: 'Acronym First-Letter Extraction',
    hint: 'Look at the first letter of each word: (F)ortune (A)lways (T)rains (A)mbitious (P)upils - (C)(T).',
    challengeType: 'stego',
    expectedAnswer: 'FATAP-CT',
    badgeReward: 'Steganography Sleuth 🕵️',
  },
  {
    id: 'mis-04',
    title: 'The SHA-256 Hash Collision Check',
    codename: 'OPERATION ZERO COLLISION',
    difficulty: 'Master',
    description: 'An operative submitted the SHA-256 hash starting with "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8". Identify the 8-letter common word that generated this hash.',
    encryptedPayload: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    solutionKey: 'SHA-256 Digest of standard English word',
    hint: 'It is the most common word people mistakenly use for access protection (starts with "p", 8 letters).',
    challengeType: 'hash',
    expectedAnswer: 'PASSWORD',
    badgeReward: 'Master Cryptographer 👑',
  },
];
