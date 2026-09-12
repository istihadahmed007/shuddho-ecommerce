import React from "react";
import type { Metadata } from "next";
import { products, getProductBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | SHUDDHO (শুদ্ধ)",
    };
  }

  return {
    title: `${product.name} | SHUDDHO (শুদ্ধ)`,
    description: product.shortDescription || product.description,
    openGraph: {
      title: `${product.name} | SHUDDHO`,
      description: product.shortDescription || product.description,
      images: [product.images[0]?.url],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Get related products from the same category
  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
