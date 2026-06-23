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
		title: "Práce",
		color: "#77ab59"
	}
];

const now = new Date();
const birthday = new Date("1997-07-30");
const lifespan = 65;

// Map the current date onto the same 52-weeks-per-year grid the calendar renders.
// Counting real elapsed weeks (~52.18/year) drifts against the 52-square rows,
// so instead measure full years of life plus the week within the current year.
let age = now.getFullYear() - birthday.getFullYear();
const anniversary = new Date(birthday);
anniversary.setFullYear(birthday.getFullYear() + age);
if (anniversary > now)
{
	age--;
	anniversary.setFullYear(birthday.getFullYear() + age);
}
const daysIntoYear = Math.floor((now - anniversary) / 86400000);
const weekOfYear = Math.min(51, Math.floor(daysIntoYear / 7));
const usedWeeks = age * 52 + weekOfYear;
const allWeeks = lifespan * 52;

const calendar = document.getElementById('calendar');

for (let y = 0; y <= lifespan - 1; y++)
{
	const year = document.createElement('div');
	year.classList.add('year');

	if (y > 0 && y % 5 == 0)
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

		const spent = y * 52 + w < usedWeeks;
		const id = y * 52 + (w + 1);
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
