import Link from 'next/link'

export interface LegalSection {
  id: string
  title: string
  content: React.ReactNode
}

interface LegalPageProps {
  title: string
  lastUpdated: string
  summary: React.ReactNode
  sections: LegalSection[]
}

export default function LegalPage({ title, lastUpdated, summary, sections }: LegalPageProps) {
  return (
    <div className="min-h-screen">
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container px-4 mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: {lastUpdated}</p>
          <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-5 text-sm leading-relaxed space-y-3">
            {summary}
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container px-4 mx-auto max-w-4xl">
          <nav aria-label="Table of contents" className="mb-12 rounded-lg border p-5">
            <h2 className="font-semibold mb-3">Contents</h2>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              {sections.map((section) => (
                <li key={section.id}>
                  <Link href={`#${section.id}`} className="hover:text-foreground transition-colors">
                    {section.title}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-12">
            {sections.map((section, index) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="text-2xl font-bold mb-4">
                  {index + 1}. {section.title}
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_strong]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-foreground">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
