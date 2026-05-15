var EnvChannel = {
    DEVELOPMENT: 0, //development environment--83
    TEST: 1, //test environment--81
    PRODUCTION: 2,//Formal environment--formal
    YN: 3,//Vietnam Environment--Test
	YNPROD: 4,//Vietnam Environment - Formal
	YD:5,//India -- test
	YDPROD:6//Indian official
}
//set environment
const ENV_CHANNEL =6;//To change the environment just change here
if (ENV_CHANNEL == EnvChannel.DEVELOPMENT) {
    //Development and testing environment
    ENV_CONFIG = require('.env.dev.js');
} else if (ENV_CHANNEL == EnvChannel.TEST) {
    //test environment
    ENV_CONFIG = require('.env.test.js');
} else if (ENV_CHANNEL == EnvChannel.PRODUCTION) {
    //Formal environment
    ENV_CONFIG = require('.env.prod.js');
} else if (ENV_CHANNEL == EnvChannel.YN) {
    //Vietnam test environment
    ENV_CONFIG = require('.env.yn.js');
} else if (ENV_CHANNEL == EnvChannel.YNPROD) {
    //Vietnamese formal environment
    ENV_CONFIG = require('.env.yn.prod.js');
}else if (ENV_CHANNEL == EnvChannel.YD) {
    //India test environment
    ENV_CONFIG = require('.env.yd.js');
} else if (ENV_CHANNEL == EnvChannel.YDPROD) {
    //Formal environment
    ENV_CONFIG = require('.env.yd.prod.js');
}
//Assign a value to the environment variable process.uniEnv
if (ENV_CONFIG) {
    process.uniEnv = {};
    for (let key in ENV_CONFIG) {
        process.uniEnv[key] = ENV_CONFIG[key];
    }
}
	