import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const DATA_DIR = path.resolve('./data');
const ARTICLES_FILE = path.join(DATA_DIR, 'articles.json');
const UPLOADS_DIR = path.resolve('./uploads');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Ensure articles.json exists
if (!fs.existsSync(ARTICLES_FILE)) {
  fs.writeFileSync(ARTICLES_FILE, '[]', 'utf-8');
}

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads directory
app.use('/uploads', express.static(UPLOADS_DIR));

// Simple In-Memory Session Store for Admin Tokens
interface Session {
  userId: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
  expiresAt: number;
}
const activeSessions = new Map<string, Session>();

// Helper: Read and Write Articles
interface StoredArticle {
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
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  scheduledAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  featured?: boolean;
  readingTimeMinutes: number;
  reviewerName?: string;
  editorialStatus?: 'pending' | 'approved' | 'revisions_required';
  internalReviewNotes?: string;
  includeDisclaimer?: boolean;
  createdBy?: string;
  updatedBy?: string;
}

function readArticles(): StoredArticle[] {
  try {
    const raw = fs.readFileSync(ARTICLES_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading articles file:', err);
    return [];
  }
}

function writeArticles(articles: StoredArticle[]) {
  try {
    // Atomic write via temp file
    const tempPath = `${ARTICLES_FILE}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(articles, null, 2), 'utf-8');
    fs.renameSync(tempPath, ARTICLES_FILE);
  } catch (err) {
    console.error('Error writing articles file:', err);
    throw new Error('Failed to save article data');
  }
}

function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = (text || '').trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Authentication Middleware
function authenticateAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: missing authorization token' });
    return;
  }
  const token = authHeader.substring(7).trim();
  const session = activeSessions.get(token);
  if (!session || session.expiresAt < Date.now()) {
    if (session) activeSessions.delete(token);
    res.status(401).json({ error: 'Unauthorized: invalid or expired session' });
    return;
  }
  // Slide session window (extend by 24h)
  session.expiresAt = Date.now() + 24 * 60 * 60 * 1000;
  (req as any).adminUser = session;
  next();
}

/* ============================================================
   AUTH ENDPOINTS
   ============================================================ */

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@eirenlaw.com').toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'EirenAdmin2025!';

app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }

  if (email.trim().toLowerCase() !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: 'Invalid email address or password' });
    return;
  }

  // Generate secure session token
  const token = crypto.randomBytes(32).toString('hex');
  const session: Session = {
    userId: 'usr_admin_01',
    email: ADMIN_EMAIL,
    name: 'Eiren Office Administrator',
    role: 'admin',
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  };
  activeSessions.set(token, session);

  res.json({
    token,
    user: {
      id: session.userId,
      email: session.email,
      name: session.name,
      role: session.role,
    },
  });
});

app.get('/api/auth/me', authenticateAdmin, (req: Request, res: Response) => {
  const session = (req as any).adminUser as Session;
  res.json({
    user: {
      id: session.userId,
      email: session.email,
      name: session.name,
      role: session.role,
    },
  });
});

app.post('/api/auth/logout', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    activeSessions.delete(token);
  }
  res.json({ message: 'Logged out successfully' });
});

/* ============================================================
   PUBLIC ARTICLES ENDPOINTS
   ============================================================ */

// GET /api/articles — List published articles with filtering & pagination
app.get('/api/articles', (req: Request, res: Response) => {
  const { category, search, page = '1', limit = '10' } = req.query;
  const articles = readArticles();

  // Public visitors only see published articles whose publish date has passed
  const now = new Date();
  let published = articles.filter((a) => {
    if (a.status !== 'published') return false;
    if (a.publishedAt) {
      const pubDate = new Date(a.publishedAt);
      if (pubDate > now) return false;
    }
    return true;
  });

  // Category filter
  if (category && typeof category === 'string' && category !== 'All' && category !== 'All Insights') {
    published = published.filter(
      (a) => a.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Search filter
  if (search && typeof search === 'string') {
    const q = search.toLowerCase().trim();
    published = published.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q)
    );
  }

  // Sort by publishedAt descending
  published.sort((a, b) => {
    const dateA = new Date(a.publishedAt || a.createdAt).getTime();
    const dateB = new Date(b.publishedAt || b.createdAt).getTime();
    return dateB - dateA;
  });

  const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
  const pageSize = Math.max(1, parseInt(limit as string, 10) || 10);
  const total = published.length;
  const totalPages = Math.ceil(total / pageSize);
  const paginated = published.slice((pageNum - 1) * pageSize, pageNum * pageSize);

  // Strip internal private notes for public
  const publicList = paginated.map((a) => {
    const { internalReviewNotes, ...publicSafe } = a;
    return publicSafe;
  });

  // Available unique categories
  const allCategories = Array.from(
    new Set(articles.filter((a) => a.status === 'published').map((a) => a.category))
  );

  res.json({
    articles: publicList,
    total,
    page: pageNum,
    pageSize,
    totalPages,
    categories: allCategories,
  });
});

// GET /api/articles/:slug — Public single article view
app.get('/api/articles/:slug', (req: Request, res: Response) => {
  const { slug } = req.params;
  const articles = readArticles();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    res.status(404).json({ error: 'Article not found' });
    return;
  }

  // If not published, check if admin is previewing with token
  if (article.status !== 'published') {
    const authHeader = req.headers.authorization;
    let isAdmin = false;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7).trim();
      const session = activeSessions.get(token);
      if (session && session.expiresAt >= Date.now()) {
        isAdmin = true;
      }
    }
    if (!isAdmin) {
      res.status(404).json({ error: 'Article not found or not published' });
      return;
    }
  }

  // Fetch related articles (same category, published, excluding current)
  const related = articles
    .filter(
      (a) =>
        a.id !== article.id &&
        a.status === 'published' &&
        a.category === article.category
    )
    .slice(0, 3)
    .map((a) => {
      const { internalReviewNotes, content, ...clean } = a;
      return clean;
    });

  const { internalReviewNotes, ...publicSafe } = article;
  res.json({
    article: publicSafe,
    relatedArticles: related,
  });
});

/* ============================================================
   ADMIN CMS PROTECTED ENDPOINTS
   ============================================================ */

// GET /api/admin/articles — All articles (with stats)
app.get('/api/admin/articles', authenticateAdmin, (req: Request, res: Response) => {
  const { status, search } = req.query;
  let articles = readArticles();

  // Calculate statistics
  const stats = {
    totalPublished: articles.filter((a) => a.status === 'published').length,
    totalDraft: articles.filter((a) => a.status === 'draft').length,
    totalScheduled: articles.filter((a) => a.status === 'scheduled').length,
    totalArchived: articles.filter((a) => a.status === 'archived').length,
    totalCount: articles.length,
  };

  if (status && typeof status === 'string' && status !== 'all') {
    articles = articles.filter((a) => a.status === status);
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase().trim();
    articles = articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.authorName.toLowerCase().includes(q)
    );
  }

  // Sort by updatedAt descending
  articles.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  res.json({
    articles,
    stats,
  });
});

// GET /api/admin/articles/:id — Single article by ID for editing
app.get('/api/admin/articles/:id', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const articles = readArticles();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    res.status(404).json({ error: 'Article not found' });
    return;
  }

  res.json({ article });
});

// POST /api/admin/articles — Create new article
app.post('/api/admin/articles', authenticateAdmin, (req: Request, res: Response) => {
  const {
    title,
    slug,
    category,
    excerpt,
    content,
    coverImageUrl,
    coverImageAlt,
    coverImageCaption,
    authorName,
    status = 'draft',
    scheduledAt,
    seoTitle,
    seoDescription,
    featured = false,
    reviewerName,
    editorialStatus = 'pending',
    internalReviewNotes,
    includeDisclaimer = true,
  } = req.body;

  if (!title || !title.trim()) {
    res.status(400).json({ error: 'Article title is required' });
    return;
  }

  if (!content || !content.trim()) {
    res.status(400).json({ error: 'Article content is required' });
    return;
  }

  const articles = readArticles();

  // Validate or compute slug
  let targetSlug = (slug || generateSlug(title)).trim();
  if (!targetSlug) {
    targetSlug = `article-${Date.now()}`;
  }

  // Check slug uniqueness
  if (articles.some((a) => a.slug === targetSlug)) {
    targetSlug = `${targetSlug}-${Date.now().toString().slice(-4)}`;
  }

  const nowISO = new Date().toISOString();
  const newArticle: StoredArticle = {
    id: `art-${crypto.randomUUID().slice(0, 8)}`,
    title: title.trim(),
    slug: targetSlug,
    category: category || 'General Legal Insights',
    excerpt: excerpt ? excerpt.trim() : title.trim().slice(0, 160),
    content: content.trim(),
    coverImageUrl: coverImageUrl || 'https://i.imgur.com/7ILPegs.jpeg',
    coverImageAlt: coverImageAlt || title.trim(),
    coverImageCaption: coverImageCaption || '',
    authorName: authorName ? authorName.trim() : 'Eiren Law Office Editorial Team',
    status: ['draft', 'published', 'scheduled', 'archived'].includes(status)
      ? status
      : 'draft',
    createdAt: nowISO,
    updatedAt: nowISO,
    publishedAt: status === 'published' ? nowISO : undefined,
    scheduledAt: status === 'scheduled' && scheduledAt ? scheduledAt : undefined,
    seoTitle: seoTitle ? seoTitle.trim() : `${title.trim()} | Eiren Law Office`,
    seoDescription: seoDescription ? seoDescription.trim() : excerpt || title.trim(),
    featured: Boolean(featured),
    readingTimeMinutes: calculateReadingTime(content),
    reviewerName: reviewerName ? reviewerName.trim() : '',
    editorialStatus: editorialStatus || 'pending',
    internalReviewNotes: internalReviewNotes || '',
    includeDisclaimer: includeDisclaimer !== false,
    createdBy: (req as any).adminUser?.name || 'Administrator',
  };

  articles.push(newArticle);
  writeArticles(articles);

  res.status(201).json({
    message: 'Article created successfully',
    article: newArticle,
  });
});

// PUT /api/admin/articles/:id — Update existing article
app.put('/api/admin/articles/:id', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const articles = readArticles();
  const index = articles.findIndex((a) => a.id === id);

  if (index === -1) {
    res.status(404).json({ error: 'Article not found' });
    return;
  }

  const existing = articles[index];
  const {
    title,
    slug,
    category,
    excerpt,
    content,
    coverImageUrl,
    coverImageAlt,
    coverImageCaption,
    authorName,
    status,
    scheduledAt,
    seoTitle,
    seoDescription,
    featured,
    reviewerName,
    editorialStatus,
    internalReviewNotes,
    includeDisclaimer,
  } = req.body;

  if (title !== undefined && !title.trim()) {
    res.status(400).json({ error: 'Article title cannot be empty' });
    return;
  }

  // Slug collision check
  let targetSlug = existing.slug;
  if (slug && slug.trim() !== existing.slug) {
    targetSlug = slug.trim();
    if (articles.some((a) => a.id !== id && a.slug === targetSlug)) {
      res.status(400).json({ error: 'URL slug is already in use by another article' });
      return;
    }
  }

  const nowISO = new Date().toISOString();
  let publishedAt = existing.publishedAt;
  if (status === 'published' && !existing.publishedAt) {
    publishedAt = nowISO;
  }

  const updated: StoredArticle = {
    ...existing,
    title: title !== undefined ? title.trim() : existing.title,
    slug: targetSlug,
    category: category !== undefined ? category : existing.category,
    excerpt: excerpt !== undefined ? excerpt.trim() : existing.excerpt,
    content: content !== undefined ? content.trim() : existing.content,
    coverImageUrl: coverImageUrl !== undefined ? coverImageUrl : existing.coverImageUrl,
    coverImageAlt: coverImageAlt !== undefined ? coverImageAlt : existing.coverImageAlt,
    coverImageCaption: coverImageCaption !== undefined ? coverImageCaption : existing.coverImageCaption,
    authorName: authorName !== undefined ? authorName.trim() : existing.authorName,
    status: status !== undefined ? status : existing.status,
    publishedAt,
    scheduledAt: status === 'scheduled' ? scheduledAt : existing.scheduledAt,
    seoTitle: seoTitle !== undefined ? seoTitle.trim() : existing.seoTitle,
    seoDescription: seoDescription !== undefined ? seoDescription.trim() : existing.seoDescription,
    featured: featured !== undefined ? Boolean(featured) : existing.featured,
    readingTimeMinutes: content ? calculateReadingTime(content) : existing.readingTimeMinutes,
    reviewerName: reviewerName !== undefined ? reviewerName.trim() : existing.reviewerName,
    editorialStatus: editorialStatus !== undefined ? editorialStatus : existing.editorialStatus,
    internalReviewNotes: internalReviewNotes !== undefined ? internalReviewNotes : existing.internalReviewNotes,
    includeDisclaimer: includeDisclaimer !== undefined ? includeDisclaimer : existing.includeDisclaimer,
    updatedAt: nowISO,
    updatedBy: (req as any).adminUser?.name || 'Administrator',
  };

  articles[index] = updated;
  writeArticles(articles);

  res.json({
    message: 'Article updated successfully',
    article: updated,
  });
});

// PATCH /api/admin/articles/:id/status — Quick status update
app.patch('/api/admin/articles/:id/status', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['draft', 'published', 'scheduled', 'archived'].includes(status)) {
    res.status(400).json({ error: 'Invalid article status' });
    return;
  }

  const articles = readArticles();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    res.status(404).json({ error: 'Article not found' });
    return;
  }

  const nowISO = new Date().toISOString();
  article.status = status;
  article.updatedAt = nowISO;
  if (status === 'published' && !article.publishedAt) {
    article.publishedAt = nowISO;
  }

  writeArticles(articles);
  res.json({
    message: `Article status updated to ${status}`,
    article,
  });
});

// DELETE /api/admin/articles/:id — Delete article
app.delete('/api/admin/articles/:id', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  let articles = readArticles();
  const exists = articles.some((a) => a.id === id);

  if (!exists) {
    res.status(404).json({ error: 'Article not found' });
    return;
  }

  articles = articles.filter((a) => a.id !== id);
  writeArticles(articles);

  res.json({ message: 'Article deleted successfully' });
});

// POST /api/admin/upload — Secure base64 image upload
app.post('/api/admin/upload', authenticateAdmin, (req: Request, res: Response) => {
  try {
    const { base64Data, filename } = req.body;
    if (!base64Data || typeof base64Data !== 'string') {
      res.status(400).json({ error: 'Invalid image data' });
      return;
    }

    // Expecting data:image/png;base64,... or raw base64
    const matches = base64Data.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
    let ext = 'jpg';
    let buffer: Buffer;

    if (matches && matches.length === 3) {
      ext = matches[1].toLowerCase() === 'jpeg' ? 'jpg' : matches[1].toLowerCase();
      buffer = Buffer.from(matches[2], 'base64');
    } else {
      buffer = Buffer.from(base64Data, 'base64');
    }

    // Enforce 5MB limit
    if (buffer.length > 5 * 1024 * 1024) {
      res.status(400).json({ error: 'Image exceeds 5MB size limit' });
      return;
    }

    // Allowed extensions
    if (!['jpg', 'jpeg', 'png', 'webp', 'svg'].includes(ext)) {
      ext = 'jpg';
    }

    const uniqueName = `cover_${Date.now()}_${crypto.randomBytes(6).toString('hex')}.${ext}`;
    const targetPath = path.join(UPLOADS_DIR, uniqueName);
    fs.writeFileSync(targetPath, buffer);

    const publicUrl = `/uploads/${uniqueName}`;
    res.json({
      url: publicUrl,
      filename: uniqueName,
      size: buffer.length,
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Failed to process and store image' });
  }
});

/* ============================================================
   VITE & STATIC ASSET INTEGRATION
   ============================================================ */

async function start() {
  const httpServer = http.createServer(app);

  if (process.env.NODE_ENV === 'production' && fs.existsSync(path.resolve('./dist'))) {
    app.use(express.static(path.resolve('./dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve('./dist/index.html'));
    });
  } else {
    // Development mode: attach Vite as middleware sharing the HTTP server
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR === 'true' ? false : { server: httpServer },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`[Eiren Law Office] Server running at http://0.0.0.0:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
