import { Component, OnInit, OnDestroy, Input, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DashboardLayoutConfiguration } from './models/dashboard-layout-configuration.model';
import { SidePanelPosition } from './models/side-panel-position.enum';
import { SidePanelService } from './services/side-panel.service';
import { SidePanelState } from './models/side-panel-state.enum';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
  @Input()
  public configuration: DashboardLayoutConfiguration;

  private _subscriptionsSubject$: Subject<void>;
  public currentPanelState: SidePanelState;
  private _event: any;

  constructor(private _sidePanelService: SidePanelService) {
    this._subscriptionsSubject$ = new Subject<void>();
    this.configuration = new DashboardLayoutConfiguration(SidePanelPosition.LEFT, SidePanelState.OPEN);
    this._sidePanelService.changeState(this.configuration.initialSidePanelState)
  }

  ngOnInit(): void {
    window.dispatchEvent(new Event('resize'));
    this._sidePanelService
      .panelStateChanges
      .pipe(takeUntil(this._subscriptionsSubject$))
      .subscribe((state: SidePanelState) => this.currentPanelState = state);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this._event = event;
    // @@@ May have to rethink
    const width: number = window.innerWidth;
    if (width < 768)
      this._sidePanelService.changeState(SidePanelState.CLOSE);
    else if (width < 991)
      this._sidePanelService.changeState(SidePanelState.OPEN);
    else
      this._sidePanelService.changeState(SidePanelState.OPEN);
  }

  ngOnDestroy(): void {
    this._subscriptionsSubject$.next();
    this._subscriptionsSubject$.complete();
  }
}