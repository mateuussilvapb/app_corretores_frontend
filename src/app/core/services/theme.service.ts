//Angular
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

//Internos
import { THEME, THEMES } from 'src/app/core/models/themes';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentThemeIndex = 0;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  switchTheme() {
    let themeLink = this.document.getElementById(
      'app-corretores'
    ) as HTMLLinkElement;

    if (themeLink) {
      // Alterna entre os temas
      this.calculateCurrentThemeIndex();
      themeLink.href = '/' + THEMES[this.currentThemeIndex] + '.css';
    }
  }

  getCurrentTheme() {
    return THEMES[this.currentThemeIndex];
  }

  get getIconTheme() {
    if (this.getCurrentTheme() === THEME.DARK) {
      return 'pi pi-moon';
    }
    return 'pi pi-sun';
  }

  private calculateCurrentThemeIndex() {
    this.currentThemeIndex = (this.currentThemeIndex + 1) % THEMES.length;
  }
}
