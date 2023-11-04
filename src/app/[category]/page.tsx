import { FC } from 'react';
import { promises as fs } from 'fs';
import sizeOf from 'image-size';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import path from 'path';

type CategoryInfo = {
  parent: string;
};

export const generateStaticParams = async () => {
  const imagesDirectory = path.join(process.cwd(), 'public', 'images');

  const dirNames = (await fs.readdir(imagesDirectory, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  return dirNames.map(dirName => ({
    category: dirName,
  }));
};

const CategoryPage: FC<{ params: { category: string } }> = async ({
  params,
}) => {
  const categoryDirectory = path.join(
    process.cwd(),
    'public',
    'images',
    params.category
  );

  let info: CategoryInfo | null = null;
  let imageNames: string[] | null = null;
  try {
    const fileNames = await fs.readdir(categoryDirectory);
    imageNames = fileNames.filter(fileName => fileName !== 'info.json');

    const infoFile = await fs.readFile(
      path.join(categoryDirectory, 'info.json'),
      'utf-8'
    );
    info = JSON.parse(infoFile);
  } catch (e) {
    throw redirect('/');
  }

  return (
    <>
      Category: {params.category}
      <div>
        {imageNames.map(imageName => {
          const imageSize = sizeOf(path.join(categoryDirectory, imageName));
          return (
            <Image
              key={imageName}
              src={`/images/${params.category}/${imageName}`}
              alt={imageName}
              width={imageSize.width}
              height={imageSize.height}
            />
          );
        })}
      </div>
    </>
  );
};

export default CategoryPage;
