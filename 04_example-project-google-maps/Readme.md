# Practice Exercise TypeScript - build a "Select & Share a Place" App (incl. Google Maps)

> You will need a personal Google API Key - make sure that you keep the key secret, e.g. save it in an .env file, and add this file to .gitignore to exclude it from publication via GitHub

- follow Google Geocoding API instructions: https://developers.google.com/maps/documentation/geocoding/overview
- using Axios npm package for HTTP requests
- install global types for Google Maps API with e.g. npm package npm install @types/google.maps (https://www.npmjs.com/package/@types/google.maps)
- using dotenv-webpack and add plugin in webpack.config.js in order to allow defined .env variables to use with `process.env.VARIABLE_NAME`
