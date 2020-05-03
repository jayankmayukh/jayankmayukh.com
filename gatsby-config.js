module.exports = {
    siteMetadata: {
        title: `Jayank Mayukh`,
        author: {
            name: `Jayank Mayukh`,
            summary: `who loves programming.`,
        },
        description: `A smart developer's journey.`,
        siteUrl: `https://jayankmayukh.com`,
        social: {
            linkedin: `jayank-mayukh`,
            github: `jayankmayukh`,
            twitter: `jayank_mayukh`,
        },
    },
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/blog`,
                name: `blog`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/assets`,
                name: `assets`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 590,
                        },
                    },
                    {
                        resolve: `gatsby-remark-responsive-iframe`,
                        options: {
                            wrapperStyle: `margin-bottom: 1.0725rem`,
                        },
                    },
                    `gatsby-remark-prismjs`,
                    `gatsby-remark-copy-linked-files`,
                    `gatsby-remark-smartypants`,
                ],
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: `UA-162956388-2`,
            },
        },
        `gatsby-plugin-feed`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `A Blog by Jayank Mayukh`,
                short_name: `Jayank Mayukh`,
                start_url: `/`,
                background_color: `#ffffff`,
                theme_color: `#4ca3eb`,
                display: `standalone`,
                icon: `static/android-chrome-512x512.png`,
            },
        },
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-plugin-typography`,
            options: {
                pathToConfigModule: `src/utils/typography`,
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        `gatsby-plugin-offline`,
        `gatsby-plugin-emotion`,
        `gatsby-plugin-sitemap`,
    ]
}