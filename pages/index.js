import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';

export async function getServerSideProps() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://insert_vercel_link.vercel.app'; // Replace with actual vercel project
  const publicDir = path.join(process.cwd(), 'public');
  
  // Read the public directory and filter out only .png files
  const files = fs.readdirSync(publicDir).filter(file => file.endsWith('.png'));
  
  // Prepend '/' to file paths
  const images = files.map(file => `/${file}`);

  // Share text (customizable by users)
  const defaultShareText = "Here's my gallery!"; // You can enter what you want here for the Share cast
  const shareText = encodeURIComponent(`${defaultShareText}\n\n`);

  // Generate the full share link
  const shareLink = `https://warpcast.com/~/compose?text=${shareText}&embeds[]=${encodeURIComponent(baseUrl)}`;

  return { props: { baseUrl, images, shareLink, defaultShareText } };
}

export default function Gallery({ baseUrl, images, shareLink, defaultShareText }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <>
      <Head>
        <title>Image Gallery</title>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content={`${baseUrl}${images[currentIndex]}`} />
        <meta property="fc:frame:button:1" content="Previous" />
        <meta property="fc:frame:button:1:action" content="link" />
        <meta property="fc:frame:button:1:target" content="#" />

        <meta property="fc:frame:button:2" content="Next" />
        <meta property="fc:frame:button:2:action" content="link" />
        <meta property="fc:frame:button:2:target" content="#" />

        <meta property="fc:frame:button:3" content="Share" />
        <meta property="fc:frame:button:3:action" content="link" />
        <meta property="fc:frame:button:3:target" content={shareLink} />
      </Head>

      <main>
        <h1>Image Gallery</h1>
        <Image src={`${baseUrl}${images[currentIndex]}`} alt="Gallery Image" width={500} height={300} />

        <div>
          <button onClick={prevImage}>Previous</button>
          <button onClick={nextImage}>Next</button>
        </div>

        <div>
          <p>Click the button below to share this gallery with others:</p>
          <button onClick={() => window.open(shareLink, '_blank')}>Share</button>
        </div>
      </main>
    </>
  );
}
