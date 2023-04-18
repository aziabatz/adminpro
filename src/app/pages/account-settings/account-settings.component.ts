import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {


  ngOnInit(): void {
    this.settingsService.checkCurrentTheme();
  }

  constructor(private settingsService: SettingsService) { }

  changeTheme(theme: string): void {
    this.settingsService.changeTheme(theme);
  }


}
