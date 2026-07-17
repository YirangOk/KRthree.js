# KRthree.js

한국어 이름으로 three.js 3D 코딩을 하는 라이브러리입니다. **three.js가 안에 들어 있어** 따로 설치할 필요가 없습니다.

three.js 공식 문법 구조를 그대로 두고, 클래스·속성·메서드 이름만 한국어입니다.

```js
const 장면 = new 삼차원.장면()                 // new THREE.Scene()
장면.배경 = new 삼차원.색('#1a1a1a')           // scene.background = new THREE.Color(...)

const 카메라 = new 삼차원.원근카메라(75, 창.너비 / 창.높이, 0.1, 1000)
카메라.위치.설정(4, 3, 6)                      // camera.position.set(4, 3, 6)
카메라.바라보기(0, 0, 0)                       // camera.lookAt(0, 0, 0)

const 렌더러 = new 삼차원.렌더러({ 안티앨리어싱: true })
렌더러.크기설정(창.너비, 창.높이)
문서.본문.붙이기(렌더러.돔요소)                 // document.body.appendChild(renderer.domElement)

렌더러.렌더링(장면, 카메라)                    // renderer.render(scene, camera)
```

## 들어 있는 파일

```
KRthree.js/
├─ KRthree.js     ← 라이브러리 한 개 (three.js 포함, 이 파일만 있으면 됩니다)
├─ index.html     ← 그대로 두세요
└─ script.js       ← 여기를 고치세요
```

## VS Code로 쓰기 (3단계)

1. **VS Code** 설치 → 확장에서 **Live Server** 설치
2. 이 폴더를 VS Code로 열기
3. `index.html` 우클릭 → **"Open with Live Server"**

`script.js` 를 고치고 저장하면 브라우저가 자동으로 새로고침됩니다.

## 새 프로젝트에 넣기

`KRthree.js` 파일을 복사하고 HTML에서 이렇게 불러옵니다.

```html
<script src="KRthree.js"></script>
<script>
  // 한국어 이름을 전역으로 등록 (이 두 줄은 그대로)
  Object.assign(window, KCC3D)
  window.THREE = KCC3D.THREE
</script>
<script src="script.js"></script>
```

## 한국어 이름표

### 삼차원 — three.js 클래스

| 한국어 | 원어 |
| --- | --- |
| `삼차원.장면` | Scene |
| `삼차원.원근카메라` | PerspectiveCamera |
| `삼차원.렌더러` | WebGLRenderer (`{ 안티앨리어싱: true }`) |
| `삼차원.색` | Color (`'하늘색'` 같은 한국어 색 이름 지원) |
| `삼차원.주변빛 · 방향빛 · 점빛 · 스포트라이트` | AmbientLight · DirectionalLight · PointLight · SpotLight |
| `삼차원.상자모양 · 구모양 · 평면모양 · 원통모양 · 원뿔모양 · 도넛모양` | BoxGeometry · SphereGeometry · … |
| `삼차원.표준재질` | MeshStandardMaterial (`{ 색, 텍스처, 금속성, 거칠기 }`) |
| `삼차원.메시` | Mesh (모양 + 재질 = 물체) |
| `삼차원.그룹 · 시계 · 텍스처로더` | Group · Clock · TextureLoader |
| `삼차원.SRGB색공간` | SRGBColorSpace |

### 속성·메서드

| 한국어 | 원어 |
| --- | --- |
| `위치 · 회전 · 크기` + `.설정(x, y, z)` | position · rotation · scale + `.set()` |
| `바라보기 · 추가 · 제거` | lookAt · add · remove |
| `배경` (장면) | background |
| `크기설정 · 렌더링 · 애니메이션시작 · 돔요소` (렌더러) | setSize · render · setAnimationLoop · domElement |
| `화면비율 · 투영갱신` (카메라) | aspect · updateProjectionMatrix |
| `불러오기 · 색공간` (텍스처) | load · colorSpace |
| `경과시간` (시계) | getDelta |

### 브라우저 내장 별칭

| 한국어 | 원어 |
| --- | --- |
| `창` · `창.너비` · `창.높이` | window · innerWidth · innerHeight |
| `창.이벤트걸기('크기변경' \| '휠' \| '마우스누름' \| '마우스이동' \| '마우스뗌', 함수)` | addEventListener |
| `문서` · `문서.본문` · `붙이기` | document · body · appendChild |
| `수학.파이 · 코사인 · 사인 · 무작위` | Math.PI · cos · sin · random |
| `목록.넣기 · 목록.각각` | push · forEach |
| `e.가로위치 · e.세로위치 · e.굴린양` | clientX · clientY · deltaY |

> `new` · `const` · `let` 같은 자바스크립트 언어 키워드는 그대로 씁니다.
> (한국어 코드 스튜디오의 `새` · `상수` 키워드는 스튜디오 전용 번역 기능이라, VS Code에서는 `new` · `const`로 적습니다.)

> 예전 요약형 함수(`삼차원시작`, `큐브만들기`, `빛추가하기` 등)도 라이브러리에 그대로 들어 있어 계속 사용할 수 있습니다.
> three.js 원본이 필요하면 `window.THREE` 로 그대로 쓸 수 있습니다.

## 라이선스

three.js(MIT)를 포함합니다. MIT.
