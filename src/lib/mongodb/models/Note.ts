import mongoose, { Schema, model, models } from 'mongoose';

export interface INote {
  text: string;
  name?: string;
  email?: string;
  emoji: string;
  color: string;
  createdAt: Date;
}

const NoteSchema = new Schema<INote>(
  {
    text: { type: String, required: true },
    name: { type: String, default: null },
    email: { type: String, default: null },
    emoji: { type: String, required: true },
    color: { type: String, required: true },
  },
  { timestamps: true }
);

const Note = models.Note || model<INote>('Note', NoteSchema);

export default Note;
