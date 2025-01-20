import { JSX } from "react";
import Image from "next/image";
import { Separator } from "./ui/separator";

export const LeftColumn = ({}: {}): JSX.Element => {
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
        <p className="mx-3">HOME</p>
        <p className="mx-3">CALENDAR</p>
        <p className="mx-3">NEWS</p>
        <p className="mx-3">ABOUT</p>
        <p className="mx-3">CONTACT</p>
      </div>

      <Separator className="my-4 bg-black" />

      <div className="mb-4 flex flex-row">
        <span className="block font-bold mr-4">ZONES:</span>
        <ul className="flex space-x-4">
          <li className="cursor-pointer">BRUXELLES</li>
          <li className="cursor-pointer">ANVERS</li>
          <li className="cursor-pointer">MONS</li>
        </ul>
      </div>

      <Separator className="my-4 bg-black" />

      <div className="flex items-center justify-between mx-3">
        <span>👤 YUNG-PICASSO</span>
        <div className="flex items-center space-x-2">
          <button className="text-blue-500">DÉCONNEXION</button>
          <button className="text-gray-500">⚙️</button>
        </div>
      </div>

      <div className="mb-4">
        <span className="block font-bold mb-2">MES SÉANCES</span>
        <table className="table-auto w-full text-sm">
          <tbody>
            <tr>
              <td>AMORES PERROS</td>
              <td>13.01 - 19:00</td>
              <td>RICTS</td>
            </tr>
            <tr>
              <td>ALL SHALL BE WELL</td>
              <td>15.01 - 21:00</td>
              <td>GALERIES</td>
            </tr>
            <tr>
              <td>RED ROAD</td>
              <td>15.01 - 17:00</td>
              <td>FLAGEY</td>
            </tr>
          </tbody>
        </table>
      </div>

      <footer className="text-xs text-gray-500 mt-auto">
        <p>
          Website Developed By Noah Diderich & Philippe De Meulemeester ©
          SHORTNEWSABOUTFILMS Copyright - 2024
        </p>
      </footer>
    </div>
  );
};
