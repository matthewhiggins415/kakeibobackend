// Express docs: http://expressjs.com/en/api.html
const express = require('express')
require("dotenv").config()

// instantiate a router (mini app that only handles routes)
const router = express.Router()
const passport = require('passport')

// pull in Mongoose model for examples
const User = require('../models/user')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')
const requireToken = passport.authenticate('bearer', { session: false })

const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const client = new PlaidApi(configuration);

router.post('/api/create_link_token', requireToken, async (req, res, next) => {
    // Get the client_user_id by searching for the current user
    const user = await User.find(req.user.id);
    const clientUserId = user._id;
    const request = {
      user: {
        // This should correspond to a unique id for the current user.
        client_user_id: clientUserId,
      },
      client_name: 'Plaid Test App',
      products: [Products.Auth],
      language: 'en',
      webhook: 'https://webhook.example.com',
      redirect_uri: 'https://domainname.com/oauth-page.html',
      country_codes: [CountryCode.Us],
    };
    try {
      const createTokenResponse = await client.linkTokenCreate(request);
      response.json(createTokenResponse.data);
    } catch (error) {
      // handle error
      console.log(error)
    }
  });

module.exports = router
