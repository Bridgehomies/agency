/**
 * lib/email.ts
 *
 * Updated to use Resend SDK.
 */

import { Resend } from "resend";
import type { GuestSubmission } from "@/app/api/blog/submit/route";

// Initialize Resend with your API Key
const resend = new Resend(process.env.RESEND_API_KEY);

// Configuration
const FROM = `Bridge Homies Editorial <onboarding@resend.dev>`; 
// Note: Once you verify your domain in Resend, change this to:
// "Bridge Homies Editorial <hello@bridgehomies.com>"

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";
const SITE_URL = process.env.SITE_URL || "https://bridgehomies.com";

// ─── Admin notification (new submission) ─────────────────────────────────────

export async function sendSubmissionNotification(sub: GuestSubmission) {
  const reviewUrl = `${SITE_URL}/admin/blog/submissions`;

  await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `📝 New guest post submission: "${sub.title}"`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; color: #111;">
        <h2 style="font-size: 20px; margin-bottom: 4px;">New submission to review</h2>
        <p style="color: #888; font-size: 13px; margin-top: 0;">${new Date(sub.submittedAt).toLocaleString()}</p>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin: 20px 0;">
          <tr><td style="padding: 6px 12px 6px 0; color: #666; white-space: nowrap;">Author</td><td><strong>${sub.name}</strong> — ${sub.occupation}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0; color: #666;">Email</td><td>${sub.email}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0; color: #666;">Title</td><td><strong>${sub.title}</strong></td></tr>
          <tr><td style="padding: 6px 12px 6px 0; color: #666;">Category</td><td>${sub.category}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0; color: #666;">Tags</td><td>${sub.tags.join(", ") || "—"}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0; color: #666; vertical-align: top;">Excerpt</td><td>${sub.excerpt}</td></tr>
        </table>

        <a href="${reviewUrl}" style="display: inline-block; background: #111; color: #f6c27a; padding: 12px 24px; border-radius: 100px; font-size: 14px; font-weight: 600; text-decoration: none; margin-top: 8px;">
          Review in Admin Panel →
        </a>

        <p style="margin-top: 24px; font-size: 12px; color: #aaa;">
          Submission ID: ${sub.id}
        </p>
      </div>
    `,
  });
}

// ─── Submitter: approval ──────────────────────────────────────────────────────

export async function sendApprovalEmail(sub: GuestSubmission) {
  const postUrl = `${SITE_URL}/blog/${sub.slug}`;

  await resend.emails.send({
    from: FROM,
    to: sub.email,
    subject: `🎉 Your article "${sub.title}" has been published!`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; color: #111;">
        <h2 style="font-size: 22px;">Congratulations, ${sub.name}!</h2>
        <p style="font-size: 15px; line-height: 1.7; color: #444;">
          We're thrilled to let you know that your article <strong>"${sub.title}"</strong> has been 
          approved and is now live on the Bridge Homies blog.
        </p>

        <a href="${postUrl}" style="display: inline-block; background: #f6c27a; color: #111; padding: 12px 24px; border-radius: 100px; font-size: 14px; font-weight: 700; text-decoration: none; margin: 16px 0;">
          Read your published article →
        </a>

        <p style="font-size: 14px; line-height: 1.7; color: #555; margin-top: 20px;">
          Don't forget to share it with your audience! Tag us or link back — we'd love to amplify your post.
        </p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />

        <p style="font-size: 12px; color: #aaa;">
          Have questions? Reply to this email and we'll get back to you.
        </p>
      </div>
    `,
  });
}

// ─── Submitter: rejection ─────────────────────────────────────────────────────

export async function sendRejectionEmail(sub: GuestSubmission, notes?: string) {
  await resend.emails.send({
    from: FROM,
    to: sub.email,
    subject: `An update on your Bridge Homies submission`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; color: #111;">
        <h2 style="font-size: 22px;">Hi ${sub.name},</h2>
        <p style="font-size: 15px; line-height: 1.7; color: #444;">
          Thank you for taking the time to submit <strong>"${sub.title}"</strong> to Bridge Homies. 
          After review, we won't be moving forward with this article at this time.
        </p>

        ${
          notes
            ? `<div style="background: #faf7f2; border-left: 4px solid #f6c27a; padding: 14px 18px; border-radius: 8px; font-size: 14px; color: #555; margin: 20px 0;">
                <strong>Editorial feedback:</strong><br/>${notes}
               </div>`
            : ""
        }

        <p style="font-size: 14px; line-height: 1.7; color: #555;">
          We appreciate your interest and encourage you to submit again in the future. 
          Feel free to refine your article and resubmit — we'd love to hear from you again.
        </p>

        <a href="${SITE_URL}/blog/submit" style="display: inline-block; background: #111; color: #f5efe5; padding: 12px 24px; border-radius: 100px; font-size: 14px; font-weight: 600; text-decoration: none; margin-top: 16px;">
          Submit another article →
        </a>

        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="font-size: 12px; color: #aaa;">Bridge Homies Editorial Team</p>
      </div>
    `,
  });
}