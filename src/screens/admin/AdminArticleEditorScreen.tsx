import React, { useState, useEffect, useRef } from 'react';
import { Article, ArticleFormData } from '../../types';
import { articleService } from '../../services/articleService';
import ArticlePreviewModal from '../../components/admin/ArticlePreviewModal';

interface AdminArticleEditorScreenProps {
  articleId?: string | null;
  onSaveSuccess: () => void;
  onCancel: () => void;
}

const CATEGORIES = [
  'Corporate & Commercial',
  'Transactions',
  'Regulatory & Compliance',
  'Disputes & Risk',
  'General Legal Insights',
];

export default function AdminArticleEditorScreen({
  articleId,
  onSaveSuccess,
  onCancel,
}: AdminArticleEditorScreenProps) {
  const isEditing = Boolean(articleId);

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [autoSlug, setAutoSlug] = useState(true);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [coverImageAlt, setCoverImageAlt] = useState('');
  const [coverImageCaption, setCoverImageCaption] = useState('');
  const [authorName, setAuthorName] = useState('Eiren Law Office Editorial Team');
  const [status, setStatus] = useState<'draft' | 'published' | 'scheduled' | 'archived'>('draft');
  const [scheduledAt, setScheduledAt] = useState('');
  const [featured, setFeatured] = useState(false);
  
  // SEO
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  
  // Editorial Review
  const [reviewerName, setReviewerName] = useState('');
  const [editorialStatus, setEditorialStatus] = useState<'pending' | 'approved' | 'revisions_required'>('approved');
  const [internalReviewNotes, setInternalReviewNotes] = useState('');
  const [includeDisclaimer, setIncludeDisclaimer] = useState(true);

  // UI state
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [error, setError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [seoExpanded, setSeoExpanded] = useState(false);
  const [editorialExpanded, setEditorialExpanded] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load existing article if editing
  useEffect(() => {
    if (!articleId) return;

    async function loadArticle() {
      try {
        setFetching(true);
        const data = await articleService.getAdminArticle(articleId!);
        setTitle(data.title);
        setSlug(data.slug);
        setAutoSlug(false);
        setCategory(data.category);
        setExcerpt(data.excerpt || '');
        setContent(data.content);
        setCoverImageUrl(data.coverImageUrl || '');
        setCoverImageAlt(data.coverImageAlt || '');
        setCoverImageCaption(data.coverImageCaption || '');
        setAuthorName(data.authorName || 'Eiren Law Office Editorial Team');
        setStatus(data.status);
        if (data.scheduledAt) setScheduledAt(data.scheduledAt.slice(0, 16));
        setFeatured(Boolean(data.featured));
        setSeoTitle(data.seoTitle || '');
        setSeoDescription(data.seoDescription || '');
        setReviewerName(data.reviewerName || '');
        setEditorialStatus(data.editorialStatus || 'approved');
        setInternalReviewNotes(data.internalReviewNotes || '');
        setIncludeDisclaimer(data.includeDisclaimer !== false);
      } catch (err: any) {
        setError(err.message || 'Failed to load article');
      } finally {
        setFetching(false);
      }
    }

    loadArticle();
  }, [articleId]);

  // Handle title change and slug generation
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (autoSlug) {
      const generated = val
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generated);
    }
  };

  // Image Upload handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPEG, PNG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        setUploadingImage(true);
        const base64Data = reader.result as string;
        const uploadResult = await articleService.uploadCoverImage(base64Data, file.name);
        setCoverImageUrl(uploadResult.url);
        if (!coverImageAlt) setCoverImageAlt(title || file.name);
      } catch (err: any) {
        alert(err.message || 'Image upload failed.');
      } finally {
        setUploadingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Toolbar action helpers for markdown editor
  const insertFormatting = (prefix: string, suffix: string = '', defaultText: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end) || defaultText;
    const replacement = `${prefix}${selectedText}${suffix}`;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 0);
  };

  // Submit form
  const handleSave = async (targetStatus?: 'draft' | 'published') => {
    if (!title.trim()) {
      alert('Article title is mandatory.');
      return;
    }

    if (!content.trim()) {
      alert('Article content cannot be empty.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const payload: ArticleFormData = {
        title: title.trim(),
        slug: slug.trim() || undefined as any,
        category,
        excerpt: excerpt.trim(),
        content: content.trim(),
        coverImageUrl: coverImageUrl.trim() || 'https://i.imgur.com/7ILPegs.jpeg',
        coverImageAlt: coverImageAlt.trim(),
        coverImageCaption: coverImageCaption.trim(),
        authorName: authorName.trim(),
        status: targetStatus || status,
        scheduledAt: status === 'scheduled' && scheduledAt ? scheduledAt : undefined,
        seoTitle: seoTitle.trim() || undefined,
        seoDescription: seoDescription.trim() || undefined,
        featured,
        reviewerName: reviewerName.trim(),
        editorialStatus,
        internalReviewNotes: internalReviewNotes.trim(),
        includeDisclaimer,
      };

      if (isEditing) {
        await articleService.updateArticle(articleId!, payload);
      } else {
        await articleService.createArticle(payload);
      }

      onSaveSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to save article.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center p-12">
        <div className="w-8 h-8 border-2 border-[#b51c00] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-label-caps uppercase text-[#5e5e5e] mt-3">
          Loading article data...
        </p>
      </div>
    );
  }

  const currentPreviewArticle: Partial<Article> = {
    title: title || 'Untitled Article',
    slug: slug || 'article-preview',
    category,
    excerpt,
    content,
    coverImageUrl,
    coverImageAlt,
    coverImageCaption,
    authorName,
    status,
    includeDisclaimer,
    readingTimeMinutes: Math.max(1, Math.ceil((content || '').split(/\s+/).length / 200)),
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Top Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#eae7e7] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-4 h-1 bg-[#b51c00] block"></span>
            <span className="font-label-caps text-xs text-[#5e5e5e] uppercase tracking-wider">
              {isEditing ? 'Editing Article' : 'New Publication Draft'}
            </span>
          </div>
          <h1 className="font-headline-md text-2xl font-bold text-[#1b1b1b]">
            {isEditing ? 'Update Legal Insight' : 'Create Legal Insight'}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-[#eae7e7] bg-white text-[#1b1b1b] text-xs font-label-caps uppercase tracking-wider hover:bg-[#eae7e7] transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="px-4 py-2 bg-[#f0eded] text-[#1b1b1b] text-xs font-label-caps uppercase tracking-wider hover:bg-[#1b1b1b] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            <span>Live Preview</span>
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => handleSave('draft')}
            className="px-4 py-2 border border-[#1b1b1b] bg-white text-[#1b1b1b] text-xs font-label-caps uppercase tracking-wider hover:bg-[#1b1b1b] hover:text-white transition-colors cursor-pointer"
          >
            Save Draft
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => handleSave('published')}
            className="px-5 py-2 bg-[#b51c00] hover:bg-[#8f1600] text-white text-xs font-label-caps uppercase tracking-wider transition-colors cursor-pointer shadow-sm flex items-center gap-1.5 font-bold"
          >
            <span className="material-symbols-outlined text-[16px]">publish</span>
            <span>Publish Now</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-[#fff1ee] border-l-3 border-[#b51c00] text-xs text-[#b51c00] font-body-sm flex items-start gap-2">
          <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
          <span>{error}</span>
        </div>
      )}

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Core Content Fields (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Article Title */}
          <div className="bg-white p-6 border border-[#eae7e7] shadow-xs space-y-4">
            <div>
              <label className="block text-xs font-label-caps uppercase tracking-wider text-[#1b1b1b] font-bold mb-1.5">
                Article Title <span className="text-[#b51c00]">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Navigating Foreign Direct Investment & PT PMA Structuring in Indonesia"
                className="w-full px-4 py-3 text-base font-headline-sm font-bold bg-[#fcf9f8] border border-[#eae7e7] text-[#1b1b1b] focus:outline-none focus:border-[#b51c00] transition-colors"
              />
            </div>

            {/* URL Slug with toggle */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-label-caps uppercase tracking-wider text-[#5e5e5e]">
                  URL Slug
                </label>
                <button
                  type="button"
                  onClick={() => setAutoSlug(!autoSlug)}
                  className="text-[10px] font-label-caps uppercase text-[#b51c00] hover:underline cursor-pointer"
                >
                  {autoSlug ? 'Customize Slug' : 'Auto-generate from Title'}
                </button>
              </div>
              <div className="flex items-center bg-[#fcf9f8] border border-[#eae7e7] px-3 py-2 text-xs font-mono text-[#5e5e5e]">
                <span className="text-[#8c8c8c] select-none">/insights/</span>
                <input
                  type="text"
                  value={slug}
                  disabled={autoSlug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="article-slug-url"
                  className="w-full bg-transparent border-none text-[#1b1b1b] focus:outline-none pl-1 disabled:text-[#5e5e5e]"
                />
              </div>
            </div>
          </div>

          {/* Excerpt / Executive Summary */}
          <div className="bg-white p-6 border border-[#eae7e7] shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-label-caps uppercase tracking-wider text-[#1b1b1b] font-bold">
                Executive Summary / Excerpt
              </label>
              <span className="text-[10px] text-[#8c8c8c]">
                {excerpt.length} characters (Ideal: 120-180)
              </span>
            </div>
            <textarea
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A concise synopsis displayed on article preview cards, search engines, and social media sharing cards."
              className="w-full p-3 text-xs font-body-md bg-[#fcf9f8] border border-[#eae7e7] text-[#1b1b1b] focus:outline-none focus:border-[#b51c00] transition-colors leading-relaxed"
            />
          </div>

          {/* Main Article Content & Rich Markdown Editor */}
          <div className="bg-white border border-[#eae7e7] shadow-xs overflow-hidden">
            {/* Editor Toolbar */}
            <div className="bg-[#f6f3f2] border-b border-[#eae7e7] px-4 py-2.5 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="font-label-caps uppercase text-[10px] text-[#5e5e5e] font-bold mr-2">
                Formatting:
              </span>
              <button
                type="button"
                onClick={() => insertFormatting('## ', '\n', 'Section Title')}
                title="Heading 2"
                className="px-2 py-1 bg-white border border-[#eae7e7] hover:bg-[#eae7e7] font-bold text-xs cursor-pointer"
              >
                H2
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('### ', '\n', 'Subheading Title')}
                title="Heading 3"
                className="px-2 py-1 bg-white border border-[#eae7e7] hover:bg-[#eae7e7] font-bold text-xs cursor-pointer"
              >
                H3
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('**', '**', 'bold text')}
                title="Bold"
                className="px-2 py-1 bg-white border border-[#eae7e7] hover:bg-[#eae7e7] font-bold text-xs cursor-pointer"
              >
                B
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('*', '*', 'italic text')}
                title="Italic"
                className="px-2 py-1 bg-white border border-[#eae7e7] hover:bg-[#eae7e7] italic text-xs cursor-pointer"
              >
                I
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('- ', '\n', 'List item')}
                title="Bullet List"
                className="px-2 py-1 bg-white border border-[#eae7e7] hover:bg-[#eae7e7] text-xs cursor-pointer"
              >
                • List
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('1. ', '\n', 'Numbered step')}
                title="Numbered List"
                className="px-2 py-1 bg-white border border-[#eae7e7] hover:bg-[#eae7e7] text-xs cursor-pointer"
              >
                1. List
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('> ', '\n', 'Important statutory principle')}
                title="Legal Quote / Callout"
                className="px-2 py-1 bg-white border border-[#eae7e7] hover:bg-[#eae7e7] text-xs cursor-pointer"
              >
                &ldquo; Callout
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('[Link Title](', ')', 'https://example.com')}
                title="Insert Link"
                className="px-2 py-1 bg-white border border-[#eae7e7] hover:bg-[#eae7e7] text-xs cursor-pointer"
              >
                Link
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('\n---\n\n')}
                title="Divider"
                className="px-2 py-1 bg-white border border-[#eae7e7] hover:bg-[#eae7e7] text-xs cursor-pointer"
              >
                HR
              </button>
            </div>

            <div className="p-4">
              <label className="block text-xs font-label-caps uppercase tracking-wider text-[#1b1b1b] font-bold mb-2">
                Main Article Content <span className="text-[#b51c00]">*</span>
              </label>
              <textarea
                ref={textareaRef}
                rows={18}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Draft article content here using clean editorial markdown with H2 sections, bullet points, and legal analysis."
                className="w-full p-4 text-sm font-mono bg-[#fcf9f8] border border-[#eae7e7] text-[#1b1b1b] focus:outline-none focus:border-[#b51c00] transition-colors leading-relaxed"
              />
              <div className="flex justify-between items-center text-[11px] text-[#5e5e5e] mt-2">
                <span>
                  Words: {content.trim() ? content.trim().split(/\s+/).length : 0} · Est. Reading Time:{' '}
                  {Math.max(1, Math.ceil((content || '').split(/\s+/).length / 200))} min
                </span>
                <span className="text-[#8c8c8c]">Supports Markdown &amp; structured headings</span>
              </div>
            </div>
          </div>

          {/* SEO Metadata Accordion */}
          <div className="bg-white border border-[#eae7e7] shadow-xs">
            <button
              type="button"
              onClick={() => setSeoExpanded(!seoExpanded)}
              className="w-full p-5 flex items-center justify-between text-left hover:bg-[#fcf9f8] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#5e5e5e] text-[18px]">search</span>
                <span className="font-label-caps text-xs font-bold uppercase tracking-wider text-[#1b1b1b]">
                  Search Engine Optimization (SEO) &amp; Open Graph
                </span>
              </div>
              <span className="material-symbols-outlined text-[18px] text-[#5e5e5e]">
                {seoExpanded ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {seoExpanded && (
              <div className="p-6 border-t border-[#eae7e7] space-y-4 bg-[#fcf9f8]">
                <div>
                  <label className="block text-xs font-label-caps uppercase tracking-wider text-[#1b1b1b] mb-1 font-bold">
                    Custom SEO Title
                  </label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder={title ? `${title} | Eiren Law Office` : 'Custom title tag'}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#eae7e7] text-[#1b1b1b] focus:outline-none focus:border-[#b51c00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-label-caps uppercase tracking-wider text-[#1b1b1b] mb-1 font-bold">
                    Meta Description
                  </label>
                  <textarea
                    rows={2}
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    placeholder={excerpt || 'Brief description for search results.'}
                    className="w-full p-3 text-xs bg-white border border-[#eae7e7] text-[#1b1b1b] focus:outline-none focus:border-[#b51c00]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Publishing Controls & Editorial Quality (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Publishing Settings Box */}
          <div className="bg-white p-6 border border-[#eae7e7] shadow-xs space-y-5">
            <h3 className="font-headline-sm text-sm font-bold uppercase tracking-wider text-[#1b1b1b] pb-2 border-b border-[#eae7e7]">
              Publishing Settings
            </h3>

            {/* Status Dropdown */}
            <div>
              <label className="block text-xs font-label-caps uppercase tracking-wider text-[#1b1b1b] font-bold mb-1.5">
                Publication Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-[#fcf9f8] border border-[#eae7e7] text-[#1b1b1b] focus:outline-none focus:border-[#b51c00]"
              >
                <option value="draft">Draft (Private, not listed)</option>
                <option value="published">Published (Live on Insights)</option>
                <option value="scheduled">Scheduled (Auto-publish date)</option>
                <option value="archived">Archived (Unpublished archive)</option>
              </select>
            </div>

            {/* Scheduled Date Picker if scheduled */}
            {status === 'scheduled' && (
              <div>
                <label className="block text-xs font-label-caps uppercase tracking-wider text-[#1b1b1b] font-bold mb-1">
                  Scheduled Publish Date/Time
                </label>
                <input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#fcf9f8] border border-[#eae7e7] text-[#1b1b1b] focus:outline-none focus:border-[#b51c00]"
                />
              </div>
            )}

            {/* Practice Category */}
            <div>
              <label className="block text-xs font-label-caps uppercase tracking-wider text-[#1b1b1b] font-bold mb-1.5">
                Practice Area Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#fcf9f8] border border-[#eae7e7] text-[#1b1b1b] focus:outline-none focus:border-[#b51c00]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Author Attribution */}
            <div>
              <label className="block text-xs font-label-caps uppercase tracking-wider text-[#1b1b1b] font-bold mb-1.5">
                Author Attribution
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Eiren Law Office Editorial Team"
                className="w-full px-3 py-2 text-xs bg-[#fcf9f8] border border-[#eae7e7] text-[#1b1b1b] focus:outline-none focus:border-[#b51c00]"
              />
            </div>

            {/* Featured Article Toggle */}
            <div className="pt-2 border-t border-[#eae7e7]">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-label-caps uppercase tracking-wider text-[#1b1b1b]">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="accent-[#b51c00] w-4 h-4 cursor-pointer"
                />
                <span className="font-bold">Highlight as Featured Article</span>
              </label>
              <p className="text-[11px] text-[#5e5e5e] mt-1 pl-6">
                Featured articles appear prominently in the Insights header hero section.
              </p>
            </div>

            {/* Legal Disclaimer Toggle */}
            <div className="pt-2 border-t border-[#eae7e7]">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-label-caps uppercase tracking-wider text-[#1b1b1b]">
                <input
                  type="checkbox"
                  checked={includeDisclaimer}
                  onChange={(e) => setIncludeDisclaimer(e.target.checked)}
                  className="accent-[#b51c00] w-4 h-4 cursor-pointer"
                />
                <span className="font-bold">Include Legal Advice Disclaimer</span>
              </label>
            </div>
          </div>

          {/* Cover Image Uploader Box */}
          <div className="bg-white p-6 border border-[#eae7e7] shadow-xs space-y-4">
            <h3 className="font-headline-sm text-sm font-bold uppercase tracking-wider text-[#1b1b1b] pb-2 border-b border-[#eae7e7]">
              Cover Image Asset
            </h3>

            {coverImageUrl ? (
              <div className="space-y-3">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#f0eded] border border-[#eae7e7]">
                  <img
                    src={coverImageUrl}
                    alt={coverImageAlt || 'Cover preview'}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 py-1.5 bg-[#f0eded] hover:bg-[#1b1b1b] hover:text-white text-xs font-label-caps uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Replace Image
                  </button>
                  <button
                    type="button"
                    onClick={() => setCoverImageUrl('')}
                    className="px-3 py-1.5 border border-[#eae7e7] text-xs font-label-caps uppercase text-[#b51c00] hover:bg-[#fff1ee] cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#eae7e7] hover:border-[#b51c00] p-6 text-center cursor-pointer transition-colors bg-[#fcf9f8]"
              >
                <span className="material-symbols-outlined text-[32px] text-[#5e5e5e] mb-1">
                  add_photo_alternate
                </span>
                <span className="block text-xs font-label-caps uppercase text-[#1b1b1b] font-bold">
                  {uploadingImage ? 'Uploading...' : 'Upload Cover Image'}
                </span>
                <span className="block text-[11px] text-[#8c8c8c] mt-0.5">
                  JPEG, PNG, WebP (Max 5MB)
                </span>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Direct Image URL input */}
            <div>
              <label className="block text-[11px] font-label-caps uppercase text-[#5e5e5e] mb-1">
                Or Image URL
              </label>
              <input
                type="url"
                value={coverImageUrl}
                onChange={(e) => setCoverImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-2.5 py-1.5 text-xs bg-[#fcf9f8] border border-[#eae7e7] text-[#1b1b1b] focus:outline-none focus:border-[#b51c00]"
              />
            </div>

            {/* Alt text and Caption */}
            <div>
              <label className="block text-[11px] font-label-caps uppercase text-[#5e5e5e] mb-1">
                Image Alt Text
              </label>
              <input
                type="text"
                value={coverImageAlt}
                onChange={(e) => setCoverImageAlt(e.target.value)}
                placeholder="Descriptive text for accessibility"
                className="w-full px-2.5 py-1.5 text-xs bg-[#fcf9f8] border border-[#eae7e7] text-[#1b1b1b] focus:outline-none focus:border-[#b51c00]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-label-caps uppercase text-[#5e5e5e] mb-1">
                Image Caption (Optional)
              </label>
              <input
                type="text"
                value={coverImageCaption}
                onChange={(e) => setCoverImageCaption(e.target.value)}
                placeholder="Caption rendered beneath cover"
                className="w-full px-2.5 py-1.5 text-xs bg-[#fcf9f8] border border-[#eae7e7] text-[#1b1b1b] focus:outline-none focus:border-[#b51c00]"
              />
            </div>
          </div>

          {/* Editorial Quality Control & Internal Notes */}
          <div className="bg-white border border-[#eae7e7] shadow-xs">
            <button
              type="button"
              onClick={() => setEditorialExpanded(!editorialExpanded)}
              className="w-full p-5 flex items-center justify-between text-left hover:bg-[#fcf9f8] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#5e5e5e] text-[18px]">verified</span>
                <span className="font-label-caps text-xs font-bold uppercase tracking-wider text-[#1b1b1b]">
                  Quality Control &amp; Review
                </span>
              </div>
              <span className="material-symbols-outlined text-[18px] text-[#5e5e5e]">
                {editorialExpanded ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {editorialExpanded && (
              <div className="p-6 border-t border-[#eae7e7] space-y-4 bg-[#fcf9f8]">
                <div>
                  <label className="block text-xs font-label-caps uppercase tracking-wider text-[#1b1b1b] mb-1 font-bold">
                    Reviewing Lawyer / Partner
                  </label>
                  <input
                    type="text"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="e.g. Krisna Murti Ardianto, S.H."
                    className="w-full px-3 py-2 text-xs bg-white border border-[#eae7e7] text-[#1b1b1b] focus:outline-none focus:border-[#b51c00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-label-caps uppercase tracking-wider text-[#1b1b1b] mb-1 font-bold">
                    Editorial Review Status
                  </label>
                  <select
                    value={editorialStatus}
                    onChange={(e) => setEditorialStatus(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#eae7e7] text-[#1b1b1b] focus:outline-none focus:border-[#b51c00]"
                  >
                    <option value="pending">Pending Review</option>
                    <option value="approved">Approved for Publication</option>
                    <option value="revisions_required">Revisions Required</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-label-caps uppercase tracking-wider text-[#1b1b1b] mb-1 font-bold">
                    Internal Review Notes (Confidential)
                  </label>
                  <textarea
                    rows={3}
                    value={internalReviewNotes}
                    onChange={(e) => setInternalReviewNotes(e.target.value)}
                    placeholder="Private notes between editorial team. Never displayed on public website."
                    className="w-full p-2.5 text-xs bg-white border border-[#eae7e7] text-[#1b1b1b] focus:outline-none focus:border-[#b51c00]"
                  />
                  <span className="text-[10px] text-[#8c8c8c] italic mt-0.5 block">
                    Strictly confidential: excluded from public API responses.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Live Preview Modal */}
      <ArticlePreviewModal
        isOpen={isPreviewOpen}
        article={currentPreviewArticle}
        onClose={() => setIsPreviewOpen(false)}
        onPublish={() => {
          setIsPreviewOpen(false);
          handleSave('published');
        }}
      />
    </div>
  );
}
