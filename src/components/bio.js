/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"
import { rhythm } from "../utils/typography"
import Image from "gatsby-image"

const BioContainer = styled.div`
    display: flex;
`
const BioImage = styled(Image)`
    margin-right: ${rhythm(1 / 2)};
    margin-bottom: 0;
    min-width: 50px;
    border-radius: 100%;
`

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
            linkedin
            github
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <BioContainer>
      <BioImage
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.name}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p>
        Written by <strong>{author.name}</strong> {author.summary}
        {` `/* <br/> */}
        Find him at 
        {` `}
        <a rel="noopener" href={`https://www.linkedin.com/in/${social.linkedin}/`} target={`_blank`}>
          LinkedIn
        </a>,
        {` `}
        <a rel="noopener" href={`https://github.com/${social.github}/`} target={`_blank`}>
          GitHub
        </a>,
        {` `}
        <a rel="noopener" href={`https://twitter.com/jayank_mayukh`} target={`_blank`}>Twitter</a>
        {` `}
        or email at <a href={`mailto:jayankmayukh@gmail.com`}>jayankmayukh@gmail.com</a>.
      </p>
    </BioContainer>
  )
}

export default Bio
