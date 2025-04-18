import { Schema, model, Document, Model, Types } from 'mongoose';

interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  thoughts: Types.ObjectId[];
  friends: Types.ObjectId[];
  readonly friendCount: number;
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required'],
    trim: true
  },
  // ... other fields
}, {
  toJSON: { virtuals: true },
  id: false
});

UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model<IUser>('User', UserSchema);
export default User;