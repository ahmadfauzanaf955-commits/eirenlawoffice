/**
 * Central Email and Contact Integration Utility
 * Eiren Law Office
 */

export const OFFICIAL_EMAIL = 'Eirenlawoffice@gmail.com';

export interface EmailParams {
  subject: string;
  body?: string;
}

/**
 * Generates direct Gmail Compose URL with pre-filled recipient, subject, and body.
 */
export function createGmailComposeUrl(subject: string, body: string = ''): string {
  const params = new URLSearchParams();
  params.set('view', 'cm');
  params.set('fs', '1');
  params.set('to', OFFICIAL_EMAIL);
  params.set('su', subject);
  if (body) {
    params.set('body', body);
  }
  return `https://mail.google.com/mail/?${params.toString().replace(/\+/g, '%20')}`;
}

/**
 * Generates standard mailto URL fallback.
 */
export function createMailtoUrl(subject: string, body: string = ''): string {
  const params = new URLSearchParams();
  params.set('subject', subject);
  if (body) {
    params.set('body', body);
  }
  return `mailto:${OFFICIAL_EMAIL}?${params.toString().replace(/\+/g, '%20')}`;
}

/**
 * Standard pre-formatted inquiries by practice domain
 */
export const INQUIRY_TEMPLATES = {
  general: {
    subject: 'General Inquiry — Eiren Law Office',
    body: `Hello Eiren Law Office,\n\nI would like to make an official inquiry regarding your legal services.\n\nPlease let me know the appropriate next steps.\n\nThank you.`,
  },
  corporate: {
    subject: 'Corporate & Commercial Legal Inquiry',
    body: `Hello Eiren Law Office,\n\nI would like to consult regarding Corporate & Commercial legal services.\n\nPlease let me know the appropriate next steps for an initial discussion.\n\nThank you.`,
  },
  transactions: {
    subject: 'Transaction Advisory Inquiry',
    body: `Hello Eiren Law Office,\n\nI would like to consult regarding Transactions & Investment / M&A legal advisory.\n\nPlease let me know the appropriate next steps for an initial discussion.\n\nThank you.`,
  },
  regulatory: {
    subject: 'Regulatory & Compliance Inquiry',
    body: `Hello Eiren Law Office,\n\nI would like to consult regarding Regulatory & Compliance matters in Indonesia.\n\nPlease let me know the appropriate next steps for an initial discussion.\n\nThank you.`,
  },
  disputes: {
    subject: 'Disputes & Risk Inquiry',
    body: `Hello Eiren Law Office,\n\nI would like to consult regarding Commercial Disputes & Risk Mitigation.\n\nPlease let me know the appropriate next steps for an initial discussion.\n\nThank you.`,
  },
  krisna: {
    subject: 'Legal Counsel Inquiry — Krisna Murti Ardianto',
    body: `Hello Eiren Law Office,\n\nI would like to connect with Managing Partner Krisna Murti Ardianto regarding legal counsel.\n\nThank you.`,
  },
  asrifan: {
    subject: 'Legal Counsel Inquiry — Asrifan Satria Hawinhuda',
    body: `Hello Eiren Law Office,\n\nI would like to connect with Senior Partner Asrifan Satria Hawinhuda regarding legal counsel.\n\nThank you.`,
  },
};
