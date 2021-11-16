import React from 'react'
import Link from 'next/link'

function Navbar() {
    return (
        <div className="container">
            <nav className="navbar navbar-expand-sm navbar-light bg-none">
				<div className="container-fluid ">
					<ul className="navbar-nav">
						<li className="nav-item" key="1">
						<Link href="/">
						<a className="navbar-brand" href="#">Logo</a>
						</Link>
						</li>
					</ul>
				</div>
			</nav>
        </div>
    )
}

export default Navbar