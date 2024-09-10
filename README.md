# Image Gallery Farcaster Frame

This project is a Farcaster frame that displays images from the public folder with navigation buttons (Previous/Next) and a share button to share the frame with the correct link.

## How to Use

1. Add your images to the `public` folder (e.g., `public/image1.png`, `public/image2.png`).
2. Replace the `insert_vercel_link` in the code with your Vercel project URL.
3. Add a Vercel environment variable `NEXT_PUBLIC_BASE_URL` and set it to your Vercel project URL.

To deploy:
- Run `npm run build` to build the project.
- Use `vercel` to deploy the project, ensuring all images are in the `public` folder.

Enjoy sharing your gallery on Farcaster!
