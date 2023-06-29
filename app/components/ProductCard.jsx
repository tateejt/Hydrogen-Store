import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import {Card} from 'antd';

export default function ProductCard({product}) {
  const {price, compareAtPrice} = product.variants?.nodes[0] || {};
  const isDiscounted = compareAtPrice?.amount > price?.amount;

  return (
    <Card
      className="bg-brown text-cream"
      hoverable
      style={{
        width: 300,
      }}
    >
      <Link to={`/products/${product.handle}`} className="hover:text-cream">
        <div className="shadow-sm rounded relative">
          {isDiscounted && (
            <label className="subpixel-antialiased absolute top-0 right-0 m-4 text-right text-notice text-red-600 text-xs">
              Sale
            </label>
          )}
          <Image
            data={product.variants.nodes[0].image}
            alt={product.title}
            className="rounded-md"
          />
        </div>
        <div className="grid gap-[2.5rem]">
          <div className="grid gap-1 ">
            <h3 className="max-w-prose text-copy w-full overflow-hidden whitespace-nowrap text-ellipsis">
              {product.title}
            </h3>
            <div className="flex gap-4">
              <span className="max-w-prose whitespace-pre-wrap inherit text-copy flex gap-4">
                <Money withoutTrailingZeros data={price} />
                {isDiscounted && (
                  <Money
                    className="line-through opacity-50"
                    withoutTrailingZeros
                    data={compareAtPrice}
                  />
                )}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}
