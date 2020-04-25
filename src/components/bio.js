/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { BioContainer, BioImage } from "./smallComponents"

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
        {` `}
        Find him at 
        {` `}
        <a href={`https://www.linkedin.com/in/${social.linkedin}/`}>
          LinkedIn
        </a> and <a href={`https://github.com/${social.github}/`}>GitHub</a>.
      </p>
    </BioContainer>
  )
}

export default Bio
