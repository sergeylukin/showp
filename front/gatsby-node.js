/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`);

const locales = require('./src/constants/locales')

const makeRequest = (graphql, request) => new Promise((resolve, reject) => {
  // Query for nodes to use in creating pages.
  resolve(
    graphql(request).then(result => {
      if (result.errors) {
        reject(result.errors);
      }

      return result;
    })
  );
});

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const getTips = makeRequest(graphql, `
    {
      allStrapiTip {
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
    `).then(result => {
    // Create pages for each tip.
    result.data.allStrapiTip.edges.forEach(({ node }) => {
      Object.keys(locales).map(locale => {
        if (!node || !node.locale || node.locale.code !== locale) return null
        const url = `/${node.slug}`
        const localizedPath = locales[locale].default
          ? url
          : `/${locales[locale].path}${url}`

        return createPage({
          path: localizedPath,
          component: path.resolve(`src/templates/tip.js`),
          context: {
            id: node.id,
            locale,
            localessPath: url
          },
        });
      })
    });
  });

  const getAuthors = makeRequest(graphql, `
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
    `).then(result => {
    // Create pages for each user.
    result.data.allStrapiUser.edges.forEach(({ node }) => {
      Object.keys(locales).map(locale => {
        const url = `/authors/${node.id}`
        const localizedPath = locales[locale].default
          ? url
          : `/${locales[locale].path}${url}`

        const page = {
          path: localizedPath,
          component: path.resolve(`src/templates/author.js`),
          context: {
            id: node.id,
            id_integer: parseInt(node.id.replace("User_", '')),
            locale,
            localessPath: url
          },
        }

        return createPage(page);
      })
    });
  });

  // Queries for tips and authors nodes to use in creating pages.
  return Promise.all([
    getTips,
    getAuthors,
  ]);
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  return new Promise(resolve => {
    deletePage(page)

    Object.keys(locales).map(locale => {
      const localizedPath = locales[locale].default
        ? page.path
        : `/${locales[locale].path}${page.path}`

      return createPage({
        ...page,
        path: localizedPath,
        context: {
          locale,
          localessPath: page.path
        }
      })
    })

    resolve()
  })
}
