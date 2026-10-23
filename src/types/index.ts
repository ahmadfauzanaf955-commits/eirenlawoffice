export type NavigationTab = 
  | 'home' 
  | 'about-us' 
  | 'practice-areas' 
  | 'industries' 
  | 'our-approach' 
  | 'insights'
  | 'contact';

export interface Partner {
  id: string;
  name: string;
  title: string;
  practiceGroup: string;
  image: string;
  initials: string;
  bio: string;
  specialties: string[];
  education?: string;
  barAdmission?: string;
}

export interface PracticeArea {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  actionText: string;
  scopes: { title: string; desc: string }[];
}

export interface InquiryFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone?: string;
  designation?: string;
  practiceDomain: string;
  matterBrief: string;
}

// Article Management System (CMS) Data Types
export type ArticleStatus = 'draft' | 'published' | 'scheduled' | 'archived';
export type EditorialReviewStatus = 'pending' | 'approved' | 'revisions_required';

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  coverImageAlt?: string;
  coverImageCaption?: string;
  authorName: string;
  status: ArticleStatus;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  scheduledAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  featured?: boolean;
  readingTimeMinutes: number;
  
  // Editorial Quality Control
  reviewerName?: string;
  editorialStatus?: EditorialReviewStatus;
  internalReviewNotes?: string;
  includeDisclaimer?: boolean;
  createdBy?: string;
  updatedBy?: string;
}

export interface ArticleFormData {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  coverImageAlt?: string;
  coverImageCaption?: string;
  authorName: string;
  status: ArticleStatus;
  scheduledAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  featured?: boolean;
  reviewerName?: string;
  editorialStatus?: EditorialReviewStatus;
  internalReviewNotes?: string;
  includeDisclaimer?: boolean;
}

export interface ArticleStats {
  totalPublished: number;
  totalDraft: number;
  totalScheduled: number;
  totalArchived: number;
  totalCount: number;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
}

export interface AuthResponse {
  token: string;
  user: AdminUser;
}
