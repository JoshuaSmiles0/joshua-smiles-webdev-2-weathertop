import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import {reportStore} from "./report-store.js";

const db = initStore("stations");

export const stationStore = {
  async getAllStations() {
    await db.read();
    return db.data.stations;
  },

  async addStation(station) {
    await db.read();
    station._id = v4();
    db.data.stations.push(station);
    await db.write();
    return station;
  },

  async getStationById(id) {
    await db.read();
    const list = db.data.stations.find((station) => station._id === id);
    list.reports = await reportStore.getReportsByStationId(list._id);
    return list;
  },
  
    async findStationById(id) {
    await db.read();
    return db.data.stations.find((station) => station._id === id);
  },

  async deleteStationById(id) {
    await db.read();
    const index = db.data.stations.findIndex((station) => station._id === id);
    db.data.stations.splice(index, 1);
    await db.write();
  },

  async deleteAllStations() {
    db.data.stations = [];
    await db.write();
  },
  
  async getStationByUserId(userid) {
    await db.read();
    return db.data.stations.filter((station) => station.userId === userid) 
  },
  
    async updateStation(station, updatedStation) {
  station.title = station.title,
      station.lat = station.lat,
      station.long=station.long,
      station.userId=station.userId,
      station._id = station._id,
      station.weatherIcon = updatedStation.weatherIcon,
      station.weather= updatedStation.weather,
      station.currentTemp= updatedStation.currentTemp,
      station.currentTempFarenheit= updatedStation.currentTempFarenheit,
      station.maxTemp= updatedStation.maxTemp,
      station.minTemp= updatedStation.minTemp,
      station.tempIconPath= updatedStation.tempIconPath,
      station.currentWind= updatedStation.currentWind,
      station.currentWindMph= updatedStation.currentWindMph,
      station.maxWind= updatedStation.maxWind,
      station.minWind= updatedStation.minWind,
      station.windDirectionCompass= updatedStation.windDirectionCompass,
      station.windDirectionIcon= updatedStation.windDirectionIcon,
      station.windType= updatedStation.windType,
      station.currentPressure= updatedStation.currentPressure,
      station.maxPressure= updatedStation.maxPressure,
      station.minPressure= updatedStation.minPressure,
      station.windChill= updatedStation.windChill,

    await db.write();
  },
  
  
  //   async getStationByUserId(userid) {
  //   await db.read();
  //   const stations = db.data.stations.filter((station) => station.userId === userid);
  //   stations.reports = await reportStore.getReportsByStationId(stations._id);
  //   return stations;
  // },
  

  
};