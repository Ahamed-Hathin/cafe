/**
 * Firebase Cloud Messaging (FCM) Notification Utility
 *
 * When FIREBASE_PROJECT_ID and FCM_SERVER_KEY are configured in .env,
 * real FCM notifications will be sent via firebase-admin.
 * Otherwise, a mock function is used that logs to console.
 */

let admin = null;

const initFirebase = () => {
  if (process.env.FIREBASE_PROJECT_ID && process.env.FCM_SERVICE_ACCOUNT_PATH) {
    try {
      admin = require('firebase-admin');
      const serviceAccountPath = require('path').resolve(__dirname, '..', process.env.FCM_SERVICE_ACCOUNT_PATH);
      
      if (!admin.apps.length) {
        admin.initializeApp({
          credential: admin.credential.cert(require(serviceAccountPath)),
        });
        console.log('🔥 Firebase Admin initialized with service account');
      }
    } catch (err) {
      console.warn('⚠️  Firebase init failed, using mock notifications:', err.message);
      admin = null;
    }
  }
};

/**
 * Send a push notification via FCM or log a mock notification
 * @param {string} title - Notification title
 * @param {string} body  - Notification body
 * @param {string} [token] - Device FCM token (optional)
 */
const sendNotification = async (title, body, token = null) => {
  if (admin) {
    try {
      let tokens = token ? [token] : [];

      if (!token) {
        const Admin = require('../models/Admin');
        const admins = await Admin.find({ fcmToken: { $ne: null } });
        tokens = admins.map(a => a.fcmToken).filter(t => t && t.trim() !== '');
      }

      if (tokens.length > 0) {
        const promises = tokens.map(t => admin.messaging().send({
          token: t,
          notification: { title, body },
          webpush: {
            fcmOptions: {
              link: '/admin'
            },
            notification: {
              requireInteraction: true,
              vibrate: [200, 100, 200, 100, 200, 100, 200],
              icon: '/favicon.svg'
            }
          }
        }).catch(err => {
            console.error(`❌ FCM individual send error:`, err.message);
            return null;
        }));
        
        const responses = await Promise.all(promises);
        console.log(`📱 FCM notification attempts complete for ${tokens.length} target(s)`);
        return responses;
      }
    } catch (err) {
      console.error('❌ FCM broadcast error:', err.message);
    }
  }

  // Fallback if no tokens or admin disabled
  console.log(`🔔 [NOTIFICATION] ${title}: ${body}`);
  if (!admin) console.log(`   (FCM not initialized)`);
};

module.exports = { initFirebase, sendNotification };
