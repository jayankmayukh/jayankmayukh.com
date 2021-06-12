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
const OtherPageTitle = styled.h3`
	margin-top: 0;
`

const TitleStyledLink = styled(Link)`
    box-shadow: none;
    color: inherit;
`

const PageContainer = styled.div`
    margin-left: auto;
    margin-right: auto;
    max-width: ${rhythm(32)};
    padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
`

const StyledBody = styled.div`
    background-color: #fff;
`
const StyledA = styled.a`
	margin: ${rhythm(1 / 3)};
`
const StyledLink = styled(Link)`
	margin: ${rhythm(1 / 3)};
	margin-left: 0; 
`

const Layout = ({ location, title, children }) => {
	const rootPath = `${__PATH_PREFIX__}/`
	let header

	if (location.pathname === rootPath) {
		header = (
			<React.Fragment>
				<MainTitle>
					<TitleStyledLink to={'/'}>{title}</TitleStyledLink>
				</MainTitle>
				<Bio />
			</React.Fragment>
		)
	} else {
		header = (
			<div>
				<OtherPageTitle>
					<TitleStyledLink to={'/'}>{title}</TitleStyledLink>
				</OtherPageTitle>
				<StyledLink to={'/'}>All Posts</StyledLink>
				<StyledA rel="noopener" href="https://github.com/jayankmayukh" target="_blank">
					GitHub
				</StyledA>
				<StyledA rel="noopener" href="https://linkedin.com/in/jayank-mayukh" target="_blank">
					LinkedIn
				</StyledA>
			</div>
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
				<CCLicense/>
			</footer>
		</PageContainer>
	</StyledBody>
	)
}

export default Layout
