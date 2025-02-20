import React from 'react'
import { mockBooking } from '../mock/booking'

import '../styles/pages/booking.scss'

// Components
import Calendar from '../components/Calendar'
import * as Fa6 from 'react-icons/fa6'

export default function Booking(): React.ReactElement {
	const [selectedDate, setSelectedDate] = React.useState<Date>(new Date(new Date().setDate(new Date().getDate() + 1)))
	const [selectedTime, setSelectedTime] = React.useState<string | null>(null)
	const [times, setTimes] = React.useState<string[]>([])
	const [currentTime, setCurrentTime] = React.useState<string>('')

	const toParisISOString = (date: Date): string => {
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric', month: '2-digit', day: '2-digit',
			hour: '2-digit', minute: '2-digit', second: '2-digit',
			timeZone: 'Europe/Paris',
			hour12: false
		};

		const formatter = new Intl.DateTimeFormat('fr-FR', options);
		const parts = formatter.formatToParts(date);

		const getPart = (type: string) => parts.find(p => p.type === type)?.value || '00';

		return `${getPart('year')}-${getPart('month')}-${getPart('day')}T${getPart('hour')}:${getPart('minute')}:${getPart('second')}.000Z`;
	}

	React.useEffect(() => {
		const getTimes = (date: Date): string[] => {
			const parisISODate = toParisISOString(date)
			const key = parisISODate.split('T')[0]
			return mockBooking[key] || []
		}

		if (selectedDate) setTimes(getTimes(selectedDate))
		return () => setTimes([])
	}, [selectedDate])

	const handleDateSelect = (date: Date): void => {
		setSelectedDate(date)
		setSelectedTime(null)
	}

	const handleTimeSelect = (time: string): void => {
		setSelectedTime(time)
	}

	const bookAMeeting = (): void => {
		const parisDate = toParisISOString(selectedDate).split('T')[0]
		alert(`Booking: ${parisDate} at ${selectedTime}`)
	}

	React.useEffect(() => {
		const updateClock = () => {
			const now = new Date()
			const parisTime = now.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }).split(' ')[1]
			setCurrentTime(parisTime)
		}
		updateClock()

		const interval = setInterval(updateClock, 1000)
		return () => clearInterval(interval)
	}, [])

	return (
		<main className='page booking'>
			<Calendar size='big' disablePast selectedDate={selectedDate} onDateSelect={handleDateSelect} />

			<aside className='times'>
				<header>Book a Meeting ?</header>
				<ul>
					{
						times.length > 0
							? times.map((time, index) => <li key={index} className={`time ${time === selectedTime ? 'selected' : ''}`} onClick={() => handleTimeSelect(time)}>{time}</li>)
							: <li className='no-times'><Fa6.FaCalendarXmark /> No times available. Try another date.</li>
					}
				</ul>
				<small className='current-time'>Current Time: {currentTime}</small>
				<button onClick={bookAMeeting} disabled={!selectedTime}>Book <Fa6.FaCheck /></button>
			</aside>
		</main>
	)
}
