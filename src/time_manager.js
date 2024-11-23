//ВРЕМЯ
export function addTimeEvents(card) {
	const time_input = card.querySelector('.time_input')
	time_input.addEventListener('focus', function () {
		time_input.select()
	})

	time_input.addEventListener('keydown', function (event) {
		if (event.key === 'Enter') {
			//уборка фокуса при вводе
			this.blur()
			time_input.value = parse_time(time_input.value)
		}
	})
}

function parse_time(time_string) {
	const regex = /^((\d+)h)?\s*((\d+)m)?\s*((\d+)s)?$/
	const match = time_string.match(regex)

	if (match) {
		//тернарные операторы под каждую единицу времени
		const hours = match[2] ? parseInt(match[2], 10) : 0
		const minutes = match[4] ? parseInt(match[4], 10) : 0
		const seconds = match[6] ? parseInt(match[6], 10) : 0

		return `${hours}h ${minutes}m ${seconds}s`
	} else {
		return '0h 0m 0s'
	}
}

export function update_time(document) {
	if (!document) {
		return
	}
	const cards = document.getElementsByClassName('card')
	//обработчики для существующих карточек
	for (const card of cards) {
		const time_input = card.querySelector('.time_input')
		if (document.activeElement === time_input) {
			return
		}
		const time_string = parse_time(time_input.value)
		const regex = /^((\d+)h)?\s*((\d+)m)?\s*((\d+)s)?$/
		const match = time_string.match(regex)

		//тернарные операторы под каждую единицу времени
		let hours = match[2] ? parseInt(match[2], 10) : 0
		let minutes = match[4] ? parseInt(match[4], 10) : 0
		let seconds = match[6] ? parseInt(match[6], 10) : 0

		if (seconds > 59) {
			minutes += Math.floor(seconds / 60)
			seconds = seconds % 60
		}
		if (minutes > 59) {
			hours += Math.floor(minutes / 60)
			minutes = minutes % 60
		}
		if (hours > 23) {
			hours = 24
			minutes = 0
			seconds = 0
		}

		if (seconds > 0) {
			seconds--
		} else if (minutes > 0) {
			minutes--
			seconds = 59
		} else if (hours > 0) {
			hours--
			minutes = 59
			seconds = 59
		}

		time_input.value = `${hours}h ${minutes}m ${seconds}s`
	}
}
