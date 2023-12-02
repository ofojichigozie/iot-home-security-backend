import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  UUC: {
    type: String,
    required: true,
    unique: true,
  },
  PIN: {
    type: String,
    required: true,
  },
  securityStatus: {
    type: String,
    required: true,
    default: 'CALM',
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});
