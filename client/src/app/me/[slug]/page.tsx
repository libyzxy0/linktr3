import Image from "next/image";
import profileImg from "@/assets/images/test_profile.jpg";
import UserTabs from "@/components/UserTabs";
import { ModeToggle } from "@/components/theme-toggle";
import { Copylink } from "@/components/Copylink";
import { Footer } from "@/components/Footer";
import axios from "axios";
import { apiBase } from "@/constants";
import { Eye } from "lucide-react";
interface Props {
  params: {
    slug: string;
  };
}

const UserTree = async ({ params }: Props) => {
  const { slug } = params;
  let data;
  let error;
  try {
    const response = await axios.post(apiBase + "/api/get-user", {
      username: slug,
    });
    data = response.data;
    console.log(response.data);
  } catch (err: any) {
    console.log(err);
    error = err;
  }

  if (!data && error) {
    return (
      <div className="h-[90vh] flex justify-center items-center">
        <h1 className="text-5xl font-bold text-gray-700 animate-pulse">404</h1>
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
        <div className="flex-grow flex flex-col">
          <div className="w-full flex flex-col">
            <Image
              className="w-full h-28 md:h-44 border-b-4 border-gray-300 dark:border-gray-800 relative"
              src={
                data?.user.cover
                  ? data.user.cover
                  : "https://source.unsplash.com/random/1584x396/?neon"
              }
              width={500}
              height={200}
              priority={true}
              alt="Cover"
            />
            <div className="relative">
              {data && (
                <Image
                  className="rounded-full w-[7rem] h-[7rem] md:h-[12rem] md:w-[12rem] border-4 md:border-8 border-sky-300 absolute top-[-3.5rem] md:top-[-6rem] mx-8"
                  src={data?.user.avatar.replace("s96-c", "s384-c")}
                  width={100}
                  height={100}
                  alt="Profile Picture"
                />
              )}
              <div className="absolute top-0 right-0 mt-4 mr-6">
                <button className="text-gray-700 dark:text-white border-2 border-gray-100 py-1.5 px-3 border-none bg-gray-100 dark:bg-gray-800 transition-all duration-300 rounded-lg mr-3">
                  <div className="flex justify-center items-center flex-row">
                    <Eye className="w-5 h-5 mr-2" />
                    <span>{data?.user.visits}</span>
                  </div>
                </button>
                <Copylink user={data?.user.username} />
                <ModeToggle className="ml-3 border-none bg-gray-100 dark:bg-gray-800" />
              </div>
            </div>
            {data && (
              <div className="flex flex-col mt-[4.5rem] md:mt-[7.3rem] mx-8">
                <h1 className="text-gray-700 dark:text-white">
                  <span className="text-2xl font-bold">{data?.user.name}</span>{" "}
                  <span className="font-medium text-gray-700 dark:text-gray-200 text-md">
                    ({data?.user.username})
                  </span>
                </h1>
                <p className="text-gray-700 dark:text-gray-300 font-medium mt-2">
                  {data?.user.bio ? data.user.bio : "No description"}
                </p>
              </div>
            )}
            <div className="w-full flex justify-center flex-col mt-8">
              {data?.user.links && (
                <UserTabs
                  links={data?.user.links}
                  cards={data?.user.cards}
                  error={null}
                />
              )}
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default UserTree;
