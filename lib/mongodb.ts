import {GridFSBucket, MongoClient, ObjectId} from "mongodb"
import type {DailyRecord, Memory, Settings} from "@/types/memory"
import {Readable} from "node:stream";
import {PushSubscription} from "web-push";

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

let client
let bucket: GridFSBucket
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
    console.warn("ALERT: DEV ENV NOT SET UP");
    // if (!global._mongoClientPromise) {
    //   client = new MongoClient(uri, options);
    //   global._mongoClientPromise = client.connect() as Promise<MongoClient>
    // }
    // clientPromise = global._mongoClientPromise
    client = new MongoClient(uri, options);
    clientPromise = client.connect() // FIXME: Needs to be removed
    bucket = new GridFSBucket(client.db(), {
        bucketName: "photos",
    });
} else {
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
    bucket = new GridFSBucket(client.db(), {
        bucketName: "photos",
    });
}

export default clientPromise

export async function getMemories() {
    const client = await clientPromise
    const db = client.db()
    return db.collection<Memory>("memories").find({}).toArray()
}

export async function createMemory(memory: Omit<Memory, "_id" | "createdAt">) {
    const client = await clientPromise
    const db = client.db()
    const newMemoryId = new ObjectId();
    if (bucket && memory.type === "photo" && memory.image) {
        const readableStream = new Readable();
        readableStream.push(memory.image);
        readableStream.push(null);

        const uploadStream = bucket.openUploadStream(`${newMemoryId}/${memory.content}`);
        readableStream.pipe(uploadStream);

        delete memory.image; // so this is not saved to the db
    }
    const result = await db.collection<Memory>("memory").insertOne({
        ...memory,
        createdAt: new Date(),
        _id: newMemoryId
    })
    console.log("Memory created with ID:", result.insertedId);
    return {...memory, _id: result.insertedId, createdAt: new Date()}
}

async function getRandomMemory() {
    const client = await clientPromise
    const db = client.db()
    return db.collection<Memory>("memory").aggregate([{$sample: {size: 1}}]).next()
}

export async function getCurrentRecord() {
    const client = await clientPromise
    const db = client.db()
    const today = new Date()
    today.setHours(0, 0, 0, 0);
    let record = await db.collection<DailyRecord>("current_memory").findOne({date: {$gte: today}})

    console.log("Record", record);

    if (!record) {
        const randomMemory = await getRandomMemory();
        record = {
            date: today,
            memoryId: randomMemory?._id.toString() || "",
            affirmationCompleted: false,
            moods: [],
            _id: new ObjectId()
        }
        await db.collection<DailyRecord>("current_memory").insertOne(record)
    }

    const memory = await getMemoryById(record.memoryId);
    if (!memory) {
        throw new Error("Memory not found")
    }
    if (memory.type === "photo") {
        const downloadStream = bucket.openDownloadStreamByName(`${memory._id}/${memory.content}`);
        const chunks: Buffer[] = [];
        for await (const chunk of downloadStream) {
            chunks.push(chunk);
        }
        const image = Buffer.concat(chunks);
        memory.base64image = `data:image/jpeg;base64,${image.toString("base64")}`;
    }

    return {dailyRecordData: record, memory: memory}
}

export async function setNewMemory() {
    const client = await clientPromise
    const db = client.db()
    const today = new Date()
    const randomMemory = await getRandomMemory();
    const newMemoryId = randomMemory?._id.toString() || ""
    await db.collection<DailyRecord>("current_memory").updateOne({date: today}, {$set: {newMemoryId}}, {upsert: true})
}

export async function completeAffirmation() {
    const client = await clientPromise
    const db = client.db()
    const today = new Date()
    await db
        .collection<DailyRecord>("current_memory")
        .updateOne({date: today}, {$set: {affirmationCompleted: true}}, {upsert: true})
}

export async function saveMood(moods: string[]) {
    const client = await clientPromise
    const db = client.db()
    const today = new Date()
    await db.collection<DailyRecord>("current_memory").updateOne({date: today}, {$set: {moods}}, {upsert: true})
}

export async function getMemoryById(id: string) {
    const client = await clientPromise
    const db = client.db()
    return db.collection<Memory>("memory").findOne({_id: new ObjectId(id)})
}

export async function saveSettings(settings: Settings) {
    const client = await clientPromise
    const db = client.db()
    await db.collection<Settings>("settings").updateOne({}, {$set: settings}, {upsert: true})
}

export async function getSettings() {
    const client = await clientPromise
    const db = client.db()
    return db.collection<Settings>("settings").findOne({})
}

export async function setSubscriptionDetails(subscriptionDetails: PushSubscription) {
    const client = await clientPromise
    const db = client.db()
    return await db.collection<PushSubscription>("notification-subscription").updateOne({}, {$set: subscriptionDetails}, {upsert: true})
}

export async function getSubscriptionDetails() {
    const client = await clientPromise
    const db = client.db()
    return db.collection<PushSubscription>("notification-subscription").findOne({})
}