import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <section className="section pt-28 sm:pt-32">
      <div className="container-x flex min-h-[50vh] flex-col items-start justify-center">
        <p className="kicker">Error 404</p>
        <h1 className="display mt-4 text-6xl font-semibold leading-none text-foreground sm:text-8xl">
          Not found
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
          The page you're looking for doesn't exist or has moved. Let's get you back on track.
        </p>
        <Button className="mt-8" asChild>
          <Link to="/">
            <ArrowLeft />
            Back home
          </Link>
        </Button>
      </div>
    </section>
  )
}
