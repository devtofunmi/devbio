import { GetServerSideProps } from 'next';

const Sitemap = () => {
    return null;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const BASE_URL = 'https://devbio.co';

    const staticPages = [
        '',
        '/login',
        '/signup',
        '/donate',
        '/about',
        '/contribute',
        '/claim',
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
            .map((url) => {
                return `
            <url>
              <loc>${BASE_URL}${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>0.7</priority>
            </url>
          `;
            })
            .join('')}
    </urlset>
  `;

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default Sitemap;