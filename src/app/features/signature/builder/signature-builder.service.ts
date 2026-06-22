import { Injectable } from '@angular/core';
import { SignatureData } from '../models/signature.model';

const NAVY = '#0B3B5E';
const TEAL = '#0E7A57';

@Injectable({ providedIn: 'root' })
export class SignatureBuilderService {

  getInitials(name: string): string {
    return name.trim().split(' ').filter(Boolean).slice(0, 2)
      .map(w => w[0].toUpperCase()).join('');
  }

  buildHtml(d: SignatureData): string {
    return this.buildFancyHtml(d);
  }
  
  
  buildStandardHtml(d: SignatureData): string {
    const avatar = d.photoUrl
      ? `<img src="${d.photoUrl}" alt="${d.name}" width="64" height="64"
           style="border-radius:50%;object-fit:cover;display:block;">`
      : `<div style="width:64px;height:64px;border-radius:50%;background:${NAVY};
           display:flex;align-items:center;justify-content:center;
           font-size:22px;font-weight:700;color:#fff;
           font-family:Arial,sans-serif;letter-spacing:1px;">
           ${this.getInitials(d.name) || '?'}
         </div>`;

    const dept = d.department
      ? `<div style="font-size:12px;color:#6B7280;margin-top:1px;">${d.department}</div>`
      : '';

    const phone = d.phone
      ? `<tr><td style="padding:2px 0;">
           <span style="color:#6B7280;font-size:12px;">&#x1F4DE;&nbsp;</span>
           <span style="font-size:12px;color:#374151;">${d.phone}</span>
         </td></tr>`
      : '';

    const email = d.email
      ? `<tr><td style="padding:2px 0;">
           <span style="color:#6B7280;font-size:12px;">&#x2709;&nbsp;</span>
           <a href="mailto:${d.email}"
              style="font-size:12px;color:${TEAL};text-decoration:none;">${d.email}</a>
         </td></tr>`
      : '';

    const site = d.site
      ? `<tr><td style="padding:2px 0;">
           <span style="color:#6B7280;font-size:12px;">&#x1F310;&nbsp;</span>
           <a href="https://${d.site.replace(/^https?:\/\//, '')}"
              style="font-size:12px;color:${TEAL};text-decoration:none;">${d.site}</a>
         </td></tr>`
      : '';

    return `
<table cellpadding="0" cellspacing="0" border="0"
       style="font-family:Arial,Helvetica,sans-serif;">
  <tr>
    <td style="vertical-align:top;padding-right:16px;">
      ${avatar}
    </td>
    <td style="vertical-align:top;border-left:3px solid ${TEAL};padding-left:14px;">
      <div style="font-size:15px;font-weight:700;color:${NAVY};letter-spacing:-0.2px;">
        ${d.name || 'Seu Nome'}
      </div>
      <div style="font-size:12px;color:#374151;margin-top:2px;">
        ${d.position || ''}
      </div>
      ${dept}
      <table cellpadding="0" cellspacing="0" border="0" style="margin-top:8px;">
        ${phone}${email}${site}
      </table>
      <div style="margin-top:10px;padding-top:8px;border-top:1px solid #E5E7EB;">
        <span style="font-size:13px;font-weight:700;color:${NAVY};letter-spacing:0.5px;">UKAM</span>
        <span style="font-size:13px;font-weight:400;color:${TEAL};letter-spacing:0.5px;">SOFT</span>
        <span style="font-size:10px;color:#9CA3AF;margin-left:6px;font-style:italic;">
          Infraestrutura de crédito
        </span>
      </div>
    </td>
  </tr>
</table>`.trim();
  }

  buildFancyHtml(d: SignatureData): string {
    const avatar = d.photoUrl
      ? `<img
          src="${d.photoUrl}"
          alt="${d.name}"
          width="64"
          height="64"
          style="
            width:64px;
            height:64px;
            border-radius:50%;
            object-fit:cover;
            border:3px solid white;
            display:block;
          "
        >`
      : `<div style="
          width:64px;
          height:64px;
          border-radius:50%;
          background:${NAVY};
          color:white;
          font-size:22px;
          font-weight:700;
          line-height:64px;
          text-align:center;
          border:3px solid white;
        ">
          ${this.getInitials(d.name) || '?'}
        </div>`;

    const dept = d.department
      ? `<div style="
          font-size:12px;
          color:#BBBBBB;
          margin-bottom:12px;
        ">
          ${d.department}
        </div>`
      : '';

    const phone = d.phone
      ? `<div style="
          font-size:12px;
          color:white;
          line-height:18px;
        ">
          📞 ${d.phone}
        </div>`
      : '';

    const email = d.email
      ? `<div style="
          font-size:12px;
          line-height:18px;
        ">
          <a
            href="mailto:${d.email}"
            style="
              color:white;
              text-decoration:none;
            "
          >
            ✉ ${d.email}
          </a>
        </div>`
      : '';

    const site = d.site
      ? `<div style="
          font-size:12px;
          line-height:18px;
        ">
          <a
            href="https://${d.site.replace(/^https?:\/\//, '')}"
            style="
              color:white;
              text-decoration:none;
            "
          >
            🌐 ${d.site}
          </a>
        </div>`
      : '';

    return `
  <div
    style="
      position:relative;
      width:382px;
      height:160px;
      overflow:hidden;
      background:aquamarine;
      font-family:Arial,Helvetica,sans-serif;
    "
  >

    <img
      src="/black_slide.png"
      style="
        position:absolute;
        height:160px;
        right:0;
        transform:translateX(-38%);
      "
    >

    <img
      src="/white_slide.png"
      style="
        position:absolute;
        height:160px;
        left:0;
        transform:translateX(62%);
      "
    >

    <table
      cellpadding="0"
      cellspacing="0"
      border="0"
      style="
        position:absolute;
        inset:0;
        width:100%;
        height:100%;
        z-index:10;
        padding:16px 20px;
      "
    >
      <tr>
        <td
          style="
            width:65%;
            vertical-align:middle;
          "
        >
          <div style="
            font-size:19px;
            font-weight:700;
            color:#EEEEEE;
            margin-bottom:2px;
          ">
            ${d.name || 'Seu Nome'}
          </div>

          <div style="
            font-size:13px;
            color:#BBBBBB;
            margin-bottom:4px;
          ">
            ${d.position || ''}
          </div>

          ${dept}

          ${phone}
          ${email}
          ${site}
        </td>

        <td
          style="
            width:35%;
            text-align:center;
            vertical-align:middle;
          "
        >
          ${avatar}

          <div style="margin-top:10px;">
            <span style="
              color:#0E7A57;
              font-weight:700;
              font-size:14px;
            ">
              UKAM
            </span>

            <span style="
              color:#0B3B5E;
              font-size:14px;
            ">
              SOFT
            </span>
          </div>

          <div style="
            font-size:10px;
            color:#666666;
            margin-top:2px;
          ">
            Infraestrutura de crédito
          </div>
        </td>
      </tr>
    </table>
  </div>
  `.trim();
  }

  async copyAsRichHtml(html: string): Promise<void> {
    const blob = new Blob([html], { type: 'text/html' });

    const item = new ClipboardItem({
      'text/html': blob,
      'text/plain': new Blob([html], { type: 'text/plain' }),
    });

    await navigator.clipboard.write([item]);

    console.log('write finished');

    try {
      const items = await navigator.clipboard.read();
      console.log(items);
    } catch (e) {
      console.error('read failed', e);
    }
  }

  downloadHtml(html: string, filename = 'ukamsoft-assinatura.html'): void {
    const blob = new Blob(
      [`<!DOCTYPE html><html><body>${html}</body></html>`],
      { type: 'text/html' }
    );
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  }
}
