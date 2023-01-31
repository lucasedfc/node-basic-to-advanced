const { Schema, model } = require('mongoose');
/** User Schema
 {
    name: '',
    email: '',
    password: '',
    img: '',
    role: '',
    status: false,
    google: true
}
*/

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    required: [true, 'role is required'],
  },
  img: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
  },
});

UserSchema.methods.toJSON = function() {
  const { __v, password, _id, ...user } =  this.toObject();
  user.uid = _id;
  return user;
}

module.exports = model('User', UserSchema);
