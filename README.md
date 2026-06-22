# Ukamsoft Signature Editor — drop-in component

Angular 17+ · Standalone · Angular Material · Tailwind CSS

## Files

| File | Purpose |
|------|---------|
| `signature.model.ts` | `SignatureData` interface + default values |
| `signature-builder.service.ts` | HTML generation, clipboard copy, download |
| `signature-editor.component.ts` | Main component (signals, computed) |
| `signature-editor.component.html` | Template (Material + Tailwind) |
| `signature-editor.component.css` | Scoped overrides for mat-form-field spacing |

## Drop-in steps

1. Copy all five files into a folder inside your project, e.g.:
   ```
   src/app/features/signature-editor/
   ```

2. Import the component wherever you want to use it:

   ```typescript
   // In a standalone component or a route
   import { SignatureEditorComponent } from './features/signature-editor/signature-editor.component';

   @Component({
     imports: [SignatureEditorComponent],
     template: `<app-signature-editor />`
   })
   export class SomePage {}
   ```

   Or add it as a route:
   ```typescript
   // app.routes.ts
   {
     path: 'assinatura',
     loadComponent: () =>
       import('./features/signature-editor/signature-editor.component')
         .then(m => m.SignatureEditorComponent),
   }
   ```

3. No extra dependencies needed beyond what your project already uses:
   - `@angular/material` (card, form-field, input, button, icon, divider, snack-bar, tooltip)
   - `@angular/forms` (FormsModule)
   - Tailwind CSS (already configured)

## Customisation

- **Brand colours**: edit `NAVY` and `TEAL` constants at the top of `signature-builder.service.ts`.
- **Tagline**: edit the `Infraestrutura de crédito` string in the same service.
- **Extra fields** (LinkedIn, address, etc.): add to `SignatureData`, the form template, and `buildHtml()` in the service.
