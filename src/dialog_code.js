//ВСПЛЫВАЮЩЕЕ ОКНО
function printMousePos(e) {
	console.log(`Координаты на странице: X = ${e.pageX}, Y = ${e.pageY}`)
	console.log(
		`Координаты относительно видимой области: X = ${e.clientX}, Y = ${e.clientY}`
	)
}

//*dialog всегда open, я меняю лишь visibility*
//*задний фон совсем отдельно*
//*костыльно, но в лабе нет уточнений*

//клик по форме - вызов модуля
var task_box = document.getElementById('task_box')
var form_box = document.getElementById('form_box')

var form_input = document.getElementById('form_input')
form_input.addEventListener('click', show_dialog)

function show_dialog() {
	console.log('показано')
	dialog_bg.style.visibility = 'visible'
	task_box.style.visibility = 'visible'
	form_box.style.visibility = 'hidden'
}

//клик вне формы - выход модуля
var dialog_bg = document.getElementById('dialog_bg')
dialog_bg.addEventListener('click', hide_dialog)

var task_add_button = document.getElementById('task_add_button')
task_add_button.addEventListener('click', hide_dialog)

function hide_dialog() {
	console.log('спрятано')
	dialog_bg.style.visibility = 'hidden'
	task_box.style.visibility = 'hidden'
	form_box.style.visibility = 'visible'
}

hide_dialog()
