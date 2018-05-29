import { Component, OnInit , NgZone} from '@angular/core';
import { UserService, User, Product, StorefrontService, Storefront } from '@apttus/ecommerce';
import { SObject, SObjectService } from 'ng-salesforce';
import { Observable } from 'rxjs/Observable';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  pageTitle = 'Dashboard';
  chart = []; // This will hold our chart info
  public user: User;
  constructor(public ngZone: NgZone, public userService: UserService) {


  }
  public doughnutChartLabels: string[] = ['Progress', 'Remaining'];
  public doughnutChartData: number[] = [500000, 200000];
  public doughnutChartType: string = 'doughnut';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  ngOnInit() {
    this.userService.me().subscribe(res => this.ngZone.run(() => {
      this.user = res;
    }));
    console.log('TEST');
    console.log(this.user);
   if (this.user != null && this.user.Alias !== 'guest') {
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: this.doughnutChartLabels,
        datasets: [
          {
            data: this.doughnutChartData,
            borderColor: ['#69ce4a', '#e8542b'],
            backgroundColor : ['#69ce4a', '#e8542b'],
            fill: true
          },
        ]
      },
      options: {
        legend: {
          display: true
        }
      }
    });
   }
  }

}
