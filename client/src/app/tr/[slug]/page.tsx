import Image from 'next/image';
import profileImg from '@/assets/images/test_profile.jpg';
import coverImg from '@/assets/images/test_cover.png';
import UserTabs from '@/components/UserTabs';
import { ModeToggle } from '@/components/theme-toggle';
import { Copylink } from '@/components/Copylink'
interface Props {
  params: {
    slug: string;
  };
}

async function fetchUserData() {
  /*
  const response = await fetch('https://randomuser.me/api');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
  */
}

const UserTree = async ({ params }: Props) => {
  const { slug } = params;
  
  let data = true;
  let error = null;
/*
  try {
    data = await fetchUserData();
  } catch (err: any) {
    error = err.message;
  }
*/
  return (
    <main className="min-h-screen w-full flex bg-white dark:bg-gray-950 flex-col">
      <div className="w-full flex flex-col">
        <Image
          className="w-full h-28 md:h-44 border-b-4 border-gray-300 dark:border-gray-800 relative"
          src={coverImg}
          priority={true} 
          alt="Cover"
        />
        <div className="relative">
          {data && (
            <Image
              className="rounded-full w-[7rem] h-[7rem] md:h-[12rem] md:w-[12rem] border-4 md:border-8 border-sky-300 absolute top-[-3.5rem] md:top-[-6rem] mx-8"
              src={profileImg}
              width={100} 
              height={100}
              alt="Profile Picture"
            />
          )}
          <div className="absolute top-0 right-0 mt-4 mr-6">
            <Copylink user={'libyzxy0'} />
            <ModeToggle className="ml-3 border-none bg-gray-100 dark:bg-gray-800" />
          </div>
        </div>
        {data && (
          <div className="flex flex-col mt-[4.5rem] md:mt-[7.3rem] mx-8">
            <h1 className="text-gray-700 dark:text-white">
              <span className="text-2xl font-bold">Jan Liby Dela Costa</span>{' '}
              <span className="font-medium text-gray-700 dark:text-gray-200 text-md">
                ({"libyzxy0"})
              </span>
            </h1>
            <p className="text-gray-700 dark:text-white font-medium">Full-Stack Web Developer</p>
          </div>
        )}
        <div className="w-full flex justify-center flex-col mt-8">
          <UserTabs data={null} error={null} />
        </div>
      </div>
    </main>
  );
};

export default UserTree;
