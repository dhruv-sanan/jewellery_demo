import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'MAISON Fine Jewellery'
const DEFAULT_DESCRIPTION = 'Redefining luxury jewellery for the modern world. Explore our exclusive collections of handcrafted fine jewellery in Mumbai.'
const DEFAULT_IMAGE = '/Social_Share_Preview.jpg'
const BASE_URL = 'https://maisonjewellery.com'

export default function SEO({ title, description, image, path = '/', type = 'website' }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Luxury Jewellery Mumbai`
  const desc = description || DEFAULT_DESCRIPTION
  const ogImage = image || DEFAULT_IMAGE
  const url = `${BASE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter / WhatsApp */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`} />
    </Helmet>
  )
}
