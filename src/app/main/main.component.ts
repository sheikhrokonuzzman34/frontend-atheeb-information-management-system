import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart,registerables } from 'chart.js';
import { FilecountService } from '../services/filecount.service';
import { BarchartService } from '../services/barchart.service';
Chart.register(...registerables);

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  fileCounts: any = [];
  barCharts: any = [];
  barChartFileTypes: any = [];
  barchartFileCounts: any = [];
  lineChartFileTypes: any = [];
  lineChartFileCounts: any = [];

  constructor(private filecountservice: FilecountService, private barChartService: BarchartService) {

  }

  ngOnInit(): void {
    this.getFileCount();
    this.getBarChart();
    this.RenderBarChart(this.barChartFileTypes, this.barchartFileCounts);
    this.RenderLineChart(this.lineChartFileTypes,this.lineChartFileCounts);

    // new Chart('barChart', {
    //   type: 'bar',
    //   data: {
    //     labels: ['0', '1', '2', '3', '4', '5'],
    //     datasets: [
    //       {
    //         label: 'Documents',
    //         data: [20, 100, 80, 140, 150, 180],
    //         backgroundColor: '#00A1F1',
    //       },
    //     ],
    //   },
    //   options: {
    //     responsive: true,
    //     scales: {
    //       y: {
    //         beginAtZero: true,
    //         max: 220, // Set the maximum value for the y-axis
    //         ticks: {
    //           stepSize: 20, // Ensure the y-axis increments by 20
    //         },
    //       },
    //     },
    //   },
    // });

    // Initialize Line Chart
    // new Chart('lineChart', {
    //   type: 'line',
    //   data: {
    //     labels: [0, 1, 2, 3, 4, 5, 6],
    //     datasets: [
    //       {
    //         label: 'Tags',
    //         data: [0, 20, 100, 80, 140, 145, 180],
    //         borderColor: '#F65314',
    //         borderWidth: 2,
    //         fill: false,
    //         pointBackgroundColor: '#F65314',
    //       },
    //     ],
    //   },
    //   options: {
    //     responsive: true,
    //     scales: {
    //       y: {
    //         beginAtZero: true,
    //         max: 220, 
    //         ticks: {
    //           stepSize: 20, 
    //         },
    //       },
    //     },
    //   },
    // });

    // Initialize Doughnut Chart
    new Chart('doughnutChart', {
      type: 'doughnut',
      data: {
        labels: ['PDF', 'XLSX', 'Docs', 'TXT', 'JPG'],
        datasets: [
          {
            label: 'File Distribution',
            data: [47, 25, 22, 15, 10], // Replace with your values
            backgroundColor: ['#3F51B5', '#F65314', '#7CBB00', '#FFBB00','#00A1F1'],
            borderColor: '#FFFFFF',
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom', // Position the legend below the chart
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem: any) {
                return `${tooltipItem.label}: ${tooltipItem.raw}%`;
              },
            },
          },
        },
      },
    });
  
  }

  RenderBarChart(barChartFileTypes:any, barchartFileCounts:any) {
    console.log(barChartFileTypes,barchartFileCounts);
   new Chart('barChart', {
      type: 'bar',
      data: {
        labels: barChartFileTypes,
        datasets: [
          {
            label: 'Documents',
            data: barchartFileCounts,
            backgroundColor: '#00A1F1',
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: Math.max(...barchartFileCounts) + 10, 
            ticks: {
              stepSize: Math.ceil(Math.max(...barchartFileCounts) / 10),
            },
          },
        },
      },
    });
  }

  RenderLineChart(lineChartFileTypes:any, lineChartFileCounts:any) {
    console.log(lineChartFileTypes,lineChartFileCounts);
    new Chart('lineChart', {
      type: 'line',
      data: {
        labels: lineChartFileTypes,
        datasets: [
          {
            label: 'Tags',
            data: lineChartFileCounts,
            borderColor: '#F65314',
            borderWidth: 2,
            fill: false,
            pointBackgroundColor: '#F65314',
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 220, // Set the maximum value for the y-axis
            ticks: {
              stepSize: 20, // Ensure the y-axis increments by 20
            },
          },
        },
      },
    });

  }

  getFileCount() {
    this.filecountservice.getTagInfoList().subscribe((data:any)=>{
      this.fileCounts = data;
      // console.log(this.fileCounts);
    })
  }

  getBarChart() {
    this.barChartService.getBarChartList().subscribe((data:any)=>{
      this.barCharts= data.file_count;
      console.log(this.barCharts);
      if(this.barCharts != null) {
        for(let i = 0; i < this.barCharts.length; i++) {
          // console.log(this.barCharts[i].file_type);
          // console.log(this.barCharts[i].count);
          this.barChartFileTypes.push(this.barCharts[i].file_type);
          this.barchartFileCounts.push(this.barCharts[i].count);
        }
      }
    })
  }
}
