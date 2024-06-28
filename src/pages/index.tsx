import { Controls } from "@/components/Controls";
import { Events } from "@/components/Events";
import { LoadMore } from "@/components/LoadMore";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`container mx-auto rounded-2xl rounded-b-2xl h-12 overflow-y-auto relative  ${inter.className}`}
    >
      <Controls />
      <Events events={[]} />
      <LoadMore />
    </main>
  );
}
