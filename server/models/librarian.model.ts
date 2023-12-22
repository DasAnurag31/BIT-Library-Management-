import { Document, Schema, model, Types } from 'mongoose';
import { IUser } from './user.model'; 

interface ILibrarian {
  user: IUser['_id'];
}

const librarianSchema = new Schema<ILibrarian & Document>({
  user: { type: Types.ObjectId, ref: 'User', required: true },
});

const Librarian = model<ILibrarian & Document>('Librarian', librarianSchema);

export default Librarian;
