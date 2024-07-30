import {stationStore} from "../models/station-store.js"
import {reportStore} from "../models/report-store.js"

export const stationController = 
{
  async index(request, response)
  {
    const station = await stationStore.getStationById(request.params.id);
    const viewData = {
      title:"station",
      station: station,
    };
    
    response.render("station-view",viewData);
          
},
  
async addReport(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const newReport = {
      code: request.body.code,
      temp: request.body.temp,
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
    };
    console.log(`adding report ${newReport.code}`);
    await reportStore.addReport(station._id, newReport);
    response.redirect("/station/" + station._id);
  },


async deleteReport (request,response){
  const stationId = (request.params.stationid);
  const reportId = (request.params.reportid);
  console.log(`deleting report ${reportId} from ${stationId}`);
  await reportStore.deleteReport(reportId);
  response.redirect("/station/" + stationId);
},
  
};