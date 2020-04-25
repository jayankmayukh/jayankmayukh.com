import React from "react"
import styled from "@emotion/styled"
import { rhythm, scale } from "../utils/typography"
import { Link } from "gatsby"
import Image from "gatsby-image"


export const MainTitle = styled.h1`
    ${scale(1.5)};
    margin-bottom: ${rhythm(1.5)};
    margin-top: 0;
`

export const StyledLink = styled(Link)`
    box-shadow: none;
    color: inherit;
`

export const OtherPageTitle = styled.h3`
    font-family: Montserrat, sans-serif;
	margin-top: 0;
`

export const PageContainer = styled.div`
    margin-left: auto;
    margin-right: auto;
    max-width: ${rhythm(24)};
    padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
`

export const BioContainer = styled.div`
    display: flex;
`
export const BioImage = styled(Image)`
    margin-right: ${rhythm(1 / 2)};
    margin-bottom: 0;
    min-width: 50px;
    border-radius: 100%;
`

export const CCLicense = ()=>{
    return (
        <div>
            <a rel="license" href="https://creativecommons.org/licenses/by-sa/4.0/" style={{}}>
                <img alt="Creative Commons License" style={{borderWidth:0, margin: 0}} src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" />
            </a><br/>
            This work by
            {' '}
            <a {...{'xmlns:cc': "https://creativecommons.org/ns#"}} 
                href="https://jayankmayukh.com"
                property="cc:attributionName"
                rel="cc:attributionURL">
                    Jayank Mayukh
            </a>
            {' '}
            is licensed under a
            {' '}
            <a rel="license" 
                href="https://creativecommons.org/licenses/by-sa/4.0/">
                    Creative Commons Attribution-ShareAlike 4.0 International License
            </a>.
        </div>
    );
}