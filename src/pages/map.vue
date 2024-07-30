<template>
  <Header />
  <div class="container">
    <div class="search-bar">
      <input
        type="text"
        v-model="keyword"
        placeholder="장소를 입력하세요"
        @keyup.enter="searchPlaces"
      />
      <button @click="searchPlaces">검색</button>
    </div>
    <div id="map"></div>
    <ul class="places-list">
      <li v-for="place in places" :key="place.id" class="place-item">
        {{ place.place_name }}
      </li>
    </ul>
  </div>
</template>

<script>
import Header from "@/components/header.vue";

export default {
  data() {
    return {
      keyword: "헬스장",
      map: null,
      places: [],
      infowindow: null, // 인포윈도우 객체를 저장하기 위한 변수
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const locPosition = new kakao.maps.LatLng(lat, lon);

          const container = document.getElementById("map");
          const options = {
            center: locPosition,
            level: 3,
          };
          this.map = new kakao.maps.Map(container, options);
          this.searchPlaces();
        });
      } else {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(37.566826, 126.9786567),
          level: 3,
        };
        this.map = new kakao.maps.Map(container, options);
        this.searchPlaces();
      }
    },
    searchPlaces() {
      const ps = new kakao.maps.services.Places();
      const keyword = this.keyword;
      ps.keywordSearch(keyword, this.placesSearchCB, {
        location: this.map.getCenter(),
      });
    },
    placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        this.places = data;
        const bounds = new kakao.maps.LatLngBounds();
        data.forEach((place) => {
          this.displayMarker(place);
          bounds.extend(new kakao.maps.LatLng(place.y, place.x));
        });
        this.map.setBounds(bounds);
      }
    },
    displayMarker(place) {
      const marker = new kakao.maps.Marker({
        map: this.map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, "click", () => {
        // 이미 인포윈도우가 열려 있으면 닫기
        if (this.infowindow) {
          this.infowindow.close();
        }

        // 닫기 아이콘이 포함된 인포윈도우 내용
        const content = `
          <div style="padding:5px;font-size:12px;position:relative;">
            ${place.place_name}
            <span
              style="position:absolute; top:5px; left:135px; cursor:pointer;"
              onclick="closeInfowindow()"
            >
              &#10006;
            </span>
          </div>
        `;

        // 인포윈도우 생성
        this.infowindow = new kakao.maps.InfoWindow({
          content,
          zIndex: 1,
        });
        this.infowindow.open(this.map, marker);

        // 닫기 버튼을 클릭 시 인포윈도우를 닫는 함수 설정
        window.closeInfowindow = () => {
          this.infowindow.close();
        };
      });
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 800px;
  margin: auto;
}
.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.search-bar input {
  flex-grow: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.search-bar button {
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
.search-bar button:hover {
  background-color: #0056b3;
}
#map {
  width: 100%;
  height: 400px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}
.places-list {
  list-style: none;
  padding: 0;
}
.place-item {
  background: #f9f9f9;
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
