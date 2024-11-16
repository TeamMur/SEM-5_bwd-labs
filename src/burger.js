//БУРГЕР МЕНЮ
var burger = document.getElementById('burger')
var buttons = document.getElementById('burger_buttons')
var icon = document.getElementById('burger_icon')

icon.addEventListener('click', on_burger_click)

function on_burger_click() {
	let closed = icon.src.includes('close.png')
	let icon_path = !closed ? 'close.png' : 'burger.png'
	icon.src = icon_path

	let buttons_display = !closed ? 'flex' : 'none'
	buttons.style.display = buttons_display
}
buttons.style.display = 'none'
