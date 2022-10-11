//imports
  const express = require('express');
  const cors = require('cors');
  const app = express();
  
//middleware
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(cors());
  app.use('/api/posts', require('./routes/api/posts'));

//handle production
  if(process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public/'))
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
  }
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`server running on port: ${PORT}`))