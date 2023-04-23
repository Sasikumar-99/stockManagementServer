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

  svc.uninstall();
  svc.on('uninstall',()=>{
    console.log('onic StockApp Backend un-install done');
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

  frontSvc.uninstall();
  frontSvc.on('uninstall',()=>{
    console.log('ionic StockApp FrontEnd un-install done');
  })