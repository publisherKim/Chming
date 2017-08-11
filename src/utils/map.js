export default {
  install: (Vue, options) => {
    
    let maps = window.daum.maps;
    Vue.maps = maps;
    Vue.prototype.$maps = maps;

    let searchOptions = options.searchOptions;
    let imageSrc = options.markerImage;
    let imageSize = new maps.Size(options.markerImageSize.width, options.markerImageSize.height);
    let markerImage = new maps.MarkerImage(imageSrc, imageSize);
    let defaultLocation = new maps.LatLng(options.initLocation.lat, options.initLocation.lng);
    let places = new maps.services.Places();
    let geocoder = new maps.services.Geocoder();
    let polyline = new maps.Polyline();

    maps.getDefaultLocation = function() {
      return defaultLocation;
    };
    maps.getMarkerImage = function() {
      return markerImage;
    };
    maps.getPlaces = function() {
      return places;
    };
    maps.getGeocoder = function() {
      return geocoder;
    };
    maps.getPolyline = function() {
      return polyline;
    };
    maps.getSearchOptions = function() {
      return searchOptions;
    };
  },
};

