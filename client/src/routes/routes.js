if (process.env.NODE_ENV === 'production') {
	  module.exports = require('../routes/Root.prod');
} else {
	  module.exports = require('../routes/Root.dev');
}

