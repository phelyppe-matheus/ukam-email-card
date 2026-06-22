import { Injectable } from '@angular/core';
import { SignatureData } from '../models/signature.model';


const NAVY = '#0B3B5E';
const TEAL = '#0E7A57';
const CARD_BG =
  'https://github.com/phelyppe-matheus/ukam-email-card/blob/master/src/browser/signatures/card-bg.png?raw=true';
const BASE_FONT = `
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
`;

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
       style="${BASE_FONT}">
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
      ? `<img src="${d.photoUrl}"
          width="64"
          height="64"
          style="
            width:64px;
            height:64px;
            border-radius:50%;
            display:block;
            object-fit:cover;
            border:3px solid #ffffff;
          " />`
      : `<div style="
          width:64px;
          height:64px;
          border-radius:50%;
          background:${NAVY};
          color:#ffffff;
          font-size:20px;
          font-weight:700;
          line-height:64px;
          text-align:center;
          font-family:Arial,Helvetica,sans-serif;
          border:3px solid #ffffff;
        ">
          ${this.getInitials(d.name) || '?'}
        </div>`;

    const dept = d.department
      ? `<div style="font-size:11px;color:#D1D5DB;margin-top:2px;">
          ${d.department}
        </div>`
      : '';

    const phone = d.phone
      ? `<div style="font-size:11px;color:#ffffff;margin-top:4px;">
          📞 ${d.phone}
        </div>`
      : '';

    const email = d.email
      ? `<div style="font-size:11px;margin-top:4px;">
          <a href="mailto:${d.email}"
            style="color:#6DFE8C;text-decoration:none;">
            ✉ ${d.email}
          </a>
        </div>`
      : '';

    const site = d.site
      ? `<div style="font-size:11px;margin-top:4px;">
          <a href="https://${d.site.replace(/^https?:\/\//, '')}"
            style="color:#6DFE8C;text-decoration:none;">
            🌐 ${d.site}
          </a>
        </div>`
      : '';

    return `
      <table
        role="presentation"
        cellpadding="0"
        cellspacing="0"
        border="0"
        width="520"
        style="
          width:520px;
          border-collapse:collapse;
          font-family:Arial,Helvetica,sans-serif;

        "
      >

      <tr>
      <td width="520" height="160" valign="top">

      <!--[if gte mso 9]>
      <v:rect
        xmlns:v="urn:schemas-microsoft-com:vml"
        fill="true"
        stroke="false"
        style="width:390pt;height:120pt;">
        <v:fill
          src="${CARD_BG}"
          type="frame"/>
        <v:textbox inset="0,0,0,0">
      <![endif]-->

      <div style="
        background-image:url('${CARD_BG}');
        background-repeat:no-repeat;
        background-position:right center;
        background-size:cover;
        width:520px;
        height:160px;
      ">

      <table
        role="presentation"
        cellpadding="0"
        cellspacing="0"
        border="0"
        width="520"
        height="160"
      >

      <tr>

      <td
        valign="top"
        width="350"
        style="
          padding:18px 20px 16px 20px;
          color:#ffffff;
        "
      >

      <div style="
        font-size:18px;
        line-height:22px;
        font-weight:bold;
        color:#ffffff;
      ">
        ${d.name || 'Seu Nome'}
      </div>

      <div style="
        font-size:12px;
        line-height:16px;
        color:#CFCFCF;
        padding-top:2px;
      ">
        ${d.position || ''}
      </div>

      ${dept}

      <table
        role="presentation"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="margin-top:10px;"
      >
      <tr>
      <td>

      ${phone}
      ${email}
      ${site}

      </td>
      </tr>
      </table>

      </td>

      <td
        width="120"
        align="center"
        valign="top"
        style="
          padding-top:16px;
          padding-right:24px;
        "
      >

      ${avatar}

      <table
        role="presentation"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="margin-top:10px;"
      >
      <tr>
      <td align="center">

      <div style="
        font-size:10px;
        line-height:12px;
        color:#CCCCCC;
        padding-top:2px;
      ">
        Infraestrutura de crédito
      </div>

      </td>
      </tr>
      </table>

      </td>

      </tr>

      </table>

      </div>

      <!--[if gte mso 9]>
        </v:textbox>
      </v:rect>
      <![endif]-->

      </td>
      </tr>

      </table>
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
