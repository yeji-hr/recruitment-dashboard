# Vercel 배포 가이드

이 문서는 Recruitment Dashboard를 Vercel에 배포하는 방법을 설명합니다.

## 사전 준비

### 1. Vercel CLI 설치

```bash
npm install -g vercel
```

### 2. Vercel 로그인

```bash
vercel login
```

## Makefile을 사용한 배포

이 프로젝트는 Makefile을 통해 배포 프로세스를 간소화했습니다.

### 사용 가능한 명령어

```bash
# 도움말 보기
make help

# 의존성 설치
make install

# 개발 서버 실행
make dev

# 프로덕션 빌드
make build

# Vercel에 미리보기 배포 (테스트용)
make deploy

# Vercel에 프로덕션 배포
make deploy-prod

# 배포 상태 확인
make status

# 배포 로그 확인
make logs

# 빌드 파일 정리
make clean

# Vercel 프로젝트 초기화 (최초 1회)
make init
```

## 배포 단계별 가이드

### 최초 배포 (1회만)

1. **Vercel CLI 설치 및 로그인**
   ```bash
   npm install -g vercel
   vercel login
   ```

2. **프로젝트 초기화**
   ```bash
   make init
   ```
   
   또는
   
   ```bash
   vercel
   ```
   
   다음 질문에 답변:
   - Set up and deploy? → `Y`
   - Which scope? → 본인의 계정 선택
   - Link to existing project? → `N`
   - What's your project's name? → `recruitment-dashboard` (또는 원하는 이름)
   - In which directory is your code located? → `./frontend`
   - Want to override the settings? → `N`

### 일반적인 배포 워크플로우

#### 개발 및 테스트

```bash
# 의존성 설치
make install

# 로컬 개발 서버 실행
make dev
```

#### 미리보기 배포 (테스트)

코드 변경 후 테스트 환경에 배포:

```bash
make deploy
```

이 명령어는 미리보기 URL을 생성하여 변경사항을 테스트할 수 있게 합니다.

#### 프로덕션 배포

테스트 완료 후 실제 프로덕션 환경에 배포:

```bash
make deploy-prod
```

## 수동 배포 (Makefile 없이)

Makefile을 사용하지 않는 경우:

```bash
# 미리보기 배포
vercel

# 프로덕션 배포
vercel --prod
```

## GitHub를 통한 자동 배포 (권장)

### 1. GitHub 저장소 연결

Vercel 대시보드에서:
1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. "Add New Project" 클릭
3. GitHub 저장소 선택
4. 프로젝트 설정:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### 2. 자동 배포 설정

연결 후 자동으로:
- `main` 브랜치에 푸시 → 프로덕션 배포
- Pull Request 생성 → 미리보기 배포

## 환경 변수 설정

Vercel 대시보드에서 환경 변수 추가:

1. 프로젝트 선택
2. Settings → Environment Variables
3. 필요한 환경 변수 추가:
   - `NEXT_PUBLIC_API_URL`: API 엔드포인트 URL
   - 기타 필요한 환경 변수

## 배포 확인

배포 후 다음 명령어로 상태 확인:

```bash
# 배포 목록 확인
make status

# 로그 확인
make logs
```

## 커스텀 도메인 설정

1. Vercel 대시보드에서 프로젝트 선택
2. Settings → Domains
3. 도메인 추가 및 DNS 설정

## 문제 해결

### 빌드 실패

```bash
# 로컬에서 빌드 테스트
make build

# 빌드 파일 정리 후 재시도
make clean
make build
```

### 배포 실패

```bash
# 로그 확인
make logs

# Vercel CLI 재설치
npm uninstall -g vercel
npm install -g vercel
```

## 유용한 링크

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

## 빠른 참조

```bash
# 전체 프로세스 (설치 → 빌드 → 프로덕션 배포)
make all

# 일반적인 개발 워크플로우
make install    # 1회만
make dev        # 개발
make deploy     # 테스트 배포
make deploy-prod # 프로덕션 배포
```



