import { createMetadata } from "@/lib/metadata";
import { blog } from "@/lib/source";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageProps } from "@/types/PageProps";

export async function blogListGenerateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug ?? [];
  
    // Case: all blogs
    if (slug.length === 0) {
      return { title: `TML Mobilidade Blog` };
    }
  
    const page = blog.getPage(slug);
    if (!page) notFound();
  
    return createMetadata({
      title: page.data.title,
      description: page.data.description,
    });
  }