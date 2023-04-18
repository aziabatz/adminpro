import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'app/services/settings.service';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const defaultTheme = './assets/css/colors/default-dark.css';

declare function customInitFunctions(): any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {


  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    customInitFunctions();
  }
}
