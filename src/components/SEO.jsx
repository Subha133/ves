import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, path }) {
    const fullTitle = `${title} | Visual Edit Studio`;
    const siteUrl = 'https://visualeditstudio.com'; // Replace with actual URL if known
    const fullUrl = `${siteUrl}${path || ''}`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={fullUrl} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={`${siteUrl}/og-image.jpg`} />
        </Helmet>
    );
}
