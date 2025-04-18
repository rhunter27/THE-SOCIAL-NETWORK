import { Schema, Document, Model, model, Types } from 'mongoose';

// Define the IReaction interface
export interface IReaction extends Document {
  reactionBody: string;
  username: string;
  createdAt: Date | string; // Allow both Date and string for compatibility
  readonly reactionId: Types.ObjectId; // Virtual property
}

// Define the Reaction schema
export const ReactionSchema = new Schema<IReaction>(
  {
    reactionBody: {
      type: String,
      required: [true, 'Reaction body is required'],
      maxlength: [280, 'Reaction cannot exceed 280 characters'],
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt: Date): string => createdAt.toLocaleString(),
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
    versionKey: false,
    timestamps: false, // Explicitly disable if not using timestamps
  }
);

// Virtual for reactionId with proper typing
ReactionSchema.virtual('reactionId').get(function (this: IReaction) {
  return this._id;
});

// Create and export the Reaction model
export const Reaction: Model<IReaction> = model<IReaction>('Reaction', ReactionSchema);