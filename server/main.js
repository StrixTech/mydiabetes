import '../imports/api/Logbook.js';
import '../imports/api/Calculator.js';
import '../imports/api/FoodLibrary.js';
import '../imports/api/Users.js';
import '../imports/api/Media.js';

// Import the REST apis
import '../imports/rest/index.js';
import './startup/firstrun.js';

import RateLimiters from "./security/rate-limit";

Meteor.startup(() => {
  RateLimiters();
});

