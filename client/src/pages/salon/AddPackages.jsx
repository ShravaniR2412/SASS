// src/Packages.jsx
import React, { useState } from 'react';
import backgroundImage from '../../assets/imgbg.png';
import { useNavigate } from 'react-router-dom';

const AddPackages = () => {

  const [packageData, setPackageData] = useState([{ id: Date.now(), PackageName: '', cost: '', duration: '', imageUrl: '', description: '', additionalInfo: ''  }]);
  const navigate = useNavigate();

  const [services, setServices] = useState([{ serviceName: '' }]);


  const addForm = () => {
    setPackageData([...packageData, { id: Date.now(), packageName: '', cost: '', duration: '', imageUrl: '', description: '', additionalInfo: '' }]);
  };

  const deleteForm = (index) => {
    if (packageData.length > 1) {
      const updatedForms = packageData.filter((_, formIndex) => formIndex !== index);
      setPackageData(updatedForms);
    }
  };

  const handlePackageChange = (e, index) => {
    const { name, value } = e.target;
    const updatedPackageData = [...packageData];
    updatedPackageData[index][name] = value;
    setPackageData(updatedPackageData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted data:', packageData);
    navigate('/addproducts');  // Redirect to next step
  };

  const addServiceInput = () => {
    setServices([...services, { serviceName: '' }]); // Add a new empty object to the services array
  };

  const removeServiceInput = (index) => {
    const updatedServices = services.filter((_, serviceIndex) => serviceIndex !== index);
    setServices(updatedServices);
  };


  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const updatedServices = [...services];
    updatedServices[index][name] = value;
    setServices(updatedServices);
  };



  

  // const handleNext = () => {
  //   // You may want to add validation and save data here
  //   navigate('/addproducts');
// };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h3 className="text-2xl font-semibold mb-6">3. Add Package</h3>
//       <form>
//         <div className="mb-4">
//           <label htmlFor="packageName" className="block text-lg font-medium mb-2">Package Name</label>
//           <input
//             type="text"
//             id="packageName"
//             name="packageName"
//             value={packageData.packageName}
//             onChange={handlePackageChange}
//             className="block w-full p-2 border border-gray-300 rounded-md"
//             placeholder="Enter package name"
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="packageDescription" className="block text-lg font-medium mb-2">Description</label>
//           <textarea
//             id="packageDescription"
//             name="packageDescription"
//             value={packageData.packageDescription}
//             onChange={handlePackageChange}
//             rows="3"
//             className="block w-full p-2 border border-gray-300 rounded-md"
//             placeholder="Enter package description"
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="packagePrice" className="block text-lg font-medium mb-2">Price</label>
//           <input
//             type="text"
//             id="packagePrice"
//             name="packagePrice"
//             value={packageData.packagePrice}
//             onChange={handlePackageChange}
//             className="block w-full p-2 border border-gray-300 rounded-md"
//             placeholder="Enter package price"
//           />
//         </div>

//         <button
//           type="button"
//           onClick={handleNext}
//           className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700"
//         >
//           Next
//         </button>
//       </form>
//     </div>
//   );
// };

return (
  <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
      <header className="text-center mb-6 w-full p-10 bg-gray-300">
        <h1 className="text-3xl font-bold">Add Packages</h1>
      </header>
      
      <form onSubmit={handleSubmit} className="service-form space-y-4 mb-8 justify-center">
        {packageData.map((form, index) => (
          <div key={form.id}>
            <h1 className="text-center text-1xl mb-8 font-xl">Package {index + 1}</h1>
  

            <div className='flex mt-8'>
              <div className='flex-1 space-y-4 mb-8'>
                <label className="block">
                  <span className="text-gray-700 ml-10 mb-8">Package Name:</span>
                  <input 
                    type="text" 
                    name="PackageName" 
                    value={form.PackageName} 
                    onChange={(e) => handlePackageChange(e, index)}
                    className="mt-1 ml-10 block w-[550px] p-1 border border-gray-300 rounded-md shadow-custom-light hover:shadow-custom-dark" />
                </label>
                <div className='ml-10 mb-4'>
                  <span className="text-gray-700">Services to be added in the package:</span>
                  <button type="button" onClick={addServiceInput} className="submit-btn mt-2  ml-56 border-1 border-teal-500 rounded-full bg-teal-100 text-teal-500  py-0.5 px-2  w-max text-center hover:bg-teal-300 transition-shadow duration-300 active:shadow-lg">
                    +
                  </button>
                  {services.length > 1 &&
                  (
                    <button 
                        type="button" 
                        onClick={() => removeServiceInput(services.length - 1)}
                        className="text-red-500 hover:bg-red-300  ml-2 py-0.5 px-2.5 rounded-full transition-shadow bg-red-100 duration-300 active:shadow-lg"
                      >
                        -  
                    </button>
                  )
                  }
                  
                  {services.map((service, serviceIndex) => (
                    <div key={serviceIndex} className="mt-3">
                      <label className="block">
                        <input
                          type="text"
                          name="serviceName"
                          value={service.serviceName}
                          onChange={(e) => handleServiceChange(e, serviceIndex)}
                          className="mt-1 block w-[550px] p-1 border border-gray-300 rounded-md shadow-custom-light hover:shadow-custom-dark"
                          placeholder={`Service ${serviceIndex + 1}`}
                        />
                      </label>
                    </div>
                  ))}

                  
                  
                </div>

               
                <label className="block">
                  <span className="text-gray-700 ml-10 mb-8">Cost:</span>
                  <input 
                    type="text" 
                    name="cost" 
                    value={form.cost}
                    onChange={(e) => handlePackageChange(e, index)}
                    className="mt-1 ml-10 block w-[550px] p-1 border border-gray-300 rounded-md shadow-custom-light hover:shadow-custom-dark" />
                </label>
                <div className='mx-10'>
                  <label htmlFor={`duration-${index}`} className="block mb-2 text-gray-700">
                    Duration (e.g. 30 minutes, 2 hours):
                  </label>
                  <input
                    type="text"
                    id={`duration-${index}`}
                    name="duration"
                    value={form.duration}
                    onChange={(e) => handlePackageChange(e, index)}
                    placeholder="Enter duration"
                    className="border border-gray-300 rounded-md shadow-custom-light hover:shadow-custom-dark text-gray-900 text-sm focus:ring-teal-500 focus:border-gray-900 block w-full p-2.5"
                  />
                </div> 
              </div>
              <div className="flex-1 w-48 h-[250px] flex flex-col items-center mr-10 relative">
                <div
                  className="w-48 h-48 mt-4 bg-gray-200 rounded-md overflow-hidden relative bg-no-repeat bg-center"
                  style={{ backgroundImage: `url(${backgroundImage})` }}
                >
                  {form.imageUrl && (
                    <img
                      src={form.imageUrl}
                      alt="Service Image"
                      className="object-contain w-full h-full"
                    />
                  )}
                </div>
                <label className="block mt-2">
                  <span className="text-gray-700">Image URL:</span>
                  <input
                    type="text"
                    name="imageUrl"
                    value={form.imageUrl}
                    onChange={(e) => handlePackageChange(e, index)}
                    placeholder="Enter image URL"
                    className="mt-1 block w-full p-1 border border-gray-300 rounded-md shadow-custom-light hover:shadow-custom-dark"
                  />
                </label>
              </div>
            </div>
            <label className="block">
              <span className="text-gray-700 ml-10 mb-10">Description about package:</span>
              <textarea 
                name="description"
                value={form.description}
                onChange={(e) => handlePackageChange(e, index)}
                className="mt-1 ml-10 block w-4/5 p-1 border border-gray-300 rounded-md shadow-custom-light hover:shadow-custom-dark"></textarea>
            </label>
            <label className="block">
              <span className="text-gray-700 ml-10 mb-8">Additional Information:</span>
              <textarea 
                name="additionalInfo"
                value={form.additionalInfo}
                onChange={(e) => handlePackageChange(e, index)}
                className="mt-1 ml-10 block w-4/5 p-2 border border-gray-300 rounded-md shadow-custom-light hover:shadow-custom-dark"></textarea>
            </label>
            <hr className="mt-8 mb-8" />
          </div>
        ))}
        <div className="flex justify-between ml-20 mr-40">
          <button type="button" onClick={addForm} className="submit-btn border-0 text-teal-500 py-2 px-4 rounded-lg w-max text-center hover:bg-teal-50 shadow-md transition-shadow duration-300 active:shadow-lg">
            Add More Packages
          </button>
          {packageData.length > 1 && (
            <button type="button" onClick={() => deleteForm(packageData.length - 1)} className="submit-btn border-0 text-teal-500 py-2 px-4 rounded-lg w-max text-center hover:bg-teal-50 shadow-md transition-shadow duration-300 active:shadow-lg">
              Delete
            </button>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <button type="submit" className="submit-btn bg-teal-500 text-white py-2 px-4 rounded-lg w-max text-center hover:shadow-custom-dark active:bg-gray-200 transition-shadow duration-300 shadow-custom-light">
            SUBMIT
          </button>
        </div>
      </form>
  </div>
);
};


export default AddPackages;

