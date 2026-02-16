import { Candidate, CandidateStatus, Position, ApplicationSource } from '@/types/candidate';

// 실제 데이터 기반 포지션별 배분
const positionDistribution = {
  AI_ENGINEER: 0.35,      // 35% - AI 엔지니어 (가장 많은 지원)
  VIDEO_MARKETER: 0.30,   // 30% - 영상콘텐츠마케터
  FRONTEND: 0.18,         // 18% - 프론트엔드
  BACKEND: 0.15,          // 15% - 백엔드
  OTHER: 0.02,            // 2% - 기타
};

// 지원경로별 배분 (실제 데이터 반영)
const sourceDistribution = {
  WANTED: 0.40,      // 원티드가 가장 많음
  REMEMBER: 0.20,    // 리멤버
  JOBKOREA: 0.20,    // 잡코리아
  SARAMIN: 0.10,     // 사람인
  REFERRAL: 0.05,    // 추천
  DIRECT: 0.03,      // 직접지원
  OTHER: 0.02,       // 기타
};

const firstNames = [
  '김', '이', '박', '최', '정', '강', '조', '윤', '장', '임',
  '한', '오', '서', '신', '권', '황', '안', '송', '류', '홍'
];

const lastNames = [
  '서준', '민준', '도윤', '예준', '시우', '주원', '하준', '지호', '지후', '준서',
  '서연', '서윤', '지우', '서현', '민서', '하은', '하윤', '윤서', '지민', '지유',
  '현우', '건우', '우진', '선우', '연우', '정우', '승현', '승우', '시현', '준혁',
  '수아', '소율', '채원', '지안', '다은', '은서', '수빈', '예린', '예나', '채은'
];

// 2025년 10월 1일부터 2026년 2월 15일까지의 랜덤 날짜 생성
function getRandomDate(): string {
  const start = new Date('2025-10-01');
  const end = new Date('2026-02-15');
  const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(randomTime).toISOString().split('T')[0];
}

// 지원일 이후의 날짜 생성
function getDateAfter(baseDate: string, minDays: number = 1, maxDays: number = 30): string {
  const base = new Date(baseDate);
  const daysToAdd = Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;
  const newDate = new Date(base.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
  return newDate.toISOString().split('T')[0];
}

// 랜덤 이름 생성
function getRandomName(): string {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName}${lastName}`;
}

// 랜덤 전화번호 생성
function getRandomPhone(): string {
  const middle = String(Math.floor(Math.random() * 9000) + 1000);
  const last = String(Math.floor(Math.random() * 9000) + 1000);
  return `010-${middle}-${last}`;
}

// 가중치 기반 랜덤 선택
function getWeightedRandom<T extends string>(distribution: Record<T, number>): T {
  const rand = Math.random();
  let sum = 0;
  
  for (const [key, weight] of Object.entries(distribution) as [T, number][]) {
    sum += weight;
    if (rand <= sum) {
      return key;
    }
  }
  
  return Object.keys(distribution)[0] as T;
}

export function generateMockCandidates(totalCount: number = 450): Candidate[] {
  const candidates: Candidate[] = [];
  
  // 실제 데이터 기반 단계별 인원 배분
  const distribution = {
    APPLIED: Math.floor(totalCount * 0.20),      // 90명 - 서류접수
    SCREENING: Math.floor(totalCount * 0.25),    // 112명 - 서류합격
    INTERVIEW_1: Math.floor(totalCount * 0.22),  // 99명 - 1차면접
    ASSIGNMENT: Math.floor(totalCount * 0.15),   // 67명 - 과제전형
    INTERVIEW_2: Math.floor(totalCount * 0.10),  // 45명 - 최종면접
    FINAL: Math.floor(totalCount * 0.06),        // 27명 - 최종합격
    REJECTED: Math.floor(totalCount * 0.02),     // 10명 - 불합격
  };

  let idCounter = 1;

  // 각 상태별로 지원자 생성
  Object.entries(distribution).forEach(([status, count]) => {
    for (let i = 0; i < count; i++) {
      const name = getRandomName();
      const position = getWeightedRandom(positionDistribution);
      const source = getWeightedRandom(sourceDistribution);
      const appliedDate = getRandomDate();
      const createdAt = `${appliedDate}T09:00:00Z`;
      const updatedAt = status === 'APPLIED' 
        ? createdAt 
        : `${getDateAfter(appliedDate, 1, 60)}T${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:00:00Z`;

      candidates.push({
        id: String(idCounter++),
        name,
        email: `${name.toLowerCase().replace(/\s/g, '')}${Math.floor(Math.random() * 1000)}@example.com`,
        phone: getRandomPhone(),
        position,
        status: status as CandidateStatus,
        source,
        appliedDate,
        createdAt,
        updatedAt,
      });
    }
  });

  // 날짜 순으로 정렬 (최신순)
  return candidates.sort((a, b) => 
    new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
  );
}
