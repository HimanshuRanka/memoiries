import {NextResponse} from "next/server";
import twilio from "twilio";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

export async function GET() {
    // const now = new Date();
    // const usersToNotify = await Notification.find({ notifyAt: { $lte: now } });
    //
    // if (usersToNotify.length === 0) {
    //     return NextResponse.json({ message: "No notifications to send." });
    // }

    const today = new Date();
    try {
        await twilioClient.messages.create({
            body: "Hi love, A new memory is waiting to be opened  at dearnivie.vercel.app/view! Check it out!",
            from: twilioNumber,
            to: "+14374281866"
        })

        console.log(`[LOG] ${today} :: Todays Notification has been delivered`)

        // Update next notify at
        // let nextNotifyAt;
        // if (user.frequency === "hourly") nextNotifyAt = new Date(now.getTime() + 60 * 60 * 1000);
        // if (user.frequency === "daily") nextNotifyAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        // if (user.frequency === "weekly") nextNotifyAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    } catch (e) {
        console.error(`[ERROR] ${today} :: Motifaction not sent -> ${e}`);
        return NextResponse.json({ status: 500, message: "Notifications failed" })
    }

    return NextResponse.json({ status: 200, message: "Notifications sent successfully" })
}