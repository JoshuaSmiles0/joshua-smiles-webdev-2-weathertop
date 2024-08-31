import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";

export const reportController = {
  //retrieves stationId and reportId from URL params. creates viewData object from these then renders report-view with this

  async index(request, response) {
    const stationId = request.params.stationid;
    const reportId = request.params.reportid;
    console.log(`editing report ${reportId} from Station ${stationId}`);
    const viewData = {
      title: "Edit Report",
      station: await stationStore.getStationById(stationId),
      report: await reportStore.getReportById(reportId),
    };
    response.render("report-view", viewData);
  },

  /*retrieves stationId and reportId from URL params. Creates updated report object from data in request input by user in form. 
  retrieves report from reportStore using reportId. Calls reportStore.updateReport using updated report object and retrieved report
  object. redirects user to station updateReport route, triggering update of station details using new information from updated report
  */

  async update(request, response) {
    const stationId = request.params.stationid;
    const reportId = request.params.reportid;
    const updatedReport = {
      code: request.body.code,
      temp: request.body.temp,
      windSpeed: request.body.windSpeed,
      windDirection: request.body.windDirection,
      pressure: request.body.pressure,
    };
    console.log(`updating report ${reportId} from station ${stationId}`);
    const report = await reportStore.getReportById(reportId);
    const station = await stationStore.findStationById(stationId);
    await reportStore.updateReport(report, updatedReport);
    response.redirect("/dashboard/updateStation/" + station._id);
  },
};
