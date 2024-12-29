import { Component, HostListener, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  isCollapsed = false;

  constructor(private sidebarService: SharedService) {}

  ngOnInit() {
    this.sidebarService.isCollapsed$.subscribe(isCollapsed => {
      this.isCollapsed = isCollapsed;
    });
  }
  // toggleSidebar() {
  //   this.isCollapsed = !this.isCollapsed;
  // }
}
