"use client";

import { useState, Activity } from "react";
import { ExampleLayout } from "@/components/ExampleLayout";
import { MagicMove, useMagicMove } from "magicmove";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

const products: Product[] = [
  { id: "1", name: "Wireless Headphones", category: "Audio", price: 199, stock: 45 },
  { id: "2", name: "Mechanical Keyboard", category: "Accessories", price: 149, stock: 23 },
  { id: "3", name: "USB-C Hub", category: "Accessories", price: 79, stock: 67 },
  { id: "4", name: "4K Monitor", category: "Displays", price: 599, stock: 12 },
  { id: "5", name: "Webcam Pro", category: "Video", price: 129, stock: 34 },
  { id: "6", name: "Desk Lamp", category: "Lighting", price: 89, stock: 56 },
  { id: "7", name: "Mouse Pad XL", category: "Accessories", price: 39, stock: 89 },
  { id: "8", name: "USB Microphone", category: "Audio", price: 169, stock: 28 },
];

function ListView({ products }: { products: Product[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[var(--border)] text-left text-sm text-[var(--text-tertiary)]">
            <th className="pb-3 font-medium">Product</th>
            <th className="pb-3 font-medium">Category</th>
            <th className="pb-3 font-medium text-right">Price</th>
            <th className="pb-3 font-medium text-right">Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <MagicMove
              key={product.id}
              id={`product-${product.id}`}
              as="tr"
              className="border-b border-[var(--border)] hover:bg-[var(--bg)] transition-colors"
            >
              <td className="py-3">
                <MagicMove
                  id={`product-name-${product.id}`}
                  className="font-medium text-[var(--text)]"
                >
                  {product.name}
                </MagicMove>
              </td>
              <td className="py-3">
                <MagicMove
                  id={`product-category-${product.id}`}
                  className="text-[var(--text-secondary)]"
                >
                  {product.category}
                </MagicMove>
              </td>
              <td className="py-3 text-right">
                <MagicMove
                  id={`product-price-${product.id}`}
                  className="text-[var(--text)]"
                >
                  ${product.price}
                </MagicMove>
              </td>
              <td className="py-3 text-right">
                <MagicMove
                  id={`product-stock-${product.id}`}
                  className="text-[var(--text-secondary)]"
                >
                  {product.stock}
                </MagicMove>
              </td>
            </MagicMove>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GridView({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <MagicMove
          key={product.id}
          id={`product-${product.id}`}
          className="bg-[var(--bg)] border border-[var(--border)] rounded-lg p-4 hover:border-[var(--text-tertiary)] transition-colors"
        >
          <MagicMove
            id={`product-name-${product.id}`}
            className="font-medium text-[var(--text)] text-sm"
          >
            {product.name}
          </MagicMove>
          <MagicMove
            id={`product-category-${product.id}`}
            className="text-[var(--text-tertiary)] text-xs mt-1"
          >
            {product.category}
          </MagicMove>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--border)]">
            <MagicMove
              id={`product-price-${product.id}`}
              className="text-[var(--text)] font-medium"
            >
              ${product.price}
            </MagicMove>
            <MagicMove
              id={`product-stock-${product.id}`}
              className="text-xs text-[var(--text-secondary)]"
            >
              {product.stock}
            </MagicMove>
          </div>
        </MagicMove>
      ))}
    </div>
  );
}

function ListGridDemo() {
  const { trigger } = useMagicMove();
  const [view, setView] = useState<"list" | "grid">("list");

  const toggleView = () => {
    trigger(() => {
      setView(view === "list" ? "grid" : "list");
    });
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-[var(--text-secondary)]">
          {products.length} products
        </div>
        <div className="flex items-center gap-1 border border-[var(--border)] rounded-lg p-1">
          <button
            onClick={toggleView}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              view === "list"
                ? "bg-[var(--text)] text-[var(--bg)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text)]"
            }`}
          >
            List
          </button>
          <button
            onClick={toggleView}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              view === "grid"
                ? "bg-[var(--text)] text-[var(--bg)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text)]"
            }`}
          >
            Grid
          </button>
        </div>
      </div>

      {/* View - Using React Activity API to preserve state */}
      <Activity mode={view === "list" ? "visible" : "hidden"}>
        <ListView products={products} />
      </Activity>
      <Activity mode={view === "grid" ? "visible" : "hidden"}>
        <GridView products={products} />
      </Activity>
    </div>
  );
}

export default function ListGridPage() {
  return (
    <ExampleLayout
      title="List ↔ Grid"
      description="Toggle between list and grid layouts with smooth transitions."
    >
      <ListGridDemo />
    </ExampleLayout>
  );
}
