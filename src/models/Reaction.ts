import { Schema, model, Document } from 'mongoose';
// Removed unused ThoughtDocument import

// Define interface for User document
export interface UserDocument extends Document {
  username: string;
  email: string;
  thoughts: Schema.Types.ObjectId[];
  friends: Schema.Types.ObjectId[];
}

// User Schema
const userSchema: Schema<UserDocument> = new Schema<UserDocument>({
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address'
    ]
  },
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'Thought'
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User' // Self-reference
  }]
}, {
  toJSON: {
    virtuals: true
  },
  id: false
});

// Virtual for friendCount
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// Create and export User model
const User = model<UserDocument>('User', userSchema);
export default User;