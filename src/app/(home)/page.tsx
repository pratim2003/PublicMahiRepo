// import { HomeView } from 'src/sections/home/view';

// // ----------------------------------------------------------------------

// export const metadata = {
//   title: 'Minimals UI: The starting point for your next project',
//   description:
//     'The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style',
// };

// export default function Page() {
//   return <HomeView />;
// }

// file: app/page.tsx

// file: src\app\(home)\page.tsx

import { HomeView } from 'src/sections/home/view';

// Define the data structure for your home page content
interface FetchedHomeData {
  data: {
    _id: string;
    heading: string;
    body: string;
    image: string;
    __v: number;
  }[];
}

// Function to fetch data from your API
async function getHomeData(): Promise<FetchedHomeData> { // Ensure the return type is correct
  try {
    const res = await fetch('http://localhost:8082/api/fpii/home/');

    // if (!res.ok) {
    //   throw new Error('Failed to fetch home page data');
    // }

    // Correct: Return the parsed JSON data
    const data = await res.json();
    console.log('Fetched data:', data); // This logs to the server terminal
    return data;

  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Maahi Dev',
  description: 'Maahi Dev is a student journalist from Monta Vista High School.',
};

export default async function Page() {
  // Fetch the data
  const homeData = await getHomeData();

  // Correct: Pass the plain JSON object to the client component
  return <HomeView homeData={homeData} />;
}