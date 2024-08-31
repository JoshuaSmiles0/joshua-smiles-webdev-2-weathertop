

![Logo](https://cdn.glitch.global/d6973480-5b8e-463f-a315-d8ad6ba2634d/Logo.png?v=1725115304994) 

# **Weathertop**

## About this site

Weathertop is a user case based weather data retrieval app. Users are able to create an account using an email address, name and password then log in to their
own custom dashboard. From here, users are able to real locations to their dashboard using a location name. This process is connected to the [Open Weather current weather API](https://openweathermap.org/)
, retrieving latitude and longitude and allowing some functionality inside of individual stations. Users can open each of their stations to record weather readings.
Users have two options to do this. Users can manually input data to record a reading, or autogenerate a reading for the location using the [Open Weather current weather API](https://openweathermap.org/).
Adding reports updates summary panes on both the dashboard and within the stations, summarizing metrics such as the max/min with and temperature. A temperature trend graph
across all of the users input readings is also generated as soon as reports are recorded. Stations can be deleted at any time, with input readings also scrubbed from the 
database. Users can update their details using the settings tab at any time, then re-log in to see their dashboard. 

## Accessing the site

Weathertop is available to access on the web and has been performance tested to ensure compatibility with all commonly used browsers. The site is served by glitch and can be found [here](https://joshua-smiles-weathertop.glitch.me/)

## Using the Weathertop site

The Weathertop site opens on the homepage. Here, users have the option to sign in or create a new account using the tabs on the navigation bar
![homePage](https://cdn.glitch.global/d6973480-5b8e-463f-a315-d8ad6ba2634d/landingPage.png?v=1725116566732)

Upon entering the signup page, the user will be prompted to enter their first name, surname and email address then choose a password for their account

![signUpPage](https://cdn.glitch.global/d6973480-5b8e-463f-a315-d8ad6ba2634d/signUpPage.png?v=1725116736986)

Upon signup, the user will be redirected to the login page, where they can enter their credentials and log in. If credentials are incorrect, the user will
recieve an error message that their password or email is incorrect. 

![loginPage](https://cdn.glitch.global/d6973480-5b8e-463f-a315-d8ad6ba2634d/loginPage.png?v=1725117081074)

Upon successful login, the user will be greeted by the dashboard. Here, users can see an overview of their locations added containing summaries from reports added
. At the base of the page, users can add additional stations by populating the add station bar and selecting add station. This will autogenerate a fresh location
to the users dashboard, which will be vacant of summary data until reports are added. The user can also visit the about page to learn more about the site by selecting
the about button on the top bar or update their details by selecing the settings icon. Users can open stations using the open symbol on the summary bar for the station
and delete the station entirely using the delete icon

![dashboard](https://cdn.glitch.global/d6973480-5b8e-463f-a315-d8ad6ba2634d/dashboard.png?v=1725117446423)

Upon opening a station. The user is able to add reports. These can be added manually by populating the submit report field at the base of the page, or by selecting the 
autogenerate report button below this, which calls the Open Weather API to retrieve the current data for the station location. Upon adding any report(s) the summary bar
at the top of the window will populate with summary data, and a temperature trend graph will be generated for all submitted readings, below this.
Adding subsequent reports or deleting existing reports will alter the summary data. Reports can be deleted or edited using the icons next to each report in the
reports table. 


![station](https://cdn.glitch.global/d6973480-5b8e-463f-a315-d8ad6ba2634d/stationPage.png?v=1725117896317)

The user can return to their dashboard at any time by selecting the weathertop Icon or dashboard button on the top bar


## Development

This website was developed using Express.js based on a template prepared in support of [Web Development II](https://next.tutors.dev/course/web-dev-2-2023) module in the [Higher Diploma in Computing](https://reader.tutors.dev/course/wit-hdip-comp-sci-showcase.netlify.app) at [SETU](https://www.setu.ie/), Ireland
This is largely server side, using glitches server capability. Some of the development features are outlined below. 

### Styling

This site was not styled using conventional CSS but instead utilises the bulma framework, linked in the head of the document.

```HTML
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css" />

```

The bulma framework is column based, and components are accessed using class attributes on the web pages HTML elements. The documentation for bulma can be accessed [here](https://bulma.io/documentation/start/responsiveness/).


### Templating

This site is based on handlebars templating, utilising a handlebars based layout with partials. Handlebars allows expressions from the Model View Controller approach used in this project
to be inserted into these partials to display data recorded by the user. For example, we see users summary data being displayed after being passed to the view by the controller within curly
braces (handlebars expression syntax) here:

```HTML
<div class = "column">
  <div class = "card">
    <header class = "card-header">
    <p class = "card-header-title">
      Temperature
      </p>
    <img src = "{{tempIconPath}}" width = "48" height = "48" alt = "" onerror="this.src='https://cdn.glitch.global/d6973480-5b8e-463f-a315-d8ad6ba2634d/celcius.png?v=1724950955411'">
    </header>
    <div class = "card-content">
      <p>
        Current: {{currentTemp}}°C
      </p>
            <p>
        Current: {{currentTempFarenheit}}°F
      </p>
      <p>
        Feels like: {{windChill}}°C
      </p>
      <p>
        Max: {{maxTemp}}°C
      </p>
      <p>
        Min: {{minTemp}}°C
      </p>
    </div>
  </div>
 </div>
```
Documentation on handlebars can be found [here](https://handlebarsjs.com/guide/#what-is-handlebars).

### Database

Users input data is stored on the server in JSON format using lowdb, which is a local JSON based database package. This involves initialising .JSON files based on the
format of data from lowdb and then pushing entered data to these files using Javascript on the server. This is done within model files. Here we can see initialisation 
of a lowDb file:

```javascript
import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { reportStore } from "./report-store.js";

//initalises stations.json file using lowdb
const db = initStore("stations");
```
We can see the database being added to using the method below:

```javascript
//Reads stationsDb. Takes station as input. Adds UUID from lowDB to station. adds station to DB

  async addStation(station) {
    await db.read();
    station._id = v4();
    db.data.stations.push(station);
    await db.write();
    return station;
  },
```

Documentation on this module can be found [here](https://www.npmjs.com/package/lowdb/v/2.1.0)

### API Access

As outlined in the overview of this document. Weathertop utilises the OpenWeather API to retrieve current weather data for a users chosen station. 
A free API key was provided by open weather to allow access. Requests using the API are handled within the site using Axios. Below, we can see an api
request being made using the API Key with the users station name as a parameter, to be able to add the Lat and Long for the location to the users new station.

```javascript
const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=APIKEY`;
    try {
      const result = await axios.get(requestUrl);
      const cityData = result.data;
```

documentation regarding axios can be found [here](https://axios-http.com/docs/intro) and information about the open weather API can be found [here](https://openweathermap.org/).

### Model View Controller

This project is designed to be entirely serverside using a template based on express.js provided by SETU. This project uses routing using paths and URL params to route to Javascript controller files
These controller files interact with Javascript model files to retrieve data from lowDb generated JSON files. The controller file then passes retrieved data to the view and compiles pages back to the user
based on handlebars templating and partials rendered.

### Cookies

This site utilises cookies to be able to allow users to add unique stations that only they can visualise on their personal dashboard. This is done using cookie-parser.

### Graphs

The temperature trend maps are created using Frappe charts, part of the Frappe framework. This is accessed via a script in the head of the handlebars based 
layout for the site.

```HTML
<script
      src="https://cdn.jsdelivr.net/npm/frappe-charts@1.2.4/dist/frappe-charts.min.iife.js"
    ></script>
```

This involves generating arrays of readings and labels by iterating through the reports lowDb
generated json file within the stationcontroller .js file. 

```Javascript
let tempTrend = [];
    let tempLabel = [];
    const reports = station.reports;
    for (let i = 0; i < station.reports.length; i++) {
      tempTrend.push(reports[i].temp);
      tempLabel.push(reports[i].date);
    }

    const viewData = {
      title: "station",
      station: station,
      tempTrend: tempTrend,
      tempLabel: tempLabel,
    };
```

Scripting within the tempGraph handlebars based partial then constructs the graph from these passed arrays.

```HTML
<div class="ui segment" id="chart1"></div>

<script>
  const data = {
    labels: [
      {{#each tempLabel}}
        "{{this}}",
      {{/each}}
    ],
    datasets: [
      {
        name: "Temp °C", type: "line",
        values: [
          {{#each tempTrend}}
            {{this}},
          {{/each}}
        ]
      }
    ]
  }

  const chart1 = new frappe.Chart("#chart1", {
    title: "Entered Reports Temperature Trends",
    data: data,
    type: 'line',
    height: 400,
    colours:['Red'],
  })
</script>

```

documentation on this can be found [here](https://frappe.io/).

### Dashboard Map

The location map within the users dashboard was created using the Leaflet Javascript Library. This is accessed via link and script within the head of the 
handlebars layout for the site.

```HTML
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      crossorigin=""
    />
    <script
      src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
      crossorigin=""
    ></script>
```

The map is generated within a map handlebars partial linked to the dashboard-view using a script. The current origin is set to the coordinates for Waterford Ireland, the origin of this 
site. Attempts have been made to generate map markers for each of a users station using iteration, but work is still in progress.

```HTML
<div id="map" class= "mb-3">
  <script>
  const map = L.map('map').setView([52.25833, -7.11194], 13);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)
  
    
    for (let i = 0; i<stations.length;i++)
      {
        marker = new L.marker([station[i].lat, station[i].long])
      }
    </script>
</div>
```
The map tile for the map is provided by [openstreetmap](https://www.openstreetmap.org/copyright). Documentation on the leaflet library can be found
[here](https://leafletjs.com/download.html).


## Documentation

Please find below some links to documentation for tools used in the development of this site

- [Bulma](https://bulma.io/documentation/start/responsiveness/)
- [lowDb](https://www.npmjs.com/package/lowdb/v/2.1.0)
- [Handlebars](https://handlebarsjs.com/guide/#what-is-handlebars)
- [Axios](https://axios-http.com/docs/intro)
- [Open Weather](https://openweathermap.org/)
- [Glitch](https://glitch.com/)
- [Express](https://expressjs.com/)
- [SETU Template](https://next.tutors.dev/course/web-dev-2-2023)
- [Cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [Frappe charts](https://frappe.io/)
- [Leaflet](https://leafletjs.com/download.html)

## Acknowledgements

Weather data for this site was provided using Open Weathers free weather API, their site can be found [here](https://openweathermap.org/). All icons for the website are license free images from [Iconify](https://iconify.design/).
Map tile for dashboard map was provided free by [open street map](https://www.openstreetmap.org/copyright);

## Licensing and copyright

This website was created as a university project and is not intended to be used commercially. All data is from free open source sites.


