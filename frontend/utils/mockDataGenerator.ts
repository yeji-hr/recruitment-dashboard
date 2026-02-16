import { Candidate, CandidateStatus, Position, ApplicationSource } from '@/types/candidate';

const positions: Position[] = ['FRONTEND', 'BACKEND', 'VIDEO_MARKETER', 'OTHER'];
const sources: ApplicationSource[] = ['WANTED', 'REMEMBER', 'SARAMIN', 'JOBKOREA', 'REFERRAL', 'DIRECT', 'OTHER'];
const statuses: CandidateStatus[] = ['APPLIED', 'SCREENING', 'INTERVIEW_1', 'ASSIGNMENT', 'INTERVIEW_2', 'FINAL', 'REJECTED'];

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

export function generateMockCandidates(totalCount: number = 450): Candidate[] {
  const candidates: Candidate[] = [];
  
  // 단계별 인원 배분 (전환율 고려)
  const distribution = {
    APPLIED: 450,
    SCREENING: 320,
    INTERVIEW_1: 240,
    ASSIGNMENT: 170,
    INTERVIEW_2: 120,
    FINAL: 85,
    REJECTED: 45,
  };

  let idCounter = 1;

  // 각 상태별로 지원자 생성
  Object.entries(distribution).forEach(([status, count]) => {
    for (let i = 0; i < count; i++) {
      const name = getRandomName();
      const position = positions[Math.floor(Math.random() * positions.length)];
      const source = sources[Math.floor(Math.random() * sources.length)];
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

