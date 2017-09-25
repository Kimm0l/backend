/**
 * Created by joamolpe on 14/1/17.
 */
/**
 * AlarmsUser.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,

  attributes: {
    email: {
      type: 'string',
      required: true
    },
    alarms: {
      type: 'array'
    },
    toJSON: function () {
      var obj = this.toObject();
      return obj;
    }
  }
};

