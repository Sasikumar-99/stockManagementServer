const Service = require('node-windows').Service;

const svc = new Service({
    name:'ionic StockApp Backend',
    description: 'The nodejs.org example web server.',
    script: './index.js',
    nodeOptions: [
      '--harmony',
      '--max_old_space_size=4096'
    ]
  });

  svc.install()
  svc.on('install',()=>{
    console.log('ionic StockApp Backend installation done');
    svc.start();
  })
  svc.on('start',()=>{
    console.log(`ionic StockApp Backend service started`);
  })


const frontSvc = new Service({
  name:'ionic StockApp FrontEnd',
  description: 'The nodejs.org example web server.',
  script: './front-end_server.js',
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
})

frontSvc.install()
frontSvc.on('install',()=>{
  console.log('ionic StockApp FrontEnd installation done');
  frontSvc.start();
})
frontSvc.on('start',()=>{
  console.log('ionic StockApp FrontEnd service started');
})
