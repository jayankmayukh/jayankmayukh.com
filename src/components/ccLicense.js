import React from "react"
import styled from "@emotion/styled";
import { rhythm } from "../utils/typography"

const StyledDiv = styled.div`
    margin-top: ${rhythm(1)};
`

export const CCLicense = ()=>{
    return (
        <StyledDiv>
            <hr/>
            <br/>
            &copy; {(new Date()).getFullYear()}
            {' '}
            <a {...{'xmlns:cc': "https://creativecommons.org/ns#"}} 
                href="https://jayankmayukh.com"
                property="cc:attributionName"
                rel="cc:attributionURL">
                    Jayank Mayukh
            </a>
            {' '} |
            {' '}
            <a rel="license noopener" href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank">
                    License
            </a>.
        </StyledDiv>
    );
}