export const mockBooking: { [key: string]: string[] } = {}

const addMockBooking = (date: Date, times: string[]): void => {
	const key = date.toISOString().split('T')[0]
	mockBooking[key] = times
}

addMockBooking(new Date('2025-02-21'), [
	'08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
	'12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
	'16:00', '16:30', '17:00', '17:30'
])
addMockBooking(new Date('2025-02-27'), ['09:00', '11:00', '13:00', '15:00'])
addMockBooking(new Date('2025-03-01'), ['11:00', '13:00', '15:00', '17:00'])
addMockBooking(new Date('2025-03-03'), ['10:00', '12:00', '14:00', '16:00'])
addMockBooking(new Date('2025-03-07'), ['09:00', '11:00', '13:00', '15:00'])
addMockBooking(new Date('2025-03-09'), ['11:00', '13:00', '15:00', '17:00'])
