function drawCalendar(birthday, lifespan)
{
	const now = Date.now()
	const usedWeeks = Math.round((now - birthday) / 7 / 86400.0 / 1000.0)
	const allWeeks = lifespan * 52

	const calendar = document.getElementById('calendar')
	while (calendar.firstChild)
	{
		calendar.removeChild(calendar.lastChild)
	}
	for (let y = 1; y <= lifespan; y++)
	{
		const year = document.createElement('div')
		year.classList.add('year')

		const yearLabel = document.createElement('span')
		yearLabel.classList.add('year-label')
		if (y % 5 == 0)
		{
			yearLabel.innerText = y.toString()
		}
		year.appendChild(yearLabel)

		const weekList = document.createElement('ol')
		weekList.classList.add('week-list')
		for (let w = 0; w < 52; w++)
		{
			const week = document.createElement('li')
			week.classList.add('week')
			if (((y - 1) * 52 + w) < usedWeeks)
			{
				week.classList.add('spent')
			}
			weekList.appendChild(week)
		}
		year.appendChild(weekList)
		calendar.appendChild(year)
	}
}

drawCalendar(new Date("1997-07-30"), 90);