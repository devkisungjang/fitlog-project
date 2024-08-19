# FITLOG -Project
> 이 프로젝트는 Vue.js를 활용한 프로그레시브웹앱(PWA) 개발자 양성과정 [14th]에서 개발한 개인 프로젝트입니다.

> 개발기간 : 2024.07 ~ 2024.08

> github pages : <https://devkisungjang.github.io/fitlog-public/>


## 💁‍♂️ 프로젝트 소개
- "FITLOG"는 운동을 보다 체계적으로 기록하고, 몸의 변화를 추적할 수 있는 피트니스 관리 애플리케이션입니다. 직관적인 인터페이스로 사용자는 운동 기록을 쉽게 입력하고, 분석할 수 있습니다.
- 페이지 간의 이동은 Vue Router를 사용하였고, 상태 관리는 Pinia를 이용하여 중앙 저장소에서 데이터를 관리하고 있습니다.

## 🎯 프로젝트 목표
이 프로젝트는 사용자들이 운동을 더 효율적으로 관리하고 목표에 도달할 수 있도록 돕기 위한 것입니다. 사용자 경험을 최우선으로 고려하여 간단하면서도 강력한 기능을 제공합니다.
### 🛠️ 사용된 기술 스텍 
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=CSS3&logoColor=white"> <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat&logo=Javascript&logoColor=white"> <img src="https://img.shields.io/badge/Vue.js-4FC08D?style=flat&logo=Vue.js&logoColor=white"> <img src="https://img.shields.io/badge/Vuetify-1572B6?style=flat&logo=vuetify&logoColor=white"> <img src="https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=Figma&logoColor=white">

## 🗂️ 프로젝트 구조
```
src/
  ├── assets/        # 이미지, 아이콘 등 정적 파일
  │   └── favicon.ico            # 파비콘 파일
  │
  ├── components/    # 재사용 가능한 컴포넌트
  │   ├── bottom_nav.vue         # 바텀시트
  │   ├── header.vue             # 헤더
  │   └── stopwatch.vue          # 스톱워치 기능이 담긴 컴포넌트
  │
  ├── pages/         # 라우터를 통해 이동되는 페이지들
  │   ├── home.vue               # 원하는 날짜를 선택할 수 있는 화면 (기본값: 오늘)
  │   ├── exercise_selection.vue # 부위별로 운동 종목을 선택할 수 있는 화면
  │   ├── record.vue             # 운동 기록, 세트 관리, 일기, 몸무게 및 사진 기록 화면
  │   ├── complete.vue           # 기록된 내용을 간략하게 보여주는 화면
  │   └── map.vue                # 주변 헬스장을 지도에서 확인할 수 있는 화면 (지오로케이션 및 검색 기능 포함)
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

## ✨ 주요 기능
- 📅 운동 일정 관리: 원하는 날짜에 맞춰 운동 계획을 세우고, 기록을 남길 수 있습니다.
- 💪 운동 선택: 운동 부위별로 다양한 운동 종목을 추가하고 관리합니다.
- 📊 세트 & 반복 관리: 운동 기록을 통해 각 운동의 세트, 횟수를 추적하세요.
- 📸 몸무게 및 사진 기록: 몸무게와 함께 사진을 기록하여 트랜스포메이션을 확인하세요.
- 🗺️ 지도 기반 헬스장 검색: 내 위치 기반으로 주변 헬스장을 검색하고, 길을 찾아가세요.
- ⏱️ 스톱워치: 총 운동 시간을 측정하여 효율적인 트레이닝을 도와줍니다.

## 🔧 향후 추가 기능 및 개선 사항

- **구글 소셜 로그인 연동** (Supabase 사용):
현재 로그인 기능이 추가될 예정이며, 이를 위해 Supabase를 통해 구글 소셜 로그인을 구현할 계획입니다. 이를 통해 사용자는 Google 계정을 이용하여 간편하게 로그인할 수 있으며, 사용자 데이터 관리가 더욱 원활해질 것입니다.
- **운동 기록 관리**:
로그인한 사용자만 운동 기록을 남길 수 있도록 제한을 둘 계획입니다. 이를 통해 사용자별로 개별 기록이 저장되며, 비회원의 기록 접근을 방지하여 보안성을 높일 것입니다.
- **이전 운동 기록 확인 및 수정**:
사용자가 이전 날짜에 기록한 운동을 다시 확인하고, 잘못된 기록을 수정할 수 있는 기능을 추가할 예정입니다. 이를 통해 사용자는 자신의 운동 기록을 자유롭게 편집하고 관리할 수 있게 됩니다.
- **Supabase 데이터베이스 연동**:
운동 기록, 사용자 정보 등을 Supabase의 데이터베이스에 저장하여 클라우드 기반으로 사용자 데이터를 안전하게 관리할 수 있도록 할 계획입니다. 

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


