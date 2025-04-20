import { Schema, model, Document } from 'mongoose';
// Ensure './User' exists or is correctly referenced before re-adding if needed

export interface ThoughtDocument extends Document {
  thoughtText: string;
  username: string;
  user: Schema.Types.ObjectId;
  // Add other thought fields as needed
}

const thoughtSchema = new Schema<ThoughtDocument>({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
  // Add other thought fields as needed
});

const Thought = model<ThoughtDocument>('Thought', thoughtSchema);
export default Thought;