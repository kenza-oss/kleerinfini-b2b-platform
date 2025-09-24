// src/pages/ProducerRegister.jsx
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import "../App.css";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Select from 'react-select';
import countryList from 'country-list';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import LocationMarker from '../components/LocationMarker';
import axios from '../api/axios'; 
import {
  FaBuilding,
  FaIndustry,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaFileAlt,
  FaExpand,
  FaCompress,
  FaLock
} from 'react-icons/fa';

// Import background videos
import step1Video from '../assets/video3.mp4';
import step2Video from '../assets/video4.mp4';
import step3Video from '../assets/video5.mp4';
import step4Video from '../assets/video6.mp4';

// Steps (added "Mot de passe" before final)
const steps = ['Entreprise', 'Documents', 'Exportation', 'Mot de passe', 'Finalisation'];
// reuse last video for extra step
const stepVideos = [step1Video, step2Video, step3Video, step4Video, step4Video];

// Password rules regex: at least one lowercase, one uppercase, one digit, min 12
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{12,}$/;

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
  // password fields
  password: yup
    .string()
    .required('Mot de passe requis')
    .matches(PASSWORD_REGEX, 'Le mot de passe doit contenir au moins 12 caractères, une majuscule, une minuscule et un chiffre'),
  confirmPassword: yup
    .string()
    .required('Veuillez confirmer le mot de passe')
    .oneOf([yup.ref('password')], 'Les mots de passe ne correspondent pas'),
  description: yup.string().min(10, 'Trop court').required('Champ requis')
});

const ProducerRegister = () => {
  const [step, setStep] = useState(0);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [certFiles, setCertFiles] = useState([]); // certifications
  const [techFiles, setTechFiles] = useState([]); // technical sheets
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const countryOptions = countryList.getData()
    .map(country => ({ value: country.code, label: country.name }))
    .sort((a, b) => a.label.localeCompare(b.label, 'en', { sensitivity: 'base' }));

  const onSubmit = async (data) => {
    if (!markerPosition) {
      alert("Veuillez sélectionner votre localisation exacte sur la carte.");
      return;
    }

    const formData = new FormData();

    const appendBoth = (camel, snake, value) => {
      if (value === undefined || value === null) return;
      if (typeof value === 'object' && !(value instanceof File)) {
        // if object, append value (for select objects)
        formData.append(camel, JSON.stringify(value));
        formData.append(snake, JSON.stringify(value));
      } else {
        formData.append(camel, value);
        formData.append(snake, value);
      }
    };

    appendBoth('companyName', 'company_name', data.companyName);
    appendBoth('activity', 'activity', data.activity);
    appendBoth('email', 'email', data.email);
    appendBoth('phone', 'phone', data.phone);
    appendBoth('whatsapp', 'whatsapp', data.whatsapp);
    appendBoth('country', 'country', data.country ? data.country.value || data.country : '');
    appendBoth('city', 'city', data.city);
    appendBoth('address1', 'address1', data.address1);
    appendBoth('address2', 'address2', data.address2);
    appendBoth('rcNumber', 'rc_number', data.rcNumber);
    appendBoth('nifNumber', 'nif_number', data.nifNumber);
    appendBoth('minExportQuantity', 'min_export_quantity', data.minExportQuantity);
    appendBoth('monthlyCapacity', 'monthly_capacity', data.monthlyCapacity);
    appendBoth('yearlyCapacity', 'yearly_capacity', data.yearlyCapacity);
    appendBoth('description', 'description', data.description);

    // exportCategories and targetMarkets
    if (data.exportCategories && Array.isArray(data.exportCategories)) {
      formData.append('export_categories', JSON.stringify(data.exportCategories.map(i => i.value || i)));
      data.exportCategories.forEach((opt) => formData.append('export_categories[]', opt.value || opt));
    }
    if (data.targetMarkets && Array.isArray(data.targetMarkets)) {
      formData.append('target_markets', JSON.stringify(data.targetMarkets.map(i => i.value || i)));
      data.targetMarkets.forEach((opt) => formData.append('target_markets[]', opt.value || opt));
    }

    // Coordinates
    formData.append('latitude', markerPosition.lat);
    formData.append('longitude', markerPosition.lng);

    // Password: append password & confirm (backend often expects password; confirm optional)
    formData.append('password', data.password);
    formData.append('password_confirmation', data.confirmPassword);

    // Files
    certFiles.forEach((file, idx) => {
      formData.append('certifications', file);
      formData.append('certifications[]', file);
      formData.append(`certification_${idx}`, file);
    });
    techFiles.forEach((file, idx) => {
      formData.append('tech_sheets', file);
      formData.append('tech_sheets[]', file);
      formData.append(`tech_sheet_${idx}`, file);
    });

    try {
      setSubmitting(true);

      // choose URL based on your axios.baseURL (most projects set baseURL to include '/api/')
      const url = 'register/producer/'; // if baseURL already has '/api/' this will post to /api/register/producer/
      const res = await axios.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log('Inscription réponse serveur:', res);
      alert('Inscription réussie ! Vérifiez votre email ou le panneau admin si nécessaire.');
      // optionally redirect or reset form here
    } catch (err) {
      console.error('Erreur lors de l\'inscription:', err);
      if (err?.response?.data) {
        console.error('Détails erreurs backend:', err.response.data);
        alert('Erreur lors de l\'inscription: ' + JSON.stringify(err.response.data));
      } else {
        alert('Erreur lors de l\'inscription, voir console pour détails.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 0));
  const toggleMapSize = () => setIsMapExpanded(!isMapExpanded);

  const inputStyle = "w-full px-4 py-2 bg-white bg-opacity-70 text-gray-800 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-500";

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="fixed top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-500"
        key={step}
      >
        <source src={stepVideos[step]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 w-full max-w-4xl h-[700px] bg-gray-700 bg-opacity-30 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-700 border-opacity-30">
        <div className="p-4 border-b border-gray-700 border-opacity-30">
          <h2 className="text-2xl font-bold text-white text-center">Inscription Producteur</h2>
          <div className="flex justify-between mt-6">
            {steps.map((label, i) => (
              <div key={i} className="text-center flex-1">
                <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center 
                  ${step === i ? 'bg-blue-500' : 'bg-gray-700'} text-white`}>
                  {i + 1}
                </div>
                <p className={`text-sm mt-2 ${step === i ? 'text-blue-400' : 'text-gray-400'}`}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 overflow-y-scroll h-[calc(100%-120px)]">
          {step === 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2"><FaBuilding className="inline mr-2" />Nom entreprise *</label>
                  <input {...register('companyName')} className={inputStyle} />
                  {errors.companyName && <p className="text-red-400 text-xs mt-1">{errors.companyName.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2"><FaIndustry className="inline mr-2" />Activité principale *</label>
                  <input {...register('activity')} className={inputStyle} />
                  {errors.activity && <p className="text-red-400 text-xs mt-1">{errors.activity.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2"><FaEnvelope className="inline mr-2" />Email *</label>
                  <input type="email" {...register('email')} className={inputStyle} />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2"><FaPhone className="inline mr-2" />Téléphone *</label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <PhoneInput
                        {...field}
                        className="custom-phone-input"
                        international
                      />
                    )}
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2"><FaPhone className="inline mr-2" />WhatsApp *</label>
                  <Controller
                    name="whatsapp"
                    control={control}
                    render={({ field }) => (
                      <PhoneInput
                        {...field}
                        className="custom-phone-input"
                        international
                      />
                    )}
                  />
                  {errors.whatsapp && <p className="text-red-400 text-xs mt-1">{errors.whatsapp.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2"><FaGlobe className="inline mr-2" />Pays *</label>
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={countryOptions}
                        classNamePrefix="react-select"
                        onChange={(val) => field.onChange(val)}
                        value={field.value}
                        styles={{
                          control: (base) => ({
                            ...base,
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            borderColor: '#d1d5db',
                            color: '#1f2937',
                            borderRadius: '0.75rem',
                            boxShadow: 'none'
                          }),
                          singleValue: (base) => ({ ...base, color: '#1f2937' }),
                        }}
                      />
                    )}
                  />
                  {errors.country && <p className="text-red-400 text-xs mt-1">{errors.country.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Wilaya *</label>
                  <input {...register('city')} className={inputStyle} />
                  {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Ville *</label>
                  <input {...register('address1')} className={inputStyle} />
                  {errors.address1 && <p className="text-red-400 text-xs mt-1">{errors.address1.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Adresse *</label>
                  <input {...register('address2')} className={inputStyle} />
                </div>

                <div className={`${isMapExpanded ? 'fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4' : 'col-span-2'}`}>
                  <div className={`relative ${isMapExpanded ? 'w-full h-full max-w-4xl' : 'w-full'}`}>
                    <div className={`${isMapExpanded ? 'h-[80vh]' : 'h-48'} rounded-xl overflow-hidden border border-gray-500 transition-all duration-300`}>
                      <MapContainer 
                        center={[36.75, 3.05]} 
                        zoom={isMapExpanded ? 10 : 6} 
                        style={{ height: "100%", width: "100%" }} 
                        scrollWheelZoom={true}
                      >
                        <TileLayer
                          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker setMarkerPosition={setMarkerPosition} />
                      </MapContainer>
                    </div>
                    <button
                      type="button"
                      onClick={toggleMapSize}
                      className="absolute top-2 right-2 bg-white bg-opacity-80 p-2 rounded-full shadow-md hover:bg-opacity-100 transition"
                    >
                      {isMapExpanded ? <FaCompress /> : <FaExpand />}
                    </button>
                    {markerPosition && (
                      <p className="text-sm text-green-300 mt-2">
                        Localisation sélectionnée: {markerPosition.lat.toFixed(5)}, {markerPosition.lng.toFixed(5)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 - Documents */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">N° RC *</label>
                  <input {...register('rcNumber')} className={inputStyle} />
                  {errors.rcNumber && <p className="text-red-400 text-xs mt-1">{errors.rcNumber.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">N° NIF *</label>
                  <input {...register('nifNumber')} className={inputStyle} />
                  {errors.nifNumber && <p className="text-red-400 text-xs mt-1">{errors.nifNumber.message}</p>}
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <FaFileAlt className="inline mr-2" />Certifications (PDF)
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-700 border-dashed rounded-xl cursor-pointer bg-gray-800 bg-opacity-50 hover:bg-gray-700">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaFileAlt className="text-gray-400 text-2xl mb-2" />
                        <p className="text-sm text-gray-400">Glissez-déposez ou cliquez pour télécharger</p>
                      </div>
                      <input type="file" className="hidden" multiple accept=".pdf" onChange={(e) => setCertFiles(Array.from(e.target.files))} />
                    </label>
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <FaFileAlt className="inline mr-2" />Fiches techniques (PDF)
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-700 border-dashed rounded-xl cursor-pointer bg-gray-800 bg-opacity-50 hover:bg-gray-700">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaFileAlt className="text-gray-400 text-2xl mb-2" />
                        <p className="text-sm text-gray-400">Glissez-déposez ou cliquez pour télécharger</p>
                      </div>
                      <input type="file" className="hidden" multiple accept=".pdf" onChange={(e) => setTechFiles(Array.from(e.target.files))} />
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
                  <label className="block text-sm font-medium text-gray-300 mb-2">Quantité minimale *</label>
                  <input {...register('minExportQuantity')} className={inputStyle} />
                  {errors.minExportQuantity && <p className="text-red-400 text-xs mt-1">{errors.minExportQuantity.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Capacité mensuelle *</label>
                  <input {...register('monthlyCapacity')} className={inputStyle} />
                  {errors.monthlyCapacity && <p className="text-red-400 text-xs mt-1">{errors.monthlyCapacity.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Capacité annuelle *</label>
                  <input {...register('yearlyCapacity')} className={inputStyle} />
                  {errors.yearlyCapacity && <p className="text-red-400 text-xs mt-1">{errors.yearlyCapacity.message}</p>}
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Marchés cibles</label>
                  <Controller
                    name="targetMarkets"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isMulti
                        options={[
                          { value: 'Afrique', label: 'Afrique' },
                          { value: 'Europe', label: 'Europe' },
                          { value: 'Amérique du Nord', label: 'Amérique du Nord' },
                          { value: 'Amérique du Sud', label: 'Amérique du Sud' },
                          { value: 'Asie', label: 'Asie' },
                          { value: 'Moyen-Orient', label: 'Moyen-Orient' }
                        ]}
                        onChange={(val) => field.onChange(val)}
                        value={field.value}
                      />
                    )}
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Catégories exportables *</label>
                  <Controller
                    name="exportCategories"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isMulti
                        options={[
                          { value: 'Alimentaire', label: 'Produits Alimentaires' },
                          { value: 'Textile', label: 'Textiles' },
                          { value: 'Artisanat', label: 'Artisanat' },
                          { value: 'Cosmétiques', label: 'Cosmétiques Naturels' },
                          { value: 'Technologie', label: 'Technologie' },
                          { value: 'Agriculture', label: 'Produits Agricoles' }
                        ]}
                        onChange={(val) => field.onChange(val)}
                        value={field.value}
                      />
                    )}
                  />
                  {errors.exportCategories && (
                    <p className="text-red-400 text-xs mt-1">{errors.exportCategories.message}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4 - Password */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2"><FaLock className="inline mr-2" />Mot de passe *</label>
                  <input type="password" {...register('password')} className={inputStyle} />
                  {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
                  <p className="text-xs text-gray-300 mt-1">Minimum 12 caractères, avec au moins une majuscule, une minuscule et un chiffre.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2"><FaLock className="inline mr-2" />Confirmer mot de passe *</label>
                  <input type="password" {...register('confirmPassword')} className={inputStyle} />
                  {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 5 - Final */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                <textarea rows={6} {...register('description')} className={inputStyle} placeholder="Décrivez votre entreprise, produits, marché visé..." />
                {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 0 && (
              <button type="button" onClick={handlePrev} className="px-6 py-2 bg-gray-700 bg-opacity-70 text-gray-300 rounded-xl hover:bg-gray-600 transition">Précédent</button>
            )}

            {step < steps.length - 1 ? (
              <button type="button" onClick={handleNext} className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">Suivant</button>
            ) : (
              <button type="submit" disabled={submitting} className="ml-auto px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition">
                {submitting ? 'Envoi...' : 'Envoyer'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProducerRegister;
