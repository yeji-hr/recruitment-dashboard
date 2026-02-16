import { Candidate, CandidateStatus, Position, ApplicationSource } from '@/types/candidate';

// 실제 AI 엔지니어 데이터 (원티드 + 리멤버)
// 원티드: 제안 16,903명, 제안수락 1,171명(6.9%), 자소서 553명(3.3%), 서류전형 53명(0.32%), 1차면접 6명(0.04%), 과제 5명(0.03%), 2차면접 1명(0.01%)
// 리멤버: 제안 4,258명, 제안수락 227명(5.3%), 자소서 36명(0.8%), 서류전형 11명(0.26%), 1차면접 5명(0.12%), 과제전형 2명(0.05%)

const REAL_DATA = {
  // 실제 합산 데이터
  PROPOSAL_WANTED: 16903,
  PROPOSAL_REMEMBER: 4258,
  PROPOSAL_TOTAL: 21161,
  
  ACCEPTED_WANTED: 1171,
  ACCEPTED_REMEMBER: 227,
  ACCEPTED_TOTAL: 1398,
  
  COVER_WANTED: 553,
  COVER_REMEMBER: 36,
  COVER_TOTAL: 589,
  
  SCREENING_WANTED: 53,
  SCREENING_REMEMBER: 11,
  SCREENING_TOTAL: 64,
  
  INTERVIEW1_WANTED: 6,
  INTERVIEW1_REMEMBER: 5,
  INTERVIEW1_TOTAL: 11,
  
  ASSIGNMENT_WANTED: 5,
  ASSIGNMENT_REMEMBER: 2,
  ASSIGNMENT_TOTAL: 7,
  
  INTERVIEW2_WANTED: 1,
  INTERVIEW2_REMEMBER: 0,
  INTERVIEW2_TOTAL: 1,
  
  FINAL_TOTAL: 1,
  REJECTED_TOTAL: 50,
};

// 실제 데이터 기반 단계별 배분
const stageDistribution = {
  PROPOSAL: REAL_DATA.PROPOSAL_TOTAL,           // 21,161명
  PROPOSAL_ACCEPTED: REAL_DATA.ACCEPTED_TOTAL,  // 1,398명
  COVER_LETTER: REAL_DATA.COVER_TOTAL,          // 589명
  APPLIED: REAL_DATA.COVER_TOTAL,               // 589명 (자소서 제출 = 서류접수)
  SCREENING: REAL_DATA.SCREENING_TOTAL,         // 64명
  INTERVIEW_1: REAL_DATA.INTERVIEW1_TOTAL,      // 11명
  ASSIGNMENT: REAL_DATA.ASSIGNMENT_TOTAL,       // 7명
  INTERVIEW_2: REAL_DATA.INTERVIEW2_TOTAL,      // 1명
  FINAL: REAL_DATA.FINAL_TOTAL,                 // 1명
  REJECTED: REAL_DATA.REJECTED_TOTAL,           // 50명
};

// 지원경로별 배분 (원티드 80%, 리멤버 20% - 제안 기준)
const sourceDistribution = {
  WANTED: 0.80,      // 원티드 80% (16,903/21,161)
  REMEMBER: 0.20,    // 리멤버 20% (4,258/21,161)
  SARAMIN: 0.00,     // 사람인 0% (AI 엔지니어는 주로 원티드/리멤버)
  JOBKOREA: 0.00,    // 잡코리아 0%
  DIRECT: 0.00,      // 직접지원 0%
};

// 포지션별 배분 (AI 엔지니어만)
const positionDistribution = {
  AI_ENGINEER: 1.0,       // 100% - AI 엔지니어만
  VIDEO_MARKETER: 0.0,
  FRONTEND: 0.0,
  BACKEND: 0.0,
  OTHER: 0.0,
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

export function generateMockCandidates(): Candidate[] {
  const candidates: Candidate[] = [];
  
  let idCounter = 1;

  // 각 상태별로 실제 데이터 개수만큼 지원자 생성
  Object.entries(stageDistribution).forEach(([status, count]) => {
    for (let i = 0; i < count; i++) {
      const name = getRandomName();
      const position = getWeightedRandom(positionDistribution);
      const source = getWeightedRandom(sourceDistribution);
      const appliedDate = getRandomDate();
      const createdAt = `${appliedDate}T09:00:00Z`;
      const updatedAt = status === 'PROPOSAL' 
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
