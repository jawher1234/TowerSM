import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {
  @Input() background = 'linear-gradient(to right, #ff5f6d, #ffc371)';
  @Input() iconClass = 'fas fa-user';
  @Input() value = '';
  @Input() label = 'Statistique';
  constructor() { }

  ngOnInit(): void {
  }
  }
