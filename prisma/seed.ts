/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const movie1 = await prisma.movie.create({
    data: {
      title: 'Inception',
      description:
        'A thief who steals corporate secrets through the use of dream-sharing technology.',
      releaseDate: new Date('2010-07-16'),
      director: 'Christopher Nolan',
      genres: ['Action', 'Adventure', 'Sci-Fi'],
      rating: 8.8,
      runtimeMinutes: 148,
    },
  });

  const movie2 = await prisma.movie.create({
    data: {
      title: 'Interstellar',
      description:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      releaseDate: new Date('2014-11-07'),
      director: 'Christopher Nolan',
      genres: ['Adventure', 'Drama', 'Sci-Fi'],
      rating: 8.6,
      runtimeMinutes: 169,
    },
  });

  const series = await prisma.series.create({
    data: {
      title: 'Stranger Things',
      description:
        'When a young boy vanishes, a small town uncovers a mystery involving secret experiments.',
      releaseDate: new Date('2016-07-15'),
      creator: 'The Duffer Brothers',
      genres: ['Drama', 'Fantasy', 'Horror'],
      seasons: 4,
      episodes: 34,
      rating: 8.7,
      runtimeMinutes: 2041,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
