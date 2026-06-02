# 슾가락 뉴스레터 생성기

## 파일 구조
```
spaceadd-newsletter/
├── api/
│   └── generate.js       ← Vercel 서버 함수 (API 키 보관)
├── public/
│   └── index.html        ← 실제 도구 화면
├── vercel.json           ← Vercel 라우팅 설정
└── README.md
```

---

## 배포 방법 (처음 한 번만)

### Step 1 — GitHub에 올리기
1. github.com 로그인 → **New repository**
2. Repository 이름: `spaceadd-newsletter` → **Create repository**
3. **Add file → Upload files** 클릭
4. 이 폴더 안의 파일들을 **폴더 구조 그대로** 업로드
   - `api/generate.js`
   - `public/index.html`
   - `vercel.json`
   - `README.md`
5. **Commit changes** 클릭

### Step 2 — Vercel 배포
1. vercel.com → GitHub 계정으로 로그인
2. **Add New → Project** → `spaceadd-newsletter` 저장소 선택 → **Import**
3. **Environment Variables** 섹션에서:
   - Name: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-...` (Anthropic 콘솔에서 발급한 API 키)
4. **Deploy** 클릭
5. 배포 완료 후 URL 확인 (예: `https://spaceadd-newsletter.vercel.app`)

### Step 3 — Notion 임베드
1. Notion 페이지에서 `/embed` 입력
2. Vercel URL 붙여넣기 → **Embed link**
3. 블록 높이를 900px 이상으로 조절

---

## 로컬 테스트 방법 (배포 전 확인)

Node.js가 설치되어 있어야 합니다.

```bash
# 1. Vercel CLI 설치 (최초 1회)
npm install -g vercel

# 2. 이 폴더에서 실행
cd spaceadd-newsletter
vercel dev

# 3. 브라우저에서 확인
# http://localhost:3000

# 처음 실행 시 ANTHROPIC_API_KEY 입력 안내가 뜹니다
# → sk-ant-... 키를 입력하면 로컬에서도 실제 AI 응답 테스트 가능
```

---

## API 키 발급 방법
1. console.anthropic.com 접속
2. 좌측 메뉴 **API Keys** → **Create Key**
3. 키 이름 입력 (예: `spaceadd-newsletter`) → 생성
4. `sk-ant-...` 형태의 키를 복사해서 Vercel 환경변수에 입력

---

## 파일 수정 후 재배포
GitHub에 파일을 다시 업로드하면 Vercel이 자동으로 재배포합니다.
URL은 변경되지 않습니다.
