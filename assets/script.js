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
const lifespan = 90;
const europeMaleLifeExpectancy = 78.6;

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
const expectancyWeek = Math.min(allWeeks - 1, Math.round(europeMaleLifeExpectancy * 52) - 1);
const expectancyWeeks = expectancyWeek + 1;

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

		const index = y * 52 + w;
		const spent = index < usedWeeks;
		const current = index === usedWeeks;
		const expectancy = index === expectancyWeek;
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

		if (current)
		{
			week.classList.add('current');
			week.title = 'Current week';
		}

		if (expectancy)
		{
			week.classList.add('expectancy');
			week.title = `Average male life expectancy in Europe (${europeMaleLifeExpectancy} years)`;
		}
		weekList.appendChild(week);
	}
	year.appendChild(weekList);
	calendar.appendChild(year);
}

// Live counters
const weeksLeft = Math.max(0, expectancyWeeks - usedWeeks);
const percentLived = Math.min(100, (usedWeeks / expectancyWeeks) * 100);

const expectancyLabel = document.getElementById('expectancy-label');
if (expectancyLabel)
{
	expectancyLabel.textContent = europeMaleLifeExpectancy.toString();
}

const metricNote = document.getElementById('metric-note');
if (metricNote)
{
	metricNote.textContent = `* Measured against a ${europeMaleLifeExpectancy} year life span expectancy`;
}

const stats = [
	{ value: usedWeeks.toLocaleString(), label: 'weeks lived' },
	{ value: weeksLeft.toLocaleString(), label: 'weeks left*' },
	{ value: `${percentLived.toFixed(1)}%`, label: 'of life*' }
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

const markerLegend = document.createElement('div');
markerLegend.classList.add('legend-row', 'marker-row');

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

[
	{ title: 'Current week', className: 'current-swatch' },
	{ title: `Average male life expectancy in Europe`, className: 'expectancy-swatch' }
].forEach(marker => {
	const item = document.createElement('div');
	item.classList.add('legend-item');

	const swatch = document.createElement('span');
	swatch.classList.add('legend-swatch', marker.className);

	const label = document.createElement('span');
	label.textContent = marker.title;

	item.append(swatch, label);
	markerLegend.appendChild(item);
});

legendContainer.appendChild(markerLegend);
