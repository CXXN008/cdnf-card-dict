import * as TWEEN from 'Tween'
import data from './final.json'
console.log('Dataloading ... OK')
import test from './js/helper/waitImg'
import CameraControls from 'camera-controls'

// import TA from 'text-animate'

// const anim = TA.controller()
// const seed = Math.random()

// const eTextAni = {
// 	etchSpeed: 10 + Math.round(Math.random() * 4),
// 	targetBGColor: 'rgba(0,255,0,0)',
// 	targetFGColor: 'rgba(0,255,0,1)',
// 	etchBGColor: 'rgb(0,255,0)',
// 	etchFGColor: 'rgb(0,255,0)',
// 	seed
// }

let objects = []
let btns = document.getElementsByTagName('button')
let checks = document.getElementsByClassName('box')
let searchInput = document.getElementsByTagName('input')[0]
let currentKeyword = ''
let currentCheckedGrades = []
var currentPos = ''

let shiftDown = false

//material colors
const colors = ['#9E9E9E', '#2196F3', '#9C27B0', '#E91E63', '#FF9800']

const words = [
	'冰属性强化',
	'火属性强化',
	'暗属性强化',
	'光属性强化',
	'所有属性强化',
	'力量',
	'智力',
	'体力',
	'精神',
	'物理攻击力',
	'魔法攻击力',
	'独立攻击力'
]

const posOpr = {
	49: '头肩',
	50: '上衣',
	81: '下装',
	87: '腰带',
	65: '鞋',
	83: '全',
	51: '武器',
	52: '称号',
	69: '手镯',
	82: '项链',
	68: '辅助装备',
	70: '戒指',
	67: '耳环',
	86: '魔法石'
}

const posSimplifedMap = {
	肩: '头肩',
	上: '上衣',
	下: '下装',
	腰: '腰带',
	鞋: '鞋',
	全: '',
	部位: '',
	武: '武器',
	称: '称号',
	镯: '手镯',
	链: '项链',
	左: '辅助装备',
	戒: '戒指',
	耳: '耳环',
	右: '魔法石'
}

const btnOpr = {
	冰: words[0],
	火: words[1],
	暗: words[2],
	光: words[3],
	全: words[4],
	力: words[5],
	智: words[6],
	体: words[7],
	精: words[8],
	物: words[9],
	魔: words[10],
	独: words[11]
}
const keyOpr = {
	b: words[0],
	h: words[1],
	a: words[2],
	g: words[3],
	q: words[4],
	l: words[5],
	z: words[6],
	t: words[7],
	j: words[8],
	w: words[9],
	m: words[10],
	d: words[11]
}

const colorTem = {
	white: colors[0],
	blue: colors[1],
	purples: colors[2],
	pink: colors[3],
	orange: colors[4]
}
const colorOpr = {
	白: colors[0],
	蓝: colors[1],
	紫: colors[2],
	粉: colors[3],
	橙: colors[4]
}

var targets = { cards: [] }

//setup cameracontrols
CameraControls.install({ THREE: THREE })
const width = window.innerWidth
const height = window.innerHeight
const clock = new THREE.Clock()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 100)
camera.position.z = 6000

const renderer = new THREE.CSS3DRenderer()
renderer.setSize(width, height)
document.getElementById('container').appendChild(renderer.domElement)
// renderer.setClearColor( 0xffaa00, 1);

const cameraControls = new CameraControls(camera, renderer.domElement)
console.log(cameraControls)
// cameraControls.addEventListener('change', render)
// cameraControls = new OrbitControls(camera, renderer.domElement)
cameraControls.minDistance = 10
cameraControls.maxDistance = 6000
// cameraControls.keyPanSpeed = 100
// cameraControls.zoomSpeed = 1
cameraControls.enableDamping = true
cameraControls.dollyToCursor = true
cameraControls.verticalDragToForward = true
cameraControls.azimuthRotateSpeed = 1
cameraControls.polarRotateSpeed = 1
cameraControls.dollySpeed = 1
cameraControls.truckSpeed = 1

// cameraControls.rotateSpeed = 0.2
cameraControls.dampingFactor = .1

function initCard() {
	// cards init

	for (const i in data) {
		var img = document.createElement('img')
		img.className = 'img'
		img.src = data[i]['url']

		var element = document.createElement('div')
		element.className = 'element'
		element.appendChild(img)

		var title = document.createElement('div')
		title.className = 'title'
		title.textContent = data[i]['name']
		title.style.color = colorTem[data[i]['grade']]
		element.appendChild(title)

		// var symbol = document.createElement('div')
		// symbol.className = 'symbol'
		// symbol.textContent = table[i]
		// element.appendChild(symbol)

		var details = document.createElement('div')
		details.className = 'details'
		details.innerHTML =
			data[i]['position'] +
			'<br>' +
			data[i]['p_type'] +
			'<br>' +
			data[i]['min_p'] +
			' ===> ' +
			data[i]['max_p']
		element.appendChild(details)

		element.onmouseenter = e => {
			document.querySelectorAll('h3').forEach((e, d) => {
				e.innerText =
					data[i][
						[
							'upgradable',
							'e_pkc',
							'hechengqi',
							'hecheng',
							'extra'
						][d]
					]

				// anim.add(TA.text(e, eTextAni))
			})
		}

		element.onmouseleave = e => {
			document.querySelectorAll('h3').forEach(e => {
				e.innerText = ''
			})
		}

		var object = new THREE.CSS3DObject(element)
		object.position.x = Math.random() * 10000 - 1582 * 4
		object.position.y = Math.random() * 10000 - 990 * 4
		object.position.z = Math.random() * 10000
		scene.add(object)

		objects.push(object)

		//

		var object = new THREE.Object3D()
		// object.position.x = (table[i + 3] * 226) - 1330
		object.position.x = (i % 30) * 226 - 1582 * 2
		// object.position.y = - (table[i + 4] * 288) + 990
		object.position.y = -(Math.floor(i / 30) * 288) + 990 * 2

		object.userData = data[i]
		targets.cards.push(object)

		element.addEventListener(
			'click',
			(e, i) => {
				console.log(e, i)
			},
			false
		)
	}

	// transform(targets.cards, 1000)

	console.log('Card img url set... OK')
}

function setupEvent() {
	for (const i in btns) {
		if (btns.hasOwnProperty(i)) {
			const e = btns[i]
			e.addEventListener('click', () => {
				if (i == 0) {
					reset()
					return
				}
				searchInput.value = btnOpr[e.innerText]
				filter()
			})
		}
	}
	document.getElementsByClassName('pos')[0].addEventListener(
		'click',
		() => {
			togglePosPick()
		},
		false
	)
	//fix focus
	document
		.getElementById('container')
		.addEventListener('click', () => document.activeElement.blur(), false)
	// toggle backgroundColor
	for (const i in checks) {
		if (checks.hasOwnProperty(i)) {
			const e = checks[i]
			checks[i].style.backgroundColor =
				checks[i].style.backgroundColor === ''
					? colorOpr[e.innerText]
					: ''
			e.addEventListener(
				'click',
				m => {
					m.target.style.backgroundColor =
						m.target.style.backgroundColor === ''
							? colorOpr[m.target.innerText]
							: ''
					filter()
				},
				false
			)
		}
	}
	document.body.onselectstart = () => false
	document.querySelectorAll('a').forEach((e, i) => {
		//前14个
		if (i === 14) return
		e.addEventListener(
			'click',
			() => {
				document.getElementsByClassName(
					'pos'
				)[0].children[0].innerText = posSimplifedMap[e.innerText]
			},
			false
		)
	})
	//key bind
	document.onkeydown = e => {
		//prevent filter when input focused
		if (document.activeElement === searchInput) {
			if (e.key === 'Enter') {
				searchInput.blur()
			}
			return
		}
		//key event
		if (e.key in keyOpr && !shiftDown) {
			searchInput.value = keyOpr[e.key]
			filter()
		} else if (
			e.key === '1' ||
			e.key === '2' ||
			e.key === '3' ||
			e.key === '4' ||
			e.key === '5'
		) {
			checks[e.key - 1].click()
		} else if (e.key === 'Enter') {
			searchInput.focus()
		} else if (e.key === 'Shift') {
			if (!shiftDown) {
				shiftDown = true
				togglePosPick()
			}
		} else if (e.keyCode in posOpr && shiftDown) {
			document.getElementsByClassName('pos')[0].children[0].innerText =
				posOpr[e.keyCode]
			filter()
		} else if (e.code === 'Space') {
			reset()
		}
	}
	document.onkeyup = e => {
		//prevent filter when input focused
		if (document.activeElement === searchInput) return
		if (e.key === 'Shift') {
			shiftDown = false
			togglePosPick()
		}
	}
	searchInput.addEventListener('change', () => {
		filter()
	})
	window.addEventListener('resize', onWindowResize, false)
	console.log('Event setup ... OK')
}

function togglePosPick() {
	let s = document.getElementsByClassName('whole-p')[0]
	if (s.classList.length > 1) {
		s.classList.remove('hidden')
	} else {
		s.classList.add('hidden')
	}
}

function getCurrentPos() {
	return document.getElementsByClassName('pos')[0].children[0].innerText
}

function getCurrentSearchWords() {
	return searchInput.value
}

function filter() {
	cameraControls.reset(true)

	currentKeyword = getCurrentSearchWords()
	currentCheckedGrades = getCheckedColors()
	let cp = getCurrentPos()
	currentPos = cp === '全' || cp === '部位' ? '' : cp

	console.log(currentKeyword, currentCheckedGrades, currentPos)
	var offset = 0
	for (let i = 0; i < targets.cards.length; i++) {
		const e = targets.cards[i]
		const pos =
			e.userData['position'] === undefined ? '' : e.userData['position']
		if (
			e.userData['p_type'].search(currentKeyword) > -1 &&
			currentCheckedGrades.includes(e.userData['grade']) &&
			pos.search(currentPos) > -1
		) {
			targets.cards[i].position.x = ((i - offset) % 30) * 226 - 1582 * 2
			targets.cards[i].position.y =
				-(Math.floor((i - offset) / 30) * 288) + 990 * 2
			targets.cards[i].position.z = 0
		} else {
			targets.cards[i].position.x = 30 * 226 - 1582 * 2 - offset / 5
			targets.cards[i].position.y =
				(-data.length / 30) * 288 + 990 * 2 - offset / 10
			targets.cards[i].position.z = offset / 5
			offset++
		}
	}

	transform(targets.cards, 500)
}

function reset() {
	//data
	currentKeyword = ''
	//ui
	searchInput.value = ''

	//data
	for (const i in checks) {
		if (checks.hasOwnProperty(i)) {
			const e = checks[i]
			checks[i].style.backgroundColor = colorOpr[e.innerText]
		}
	}
	//ui
	currentCheckedGrades = ['white', 'blue', 'purples', 'pink', 'orange']

	//data
	currentPos = ''
	//ui
	document.getElementsByClassName('pos')[0].children[0].innerText = '部位'

	filter()
	// for (let i = 0; i < targets.cards.length; i++) {
	// 	targets.cards[i].position.x = (i % 30) * 226 - 1582 * 2
	// 	targets.cards[i].position.y = -(Math.floor(i / 30) * 288) + 990 * 2
	// }
	// transform(targets.cards, 500)
}

function transform(targets, duration) {
	TWEEN.removeAll()

	for (var i = 0; i < objects.length; i++) {
		var object = objects[i]
		var target = targets[i]

		new TWEEN.Tween(object.position)
			.to(
				{
					x: target.position.x,
					y: target.position.y,
					z: target.position.z
				},
				Math.random() * duration + duration
			)
			.easing(TWEEN.Easing.Exponential.InOut)
			.start()

		new TWEEN.Tween(object.rotation)
			.to(
				{
					x: target.rotation.x,
					y: target.rotation.y,
					z: target.rotation.z
				},
				Math.random() * duration + duration
			)
			.easing(TWEEN.Easing.Exponential.InOut)
			.start()
	}

	new TWEEN.Tween(this)
		.to({}, duration * 2)
		.onUpdate(render)
		.start()
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()

	renderer.setSize(window.innerWidth, window.innerHeight)

	render()
}

function getCheckedColors() {
	let r = []
	for (const i in checks) {
		if (checks.hasOwnProperty(i)) {
			const e = checks[i]
			if (e.style.backgroundColor !== '') {
				r.push(Object.keys(colorTem)[i])
			}
		}
	}
	return r
}

function getCurrentKeywords() {
	return currentKeyword
}

function animate() {
	const delta = clock.getDelta()
	const elapsed = clock.getElapsedTime()
	const updated = cameraControls.update(delta)

	requestAnimationFrame(animate)
	TWEEN.update()

	if (updated) {
		renderer.render(scene, camera)
		console.log('rendered')
	}
	// cameraControls.update()
}

function render() {
	renderer.render(scene, camera)
}

function initBackground() {
	VANTA.CLOUDS({ el: '#container' })
	console.log('Background ... OK')
}

document.addEventListener('DOMContentLoaded', () => {
	initBackground()
	initCard()
	setupEvent()
	console.log('gpu resources ... OK')
	transform(targets.cards, 1000)
	TWEEN.update()
	console.log('image load ... OK')
	test(document, () => {
		transform(targets.cards, 1000)
		animate()
	})
})
