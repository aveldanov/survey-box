const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const Survey = mongoose.model('surveys');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');

module.exports = app => {

  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thank you for your feedback');
  });


  app.post('/api/surveys/webhooks', (req, res) => {
    // console.log(req.body);
    //res.send({});
    const p = new Path('/api/surveys/:surveyId/:choice');
    const events = _.map(req.body, ({ email, url }) => {

      const pathname = new URL(url).pathname;

      const match = p.test(pathname);
      if (match) {
        return {
          email: email,
          surveyId: match.surveyId,
          choice: match.choice
        };
      }
    })
    const compactEvents = _.compact(events);
    const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
    console.log(uniqueEvents)
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    console.log(req.body)
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title: title,
      subject: subject,
      body: body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });
    //Great place to send an email
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();

      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
}