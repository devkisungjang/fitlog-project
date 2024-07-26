<template>
  <Header />
  <div>
    <input
      type="text"
      v-model="keyword"
      placeholder="장소를 입력하세요"
      @keyup.enter="searchPlaces"
    />
    <button @click="searchPlaces">검색</button>
    <div
      id="map"
      style="width: 100%; height: 400px; border: 1px solid black"
    ></div>
    <ul>
      <li v-for="place in places" :key="place.id">{{ place.place_name }}</li>
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
      if (keyword.includes("헬스장") || keyword.includes("헬스클럽")) {
        ps.keywordSearch(keyword, this.placesSearchCB, {
          location: this.map.getCenter(),
        });
      } else {
        ps.keywordSearch("헬스장", this.placesSearchCB, {
          location: this.map.getCenter(),
        });
      }
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
        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`,
          zIndex: 1,
        });
        infowindow.open(this.map, marker);
      });
    },
  },
};
</script>

<style scoped>
div {
  padding: 10px;
}
ul li {
  list-style: none;
}
#map {
  width: 100%;
  height: 400px;
  border-radius: 30px;
  border-color: 1px solid black;
}
</style>
