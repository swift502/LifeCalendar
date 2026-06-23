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
const europeMaleLifeExpectancy = 78;

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
const totalWeeks = Math.round(europeMaleLifeExpectancy * 52);
const totalYears = Math.ceil(totalWeeks / 52);

const calendar = document.getElementById('calendar');

for (let y = 0; y < totalYears; y++)
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
		const index = y * 52 + w;
		if (index >= totalWeeks)
		{
			break;
		}

		const week = document.createElement('li');
		week.classList.add('week');

		const spent = index < usedWeeks;
		const id = index + 1;
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

// Live counters
const weeksLeft = Math.max(0, totalWeeks - usedWeeks);
const percentLived = Math.min(100, (usedWeeks / totalWeeks) * 100);
const summersLeft = Math.max(0, totalYears - age);

const expectancyLabel = document.getElementById('expectancy-label');
if (expectancyLabel)
{
	expectancyLabel.textContent = europeMaleLifeExpectancy.toString();
}

const metricNote = document.getElementById('metric-note');
if (metricNote)
{
	metricNote.textContent = `Spans across a ${europeMaleLifeExpectancy} year EU male life expectancy`;
}

const stats = [
	{ value: usedWeeks.toLocaleString(), label: 'weeks lived' },
	{ value: weeksLeft.toLocaleString(), label: 'weeks left' },
	{ value: summersLeft.toLocaleString(), label: 'summers left' },
	{ value: `${Math.round(percentLived)}%`, label: 'of life' }
];

const statsContainer = document.getElementById('stats');
stats.forEach(({ value, label }) => {
	const stat = document.createElement('div');
	stat.classList.add('stat');

	const statValue = document.createElement('span');
	statValue.classList.add('stat-value');
	statValue.textContent = value;

	const statLabel = document.createElement('span');
	statLabel.classList.add('stat-label');
	statLabel.textContent = label;

	stat.append(statValue, statLabel);
	statsContainer.appendChild(stat);
});

// Legend
const legendContainer = document.getElementById('legend');
const historyLegend = document.createElement('div');
historyLegend.classList.add('legend-row');

timeSpans.forEach(span => {
	const item = document.createElement('div');
	item.classList.add('legend-item');

	const swatch = document.createElement('span');
	swatch.classList.add('legend-swatch');
	swatch.style.background = span.color;

	const label = document.createElement('span');
	label.textContent = span.title;

	item.append(swatch, label);
	historyLegend.appendChild(item);
});

legendContainer.appendChild(historyLegend);
