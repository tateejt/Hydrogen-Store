import {useLoaderData, Link} from '@remix-run/react';
import arrow from '../../public/arrow.svg';
import {Card} from 'antd';

export function meta() {
  return [{title: 'UGLY'}, {description: 'Promoting Self love'}];
}

export async function loader({context}) {
  return await context.storefront.query(COLLECTIONS_QUERY);
}

export default function Index() {
  const {collections} = useLoaderData();
  return (
    <section className="block w-full">
      <div className="w-[58%] text-brown mx-auto ">
        <h2 className="text-[3.5rem] text-center font-extrabold">
          Self Love is in... <br /> Wear what you love!
        </h2>
        <h1 className="text-2xl text-center">
          We are spreading the word of self-love.. we offer custom orders, as
          well as clothing designed by us.
        </h1>
      </div>

      <div className="container mx-auto pt-10 overflow-hidden w-full">
        <div className="grid grid-cols-1 gap-[6rem] md:grid-cols-2 xl:grid-cols-3">
          {collections.nodes.map((collection) => {
            return (
              <>
                <Link
                  to={`/collections/${collection.handle}`}
                  key={collection.id}
                >
                  <Card
                    className="bg-brown text-cream flex items-center justify-center"
                    hoverable
                    style={{
                      width: 400,
                      height: 400,
                    }}
                  >
                    <h2 className="text-cream text-2xl text-center">
                      {collection.title}
                    </h2>
                    <div className="flex items-center justify-center">
                      <button className="border-2 rounded-[.75rem] mt-10 py-2 px-8 border-cream text-cream inline-flex items-center">
                        <span>Explore</span>
                        <img src={arrow} alt="arrow" className="w-4 h-4 ml-4" />
                      </button>
                    </div>
                  </Card>
                </Link>
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const COLLECTIONS_QUERY = `#graphql
  query FeaturedCollections {
    collections(first: 3, query: "collection_type:smart") {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
`;
