'use strict';
const axios = require('axios');
const moment = require('moment');

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK] [YEAR (optional)]
 */

module.exports = {
  /**
   * Simple example.
   * Every monday at 1am.
   */
  // '0 1 * * 1': () => {
  //
  // }
  '* * * * *': async() => {
    // console.log('I am running ' + new Date(), Object.keys(strapi.config));
    // console.log(strapi.models.tip.query({
    //   where: { isPublished: 'Yes' }
    // })[0].title);
    // await strapi.services.tip.publish();
    return strapi.models.tip.forge()
      .where({
        isPublished: 'No'
      })
      .fetchAll()
      .then(function (tips) {

        tips.forEach((tip) => {
          const shouldBePublished = moment().diff(tip.get('publish_datetime'), 'seconds') > 0;
          console.log(tip.get('title'));
          if (shouldBePublished) {
            console.log('Publishing ' + tip.get('id'));
            tip
              .set('isPublished', 'Yes')
              .set('publish_datetime', moment().utc())
              .save()
              .then(() => {
                const urls = strapi
                  && strapi.config
                  && strapi.config.staticWebsiteBuildURLs;
                return axios.all(urls.map(l => axios.post(l, {})))
                  .then(axios.spread(function (...res) {
                    // all requests are now complete
                    console.log('Sent triggers to Netlify');
                  }))
                  .catch(() => {
                    // Ignore
                  });
              });
          }
        });
      })
      .catch(function (err) {
      // res.status(500).json({error: true, data: {message: err.message}});
      });

  }
};
