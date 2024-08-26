import Image from "next/image"
import diagram from '@/public/newDiagram.jpg'

export default function Diagram() {
  return (
    <div className="w-full flex justify-center">
        <Image
            src={diagram}
            width={650}
            height={650}
            alt="Diagram"
            className="mt-20 shadow-xl p-2 border bg-white rounded-xl"/>
    </div>
  )
}
