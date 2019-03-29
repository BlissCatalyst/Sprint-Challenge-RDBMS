
exports.up = function(knex) {
  return knex.schema
  .createTable('projects', function(tbl) {
    tbl.increments();

    tbl
      .string('name', 128)
      .notNullable()
      .unique();

    tbl
      .string('description', 128)
      .notNullable();

    tbl
      .boolean('is_done')
  })
  .createTable('actions', tbl => {
    tbl.increments();
    
    tbl
      .string('description', 128)
      .notNullable()
      .unique();
    tbl
      .string('notes', 128)
      .notNullable();
    tbl
      .boolean('is_complete');
    tbl
      .integer('project_id')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('projects').dropTableIfExists('actions');
};
