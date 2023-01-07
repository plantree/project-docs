const { defaultTheme } = require('@vuepress/theme-default')
const { searchPlugin } = require('@vuepress/plugin-search')
const { giscusPlugin } = require('vuepress-plugin-giscus')
const { path } = require('@vuepress/utils')

module.exports = {
    title: "Plantree's Projects",
    description: 'A hub to archive projects',
    base: '/project-docs/',
    port: 9000,

    theme: defaultTheme({
        navbar: [
            {
                text: 'Home',
                link: '/'
            },
            {
                text: 'Projects',
                children: [
                    {
                        text: 'Counter',
                        link: '/counter/introduction.md'
                    }
                ]
            }
        ],

        repo: 'https://github.com/plantree/project-docs',
        docsBranch: 'main',
        docsDir: 'docs',
        editLink: true,
        contributors: false,
        sidebarDepth: 4,

        sidebar: [
            // Sidebar item
            {
                text: 'Counter',
                children: [
                    {
                        text: 'Introduction',
                        link: '/counter/introduction.md'
                    },
                    {
                        text: 'Usage',
                        link: '/counter/usage.md'
                    }
                ]
            }
        ]
    }),
    plugins: [
        searchPlugin({
            maxSuggestions: 5
        }),
        giscusPlugin({
            repo: 'plantree/press-comment',
            repoId: 'R_kgDOIDNWUg',
            category: 'General',
            categoryId: 'DIC_kwDOIDNWUs4CRlY7' 
        })
    ],
    alias: {
        '@theme/Page.vue': path.resolve(__dirname, './components/Page.vue'),
      },
}
