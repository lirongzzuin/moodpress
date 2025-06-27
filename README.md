# MoodPress

**MoodPress**는 사용자의 감정과 스타일을 선택하면, 해당 조합에 맞는 짧은 감성 문장을 **OpenAI 기반 AI**가 생성해주는 웹 서비스입니다. 생성된 문장은 **클릭 복사** 및 **링크 공유**가 가능하며, 감정에 따라 자연스럽게 연동된 **쿠팡 파트너스 추천상품**도 함께 노출됩니다.

모바일 사용자를 중심으로 감정 공유의 재미와 **수익화**를 함께 고려한 **UX 중심 사이드 프로젝트**입니다.

---

## 🧠 핵심 기능 및 흐름

### 1. 감정 및 스타일 선택 (Frontend)
- `/` 페이지에서 4가지 감정 중 하나 선택 (😊 기쁨 / 😢 슬픔 / 😡 화남 / 😴 무기력)
- 캐릭터 스타일: 테토남, 테토녀, 에겐남, 에겐녀 중 택1
- 선택 즉시 `/result?mood=xxx&style=yyy` 페이지로 이동

### 2. 결과 문구 생성 및 출력
- 백엔드로 감정 + 스타일 정보 POST 요청
- **OpenAI GPT API (`/v1/chat/completions`)** 를 통해 감성 문장 생성
- 결과는:
    - 클릭 복사 가능
    - 공유 링크 복사 또는 Web Share API로 전송 가능
    - 감정에 따른 쿠팡 파트너스 광고가 노출됨

---

## 🧱 폴더 구조

```
moodpress/
├── frontend/                     
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx            # 감정 및 스타일 선택 메인 페이지
│   │   │   └── result/page.tsx     # 결과 페이지 (감성 문장, 광고, 공유 포함)
│   │   ├── components/
│   │   │   ├── EmotionCard.tsx     # 감정 카드 UI
│   │   │   ├── CoupangAd.tsx       # 감정 기반 광고 CTA
│   │   │   └── ShareButton.tsx     # 공유 기능 버튼
│   │   └── styles/
│   │       └── globals.css
│   └── public/
│       └── gtag.js                 # Google Analytics 4 추적 스크립트
├── backend/                      
│   ├── index.js                    # 백엔드 서버 엔트리
│   ├── routes/
│   │   └── analyze.js              # /api/analyze 엔드포인트
│   ├── controllers/
│   │   └── analyzeController.js    # 요청 파싱 및 처리 로직
│   └── services/
│       └── gptService.js           # OpenAI GPT API 호출 유틸
├── .env                            # API 키 등 환경 변수
└── README.md
```

---

## ⚙️ 기술 스택

### ✅ Frontend
- **Next.js (App Router 기반)**
- **TypeScript**, **Tailwind CSS**
- **Lucide Icons**, **Clipboard API**
- 반응형 & 모바일 최적화
- **Google Analytics (gtag.js)** 기반 클릭 이벤트 추적

### ✅ Backend
- **Node.js + Express**
- **OpenAI GPT API (chat/completions)**
- 비동기 요청 처리 / JSON 파싱 / CORS 설정 포함

---

## 💸 수익화 구조

- 감정별 문장 아래 **"🔥 이 기분엔 이런 거 어때?"** 형태로 쿠팡 광고 삽입
- **텍스트 CTA 버튼** 방식으로 광고 자연 노출 및 클릭 유도
- `CoupangAd.tsx` 내 감정에 따라 동적으로 링크 분기 처리
- **수익 추적 가능**
    - 추후 다른 제휴 광고 네트워크 도입 가능성 고려

---

## 🔗 공유 기능

- Web Share API 사용 가능 시 → 공유 다이얼로그 실행
- 미지원 시 → 공유 링크 복사 처리
- 공유된 링크 클릭 시 동일한 감정/스타일 기반으로 결과 재생성
- **GA 이벤트**로 `share_link_copied_or_shared` 추적 가능

---

## 🧪 개발 및 실행

### 1. 백엔드 실행

```bash
cd backend
npm install
npm run dev
```

`.env` 예시 (backend/.env)
```
OPENAI_API_KEY=sk-xxxx...
PORT=4000
```

### 2. 프론트엔드 실행

```bash
cd frontend
npm install
npm run dev
```

`.env.local` 예시 (frontend/.env.local)
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

---

## 📈 향후 확장 아이디어

- 감정 + 스타일 외에 날씨, 나이대 등 조건 추가
- 감성 문장 저장 기능 (localStorage 기반)
- 카카오톡/인스타그램 공유용 **자동 이미지 생성**
- 쿠팡 파트너스 외 **네이티브 광고 SDK** 연동
- 유저 반응/클릭률 기반 개인화 추천
- 수익 리포트용 내부 대시보드 구축

---

## 📌 만든 이유

- 사람들이 자신의 감정을 쉽고 유쾌하게 표현할 수 있도록 하고,
- **광고가 UX를 방해하지 않도록 자연스럽게 녹여낸 수익화 모델**을 실험하고자 기획했습니다.
- 회원가입 없이도 공유와 사용이 가능한 간편함을 추구합니다.

---

## ✍️ 기획 & 개발

- 전체 기획, 디자인, 프론트엔드, 백엔드, AI 연동 모두 직접 개발
- 실무 흐름을 고려한 폴더 구조 및 API 설계
- 프론트엔드와 백엔드 완전 분리 구조로 배포 및 확장 용이
