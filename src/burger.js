//БУРГЕР МЕНЮ
function onLoadBurger() {
	let icon = document.getElementById('burger_icon')
	icon.addEventListener('click', on_burger_click)

	let buttons = document.getElementById('burger_buttons')
	buttons.style.display = 'none'
}

function on_burger_click() {
	let icon = document.getElementById('burger_icon')
	let buttons = document.getElementById('burger_buttons')

	let closed = icon.src.includes('close.png')
	let icon_path = !closed ? 'close.png' : 'burger.png'
	icon.src = icon_path

	let buttons_display = !closed ? 'flex' : 'none'
	buttons.style.display = buttons_display
}

//без сигнала не сработает, т.к. task_manager обновляет страницу сбрасывая все listener'ы
window.addEventListener('load', onLoadBurger)
