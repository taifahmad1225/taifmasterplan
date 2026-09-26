import React, { useState, useEffect } from 'react';
import { CATEGORIES, Category } from './data/categoriesData';
import { ALL_TOOLS, getToolsForCategory, ToolItem, enrichTool } from './data/toolsData';
import { diagnoseUserQuery, DoctorDiagnosis } from './data/aiDoctorData';
import { DOCTOR_PROBLEMS_20, getDoctorProblemBySlug, DoctorSeoProblem } from './data/doctorSeoData';
import { MICRO_COURSES, MicroCourse } from './data/coursesData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { WhatsAppBox } from './components/WhatsAppBox';
import { CategoriesGrid } from './components/CategoriesGrid';
import { AiWorkflowBuilder } from './components/AiWorkflowBuilder';
import { ToolsSection } from './components/ToolsSection';
import { EarningCalculator } from './components/EarningCalculator';
import { ToolDetailModal } from './components/ToolDetailModal';
import { VideoModal } from './components/VideoModal';
import { PromptModal } from './components/PromptModal';
import { AiDoctorModal } from './components/AiDoctorModal';
import { WhatsAppSuccessModal } from './components/WhatsAppSuccessModal';
import { BookmarksModal } from './components/BookmarksModal';
import { VoicePromptModal } from './components/VoicePromptModal';
import { UstadJeeChat } from './components/UstadJeeChat';
import { DailyAiNews } from './components/DailyAiNews';
import { AiBattleSection } from './components/AiBattleSection';
import { DealsSection } from './components/DealsSection';
import { FeaturedHomeSections } from './components/FeaturedHomeSections';
import { SubmitToolModal } from './components/SubmitToolModal';
import { AdminSubmittedToolsModal } from './components/AdminSubmittedToolsModal';
import { Footer } from './components/Footer';
import { DoctorListPage } from './components/DoctorListPage';
import { DoctorProblemPage } from './components/DoctorProblemPage';
import { ReportCardPage } from './components/ReportCardPage';
import { LmsSection } from './components/LmsSection';
import { CourseDetailPage } from './components/CourseDetailPage';
import { WorkspacePage } from './components/WorkspacePage';
import { CertificateModal } from './components/CertificateModal';
import { Sparkles, MessageCircle, X } from 'lucide-react';
import { startVoiceListening } from './utils/voiceRecognition';

export default function App() {
  const [currentLang, setCurrentLang] = useState<'ur' | 'en'>('ur');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('writing');

  // SPA Route State based on path:
  // 'home' | 'doctor-list' | 'doctor-detail' | 'report-card' | 'course-detail' | 'workspace'
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [activeDoctorSlug, setActiveDoctorSlug] = useState<string>('');
  const [activeCourseSlug, setActiveCourseSlug] = useState<string>('');

  // Modals state
  const [activeDetailTool, setActiveDetailTool] = useState<ToolItem | null>(null);
  const [activeVideoTool, setActiveVideoTool] = useState<ToolItem | null>(null);
  const [activePromptTool, setActivePromptTool] = useState<ToolItem | null>(null);
  const [activeDoctorDiagnosis, setActiveDoctorDiagnosis] = useState<DoctorDiagnosis | null>(null);
  const [joinedPhoneNumber, setJoinedPhoneNumber] = useState<string | null>(null);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isVoicePromptOpen, setIsVoicePromptOpen] = useState(false);
  const [voicePromptTopic, setVoicePromptTopic] = useState<string>('');
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [certificateCourseTitle, setCertificateCourseTitle] = useState('AI ٹولز ماسٹری کورس');
  const [showReportCardPopup, setShowReportCardPopup] = useState(false);

  // Parse path on initial load
  useEffect(() => {
    const syncRouteFromPath = () => {
      const path = window.location.pathname;
      if (path === '/doctor' || path === '/doctor/') {
        setCurrentRoute('doctor-list');
      } else if (path.startsWith('/doctor/')) {
        const slug = path.replace('/doctor/', '').replace(/\/$/, '');
        setActiveDoctorSlug(slug);
        setCurrentRoute('doctor-detail');
      } else if (path === '/my-report-card' || path === '/my-report-card/') {
        setCurrentRoute('report-card');
      } else if (path === '/workspace' || path === '/workspace/') {
        setCurrentRoute('workspace');
      } else if (path.startsWith('/course/')) {
        const slug = path.replace('/course/', '').replace(/\/$/, '');
        setActiveCourseSlug(slug);
        setCurrentRoute('course-detail');
      } else {
        setCurrentRoute('home');
      }
    };

    syncRouteFromPath();
    window.addEventListener('popstate', syncRouteFromPath);
    return () => window.removeEventListener('popstate', syncRouteFromPath);
  }, []);

  // Safe navigation without window.history.back() misuse
  const navigateTo = (path: string, route: string, extra?: { doctorSlug?: string; courseSlug?: string }) => {
    try {
      window.history.pushState({ path, route }, '', path);
    } catch {
      // ignore
    }
    setCurrentRoute(route);
    if (extra?.doctorSlug) setActiveDoctorSlug(extra.doctorSlug);
    if (extra?.courseSlug) setActiveCourseSlug(extra.courseSlug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenToolDetail = (tool: ToolItem) => {
    setActiveDetailTool(tool);
    const toolSlug = tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const categorySlug = tool.categoryId || selectedCategoryId;
    try {
      window.history.pushState(
        { toolId: tool.id, categoryId: categorySlug, view: 'tool-detail' },
        '',
        `/tool/${toolSlug}`
      );
    } catch {
      // ignore
    }
  };

  const handleCloseToolDetail = () => {
    const currentCategory = activeDetailTool?.categoryId || selectedCategoryId;
    setActiveDetailTool(null);
    try {
      window.history.pushState(
        { categoryId: currentCategory, view: 'category' },
        '',
        `/category/${currentCategory}`
      );
    } catch {
      // ignore
    }
  };

  // Handle open voice prompt directly in modal without navigating away
  const handleOpenVoicePrompt = (tool?: ToolItem) => {
    setIsVoicePromptOpen(true);
    setVoicePromptTopic(tool?.name || '');
  };

  // Feature 1: Favorites / Bookmark state (saved in localStorage key "myFavorites")
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('myFavorites');
      if (saved) return JSON.parse(saved);
      const legacy = localStorage.getItem('aimaster_bookmarks');
      return legacy ? JSON.parse(legacy) : ['tool-write-1', 'tool-img-1', 'tool-youtube-1'];
    } catch {
      return ['tool-write-1', 'tool-img-1', 'tool-youtube-1'];
    }
  });

  // Saved Workflows state for Workspace
  const [savedWorkflows, setSavedWorkflows] = useState<Array<{ id: string; titleUrdu: string; subtitleUrdu: string; stepsCount: number; date: string }>>(() => {
    try {
      const raw = localStorage.getItem('aimaster_saved_workflows_meta');
      if (raw) return JSON.parse(raw);
      return [
        {
          id: 'wf-youtube-short',
          titleUrdu: 'یوٹیوب شارٹ بنانا (ChatGPT ➔ ElevenLabs ➔ CapCut)',
          subtitleUrdu: 'مکمل وائرل شارٹ ویڈیو خودکار تیار کریں',
          stepsCount: 4,
          date: '25 ستمبر 2026'
        },
        {
          id: 'wf-fiverr-logo',
          titleUrdu: 'Fiverr پر لوگو بیچنا (Ideogram ➔ Recraft ➔ Canva)',
          subtitleUrdu: 'انٹرنیشنل کلائنٹ کو ویکٹر برانڈ کٹ ڈلیور کریں',
          stepsCount: 4,
          date: '24 ستمبر 2026'
        }
      ];
    } catch {
      return [];
    }
  });

  // Feature 7: Submit tool & Admin modal states
  const [isSubmitToolOpen, setIsSubmitToolOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return window.location.search.includes('admin=taif');
    } catch {
      return false;
    }
  });
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string, duration = 2500) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, duration);
  };

  // Sync document direction and lang attribute with state
  useEffect(() => {
    if (currentLang === 'en') {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    } else {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ur';
    }
  }, [currentLang]);

  // Feature 1: Toggle favorite with green toast and localStorage sync
  // FEATURE 2 TRIGGER: Show this card popup after user saves 3 tools: "مبارک ہو، آپ کی رپورٹ تیار ہے!"
  const handleToggleBookmark = (toolId: string) => {
    setBookmarkedIds(prev => {
      const exists = prev.includes(toolId);
      const next = exists ? prev.filter(id => id !== toolId) : [...prev, toolId];
      try {
        localStorage.setItem('myFavorites', JSON.stringify(next));
        localStorage.setItem('savedTools', JSON.stringify(next)); // Also sync savedTools
      } catch {
        // ignore storage errors
      }

      if (!exists && next.length === 3) {
        setShowReportCardPopup(true);
      }

      showToast(
        exists
          ? (currentLang === 'ur' ? '❌ پسندیدہ سے ہٹا دیا گیا' : 'Removed from favorites')
          : (currentLang === 'ur' ? '✅ پسندیدہ میں محفوظ ہو گیا' : 'Saved to favorites!'),
        2000
      );
      return next;
    });
  };

  // Feature 1: Clear all favorites
  const handleClearAllFavorites = () => {
    setBookmarkedIds([]);
    try {
      localStorage.setItem('myFavorites', JSON.stringify([]));
      localStorage.setItem('savedTools', JSON.stringify([]));
    } catch {
      // ignore
    }
    showToast(currentLang === 'ur' ? 'تمام پسندیدہ ٹولز ہٹا دیے گئے' : 'Cleared all favorites', 2000);
  };

  // Switch category and scroll to tools section
  const handleSelectCategory = (categoryId: string) => {
    if (currentRoute !== 'home') {
      navigateTo('/', 'home');
    }
    setSelectedCategoryId(categoryId);
    setTimeout(() => {
      const element = document.getElementById('tools-showcase');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // AI Doctor search handler:
  // FEATURE 1: When user searches e.g. "mere views nahi aa rahe", redirect to /doctor/[slug]
  const handleDoctorSearch = (query: string) => {
    const trimmed = query.trim().toLowerCase();
    
    // Check if query matches our 20 SEO problem pages
    const foundProb = DOCTOR_PROBLEMS_20.find(p =>
      trimmed.includes(p.queryKeyword.toLowerCase()) ||
      p.queryKeyword.toLowerCase().includes(trimmed) ||
      trimmed.includes(p.slug)
    );

    if (foundProb) {
      navigateTo(`/doctor/${foundProb.slug}`, 'doctor-detail', { doctorSlug: foundProb.slug });
      showToast(`🏥 AI ڈاکٹر کا مخصوص صفحہ کھل گیا: ${foundProb.queryKeyword}`);
      return;
    }

    // Dynamic slug creation for SEO: /doctor/[problem-slug]
    const dynamicSlug = trimmed
      .replace(/[^\u0600-\u06FFa-zA-Z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 40) || 'masla-diagnosis';

    // If matches preset diagnosis or fallback
    const diagnosis = diagnoseUserQuery(query);
    setActiveDoctorDiagnosis(diagnosis);
    try {
      window.history.pushState({ query, route: 'doctor' }, '', `/doctor/${dynamicSlug}`);
    } catch {
      // ignore
    }
  };

  const handleQuickCopyPrompt = (tool: ToolItem) => {
    navigator.clipboard.writeText(tool.promptTemplate);
    showToast(
      currentLang === 'ur'
        ? `"${tool.urduName}" کا پرامپٹ کاپی ہو گیا! 📋`
        : `"${tool.name}" prompt copied! 📋`,
      2000
    );
  };

  // Active Category & Tools
  const activeCategory = CATEGORIES.find(c => c.id === selectedCategoryId) || CATEGORIES[0];
  const activeTools = getToolsForCategory(selectedCategoryId);

  // All bookmarked tools list (enriched)
  const bookmarkedTools = ALL_TOOLS.filter(t => bookmarkedIds.includes(t.id)).map(enrichTool);

  // Requirement 2: English/Urdu Toggle
  const handleLanguageToggle = (lang: 'ur' | 'en') => {
    setCurrentLang(lang);
    if (lang === 'en') {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
      showToast('English view enabled - 100% Urdu content is preserved in database', 2000);
    } else {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ur';
      showToast('اردو زبان فعال کر دی گئی ہے۔', 2000);
    }
  };

  const isUrdu = currentLang === 'ur';

  // Helper to open micro course detail page
  const handleOpenMicroCourse = (course: MicroCourse) => {
    navigateTo(`/course/${course.slug}`, 'course-detail', { courseSlug: course.slug });
  };

  const handleOpenCertificate = (courseTitle: string) => {
    setCertificateCourseTitle(courseTitle);
    setIsCertificateOpen(true);
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-[#FBFBFD] text-slate-900 ${
        isUrdu ? 'font-urdu' : 'font-latin'
      }`}
      dir={isUrdu ? 'rtl' : 'ltr'}
    >
      {/* 1. Header with direct routes for Workspace, Doctor list, Course, and Report Card */}
      <Header
        currentLanguage={currentLang}
        onLanguageChange={handleLanguageToggle}
        savedCount={bookmarkedIds.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenSubmitTool={() => setIsSubmitToolOpen(true)}
        isAdmin={isAdmin}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onNavigateWorkspace={() => navigateTo('/workspace', 'workspace')}
        onNavigateDoctorList={() => navigateTo('/doctor', 'doctor-list')}
        onNavigateReportCard={() => navigateTo('/my-report-card', 'report-card')}
        onScrollToCourse={() => {
          if (currentRoute !== 'home') {
            navigateTo('/', 'home');
          }
          setTimeout(() => {
            const el = document.getElementById('lms-course-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        currentRoute={currentRoute}
        onNavigateHome={() => navigateTo('/', 'home')}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        
        {/* ========================================================================= */}
        {/* ROUTE 1: /doctor (All 20 SEO Problems List) */}
        {/* ========================================================================= */}
        {currentRoute === 'doctor-list' && (
          <DoctorListPage
            onSelectProblem={(slug) => navigateTo(`/doctor/${slug}`, 'doctor-detail', { doctorSlug: slug })}
            onNavigateHome={() => navigateTo('/', 'home')}
          />
        )}

        {/* ========================================================================= */}
        {/* ROUTE 2: /doctor/[problem-slug] (Dedicated SEO Problem Page) */}
        {/* ========================================================================= */}
        {currentRoute === 'doctor-detail' && (
          <DoctorProblemPage
            problem={getDoctorProblemBySlug(activeDoctorSlug) || DOCTOR_PROBLEMS_20[0]}
            onSelectProblem={(slug) => navigateTo(`/doctor/${slug}`, 'doctor-detail', { doctorSlug: slug })}
            onNavigateAllProblems={() => navigateTo('/doctor', 'doctor-list')}
            onNavigateHome={() => navigateTo('/', 'home')}
            onToast={(msg) => showToast(msg, 2000)}
            onOpenToolDetailByName={(toolName) => {
              const found = ALL_TOOLS.find(t => t.name.toLowerCase().includes(toolName.toLowerCase()));
              if (found) {
                handleOpenToolDetail(enrichTool(found));
              } else {
                showToast(`ٹول: ${toolName}`);
              }
            }}
          />
        )}

        {/* ========================================================================= */}
        {/* ROUTE 3: /my-report-card (Report Card Sharing Image & Canvas Generator) */}
        {/* ========================================================================= */}
        {currentRoute === 'report-card' && (
          <ReportCardPage
            savedToolsCount={bookmarkedIds.length}
            bookmarkedTools={bookmarkedTools}
            onToast={(msg) => showToast(msg, 2000)}
            onNavigateHome={() => navigateTo('/', 'home')}
            onNavigateWorkspace={() => navigateTo('/workspace', 'workspace')}
          />
        )}

        {/* ========================================================================= */}
        {/* ROUTE 4: /course/[slug] (Micro Course Detail with Video & Certificate) */}
        {/* ========================================================================= */}
        {currentRoute === 'course-detail' && (
          <CourseDetailPage
            course={MICRO_COURSES.find(c => c.slug === activeCourseSlug) || MICRO_COURSES[0]}
            onOpenCertificate={handleOpenCertificate}
            onNavigateHome={() => {
              navigateTo('/', 'home');
              setTimeout(() => {
                const el = document.getElementById('lms-course-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            onToast={(msg) => showToast(msg, 2000)}
          />
        )}

        {/* ========================================================================= */}
        {/* ROUTE 5: /workspace (Mera Workspace Page: Saved Tools, Workflows, Report) */}
        {/* ========================================================================= */}
        {currentRoute === 'workspace' && (
          <WorkspacePage
            savedTools={bookmarkedTools}
            savedWorkflows={savedWorkflows}
            onRemoveTool={handleToggleBookmark}
            onOpenToolDetail={handleOpenToolDetail}
            onOpenReportCard={() => navigateTo('/my-report-card', 'report-card')}
            onNavigateHome={() => navigateTo('/', 'home')}
            onToast={(msg) => showToast(msg, 2000)}
          />
        )}

        {/* ========================================================================= */}
        {/* ROUTE 6: HOME ROUTE (Full Featured Portal with All 20 Features) */}
        {/* ========================================================================= */}
        {currentRoute === 'home' && (
          <>
            {/* WhatsApp Newsletter Top Bar */}
            <WhatsAppBox
              lang={currentLang}
              onJoinSuccess={(phone) => setJoinedPhoneNumber(phone)}
              onToast={(msg) => showToast(msg, 3000)}
            />

            {/* AI Doctor Bar on Top (Auto generates /doctor/[slug]) */}
            <HeroSection
              onSearchSubmit={handleDoctorSearch}
              onQuickTopicClick={handleDoctorSearch}
              onToast={(msg) => showToast(msg, 3000)}
            />

            {/* AI Workflow Builder (Custom Workflow + 4 Presets) */}
            <AiWorkflowBuilder
              lang={currentLang}
              onToast={(msg) => showToast(msg, 2000)}
              onOpenDetailBySlug={(slug) => {
                const found = ALL_TOOLS.find(
                  t => t.id === slug || t.name.toLowerCase().includes(slug.toLowerCase().replace(/-/g, ' '))
                );
                if (found) {
                  handleOpenToolDetail(enrichTool(found));
                } else {
                  const el = document.getElementById('tools-showcase');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />

            {/* FEATURE 3: LMS Course Section - AI سیکھو، کماؤ (Feature #20) */}
            <LmsSection
              onOpenMicroCourse={handleOpenMicroCourse}
              onOpenCertificate={handleOpenCertificate}
              onToast={(msg) => showToast(msg, 2000)}
            />

            {/* Daily AI News Section */}
            <DailyAiNews
              lang={currentLang}
              onToast={(msg) => showToast(msg, 2500)}
            />

            {/* 3 Homepage Sections (Just Added, Most Saved, Trending) */}
            <FeaturedHomeSections
              tools={ALL_TOOLS.map(enrichTool)}
              lang={currentLang}
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={handleToggleBookmark}
              onOpenDetail={(tool) => handleOpenToolDetail(tool)}
              onOpenPrompt={(tool) => setActivePromptTool(tool)}
              onSelectCategory={handleSelectCategory}
              onToast={(msg) => showToast(msg, 2000)}
            />

            {/* Deals & Coupons Section */}
            <DealsSection
              lang={currentLang}
              onToast={(msg) => showToast(msg, 2500)}
            />

            {/* Grid of 25 Categories in 4 columns */}
            <CategoriesGrid
              categories={CATEGORIES}
              selectedCategoryId={selectedCategoryId}
              lang={currentLang}
              onSelectCategory={handleSelectCategory}
            />

            {/* Tools Section with 10 tools per category + 11-points card */}
            <ToolsSection
              category={activeCategory}
              tools={activeTools}
              lang={currentLang}
              onOpenVideo={(tool) => setActiveVideoTool(tool)}
              onOpenPrompt={(tool) => setActivePromptTool(tool)}
              onOpenDetail={(tool) => handleOpenToolDetail(tool)}
              onOpenVoicePrompt={handleOpenVoicePrompt}
              onQuickCopy={handleQuickCopyPrompt}
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={handleToggleBookmark}
            />

            {/* AI vs AI Battle (Viral Feature) */}
            <AiBattleSection
              lang={currentLang}
              onToast={(msg) => showToast(msg, 2500)}
            />

            {/* Fiverr Earning Calculator */}
            <EarningCalculator lang={currentLang} />
          </>
        )}
      </main>

      {/* Floating Ustad Jee Chat Bot (Bottom Left) */}
      <UstadJeeChat
        lang={currentLang}
        onToast={(msg) => showToast(msg, 3000)}
      />

      {/* Interactive Floating WhatsApp Contact Widget (Bottom Right) */}
      <a
        href="https://wa.me/923001234567?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%DB%8C%DA%A9%D9%85!%20%D9%85%D8%AC%DA%BE%DB%92%20AI%20%D9%B9%D9%88%D9%84%D8%B2%20%DA%A9%DB%92%20%D8%A8%D8%A7%D8%B1%DB%92%20%D9%85%DB%8C%DA%BA%20%D9%85%D8%B9%D9%84%D9%88%D9%85%D8%A7%D8%AA%20%DA%86%D8%A7%DB%81%DB%8C%DB%81"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#1EBE5D] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 group border-2 border-white/80"
        title={isUrdu ? 'واٹس ایپ پر رابطہ کریں' : 'Contact on WhatsApp'}
      >
        <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
        <span className="text-xs font-bold hidden sm:inline">
          {isUrdu ? 'واٹس ایپ پر پوچھیں' : 'Ask on WhatsApp'}
        </span>
      </a>

      {/* Footer */}
      <Footer lang={currentLang} />

      {/* Tool Detail Modal (Section A, B, C and Master Prompt) */}
      <ToolDetailModal
        tool={activeDetailTool}
        lang={currentLang}
        onClose={handleCloseToolDetail}
        onOpenVideo={(tool) => {
          handleCloseToolDetail();
          setActiveVideoTool(tool);
        }}
        onOpenVoicePrompt={handleOpenVoicePrompt}
        onToast={(msg) => showToast(msg, 2000)}
      />

      {/* Video Modal */}
      <VideoModal
        tool={activeVideoTool}
        onClose={() => setActiveVideoTool(null)}
        onOpenPrompt={(tool) => {
          setActiveVideoTool(null);
          setActivePromptTool(tool);
        }}
      />

      {/* Prompt Modal */}
      <PromptModal
        tool={activePromptTool}
        onClose={() => setActivePromptTool(null)}
        onOpenVoicePrompt={handleOpenVoicePrompt}
        onToast={(msg) => showToast(msg, 2000)}
      />

      {/* Live Voice Prompt Modal with address bar hint & ur-PK speech */}
      <VoicePromptModal
        isOpen={isVoicePromptOpen}
        onClose={() => setIsVoicePromptOpen(false)}
        onToast={(msg) => showToast(msg, 2000)}
        initialTopic={voicePromptTopic}
      />

      {/* AI Doctor Diagnosis Modal for in-modal quick diagnoses */}
      <AiDoctorModal
        diagnosis={activeDoctorDiagnosis}
        lang={currentLang}
        onClose={() => setActiveDoctorDiagnosis(null)}
        onToast={(msg) => showToast(msg, 2000)}
        onSelectToolName={(toolName) => {
          const found = ALL_TOOLS.find(t => t.name.toLowerCase().includes(toolName.toLowerCase()));
          if (found) {
            setSelectedCategoryId(found.categoryId);
            setTimeout(() => {
              const el = document.getElementById('tools-showcase');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }
        }}
      />

      {/* WhatsApp Success Modal */}
      {joinedPhoneNumber && (
        <WhatsAppSuccessModal
          phoneNumber={joinedPhoneNumber}
          onClose={() => setJoinedPhoneNumber(null)}
        />
      )}

      {/* Bookmarks Modal */}
      {isBookmarksOpen && (
        <BookmarksModal
          tools={bookmarkedTools}
          allAvailableTools={ALL_TOOLS.map(enrichTool)}
          onClose={() => setIsBookmarksOpen(false)}
          onRemove={handleToggleBookmark}
          onClearAll={handleClearAllFavorites}
          onOpenVideo={(tool) => {
            setIsBookmarksOpen(false);
            setActiveVideoTool(tool);
          }}
          onOpenPrompt={(tool) => {
            setIsBookmarksOpen(false);
            setActivePromptTool(tool);
          }}
          onOpenDetail={(tool) => {
            setIsBookmarksOpen(false);
            setActiveDetailTool(tool);
          }}
          onToast={(msg) => showToast(msg, 2000)}
        />
      )}

      {/* Feature 7: Submit Tool Modal */}
      <SubmitToolModal
        isOpen={isSubmitToolOpen}
        onClose={() => setIsSubmitToolOpen(false)}
        onToast={(msg) => showToast(msg, 2500)}
      />

      {/* Feature 7: Admin Submitted Tools Modal (?admin=taif) */}
      <AdminSubmittedToolsModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onToast={(msg) => showToast(msg, 2000)}
      />

      {/* FEATURE 3: Official Course Certificate Modal with Canvas Download */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        courseTitleUrdu={certificateCourseTitle}
        onToast={(msg) => showToast(msg, 2500)}
      />

      {/* FEATURE 2: 3-Tools Saved Milestone Popup: "مبارک ہو، آپ کی رپورٹ تیار ہے!" */}
      {showReportCardPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in font-urdu" dir="rtl">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border-2 border-[#25D366] text-center space-y-4 relative">
            <span className="text-5xl block animate-bounce">🎉</span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              مبارک ہو، آپ کی رپورٹ تیار ہے!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              آپ نے 3 سے زائد AI ٹولز کا انتخاب کر لیا ہے۔ اپنا مصدقہ AI رپورٹ کارڈ دیکھیں، محفوظ کریں اور دوستوں کے ساتھ واٹس ایپ اور انسٹاگرام پر شیئر کریں۔
            </p>

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowReportCardPopup(false);
                  navigateTo('/my-report-card', 'report-card');
                }}
                style={{ backgroundColor: '#25D366' }}
                className="w-full py-3 rounded-xl text-white font-black text-sm flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 shadow-md cursor-pointer"
              >
                <span>رپورٹ کارڈ دیکھیں اور ڈاؤنلوڈ کریں 📊</span>
              </button>

              <button
                type="button"
                onClick={() => setShowReportCardPopup(false)}
                className="w-full py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-slate-600 font-bold text-xs cursor-pointer"
              >
                بعد میں دیکھوں گا
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Apple-style Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-bounce-short pointer-events-none">
          <div
            className={`backdrop-blur-md text-white text-xs sm:text-sm font-black px-6 py-3.5 rounded-2xl shadow-2xl border flex items-center gap-2.5 transition-all ${
              toastMessage.includes('مبارک') || toastMessage.includes('کامیاب')
                ? 'bg-[#1EBE5D] border-[#25D366] text-white shadow-[#25D366]/40'
                : 'bg-slate-900/95 border-slate-700/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
