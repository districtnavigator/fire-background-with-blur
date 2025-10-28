import { Card } from '@/components/ui/card'
import { FireBackground } from '@/components/FireBackground'
import { Flame } from '@phosphor-icons/react'

function App() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <FireBackground className="fixed inset-0 z-0" />
      
      <div className="relative z-10 min-h-screen w-full">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            <Card className="backdrop-blur-md bg-card border-white/10 p-8 md:p-12 transition-all hover:bg-card/80 hover:shadow-2xl hover:shadow-accent/20">
              <div className="flex items-center gap-3 mb-6">
                <Flame className="text-accent" size={40} weight="fill" />
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                  Lorem Ipsum
                </h1>
              </div>
              <p className="text-base md:text-lg leading-relaxed text-foreground/90">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </Card>

            <Card className="backdrop-blur-md bg-card border-white/10 p-8 md:p-12 transition-all hover:bg-card/80 hover:shadow-2xl hover:shadow-accent/20">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">
                Sed ut perspiciatis
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-foreground/90 mb-4">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-foreground/90">
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
              </p>
            </Card>

            <Card className="backdrop-blur-md bg-card border-white/10 p-8 md:p-12 transition-all hover:bg-card/80 hover:shadow-2xl hover:shadow-accent/20">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">
                At vero eos
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-foreground/90 mb-4">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-foreground/90">
                Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
              </p>
            </Card>

            <Card className="backdrop-blur-md bg-card border-white/10 p-8 md:p-12 transition-all hover:bg-card/80 hover:shadow-2xl hover:shadow-accent/20">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">
                Temporibus autem
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-foreground/90">
                Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
              </p>
            </Card>

            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground tracking-wide uppercase">
                Powered by Fire & Pixels
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App