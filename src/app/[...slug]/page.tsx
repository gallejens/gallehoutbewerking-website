import { FC } from 'react';
import sizeOf from 'image-size';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import path from 'path';

import { IMAGES } from '@/images';

export const generateStaticParams = () => {
  const slugs: [string, string][] = [];
  for (const [k, cats] of Object.entries(IMAGES)) {
    for (const cat of Object.keys(cats)) {
      slugs.push([k, cat]);
    }
  }
  return slugs;
};

const getImageSize = (imagePath: string): { width: number; height: number } => {
  const imageSize = sizeOf(path.join(process.cwd(), 'public', imagePath));
  const width = imageSize.width ?? 0;
  const height = imageSize.height ?? 0;

  if (
    imageSize.orientation !== undefined &&
    [5, 6, 7, 8].includes(imageSize.orientation)
  ) {
    return { width: height, height: width };
  }
  return { width, height };
};

const CategoryPage: FC<{ params: { slug: string[] } }> = ({ params }) => {
  const [parentSlug, categorySlug] = params.slug;
  if (!parentSlug || !categorySlug) throw redirect('/');

  const images = IMAGES[parentSlug]?.[categorySlug];
  if (!images) throw redirect('/');

  return (
    <>
      {params.slug.join(' -> ')}
      <div>
        {Object.entries(images).map(([image, labels]) => {
          const imagePath = path.join(
            'images',
            parentSlug,
            categorySlug,
            image
          );
          const { width, height } = getImageSize(imagePath);

          return (
            <Image
              key={image}
              src={`/${imagePath}`}
              alt={labels.join(', ')}
              width={width}
              height={height}
            />
          );
        })}
      </div>
    </>
  );
};

export default CategoryPage;
