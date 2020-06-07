/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`);

const locales = require('./src/constants/locales')

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const tips = await graphql(
    `
      {
        allStrapiTip(filter: {isPublished: {eq: "Yes"}}) {
          edges {
            node {
              id
              slug
              locale {
                id
                code
              }
            }
          }
        }
      }
    `
  )
  // Handle errors
  if (tips.errors) {
    reporter.panicOnBuild(`Error while running Tips GraphQL query.`)
    return
  }
  // Create pages for each markdown file.
  const tipPageTemplate = path.resolve(`src/templates/tip.js`)
  tips.data.allStrapiTip.edges.forEach(({ node }) => {
    Object.keys(locales).map(locale => {
      if (!node || !node.locale || node.locale.code !== locale) return null
      const url = `/${node.slug}`
      const localizedPath = locales[locale].default
        ? url
        : `/${locales[locale].path}${url}`

      createPage({
        path: localizedPath,
        component: tipPageTemplate,
        context: {
          id: node.id,
          locale,
          localessPath: url,
          pageType: 'tip',
          pageUri: localizedPath
        },
      });
    })
  })

  const authors = await graphql(
    `
      {
        allStrapiUser {
          edges {
            node {
              id
              username
            }
          }
        }
      }
    `
  )
  // Handle errors
  if (authors.errors) {
    reporter.panicOnBuild(`Error while running Authors GraphQL query.`)
    return
  }
  const authorPageTemplate = path.resolve(`src/templates/author.js`)
  authors.data.allStrapiUser.edges.forEach(({ node }) => {
    Object.keys(locales).map(locale => {
      const url = `/${node.username}`
      const localizedPath = locales[locale].default
        ? url
        : `/${locales[locale].path}${url}`

      createPage({
        path: localizedPath,
        component: authorPageTemplate,
        context: {
          id: node.id,
          id_integer: parseInt(node.id.replace("User_", '')),
          locale,
          localessPath: url,
          pageType: 'author',
          pageUri: localizedPath
        },
      })
    })
  })
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  const oldPage = Object.assign({}, page)
  deletePage(oldPage)

  Object.keys(locales).map(locale => {
    const localizedPath = locales[locale].default
      ? page.path
      : `/${locales[locale].path}${page.path}`

    createPage({
      ...page,
      path: localizedPath,
      context: {
        ...page.context,
        locale,
        localessPath: page.path,
        pageType: 'common',
        pageUri: localizedPath
      }
    })
  })
}
