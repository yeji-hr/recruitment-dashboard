# Makefile for Recruitment Dashboard Deployment

# 변수 정의
PROJECT_NAME = recruitment-dashboard
FRONTEND_DIR = frontend
VERCEL_PROD = production
VERCEL_PREVIEW = preview

# 색상 출력을 위한 변수
BLUE = \033[0;34m
GREEN = \033[0;32m
YELLOW = \033[0;33m
NC = \033[0m # No Color

.PHONY: help install dev build deploy deploy-prod deploy-preview status logs clean

# 기본 명령어: help 출력
help:
	@echo "$(BLUE)========================================$(NC)"
	@echo "$(GREEN) Recruitment Dashboard - Makefile$(NC)"
	@echo "$(BLUE)========================================$(NC)"
	@echo ""
	@echo "사용 가능한 명령어:"
	@echo "  $(YELLOW)make install$(NC)        - 의존성 설치"
	@echo "  $(YELLOW)make dev$(NC)            - 개발 서버 실행"
	@echo "  $(YELLOW)make build$(NC)          - 프로덕션 빌드"
	@echo "  $(YELLOW)make deploy$(NC)         - Vercel에 미리보기 배포"
	@echo "  $(YELLOW)make deploy-prod$(NC)    - Vercel에 프로덕션 배포"
	@echo "  $(YELLOW)make deploy-preview$(NC) - Vercel에 미리보기 배포 (deploy와 동일)"
	@echo "  $(YELLOW)make status$(NC)         - 배포 상태 확인"
	@echo "  $(YELLOW)make logs$(NC)           - 배포 로그 확인"
	@echo "  $(YELLOW)make clean$(NC)          - 빌드 파일 정리"
	@echo ""

# 의존성 설치
install:
	@echo "$(BLUE)의존성을 설치하는 중...$(NC)"
	cd $(FRONTEND_DIR) && npm install
	@echo "$(GREEN)✓ 의존성 설치 완료!$(NC)"

# 개발 서버 실행
dev:
	@echo "$(BLUE)개발 서버를 시작하는 중...$(NC)"
	cd $(FRONTEND_DIR) && npm run dev

# 프로덕션 빌드
build:
	@echo "$(BLUE)프로덕션 빌드를 생성하는 중...$(NC)"
	cd $(FRONTEND_DIR) && npm run build
	@echo "$(GREEN)✓ 빌드 완료!$(NC)"

# Vercel 미리보기 배포 (기본)
deploy: check-vercel
	@echo "$(BLUE)Vercel에 미리보기 배포하는 중...$(NC)"
	vercel --yes
	@echo "$(GREEN)✓ 미리보기 배포 완료!$(NC)"

# Vercel 프로덕션 배포
deploy-prod: check-vercel
	@echo "$(YELLOW)⚠ 프로덕션 환경에 배포합니다...$(NC)"
	vercel --prod --yes
	@echo "$(GREEN)✓ 프로덕션 배포 완료!$(NC)"

# Vercel 미리보기 배포 (명시적)
deploy-preview: deploy

# Vercel CLI 설치 확인
check-vercel:
	@which vercel > /dev/null || (echo "$(YELLOW)Vercel CLI가 설치되어 있지 않습니다. 설치 중...$(NC)" && npm install -g vercel)

# 배포 상태 확인
status: check-vercel
	@echo "$(BLUE)배포 상태를 확인하는 중...$(NC)"
	vercel ls

# 배포 로그 확인
logs: check-vercel
	@echo "$(BLUE)최근 배포 로그...$(NC)"
	vercel logs

# 빌드 파일 정리
clean:
	@echo "$(BLUE)빌드 파일을 정리하는 중...$(NC)"
	rm -rf $(FRONTEND_DIR)/.next
	rm -rf $(FRONTEND_DIR)/out
	rm -rf $(FRONTEND_DIR)/node_modules/.cache
	@echo "$(GREEN)✓ 정리 완료!$(NC)"

# Vercel 프로젝트 초기화
init: check-vercel
	@echo "$(BLUE)Vercel 프로젝트를 초기화하는 중...$(NC)"
	@echo "$(YELLOW)다음 질문에 답해주세요:$(NC)"
	vercel

# 로컬에서 프로덕션 빌드 테스트
test-prod: build
	@echo "$(BLUE)프로덕션 빌드를 로컬에서 테스트하는 중...$(NC)"
	cd $(FRONTEND_DIR) && npm start

# 전체 프로세스 (설치 -> 빌드 -> 배포)
all: install build deploy-prod
	@echo "$(GREEN)✓ 모든 작업이 완료되었습니다!$(NC)"



