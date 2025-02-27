"use client"

import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {subscribeUser} from "@/app/actions/notifications";

function urlBase64ToUint8Array(base64String: string | undefined) {
    if (!base64String) {
        return;
    }

    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
}


export default function EnableNotifsButton() {

    const [isServiceWorkerSupported, setIsServiceWorkerSupported] = useState(false);
    const [notifsEnabled, setNotifsEnabled] = useState(false);

    useEffect(() => {
        if ("serviceWorker" in navigator && "PushManager" in window) {
            setIsServiceWorkerSupported(true);
            navigator.serviceWorker.register('/sw.js', {
                scope: '/',
                updateViaCache: 'none'
            }).then(registration => {
                registration.pushManager.getSubscription().then(subscription => {
                    console.log("subscription", subscription)
                    setNotifsEnabled(!!subscription);
                })
            })
        }
    }, []);

    async function handleEnableNotifs() {
        navigator.serviceWorker.ready.then(registration => {
            Notification.requestPermission().then((permission) => {
                if (permission !== 'granted') {
                    console.log("Permission not granted");
                } else {
                    registration.pushManager.getSubscription().then(existingSubscription => {
                        if (existingSubscription) {
                            console.debug("User already subscribed");
                            return;
                        }

                        registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY)
                        }).then(subscription => {
                            const serializedSub = JSON.parse(JSON.stringify(subscription));
                            subscribeUser(serializedSub)
                                .then(() => {
                                    setNotifsEnabled(true);
                                })
                        });
                    });
                }
            })
        })

    }

    if (!isServiceWorkerSupported || notifsEnabled) {
        console.log("is service worker supported", isServiceWorkerSupported, notifsEnabled)
        return (
            <></>
        )
    }

    return (
        <Button type={"button"} className={"w-full mt-2"} onClick={handleEnableNotifs}>
            Enable Notifications
        </Button>
    )
}