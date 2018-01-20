import { Component } from '@angular/core';
declare var CanvasJS: any;
declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  continents;
  selectedContinents;
  travels;
  selectedCountries;
  data;

  constructor() {
    var json = {
      "DashBoard": {
        "Section1": [
          {
            "name": "Ази",
            "value": "30",
            "countries": [
              {
                "name": "Монгол"
              },
              {
                "name": "Солонгос"
              },
              {
                "name": "Япон"
              },
              {
                "name": "Хятад"
              },
              {
                "name": "Сингапур"
              }
            ],
            "hotels": [
              {
                "name": "Баянгол зочид буудал"
              },
              {
                "name": "Улаанбаатар зочид буудал"
              },
              {
                "name": "Чингис хаан зочид буудал"
              },
              {
                "name": "Рамада зочид буудал"
              },
              {
                "name": "Сүнжин гранд зочид буудал"
              }
            ]
          },
          {
            "name": "Europe",
            "value": "50",
            "countries": [
              {
                "name": "Russian"
              },
              {
                "name": "Dani"
              },
              {
                "name": "Dani"
              },
              {
                "name": "Dani"
              },
              {
                "name": "Dani"
              },
            ],
            "hotels": [
              {
                "name": "Five stars hotel"
              },
              {
                "name": "Nine stars hotel"
              },
              {
                "name": "Nine stars hotel"
              },
              {
                "name": "Nine stars hotel"
              },
              {
                "name": "Nine stars hotel"
              }
            ]
          }
        ],
        "Section2": [
          {
            "country": "Хятад",
            "travelType": [
              {
                "type": "Гэр бүл",
                "value": "5"
              },
              {
                "type": "Бизнес",
                "value": "50"
              },
              {
                "type": "Бал сар",
                "value": "10"
              },
              {
                "type": "Хувийн",
                "value": "30"
              },
              {
                "type": "Бусад",
                "value": "26"
              }
            ],
            "todo": [
              {
                "name": "Музей үзэх",
                "value": "40",
                "url": "museum.png"
              },
              {
                "name": "Бөх барилдах",
                "value": "50",
                "url": "wrestle.png"
              }
            ]
          },
          {
            "country": "Монгол",
            "travelType": [
              {
                "type": "Гэр бүл",
                "value": "5"
              },
              {
                "type": "Бизнес",
                "value": "10"
              },
              {
                "type": "Бал сар",
                "value": "20"
              },
              {
                "type": "Хувийн",
                "value": "30"
              },
              {
                "type": "Бусад",
                "value": "56"
              }
            ],
            "todo": [
              {
                "name": "Музей үзэх",
                "value": "90",
                "url": "museum.jpg"
              },
              {
                "name": "Айраг уух",
                "value": "80",
                "url": "airag.jpg"
              },
              {
                "name": "Морь унах",
                "value": "45",
                "url": "horse.jpg"
              },
              {
                "name": "Чингис хаан цогцолбор",
                "value": "15",
                "url": "chingis.jpg"
              },
              {
                "name": "Малчин айлд зочлох",
                "value": "67",
                "url": "country.jpg"
              },
              {
                "name": "Бөх барилдах",
                "value": "71",
                "url": "wrestle.jpg"
              }
            ]
          }
        ]
      }
    };

    localStorage.setItem("data", JSON.stringify(json));
    this.getData();
  }

  ngOnInit(): any {

    this.chart();
  }

  getData() {
    if (localStorage.getItem("data")) {

      this.data = JSON.parse(localStorage.getItem("data"));
      console.log(this.data);

      this.continents = Array<{ name: string, value: number, countries: any, hotels: any }>();

      for (var i = 0; i < this.data.DashBoard.Section1.length; i++) {

        var vcountries = Array<{ id: number, name: string }>();

        for (var j = 0; j < this.data.DashBoard.Section1[i].countries.length; j++) {
          vcountries[j] = {
            id: j + 1,
            name: this.data.DashBoard.Section1[i].countries[j].name
          };
        }

        var vhotels = Array<{ id: number, name: string }>();

        for (var k = 0; k < this.data.DashBoard.Section1[i].hotels.length; k++) {
          vhotels[k] = {
            id: k + 1,
            name: this.data.DashBoard.Section1[i].hotels[k].name
          };
        }

        this.continents[i] = {
          name: this.data.DashBoard.Section1[i].name,
          value: Number(this.data.DashBoard.Section1[i].value),
          countries: vcountries,
          hotels: vhotels
        };
      }

      this.selectedContinents = this.continents[0];


      this.travels = Array<{ country: string, travelType: any, todo: any }>();

      for (var i = 0; i < this.data.DashBoard.Section2.length; i++) {

        var vtravelType = Array<{ type: string, value: number }>();

        for (var j = 0; j < this.data.DashBoard.Section2[i].travelType.length; j++) {
          vtravelType[j] = {
            type: this.data.DashBoard.Section2[i].travelType[j].type,
            value: Number(this.data.DashBoard.Section2[i].travelType[j].value)
          }
        }

        var vtodo = Array<{ name: string, value: number, url: string }>();

        for (var k = 0; k < this.data.DashBoard.Section2[i].todo.length; k++) {
          vtodo[k] = {
            name: this.data.DashBoard.Section2[i].todo[k].name,
            value: Number(this.data.DashBoard.Section2[i].todo[k].value),
            url: this.data.DashBoard.Section2[i].todo[k].url
          }
        }

        this.travels[i] = {
          country: this.data.DashBoard.Section2[i].country,
          travelType: vtravelType,
          todo: vtodo
        }
      }
      this.selectedCountries = this.travels[0];
      console.log(this.selectedCountries);
    }
  }
  chart() {

    let pieDtp = Array<{ y: number, name: string, color: string }>();

    var colorscheme = ['#5DA5DA', '#60BD68', '#F17CB0', '#F15854', '#B2912F'];

    for (var i = 0; i < this.continents.length; i++) {
      pieDtp[i] = {
        y: this.continents[i].value,
        name: this.continents[i].name,
        color: colorscheme[i]
      };
    }

    var continentChart = new CanvasJS.Chart("continentChart", {
      animationEnabled: true,
      theme: "theme2",
      legend: {
        cursor: "pointer",
        itemClick: explodePie
      },
      data: [{
        type: "pie",
        toolTipContent: "{name}: <strong>{y}%</strong>",
        indexLabel: "{name} - {y}%",
        dataPoints: pieDtp
        //         	[
        // 	{ y: 26, name: "Европ", exploded: true , color : '#5DA5DA'},
        // 	{ y: 20, name: "Ази", color: '#60BD68'},
        // 	{ y: 5, name: "Австрали", color: '#F17CB0' },
        // 	{ y: 3, name: "Америк", color: '#B2912F' },
        // 	{ y: 7, name: "Антрактид", color: '#F15854' }
        // ]
      }]
    });
    continentChart.render();

    let pieTrt = Array<{ y: number, name: string, color: string }>();

    for (var i = 0; i < this.selectedCountries.travelType.length; i++) {
      pieTrt[i] = {
        y: this.selectedCountries.travelType[i].value,
        name: this.selectedCountries.travelType[i].type,
        color: colorscheme[i]
      }
    }

    var travelTypeChart = new CanvasJS.Chart("travelTypeChart", {
      animationEnabled: true,
      legend: {
        cursor: "pointer",
        itemClick: explodePie
      },
      data: [{
        type: "pie",
        toolTipContent: "{name}: <strong>{y}%</strong>",
        indexLabel: "{name} - {y}%",
        dataPoints: pieTrt
      }]
    });
    travelTypeChart.render();

    var barTodo = Array<{ label: string, y: number, url: string }>();

    for (var i = 0; i < this.selectedCountries.todo.length; i++) {
      barTodo[i] = {
        label: this.selectedCountries.todo[i].name.toUpperCase(),
        y: this.selectedCountries.todo[i].value,
        url: this.selectedCountries.todo[i].url
      }
    }

    console.log(barTodo);

    var chart = new CanvasJS.Chart("suggestedChart", {
      animationEnabled: true,
      axisX: {
        interval: 1,
        labelFontSize: 14,
        labelFontFamily: 'Arial, sans-serif',
        labelFontColor: '#6C7A89',
        margin: 10
      },
      axisY: {
        title: "Хувь (%)",
        margin: 10
      },
      data: [{
        type: "bar",
        toolTipContent: "<img src=\"/assets/img/\"{url}\"\" style=\"width:100px; height:80px;\"> <span class=\"text\">{label}</span><br>",
        dataPoints: barTodo
      }]
    });
    chart.render();



    function rangeChange(e) {
      console.log(e);
    }
    function explodePie(e) {
      if (typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
        e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
      } else {
        e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
      }
      e.chart.render();

    }

    google.charts.load('current', { 'packages': ['map'] });
    google.charts.setOnLoadCallback(drawMap);

    function drawMap() {
      var data = google.visualization.arrayToDataTable([
        ['Country', 'Population'],
        ['China', 'China: 1,363,800,000'],
        ['India', 'India: 1,242,620,000'],
        ['US', 'US: 317,842,000'],
        ['Indonesia', 'Indonesia: 247,424,598'],
        ['Brazil', 'Brazil: 201,032,714'],
        ['Pakistan', 'Pakistan: 186,134,000'],
        ['Nigeria', 'Nigeria: 173,615,000'],
        ['Bangladesh', 'Bangladesh: 152,518,015'],
        ['Russia', 'Russia: 146,019,512'],
        ['Japan', 'Japan: 127,120,000']
      ]);

      var options = {
        mapType: 'styledMap',
        showTooltip: true,
        showInfoWindow: true,
        maps: {
          // Your custom mapTypeId holding custom map styles.
          styledMap: {
            name: 'Styled Map', // This name will be displayed in the map type control.
            styles: [
              {
                featureType: 'poi.attraction',
                stylers: [{ color: '#fce8b2' }]
              },
              {
                featureType: 'road.highway',
                stylers: [{ hue: '#0277bd' }, { saturation: -50 }]
              },
              {
                featureType: 'road.highway',
                elementType: 'labels.icon',
                stylers: [{ hue: '#000' }, { saturation: 100 }, { lightness: 50 }]
              },
              {
featureType: 'landscape',
                stylers: [{ hue: '#259b24' }, { saturation: 10 }, { lightness: -22 }]
              }
            ]
          }
        }
      };

      var map = new google.visualization.Map(document.getElementById('chart_div'));

      map.draw(data, options);
    };
  }

  onContinents(newValue) {
    this.selectedContinents = newValue;
  }
  onCountries(val) {
    this.selectedCountries = val;
    this.chart();
  }

}
