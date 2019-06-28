[![Netlify Status](https://api.netlify.com/api/v1/badges/0ef062da-4336-420c-89f0-61eb309120d5/deploy-status)](https://app.netlify.com/sites/lucid-lichterman-1717da/deploys)
<div align="center">

  [![Correctcode](./logo.png)](https://lucid-lichterman-1717da.netlify.com)
  ## Prography - 5분팀
  ### 코드 리뷰 사이트 CorrectCode

</div>

CorrectCode의 Front-end 레포지토리입니다.

```sh
git clone https://github.com/prography/five-minutes.git
cd five-minutes
npm install
npm start
```

# 개발
- Prettier을 이용합시다.
- tslint를 이용합시다.  

# 구조

```sh
src/
├── @types        # 라이브러리와 Global 타이핑 관리
├── actions       # Redux의 Action 들
├── api           # 백엔드로의 Api는 전부 이곳에서 관리
├── assets        # 로고와 아이콘 이미지 파일
├── components    # 도메인이 없는 UI 컴포넌트
├── constants     # 상수 들 ( ActionTypes, Codemirror 언어, 키보드 커맨드)
├── containers    # 도메인이 있는 컴포넌트
├── context       # Context API로 만들어진 컨텍스트
├── hooks         # Custom Hooks
├── models        # 데이터 모델링(Back-end와 sync)
├── pages         # Route의 페이지 별 컴포넌트
├── reducers      # Redux Reducer
├── sagas         # Redux-saga
├── stores        # Redux config
├── styles        # 공통, 라이브러리 style 및 normalize
├── utils         # utility 함수들
├── App.tsx       # Authentication과 Route를 관리하는 상위 컴포넌트
├── index.css     # base style
├── index.tsx     # 루트 컴포넌트. 초기 설정은 여기서
└──      # Worker server (search indexing; syncing with Algolia)
netlify.toml # Netlify 라우트 환경 설정
tsconfig.json # typescript config
```

