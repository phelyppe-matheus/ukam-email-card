import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectionList, MatListModule } from '@angular/material/list';
import { ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';

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
    MatListModule,
    MatExpansionModule
  ],
  templateUrl: './signature-editor.component.html',
  styleUrl: './signature-editor.component.css',
})
export class SignatureEditorComponent implements OnInit {

  @ViewChild('positionList')
  positionList!: MatSelectionList;

  readonly defaultPositions = [
    'Especialista em Infraestrutura de Crédito',
    'Product Owner',
    'Desenvolvedor de Software',
    'FullStack',
  ];
  selectedPositions: string[] = [];
  customPosition = '';
  hasCustomPosition = false;

  private builder = inject(SignatureBuilderService);
  private sanitizer = inject(DomSanitizer);
  private snackBar = inject(MatSnackBar);

  data = signal<SignatureData>({ ...DEFAULT_SIGNATURE });
  cargo_expanded = signal<boolean>(false);

  signatureHtml = computed(() => this.builder.buildHtml(this.data()));

  safePreview = computed<SafeHtml>(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.signatureHtml())
  );

  ngOnInit(): void {
    const value = this.data().position ?? '';

    const positions = value
      .split('|')
      .map(v => v.trim())
      .filter(Boolean);

    this.selectedPositions = positions.filter(p =>
      this.defaultPositions.includes(p)
    );

    const customValues = positions.filter(
      p => !this.defaultPositions.includes(p)
    );

    if (customValues.length) {
      this.hasCustomPosition = true;
      this.customPosition = customValues.join(' | ');
    }
  }

  update(field: keyof SignatureData, value: string): void {
    this.data.update(d => ({ ...d, [field]: value }));
  }

  onPositionsChange(): void {
    const selected = this.positionList.selectedOptions.selected.map(
      option => option.value
    );

    this.hasCustomPosition = selected.includes('__custom__');

    const values = selected.filter(v => v !== '__custom__');

    if (this.hasCustomPosition && this.customPosition.trim()) {
      values.push(this.customPosition.trim());
    }

    this.update('position', values.join(' | '));
  }

  onCustomPositionChange(value: string): void {
    this.customPosition = value;

    const values = this.positionList.selectedOptions.selected
      .map(option => option.value)
      .filter(v => v !== '__custom__');

    if (value.trim()) {
      values.push(value.trim());
    }

    this.update('position', values.join(' | '));
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
