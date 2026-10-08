// KRthree.js 스모크 테스트 — 설치할 것 없이 `npm test` (Node 내장 테스트 러너)로 돈다.
//
// KRthree.js는 다른 저장소에서 빌드한 파일을 복사해 온 산출물이다. 새 빌드로 덮어쓸 때
// 이름이 빠지거나 고쳐 둔 동작이 되돌아가지 않았는지 여기서 확인한다.
// Node에는 화면(WebGL)·window가 없어서 삼차원시작, new 삼차원.렌더러, 창·문서·수학 별칭은
// 여기서 다루지 않는다 — 그 부분은 브라우저에서 index.html을 열어 확인한다.
const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')

const 파일 = path.join(__dirname, '..', 'KRthree.js')
const 소스 = fs.readFileSync(파일, 'utf8')
// 브라우저의 <script src="KRthree.js"> 와 같은 방식으로 실행해 전역 KCC3D를 만든다.
// (require('../KRthree.js') 는 내보내는 것이 없어 빈 객체가 나온다.)
vm.runInThisContext(소스, { filename: 파일 })
const { 삼차원, THREE } = KCC3D

const 색값 = (색) => 색.getHexString()

test('내보내는 이름 41개가 그대로다', () => {
  assert.deepEqual(Object.keys(KCC3D), [
    'THREE', '격자선만들기', '경과시간', '구만들기', '그룹만들기', '그룹에추가하기', '그림자설정',
    '다면체만들기', '도넛만들기', '레이캐스터만들기', '레이캐스트', '렌더러만들기', '렌더링하기',
    '바라보기', '배경색설정', '빛추가하기', '삼차원', '삼차원시작', '색만들기', '시계만들기',
    '안개설정', '애니메이션시작', '원뿔만들기', '원통만들기', '위치설정', '장면만들기',
    '장면에추가하기', '재질만들기', '정사영카메라만들기', '제거하기', '직육면체만들기', '책만들기',
    '축선만들기', '카메라만들기', '큐브만들기', '크기설정', '텍스처불러오기', '텍스처재질만들기',
    '평면만들기', '회전설정', '회전하기',
  ])
  assert.equal(typeof THREE.Scene, 'function')
})

test('삼차원 표의 이름 25개가 그대로다', () => {
  assert.deepEqual(Object.keys(삼차원), [
    '장면', '원근카메라', '렌더러', '색', '주변빛', '방향빛', '점빛', '스포트라이트',
    '상자모양', '구모양', '평면모양', '원통모양', '원뿔모양', '도넛모양', '표준재질', '도형', '메시',
    '그룹', '시계', '텍스처로더', '광선', '레이캐스터', '벡터2', '안개', 'SRGB색공간',
  ])
  assert.equal(삼차원.장면, THREE.Scene)
  assert.equal(삼차원.도형, 삼차원.메시)
  assert.equal(삼차원.광선, 삼차원.레이캐스터)
  assert.equal(삼차원.SRGB색공간, THREE.SRGBColorSpace)
})

test('물체·장면·카메라의 한국어 속성과 메서드', () => {
  const 장면 = new 삼차원.장면()
  const 상자 = new 삼차원.도형(new 삼차원.상자모양(1, 1, 1), new 삼차원.표준재질())

  상자.위치.설정(1, 2, 3)
  상자.회전.설정(0.1, 0.2, 0.3)
  상자.크기.설정(2, 2, 2)
  assert.deepEqual(상자.position.toArray(), [1, 2, 3])
  assert.equal(상자.rotation.y, 0.2)
  assert.equal(상자.scale.x, 2)

  장면.추가(상자)
  assert.equal(장면.자식들.length, 1)
  const 그룹 = 장면.그룹만들기()
  assert.ok(그룹.isGroup)
  assert.equal(그룹.parent, 장면)
  장면.제거(그룹)
  assert.deepEqual(장면.자식들, [상자])

  장면.배경 = new 삼차원.색('하늘색')
  assert.equal(색값(장면.background), '87ceeb')
  장면.안개 = new 삼차원.안개('#000000', 1, 100)
  assert.ok(장면.fog.isFog)

  const 카메라 = new 삼차원.원근카메라(75, 1, 0.1, 1000)
  카메라.화면비율 = 2
  카메라.투영갱신()
  assert.equal(카메라.aspect, 2)
  카메라.위치.설정(0, 0, 5)
  카메라.바라보기(0, 0, 0)
  assert.equal(카메라.position.z, 5)

  assert.equal(typeof new 삼차원.시계().경과시간(), 'number')
  const 텍스처 = new THREE.Texture()
  텍스처.색공간 = 삼차원.SRGB색공간
  assert.equal(텍스처.colorSpace, 'srgb')
  assert.equal(typeof new 삼차원.텍스처로더().불러오기, 'function')
})

test('한국어 색 이름', () => {
  assert.equal(색값(new 삼차원.색('하늘색')), '87ceeb')
  assert.equal(색값(new 삼차원.색('아이보리')), 'fffff0')
  assert.equal(색값(new 삼차원.색('빨강')), 'ff0000')
  assert.equal(색값(new 삼차원.색('#1a1a1a')), '1a1a1a')
  assert.equal(색값(new 삼차원.색(0xff0000)), 'ff0000')
  assert.equal(색값(new 삼차원.색(1, 0, 0)), 'ff0000')
  assert.equal(색값(new 삼차원.색()), 'ffffff')
  assert.equal(색값(KCC3D.색만들기('금색')), 'ffd700')
})

test('표준재질 옵션과 빛의 색을 한국어로 줄 수 있다', () => {
  const 재질 = new 삼차원.표준재질({ 색: '빨강', 금속성: 0.3, 거칠기: 0.4, 투명: true, 불투명도: 0.5, 와이어프레임: true })
  assert.equal(색값(재질.color), 'ff0000')
  assert.deepEqual(
    [재질.metalness, 재질.roughness, 재질.transparent, 재질.opacity, 재질.wireframe],
    [0.3, 0.4, true, 0.5, true],
  )
  assert.equal(new 삼차원.표준재질().type, 'MeshStandardMaterial')

  const 빛들 = [new 삼차원.주변빛('흰색', 0.5), new 삼차원.방향빛('노랑', 1), new 삼차원.점빛('파랑', 1, 10), new 삼차원.스포트라이트('초록', 1)]
  assert.deepEqual(빛들.map((빛) => 색값(빛.color)), ['ffffff', 'ffff00', '0000ff', '008000'])
  assert.deepEqual(빛들.map((빛) => 빛.type), ['AmbientLight', 'DirectionalLight', 'PointLight', 'SpotLight'])
  assert.equal(색값(new 삼차원.주변빛().color), 'ffffff')
})

test('광선으로 물체 찾기: 겨누기 · 닿은것찾기 · 교차확인 · 맞은것찾기', () => {
  const 장면 = new 삼차원.장면()
  const 카메라 = new 삼차원.원근카메라(75, 1, 0.1, 1000)
  카메라.위치.설정(0, 0, 5)
  const 상자 = new 삼차원.도형(new 삼차원.상자모양(1, 1, 1), new 삼차원.표준재질())
  const 그룹 = new 삼차원.그룹()
  const 공 = new 삼차원.도형(new 삼차원.구모양(0.3), new 삼차원.표준재질())
  공.위치.설정(0, 0, 2)
  그룹.추가(공)
  장면.추가(상자)
  장면.추가(그룹)
  장면.updateMatrixWorld(true)
  카메라.updateMatrixWorld(true)

  const 광선 = new 삼차원.광선()
  광선.겨누기(new 삼차원.벡터2(0, 0), 카메라)

  // 닿은것찾기: three.js의 교차 기록(distance 등)을 그대로 주고 .물체 별칭을 붙인다.
  const 닿은 = 광선.닿은것찾기(장면.자식들)
  assert.equal(닿은[0].물체, 공)
  assert.equal(닿은[0].물체, 닿은[0].object)
  assert.equal(typeof 닿은[0].distance, 'number')
  assert.ok(닿은.some((기록) => 기록.물체 === 상자))

  // 교차확인: 기록이 아니라 물체 자체를 준다. 그룹 안의 물체가 맞으면 목록에 넣은 그룹이 나온다.
  assert.equal(광선.교차확인([그룹, 상자])[0], 그룹)
  assert.equal(광선.맞은것찾기([상자])[0], 상자)

  // 옛 이름: 카메라설정, 레이캐스트()
  광선.카메라설정(new 삼차원.벡터2(0, 0), 카메라)
  assert.equal(광선.교차확인([상자])[0], 상자)
  assert.equal(KCC3D.레이캐스트(KCC3D.레이캐스터만들기(), 카메라, [상자], 0, 0)[0].object, 상자)
})

test('옛 요약형 함수', () => {
  const 장면 = KCC3D.장면만들기()
  assert.ok(장면.isScene)
  const 카메라 = KCC3D.카메라만들기(60, 2)
  assert.deepEqual([카메라.fov, 카메라.aspect, 카메라.near, 카메라.far], [60, 2, 0.1, 1000])
  const 정사영 = KCC3D.정사영카메라만들기(800, 600)
  assert.deepEqual([정사영.left, 정사영.right, 정사영.top, 정사영.bottom], [-400, 400, 300, -300])

  const 도형들 = [
    KCC3D.큐브만들기(), KCC3D.구만들기(), KCC3D.평면만들기(), KCC3D.원통만들기(), KCC3D.원뿔만들기(),
    KCC3D.도넛만들기(), KCC3D.다면체만들기(), KCC3D.직육면체만들기(1, 2, 3), KCC3D.격자선만들기(),
    KCC3D.격자선만들기(10, 10, '빨강', '파랑'), KCC3D.축선만들기(),
  ]
  assert.deepEqual(도형들.map((도형) => 도형.geometry.type), [
    'BoxGeometry', 'SphereGeometry', 'PlaneGeometry', 'CylinderGeometry', 'ConeGeometry',
    'TorusGeometry', 'IcosahedronGeometry', 'BoxGeometry', 'BufferGeometry', 'BufferGeometry', 'BufferGeometry',
  ])

  const 큐브 = KCC3D.큐브만들기(1, { 색: '빨강', 와이어프레임: true })
  assert.equal(색값(큐브.material.color), 'ff0000')
  assert.equal(큐브.material.wireframe, true)
  assert.equal(KCC3D.재질만들기({ 색: '초록' }).type, 'MeshStandardMaterial')
  assert.ok(KCC3D.텍스처재질만들기(new THREE.Texture()).map.isTexture)

  assert.equal(KCC3D.장면에추가하기(장면, 큐브), 큐브)
  KCC3D.위치설정(큐브, 1, 2, 3)
  KCC3D.회전설정(큐브, 0.1, 0.2, 0.3)
  KCC3D.크기설정(큐브, 2, 2, 2)
  KCC3D.회전하기(큐브, 0, 0.1, 0)
  assert.equal(큐브.position.y, 2)
  assert.ok(Math.abs(큐브.rotation.y - 0.3) < 1e-12)
  assert.equal(큐브.scale.z, 2)
  KCC3D.바라보기(카메라, 0, 0, 0)

  const 빛종류 = ['주변빛', '환경빛', '점광', '점빛', '스포트라이트', '집중빛', '방향빛', '없는종류']
  assert.deepEqual(빛종류.map((종류) => KCC3D.빛추가하기(장면, 종류, { 색: '흰색', 세기: 0.3 }).type), [
    'AmbientLight', 'AmbientLight', 'PointLight', 'PointLight', 'SpotLight', 'SpotLight', 'DirectionalLight', 'DirectionalLight',
  ])

  KCC3D.배경색설정(장면, '하늘색')
  assert.equal(색값(장면.background), '87ceeb')
  KCC3D.안개설정(장면, '회색')
  assert.ok(장면.fog.isFog)

  const 빛 = KCC3D.빛추가하기(장면, '방향빛')
  KCC3D.그림자설정(빛, { 크기: 1024 })
  KCC3D.그림자설정(큐브)
  assert.deepEqual([빛.castShadow, 빛.shadow.mapSize.x, 큐브.castShadow, 큐브.receiveShadow], [true, 1024, true, true])

  const 그룹 = KCC3D.그룹만들기()
  KCC3D.그룹에추가하기(그룹, KCC3D.구만들기(0.1))
  KCC3D.장면에추가하기(장면, 그룹)
  const 넣은뒤 = 장면.children.length
  KCC3D.제거하기(장면, 그룹)
  assert.equal(장면.children.length, 넣은뒤 - 1)

  assert.equal(typeof KCC3D.경과시간(KCC3D.시계만들기()), 'number')
})

// ── 부드럽게돌기 ─────────────────────────────────────────────────────────────
// Node에는 WebGL이 없으므로, 그린 횟수만 세는 가짜 렌더러를 렌더링하기()에 넘겨 확인한다.
function 가짜렌더러() {
  const 렌더러 = { 그린횟수: 0, render() { 렌더러.그린횟수++ } }
  return 렌더러
}
function 그리기(렌더러, 장면, 카메라, 횟수) {
  for (let i = 0; i < 횟수; i++) KCC3D.렌더링하기(렌더러, 장면, 카메라)
}

test('옛 문법 렌더링하기()로 그려도 부드럽게돌기가 진행된다', () => {
  const 장면 = KCC3D.장면만들기()
  const 카메라 = KCC3D.카메라만들기(75, 1)
  const 렌더러 = 가짜렌더러()
  const 큐브 = KCC3D.장면에추가하기(장면, KCC3D.큐브만들기())
  const 목표 = Math.PI / 2

  큐브.부드럽게돌기(목표)
  assert.equal(큐브.rotation.y, 0, '예약만 하고 바로 돌지는 않는다')

  그리기(렌더러, 장면, 카메라, 1)
  assert.ok(Math.abs(큐브.rotation.y - 목표 * 0.04) < 1e-12, `한 번 그리면 남은 각도의 4%만큼 돈다 (실제 ${큐브.rotation.y})`)

  그리기(렌더러, 장면, 카메라, 299)
  assert.equal(큐브.rotation.y, 목표, '목표 각도에 정확히 멈춘다')
  그리기(렌더러, 장면, 카메라, 5)
  assert.equal(큐브.rotation.y, 목표, '도착한 뒤에는 더 움직이지 않는다')
  assert.equal(렌더러.그린횟수, 305, '렌더링하기 한 번에 render도 한 번')
})

test('부드럽게돌기는 가까운 방향으로 돈다', () => {
  const 장면 = KCC3D.장면만들기()
  const 카메라 = KCC3D.카메라만들기(75, 1)
  const 렌더러 = 가짜렌더러()
  const 큐브 = KCC3D.장면에추가하기(장면, KCC3D.큐브만들기())

  큐브.부드럽게돌기(Math.PI * 1.5) // 270도 앞보다 90도 뒤가 가깝다
  그리기(렌더러, 장면, 카메라, 1)
  assert.ok(큐브.rotation.y < 0)
  그리기(렌더러, 장면, 카메라, 300)
  assert.ok(Math.abs(큐브.rotation.y + Math.PI / 2) < 1e-12)
})
