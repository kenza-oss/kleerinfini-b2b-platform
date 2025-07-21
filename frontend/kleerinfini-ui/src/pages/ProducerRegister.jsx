import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import "../App.css";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Select from 'react-select';
import countryList from 'country-list';
import {
  FaBuilding,
  FaIndustry,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaFileAlt,
  FaLanguage,
  FaLink
} from 'react-icons/fa';
import backgroundVideo from '../assets/video2.mp4';

const steps = ['Entreprise', 'Documents', 'Exportation', 'Finalisation'];

const schema = yup.object().shape({
  companyName: yup.string().required('Champ requis'),
  activity: yup.string().required('Champ requis'),
  email: yup.string().email('Email invalide').required('Champ requis'),
  phone: yup.string().required('Champ requis'),
  whatsapp: yup.string().required('Champ requis'),
  country: yup.object().required('Champ requis'),
  city: yup.string().required('Champ requis'),
  address1: yup.string().required('Champ requis'),
  address2: yup.string(),
  rcNumber: yup.string().required('Champ requis'),
  nifNumber: yup.string().required('Champ requis'),
  minExportQuantity: yup.string().required('Champ requis'),
  monthlyCapacity: yup.string().required('Champ requis'),
  yearlyCapacity: yup.string().required('Champ requis'),
  exportCategories: yup.array().min(1, 'Sélectionnez au moins une catégorie'),
  description: yup.string().min(10, 'Trop court').required('Champ requis')
});

const ProducerRegister = () => {
  const [step, setStep] = useState(0);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const countryOptions = countryList.getData()
    .map(country => ({
      value: country.code,
      label: country.name
    }))
    .sort((a, b) => a.label.localeCompare(b.label, 'en', { sensitivity: 'base' }));

  const onSubmit = (data) => {
    console.log(data);
    alert('Formulaire soumis!');
  };

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  // Glassmorphism input style
  const inputStyle = "w-full px-4 py-2 bg-white bg-opacity-70 text-gray-800 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-500";


  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      
      {/* Glassmorphism Form Container */}
      <div className="relative z-10 w-full max-w-4xl h-[700px] bg-gray-700 bg-opacity-30 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-700 border-opacity-30">

        
        {/* Form Header */}
        <div className="p-4 border-b border-gray-700 border-opacity-30">
          <h2 className="text-2xl font-bold text-white text-center">Inscription Producteur</h2>
          <div className="flex justify-between mt-6">
            {steps.map((label, i) => (
              <div key={i} className="text-center flex-1">
                <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center 
                  ${step === i ? 'bg-blue-500' : 'bg-gray-700'} text-white`}>
                  {i + 1}
                </div>
                <p className={`text-sm mt-2 ${step === i ? 'text-blue-400' : 'text-gray-400'}`}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
          {/* Step 1 - Company Info */}
          {step === 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Company Info */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <FaBuilding className="inline mr-2" />
                    Nom entreprise *
                  </label>
                  <input
                    {...register('companyName')}
                    className={inputStyle}
                  />
                  {errors.companyName && <p className="text-red-400 text-xs mt-1">{errors.companyName.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <FaIndustry className="inline mr-2" />
                    Activité principale *
                  </label>
                  <input
                    {...register('activity')}
                    className={inputStyle}
                  />
                  {errors.activity && <p className="text-red-400 text-xs mt-1">{errors.activity.message}</p>}
                </div>

                {/* Contact Info */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <FaEnvelope className="inline mr-2" />
                    Email *
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    className={inputStyle}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <FaPhone className="inline mr-2" />
                    Téléphone *
                  </label>
                  <PhoneInput
                    {...register('phone')}
                    className="custom-phone-input"
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <FaPhone className="inline mr-2" />
                    WhatsApp *
                  </label>
                  <PhoneInput
                    {...register('whatsapp')}
                    className="custom-phone-input"
                  />
                  {errors.whatsapp && <p className="text-red-400 text-xs mt-1">{errors.whatsapp.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <FaGlobe className="inline mr-2" />
                    Pays *
                  </label>
                  <Select
                    options={countryOptions}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    styles={{
  control: (base) => ({
    ...base,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderColor: '#d1d5db', // Tailwind border-gray-300
    color: '#1f2937',        // Tailwind text-gray-800
    borderRadius: '0.75rem',
    boxShadow: 'none',
    padding: '2px 4px'
  }),
  singleValue: (base) => ({
    ...base,
    color: '#1f2937' // dark text
  }),
  input: (base) => ({
    ...base,
    color: '#1f2937'
  }),
  placeholder: (base) => ({
    ...base,
    color: '#6b7280' // Tailwind placeholder-gray-500
  }),
}}

                  />
                  {errors.country && <p className="text-red-400 text-xs mt-1">{errors.country.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Ville *
                  </label>
                  <input
                    {...register('city')}
                    className={inputStyle}
                  />
                  {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Adresse ligne 1 *
                  </label>
                  <input
                    {...register('address1')}
                    className={inputStyle}
                  />
                  {errors.address1 && <p className="text-red-400 text-xs mt-1">{errors.address1.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Adresse ligne 2
                  </label>
                  <input
                    {...register('address2')}
                    className={inputStyle}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2 - Documents */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    N° RC *
                  </label>
                  <input
                    {...register('rcNumber')}
                    className={inputStyle}
                  />
                  {errors.rcNumber && <p className="text-red-400 text-xs mt-1">{errors.rcNumber.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    N° NIF *
                  </label>
                  <input
                    {...register('nifNumber')}
                    className={inputStyle}
                  />
                  {errors.nifNumber && <p className="text-red-400 text-xs mt-1">{errors.nifNumber.message}</p>}
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <FaFileAlt className="inline mr-2" />
                    Certifications (PDF)
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-700 border-dashed rounded-xl cursor-pointer bg-gray-800 bg-opacity-50 hover:bg-gray-700">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaFileAlt className="text-gray-400 text-2xl mb-2" />
                        <p className="text-sm text-gray-400">Glissez-déposez ou cliquez pour télécharger</p>
                      </div>
                      <input type="file" className="hidden" multiple accept=".pdf" />
                    </label>
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <FaFileAlt className="inline mr-2" />
                    Fiches techniques (PDF)
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-700 border-dashed rounded-xl cursor-pointer bg-gray-800 bg-opacity-50 hover:bg-gray-700">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaFileAlt className="text-gray-400 text-2xl mb-2" />
                        <p className="text-sm text-gray-400">Glissez-déposez ou cliquez pour télécharger</p>
                      </div>
                      <input type="file" className="hidden" multiple accept=".pdf" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 - Export */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Quantité minimale *
                  </label>
                  <input
                    {...register('minExportQuantity')}
                    className={inputStyle}
                  />
                  {errors.minExportQuantity && <p className="text-red-400 text-xs mt-1">{errors.minExportQuantity.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Capacité mensuelle *
                  </label>
                  <input
                    {...register('monthlyCapacity')}
                    className={inputStyle}
                  />
                  {errors.monthlyCapacity && <p className="text-red-400 text-xs mt-1">{errors.monthlyCapacity.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Capacité annuelle *
                  </label>
                  <input
                    {...register('yearlyCapacity')}
                    className={inputStyle}
                  />
                  {errors.yearlyCapacity && <p className="text-red-400 text-xs mt-1">{errors.yearlyCapacity.message}</p>}
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Marchés cibles
                  </label>
                  <select
                    multiple
                    className={inputStyle}
                  >
                    <option value="Afrique">Afrique</option>
                    <option value="Europe">Europe</option>
                    <option value="Amérique du Nord">Amérique du Nord</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Catégories exportables *
                  </label>
                  <select
                    multiple
                    {...register('exportCategories')}
                    className={inputStyle}
                  >
                    <option value="Alimentaire">Produits Alimentaires</option>
                    <option value="Textile">Textiles</option>
                    <option value="Artisanat">Artisanat</option>
                  </select>
                  {errors.exportCategories && <p className="text-red-400 text-xs mt-1">{errors.exportCategories.message}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 4 - Final */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  rows={6}
                  {...register('description')}
                  className={inputStyle}
                  placeholder="Décrivez votre entreprise, produits, marché visé..."
                />
                {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className="px-6 py-2 bg-gray-700 bg-opacity-70 text-gray-300 rounded-xl hover:bg-gray-600 transition"
              >
                Précédent
              </button>
            )}
            
            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
              >
                Suivant
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
              >
                Envoyer
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProducerRegister;