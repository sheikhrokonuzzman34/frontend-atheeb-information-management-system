import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SharedService } from '../services/shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-headbar',
  standalone: true,
  imports: [MatIconModule,CommonModule],
  templateUrl: './headbar.component.html',
  styleUrl: './headbar.component.css'
})
export class HeadbarComponent implements OnInit{
  isCollapsed = false;

  constructor(private sidebar: SharedService) {}

  ngOnInit() {
    this.sidebar.isCollapsed$.subscribe(isCollapsed => {
      this.isCollapsed = isCollapsed;
    });
  }

  toggleSidebar() {
    // this.sidebar.toggleSidebar();
    this.sidebar.toggleSidebar();
  }
}
