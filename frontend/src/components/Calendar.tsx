import React from 'react'
import '../styles/components/calendar.scss'

// Components
import * as Fi from 'react-icons/fi'

interface CalendarProps {
	size?: 'tiny' | 'small' | 'normal' | 'large' | 'big'
	selectedDate?: Date
	onDateSelect?: (date: Date) => void
	occupiedDates?: Date[]
	disablePast?: boolean
}

export default function Calendar({ size, selectedDate, onDateSelect, occupiedDates, disablePast }: CalendarProps): React.ReactElement {
	const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date())

	const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
	const daysInMonth = Array.from({ length: lastDay.getDate() }, (_, i) => new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1))

	const previousMonth = () => setCurrentMonth(previous => new Date(previous.getFullYear(), previous.getMonth() - 1))
	const nextMonth = () => setCurrentMonth(previous => new Date(previous.getFullYear(), previous.getMonth() + 1))

	const isOccupied = (date: Date) => occupiedDates?.some(occupiedDate => occupiedDate.toDateString() === date.toDateString())
	const isSelected = (date: Date) => selectedDate?.toDateString() === date.toDateString()

	const handleDateSelect = (date: Date) => {
		if (disablePast && date < new Date()) return
		if (onDateSelect) onDateSelect(date)
	}

	return (
		<div className={`calendar ${size || 'normal'}`}>
			<header className='calendar-header'>
				<button onClick={previousMonth}><Fi.FiChevronLeft /></button>
				<h2>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
				<button onClick={nextMonth}><Fi.FiChevronRight /></button>
			</header>

			<div className='calendar-grid'>
				{daysInMonth.map(day => (
					<button
						key={day.toDateString()}
						className={`calendar-day ${isSelected(day) ? 'selected' : ''} ${isOccupied(day) ? 'occupied' : ''} ${disablePast && day < new Date() ? 'disabled' : ''}`}
						onClick={() => handleDateSelect(day)}
						disabled={disablePast && day < new Date()}
					>
						{day.getDate()}
					</button>
				))}
			</div>
		</div>
	)
}
