import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = 'نُخبة - منصة التميز الأكاديمي',
  description = 'منصة تعليمية متكاملة تجمع بين التعليم والإثراء المعرفي لتمكين الطلاب والطالبات من التفوق الأكاديمي المستمر',
  keywords = 'نخبة, التميز الأكاديمي, جامعة الملك سعود, تعليم, دورات, ملفات دراسية, KSU',
  image = 'https://nokhba-platform.pages.dev/logo.jpg',
  url = 'https://nokhba-platform.pages.dev',
  type = 'website',
  author = 'برنامج نخبة - جامعة الملك سعود'
}) => {
  const fullTitle = title.includes('نُخبة') ? title : `${title} | نُخبة`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="language" content="Arabic" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />

      {/* Viewport and Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="نُخبة" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="ar_SA" />
      <meta property="og:site_name" content="نُخبة" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Theme Color */}
      <meta name="theme-color" content="#008DC3" />
      <meta name="msapplication-TileColor" content="#008DC3" />

      {/* Additional */}
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    </Helmet>
  );
};

export default SEO;
