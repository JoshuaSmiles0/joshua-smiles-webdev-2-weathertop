import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";

//initalises reports.json file using lowdb
const db = initStore("reports");

//initialises reportStore object
export const reportStore = {
  async getAllReports() {
    await db.read();
    return db.data.reports;
  },

  /*Reads reportsDb. Takes report and stationId as input. Adds UUID from lowDB to report. adds stationId and UUID to report then 
adds report to DB
*/
  async addReport(stationId, report) {
    await db.read();
    report._id = v4();
    report.stationid = stationId;
    db.data.reports.push(report);
    await db.write();
    return report;
  },

  //Reads reportsDb. Takes stationId as input. filters Db where stationId = database stationId and returns report.

  async getReportsByStationId(id) {
    await db.read();
    return db.data.reports.filter((report) => report.stationid === id);
  },

  //Reads reportsDb. Takes reportId as input. filters Db where reportId = database reportId and returns report.

  async getReportById(id) {
    await db.read();
    return db.data.reports.find((report) => report._id === id);
  },

  /*Reads reportsDb. Takes reportId as input. filters Db where reportId = database reportId and retrieves index.
  deletes report from DB using splice from index position and deleting 1 position.
  */
  async deleteReport(id) {
    await db.read();
    const index = db.data.reports.findIndex((report) => report._id === id);
    db.data.reports.splice(index, 1);
    await db.write();
  },

  //replaces reports contents with blank array

  async deleteAllReports() {
    db.data.reports = [];
    await db.write();
  },

  /*takes report and updated report as parameters. sets report.details with updatedReport.details and writes to DB.
   */

  async updateReport(report, updatedReport) {
    report.code = updatedReport.code;
    report.temp = updatedReport.temp;
    report.windDirection = updatedReport.windDirection;
    report.windSpeed = updatedReport.windSpeed;
    report.pressure = updatedReport.pressure;

    await db.write();
  },
};
