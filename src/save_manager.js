//СОХРАНЕНИЕ
//сохранение
export function savePage(document) {
	//создание значений
	const input_times = document.querySelectorAll('.time_input')
	const task_box = document.querySelectorAll('.task')
	const tds = document.querySelectorAll('td')
	let values = []
	let tasks = []
	let cards = []
	for (const it of input_times) {
		values.push(it.value)
	}
	for (const t of task_box) {
		tasks.push(t.textContent)
	}
	for (const td of tds) {
		if (td.querySelector('.card')) {
			cards.push(true)
		} else {
			cards.push(false)
		}
	}
	//выгрузка
	localStorage.setItem('values', values)
	localStorage.setItem('tasks', tasks)
	localStorage.setItem('cards', cards)

	// let currentDate = new Date()
	// let h = currentDate.getHours()
	// let m = currentDate.getMinutes()
	// let s = currentDate.getSeconds()
	// let exit_time = `${h}h ${m}m ${s}s`
	// localStorage.setItem('exit_time', exit_time)
}

//загрузка
import { addCard } from './task_manager'
export function loadPage(document) {
	//загрузка значений
	const values = localStorage.getItem('values')
	const tasks = localStorage.getItem('tasks')
	const cards_bools = localStorage.getItem('cards')
	const splitValues = values.split(',')
	const splitTasks = tasks.split(',')
	const splitCards = cards_bools.split(',')
	//установка значений

	const tds = document.querySelectorAll('td')
	for (const td of tds) {
		td.innerHTML = ''
	}
	for (let i = 0; i < splitCards.length; i++) {
		if (splitCards[i] == 'true') {
			addCard(i % 3)
		}
	}

	const input_times = document.getElementsByClassName('time_input')
	const task_box = document.querySelectorAll('.task')
	for (let i = 0; i < input_times.length; i++) {
		input_times[i].value = splitValues[i] //время минус разница входа/выхода
		task_box[i].textContent = splitTasks[i]
	}

	// let currentDate = new Date()
	// let h = currentDate.getHours()
	// let m = currentDate.getMinutes()
	// let s = currentDate.getSeconds()
	// let load_time = `${h}h ${m}m ${s}s`
	// localStorage.setItem('load_time', load_time)
}
