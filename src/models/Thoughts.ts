import { Schema, model, Document } from 'mongoose';
import { Reaction, IReaction } from '../models/Reaction';
// Define the IThought interface

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  userId: Schema.Types.ObjectId;
  reactions: IReaction[];
}

const ThoughtSchema = new Schema<IThought>({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reactions: [Reaction.schema]
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.createdAt = ret.createdAt.toLocaleString();
      return ret;
    }
  },
});

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model<IThought>('Thought', ThoughtSchema);

export default Thought;