# 🎯 채용 대시보드 (Recruitment Dashboard)

채용 프로세스를 효율적으로 관리할 수 있는 풀스택 웹 애플리케이션입니다.

## 📸 미리보기

✨ **주요 기능**
- 📊 실시간 채용 현황 대시보드
- 👥 지원자 관리 (등록, 수정, 삭제)
- 🔍 지원자 검색 및 필터링
- 📋 칸반 스타일 채용 파이프라인
- 📈 단계별 채용 통계

## 🛠 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Backend (예정)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma

## 📁 프로젝트 구조

```
recruitment-dashboard/
├── frontend/                 # Next.js 프론트엔드
│   ├── app/                 # 페이지 라우팅
│   ├── components/          # React 컴포넌트
│   ├── hooks/               # 커스텀 훅
│   ├── services/            # API 서비스
│   ├── types/               # TypeScript 타입
│   └── utils/               # 유틸리티 함수
│
└── backend/                 # Express 백엔드 (추후 구현)
    ├── src/
    │   ├── controllers/     # 컨트롤러
    │   ├── routes/          # API 라우트
    │   ├── models/          # 데이터 모델
    │   └── middlewares/     # 미들웨어
    └── prisma/              # 데이터베이스 스키마
```

## 🚀 시작하기

### 사전 요구사항

- Node.js 18+ 설치
- npm 또는 yarn

### Frontend 설치 및 실행

```bash
# 1. 프로젝트 폴더로 이동
cd recruitment-dashboard/frontend

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 환경 변수 설정

`frontend/.env.local` 파일을 생성하고:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📄 주요 페이지

| 페이지 | URL | 설명 |
|--------|-----|------|
| 대시보드 | `/` | 채용 현황 및 통계 |
| 지원자 목록 | `/candidates` | 전체 지원자 관리 |
| 지원자 등록 | `/candidates/new` | 새 지원자 추가 |
| 지원자 상세 | `/candidates/:id` | 지원자 상세 정보 |
| 채용 파이프라인 | `/pipeline` | 단계별 지원자 현황 |
| 설정 | `/settings` | 시스템 설정 |

## ✨ 주요 기능

### 1. 대시보드
- 📊 전체 지원자 수, 단계별 현황 통계
- 📈 단계별 진행률 차트
- 👥 최근 지원자 목록

### 2. 지원자 관리
- ➕ 지원자 등록 (이름, 이메일, 연락처, 포지션)
- ✏️ 지원자 정보 수정
- 🗑️ 지원자 삭제
- 🔍 이름/이메일로 검색
- 🎯 포지션 및 상태별 필터링

### 3. 채용 파이프라인
- 📋 칸반 보드 형식
- 🔄 단계별 지원자 카드
- 👆 클릭하여 상세 정보 확인

### 4. 상태 관리
- 🟡 서류접수
- 🔵 서류심사
- 🟣 1차면접
- 🟪 2차면접
- 🟢 최종합격
- 🔴 불합격

## 🎨 컴포넌트 구조

### UI 컴포넌트
- `Button` - 다양한 variant의 버튼
- `Input` - 레이블과 에러 메시지 지원
- `Select` - 선택 드롭다운
- `Modal` - 모달 다이얼로그
- `Card` - 카드 컨테이너
- `Table` - 반응형 테이블

### 도메인 컴포넌트
- `CandidateTable` - 지원자 목록 테이블
- `CandidateForm` - 지원자 폼
- `StatusBadge` - 상태 뱃지
- `FilterBar` - 검색/필터 바
- `PipelineBoard` - 파이프라인 보드
- `StatCard` - 통계 카드

## 📦 빌드

```bash
cd frontend
npm run build
npm start
```

## 🔧 개발 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린트 실행
npm run lint
```

## 📝 현재 상태

✅ **완료된 기능**
- Frontend 프로젝트 구조 완성
- 모든 페이지 UI 구현
- TypeScript 타입 정의
- 공통 컴포넌트 라이브러리
- Mock 데이터로 동작 확인

⏳ **진행 예정**
- Backend API 구현
- 데이터베이스 연동
- 실제 CRUD 작업
- 파일 업로드 기능
- 드래그 앤 드롭 파이프라인
- 사용자 인증/권한

## 🎯 로드맵

### Phase 1: Backend 개발
- [ ] Express 서버 구축
- [ ] PostgreSQL 데이터베이스 설정
- [ ] REST API 엔드포인트 구현
- [ ] API 테스트

### Phase 2: 프론트-백 연동
- [ ] API 서비스 함수 연동
- [ ] 실제 데이터 CRUD 작업
- [ ] 에러 핸들링 개선

### Phase 3: 고급 기능
- [ ] 파일 업로드 (이력서, 포트폴리오)
- [ ] 드래그 앤 드롭 파이프라인
- [ ] 실시간 업데이트 (WebSocket)
- [ ] 이메일 알림
- [ ] 데이터 엑스포트 (CSV, Excel)

### Phase 4: 배포
- [ ] 프론트엔드 배포 (Vercel)
- [ ] 백엔드 배포 (Railway/Render)
- [ ] 데이터베이스 배포
- [ ] CI/CD 파이프라인

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch
3. Commit your Changes
4. Push to the Branch
5. Open a Pull Request

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 등록해주세요.

## 📄 라이선스

This project is licensed under the MIT License.

---

**Made with ❤️ using Next.js, TypeScript & Tailwind CSS**

