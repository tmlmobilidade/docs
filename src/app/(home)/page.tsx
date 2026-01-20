import { cn } from '@/lib/cn';
import Link from 'next/link';
import { blog } from '@/lib/source';
import { buttonVariants } from '@/components/ui/button';
import { getName } from '@/lib/getName';


export default function Page() {

  const posts = [...blog.getPages()]
  .sort(
    (a, b) =>
      new Date(a.data.date ?? getName(a.path)).getTime() -
      new Date(b.data.date ?? getName(b.path)).getTime(),
  )
  .slice(0, 4);


  return (
    <main className="text-landing-foreground pt-4 pb-6 dark:text-landing-foreground-dark md:pb-12">
      <div className="relative flex min-h-[200px] h-[70vh] max-h-[400px] border rounded-2xl overflow-hidden mx-auto w-full max-w-[1400px] bg-origin-border">
        <div className="flex flex-col z-2 px-4 size-full md:p-12 max-md:items-center max-md:text-center">
          <h1 className="text-4xl my-8 leading-tighter font-medium xl:text-5xl xl:mb-12">
            Descobre a melhor 
            <br className="md:hidden" /> documentação sobre veículos,
            <br />
            tudo sobre a rede de autocarros de Portugal.
          </h1>
          <div className="flex flex-row items-center justify-center gap-4 flex-wrap w-fit">
          <Link href="/docs" className={cn(buttonVariants(), 'max-sm:text-sm')}>
              Começar a ler documentação
            </Link>
            <a
              href="/blog"
              target="_blank"
              rel="noreferrer noopener"
              className={cn(buttonVariants({ variant: 'secondary' }), 'max-sm:text-sm')}
            >
              Ver Blogs sobre tudo da TML
            </a>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-10 mt-12 px-6 mx-auto w-full max-w-[1400px] md:px-12 lg:grid-cols-2">
        <p className="text-2xl tracking-tight leading-snug font-light col-span-full md:text-3xl xl:text-4xl">
        <span className="text-brand font-medium"></span>
          Aqui podes descobrir como funciona a rede de autocarros da tua cidade, gerida pela <span className="text-brand font-medium">TML Mobilidade</span>. 
          Fica a conhecer a organização do serviço, o planeamento das linhas e os horários, e compreende melhor o funcionamento do teu autocarro favorito no dia a dia.
        </p>
        <br />
        <div className="p-8 bg-radial-[circle_at_top_center] from-25% to-brand-secondary/50 rounded-xl col-span-full">
          <h2 className="text-xl text-center text-brand font-mono font-bold uppercase mb-2">
            se preferires podes explorar os blogs sobre a tml.
            <br />
            <br/>
            <br/>
            Alguns Blogs
            <br />
              ↓
          </h2>
        </div>
      {posts.map((post) => (
        <Link
           key={post.url}
           href={post.url}
           className="flex flex-col bg-fd-card rounded-2xl border shadow-sm p-4 transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
          >
            <p className="font-medium">{post.data.title}</p>
            <p className="text-sm text-fd-muted-foreground">
             {post.data.description}
            </p>
            <p className="mt-auto pt-4 text-xs text-brand">
              {new Date(post.data.date ?? getName(post.path)).toDateString()}
            </p>
          </Link>
        ))}
    </div>
    <div className="p-8 bg-radial-[circle_at_top_center] from-25% to-brand-secondary/50 rounded-xl col-span-full">
    <br />
    <br />
      <h2  className="text-xl text-center text-brand font-mono font-bold uppercase mb-2">
        <Link href="/docs" className={cn(buttonVariants({ variant: 'secondary' }), 'max-sm:text-sm')}>
          ver mais blogs sobre tudo da TML
        </Link>   
      </h2>
      </div>
    </main>
  );
}