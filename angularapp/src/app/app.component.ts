import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MatToolbarModule,MatButtonModule,
    MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})



export class AppComponent {
  title = 'angularapp';

  constructor(private router: Router) {}

  goToEmployeeForm() {
    this.router.navigate(['/employee']);
  }
  goToHome() {
    this.router.navigate(['/']);
  }

  goToProjectForm() {
    this.router.navigate(['/project']);
  }
  goToCompanyForm() {
    this.router.navigate(['/company']);
  }
}
