export default [
	{
		label: KaliFormsObject.translations.mathHelper.sum,
		id: 'sum',
		args: -1,
		formula: '%s=sum(%s)',
	},
	{
		label: KaliFormsObject.translations.mathHelper.subtract,
		id: 'subtract',
		args: 2,
		formula: '%s=subtract(%s)'
	},
	{
		label: KaliFormsObject.translations.mathHelper.divide,
		id: 'divide',
		args: 2,
		formula: '%s=divide(%s)'
	},
	{
		label: KaliFormsObject.translations.mathHelper.multiply,
		id: 'multiply',
		args: -1,
		formula: '%s=multiply(%s)'
	},
	{
		label: KaliFormsObject.translations.mathHelper.arithmeticAverage,
		id: 'arithmeticAverage',
		args: -1,
		formula: '%1s=sum(%3s)/%2s'
	},
	{
		label: KaliFormsObject.translations.mathHelper.bmiImperial,
		id: 'bmiImperial',
		args: 2,
		formula: '%1s=multiply(703,%2s)/pow(%3s, 2)',
		argsHelper: [
			KaliFormsObject.translations.mathHelper.bmiArgs.weight,
			KaliFormsObject.translations.mathHelper.bmiArgs.height,
		],
	},
	{
		label: KaliFormsObject.translations.mathHelper.bmiMetric,
		id: 'bmiMetric',
		args: 2,
		formula: '%1s=%2s/pow(%3s/100, 2)',
		argsHelper: [
			KaliFormsObject.translations.mathHelper.bmiArgs.weight,
			KaliFormsObject.translations.mathHelper.bmiArgs.height,
		],
	},
	{
		label: KaliFormsObject.translations.mathHelper.minutesToSeconds,
		id: 'minutesToSeconds',
		args: 1,
		formula: '%1s=%2s minute to seconds',
	},
	{
		label: KaliFormsObject.translations.mathHelper.secondsToMinute,
		id: 'secondsToMinute',
		args: 1,
		formula: '%1s=%2s seconds to minute',
	},
	{
		label: KaliFormsObject.translations.mathHelper.secondsToHour,
		id: 'secondsToHour',
		args: 1,
		formula: '%1s=%2s seconds to hour',
	},
	{
		label: KaliFormsObject.translations.mathHelper.minutesToHours,
		id: 'minutesToHours',
		args: 1,
		formula: '%1s=%2s minutes to hour',
	},
	{
		label: KaliFormsObject.translations.mathHelper.hourMinuteSeconds,
		id: 'hourMinuteSeconds',
		args: 3,
		formula: '%1s=sum(%2s hour to seconds, %3s minute to seconds, %4s second to second) to seconds',
		argsHelper: [
			KaliFormsObject.translations.mathHelper.runningTimeArgs.hours,
			KaliFormsObject.translations.mathHelper.runningTimeArgs.minutes,
			KaliFormsObject.translations.mathHelper.runningTimeArgs.seconds,
		],
	},
	{
		label: KaliFormsObject.translations.mathHelper.speed,
		id: 'speed',
		args: 2,
		formula: '%1s=%2s km/%3s hour',
		argsHelper: [
			KaliFormsObject.translations.mathHelper.speedArgs.distance,
			KaliFormsObject.translations.mathHelper.speedArgs.time,
		],
	},
	{
		label: KaliFormsObject.translations.mathHelper.pace,
		id: 'pace',
		args: 4,
		formula: '%1s=minuteConverter(sum(%2s hour to seconds, %3s minutes to seconds, %4s seconds to seconds)/%5s to minutes)',
		argsHelper: [
			KaliFormsObject.translations.mathHelper.runningTimeArgs.hours,
			KaliFormsObject.translations.mathHelper.runningTimeArgs.minutes,
			KaliFormsObject.translations.mathHelper.runningTimeArgs.seconds,
			KaliFormsObject.translations.mathHelper.runningTimeArgs.distance,
		],
	},
	{
		label: KaliFormsObject.translations.mathHelper.runningTime,
		id: 'runningTime',
		args: 3,
		formula: '%1s=hourMinuteConverter(multiply(%2s, sum(%3s minutes to seconds, %4s seconds to seconds)) to minutes)',
		argsHelper: [
			KaliFormsObject.translations.mathHelper.runningTimeArgs.distance,
			KaliFormsObject.translations.mathHelper.runningTimeArgs.minutes,
			KaliFormsObject.translations.mathHelper.runningTimeArgs.seconds,
		],
	},
	{
		label: KaliFormsObject.translations.mathHelper.runningDistance,
		id: 'runningDistance',
		args: 5,
		formula: '%1s=sum(%2s hour to seconds, %3s minutes to seconds, %4s seconds to seconds)/sum(%5s minutes to seconds, %6s seconds to seconds)',
		argsHelper: [
			KaliFormsObject.translations.mathHelper.runningTimeArgs.hours,
			KaliFormsObject.translations.mathHelper.runningTimeArgs.minutes,
			KaliFormsObject.translations.mathHelper.runningTimeArgs.seconds,
			KaliFormsObject.translations.mathHelper.runningTimeArgs.minutes,
			KaliFormsObject.translations.mathHelper.runningTimeArgs.seconds,
		],
	},
	{
		label: KaliFormsObject.translations.mathHelper.dayDifference,
		id: 'dayDifference',
		args: 2,
		formula: '%1s=differenceInDays(%2s, %3s)',
		argsHelper: [
			KaliFormsObject.translations.mathHelper.dayDiffArgs.startDate,
			KaliFormsObject.translations.mathHelper.dayDiffArgs.endDate,
		],
	}
]
