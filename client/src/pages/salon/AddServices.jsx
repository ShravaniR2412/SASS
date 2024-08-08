import React, { useState } from 'react';

const App = () => {
  const [forms, setForms] = useState([{ id: Date.now(), image: null }]);
  const [error, setError] = useState(null);

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

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <header className="text-center mb-6 w-full p-10 bg-gray-300">
        <h1 className="text-3xl font-bold">Add Your Services!</h1>
      </header>
      

      {forms.map((form, index) => (
        <form key={form.id} className="service-form space-y-4 mb-8">
          <h1 className="text-center text-1xl mb-4">Select the category</h1>
          <div className="flex justify-center mb-6">
            <button className="category-btn border-2 border-teal-500 text-teal-500 py-2 px-4 rounded-lg mx-1 hover:bg-teal-700">HAIR</button>
            <button className="category-btn border-2 border-teal-500 text-teal-500 py-2 px-4 rounded-lg mx-1 hover:bg-teal-700">SKIN</button>
            <button className="category-btn border-2 border-teal-500 text-teal-500 py-2 px-4 rounded-lg mx-1 hover:bg-teal-700">MAKEUP</button>
            <button className="category-btn border-2 border-teal-500 text-teal-500 py-2 px-4 rounded-lg mx-1 hover:bg-teal-700">OTHER</button>
          </div>
          <div className='flex '>
            <div className='flex-2 space-y-4'>
              <label className="block">
                <span className="text-gray-700 ml-20 mb-8">Name of service:</span>
                <input type="text" name="serviceName" className="mt-1 ml-20 block w-[500px] p-1 border border-gray-300 rounded-md" />
              </label>
              <label className="block">
                <span className="text-gray-700 ml-20 mb-8">Cost:</span>
                <input type="text" name="cost" className="mt-1 ml-20 block w-[500px] p-1 border border-gray-300 rounded-md" />
              </label>
              <label className="block">
                <span className="text-gray-700 ml-20 mb-8">Duration:</span>
                <input type="text" name="duration" className="mt-1 ml-20 block w-[500px] p-1 border border-gray-300 rounded-md" />
              </label>  
            </div>
            <div className="flex-1 w-48 flex flex-col items-center mt-12 mr-16 ">
               {form.image && (
                <div className="w-36 h-36 bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={form.image}
                    alt="Uploaded Preview"
                    className="object-contain w-full h-full"
                  />
                </div>
              )}
              <label className="block">
              <span className="text-gray-700 mb-3">Upload Image:</span>
              <div className="relative">
                  <input 
                    type="file" 
                    name="image" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                    onChange={(event) => handleImageChange(index, event)} 
                  />
                  <div className="bg-teal-500 text-white text-center py-2 px-4 rounded-lg cursor-pointer mr-10">
                    Choose File
                  </div>
                </div>
              </label>
              {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
            </div>
          </div>
          <label className="block">
            <span className="text-gray-700 ml-20 mb-8">Description about service:</span>
            <textarea name="description" className="mt-1 ml-20 block w-4/5 p-1 border border-gray-300 rounded-md"></textarea>
          </label>
          <label className="block">
            <span className="text-gray-700 ml-20 mb-8">Additional Information:</span>
            <textarea name="additionalInfo" className="mt-1 ml-20 block w-4/5 p-2 border border-gray-300 rounded-md"></textarea>
          </label>
        </form>
      ))}

      <div className="flex justify-center">
        <button type="button" onClick={addForm} className="submit-btn border-2 border-teal-500 text-teal-500 py-2 px-4 rounded-lg w-max text-center">
          Add More Products
        </button>
      </div>
      <div className="flex justify-center mt-20">
        <button type="submit" className="submit-btn bg-teal-500 text-white py-2 px-4 rounded-lg w-max text-center">
          SUBMIT
        </button>
      </div>
    </div>
  );
 }


export default App;

// // src/Services.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AddServices = () => {
//   const [serviceData, setServiceData] = useState({
//     serviceName: '',
//     serviceDescription: '',
//     servicePrice: ''
//   });
//   const navigate = useNavigate();

//   const handleServiceChange = (e) => {
//     const { name, value } = e.target;
//     setServiceData({
//       ...serviceData,
//       [name]: value
//     });
//   };

//   const handleNext = () => {
//     // You may want to add validation and save data here
//     navigate('/addpackages');
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h3 className="text-2xl font-semibold mb-6">2. Add Your Service</h3>
//       <form>
//         <div className="mb-4">
//           <label htmlFor="serviceName" className="block text-lg font-medium mb-2">Service Name</label>
//           <input
//             type="text"
//             id="serviceName"
//             name="serviceName"
//             value={serviceData.serviceName}
//             onChange={handleServiceChange}
//             className="block w-full p-2 border border-gray-300 rounded-md"
//             placeholder="Enter service name"
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="serviceDescription" className="block text-lg font-medium mb-2">Description</label>
//           <textarea
//             id="serviceDescription"
//             name="serviceDescription"
//             value={serviceData.serviceDescription}
//             onChange={handleServiceChange}
//             rows="3"
//             className="block w-full p-2 border border-gray-300 rounded-md"
//             placeholder="Enter service description"
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="servicePrice" className="block text-lg font-medium mb-2">Price</label>
//           <input
//             type="text"
//             id="servicePrice"
//             name="servicePrice"
//             value={serviceData.servicePrice}
//             onChange={handleServiceChange}
//             className="block w-full p-2 border border-gray-300 rounded-md"
//             placeholder="Enter service price"
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

// export default AddServices;
