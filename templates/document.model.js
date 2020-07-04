const mongoose = require('mongoose')
const Schema = mongoose.Schema

const <%= modelName %> = Schema({ 
  <%  for (let i=0; i<properties.length; i++) { %>
      <%= properties[i].propertyName %> : {
        type: <%= properties[i].propertyType %>,
        required: <%= properties[i].propertyRequired %>
      },
  <% } %>
}, {
  timestamps: true
})

module.exports = mongoose.model('<%= modelName %>', <%= dbName %>, '<%= pluralName %>') // ( ModelName, Schema, CollectionName  )

