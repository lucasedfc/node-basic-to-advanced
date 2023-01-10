import axios from 'axios';
import * as fs from 'fs';

class Searchs {
  history = [];
  dbPath = './db/database.json';

  constructor() {
    //TODO: read from DB if exist
    this.readDB();
  }

  get capitalizeHistory() {
    const capitalizedHistory = this.history.map((item) => {
      return item
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    });

    return capitalizedHistory;
  }

  get getMapboxParams() {
    return {
      language: 'en',
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
    };
  }

  get getWeatherParams() {
    return {
      units: 'metric',
      appid: process.env.OPENWEATHER_KEY,
    };
  }

  async city(place = '') {
    //TODO: http request

    const httpInstance = axios.create({
      baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
      params: this.getMapboxParams,
    });

    try {
      const { data } = await httpInstance.get();
      return data.features.map((place) => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }));

      return [];
    } catch (error) {
      return [];
    }
  }

  async weatherByPlace(lat, lon) {
    // instace axios
    const httpInstance = axios.create({
      baseURL: `https://api.openweathermap.org/data/2.5/weather`,
      params: { ...this.getWeatherParams, lat, lon },
    });
    try {
      const { data } = await httpInstance.get();
      const { main, weather } = data;

      return {
        desc: weather[0].description,
        temp: main.temp,
        min: main.temp_min,
        max: main.temp_max,
      };
    } catch (error) {
      console.error(error);
    }
  }

  addHistory(place = '') {
    if (this.history.includes(place.toLocaleLowerCase())) {
      return;
    }

    this.history = this.history.splice(0, 5);

    this.history.unshift(place.toLocaleLowerCase());
    this.saveDB();
  }

  saveDB() {
    const payload = {
      history: this.history,
    };
    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  readDB() {
    if (!fs.existsSync(this.dbPath)) return;
    
    const info = fs.readFileSync(this.dbPath, {
      encoding: 'utf8',
    });
    const data = JSON.parse(info);
    this.history = data.history;
  }
}

export { Searchs };
