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
    <div class="places-grid">
      <div
        v-for="place in places"
        :key="place.id"
        class="place-card"
        @click="listItemClick(place)"
      >
        <div class="place-details">
          <div class="place-name">{{ place.place_name }}</div>
          <div class="place-phone">{{ place.phone }}</div>
        </div>
      </div>
    </div>
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
          level: 8,
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
        if (this.infowindow) {
          this.infowindow.close();
        }

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

        this.infowindow = new kakao.maps.InfoWindow({
          content,
          zIndex: 1,
        });
        this.infowindow.open(this.map, marker);

        window.closeInfowindow = () => {
          this.infowindow.close();
        };
      });
    },
    listItemClick(place) {
      const position = new kakao.maps.LatLng(place.y, place.x);
      this.map.setCenter(position);
      this.map.setLevel(3);
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
  border: 1px solid #ddd;
  outline: none;
  transition: border-color 0.3s ease;
}

.search-bar input:focus {
  border-color: #0099f7;
}

.search-bar button {
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #0099f7;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-bar button:hover {
  background-color: #007acc;
}

#map {
  width: 100%;
  height: 400px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.places-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.place-card {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.place-card:hover {
  background-color: #f1f1f1;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.place-details {
  display: flex;
  flex-direction: column;
}

.place-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.place-phone {
  font-size: 14px;
  color: #666;
}
</style>
