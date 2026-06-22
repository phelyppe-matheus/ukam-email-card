import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignatureEditorComponent } from './features/signature/editor/signature-editor.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SignatureEditorComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Ukam Card Generator');
}
