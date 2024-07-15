import { PhotoIcon } from '@heroicons/react/24/solid';
import { useAccount } from 'wagmi';
import { useState } from 'react';
import { Label, TextInput } from "flowbite-react";
import { RiWallet3Fill } from "react-icons/ri";

export default function TokenizeEstateForm() {
  const { address } = useAccount();
  const [profilePicture, setProfilePicture] = useState(null);
  const [showcasePictures, setShowcasePictures] = useState([]);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
  };

  const handleShowcasePicturesChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length !== 5) {
      alert("Please select exactly 5 files.");
      event.target.value = null; // Clear the input
      return;
    }
    setShowcasePictures(files);
  };

  return (
    <form>
      <div className="space-y-12">
        <div className="text-center mt-32">
          <p className="text-md font-semibold text-gray-900 sm:text-6xl">
            Create Estate Token
          </p>
        </div>
        <div className="border-b border-gray-900/10 pb-12 text-center">
          <h2 className="text-xl font-semibold leading-7 text-red-700 ">Estate Owner's Information</h2>

          <div className="mb-2 block mt-4">
            <Label className='font-semibold text-md' htmlFor="ownerusername" value="Owner's Username" />
          </div>
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-600 ">
            <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">@block.share/</span>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="janesmith"
              autoComplete="username"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="mb-2 block mt-4">
            <Label className='font-semibold text-md' htmlFor="owneraddress" value="Owner's Wallet Address" />
          </div>
          <TextInput id="owneraddress" type="text" icon={RiWallet3Fill} value={address} disabled required />

        </div>

        <div className="border-b border-gray-900/10 pb-12 text-center">
          <h2 className="text-xl font-semibold leading-7 text-red-700 mb-4">Estate's Information</h2>

          <div className="col-span-full">
            <Label className='font-semibold text-md mt-4' htmlFor="aboutestate" value="About this Estate" />
            <div className="mt-2">
              <textarea
                id="about"
                name="about"
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                defaultValue={''}
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600">Tell us what makes this space special.</p>
          </div>

          <div className="mt-10 mb-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 items-center">

            <div className="col-span-full">
              <label htmlFor="country" className="block font-semibold text-md leading-6 text-gray-900">
                Country
              </label>
              <div className="flex flex-col col-span-full mt-2 items-center">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>India</option>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block font-semibold text-md leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  id="street-address"
                  name="street-address"
                  type="text"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block font-semibold text-md leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  name="city"
                  type="text"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block font-semibold text-md leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  id="region"
                  name="region"
                  type="text"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block font-semibold text-md leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  id="postal-code"
                  name="postal-code"
                  type="text"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="col-span-full">
            <Label className='font-semibold text-md mt-4' htmlFor="estate-profile-photo" value="Estate Profile Photo" />
            <p className="text-sm leading-5 text-gray-600">Select a photo that best depicts your estate</p>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-semibold text-red-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-red-500"
                  >
                    <span>Upload a file</span>
                    <input 
                      id="file-upload" 
                      name="file-upload" 
                      type="file" 
                      className="sr-only" 
                      onChange={handleProfilePictureChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
            {profilePicture && (
              <div className="mt-4">
                <img 
                  src={URL.createObjectURL(profilePicture)} 
                  alt="Profile Preview" 
                  className="mx-auto h-48 w-48 rounded-lg object-cover"
                />
              </div>
            )}
          </div>

          <div className="col-span-full mt-4">
            <Label className='font-semibold text-md mt-4' htmlFor="estate-showcase-photo" value="Estate Photo Showcase" />
            <p className="text-sm leading-5 text-gray-600">Select exactly five pictures to be highlighted for this estate</p>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload-multiple"
                    className="relative cursor-pointer rounded-md font-semibold text-red-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-red-500"
                  >
                    <span>Upload files</span>
                    <input
                      id="file-upload-multiple"
                      name="file-upload-multiple"
                      type="file"
                      className="sr-only"
                      multiple
                      onChange={handleShowcasePicturesChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {showcasePictures.length > 0 && showcasePictures.map((file, index) => (
                <img 
                  key={index} 
                  src={URL.createObjectURL(file)} 
                  alt={`Showcase ${index}`} 
                  className="mx-auto h-32 w-32 rounded-lg object-cover"
                />
              ))}
            </div>
          </div>
        </div>

      </div>

      <div className="mt-6 flex items-center justify-center gap-x-6 pb-8">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Tokenize My Estate
        </button>
      </div>
    </form>
  );
}
