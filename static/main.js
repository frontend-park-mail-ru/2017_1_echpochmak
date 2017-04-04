'use strict';

import Menu from ./views/menu.js
import Logim from ./views/login.js
import Register from ./views/registration.js
import About from ./views/about.js
import LeaderBoard from ./views/leaderboard.js
import SinglePlayer from ./views/singleplayer.js
import MultiPlayer from ./views/multiplayer.js
import Authorize from ./services/authorize.js
import HTTP from ./modules/http.js
import Router from ./modules/router.js

const http = new HTTP();
const auth = new Authorize();
const router = new Router();

http.BaseURL = 'https://gem-td-back.herokuapp.com';

router.register('/', new Menu());
router.register('/login/', new Login());
router.register('/register/', new Register());
router.register('/about/', new About());
router.register('/leaders/', new LeaderBoard());
router.register('/game/', new SinglePlayer());
router.register('/multiplayer/', new MultiPlayer());

router.start();