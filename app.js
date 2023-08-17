var country=document.getElementById("srchCntry");
var names = document.getElementById("name")
var population = document.getElementById("population")
var area = document.getElementById("area")
function worldMap(country="pakistan",population=220890331,area=881912){
    google.charts.load('current', {
      'packages':['geochart'],
    });
    google.charts.setOnLoadCallback(drawRegionsMap);
  
    function drawRegionsMap() {
      var data = google.visualization.arrayToDataTable([
        ['Country', 'Popularity','area'],
        [country,population,area],
      ]);
  
      var options = {};
  
      var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
  
      chart.draw(data, options);
    }
  }
  worldMap();
function fetchCountryPopulationData() {
    
    // Fetch country data from the Restcountries API
    fetch(`https://restcountries.com/v3.1/name/${country.value}`)
      .then(response => response.json())
      .then(data => {
        data.forEach(country => {
          var countryName = country.name.common;
          var population = country.population;
          var area = country.area;
          if (countryName && population && area) {
            worldMap(countryName,population,area)


            document.getElementById("showData").children[1].innerHTML += `<tr>
            <td>${country.name.common}</td>
            <td>${country.population}</td>
            <td>${country.area}</td>
        </tr>`
          }
        });
      })
      .catch(error => console.error('Error fetching country data:', error));
  }

  