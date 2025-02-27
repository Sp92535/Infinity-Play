import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';

const getBucket = () => {
    if (!mongoose.connection) {
        throw new Error('Could not connect to the database.');
    }
    const db = mongoose.connection.db;
    return new GridFSBucket(db, { bucketName: 'gameFiles' });
}
export default getBucket;