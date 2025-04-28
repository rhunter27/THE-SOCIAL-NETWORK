import { Schema, model, Document, Types } from 'mongoose';

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
  thoughts: {
    type: [Schema.Types.ObjectId],
    ref: 'Thoughts',
    default: []
  },
  friends: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
    default: []
  },
}, {
  toJSON: { virtuals: true },
  id: false
});

UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model<IUser>('User', UserSchema);
export default User;