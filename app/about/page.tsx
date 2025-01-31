"use client"

import Layout from "../components/Layout"
import {Letter} from "@/app/components/memories/Letter";
import {Polaroid} from "@/app/components/memories/Polaroid";
import {Vinyl} from "@/app/components/memories/Vinyl";
import {AffirmationStep} from "@/app/components/AffirmationStep";
import {MoodSelector} from "@/app/components/MoodSelector";

export default function About() {
  return (
    <Layout>
      <div className="w-full max-w-4xl mx-auto px-4 py-8 text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">About Memoiries</h1>

        <section className="mb-8">
          <p className="mb-4">
            Hello my dearest and nearest! If you are reading this it is because you are someone special to Nivie; And there are very many of you.
            Sometimes for her however it becomes easy to forget that. And for most of us hard to express that. That is why I built this little webapp.
            It is a place where you can write a letter, upload a photo or share a song with Nivie. And she can read it when she needs a little pick me up.
            It is her birthday very soon and I thought it would be nice to remind how much she is loved every day, and hope her day starts on a brighter note because of it.
            Everythin in this website is built with that in mind. Let me explain

          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">What is this</h2>
          <p className="mb-4">
             As you must have seen already there is a simple form that allows you to upload a photo, a song, or a letter for Nivie. Everyday morning one of the
            artifacts of love will be displayed and sent to Nivie!
          </p>
          <p className={"my-4"}>
            A letter would look something like this:
          </p>
          <Letter memory={{
            type: "letter",
            content: "",
            note: "Dear Nivie, I love you so much. You are the best thing that has ever happened to me. I am so grateful for you. I hope" +
                " you have a great day today",
            senderName: "Your Secret Admirer",
            createdAt: new Date(),
          }} />
          <p className={"my-4"}>
            A song, like this:
          </p>
          <Vinyl memory={{
            type: "song",
            content: "https://open.spotify.com/track/07MDkzWARZaLEdKxo6yArG?si=83608185d1f346ba",
            note: "This song always takes me back to when we broke curfew and climbed the mountain XD (unfortunately this one does not play" +
                " the song still LOL... working on it)",
            senderName: "Your best fren",
            createdAt: new Date(),
          }}/>
          <p className={"my-4"}>
            And a photo like this (eventually there will be more that she can swipe through):
          </p>
            <Polaroid memories={[{
                type: "photo",
                content: "https://images.unsplash.com/photo-1564053487107-6e6a022b8c1f",
                note: "This is a photo of us at the beach. I love this photo",
                senderName: "Your best fren",
                createdAt: new Date(),
            }]}/>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How does it all work</h2>
          <p className={"mb-4"}>
            Everyday morning she will be presented with an affirmation. Something like this:
          </p>
          <AffirmationStep onComplete={() => {}} />
          <p className={"my-4"}>
            Once she types it in she will be taken to her memory page where one of the many memories submitted will be displayed
          </p>
          <p className={"mb-4"}>
            The purpose of this affirmation is to start her day on a positive note. And the memory is to remind her how much she is loved.
          </p>
          <p className={"mb-4"}>
            Finally she will have the choice to log her mood choosing between:
          </p>
          <MoodSelector onMoodSelect={() => {}} />
          <p className={"my-4"}>
            My hope is that the affirmation combined with the memory will trend her moods logged to consistently be positive :)
          </p>
          <p className={"mb-4"}>
            Additionally logging her mood will allow her to take a second to evaluate how she is feeling in that moment which also has many positive effects in the long run
          </p>
        </section>



        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
          <p className={"mb-4"}>
            All in all every little thing here is made with the goal to remind the most special person in my life how much she is loved and how much she has to be happy about :) Little by little everyday
          </p>
          <p className={"mb-4"}>
            The final, and MOST important, piece of this is you! Your thoughts, pictures, memories, songs and most importantly your love!
          </p>
        </section>

        <section className={"mb-8"}>
          <h2 className="text-2xl font-semibold mb-4">With Love,</h2>
          <p className={"mb-4"}>
            Anyway, please take a moment to add a little message or upload a photo or link a song that makes you think of Nivie. And if you have any feedback or ideas please let me know!
          </p>
        </section>

        <section className={"mb-8"}>
          <p className={"mb-4 font-semibold"}>
            And please never forget, you are all extremely loved too. Especially by me
          </p>
        </section>
      </div>
    </Layout>
  )
}