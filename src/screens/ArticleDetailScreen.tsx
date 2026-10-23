import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import { articleService } from '../services/articleService';
import MarkdownRenderer from '../components/MarkdownRenderer';
import ArticleCard from '../components/ArticleCard';
import { createGmailComposeUrl } from '../utils/email';

interface ArticleDetailScreenProps {
  slug: string;
  onBackToInsights: () => void;
  onSelectArticle: (article: Article) => void;
  onOpenConsultation: (defaultDomain?: string) => void;
}

export default function ArticleDetailScreen({
  slug,
  onBackToInsights,
  onSelectArticle,
  onOpenConsultation,
}: ArticleDetailScreenProps) {
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadArticle() {
      try {
        setLoading(true);
        setError(null);
        const data = await articleService.getArticleBySlug(slug);
        if (isMounted) {
          setArticle(data.article);
          setRelatedArticles(data.relatedArticles || []);
          // Sync page title
          document.title = `${data.article.title} | Eiren Law Office`;
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Article could not be loaded.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }

    loadArticle();

    return () => {
      isMounted = false;
      document.title = 'Eiren Law Office | Clear Counsel. Commercial Judgment. Reliable Execution.';
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center space-y-4 bg-[#fcf9f8]">
        <div className="w-8 h-8 border-2 border-[#b51c00] border-t-transparent rounded-full animate-spin"></div>
        <p className="font-label-caps text-xs text-[#5e5e5e] uppercase tracking-wider">
          Loading legal analysis...
        </p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-6 bg-[#fcf9f8]">
        <div className="bg-white p-10 border border-[#eae7e7] shadow-sm max-w-lg text-center space-y-4">
          <span className="material-symbols-outlined text-[#b51c00] text-4xl">article</span>
          <h2 className="font-headline-md text-xl font-bold text-[#1b1b1b]">
            Publication Unavailable
          </h2>
          <p className="font-body-md text-sm text-[#5e5e5e] leading-relaxed">
            {error || 'The requested article could not be located or has been unpublished.'}
          </p>
          <button
            onClick={onBackToInsights}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1b1b1b] text-white text-xs font-label-caps uppercase tracking-wider hover:bg-[#b51c00] transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Return to Insights</span>
          </button>
        </div>
      </div>
    );
  }

  // Pre-filled Email inquiry message incorporating article title
  const emailSubject = `Legal Inquiry: ${article.title} — Eiren Law Office`;
  const emailBody = `Hello Eiren Law Office,\n\nI have read an article on your website and would like to enquire about your legal services.\n\nArticle: ${article.title}\nCategory: ${article.category}\n\nCould you please let me know the appropriate next steps?\n\nThank you.`;
  const composeUrl = createGmailComposeUrl(emailSubject, emailBody);

  const formattedDate = new Date(article.publishedAt || article.createdAt).toLocaleDateString(
    'en-GB',
    { day: 'numeric', month: 'long', year: 'numeric' }
  );

  return (
    <article className="w-full bg-[#fcf9f8] min-h-screen pb-24">
      {/* 1. TOP BREADCRUMB & CATEGORY BAR */}
      <section className="w-full bg-white border-b border-[#eae7e7] py-4">
        <div className="w-full max-w-5xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-label-caps uppercase tracking-wider text-[#5e5e5e]">
            <button
              onClick={onBackToInsights}
              className="hover:text-[#b51c00] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">arrow_back</span>
              <span>Insights</span>
            </button>
            <span>/</span>
            <span className="text-[#1b1b1b] font-bold">{article.category}</span>
          </nav>

          {/* Reading Time */}
          <div className="flex items-center gap-2 text-xs font-label-caps uppercase text-[#5e5e5e]">
            <span className="material-symbols-outlined text-[15px] text-[#b51c00]">schedule</span>
            <span>{article.readingTimeMinutes} min read</span>
          </div>
        </div>
      </section>

      {/* 2. EDITORIAL ARTICLE HEADER */}
      <header className="w-full pt-12 pb-8">
        <div className="w-full max-w-4xl mx-auto px-6 space-y-6">
          {/* Supertitle badge */}
          <div className="flex items-center gap-3">
            <span className="w-6 h-[3px] bg-[#b51c00] block"></span>
            <span className="font-label-caps text-label-caps text-[#b51c00] uppercase text-xs tracking-wider font-bold">
              {article.category}
            </span>
            <span className="text-[#8c8c8c]">·</span>
            <span className="font-label-caps text-xs text-[#5e5e5e] uppercase">
              Published {formattedDate}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-display-hero text-2xl sm:text-3xl lg:text-4xl text-[#1b1b1b] font-bold tracking-tight leading-tight">
            {article.title}
          </h1>

          {/* Author Attribution */}
          <div className="flex items-center gap-4 pt-2 pb-4 border-b border-[#eae7e7]">
            <div className="w-10 h-10 bg-[#f0eded] border border-[#eae7e7] flex items-center justify-center font-bold text-xs text-[#1b1b1b]">
              ELO
            </div>
            <div>
              <span className="font-title-md text-xs sm:text-sm font-bold text-[#1b1b1b] block">
                {article.authorName}
              </span>
              <span className="font-label-caps text-[11px] text-[#5e5e5e] uppercase tracking-wider block">
                Eiren Law Office · Jakarta CBD Practice
              </span>
            </div>
          </div>

          {/* Standalone Lead Excerpt */}
          {article.excerpt && (
            <p className="font-body-lg text-base sm:text-lg text-[#313030] leading-relaxed italic border-l-2 border-[#b51c00] pl-4 py-1">
              {article.excerpt}
            </p>
          )}
        </div>
      </header>

      {/* 3. FEATURED COVER IMAGE */}
      {article.coverImageUrl && (
        <div className="w-full max-w-4xl mx-auto px-6 mb-10">
          <figure className="relative overflow-hidden bg-[#f0eded] border border-[#eae7e7] shadow-sm">
            <img
              src={article.coverImageUrl}
              alt={article.coverImageAlt || article.title}
              className="w-full h-auto max-h-[500px] object-cover"
              referrerPolicy="no-referrer"
            />
            {article.coverImageCaption && (
              <figcaption className="p-3 bg-white border-t border-[#eae7e7] text-center font-body-sm text-xs text-[#5e5e5e]">
                {article.coverImageCaption}
              </figcaption>
            )}
          </figure>
        </div>
      )}

      {/* 4. MAIN ARTICLE CONTENT BODY */}
      <div className="w-full max-w-4xl mx-auto px-6">
        <div className="bg-white p-8 sm:p-12 border border-[#eae7e7] shadow-xs">
          <MarkdownRenderer content={article.content} />

          {/* Optional Legal Disclaimer */}
          {article.includeDisclaimer && (
            <div className="mt-12 pt-6 border-t border-[#eae7e7] bg-[#fcf9f8] p-5 border-l-2 border-[#8c8c8c]">
              <span className="font-label-caps text-[10px] uppercase text-[#5e5e5e] font-bold block mb-1">
                Legal Disclaimer &amp; Notice
              </span>
              <p className="font-body-sm text-xs text-[#5e5e5e] leading-relaxed">
                The information in this article is provided for general informational purposes only and should not be treated as legal advice tailored to any particular matter. Engaging with this publication does not establish an attorney-client relationship with Eiren Law Office.
              </p>
            </div>
          )}
        </div>

        {/* 5. CONTEXTUAL RESTRAINED WHATSAPP CTA */}
        <section className="mt-10 p-8 sm:p-10 bg-[#f6f3f2] border border-[#eae7e7] relative overflow-hidden">
          <div className="w-16 h-1.5 bg-[#b51c00] absolute top-0 left-0"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="font-label-caps text-label-caps uppercase text-[#5e5e5e] text-xs">
                Direct Practice Engagement
              </span>
              <h2 className="font-headline-md text-xl sm:text-2xl text-[#1b1b1b] font-bold">
                Discuss Your Legal Needs
              </h2>
              <p className="font-body-md text-xs sm:text-sm text-[#5e5e5e] leading-relaxed">
                Have specific commercial or regulatory questions arising from this matter? Connect directly with our duty counsel in Jakarta.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={composeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#b51c00] text-white font-title-md text-xs uppercase tracking-wider hover:bg-[#313030] transition-colors duration-150 cursor-pointer shadow-sm group"
              >
                <span className="material-symbols-outlined text-[18px]">mail</span>
                <span>Email Our Legal Team</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </a>

              <button
                onClick={() => onOpenConsultation(article.category)}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-white border border-[#eae7e7] text-[#1b1b1b] font-title-md text-xs uppercase tracking-wider hover:bg-[#eae7e7] transition-colors duration-150 cursor-pointer"
              >
                <span>Intake Form</span>
              </button>
            </div>
          </div>
        </section>

        {/* 6. RELATED ARTICLES GRID */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 pt-12 border-t border-[#eae7e7]">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <span className="w-3 h-1 bg-[#b51c00] block"></span>
                <h3 className="font-headline-sm text-lg font-bold text-[#1b1b1b]">
                  Related {article.category} Insights
                </h3>
              </div>
              <button
                onClick={onBackToInsights}
                className="text-xs font-label-caps text-[#b51c00] uppercase tracking-wider hover:underline"
              >
                View All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <ArticleCard
                  key={rel.id}
                  article={rel}
                  onSelect={onSelectArticle}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
