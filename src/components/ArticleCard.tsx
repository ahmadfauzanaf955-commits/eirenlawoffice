import React from 'react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
}

export default function ArticleCard({ article, onSelect }: ArticleCardProps) {
  // Format publication date
  const formattedDate = React.useMemo(() => {
    if (!article.publishedAt && !article.createdAt) return 'Recent';
    try {
      const d = new Date(article.publishedAt || article.createdAt);
      return d.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return 'Recent';
    }
  }, [article.publishedAt, article.createdAt]);

  return (
    <article
      onClick={() => onSelect(article)}
      className="group flex flex-col justify-between bg-white border border-[#eae7e7] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden relative"
    >
      {/* Top red accent line on hover */}
      <div className="w-full h-1 bg-[#f0eded] absolute top-0 left-0 group-hover:bg-[#b51c00] transition-colors z-10"></div>

      <div>
        {/* Cover Image Thumbnail */}
        {article.coverImageUrl && (
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#f0eded] border-b border-[#eae7e7]">
            <img
              src={article.coverImageUrl}
              alt={article.coverImageAlt || article.title}
              className="w-full h-full object-cover grayscale contrast-115 group-hover:grayscale-0 group-hover:scale-102 transition-all duration-300"
              referrerPolicy="no-referrer"
            />
            {/* Category tag on image */}
            <div className="absolute top-3 left-3 bg-[#1b1b1b]/90 backdrop-blur-xs text-white text-[10px] font-label-caps uppercase tracking-wider px-2.5 py-1">
              {article.category}
            </div>
          </div>
        )}

        {/* Card Body */}
        <div className="p-6">
          {!article.coverImageUrl && (
            <div className="mb-3">
              <span className="inline-block bg-[#f0eded] text-[#b51c00] text-[10px] font-label-caps uppercase tracking-wider px-2.5 py-1 font-bold">
                {article.category}
              </span>
            </div>
          )}

          {/* Meta Info: Date & Reading Time */}
          <div className="flex items-center gap-3 text-xs text-[#5e5e5e] mb-2.5 font-label-caps uppercase tracking-wider text-[11px]">
            <span>{formattedDate}</span>
            <span>·</span>
            <span>{article.readingTimeMinutes || 4} min read</span>
          </div>

          {/* Title */}
          <h3 className="font-headline-sm text-lg font-bold text-[#1b1b1b] group-hover:text-[#b51c00] transition-colors leading-snug line-clamp-2">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="font-body-sm text-[#5e5e5e] text-xs leading-relaxed mt-2.5 line-clamp-3">
            {article.excerpt}
          </p>
        </div>
      </div>

      {/* Card Footer: Read Action */}
      <div className="px-6 pb-6 pt-2">
        <div className="pt-4 border-t border-[#eae7e7] flex items-center justify-between text-[#b51c00] font-title-md text-xs uppercase tracking-wider group-hover:text-[#1b1b1b] transition-colors">
          <span>Read Article</span>
          <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </div>
      </div>
    </article>
  );
}
