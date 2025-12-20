# GitHub Actions + Vercel 자동 배포 설정 가이드

이 가이드는 GitHub Actions를 사용하여 Vercel에 자동으로 배포하는 방법을 설명합니다.

## 📋 준비물 체크리스트

- [x] GitHub 계정
- [ ] Vercel 계정 (무료)
- [ ] GitHub 저장소에 코드 푸시 완료

## 🚀 설정 단계

### 1단계: Vercel 계정 생성 및 프로젝트 생성

#### 1.1 Vercel 가입

1. [Vercel](https://vercel.com) 접속
2. **"Continue with GitHub"** 클릭 (GitHub 계정으로 가입)
3. 권한 승인

#### 1.2 Vercel에서 프로젝트 생성 (최초 1회만)

1. Vercel 대시보드에서 **"Add New..."** → **"Project"**
2. GitHub 저장소 `recruitment-dashboard` 선택
3. **"Import"** 클릭
4. 프로젝트 설정:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend` 선택 ⭐
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
5. **배포하지 말고** 일단 프로젝트만 생성

### 2단계: Vercel 인증 정보 가져오기

#### 2.1 Vercel Token 생성

1. Vercel 대시보드에서 오른쪽 상단 프로필 클릭
2. **Settings** 선택
3. 왼쪽 메뉴에서 **Tokens** 클릭
4. **Create Token** 클릭
5. Token 이름: `github-actions` (또는 원하는 이름)
6. Scope: **Full Account**
7. **Create** 클릭
8. ⚠️ **토큰을 복사해두세요!** (다시 볼 수 없습니다)

#### 2.2 Project ID와 Org ID 가져오기

1. Vercel 프로젝트 페이지에서 **Settings** 클릭
2. **General** 탭에서 다음 정보 복사:
   - **Project ID**: `prj_xxxxxxxxxxxxx`
   - **Organization ID** (또는 Team ID): `team_xxxxxxxxxxxxx`

### 3단계: GitHub Secrets 설정

1. GitHub 저장소 페이지로 이동
2. **Settings** 탭 클릭
3. 왼쪽 메뉴에서 **Secrets and variables** → **Actions** 클릭
4. **New repository secret** 클릭
5. 다음 3개의 시크릿을 추가:

#### Secret 1: VERCEL_TOKEN
- **Name**: `VERCEL_TOKEN`
- **Value**: 위에서 복사한 Vercel 토큰
- **Add secret** 클릭

#### Secret 2: VERCEL_PROJECT_ID
- **Name**: `VERCEL_PROJECT_ID`
- **Value**: 위에서 복사한 Project ID
- **Add secret** 클릭

#### Secret 3: VERCEL_ORG_ID
- **Name**: `VERCEL_ORG_ID`
- **Value**: 위에서 복사한 Organization ID (또는 Team ID)
- **Add secret** 클릭

### 4단계: GitHub Actions 워크플로우 파일 푸시

이미 생성된 워크플로우 파일들을 GitHub에 푸시합니다:

```bash
git add .
git commit -m "Add GitHub Actions workflow for Vercel deployment"
git push origin main
```

### 5단계: 배포 확인 🎉

1. GitHub 저장소에서 **Actions** 탭 클릭
2. "Deploy to Vercel" 워크플로우가 실행되는 것을 확인
3. 워크플로우 클릭하여 진행 상황 확인
4. 성공하면 ✅ 표시와 함께 완료!

## 🔄 작동 방식

### Main 브랜치 푸시 → 프로덕션 배포

```bash
git add .
git commit -m "새 기능 추가"
git push origin main
```

→ 자동으로 GitHub Actions가 실행되어 Vercel에 프로덕션 배포!

### Pull Request → 미리보기 배포

```bash
git checkout -b feature/new-feature
git add .
git commit -m "새 기능 개발"
git push origin feature/new-feature
```

→ GitHub에서 PR 생성
→ 자동으로 미리보기 URL 생성 및 PR에 댓글로 표시!

## 📁 생성된 파일들

### `.github/workflows/deploy.yml`
- Main 브랜치에 푸시 시 프로덕션 배포
- 빌드 테스트 포함
- Vercel에 자동 배포

### `.github/workflows/preview.yml`
- PR 생성 시 미리보기 배포
- Lint 검사 포함
- PR에 미리보기 URL 자동 댓글

## 🔧 고급 설정

### 환경 변수 추가

Vercel 대시보드에서:
1. 프로젝트 → **Settings** → **Environment Variables**
2. 변수 추가:
   - `NEXT_PUBLIC_API_URL`: API 엔드포인트
   - 기타 필요한 환경 변수

### 배포 알림 설정

Slack, Discord 등과 연동하여 배포 완료 알림을 받을 수 있습니다.

## 🐛 문제 해결

### GitHub Actions 실패 시

1. GitHub 저장소 → **Actions** 탭
2. 실패한 워크플로우 클릭
3. 로그 확인
4. 주요 확인 사항:
   - GitHub Secrets가 올바르게 설정되었는지
   - Vercel Token이 유효한지
   - Project ID와 Org ID가 정확한지

### 로컬에서 테스트

```bash
cd frontend
npm install
npm run build
npm start
```

### Secrets 확인

GitHub 저장소 → Settings → Secrets and variables → Actions

다음 3개가 모두 있어야 합니다:
- `VERCEL_TOKEN`
- `VERCEL_PROJECT_ID`
- `VERCEL_ORG_ID`

## 📊 배포 상태 확인

### GitHub에서
- **Actions** 탭에서 워크플로우 실행 상태 확인
- PR에 자동으로 미리보기 URL 댓글 추가됨

### Vercel에서
- Vercel 대시보드 → 프로젝트 선택
- **Deployments** 탭에서 모든 배포 확인

## ⚡ 워크플로우 속도 최적화

현재 설정:
- 의존성 캐싱 활성화 (Node.js)
- 병렬 작업 가능
- 평균 배포 시간: 2-4분

## 🎯 빠른 명령어 참고

```bash
# 새 기능 개발
git checkout -b feature/my-feature
# ... 작업 ...
git add .
git commit -m "기능 추가"
git push origin feature/my-feature
# → GitHub에서 PR 생성 → 자동 미리보기 배포

# PR 승인 후 main에 병합
# → 자동 프로덕션 배포

# 직접 main에 푸시
git checkout main
git add .
git commit -m "수정"
git push origin main
# → 자동 프로덕션 배포
```

## ✅ 최종 체크리스트

- [ ] Vercel 계정 생성 완료
- [ ] Vercel 프로젝트 생성 완료
- [ ] Vercel Token 발급 완료
- [ ] Project ID, Org ID 확인 완료
- [ ] GitHub Secrets 3개 설정 완료
  - [ ] VERCEL_TOKEN
  - [ ] VERCEL_PROJECT_ID
  - [ ] VERCEL_ORG_ID
- [ ] 워크플로우 파일 푸시 완료
- [ ] GitHub Actions 실행 확인
- [ ] 배포 성공 확인

모든 체크리스트를 완료하면 자동 배포가 설정됩니다! 🚀

## 📚 추가 자료

- [GitHub Actions 문서](https://docs.github.com/en/actions)
- [Vercel CLI 문서](https://vercel.com/docs/cli)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)

이제 코드를 푸시하기만 하면 자동으로 배포됩니다! 🎉

