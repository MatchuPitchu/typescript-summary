import axios from 'axios'; // package for HTTP requests

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

// important to install npm package dotenv-webpack and add reference in webpack.config.js to be able to read .env variables
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

// in index.html I import global variable of google in <script> element of which TS isn't aware;
// without @types/google.maps npm package I need here "declare" to indicate TS that this global variable exists
// declare var google: any;

type GoogleResponse = {
  results: {geometry: {location: {lat: number, lng: number}}}[];
  status: 'OK' | 'ZERO_RESULTS'; // union type
}

const searchAddressHandler = async(e: Event) => {
  e.preventDefault();
  const address = addressInput.value;
  try {
    // encodeURI method converts user input saved in "address" to URL compatible string
    // using Generic Type to tell TS which response I expect
    const res = await axios.get<GoogleResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${GOOGLE_API_KEY}`)
    if(res.data.status !== 'OK') {
      throw new Error('Could not fetch location');
    }
    const coordinates = res.data.results[0].geometry.location
    const map = new google.maps.Map(document.getElementById('map')!, {
      center: coordinates,
      zoom: 15
    });
    new google.maps.Marker({position: coordinates, map: map});
  } catch (error) {
    console.log(error);
  }
}

form.addEventListener('submit', searchAddressHandler)