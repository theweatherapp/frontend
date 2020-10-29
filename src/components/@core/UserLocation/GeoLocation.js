// html5 geolocation API
export const GeoLocation = {
  isAvailable: navigator.geolocation,
  // () => Promise<{lat, lng}>
  request: () => new Promise((resolve, reject) => {
    const onSuccess = ({ coords: { latitude: lat, longitude: lng } }) =>
      resolve({ lat, lng })

    const onError = (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          reject("You should give permission to us to get your location.")
          break;
        case error.POSITION_UNAVAILABLE:
          reject("Unfortunatelly, location information is unavailable.")
          break;
        case error.TIMEOUT:
          reject("Unfortunatelly, location request timed out.")
          break;
        case error.UNKNOWN_ERROR:
          reject("An unknown error occurred while getting your location.")
          break;
      }
    }

    GeoLocation.isAvailable
      ? navigator.geolocation.getCurrentPosition(onSuccess, onError)
      : reject("Location is not supported")
  })
}