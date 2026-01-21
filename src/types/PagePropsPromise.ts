export type PagePropsPromise = {
    params: { slug: string | string[] } | Promise<{ slug: string | string[] }>;
  };