import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart,registerables } from 'chart.js';
import { FilecountService } from '../services/filecount.service';
import { ChartService } from '../services/chart.service';
import { TagRelationService } from '../services/tag-relation.service';
import { OverallListsService } from '../services/overall-lists.service';
import { KFormatPipe } from '../pipes/k-format.pipe';
import { FormsModule } from '@angular/forms';
Chart.register(...registerables);

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [KFormatPipe, FormsModule],
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
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  currentChart: Chart | null = null;
  selectedChartType: string = 'barVertical'; // Default chart type
  selectedLineChartType: string = 'line'; // Default chart type
  selectedDonutChartType: string = 'doughnut'; // Default chart type
  chartInstance: any; // Holds the current chart instance
  lineChartInstance: any; // Holds the current chart instance
  donutChartInstance: any; // Holds the current chart instance

  constructor(private filecountservice: FilecountService, private chartService: ChartService, private tagRelationService: TagRelationService, private OverallListsService: OverallListsService) {

  }

  ngOnInit(): void {
    this.getFileCount();
    this.getBarChart();
    this.getLineChart();
    this.getDoughnutChart();
    // this.RenderBarChart(this.barChartFileTypes, this.barchartFileCounts);
    // this.RenderLineChart(this.lineChartFileTypes,this.lineChartFileCounts);
    // this.RenderDoughnutChart(this.doughnutChartFileTypes,this.doughnutChartFileCounts);
    this.getTagRelations();
    this.getOverallList();

  }

  // RenderBarChart(barChartFileTypes:any, barchartFileCounts:any) {
  //  console.log(barChartFileTypes,barchartFileCounts);
  //  const maxValue = Math.max(...barchartFileCounts);
  //  const stepSize = Math.ceil(maxValue / 10);
  //  new Chart('barChart', {
  //     type: 'bar',
  //     data: {
  //       labels: barChartFileTypes,
  //       datasets: [
  //         {
  //           label: 'Documents',
  //           data: barchartFileCounts,
  //           backgroundColor: '#00A1F1',
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //           max: maxValue + stepSize, 
  //           ticks: {
  //             stepSize: stepSize,
  //           },
  //         },
  //       },
  //     },
  //   });
  // }

  // RenderLineChart(lineChartFileTypes:any, lineChartFileCounts:any) {
  //   console.log(lineChartFileTypes,lineChartFileCounts);
  //   const maxValue = Math.max(...lineChartFileCounts);
  //   const stepSize = Math.ceil(maxValue / 10);
  //   new Chart('lineChart', {
  //     type: 'line',
  //     data: {
  //       labels: lineChartFileTypes,
  //       datasets: [
  //         {
  //           label: 'Tags',
  //           data: lineChartFileCounts,
  //           borderColor: '#F65314',
  //           borderWidth: 2,
  //           fill: false,
  //           pointBackgroundColor: '#F65314',
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //           max: maxValue + stepSize, 
  //           ticks: {
  //             stepSize: stepSize,
  //           },
  //         },
  //       },
  //     },
  //   });

  // }

  // RenderDoughnutChart(doughnutChartFileTypes:any, doughnutChartFileCounts:any) {
  //   console.log(doughnutChartFileTypes,doughnutChartFileCounts);
  //   // const maxValue = Math.max(...doughnutChartFileCounts);
  //   // const stepSize = Math.ceil(maxValue / 10);
  //   new Chart('doughnutChart', {
  //     type: 'doughnut',
  //     data: {
  //       labels: doughnutChartFileTypes,
  //       datasets: [
  //         {
  //           label: 'File Distribution',
  //           data: doughnutChartFileCounts,
  //           backgroundColor: ['#3F51B5', '#F65314', '#7CBB00', '#FFBB00','#00A1F1'],
  //           borderColor: '#FFFFFF',
  //           borderWidth: 2,
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       plugins: {
  //         legend: {
  //           position: 'bottom', // Position the legend below the chart
  //         },
  //         tooltip: {
  //           callbacks: {
  //             label: function (tooltipItem: any) {
  //               return `${tooltipItem.label}: ${tooltipItem.raw}%`;
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });

  // }

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
      this.renderBarChart(); // Initial chart render

    })
  }

  onChartTypeChange(): void {
    if (this.chartInstance) {
      this.chartInstance.destroy(); // Destroy the existing chart before re-rendering
    }
    this.renderBarChart();
  }

  onLineChartTypeChange(): void {
    if (this.lineChartInstance) {
      this.lineChartInstance.destroy(); // Destroy the existing chart
    }
    this.renderLineChart();
  }

  onDonutChartTypeChange(): void {
    if (this.donutChartInstance) {
      this.donutChartInstance.destroy(); // Destroy the existing chart before re-rendering
    }
    this.renderDonutChart();
  }

  renderBarChart(): void {
    const chartType:any = this.getChartType(this.selectedChartType);

     // Access the canvas element and set its size
    const chartCanvas = document.getElementById('chartCanvas') as HTMLCanvasElement;

    if (chartType === 'pie' || chartType === 'doughnut') {
      chartCanvas.width = 300; // Set a smaller width for pie/doughnut charts
      chartCanvas.height = 300; // Set a smaller height for pie/doughnut charts
    } else {
      chartCanvas.width = 600; // Set standard size for other charts
      chartCanvas.height = 400; // Set standard size for other charts
    }

    this.chartInstance = new Chart('chartCanvas', {
      type: chartType,
      data: {
        labels: this.barChartFileTypes,
        datasets: [
          {
            label: 'Doc Distribution',
            data: this.barchartFileCounts,
            backgroundColor: chartType === 'line' ? '#F65314' : ['#3F51B5', '#F65314', '#7CBB00', '#FFBB00', '#00A1F1'],
            borderColor: chartType === 'line' ? 'red' : '#FFFFFF',
            borderWidth: 2,
            // tension: chartType === 'line' ? 0.4 : 0, // Smooth curves for line chart
            fill: false, // Optional: fill under the line
          },
        ],
      },
      options: this.getChartOptions(chartType),
    });
  }

  renderLineChart(): void {
    const chartType: any = this.getChartType(this.selectedLineChartType);
    const chartCanvas = document.getElementById('lineChart') as HTMLCanvasElement;
  
    if (chartType === 'pie' || chartType === 'doughnut') {
      chartCanvas.width = 300; // Smaller width for pie/doughnut charts
      chartCanvas.height = 300;
    } else {
      chartCanvas.width = 600; // Standard size for other charts
      chartCanvas.height = 400;
    }
  
    this.lineChartInstance = new Chart('lineChart', {
      type: chartType,
      data: {
        labels: this.lineChartFileTypes,
        datasets: [
          {
            label: 'Tag Distribution',
            data: this.lineChartFileCounts,
            backgroundColor: chartType === 'line' ? '#00A1F1' : ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD'],
            borderColor: chartType === 'line' ? 'blue' : '#FFFFFF',
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: this.getLineChartOptions(chartType),
    });
  }

  renderDonutChart():void {
    const chartType: any = this.getChartType(this.selectedDonutChartType);
    const chartCanvas = document.getElementById('doughnutChart') as HTMLCanvasElement;
  
    if (chartType === 'pie' || chartType === 'doughnut') {
      chartCanvas.width = 300; // Smaller width for pie/doughnut charts
      chartCanvas.height = 300;
    } else {
      chartCanvas.width = 600; // Standard size for other charts
      chartCanvas.height = 400;
    }
  
    this.donutChartInstance = new Chart('doughnutChart', {
      type: chartType,
      data: {
        labels: this.doughnutChartFileTypes,
        datasets: [
          {
            label: 'File Distribution',
            data: this.doughnutChartFileCounts,
            backgroundColor: chartType === 'line' ? '#00A1F1' : ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD'],
            borderColor: chartType === 'line' ? 'blue' : '#FFFFFF',
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: this.getDonutChartOptions(chartType),
    });
  }

  getChartType(selection: string): string {
    switch (selection) {
      case 'barHorizontal':
        return 'bar';
      case 'barVertical':
        return 'bar';
      case 'pie':
        return 'pie';
      case 'doughnut':
        return 'doughnut';
      case 'line':
        return 'line';
      default:
        return 'bar';
    }
  }

  getChartOptions(type: string): any {
    // const commonOptions = {
    //   responsive: true,
    //   maintainAspectRatio: false, // Ensures consistent size for all chart types
    // };
    if (type === 'bar') {
      return {
        responsive: true,
        indexAxis: this.selectedChartType === 'barHorizontal' ? 'y' : 'x', // Horizontal or Vertical
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
    } else if (type === 'pie' || type === 'doughnut') {
      return {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
        // layout: {
        //   padding: 20, // Adds padding around the chart
        // },
        // elements: {
        //     arc: {
        //       borderWidth: 2, // Optional: Set border size
        //     },
        // },
      };
    } else if (type === 'line') {
      return {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
    }
  }

  getLineChartOptions(type: string): any {
    if (type === 'bar') {
      return {
        responsive: true,
        indexAxis: this.selectedLineChartType === 'barHorizontal' ? 'y' : 'x',
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
    } else if (type === 'pie' || type === 'doughnut') {
      return {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      };
    } else if (type === 'line') {
      return {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
    }
  }

  getDonutChartOptions(type: string): any {
    if (type === 'bar') {
      return {
        responsive: true,
        indexAxis: this.selectedDonutChartType === 'barHorizontal' ? 'y' : 'x',
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
    } else if (type === 'pie' || type === 'doughnut') {
      return {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      };
    } else if (type === 'line') {
      return {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
    }
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
      this.renderLineChart();
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
      this.renderDonutChart();
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
