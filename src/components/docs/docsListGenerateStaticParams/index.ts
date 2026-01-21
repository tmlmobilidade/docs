import { source } from "@/lib/source";

export async function docsListGenerateStaticParams() {
  try {
    const params = source.generateParams();
    if (!params || !params.length) {
      console.warn('generateParams returned nothing, using fallback');
      return [{ slug: ['placeholder'] }];
    }
    return params;
  } catch (e) {
    console.error('Error generating params:', e);
    return [{ slug: ['placeholder'] }];
  }
}


