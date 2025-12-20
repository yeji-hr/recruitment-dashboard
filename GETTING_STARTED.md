# 🚀 시작 가이드

채용 대시보드를 로컬 환경에서 실행하는 방법을 안내합니다.

## 📋 목차

1. [사전 준비](#사전-준비)
2. [설치 방법](#설치-방법)
3. [실행 방법](#실행-방법)
4. [문제 해결](#문제-해결)

## 🔧 사전 준비

### 필수 소프트웨어

다음 소프트웨어가 설치되어 있어야 합니다:

✅ **Node.js** (v18 이상)
- [Node.js 공식 사이트](https://nodejs.org/)에서 다운로드
- LTS(Long Term Support) 버전 권장
- 설치 확인: `node --version`

✅ **npm** (Node.js와 함께 설치됨)
- 설치 확인: `npm --version`

### 선택 사항

- **Git**: 버전 관리용
- **VS Code**: 추천 에디터

## 📥 설치 방법

### Step 1: 프로젝트 폴더로 이동

```bash
cd recruitment-dashboard/frontend
```

### Step 2: 의존성 패키지 설치

```bash
npm install
```

이 명령어는 다음 패키지들을 설치합니다:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- React Query
- Axios
- Lucide Icons
- 기타 필요한 라이브러리

설치 시간은 인터넷 속도에 따라 **2-5분** 정도 소요됩니다.

### Step 3: 환경 변수 설정 (선택)

`.env.local` 파일 생성:

```bash
# Windows (PowerShell)
New-Item .env.local

# Mac/Linux
touch .env.local
```

내용 추가:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

> **참고**: 현재는 Mock 데이터로 동작하므로 환경 변수 설정 없이도 실행 가능합니다.

## ▶️ 실행 방법

### 개발 서버 시작

```bash
npm run dev
```

성공적으로 실행되면 다음과 같은 메시지가 표시됩니다:

```
✓ Ready in 2.3s
○ Local:        http://localhost:3000
○ Network:      http://192.168.x.x:3000
```

### 브라우저에서 확인

1. 웹 브라우저를 엽니다
2. 주소창에 `http://localhost:3000` 입력
3. 채용 대시보드 화면이 나타납니다! 🎉

## 🎯 주요 페이지 둘러보기

### 1. 대시보드 (`http://localhost:3000/`)
- 채용 통계 확인
- 최근 지원자 목록 보기

### 2. 지원자 관리 (`http://localhost:3000/candidates`)
- 지원자 목록 조회
- 검색 및 필터링 테스트
- **"새 지원자 추가"** 버튼 클릭하여 등록

### 3. 채용 파이프라인 (`http://localhost:3000/pipeline`)
- 단계별 지원자 현황 확인
- 카드 클릭하여 상세 정보 보기

## 🛠 문제 해결

### ❌ 문제: `node` 명령을 찾을 수 없습니다

**해결 방법:**
1. Node.js가 설치되어 있는지 확인
2. 설치 후 **터미널을 재시작**
3. `node --version`으로 확인

### ❌ 문제: `npm install` 실패

**해결 방법:**
1. npm 캐시 정리:
   ```bash
   npm cache clean --force
   ```
2. `node_modules` 폴더 삭제 후 재설치:
   ```bash
   rm -rf node_modules
   npm install
   ```

### ❌ 문제: 포트 3000이 이미 사용 중

**해결 방법:**
1. 다른 포트로 실행:
   ```bash
   npm run dev -- -p 3001
   ```
2. 또는 3000번 포트를 사용하는 프로그램 종료

### ❌ 문제: 페이지가 제대로 보이지 않음

**해결 방법:**
1. 브라우저 캐시 삭제 (Ctrl + Shift + R)
2. 개발 서버 재시작:
   ```bash
   # Ctrl + C로 종료 후
   npm run dev
   ```

### ❌ 문제: TypeScript 에러

**해결 방법:**
1. 의존성 재설치:
   ```bash
   npm install
   ```
2. TypeScript 버전 확인:
   ```bash
   npm list typescript
   ```

## 💡 유용한 팁

### 🔥 Hot Reload
파일을 수정하면 자동으로 브라우저가 새로고침됩니다.
저장만 하면 바로 변경사항을 확인할 수 있어요!

### 🎨 코드 수정 시작하기
- `frontend/app/page.tsx` - 대시보드 메인 페이지
- `frontend/components/` - 컴포넌트 수정
- `frontend/app/globals.css` - 스타일 수정

### 📱 모바일 테스트
같은 Wi-Fi에 연결된 모바일에서:
```
http://[내 컴퓨터 IP]:3000
```
예: `http://192.168.0.10:3000`

## 🎓 다음 단계

✅ **로컬에서 실행 성공!**

이제 다음을 시도해보세요:
1. 지원자 추가해보기
2. 검색/필터링 기능 테스트
3. 파이프라인에서 지원자 확인
4. 코드 수정하며 배우기

## 📞 도움이 필요하신가요?

- 문제가 해결되지 않으면 이슈를 등록해주세요
- 스크린샷과 에러 메시지를 함께 올려주시면 더 빠르게 도와드릴 수 있습니다

---

**Happy Coding! 🚀**

