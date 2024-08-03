import {stationStore} from "../models/station-store.js"
import {reportStore} from "../models/report-store.js"


export const reportController = {
  
  async index(request,response)
  {
const stationId = request.params.stationid;
const reportId = request.params.reportid;
console.log(`editing report ${reportId} from Station ${stationId}`)
const viewData = {
  title : "Edit Report",
  station : await stationStore.getStationById(stationId),
  report: await reportStore.getReportById(reportId),
};
    response.render("report-view",viewData)
    
  },
  
  async update(request,response){
    
    const stationId = request.params.stationid;
    const reportId = request.params.reportid;
    const updatedReport = {
      code: request.body.code,
      temp: request.body.temp,
      windSpeed: request.body.windSpeed,
      windDirection:request.body.windDirection,
      pressure:request.body.pressure
      
    };
    console.log(`updating report ${reportId} from station ${stationId}`)
    const report = await reportStore.getReportById(reportId);
    await reportStore.updateReport(report,updatedReport);
    response.redirect("/station/" + stationId);
  }
  
}