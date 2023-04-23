//frontEnd

const FrontEnd_express = require('express');
const path = require('path');

const _FrontEnd_express = FrontEnd_express()

const pathName = FrontEnd_express.static(path.resolve(__dirname,'Frontend'));

_FrontEnd_express.use(pathName)

const PORT = 27417
_FrontEnd_express.listen(PORT,()=>{
    console.log(`Ionic App Hosted on ${PORT}`);
})