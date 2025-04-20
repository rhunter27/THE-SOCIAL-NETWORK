import { Schema, Document, Model, model, Types } from 'mongoose';

export interface IReaction extends Document {
    reactionBody: string;
    username: string;
    createdAt: Date | string; // Allow both Date and string
    readonly reactionId: Types.ObjectId; // Virtual property
}

export const ReactionSchema = new Schema<IReaction>({
    reactionBody: {
        type: String,
        required: [true, 'Reaction body is required'],
        maxlength: [280, 'Reaction cannot exceed 280 characters'],
        trim: true
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAt: Date): string => createdAt.toLocaleString()
    }
}, {
    toJSON: {
        virtuals: true,
        getters: true,
        transform: (_, ret) => {
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    },
    id: false,
    versionKey: false
});

// Virtual for reactionId
ReactionSchema.virtual('reactionId').get(function(this: IReaction): Types.ObjectId {
    return this._id as Types.ObjectId;
});

// Create and export the Reaction model
const Reaction: Model<IReaction> = model<IReaction>('Reaction', ReactionSchema);

export type ReactionModel = typeof Reaction;
export default Reaction;