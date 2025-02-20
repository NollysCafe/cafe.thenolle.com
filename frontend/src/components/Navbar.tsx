import React from 'react'

import '../styles/components/navbar.scss'

// Components
import { NavLink } from 'react-router-dom'
import * as Fa6 from 'react-icons/fa6'

interface NavbarProps {
	logo: string
	links: {
		to: string
		text: string
		icon: keyof typeof Fa6
	}[]
}

export default function Navbar({ logo, links }: NavbarProps): React.ReactElement {
	const [isMobile, setIsMobile] = React.useState<boolean>(window.innerWidth < 768)

	React.useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 768)
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const getIcon = (icon: keyof typeof Fa6) => {
		const Icon = Fa6[icon]
		return <Icon />
	}

	return (
		<nav className={`navbar ${isMobile ? 'mobile' : ''}`}>
			<NavLink to='/' className='logo'>{logo}</NavLink>

			{links.map((link, index) => (
				<NavLink key={index} to={link.to} className='link'>
					{getIcon(link.icon)}
					<span>{link.text}</span>
				</NavLink>
			))}
		</nav>
	)
}
