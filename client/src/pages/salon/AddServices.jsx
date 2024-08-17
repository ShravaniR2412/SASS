import React, { useState } from 'react';
import backgroundImage from '../../assets/imgbg.png';

const AddServices = () => {
  const [forms, setForms] = useState([{ id: Date.now(), image: null }]);
  const [error, setError] = useState(null);
  const [duration, setDuration] = useState(''); 

  const handleChange = (event) => {
    setDuration(event.target.value);
  };
  
  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    const maxSizeInMB = 2; // Set the maximum file size limit in MB
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024; // Convert MB to Bytes

    if (file) {
      if (file.size > maxSizeInBytes) {
        setError(`File size should not exceed ${maxSizeInMB}MB.`);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedForms = [...forms];
        updatedForms[index].image = reader.result;
        setForms(updatedForms);
        setError(null);
      };
      reader.readAsDataURL(file);
    } else {
      const updatedForms = [...forms];
      updatedForms[index].image = null;
      setForms(updatedForms);
    }
  };

  const addForm = () => {
    setForms([...forms, { id: Date.now(), image: null }]);
  };

  const deleteForm = (index) => {
    if (forms.length > 1) {
      const updatedForms = forms.filter((_, formIndex) => formIndex !== index);
      setForms(updatedForms);
    }
  };

  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
      <header className="text-center mb-6 w-full p-10 bg-gray-300">
        <h1 className="text-3xl font-bold">Unleash your potential—list your services here.</h1>
      </header>

      {forms.map((form, index) => (
        <form key={form.id} className="service-form space-y-4 mb-8 justify-center">
          <h1 className="text-center text-1xl mb-8 font-xl">Select the category</h1>
          <div className="flex justify-center">
            <button type="button" className="category-btn border-1 border-teal-500 text-teal-500 py-2 px-4 mr-16 rounded-lg mx-1 hover:bg-teal-600 hover:text-white shadow-custom-light active:bg-teal-500 transition-shadow duration-300 active:text-white">HAIR</button>
            <button type="button" className="category-btn border-1 border-teal-500 text-teal-500 py-2 px-4 mr-16 rounded-lg mx-1 hover:bg-teal-600 hover:text-white shadow-custom-light active:bg-teal-500 transition-shadow duration-300 active:text-white">SKIN</button>
            <button type="button" className="category-btn border-1 border-teal-500 text-teal-500 py-2 px-4 mr-16 rounded-lg mx-1 hover:bg-teal-600 hover:text-white shadow-custom-light active:bg-teal-500 transition-shadow duration-300 active:text-white">MAKEUP</button>
            <button type="button" className="category-btn border-1 border-teal-500 text-teal-500 py-2 px-4 mr-16 rounded-lg mx-1 hover:bg-teal-600 hover:text-white shadow-custom-light active:bg-teal-500 transition-shadow duration-300 active:text-white">OTHER</button>
          </div> 
          <div className='flex mt-8'>
            <div className='flex-1 space-y-4'>
              <label className="block">
                <span className="text-gray-700 ml-20 mb-8">Name of service:</span>
                <input type="text" name="serviceName" className="mt-1 ml-20 block w-[650px] p-1 border border-gray-300 rounded-md shadow-custom-light hover:shadow-custom-dark" />
              </label>
              <label className="block">
                <span className="text-gray-700 ml-20 mb-8">Cost:</span>
                <input type="text" name="cost" className="mt-1 ml-20 block w-[650px] p-1 border border-gray-300 rounded-md shadow-custom-light hover:shadow-custom-dark" />
              </label>
              <div className='mx-20'>
                <label htmlFor="duration" className="block mb-2 text-gray-700">
                  Duration:
                </label>
                <select
                  id="duration"
                  value={duration}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md shadow-custom-light hover:shadow-custom-dark text-gray-900 text-sm focus:ring-teal-500 focus:border-gray-900 block w-full p-2.5">
                  <option value="" className='text-gray-500'>Select a duration</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="90">1 hour 30 minutes</option>
                  <option value="120">2 hours</option>
                  <option value="180">3 hours</option>
                  <option value="other">OTHER</option>
                </select>
              </div> 
            </div>
            <div className="flex-1 w-48 h-[250px] flex flex-col items-center mr-16 relative">
              <div
                className="w-48 h-48 mt-4 bg-gray-200 rounded-md overflow-hidden relative bg-no-repeat bg-center"
                style={{ backgroundImage: `url(${backgroundImage})` }}
              >
                {form.image && (
                  <img
                    src={form.image}
                    alt="Uploaded Preview"
                    className="object-contain w-full h-full"
                  />
                )}
              </div>
              <label className="block mt-2">
                <div className="relative">
                  <input
                    type="file"
                    name="image"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(event) => handleImageChange(index, event)}
                  />
                  <button type="button" className="bg-teal-500 text-white text-center py-2 px-4 rounded-lg cursor-pointer my-2 shadow-custom-light hover:shadow-custom-dark active:bg-gray-200 transition-shadow duration-300">
                    Upload Image
                  </button>
                </div>
              </label>
              {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
            </div>
          </div>
          <label className="block">
            <span className="text-gray-700 ml-20 mb-8">Description about service:</span>
            <textarea name="description" className="mt-1 ml-20 block w-4/5 p-1 border border-gray-300 rounded-md shadow-custom-light hover:shadow-custom-dark"></textarea>
          </label>
          <label className="block">
            <span className="text-gray-700 ml-20 mb-8">Additional Information:</span>
            <textarea name="additionalInfo" className="mt-1 ml-20 block w-4/5 p-2 border border-gray-300 rounded-md shadow-custom-light hover:shadow-custom-dark"></textarea>
          </label>
        </form>
      ))}
      <div className="flex justify-between ml-20 mr-40">
        <button type="button" onClick={addForm} className="submit-btn border-0 text-teal-500 py-2 px-4 rounded-lg w-max text-center hover:bg-teal-50 shadow-md transition-shadow duration-300 active:shadow-lg">
          Add More Services
        </button>
        {forms.length > 1 && (
          <button type="button" onClick={() => deleteForm(forms.length - 1)} className="submit-btn border-0 text-teal-500 py-2 px-4 rounded-lg w-max text-center hover:bg-teal-50 shadow-md transition-shadow duration-300 active:shadow-lg">
            Delete
          </button>
        )}
      </div>
      <div className="flex justify-center mt-4">
        <button type="submit" className="submit-btn bg-teal-500 text-white py-2 px-4 rounded-lg w-max text-center hover:shadow-custom-dark active:bg-gray-200 transition-shadow duration-300 shadow-custom-light">
          SUBMIT
        </button>
      </div>
    </div>
  );
}

export default AddServices;
