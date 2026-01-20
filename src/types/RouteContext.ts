export type RouteContext = {
    params: Promise<{ slug: string[] }>; 
    request?: Request;
  };