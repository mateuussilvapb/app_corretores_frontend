import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentThemeIndex = 0;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  private readonly themes: string[] = ['theme-light', 'theme-dark'];

  switchTheme() {
    let themeLink = this.document.getElementById(
      'app-corretores'
    ) as HTMLLinkElement;

    if (themeLink) {
      // Alterna entre os temas
      this.currentThemeIndex =
        (this.currentThemeIndex + 1) % this.themes.length;
      themeLink.href = '/' + this.themes[this.currentThemeIndex] + '.css';
    }
  }
}
