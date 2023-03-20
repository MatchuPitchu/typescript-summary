"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const form = document.querySelector('form');
const addressInput = document.getElementById('address');
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const searchAddressHandler = (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const address = addressInput.value;
    try {
        const res = yield axios_1.default.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${GOOGLE_API_KEY}`);
        if (res.data.status !== 'OK') {
            throw new Error('Could not fetch location');
        }
        const coordinates = res.data.results[0].geometry.location;
        const map = new google.maps.Map(document.getElementById('map'), {
            center: coordinates,
            zoom: 15
        });
        new google.maps.Marker({ position: coordinates, map: map });
    }
    catch (error) {
        console.log(error);
    }
});
form.addEventListener('submit', searchAddressHandler);
//# sourceMappingURL=app.js.map