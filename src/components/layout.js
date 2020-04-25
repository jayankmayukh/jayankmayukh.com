import React from "react"
import { CCLicense } from "./ccLicense"
import Bio from "./bio"
import styled from "@emotion/styled"
import { rhythm, scale } from "../utils/typography"
import { Link } from "gatsby"

const MainTitle = styled.h1`
    ${scale(1.5)};
    margin-bottom: ${rhythm(1.5)};
    margin-top: 0;
`

const StyledLink = styled(Link)`
    box-shadow: none;
    color: inherit;
`

const OtherPageTitle = styled.h3`
    font-family: Montserrat, sans-serif;
	margin-top: 0;
`

const PageContainer = styled.div`
    margin-left: auto;
    margin-right: auto;
    max-width: ${rhythm(32)};
    padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
`

const StyledBody = styled.div`
    background-color: #f9f9fd;
`

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
				<StyledLink to={'/'}>Home</StyledLink>
			</OtherPageTitle>
		)
	}
	return (
	<StyledBody>
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
	</StyledBody>
	)
}

export default Layout
