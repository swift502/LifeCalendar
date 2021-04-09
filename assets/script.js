const timeSpans = [
	{
		from: 1093,
		to: 1412,
		title: "Střední",
		color: "#0084ff"
	}
];

// #0084ff
// #44bec7
// #ffc300
// #fa3c4c
// #d696bb
// #d11141
// #00b159
// #00aedb
// #f37735
// #ffc425

const now = Date.now();
const birthday = new Date("1997-07-30");
const lifespan = 80;
const usedWeeks = Math.round((now - birthday) / 7 / 86400.0 / 1000.0);
const allWeeks = lifespan * 52;

const calendar = document.getElementById('calendar');

for (let y = 1; y <= lifespan; y++)
{
	const year = document.createElement('div');
	year.classList.add('year');

	if (y % 5 == 0)
	{
		const yearLabel = document.createElement('span');
		yearLabel.classList.add('year-label');
		yearLabel.innerText = y.toString();
		year.appendChild(yearLabel);
	}

	const weekList = document.createElement('ol');
	weekList.classList.add('week-list');
	for (let w = 0; w < 52; w++)
	{
		const week = document.createElement('li');
		week.classList.add('week');

		const id = (y - 1) * lifespan + (w + 1);
		week.title = id;
		timeSpans.forEach(span => {
			if (id >= span.from && id <= span.to)
			{
				week.style = `background: ${span.color}; border-color: ${span.color};`;
				week.title = span.title;
			}
		});

		if (((y - 1) * 52 + w) < usedWeeks)
		{
			week.classList.add('spent');
		}
		weekList.appendChild(week);
	}
	year.appendChild(weekList);
	calendar.appendChild(year);
}