import * as TWEEN from 'Tween'
// import data from './final.json'
// console.log('Dataloading ... OK')
import imgWaiter from './js/helper/waitImg'
import CameraControls from 'camera-controls'
// import JSZip from 'jszip'

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

let data
let objects = []
let tTime = []
let btns = document.getElementsByTagName('button')
let checks = document.getElementsByClassName('box')
let searchInput = document.getElementsByTagName('input')[0]
let currentKeyword = ''
let currentCheckedGrades = []
let currentPos = ''
let section = document.querySelector('section')
let toast = document.getElementById('toast')

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
	全: '部位',
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
	s: words[4],
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

let targets = { cards: [] }

//setup cameracontrols
CameraControls.install({ THREE: THREE })
const width = window.innerWidth
const height = window.innerHeight

const clock = new THREE.Clock()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 100)
const renderer = new THREE.CSS3DRenderer()
camera.position.z = 6000
renderer.setSize(width, height)
document.getElementById('container').appendChild(renderer.domElement)
// renderer.setClearColor( 0xffaa00, 1);

const cameraControls = new CameraControls(camera, renderer.domElement)
// cameraControls.addEventListener('change', render)
// cameraControls = new OrbitControls(camera, renderer.domElement)
cameraControls.minDistance = 10
cameraControls.maxDistance = 6000
// cameraControls.keyPanSpeed = 100
// cameraControls.zoomSpeed = 1
cameraControls.enableDamping = true
cameraControls.dollyToCursor = true
// cameraControls.verticalDragToForward = true
cameraControls.azimuthRotateSpeed = 1
cameraControls.polarRotateSpeed = 1
cameraControls.dollySpeed = 2
cameraControls.truckSpeed = 2

// cameraControls.rotateSpeed = 0.2
cameraControls.dampingFactor = 0.1

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
			(process.env.NODE_ENV === 'development'
				? data[i]['file'] + '<br>'
				: '') +
			data[i]['position'] +
			'<br>' +
			data[i]['p_type'] +
			'<br>' +
			(data[i]['min_p'] === undefined ? '' : data[i]['min_p']) +
			(data[i]['min_p'] === undefined ? '<br>' : ' ===> ') +
			(data[i]['max_p'] === undefined ? '' : data[i]['max_p'])
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
	console.log('url set... OK')
}
function toggleFullscreen(event) {
	let element = document.body
	let svgPath = document.getElementsByClassName('fullscreen')[0].children[0]
		.children[0]

	if (event instanceof HTMLElement) {
		element = event
	}

	let isFullscreen =
		document.webkitIsFullScreen || document.mozFullScreen || false

	element.requestFullScreen =
		element.requestFullScreen ||
		element.webkitRequestFullScreen ||
		element.mozRequestFullScreen ||
		function() {
			return false
		}
	document.cancelFullScreen =
		document.cancelFullScreen ||
		document.webkitCancelFullScreen ||
		document.mozCancelFullScreen ||
		function() {
			return false
		}
	if (isFullscreen) {
		document.cancelFullScreen()
		svgPath.setAttribute(
			'd',
			'M4.5 11H3v4h4v-1.5H4.5V11zM3 7h1.5V4.5H7V3H3v4zm10.5 6.5H11V15h4v-4h-1.5v2.5zM11 3v1.5h2.5V7H15V3h-4z'
		)
	} else {
		element.requestFullScreen()
		document.body.requestFullscreen()
		svgPath.setAttribute(
			'd',
			'M3 12.5h2.5V15H7v-4H3v1.5zm2.5-7H3V7h4V3H5.5v2.5zM11 15h1.5v-2.5H15V11h-4v4zm1.5-9.5V3H11v4h4V5.5h-2.5z'
		)
	}
}

function setupEvent() {

	toast.addEventListener("animationend", (a)=>{
		toast.classList.remove('show')
	}, false);

	for (const i in btns) {
		if (btns.hasOwnProperty(i)) {
			const e = btns[i]

			e.addEventListener('click', () => {
				document.activeElement.blur()
				if (e.innerText === 'RESET') {
					reset()
					return
				}

				if (i == 0) {
					toggleFullscreen()
					return
				}

				if (i == 1) {
					console.log('keymap')
					return
				}
				searchInput.value = btnOpr[e.innerText]
				filter()
			})
		}
	}

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
					document.activeElement.blur()
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
		e.addEventListener(
			'click',
			() => {
				document.activeElement.blur()
				if (i !== 14) {
					document.querySelectorAll('a')[14].innerText =
						posSimplifedMap[e.innerText]
					document
						.querySelectorAll('a')
						[i].classList.add('scale-in-center')
					filter()
					try {
						s.classList.remove('hidden')
					} catch (e) {
						//do nothing
					}
				} else {
					togglePosPick()
				}
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
				document
					.getElementsByClassName('whole-p')[0]
					.classList.remove('hidden')
			}
		} else if (e.keyCode in posOpr && shiftDown) {
			document.getElementsByClassName('pos')[0].children[0].innerText =
				posOpr[e.keyCode]

			document.querySelectorAll('a')[14].classList.add('scale-in-center')

			filter()
		} else if (e.code === 'Space') {
			reset()
		} else if (e.key === '+') {
			cameraControls.dollySpeed +=
				cameraControls.dollySpeed === 5 ? 0 : 0.5
			cameraControls.truckSpeed +=
				cameraControls.truckSpeed === 5 ? 0 : 0.5

			showtoast()
		} else if (e.key === '-') {
			cameraControls.dollySpeed -=
				cameraControls.dollySpeed === 0.5 ? 0 : 0.5
			cameraControls.truckSpeed -= showtoast()
		}
	}
	document.onkeyup = e => {
		//prevent filter when input focused
		if (document.activeElement === searchInput) return
		if (e.key === 'Shift') {
			shiftDown = false
			document
				.getElementsByClassName('whole-p')[0]
				.classList.add('hidden')
		}
	}
	searchInput.addEventListener('change', () => {
		filter()
	})
	window.addEventListener('resize', onWindowResize, false)
	console.log('Event setup ... OK')
}

function showtoast() {
	cameraControls.truckSpeed === 0.5 ? 0 : 0.5
	toast.innerText = '当前缩放、平移速度:' + cameraControls.dollySpeed
	toast.classList.add('show')
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
	// camera.aspect = window.innerWidth / window.innerHeight
	renderer.setSize(window.innerWidth, window.innerHeight)
	// console.log(VANTA);
	VANTA.current.resize()
	camera.updateProjectionMatrix()

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
		render()
		// console.log('rendered')
	}
	// cameraControls.update()
}

function render() {
	renderer.render(scene, camera)
}

function initBackground() {
	VANTA.CLOUDS({ el: '#container' })
	console.log('background set ... OK')
}

// https://obs-e263.obs.ap-southeast-1.myhuaweicloud.com/final.json

document.addEventListener('DOMContentLoaded', () => {
	initBackground()

	// TODO: use svg or simple ascii animation as loading effect.

	getJson().then(d => {
		if (process.env.NODE_ENV === 'development') {
			data = require('./final.json')
		} else {
			data = d
		}
		console.log('data set ... OK')
		section.classList.remove('hidden')
		section.classList.add('text-focus-in')
		document.querySelectorAll('a').forEach(a => {
			a.addEventListener('animationend', e => {
				e.target.classList.remove('scale-in-center')
			})
		})

		initCard()
		setupEvent()

		// focus in effect

		render()
		console.log('render object ... OK')
		imgWaiter(document, () => {
			console.log('image load ... OK')
			transform(targets.cards, 1000)
			animate()
		})
	})
})

function getJson() {
	return fetch(
		'https://obs-e263.obs.ap-southeast-1.myhuaweicloud.com/final.json'
	)
		.then(r => r.json())
		.catch(error => {
			document.querySelector('input').value = '数据获取粗错'
			console.error('Error:', error)
		})
}

//  function getZippedJson() {
// 	return fetch('https://obs-e263.obs.myhwclouds.com/final.zip')
// 		.then(function(response) {
// 			if (response.status === 200 || response.status === 0) {
// 				return Promise.resolve(response.blob())
// 			} else {
// 				return Promise.reject(new Error(response.statusText))
// 			}
// 		})
// 		.then(JSZip.loadAsync)
// 		.then(function(zip) {
// 			console.log('unzip file... OK');
// 			return zip.file('final.json').async('string')
// 		})
// 		.then(
// 			function success(text) {
// 				return eval(text)
// 			},
// 			function error(e) {
// 				console.log(e)
// 			}
// 		)
// }
