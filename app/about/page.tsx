import Layout from "../components/Layout"

export default function About() {
  return (
    <Layout>
      <div className="w-full max-w-4xl mx-auto px-4 py-8 text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">About Memoiries</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Purpose</h2>
          <p className="mb-4">
            Memoiries is designed to help you cherish and reflect on your most precious memories while promoting
            mindfulness and emotional awareness. We believe that by regularly engaging with positive memories and
            understanding our emotions, we can lead happier, more fulfilling lives.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">What You Can Do</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Submit Memories: Share your cherished moments as letters, photos, or songs.</li>
            <li>View Random Memories: Rediscover past moments to brighten your day.</li>
            <li>Daily Affirmations: Start each memory viewing with a positive affirmation.</li>
            <li>Mood Logging: Track your daily emotions with our intuitive mood selector.</li>
            <li>Customize Notifications: Set up how often you'd like to receive memory reminders.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Improved Mood: Regularly revisiting happy memories can boost your overall mood.</li>
            <li>Increased Gratitude: Reflect on positive experiences to cultivate thankfulness.</li>
            <li>Emotional Intelligence: Track and understand your emotions better over time.</li>
            <li>Stress Reduction: Take a moment to pause and reflect, reducing daily stress.</li>
            <li>Strengthened Relationships: Share and cherish memories with loved ones.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
          <p>
            At Memoiries, we're committed to providing a safe, private space for you to store and reflect on your most
            treasured moments. We believe that by connecting with our past experiences and understanding our present
            emotions, we can create a brighter, more mindful future.
          </p>
        </section>
      </div>
    </Layout>
  )
}

