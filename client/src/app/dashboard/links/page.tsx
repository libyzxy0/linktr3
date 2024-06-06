import { ModeToggle } from "@/components/theme-toggle";
import { ButtonBack } from "@/components/ButtonBack";
import { LinkCreateForm } from "@/components/LinkCreateForm";

export default function Links() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
        <nav className="sticky top-0 flex items-center justify-between h-16 border-b border-gray-200 dark:border-gray-800 z-40 bg-white dark:bg-gray-950">
          <div className="flex flex-row items-center space-x-2 mx-4">
            <ButtonBack loc="/dashboard" />
            <h1 className="font-medium text-[1.4rem] text-gray-700 dark:text-white md:text-3xl">
              My Links
            </h1>
          </div>
          <div className="flex flex-row items-center space-x-3 mx-4">
            <ModeToggle />
          </div>
        </nav>

        <main className="mx-6 w-fufl flex justify-center flex-col mt-10">
          <LinkCreateForm />
        </main>
      </div>
    </>
  );
}
