import { Injectable } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class HeaderService {

  constructor(private dashboardService: DashboardService) { }

  getDashBoardMessage() {
    this.dashboardService.logMessage(); 
  }
}
