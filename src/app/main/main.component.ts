import { Component, OnInit } from '@angular/core';
import { Chart,registerables } from 'chart.js';
import { FilecountService } from '../services/filecount.service';
import { ChartService } from '../services/chart.service';
import { TagRelationService } from '../services/tag-relation.service';
import { OverallListsService } from '../services/overall-lists.service';
import { KFormatPipe } from '../pipes/k-format.pipe';
Chart.register(...registerables);

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [KFormatPipe],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  fileCounts: any = [];
  barCharts: any = [];
  lineCharts: any = [];
  doughnutCharts: any = [];
  barChartFileTypes: any = [];
  barchartFileCounts: any = [];
  lineChartFileTypes: any = [];
  lineChartFileCounts: any = [];
  doughnutChartFileTypes: any = [];
  doughnutChartFileCounts: any = [];
  tagRelations: any = [];
  overallLists: any = [];

  constructor(private filecountservice: FilecountService, private chartService: ChartService, private tagRelationService: TagRelationService, private OverallListsService: OverallListsService) {

  }

  ngOnInit(): void {
    this.getFileCount();
    this.getBarChart();
    this.getLineChart();
    this.getDoughnutChart();
    this.RenderBarChart(this.barChartFileTypes, this.barchartFileCounts);
    this.RenderLineChart(this.lineChartFileTypes,this.lineChartFileCounts);
    this.RenderDoughnutChart(this.doughnutChartFileTypes,this.doughnutChartFileCounts);
    this.getTagRelations();
    this.getOverallList();

  }

  RenderBarChart(barChartFileTypes:any, barchartFileCounts:any) {
   console.log(barChartFileTypes,barchartFileCounts);
   const maxValue = Math.max(...barchartFileCounts);
   const stepSize = Math.ceil(maxValue / 10);
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
            max: maxValue + stepSize, 
            ticks: {
              stepSize: stepSize,
            },
          },
        },
      },
    });
  }

  RenderLineChart(lineChartFileTypes:any, lineChartFileCounts:any) {
    console.log(lineChartFileTypes,lineChartFileCounts);
    const maxValue = Math.max(...lineChartFileCounts);
    const stepSize = Math.ceil(maxValue / 10);
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
            max: maxValue + stepSize, 
            ticks: {
              stepSize: stepSize,
            },
          },
        },
      },
    });

  }

  RenderDoughnutChart(doughnutChartFileTypes:any, doughnutChartFileCounts:any) {
    console.log(doughnutChartFileTypes,doughnutChartFileCounts);
    // const maxValue = Math.max(...doughnutChartFileCounts);
    // const stepSize = Math.ceil(maxValue / 10);
    new Chart('doughnutChart', {
      type: 'doughnut',
      data: {
        labels: doughnutChartFileTypes,
        datasets: [
          {
            label: 'File Distribution',
            data: doughnutChartFileCounts,
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

  getFileCount() {
    this.filecountservice.getTagInfoList().subscribe((data:any)=>{
      this.fileCounts = data;
      // console.log(this.fileCounts);
    })
  }

  getBarChart() {
    this.chartService.getBarChartList().subscribe((data:any)=>{
      this.barCharts= data.file_count;
      console.log(this.barCharts);
      if(this.barCharts != null) {
        for(let i = 0; i < this.barCharts.length; i++) {
          this.barChartFileTypes.push(this.barCharts[i].file_type);
          this.barchartFileCounts.push(this.barCharts[i].count);
        }
      }
    })
  }

  getLineChart() {
    this.chartService.getLineChartList().subscribe((data:any)=>{
      this.lineCharts= data.tag_counts;
      console.log(this.lineCharts);
      if(this.lineCharts != null) {
        for(let i = 0; i < this.lineCharts.length; i++) {
          this.lineChartFileTypes.push(this.lineCharts[i].tag);
          this.lineChartFileCounts.push(this.lineCharts[i].count);
        }
      }
    })
  }

  getDoughnutChart() {
    this.chartService.getDoughnutChart().subscribe((data:any)=>{
      this.doughnutCharts= data.file;
      console.log(this.doughnutCharts);
      if(this.doughnutCharts != null) {
        for(let i = 0; i < this.doughnutCharts.length; i++) {
          this.doughnutChartFileTypes.push(this.doughnutCharts[i].file_type);
          this.doughnutChartFileCounts.push(this.doughnutCharts[i].percentage);
        }
      }
    })
  }

  getTagRelations() {
    this.tagRelationService.getTagRelationList().subscribe(data => {
      this.tagRelations = data;
    });
  }

  getOverallList() {
    this.OverallListsService.getOverallList().subscribe(data => {
      this.overallLists = data;
    });
  }
}
