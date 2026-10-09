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

## 내려받기 (두 가지 방법)

**1) 파일로 내려받기** — [KRthree.js](https://github.com/YirangOk/KRthree.js/raw/main/KRthree.js) 파일 하나를 받아 프로젝트 폴더에 넣습니다. ([Releases](https://github.com/YirangOk/KRthree.js/releases)에서 버전별로 받을 수도 있습니다.)

**2) CDN 한 줄** — 파일을 받지 않아도 됩니다. 이 GitHub 저장소의 파일을 그대로 불러옵니다.

```html
<script src="https://cdn.jsdelivr.net/gh/YirangOk/KRthree.js@main/KRthree.js"></script>
```

> npm 패키지는 아직 올라가 있지 않습니다. npm에서 `krthree` 이름의 패키지를 찾더라도 이 저장소에서 올린 것인지 확인하기 전에는 설치하지 마세요.

어느 방법이든 불러온 다음 두 줄은 같습니다.

```html
<script>
  Object.assign(window, KCC3D)
  window.THREE = KCC3D.THREE
</script>
```

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
| `삼차원.색` | Color (`'하늘색'` `'아이보리'` 같은 한국어 색 이름 지원) |
| `삼차원.주변빛 · 방향빛 · 점빛 · 스포트라이트` | AmbientLight · DirectionalLight · PointLight · SpotLight |
| `삼차원.상자모양 · 구모양 · 평면모양 · 원통모양 · 원뿔모양 · 도넛모양` | BoxGeometry · SphereGeometry · … |
| `삼차원.표준재질` | MeshStandardMaterial (`{ 색, 텍스처, 금속성, 거칠기, 투명, 불투명도, 와이어프레임 }`) |
| `삼차원.도형` (=`메시`) | Mesh (모양 + 재질 = 물체) |
| `삼차원.그룹 · 시계 · 텍스처로더` | Group · Clock · TextureLoader |
| `삼차원.광선` (=`레이캐스터`) · `삼차원.벡터2` | Raycaster · Vector2 (클릭한 물체 찾기) |
| `삼차원.안개` | Fog (`장면.안개 = new 삼차원.안개(색, 시작, 끝)`) |
| `삼차원.SRGB색공간` | SRGBColorSpace |

### 속성·메서드

| 한국어 | 원어 |
| --- | --- |
| `위치 · 회전 · 크기` + `.설정(x, y, z)` | position · rotation · scale + `.set()` |
| `바라보기 · 추가 · 제거` | lookAt · add · remove |
| `물체.그룹만들기()` | 빈 그룹을 만들어 바로 그 물체(장면)에 붙이고 돌려줌 (`new 삼차원.그룹()` + `추가`) |
| `물체.부드럽게돌기(각도)` | `회전.y`를 그 각도(라디안)까지 가까운 방향으로 천천히 돌림 — 화면을 그릴 때마다 남은 각도의 4%씩 |
| `배경` (장면) | background |
| `크기설정 · 렌더링 · 애니메이션시작 · 돔요소` (렌더러) | setSize · render · setAnimationLoop · domElement |
| `화면비율 · 투영갱신` (카메라) | aspect · updateProjectionMatrix |
| `불러오기 · 색공간` (텍스처) | load · colorSpace |
| `경과시간` (시계) | getDelta |
| `겨누기(e 또는 벡터2, 카메라)` (광선) | setFromCamera — 클릭 이벤트 `e`를 그대로 넘기면 화면 좌표를 알아서 바꿔 줌 (캔버스가 창 전체일 때). 옛 이름 `카메라설정`은 벡터2만 받음 |
| `닿은것찾기(물체들)` (광선) | intersectObjects — 가까운 것부터 교차 기록 배열. 맞은 물체는 `닿은[0].물체` (=`.object`) |
| `교차확인(물체들)` (=`맞은것찾기`) (광선) | 기록이 아니라 맞은 **물체**를 가까운 것부터 바로 돌려줌. 그룹 안의 물체가 맞으면 목록에 넣어 준 그 그룹이 나옴 |
| `자식들` (그룹·장면) | children |

### 브라우저 내장 별칭

| 한국어 | 원어 |
| --- | --- |
| `창` · `창.너비` · `창.높이` | window · innerWidth · innerHeight |
| `창.이벤트걸기('크기변경' \| '휠' \| '클릭' \| '더블클릭' \| '마우스누름' \| '마우스이동' \| '마우스뗌' \| '키누름' \| '키뗌' \| '터치시작' \| '터치이동' \| '터치끝', 함수)` | addEventListener |
| `문서` · `문서.본문` · `붙이기` | document · body · appendChild |
| `문서.만들기('div')` · `요소.글자` · `요소.스타일` | createElement · textContent · style |
| `요소.스타일.표시 = '보임'` \| `'숨김'` | style.display = 'block' \| 'none' |
| `수학.파이 · 코사인 · 사인 · 탄젠트 · 무작위(최소, 최대)` | Math.PI · cos · sin · tan · random |
| `수학.절댓값 · 제곱근 · 최소 · 최대 · 내림 · 올림 · 반올림` | Math.abs · sqrt · min · max · floor · ceil · round |
| `목록.넣기 · 목록.각각` | push · forEach |
| `e.가로위치 · e.세로위치 · e.세로굴린양 · e.가로굴린양` | clientX · clientY · deltaY · deltaX |

> `너비` · `높이`는 `창.너비` · `창.높이`와 같은 값으로 이미 쓰이는 이름입니다. 내 변수 이름으로 쓰려면 `const`나 `let`으로 선언하세요 — `var 너비 = 300`이나 선언 없이 `너비 = 300`이라고 쓰면 값이 바뀌지 않습니다.

> `new` · `const` · `let` 같은 자바스크립트 언어 키워드는 그대로 씁니다.
> (한국어 코드 스튜디오의 `새` · `상수` 키워드는 스튜디오 전용 번역 기능이라, VS Code에서는 `new` · `const`로 적습니다.)

> 예전 요약형 함수(`삼차원시작`, `큐브만들기`, `빛추가하기` 등)도 라이브러리에 그대로 들어 있어 계속 사용할 수 있습니다.
> three.js 원본이 필요하면 `window.THREE` 로 그대로 쓸 수 있습니다.

## 라이브러리 파일을 바꿀 때 (관리용)

`KRthree.js`는 한국어 코드 스튜디오의 `korean-creative-code-3d` 패키지를 빌드한 파일(`dist/index.global.js`)을 복사한 것입니다. 새 빌드로 바꾼 뒤에는 `npm test`로 이름과 동작이 그대로인지 확인합니다. (설치할 것은 없고 Node.js만 있으면 됩니다.)

- 빌드가 파일 끝에 붙이는 `//# sourceMappingURL=…` 줄은 지우고 넣습니다. 맵 파일은 이 저장소에 없어서, 그 줄이 남아 있으면 개발자 도구가 없는 파일을 찾게 됩니다.

## 라이선스

three.js(MIT)를 포함합니다. MIT.
