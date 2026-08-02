import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TrustBadges from './components/TrustBadges';
import ToolCard from './components/ToolCard';
import SeoSection from './components/SeoSection';
import InternalLinks from './components/InternalLinks';
import { TOOLS_DATA, CATEGORIES } from './data/toolsData';

// PDF Tool Components
import MergePdfTool from './tools/pdf/MergePdfTool';
import SplitPdfTool from './tools/pdf/SplitPdfTool';
import CompressPdfTool from './tools/pdf/CompressPdfTool';
import PdfToWordTool from './tools/pdf/PdfToWordTool';
import WordToPdfTool from './tools/pdf/WordToPdfTool';
import PdfToJpgTool from './tools/pdf/PdfToJpgTool';
import JpgToPdfTool from './tools/pdf/JpgToPdfTool';
import PdfPasswordTool from './tools/pdf/PdfPasswordTool';

// Image Tool Components
import ImageCompressorTool from './tools/image/ImageCompressorTool';
import ImageConverterTool from './tools/image/ImageConverterTool';
import ImageResizerTool from './tools/image/ImageResizerTool';
import BgRemoverTool from './tools/image/BgRemoverTool';
import ImageToPdfTool from './tools/image/ImageToPdfTool';

// QR Code Component
import QrGeneratorTool from './tools/qr/QrGeneratorTool';

// Bonus Tools
import TextToSpeechTool from './tools/bonus/TextToSpeechTool';
import WordCounterTool from './tools/bonus/WordCounterTool';
import UnitConverterTool from './tools/bonus/UnitConverterTool';

import { ArrowLeft } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [activeToolId, setActiveToolId] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle Hash Routing
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#/', '');
      if (hash && TOOLS_DATA.some(t => t.id === hash)) {
        setActiveToolId(hash);
      } else {
        setActiveToolId(null);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Update Theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Dynamic SEO Page Title & Meta Tags per tool
  useEffect(() => {
    const activeTool = TOOLS_DATA.find(t => t.id === activeToolId);
    if (activeTool) {
      document.title = activeTool.metaTitle || `${activeTool.title} - OmniToolbox`;
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', activeTool.metaDesc);
      }
    } else {
      document.title = 'OmniToolbox - 100% Free & Private Online PDF, Image & QR Tools';
    }
  }, [activeToolId]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSelectTool = (id) => {
    window.location.hash = `#/${id}`;
    setActiveToolId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    window.location.hash = '';
    setActiveToolId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter tools by category & search query
  const filteredTools = TOOLS_DATA.filter(tool => {
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeTool = TOOLS_DATA.find(t => t.id === activeToolId);

  const renderToolComponent = () => {
    switch (activeToolId) {
      case 'merge-pdf': return <MergePdfTool />;
      case 'split-pdf': return <SplitPdfTool />;
      case 'compress-pdf': return <CompressPdfTool />;
      case 'pdf-to-word': return <PdfToWordTool />;
      case 'word-to-pdf': return <WordToPdfTool />;
      case 'pdf-to-jpg': return <PdfToJpgTool />;
      case 'jpg-to-pdf': return <JpgToPdfTool />;
      case 'pdf-password': return <PdfPasswordTool />;

      case 'image-compressor': return <ImageCompressorTool />;
      case 'image-converter': return <ImageConverterTool />;
      case 'image-resizer': return <ImageResizerTool />;
      case 'bg-remover': return <BgRemoverTool />;
      case 'image-to-pdf': return <ImageToPdfTool />;

      case 'qr-generator': return <QrGeneratorTool />;

      case 'text-to-speech': return <TextToSpeechTool />;
      case 'word-counter': return <WordCounterTool />;
      case 'unit-converter': return <UnitConverterTool />;

      default: return null;
    }
  };

  return (
    <div className="app-container">
      <Header
        currentTheme={theme}
        onToggleTheme={toggleTheme}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onGoHome={handleGoHome}
      />

      <main className="main-content">
        {!activeToolId ? (
          /* HOMEPAGE VIEW */
          <div>
            <section className="hero-section">
              <h1 className="hero-title">Free, Fast & 100% Private Online Utilities</h1>
              <p className="hero-subtitle">
                Process PDFs, images, QR codes, and text directly inside your browser. No registration, no server uploads, complete privacy.
              </p>
              <TrustBadges />
            </section>

            {/* Category Filter Tabs */}
            <div className="category-filter">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Tools Cards Grid */}
            <div className="tools-grid">
              {filteredTools.map(tool => (
                <ToolCard key={tool.id} tool={tool} onClick={handleSelectTool} />
              ))}
            </div>
          </div>
        ) : (
          /* TOOL INDIVIDUAL PAGE VIEW */
          <div className="tool-page-container">
            <div className="back-btn" onClick={handleGoHome}>
              <ArrowLeft size={18} /> Back to All Tools
            </div>

            <div className="tool-header">
              <h1 className="tool-title">{activeTool?.title}</h1>
              <p className="tool-description">{activeTool?.shortDesc}</p>
            </div>

            {/* Tool Workspace Component */}
            {renderToolComponent()}

            {/* Internal Links Cross-Navigation */}
            <InternalLinks currentToolId={activeToolId} onSelectTool={handleSelectTool} />

            {/* 300-500 Words SEO Guide + FAQ Accordion + JSON-LD Schema */}
            <SeoSection tool={activeTool} />
          </div>
        )}
      </main>

      <Footer onSelectTool={handleSelectTool} />
    </div>
  );
}
