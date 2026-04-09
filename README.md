# DongSeok's Portfolio

Next.js, Tailwind CSS, shadcn/ui로 재구성된 포트폴리오 및 블로그입니다.

## 기술 스택

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: GitHub Pages

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

`http://localhost:3000`에서 확인할 수 있습니다.

### 프로덕션 빌드

```bash
npm run build
npm start
```

### GitHub Pages 배포

```bash
npm run export
```

`next.config.js`의 `output: 'export'` 설정으로 `out` 디렉토리가 생성됩니다.

## 구조

```
src/
├── app/              # Next.js App Router
├── components/       # React 컴포넌트
├── lib/             # 유틸리티 함수
└── styles/          # 전역 스타일
```

## 컴포넌트

- **Intro**: 프로필 및 소개 섹션
- **ProjectSection**: 프로젝트 목록
- **BlogSection**: Velog RSS 피드
- **Footer**: 네비게이션 및 연락처
- **TypingAnimation**: 타이핑 애니메이션
