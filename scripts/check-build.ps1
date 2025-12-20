# TypeScript 및 빌드 체크 스크립트

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "TypeScript 타입 체크 및 빌드" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# frontend 폴더로 이동
Set-Location frontend

Write-Host "📝 Lint 검사 중..." -ForegroundColor Yellow
npm run lint

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Lint 검사 통과!" -ForegroundColor Green
} else {
    Write-Host "⚠ Lint 경고가 있습니다." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🔨 프로덕션 빌드 중..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "==================================" -ForegroundColor Cyan
    Write-Host "✅ 모든 검사 통과!" -ForegroundColor Green
    Write-Host "==================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "이제 GitHub에 푸시할 수 있습니다:" -ForegroundColor Cyan
    Write-Host "  git add ." -ForegroundColor White
    Write-Host "  git commit -m '메시지'" -ForegroundColor White
    Write-Host "  git push origin main" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "==================================" -ForegroundColor Red
    Write-Host "❌ 빌드 실패!" -ForegroundColor Red
    Write-Host "==================================" -ForegroundColor Red
    Write-Host "위의 에러를 확인하고 수정해주세요." -ForegroundColor Yellow
}

# 원래 위치로 복귀
Set-Location ..

