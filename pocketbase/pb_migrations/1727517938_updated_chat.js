/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8ebso7wd982b1oi")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jbvlvjy9",
    "name": "chat",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "8ebso7wd982b1oi",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8ebso7wd982b1oi")

  // remove
  collection.schema.removeField("jbvlvjy9")

  return dao.saveCollection(collection)
})
