import {NextResponse} from "next/server";
import twilio from "twilio";
import {getSubscriptionDetails} from "@/lib/mongodb";
import webpush from "web-push";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

export async function GET() {

    const today = new Date();
    try {
        const subscription = await getSubscriptionDetails()

        if (!subscription) {
            throw new Error('No subscription available')
        }


        await webpush.sendNotification(
            subscription,
            JSON.stringify({
                title: 'Hi love! You have a new memory waiting for you!',
                body: 'Sent to you with love from  loved one',
                icon: '/icon-192.png',
            })
        )

        console.log(`[LOG] ${today} :: Todays Notification has been delivered`)
        return NextResponse.json({ status: 200, message: "Notifications sent successfully" })
    } catch (error) {
        console.error(`[ERROR] ${today} :: Motifaction not sent -> ${error}`);
        return NextResponse.json({ status: 500, message: "Notifications failed" })
    }
}