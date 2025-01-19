const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.logPageView = functions.https.onRequest(async (request, response) => {
  try {
    const { page, userId, userAgent } = request.body;
    const timestamp = admin.firestore.FieldValue.serverTimestamp();

    await admin.firestore().collection('analytics').add({
      timestamp,
      page: page || 'unknown',
      userId: userId || 'anonymous',
      userAgent: userAgent || 'unknown'
    });

    response.status(200).send({ success: true });
  } catch (error) {
    console.error('Error logging page view:', error);
    response.status(500).send({ error: error.message });
  }
});