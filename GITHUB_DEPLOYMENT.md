# GitHub + Vercel 자동 배포 가이드

이 문서는 GitHub와 Vercel을 연동하여 자동 배포를 설정하는 방법을 설명합니다.

## 🚀 단계별 가이드

### 1단계: GitHub 저장소 생성

1. [GitHub](https://github.com)에 로그인
2. 오른쪽 상단의 `+` 버튼 클릭 → `New repository` 선택
3. 저장소 정보 입력:
   - **Repository name**: `recruitment-dashboard` (또는 원하는 이름)
   - **Description**: `채용 관리 대시보드`
   - **Public** 또는 **Private** 선택
   - ⚠️ **Initialize this repository** 옵션은 체크하지 마세요
4. `Create repository` 클릭

### 2단계: 로컬 Git 저장소 초기화 및 푸시

터미널에서 프로젝트 루트 디렉토리에서 다음 명령어를 실행하세요:

```bash
# Git 저장소 초기화
git init

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: 채용 관리 대시보드"

# GitHub 저장소 연결 (본인의 GitHub 사용자명으로 변경하세요)
git remote add origin https://github.com/YOUR_USERNAME/recruitment-dashboard.git

# main 브랜치로 변경 (필요한 경우)
git branch -M main

# GitHub에 푸시
git push -u origin main
```

> **참고**: `YOUR_USERNAME`을 본인의 GitHub 사용자명으로 변경하세요.

#### Windows에서 Git 설치가 필요한 경우

```powershell
# winget 사용 (Windows 10/11)
winget install Git.Git

# 또는 https://git-scm.com/download/win 에서 다운로드
```

### 3단계: Vercel 계정 생성 및 GitHub 연결

1. [Vercel](https://vercel.com) 접속
2. **"Continue with GitHub"** 클릭하여 GitHub 계정으로 가입
3. Vercel이 GitHub 저장소에 접근할 수 있도록 권한 승인

### 4단계: Vercel에서 프로젝트 배포

1. Vercel 대시보드에서 **"Add New..."** → **"Project"** 클릭
2. GitHub 저장소 목록에서 `recruitment-dashboard` 찾기
3. **"Import"** 클릭
4. 프로젝트 설정:
   - **Framework Preset**: `Next.js` (자동 감지됨)
   - **Root Directory**: `frontend` 선택
   - **Build Command**: `npm run build` (기본값)
   - **Output Directory**: `.next` (기본값)
   - **Install Command**: `npm install` (기본값)

5. **"Deploy"** 클릭

### 5단계: 배포 완료! 🎉

- 첫 배포가 자동으로 시작됩니다 (약 2-3분 소요)
- 배포 완료 후 Vercel이 제공하는 URL로 접속 가능
- 예: `https://recruitment-dashboard-xxx.vercel.app`

## ⚡ 자동 배포 작동 방식

설정 완료 후:

### 프로덕션 배포
```bash
# main 브랜치에 푸시하면 자동으로 프로덕션 배포
git add .
git commit -m "기능 추가"
git push origin main
```
→ 자동으로 프로덕션 환경에 배포됩니다!

### 미리보기 배포
```bash
# 다른 브랜치에서 작업
git checkout -b feature/new-feature
git add .
git commit -m "새 기능 개발 중"
git push origin feature/new-feature
```
→ Pull Request 생성 시 자동으로 미리보기 URL 생성!

## 🔧 환경 변수 설정

API 엔드포인트나 비밀 키가 필요한 경우:

1. Vercel 대시보드에서 프로젝트 선택
2. **Settings** → **Environment Variables**
3. 변수 추가:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: API URL
   - **Environment**: Production, Preview, Development 선택
4. **Save** 클릭
5. 재배포 (자동으로 재배포되거나 수동으로 재배포)

## 📱 커스텀 도메인 연결

무료로 커스텀 도메인을 연결할 수 있습니다:

1. Vercel 프로젝트 → **Settings** → **Domains**
2. 도메인 입력 (예: `mydashboard.com`)
3. DNS 설정 안내를 따라 설정
4. 완료!

## 🔄 일반적인 워크플로우

### 개발 → 테스트 → 배포

```bash
# 1. 새 기능 브랜치 생성
git checkout -b feature/add-filter

# 2. 코드 작업
# ... 개발 작업 ...

# 3. 변경사항 커밋
git add .
git commit -m "필터 기능 추가"

# 4. GitHub에 푸시
git push origin feature/add-filter

# 5. GitHub에서 Pull Request 생성
# → Vercel이 자동으로 미리보기 URL 생성

# 6. 테스트 완료 후 main에 병합
# → 자동으로 프로덕션 배포!
```

## 📊 배포 상태 확인

### Vercel 대시보드에서
- [Vercel Dashboard](https://vercel.com/dashboard)
- 프로젝트 클릭 → **Deployments** 탭에서 모든 배포 내역 확인

### GitHub에서
- Pull Request에 Vercel 봇이 댓글로 미리보기 URL 자동 추가
- Commit 상태에서 배포 상태 확인 가능

## 🛠️ 문제 해결

### 빌드 실패 시

1. Vercel 대시보드에서 **Deployments** 클릭
2. 실패한 배포 선택
3. **Build Logs** 확인
4. 오류 수정 후 다시 푸시

### 로컬에서 빌드 테스트

```bash
cd frontend
npm install
npm run build
```

## 🎯 빠른 명령어 참고

```bash
# 저장소 복제 (새 환경에서)
git clone https://github.com/YOUR_USERNAME/recruitment-dashboard.git
cd recruitment-dashboard

# 변경사항 푸시
git add .
git commit -m "커밋 메시지"
git push origin main

# 새 브랜치 작업
git checkout -b feature/new-feature
# ... 작업 ...
git push origin feature/new-feature

# 브랜치 목록 보기
git branch -a

# main 브랜치로 돌아가기
git checkout main

# 최신 코드 받기
git pull origin main
```

## 📚 유용한 링크

- [GitHub Guides](https://guides.github.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [Git 기초 가이드](https://git-scm.com/book/ko/v2)

## ✅ 체크리스트

- [ ] GitHub 저장소 생성
- [ ] 로컬 코드를 GitHub에 푸시
- [ ] Vercel 계정 생성 (GitHub 연동)
- [ ] Vercel에서 프로젝트 import
- [ ] 첫 배포 성공 확인
- [ ] 커스텀 도메인 설정 (선택사항)
- [ ] 환경 변수 설정 (필요시)

이제 코드를 푸시하기만 하면 자동으로 배포됩니다! 🚀



