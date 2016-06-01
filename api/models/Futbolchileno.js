/**
 * Futbolchileno.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	img_url: {
  		type: 'string'
  	},
  	title: {
  		type: 'string'
  	},
  	noticia_url: {
  		type: 'string'
  	},
  	fecha_noticia: {
  		type: 'datetime',
  		defaultsTo: Date.now
  	}
  }
};

