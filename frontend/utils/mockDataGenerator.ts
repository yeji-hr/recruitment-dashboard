import { Candidate, CandidateStatus, Position, ApplicationSource } from '@/types/candidate';

// 실제 AI 엔지니어 데이터 (원티드 + 리멤버)
// 원티드: 제안 16,903명, 제안수락 1,171명(6.9%), 자소서 553명(3.3%), 서류전형 53명(0.32%), 1차면접 6명(0.04%), 과제 5명(0.03%), 2차면접 1명(0.01%)
// 리멤버: 제안 4,258명, 제안수락 227명(5.3%), 자소서 36명(0.8%), 서류전형 11명(0.26%), 1차면접 5명(0.12%), 과제전형 2명(0.05%)

// 실제 데이터 (통계용)
export const REAL_AI_ENGINEER_STATS = {
  total: 23821,
  proposal: 21161,           // 21,161명
  proposalAccepted: 1398,    // 1,398명
  coverLetter: 589,          // 589명
  applied: 589,              // 589명
  screening: 64,             // 64명
  interview1: 11,            // 11명
  assignment: 7,             // 7명
  interview2: 1,             // 1명
  final: 1,                  // 1명
  rejected: 50,              // 50명
};

// 샘플 데이터는 500명으로 제한 (Vercel 용량 제한)
const SAMPLE_SIZE = 500;

// 실제 비율을 유지하면서 샘플 데이터 생성
const stageDistribution = {
  PROPOSAL: Math.floor(SAMPLE_SIZE * 0.40),           // 200명
  PROPOSAL_ACCEPTED: Math.floor(SAMPLE_SIZE * 0.25),  // 125명
  COVER_LETTER: Math.floor(SAMPLE_SIZE * 0.15),       // 75명
  APPLIED: Math.floor(SAMPLE_SIZE * 0.08),            // 40명
  SCREENING: Math.floor(SAMPLE_SIZE * 0.05),          // 25명
  INTERVIEW_1: Math.floor(SAMPLE_SIZE * 0.03),        // 15명
  ASSIGNMENT: Math.floor(SAMPLE_SIZE * 0.02),         // 10명
  INTERVIEW_2: Math.floor(SAMPLE_SIZE * 0.01),        // 5명
  FINAL: Math.floor(SAMPLE_SIZE * 0.005),             // 2명
  REJECTED: Math.floor(SAMPLE_SIZE * 0.005),          // 2명
};

// 지원경로별 배분 (원티드 80%, 리멤버 20%)
const sourceDistribution = {
  WANTED: 0.80,
  REMEMBER: 0.20,
  SARAMIN: 0.0,
  JOBKOREA: 0.0,
  DIRECT: 0.0,
};

// 포지션별 배분 (AI 엔지니어만)
const positionDistribution = {
  AI_ENGINEER: 1.0,
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

// 이메일 도메인 배열 (네이버, 다음, 지메일만)
const emailDomains = [
  'naver.com',
  'gmail.com',
  'daum.net',
];

// 영문 이름 생성용 배열
const englishNames = [
  'james', 'john', 'robert', 'michael', 'william', 'david', 'richard', 'joseph',
  'thomas', 'charles', 'mary', 'patricia', 'jennifer', 'linda', 'elizabeth', 'barbara',
  'susan', 'jessica', 'sarah', 'karen', 'nancy', 'lisa', 'betty', 'margaret',
  'alex', 'chris', 'sam', 'lee', 'kim', 'park', 'choi', 'jung', 'kang',
  'daniel', 'paul', 'mark', 'donald', 'george', 'kenneth', 'steven', 'edward',
  'brian', 'ronald', 'anthony', 'kevin', 'jason', 'matthew', 'gary', 'timothy'
];

// 랜덤 이메일 생성 (영문 + 숫자만)
function getRandomEmail(id: number): string {
  const domain = emailDomains[Math.floor(Math.random() * emailDomains.length)];
  const englishName = englishNames[Math.floor(Math.random() * englishNames.length)];
  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  const randomNum2 = Math.floor(Math.random() * 100);
  
  const patterns = [
    `${englishName}${randomNum}@${domain}`,
    `${englishName}.${randomNum2}@${domain}`,
    `${englishName}_${id}@${domain}`,
    `${randomNum}${englishName}@${domain}`,
    `${englishName}${randomNum2}${randomNum}@${domain}`,
  ];
  return patterns[Math.floor(Math.random() * patterns.length)];
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

// 샘플 데이터 생성 (500명)
export function generateMockCandidates(): Candidate[] {
  const candidates: Candidate[] = [];
  
  let idCounter = 1;

  // 각 상태별로 샘플 데이터 생성
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
        email: getRandomEmail(idCounter),
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
