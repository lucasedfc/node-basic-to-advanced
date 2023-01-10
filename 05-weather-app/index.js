import * as dotenv from 'dotenv';
dotenv.config();
import {
  inquirerMenu,
  pause,
  placeList,
  readInput,
} from './helpers/inquirer.js';
import { Searchs } from './models/searchs.js';

const main = async () => {
  let option;
  const searchs = new Searchs();

  do {
    option = await inquirerMenu();

    switch (option) {
      case 1:
        //? input message
        const search = await readInput('Place or City:');
        //? search places
        const places = await searchs.city(search);
        //? select place
        const id = await placeList(places);

        if(id === '0') continue;

        //? search weather data
        const placeSelected = places.find((p) => p.id === id);
        searchs.addHistory(placeSelected.name);
        const weather = await searchs.weatherByPlace(
          placeSelected.lat,
          placeSelected.lng
        );
        //? show weather data
        console.clear();
        console.log('\nInformation of city\n'.green);
        console.log('City:', placeSelected.name);
        console.log('Lat:', placeSelected.lat);
        console.log('Long:', placeSelected.lng);
        console.log('Temperature:', weather.temp);
        console.log('Min:', weather.min);
        console.log('Max:', weather.max);
        console.log('Description:', weather.desc);
        break;
      case 2:
          searchs.capitalizeHistory.forEach((place, i) => {
            const idx = `${ i + 1 }`.green
            console.log(`${idx} ${place}`);
          })
        
        break;

      default:
        break;
    }

    if (option !== 0) await pause();
  } while (option !== 0);
};

main();
