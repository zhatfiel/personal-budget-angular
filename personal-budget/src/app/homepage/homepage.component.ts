import { OnInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public dataSource = {
    datasets: [
        {
            data: [],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                '#ff0000',
                '#32a852',
                '#5132a8',
                '#a83255',
                '#59ff00'
            ]
        }
    ],
    labels: []
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      for (let i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
        // this.createChart();
      }
      this.createChart();
    });
  }

  createChart(): void {
    const ctx = document.getElementsByTagName('canvas')[0];
    const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });
  }

}
