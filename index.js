const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);
const Roles = require('./roles/role.js');

const server = express();

server.use(helmet());
server.use(express.json());

// ********** ENDPOINTS **********
server.get('/api/projects', async (req, res) => {
  try {
    const all = await Roles.find();
    res.status(200).json(all);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.get('/api/projects/:projectId', async (req, res) => {
  try { 
    const project = await Roles.findById(req.params.projectId);
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
})

const port = process.env.PORT || 4444;
server.listen(port, () => 
  console.log(`\n** API running on http://localhost:${port} **\n`)
);