import React from "react"

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