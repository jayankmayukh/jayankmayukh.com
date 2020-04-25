import React from "react"
import { MainTitle, StyledLink, OtherPageTitle, PageContainer, CCLicense } from "./smallComponents"
import Bio from "./bio"

const Layout = ({ location, title, children }) => {
	const rootPath = `${__PATH_PREFIX__}/`
	let header

	if (location.pathname === rootPath) {
		header = (
			<React.Fragment>
				<MainTitle>
					<StyledLink to={'/'}>{title}</StyledLink>
				</MainTitle>
				<Bio />
			</React.Fragment>
		)
	} else {
		header = (
			<OtherPageTitle>
				<StyledLink to={'/'}>{title}</StyledLink>
			</OtherPageTitle>
		)
	}
	return (
		<PageContainer>
			<header>
				{header}
				<hr/>
			</header>
			<main>{children}</main>
			<footer>
				<hr/>
				<CCLicense/>
			</footer>
		</PageContainer>
	)
}

export default Layout
