import React from 'react';
import { Article } from '../../types';
import MarkdownRenderer from '../MarkdownRenderer';

interface ArticlePreviewModalProps {
  article: Partial<Article> | null;
  isOpen: boolean;
  onClose: () => void;
  onPublish?: () => void;
}

export default function ArticlePreviewModal({
  article,
  isOpen,
  onClose,
  onPublish,
}: ArticlePreviewModalProps) {
  if (!isOpen || !article) return null;

  const formattedDate = new Date(article.publishedAt || article.createdAt || Date.now()).toLocaleDateString(
    'en-GB',
    { day: 'numeric', month: 'long', year: 'numeric' }
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#fcf9f8] w-full max-w-4xl max-h-[92vh] flex flex-col border border-[#eae7e7] shadow-2xl relative my-auto">
        {/* Modal Top Bar */}
        <div className="bg-[#1b1b1b] text-white px-6 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#b51c00]"></span>
            <span className="font-label-caps uppercase text-xs tracking-wider font-bold">
              Draft Layout Preview
            </span>
            <span className="text-[10px] bg-[#313030] text-[#e5e2e1] px-2 py-0.5 uppercase">
              Status: {article.status || 'draft'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {onPublish && article.status !== 'published' && (
              <button
                onClick={onPublish}
                className="px-3.5 py-1.5 bg-[#b51c00] hover:bg-[#ff4d29] text-white text-xs font-label-caps uppercase tracking-wider transition-colors cursor-pointer"
              >
                Publish Now
              </button>
            )}
            <button
              onClick={onClose}
              className="text-[#e5e2e1] hover:text-white p-1 cursor-pointer transition-colors"
              aria-label="Close Preview"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Modal Body: Actual Article Layout */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#fcf9f8]">
          <div className="bg-white p-6 sm:p-10 border border-[#eae7e7] space-y-6">
            {/* Meta Header */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-4 h-1 bg-[#b51c00] block"></span>
                <span className="font-label-caps text-[#b51c00] text-xs font-bold uppercase">
                  {article.category || 'General Legal Insights'}
                </span>
                <span className="text-[#8c8c8c]">·</span>
                <span className="font-label-caps text-xs text-[#5e5e5e] uppercase">
                  {formattedDate}
                </span>
                <span className="text-[#8c8c8c]">·</span>
                <span className="font-label-caps text-xs text-[#5e5e5e] uppercase">
                  {article.readingTimeMinutes || 4} min read
                </span>
              </div>

              <h1 className="font-headline-lg text-2xl sm:text-3xl font-bold text-[#1b1b1b] leading-tight">
                {article.title || 'Untitled Article'}
              </h1>

              <div className="text-xs text-[#5e5e5e] font-label-caps uppercase pt-1">
                Author: <strong className="text-[#1b1b1b]">{article.authorName || 'Eiren Law Office'}</strong>
              </div>

              {article.excerpt && (
                <p className="font-body-md text-sm text-[#5e5e5e] italic border-l-2 border-[#b51c00] pl-3 py-1">
                  {article.excerpt}
                </p>
              )}
            </div>

            {/* Featured Image */}
            {article.coverImageUrl && (
              <div className="my-6">
                <img
                  src={article.coverImageUrl}
                  alt={article.coverImageAlt || article.title}
                  className="w-full max-h-[360px] object-cover border border-[#eae7e7]"
                />
                {article.coverImageCaption && (
                  <p className="text-center text-xs text-[#5e5e5e] italic mt-2">
                    {article.coverImageCaption}
                  </p>
                )}
              </div>
            )}

            {/* Content */}
            <div className="pt-4 border-t border-[#eae7e7]">
              <MarkdownRenderer content={article.content || ''} />
            </div>

            {/* Disclaimer */}
            {article.includeDisclaimer && (
              <div className="mt-8 p-4 bg-[#f6f3f2] border-l-2 border-[#8c8c8c] text-xs text-[#5e5e5e] leading-relaxed">
                <strong className="block text-[#1b1b1b] uppercase text-[10px] mb-0.5">
                  Legal Disclaimer
                </strong>
                The information in this article is provided for general informational purposes only and should not be treated as legal advice tailored to any particular matter.
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-white border-t border-[#eae7e7] px-6 py-3 flex justify-between items-center text-xs font-label-caps text-[#5e5e5e] uppercase">
          <span>URL Slug: /{article.slug || 'slug'}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#f0eded] hover:bg-[#1b1b1b] hover:text-white text-[#1b1b1b] transition-colors cursor-pointer"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}
