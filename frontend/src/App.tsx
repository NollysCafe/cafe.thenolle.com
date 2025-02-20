import React from 'react'

// Components
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import Booking from './pages/Booking'
import Error from './pages/Error'

export default function App(): React.ReactElement {
	React.useEffect(() => {
		const handleResize = () => document.getElementById('root')!.classList.toggle('mobile', window.innerWidth < 768)
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return <>
		<Navbar logo="Nolly's Cafe" links={[
			{ to: '/', text: 'home', icon: 'FaHouse' },
			{ to: '/about', text: 'about', icon: 'FaInfo' },
			{ to: '/booking', text: 'booking', icon: 'FaCalendar' },
			{ to: '/profile', text: 'profile', icon: 'FaUser' }
		]} />

		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/booking' element={<Booking />} />
			<Route path='*' element={<Error code={404} message='Page not found' />} />
		</Routes>
	</>
}
