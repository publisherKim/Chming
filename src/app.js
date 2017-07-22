(function(global, daum, $) {
  'use strict';
  
  var mapContainer, mapOption, map, center, data;
  var count = 0;

  function init() {
    var mapContainer = document.getElementById('map'); // 지도를 표시할 div  
    var mapOption = {
      center: new daum.maps.LatLng(37.504301537, 127.0248342127), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
    };

    map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
    center = map.getCenter();
    global.map = map;

    
    setEventListener();
    getInitialData();
  }

  function setEventListener() {
    var btnNext = document.querySelector('.button-next');
    btnNext.addEventListener('click', showMyLocation);

    // daum.maps.event.addListener(map, 'center_changed', function() {
    //   map.setCenter(center);
    // });
  }
  function getInitialData() {
    var url = 'data.json';
    $.get(url, function(_data) {
      // console.log('data:', data);
      data = _data;

      var imageSize = new daum.maps.Size(24, 35);
      // 마커 이미지의 이미지 주소입니다
      var imageSrc = "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize);
      
      for(var i = 0, length = data.length; i < length; i++) {
        var marker = new daum.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: new daum.maps.LatLng(data[i].position.latitude, data[i].position.longitude), // 마커를 표시할 위치
          title: data[i].group_name + '\n' + data[i].group_description, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage // 마커 이미지 
        });
      }
    });
  }

  function showMyLocation() {
    var watchID = navigator.geolocation.watchPosition(function(position) {
      // console.log(position.coords.latitude, position.coords.longitude);
      map.setCenter(new daum.maps.LatLng(position.coords.latitude, position.coords.longitude));
      // map.setCenter(new daum.maps.LatLng(37.508352837, 127.0307565127));
    });
  }

  function panTo() {
    count++;
    if (count > 9) {
      count = 0;
    }
    center = new daum.maps.LatLng(data[count].position.latitude, data[count].position.longitude);
    map.panTo(center);
  }

  init();
})(window, window.daum, window.jQuery);
