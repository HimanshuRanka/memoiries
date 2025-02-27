'use server'

import webpush, {PushSubscription} from 'web-push'
import {getSubscriptionDetails, setSubscriptionDetails} from "@/lib/mongodb";

webpush.setVapidDetails(
    '<mailto:your-email@example.com>',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
)


export async function subscribeUser(sub: PushSubscription) {
    const setSubResponse = await setSubscriptionDetails(sub)

   if (!setSubResponse.upsertedId) {
        return { success: false, error: 'Failed to save subscription' }
   } else {
        return { success: true }
   }
}

export async function sendNotification(message: string) {
    const subscription = await getSubscriptionDetails()

    if (!subscription) {
        throw new Error('No subscription available')
    }

    try {
        await webpush.sendNotification(
            subscription,
            JSON.stringify({
                title: 'Hi love! You have a new memory waiting for you!',
                body: 'Sent to you with love from  loved one',
                icon: '/icon-192.png',
            })
        )
        return { success: true }
    } catch (error) {
        console.error('Error sending push notification:', error)
        return { success: false, error: 'Failed to send notification' }
    }
}