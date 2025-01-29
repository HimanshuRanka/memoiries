import Layout from "./components/Layout"
import SubmissionForm from "./components/SubmissionForm"

export default function Home() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Memoiries</h1>
      <SubmissionForm />
    </Layout>
  )
}

