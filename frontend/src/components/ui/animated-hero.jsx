import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { MoveRight, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

function Hero() {
  const { user } = useAuth()
  const [titleNumber, setTitleNumber] = useState(0)
  const titles = useMemo(
    () => ['organized', 'connected', 'productive', 'focused', 'simpler'],
    [],
  )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1))
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [titleNumber, titles])

  return (
    <div className="w-full bg-black">
      <div className="container mx-auto">
        <div className="flex gap-8 py-24 lg:py-44 items-center justify-center flex-col">

          <div>
            <Button
              variant="secondary"
              size="sm"
              className="gap-4 bg-white/10 text-white/70 hover:bg-white/15 border border-white/20"
            >
              Built for university students <BookOpen className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-normal text-white">
              <span>Study groups made</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center pb-4 pt-1 md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-white"
                    initial={{ opacity: 0, y: '-100' }}
                    transition={{ type: 'spring', stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-white/50 max-w-2xl text-center">
              CampusConnect helps university students collaborate more clearly 
              group tasks, study sessions, and member management all in one shared
              workspace.
            </p>
          </div>

          <div className="flex flex-row gap-3">
            {user ? (
              <>
                <Button
                  size="lg"
                  className="gap-4 border-white/20 text-white bg-transparent hover:bg-white/10"
                  variant="outline"
                  asChild
                >
                  <Link to="/about">About</Link>
                </Button>
                <Button
                  size="lg"
                  className="gap-4 bg-white text-black hover:bg-white/90"
                  asChild
                >
                  <Link to="/dashboard">
                    Go to dashboard <MoveRight className="w-4 h-4" />
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="lg"
                  className="gap-4 border-white/20 text-white bg-transparent hover:bg-white/10"
                  variant="outline"
                  asChild
                >
                  <Link to="/login">Log in</Link>
                </Button>
                <Button
                  size="lg"
                  className="gap-4 bg-white text-black hover:bg-white/90"
                  asChild
                >
                  <Link to="/signup">
                    Get started <MoveRight className="w-4 h-4" />
                  </Link>
                </Button>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export { Hero }