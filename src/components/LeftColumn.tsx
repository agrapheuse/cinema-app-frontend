import { JSX } from "react";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { signOut, useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

export const LeftColumn = ({}: {}): JSX.Element => {
  const { data: session } = useSession();

  const logOut = async (): Promise<void> => {
    await signOut();
  };

  return (
    <div className="w-[30%] bg-gray-200 p-4 flex flex-col">
      <div className="text-center mb-4">
        <Image
          src="/logo.svg"
          alt="logo"
          width={150}
          height={50}
          className="w-full h-auto"
        />
      </div>
      <div className="flex flex-row">
        <p className="mx-3 hover:underline cursor-pointer font-bold">HOME</p>
        <p className="mx-3 hover:underline cursor-pointer font-bold">
          CALENDAR
        </p>
        <p className="mx-3 hover:underline cursor-pointer font-bold">NEWS</p>
        <p className="mx-3 hover:underline cursor-pointer font-bold">ABOUT</p>
        <p className="mx-3 hover:underline cursor-pointer font-bold">CONTACT</p>
      </div>

      <Separator className="my-4 bg-black" />

      <div className="mb-4 flex flex-row">
        <span className="block font-bold mr-4">ZONES:</span>
        <ul className="flex space-x-4">
          <li className="cursor-pointer hover:underline">BRUXELLES</li>
          <li className="cursor-pointer hover:underline">ANVERS</li>
          <li className="cursor-pointer hover:underline">MONS</li>
        </ul>
      </div>

      <Separator className="my-4 bg-black" />

      {session ? (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image
                src={session.user?.image || ""}
                alt="profile"
                width={25}
                height={25}
                className="rounded-full"
              />
              <span>{session.user?.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="font-bold hover:underline"
                onClick={() => logOut}
              >
                LOG OUT
              </button>
            </div>
          </div>

          <div className="my-4 border-2 border-black p-2">
            <span className="block font-bold mb-2">MES SÉANCES</span>
            <table className="table-auto w-full text-sm">
              <tbody></tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="flex flex-col">
          <button className="self-end" onClick={() => signIn()}>
            LOG IN
          </button>
          <div className="flex flex-col my-4 border-2 border-black p-2">
            <span className="text-sm">MY VIEWINGS</span>
            <span className="text-xs">
              You have to be logged in to save views to your calendar
            </span>
          </div>
        </div>
      )}

      <footer className="text-xs text-gray-500 mt-auto">
        <p>
          Website Developed By Noah Diderich & Philippe De Meulemeester ©
          SHORTNEWSABOUTFILMS Copyright - 2024
        </p>
      </footer>
    </div>
  );
};
