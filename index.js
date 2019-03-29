const express = require('express');
const helmet = require('helmet');

const db = require('./database/dbConfig');

const server = express();

server.use(helmet());
server.use(express.json());

function find() {
  return db('projects');
}

function findById(id) {
  return db('projects')
  // .join('actions', { 'actions.project_id': 'projects.id'})
  .where({id})
  .first();
}

function findActions(id) {
  return db('actions')
    .where('actions.project_id', id)
}

// ********** ENDPOINTS **********
server.get('/api/projects', async (req, res) => {
  try {
    const all = await find();
    res.status(200).json(all);
  } catch (error) {
    res.status(500).json(error);
  }
})

server.get('/api/projects/project/:projectId', async (req, res) => {
  try {
    const project = await findById(req.params.projectId);
    const actions = await findActions(req.params.projectId);
    if(project) {
      // project.actions = actions;
      console.log(project);
      res.status(200).json({project: {
        ...project,
        actions: actions
      } 
    });
    } else {
      res.status(404).json({
        error: "does not exist"
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

server.post('/api/projects', async (req, res) => {
  try {
    if(req.body.name && req.body.description) {
      const [id] = await db('projects').insert(req.body);
      const newProject = await db('projects')
      .where({id: id})
      .first();
    res.status(201).json(newProject);
    } else {
      res.status(400).json({
        error: "must have name, description, and true/false of is_done"
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

server.post('/api/projects/actions', async (req, res) => {
  try {
    if(req.body.notes && req.body.description) {
      const [id] = await db('actions').insert(req.body);
      const newAction = await db('actions')
      .where({id: id})
      .first();
    res.status(201).json(newAction);
    } else {
      res.status(400).json({
        error: "must have description, notes, project_id, and true/false of is_complete"
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

const port = process.env.PORT || 4444;
server.listen(port, () => 
  console.log(`\n** API running on http://localhost:${port} **\n`)
);