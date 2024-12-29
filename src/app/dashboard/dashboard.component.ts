import { Component } from '@angular/core';
import { HeadbarComponent } from "../headbar/headbar.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { MainComponent } from "../main/main.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeadbarComponent, SidebarComponent, MainComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
