//ВСПЛЫВАЮЩЕЕ ОКНО
//*dialog всегда open, я меняю лишь visibility*
//*задний фон совсем отдельно*
//*костыльно, но в лабе нет уточнений*

function onLoadDialog() {
	//клик по форме - вызов модуля
	var form_input = document.getElementById('form_input')
	form_input.addEventListener('click', show_dialog)

	//клик вне формы - выход модуля
	let dialog_bg = document.getElementById('dialog_bg')
	dialog_bg.addEventListener('click', hide_dialog)

	let task_add_button = document.getElementById('task_add_button')
	task_add_button.addEventListener('click', hide_dialog)

	hide_dialog()
}

function show_dialog() {
	let dialog_bg = document.getElementById('dialog_bg')
	let task_box = document.getElementById('task_box')
	let form_box = document.getElementById('form_box')
	dialog_bg.style.visibility = 'visible'
	task_box.style.visibility = 'visible'
	form_box.style.visibility = 'hidden'
}

function hide_dialog() {
	let dialog_bg = document.getElementById('dialog_bg')
	let task_box = document.getElementById('task_box')
	let form_box = document.getElementById('form_box')
	dialog_bg.style.visibility = 'hidden'
	task_box.style.visibility = 'hidden'
	form_box.style.visibility = 'visible'
}

// сигнал 'при загрузке страницы'
if (window.location.pathname === '/tasks.html') {
	window.addEventListener('load', onLoadDialog)
}
