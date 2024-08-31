import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { reportStore } from "./report-store.js";

//initalises stations.json file using lowdb
const db = initStore("stations");

//initialises stationStore object
export const stationStore = {
  async getAllStations() {
    await db.read();
    return db.data.stations;
  },

  //Reads stationsDb. Takes station as input. Adds UUID from lowDB to station. adds station to DB

  async addStation(station) {
    await db.read();
    station._id = v4();
    db.data.stations.push(station);
    await db.write();
    return station;
  },

  /*Reads stationsDb. Takes stationId as input. filters Db where stationId = database stationId. Calls reportStore.getReportsByStationId
  and returns list of reports*/

  async getStationById(id) {
    await db.read();
    const list = db.data.stations.find((station) => station._id === id);
    list.reports = await reportStore.getReportsByStationId(list._id);
    return list;
  },

  //Reads stationsDb. Takes stationId as input. filters Db where stationId = database stationId and return station.
  async findStationById(id) {
    await db.read();
    return db.data.stations.find((station) => station._id === id);
  },

  /*Reads stationsDb. Takes stationId as input. filters Db where stationId = database stationId and retrieves index.
  deletes report from DB using splice from index position and deleting 1 position.
  */
  async deleteStationById(id) {
    await db.read();
    const index = db.data.stations.findIndex((station) => station._id === id);
    db.data.stations.splice(index, 1);
    await db.write();
  },

  //replaces stations contents with blank array

  async deleteAllStations() {
    db.data.stations = [];
    await db.write();
  },

  //Reads stationsDb. Takes userId as input. filters Db where userId = database userId and return station.
  async getStationByUserId(userid) {
    await db.read();
    return db.data.stations.filter((station) => station.userId === userid);
  },

  /*takes station and updated station as parameters. sets station.details with updatedStation.details and writes to DB.
   */
  async updateStation(station, updatedStation) {
    (station.title = station.title),
      (station.country = station.country),
      (station.lat = station.lat),
      (station.long = station.long),
      (station.userId = station.userId),
      (station._id = station._id),
      (station.weatherIcon = updatedStation.weatherIcon),
      (station.weather = updatedStation.weather),
      (station.currentTemp = updatedStation.currentTemp),
      (station.currentTempFarenheit = updatedStation.currentTempFarenheit),
      (station.maxTemp = updatedStation.maxTemp),
      (station.minTemp = updatedStation.minTemp),
      (station.tempIconPath = updatedStation.tempIconPath),
      (station.currentWind = updatedStation.currentWind),
      (station.currentWindMph = updatedStation.currentWindMph),
      (station.maxWind = updatedStation.maxWind),
      (station.minWind = updatedStation.minWind),
      (station.windDirectionCompass = updatedStation.windDirectionCompass),
      (station.windDirectionIcon = updatedStation.windDirectionIcon),
      (station.windType = updatedStation.windType),
      (station.currentPressure = updatedStation.currentPressure),
      (station.maxPressure = updatedStation.maxPressure),
      (station.minPressure = updatedStation.minPressure),
      (station.windChill = updatedStation.windChill),
      await db.write();
  },
};
