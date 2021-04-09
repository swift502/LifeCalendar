// Blue dark to light
// #005073
// #107dac
// #189ad3
// #1ebbd7
// #71c7ec

// Green dark to light
// #234d20
// #36802d
// #77ab59
// #c9df8a
// #f0f7da

const timeSpans = [
	{
		from: 105,
		to: 260,
		title: "Školka",
		color: "#1ebbd7"
	},
	{
		from: 261,
		to: 728,
		title: "Základní škola",
		color: "#189ad3"
	},
	{
		from: 729,
		to: 936,
		title: "Střední",
		color: "#107dac"
	},
	{
		from: 937,
		to: 988,
		title: "Vysoká",
		color: "#005073"
	},
	{
		from: 989,
		to: Number.MAX_SAFE_INTEGER,
		title: "Haug-land",
		color: "#77ab59"
	}
];

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

		const spent = (y - 1) * 52 + w < usedWeeks;
		const id = (y - 1) * 52 + (w + 1);
		// week.title = id;
		timeSpans.forEach(span => {
			if (spent && id >= span.from && id <= span.to)
			{
				week.style = `background: ${span.color}; border-color: ${span.color};`;
				week.title = span.title;
			}
		});

		if (spent)
		{
			week.classList.add('spent');
		}
		weekList.appendChild(week);
	}
	year.appendChild(weekList);
	calendar.appendChild(year);
}