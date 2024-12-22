import { Component, HostListener } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isCollapsed = true;

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isCollapsed = false;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isCollapsed = true;
  }
}
