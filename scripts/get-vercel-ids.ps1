# Vercel ID 확인 스크립트

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Vercel Project 정보 확인" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# frontend 폴더로 이동
Set-Location frontend

# Vercel 프로젝트 정보 파일 확인
$vercelProjectFile = ".vercel/project.json"

if (Test-Path $vercelProjectFile) {
    Write-Host "✓ Vercel 프로젝트가 이미 링크되어 있습니다!" -ForegroundColor Green
    Write-Host ""
    
    $projectInfo = Get-Content $vercelProjectFile | ConvertFrom-Json
    
    Write-Host "Project ID:" -ForegroundColor Yellow
    Write-Host $projectInfo.projectId -ForegroundColor White
    Write-Host ""
    
    Write-Host "Organization ID:" -ForegroundColor Yellow
    Write-Host $projectInfo.orgId -ForegroundColor White
    Write-Host ""
    
    Write-Host "==================================" -ForegroundColor Cyan
    Write-Host "GitHub Secrets에 다음과 같이 추가하세요:" -ForegroundColor Green
    Write-Host "==================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "VERCEL_PROJECT_ID = $($projectInfo.projectId)" -ForegroundColor Cyan
    Write-Host "VERCEL_ORG_ID = $($projectInfo.orgId)" -ForegroundColor Cyan
    Write-Host ""
    
} else {
    Write-Host "⚠ Vercel 프로젝트가 아직 링크되지 않았습니다." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "다음 명령어를 실행하세요:" -ForegroundColor Cyan
    Write-Host "  vercel link" -ForegroundColor White
    Write-Host ""
    Write-Host "기존 프로젝트를 선택하면 정보가 생성됩니다." -ForegroundColor Cyan
}

# 원래 위치로 복귀
Set-Location ..

