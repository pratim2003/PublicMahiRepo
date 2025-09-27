// // 
// // 

// /**
//  * @type {import('next').NextConfig}
//  */
// const nextConfig = {
//   trailingSlash: true,
//   env: {
//     BUILD_STATIC_EXPORT: 'true', // server mode (keeps API routes working)
//   },
//     images: {
//     unoptimized: true,
//     BUILD_STATIC_EXPORT: 'true', // server mode (keeps API routes working)
//   },
//     images: {
//     unoptimized: true,
//   },
//   output:'export',
//   modularizeImports: {
//     '@mui/icons-material': {
//       transform: '@mui/icons-material/{{member}}',
//     },
//     '@mui/material': {
//       transform: '@mui/material/{{member}}',
//     },
//     '@mui/lab': {
//       transform: '@mui/lab/{{member}}',
//     },
//   },
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/,
//       use: ['@svgr/webpack'],
//     });
//     return config;
//   },
// };

// export default nextConfig;


// /**
//  * @type {import('next').NextConfig}
//  */
// const nextConfig = {
//   trailingSlash: true,
//   env: {
//     BUILD_STATIC_EXPORT: 'true', // server mode (keeps API routes working)
//   },
//     images: {
//     unoptimized: true,
//   },
//   output:'export',
  
//   modularizeImports: {
//     '@mui/icons-material': {
//       transform: '@mui/icons-material/{{member}}',
//     },
//     '@mui/material': {
//       transform: '@mui/material/{{member}}',
//     },
//     '@mui/lab': {
//       transform: '@mui/lab/{{member}}',
//     },
//   },
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/,
//       use: ['@svgr/webpack'],
//     });
//     return config;
//   },
// };

// export default nextConfig;

const nextConfig = {
  trailingSlash: true,
  env: {
    BUILD_STATIC_EXPORT: 'true', // or remove this if not needed
  },
  images: {
    unoptimized: true,
  },
  // output:'export',
  
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}',
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};


export default nextConfig;
