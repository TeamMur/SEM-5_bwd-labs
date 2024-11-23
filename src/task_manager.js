const cards = document.getElementsByClassName('card')

//ПОДГОТОВКА (привязки)
//обработчики для существующих карточек
for (const card of cards) {
	addDeleteEvent(card)
	addMoveLeftEvent(card)
}

//обработчик для кнопки добавления
const addButton = document.getElementById('task_add_button')
addButton.addEventListener('click', () => {
	addCard(0) //новая карточка всегда в 1 столбец
})

//кнопка на стартовом экране бесполезна, но удалять ее не правильно
document.getElementById('add_button').disabled = true

//СОЗДАНИЕ
//создание карточки
function createCard() {
	// тег и класс
	const card = document.createElement('div')
	card.classList.add('card')

	// наполнение
	const addInput = document.getElementById('task_input')
	let text = addInput.value
	if (text == '') {
		text = 'Ничего не делать'
	}
	card.innerHTML = `
    <h3 class="card_head">Новая задача</h3>
    <p class="task">${text}</p>
    <div class="card_buttons">
      <input type="checkbox" />
      <button class="button_delete">-</button>
    </div>
  `
	//сброс
	addInput.value = ''

	return card
}

//ДОБАВЛЕНИЕ
//добавление карточки
function addCard(column, pattern) {
	let newCard

	if (!pattern) {
		newCard = createCard()
		addDeleteEvent(newCard)
		addMoveLeftEvent(newCard)
	} else {
		newCard = pattern
	}

	const taskTable = document.getElementById('task_table')
	const tableRows = taskTable.querySelectorAll('tr')

	//поиск свободной ячейки в данном столбце
	let freeTD
	for (const tr of tableRows) {
		const tds = tr.querySelectorAll('td')
		const td = tds[column] //только td-хи конкретного столбца
		if (!td) {
			continue
		}

		//если карточки нет, то td свобода
		if (!td.querySelector('.card')) {
			freeTD = td
		}
	}

	//если свободной клетки не найдено, то создается новая строка
	if (!freeTD) {
		//создание строки
		const tr = document.createElement('tr')
		taskTable.appendChild(tr)
		//добавление столбцов (их всегда 3)
		for (let i = 0; i < 3; i++) {
			const td = document.createElement('td')
			tr.appendChild(td)
			if (i == column) {
				freeTD = td
			}
		}
	}
	//добавление
	freeTD.appendChild(newCard)
	update_rows()
}

//ОБНОВЛЕНИЕ
//обновление строк
function update_rows() {
	const taskTable = document.getElementById('task_table')
	const tableRows = taskTable.querySelectorAll('tr')

	//смещение карточек
	//i = 1, т.к. 0 строка - заголовок, 1 всегда нужна для расчетов
	let changed = false
	for (let i = 2; i < tableRows.length; i++) {
		const tableData = tableRows[i].querySelectorAll('td')
		for (let j = 0; j < tableData.length; j++) {
			const td = tableData[j]
			const card = td.querySelector('.card')
			if (card) {
				const previous_td = tableRows[i - 1].querySelectorAll('td')[j]
				const previous_card = previous_td.querySelector('.card')
				if (!previous_card) {
					previous_td.appendChild(card)
					changed = true
				}
			}
		}
	}

	//удаление пустых строк
	for (const tr of tableRows) {
		if (!tr.querySelector('.card') && !tr.querySelector('th')) {
			tr.remove()
			changed = true
		}
	}

	//обновление до тех пор, пока изменения не перестанут появляться
	//рекурсия осторожно!!
	if (changed) {
		update_rows()
	}
}

//УДАЛЕНИЕ
//обработчик удаления карточки
function addDeleteEvent(card) {
	const deleteButton = card.querySelector('.button_delete')

	if (deleteButton) {
		deleteButton.addEventListener('click', () => {
			card.remove()
			update_rows()
		})
	}
}

//ПЕРЕМЕЩЕНИЕ
function moveLeft(card) {
	const td = card.parentElement
	const tr = td.parentElement

	const taskTable = document.getElementById('task_table')
	const tableRows = taskTable.querySelectorAll('tr')

	let next_column = 0

	//поиск колонки текущей карточки
	//i = 1, т.к 0 - шапка, j < ... - 1, т.к. некуда перемещать
	for (let i = 1; i < tableRows.length; i++) {
		const tds = tableRows[i].querySelectorAll('td')
		for (let j = 0; j < tds.length - 1; j++) {
			if (td == tds[j]) {
				next_column = j + 1
			}
		}
	}

	//перемещение на другой столбец
	if (next_column > 0) {
		addCard(next_column, card)
		//галочка
		const cb = card.querySelector('input')
		if (next_column < 2) {
			cb.checked = false
		} else {
			cb.disabled = true
		}
	}
}

function addMoveLeftEvent(card) {
	const checkbox = card.querySelector('input')

	if (checkbox) {
		checkbox.addEventListener('click', () => {
			moveLeft(card)
		})
	}
}
