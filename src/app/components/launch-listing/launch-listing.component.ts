import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Launch } from '../../interfaces/launch';
import { SearchStatus } from '../../interfaces/search-status';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-launch-listing',
  templateUrl: './launch-listing.component.html',
  styleUrls: ['./launch-listing.component.css']
})
export class LaunchListingComponent {

  @Input() launches:Launch[];
  @Input() searchStatus:SearchStatus;

  constructor() { }


}
