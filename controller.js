const fs = require('fs');
const addMapping = (router, mapping) => {
  for (let url in mapping) {
    if (url.startsWith('GET')) {
      let path = url.substring(4);
      router.get(path, mapping[url]);
      console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith('POST')) {
      let path = url.substring(5);
      router.post(path, mapping[url]);
    } else {
      console.log(`invalid URL: ${url}`);
    }
  }
}

const addControllers = router => {
  let files = fs.readdirSync(__dirname + '/controllers');
  let js_files = files.filter(f => f.endsWith('.js'));
  for (let f of js_files) {
    console.log(`process controller: ${f}...`);
    let mapping = require(__dirname + '/controllers/' + f);
    addMapping(router, mapping);
  }
}

module.exports = dir => {
  let constrollers_dir = dir || 'controllers',
  router = require('koa-router')();
  addControllers(router, constrollers_dir);
  return router.routes();
}