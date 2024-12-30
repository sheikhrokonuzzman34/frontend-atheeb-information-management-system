import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MainComponent } from "./main/main.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { HeadbarComponent } from "./headbar/headbar.component";
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MainComponent, SidebarComponent, HeadbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showLayout = true;
  // isCollapsed = false;

  constructor(private router: Router, private sidebarService: SharedService) {
    // Listen to route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is '/login'
        this.showLayout = event.url !== '/login';
      }
    });
  }

  ngOnInit() {
    // this.sidebarService.isCollapsed$.subscribe(isCollapsed => {
    //   this.isCollapsed = isCollapsed;
    // });
  }
}
