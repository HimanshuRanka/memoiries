import Layout from "./components/Layout"
import SubmissionForm from "./components/SubmissionForm"
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-6 text-center text-white">Memoiries</h1>
            <p className={"text-white text-xs mb-4 text-center"}>* if you are using safari, pls try chrome! Things break on safari and will be fixed soon hehe oops</p>
            <SubmissionForm/>
            <br />
            <Link href={"/about"} className={"w-full"}>
                <Button
                    type="button"
                    className={`flex-1 text-white w-full bg-opacity-5`}
                >
                    About
                </Button>
            </Link>
        </Layout>
    )
}