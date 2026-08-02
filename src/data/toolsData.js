// Detailed database for tools, categories, SEO content, and FAQs

export const TOOLS_DATA = [
  // --- PDF TOOLS ---
  {
    id: 'merge-pdf',
    title: 'Merge PDF',
    category: 'pdf',
    badge: 'Popular',
    iconName: 'FileStack',
    shortDesc: 'Combine multiple PDF files into one organized document in seconds.',
    metaTitle: 'Free PDF Merger Online - Merge PDF Files Easily',
    metaDesc: 'Combine multiple PDF documents into a single file quickly and securely. 100% free online PDF joiner with no registration required.',
    article: {
      h1: 'Merge PDF Files Online for Free',
      intro: 'Merging PDF files is essential when organizing reports, scanned receipts, academic papers, or business contracts. OmniToolbox allows you to select, reorder, and combine multiple PDF documents into a clean single PDF without losing formatting or quality.',
      howTo: [
        'Upload two or more PDF files from your computer or phone.',
        'Arrange the uploaded files in your desired page order.',
        'Click the "Merge PDF" button to combine your documents.',
        'Download your newly merged PDF instantly to your device.'
      ],
      faqs: [
        {
          question: 'Is it safe to merge confidential PDFs on OmniToolbox?',
          answer: 'Yes! OmniToolbox processes all PDF files 100% locally inside your web browser using WebAssembly. Your files are never uploaded to any remote server, ensuring complete privacy.'
        },
        {
          question: 'Is there a limit on how many PDFs I can combine?',
          answer: 'No, you can select and merge as many PDF files as your device memory can process.'
        }
      ]
    }
  },
  {
    id: 'split-pdf',
    title: 'Split PDF',
    category: 'pdf',
    badge: 'Essential',
    iconName: 'Scissors',
    shortDesc: 'Extract specific pages or split a large PDF into individual documents.',
    metaTitle: 'Free PDF Splitter - Extract PDF Pages Online',
    metaDesc: 'Split large PDF files into smaller documents or extract specific page ranges easily. Free, fast, and completely private.',
    article: {
      h1: 'Split PDF Documents & Extract Pages Online',
      intro: 'Need to extract a specific chapter from an ebook or isolate invoice pages from a long document? Our free Split PDF tool gives you total control to extract custom page numbers or range of pages with precision.',
      howTo: [
        'Upload your PDF file to the Split PDF workspace.',
        'Enter the page range (e.g., 1-5 or 3, 7, 10) you want to extract.',
        'Click "Split PDF" to generate your extracted pages.',
        'Download the split PDF file directly.'
      ],
      faqs: [
        {
          question: 'Can I split a password-protected PDF?',
          answer: 'You will need to remove or enter the password first using our PDF Security tool before splitting.'
        }
      ]
    }
  },
  {
    id: 'compress-pdf',
    title: 'Compress PDF',
    category: 'pdf',
    badge: 'High Value',
    iconName: 'Minimize2',
    shortDesc: 'Reduce PDF file size while keeping high visual document quality.',
    metaTitle: 'Free PDF Compressor Online - Reduce PDF Size Fast',
    metaDesc: 'Compress PDF files online to reduce document size for email attachments and web uploads without compromising quality.',
    article: {
      h1: 'Compress PDF Files Online (Reduce File Size)',
      intro: 'Large PDF documents can fail email attachment limits or take forever to upload. Our browser-based PDF Compressor optimizes graphics and font streams to reduce file size efficiently.',
      howTo: [
        'Select and upload your PDF file.',
        'Choose your desired compression quality slider.',
        'Click "Compress PDF" to start optimization.',
        'Save the reduced size PDF file.'
      ],
      faqs: [
        {
          question: 'Will compressing my PDF degrade text quality?',
          answer: 'Vector text remains sharp. The compression optimizes embedded graphics and removes duplicate data.'
        }
      ]
    }
  },
  {
    id: 'pdf-to-word',
    title: 'PDF to Word',
    category: 'pdf',
    badge: 'Popular',
    iconName: 'FileText',
    shortDesc: 'Convert PDF documents into editable Microsoft Word (.docx) files.',
    metaTitle: 'Free PDF to Word Converter Online - PDF to DOCX',
    metaDesc: 'Convert PDF files to editable DOCX Word documents online. Preserve text structure and layout effortlessly.',
    article: {
      h1: 'Convert PDF to Editable Word (.DOCX) Online',
      intro: 'Easily turn non-editable PDF files back into fully editable Microsoft Word documents. Ideal for modifying agreements, resumes, and study materials.',
      howTo: [
        'Upload your PDF file.',
        'Click "Convert to Word".',
        'Download the generated editable .docx file.'
      ],
      faqs: [
        {
          question: 'Can I edit the converted Word document in Google Docs?',
          answer: 'Yes, the generated .docx file is compatible with Microsoft Word, Google Docs, LibreOffice, and Pages.'
        }
      ]
    }
  },
  {
    id: 'word-to-pdf',
    title: 'Word to PDF',
    category: 'pdf',
    badge: 'Fast',
    iconName: 'FileCheck',
    shortDesc: 'Convert DOCX text files into professional PDF documents.',
    metaTitle: 'Free Word to PDF Converter - Convert DOCX to PDF',
    metaDesc: 'Convert Microsoft Word DOCX documents into clean PDF files online instantly. Free and browser-private.',
    article: {
      h1: 'Convert Word Documents to PDF Online',
      intro: 'Ensure your document layout remains identical across all devices and printers by converting your Word files to standard PDF format.',
      howTo: [
        'Upload or paste your Word text content.',
        'Click "Generate PDF".',
        'Download your formatted PDF.'
      ],
      faqs: [
        {
          question: 'Why convert Word to PDF?',
          answer: 'PDF guarantees that fonts, margins, and formatting appear identical regardless of operating system or screen size.'
        }
      ]
    }
  },
  {
    id: 'pdf-to-jpg',
    title: 'PDF to JPG',
    category: 'pdf',
    badge: 'Converter',
    iconName: 'Image',
    shortDesc: 'Extract and convert PDF pages into high-resolution JPG images.',
    metaTitle: 'Free PDF to JPG Converter Online - Turn PDF to Images',
    metaDesc: 'Convert PDF pages into high quality JPG images online. Free tool with high resolution output.',
    article: {
      h1: 'Convert PDF Pages to High-Quality JPG Images',
      intro: 'Extract graphics or convert whole PDF slides into standard image formats for presentations, social media, or web sharing.',
      howTo: [
        'Choose your PDF file.',
        'Click "Convert PDF to JPG".',
        'Download your rendered page images.'
      ],
      faqs: [
        {
          question: 'What image resolution will I get?',
          answer: 'Our converter renders crisp 300 DPI high-definition images directly from vector PDF viewports.'
        }
      ]
    }
  },
  {
    id: 'jpg-to-pdf',
    title: 'JPG to PDF',
    category: 'pdf',
    badge: 'Utility',
    iconName: 'FilePlus',
    shortDesc: 'Convert JPG, PNG, or WebP images into a single PDF document.',
    metaTitle: 'Free JPG to PDF Converter - Convert Images to PDF Online',
    metaDesc: 'Turn images (JPG, PNG, WebP) into a clean, formatted PDF document. Combine multiple photos easily.',
    article: {
      h1: 'Convert JPG Images into PDF Document',
      intro: 'Combine photo scans, receipts, or artwork into a single compact PDF document.',
      howTo: [
        'Select one or multiple images.',
        'Click "Convert to PDF".',
        'Download your single compiled PDF file.'
      ],
      faqs: [
        {
          question: 'Can I reorder images before generating the PDF?',
          answer: 'Yes, you can drag and re-arrange image order before exporting.'
        }
      ]
    }
  },
  {
    id: 'pdf-password',
    title: 'PDF Password Security',
    category: 'pdf',
    badge: 'Security',
    iconName: 'Lock',
    shortDesc: 'Add password protection or remove restrictions from your PDFs.',
    metaTitle: 'Free PDF Password Protect & Remover Online',
    metaDesc: 'Secure your confidential PDF files with strong encryption passwords or unlock authorized PDFs easily.',
    article: {
      h1: 'Protect or Unlock PDF Files Online',
      intro: 'Add strong password encryption to protect sensitive documents or remove known security passwords from your files.',
      howTo: [
        'Upload your PDF file.',
        'Type your secret password to protect the file.',
        'Click "Apply Password" and download.'
      ],
      faqs: [
        {
          question: 'Is my secret password transmitted over the internet?',
          answer: 'No, password setting and encryption happen directly inside your web browser.'
        }
      ]
    }
  },

  // --- IMAGE TOOLS ---
  {
    id: 'image-compressor',
    title: 'Image Compressor',
    category: 'image',
    badge: 'Hot',
    iconName: 'Maximize2',
    shortDesc: 'Compress JPG, PNG, and WebP images up to 80% without losing quality.',
    metaTitle: 'Free Image Compressor Online - Reduce JPG, PNG & WebP Size',
    metaDesc: 'Compress photos and images online without losing quality. Reduce file sizes for fast website loading.',
    article: {
      h1: 'Compress Images Online (JPG, PNG & WebP)',
      intro: 'Optimize your website images for faster page load times and better SEO rankings with our instant browser-based image compressor.',
      howTo: [
        'Upload your photo or image.',
        'Adjust the quality slider (e.g. 75%-85%).',
        'Preview the compressed file size comparison.',
        'Click "Download Compressed Image".'
      ],
      faqs: [
        {
          question: 'How much file size reduction can I expect?',
          answer: 'Most JPG and WebP photos can be reduced by 60% to 80% with zero visible quality loss.'
        }
      ]
    }
  },
  {
    id: 'image-converter',
    title: 'Image Converter',
    category: 'image',
    badge: 'Essential',
    iconName: 'Repeat',
    shortDesc: 'Convert seamlessly between JPG, PNG, WebP, GIF, and BMP formats.',
    metaTitle: 'Free Image Converter Online - Convert JPG, PNG, WebP',
    metaDesc: 'Convert image files to PNG, JPG, or WebP format online for free. Instant client-side conversion.',
    article: {
      h1: 'Convert Image Formats Online (JPG to WebP, PNG to JPG)',
      intro: 'Convert photos to modern high-efficiency formats like WebP or standard formats like PNG and JPG.',
      howTo: [
        'Upload any image file.',
        'Select target format (JPG, PNG, WebP).',
        'Click "Convert Image".',
        'Download your converted image file.'
      ],
      faqs: [
        {
          question: 'Which format is best for web performance?',
          answer: 'WebP offers superior compression and smaller file sizes compared to traditional JPG and PNG.'
        }
      ]
    }
  },
  {
    id: 'image-resizer',
    title: 'Image Resizer',
    category: 'image',
    badge: 'Utility',
    iconName: 'Scaling',
    shortDesc: 'Resize image dimensions in pixels or percentage with aspect ratio lock.',
    metaTitle: 'Free Image Resizer Online - Change Photo Dimensions',
    metaDesc: 'Resize image dimensions by pixels or percentage easily online. Maintain aspect ratio lock.',
    article: {
      h1: 'Resize Image Dimensions Online',
      intro: 'Change photo width and height for social media headers, profile avatars, or website banners.',
      howTo: [
        'Upload an image.',
        'Enter target width or height (or percentage).',
        'Click "Resize Image" and download.'
      ],
      faqs: [
        {
          question: 'Does aspect ratio lock keep my photo from stretching?',
          answer: 'Yes, keeping aspect ratio locked automatically adjusts height when width changes.'
        }
      ]
    }
  },
  {
    id: 'bg-remover',
    title: 'Background Remover',
    category: 'image',
    badge: 'AI Powered',
    iconName: 'Sparkles',
    shortDesc: 'Remove image backgrounds or create transparent PNGs instantly.',
    metaTitle: 'Free Image Background Remover - Transparent PNG Maker',
    metaDesc: 'Remove backgrounds from photos and logos to make transparent PNG images online for free.',
    article: {
      h1: 'Remove Background & Create Transparent PNGs',
      intro: 'Isolate subjects, product photos, or logos by removing solid or near-solid background colors.',
      howTo: [
        'Upload your image.',
        'Adjust threshold color eraser.',
        'Download transparent PNG.'
      ],
      faqs: [
        {
          question: 'What images work best for background removal?',
          answer: 'Images with high contrast between subject and background (like logos, product shots) work best.'
        }
      ]
    }
  },
  {
    id: 'image-to-pdf',
    title: 'Image to PDF',
    category: 'image',
    badge: 'Tool',
    iconName: 'Layers',
    shortDesc: 'Convert multiple photos into a neatly organized PDF file.',
    metaTitle: 'Free Image to PDF Converter - Photos to PDF Document',
    metaDesc: 'Turn multiple photos, screenshots, and scans into a single multi-page PDF document online.',
    article: {
      h1: 'Convert Images & Photos into PDF Files',
      intro: 'Compile your favorite photos or document scans into a single shareable PDF file.',
      howTo: [
        'Choose multiple photos.',
        'Click "Generate PDF".',
        'Download your compiled PDF.'
      ],
      faqs: [
        {
          question: 'Does this preserve image resolution?',
          answer: 'Yes, full source resolution images are embedded into the PDF canvas.'
        }
      ]
    }
  },

  // --- QR CODE GENERATOR ---
  {
    id: 'qr-generator',
    title: 'QR Code Generator',
    category: 'qr',
    badge: 'Interactive',
    iconName: 'QrCode',
    shortDesc: 'Create custom QR codes for Web URLs, WiFi logins, Text, and vCard contacts.',
    metaTitle: 'Free Custom QR Code Generator - Text, WiFi, vCard, URL',
    metaDesc: 'Generate custom QR codes online for website URLs, WiFi networks, vCard business cards, and text with custom colors.',
    article: {
      h1: 'Custom QR Code Generator (URL, WiFi, vCard & Text)',
      intro: 'Generate high-resolution scannable QR codes for your business, restaurant menus, WiFi networks, and digital business cards.',
      howTo: [
        'Select QR type (URL, WiFi, Text, or vCard).',
        'Fill in the required information.',
        'Customize colors and preview live.',
        'Download high-res PNG or SVG QR code.'
      ],
      faqs: [
        {
          question: 'Do these QR codes expire?',
          answer: 'No! These static QR codes encode your data directly and work forever without any subscription.'
        },
        {
          question: 'How does the WiFi QR code work?',
          answer: 'When scanned with a smartphone camera, users can tap to instantly join your WiFi network without typing passwords.'
        }
      ]
    }
  },

  // --- BONUS TOOLS ---
  {
    id: 'text-to-speech',
    title: 'Text to Speech',
    category: 'bonus',
    badge: 'Audio',
    iconName: 'Volume2',
    shortDesc: 'Convert written text into natural human speech audio.',
    metaTitle: 'Free Text to Speech Online - Audio Voice Generator',
    metaDesc: 'Convert text into spoken voice with customizable pitch, speed, and accents using browser speech synthesis.',
    article: {
      h1: 'Text to Speech Online (Voice Generator)',
      intro: 'Listen to articles, proofread essays, or create voiceovers for content using native browser SpeechSynthesis voices.',
      howTo: [
        'Type or paste text into the reader box.',
        'Choose voice accent, pitch, and playback speed.',
        'Click "Play Speech" to listen live.'
      ],
      faqs: [
        {
          question: 'What languages and accents are available?',
          answer: 'Available voices depend on your system and browser (includes English, Spanish, Hindi, French, German, etc.).'
        }
      ]
    }
  },
  {
    id: 'word-counter',
    title: 'Word & Text Counter',
    category: 'bonus',
    badge: 'Writing',
    iconName: 'AlignLeft',
    shortDesc: 'Count words, characters, sentences, reading time, and keyword density.',
    metaTitle: 'Free Word Counter Online - Sentence & Character Count Tool',
    metaDesc: 'Count total words, characters, sentences, paragraphs, and reading time online in real-time.',
    article: {
      h1: 'Real-Time Word & Character Counter Tool',
      intro: 'Check word count limits for essays, tweets, blog posts, and SEO meta descriptions with instant statistical breakdowns.',
      howTo: [
        'Paste or type text into the live editor.',
        'Instantly view word count, character count, and reading duration.'
      ],
      faqs: [
        {
          question: 'Does this tool save my typed text anywhere?',
          answer: 'No, everything is processed live in your browser window.'
        }
      ]
    }
  },
  {
    id: 'unit-converter',
    title: 'Unit Converter',
    category: 'bonus',
    badge: 'Math',
    iconName: 'ArrowLeftRight',
    shortDesc: 'Convert metric and imperial units for length, mass, temp, and storage.',
    metaTitle: 'Free Online Unit Converter - Length, Weight, Temp & Storage',
    metaDesc: 'Convert between metric and imperial units instantly across Length, Weight, Temperature, Area, and Storage.',
    article: {
      h1: 'All-in-One Online Unit Converter',
      intro: 'Convert measurements between metric and imperial systems with real-time math calculation precision.',
      howTo: [
        'Select conversion category (e.g. Length, Weight, Temperature).',
        'Enter input value and choose units.',
        'Get instant calculated result.'
      ],
      faqs: [
        {
          question: 'Which measurement units are supported?',
          answer: 'Supports meters, feet, inches, kilometers, miles, kilograms, pounds, Celsius, Fahrenheit, MB, GB, TB, and more.'
        }
      ]
    }
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Tools' },
  { id: 'pdf', name: 'PDF Tools' },
  { id: 'image', name: 'Image Tools' },
  { id: 'qr', name: 'QR Generator' },
  { id: 'bonus', name: 'Bonus Tools' }
];
