import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SignatureData, DEFAULT_SIGNATURE } from '../models/signature.model';
import { SignatureBuilderService } from '../builder/signature-builder.service';

@Component({
  selector: 'app-signature-editor',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule,
    MatTooltipModule,
  ],
  templateUrl: './signature-editor.component.html',
  styleUrl: './signature-editor.component.css',
})
export class SignatureEditorComponent implements OnInit {
  private builder = inject(SignatureBuilderService);
  private sanitizer = inject(DomSanitizer);
  private snackBar = inject(MatSnackBar);

  data = signal<SignatureData>({ ...DEFAULT_SIGNATURE });

  signatureHtml = computed(() => this.builder.buildHtml(this.data()));

  safePreview = computed<SafeHtml>(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.signatureHtml())
  );

  ngOnInit(): void {}

  update(field: keyof SignatureData, value: string): void {
    this.data.update(d => ({ ...d, [field]: value }));
  }

  async copyForGmail(): Promise<void> {
    try {
      await this.builder.copyAsRichHtml(this.signatureHtml());
      this.snackBar.open('Copiado! Cole com Ctrl+Shift+V no Gmail.', 'OK', {
        duration: 4000,
        panelClass: 'snack-success',
      });
    } catch {
      this.snackBar.open('Erro ao copiar. Tente baixar o HTML.', 'OK', {
        duration: 3000,
      });
    }
  }

  download(): void {
    this.builder.downloadHtml(this.signatureHtml());
  }
}
