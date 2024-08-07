# FITLOG -Project V1.0
> Vue.js를 활용한 프로그레시브웹앱(PWA) 개발자 양성과정 [14th] 개인 프로젝트

> 개발기간 : 2024.07 ~ 2024.08
### 💻 github pages
link : <https://devkisungjang.github.io/fitlog-public/>

## 💁‍♂️ 프로젝트 소개
### "운동 기록일지" 프로그램

- 이 프로젝트는 Vue.js 프레임워크를 사용하여 Visual Studio Code에서 개발한 웹 사이트입니다.
- 페이지 간의 이동은 Vue Router를 사용하였고, 상태 관리는 Pinia를 이용하여 중앙 저장소에서 데이터를 관리하고 있습니다.
### 🛠️ 사용된 기술 스텍 
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=CSS3&logoColor=white"> <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat&logo=Javascript&logoColor=white"> <img src="https://img.shields.io/badge/Vue.js-4FC08D?style=flat&logo=Vue.js&logoColor=white"> <img src="https://img.shields.io/badge/Vuetify-1572B6?style=flat&logo=vuetify&logoColor=white"> <img src="https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=Figma&logoColor=white">

## 🗂️ 프로젝트 구조
```
src/
  ├── assets/        # 이미지, 아이콘 등 정적 파일
  │   └── favicon.ico            # 파비콘 파일
  │
  ├── components/    # 재사용 가능한 컴포넌트
  │
  ├── pages/         # 라우터를 통해 이동되는 페이지들
  │   ├── home.vue               # 원하는 날짜를 선택할 수 있는 화면 (기본값: 오늘)
  │   ├── exercise_selection.vue # 부위별로 운동 종목을 선택할 수 있는 화면
  │   ├── record.vue             # 운동 기록, 세트 관리, 일기, 몸무게 및 사진 기록 화면
  │   ├── complete.vue           # 기록된 내용을 간략하게 보여주는 화면
  │   ├── map.vue                # 주변 헬스장을 지도에서 확인할 수 있는 화면 (지오로케이션 및 검색 기능 포함)
  │
  ├── plugins/       # 플러그인 관련 설정 파일
  │   └── vuetify.js              # Vuetify 설정 파일
  │
  ├── store/         # Pinia를 사용한 상태 관리
  │
  ├── router/        # Vue Router 설정
  │
  └── App.vue        # 메인 앱 컴포넌트
```
## 💻 프로젝트 설치 및 실행
### 요구사항
- Node.js 설치
- npm 설치

### 설치 및 실행
1. 리포지토리 클론

```cd your-project```

```git clone https://github.com/devkisungjang/fitlog-project.git```


2. 종속성 설치

```npm install```

3. 개발 서버 실행 및 빌드

```npm run dev```

```npm run build```

