import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private _elementTheme = document.querySelector('#theme');

  constructor() {
    console.log('SettingsService initialized');

    const theme: string = localStorage.getItem('theme') || '';
    this._elementTheme?.setAttribute('href', theme);
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;

    const newTheme = `./assets/css/colors/${theme}.css`;
    console.log(this._elementTheme);
    this._elementTheme?.setAttribute('href', newTheme);

    localStorage.setItem('theme', newTheme);

    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const links = document.querySelectorAll('.selector');

    links.forEach((element) => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;

      const currentTheme = this._elementTheme?.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        element.classList.add('working');
      }
    });
  }
}
