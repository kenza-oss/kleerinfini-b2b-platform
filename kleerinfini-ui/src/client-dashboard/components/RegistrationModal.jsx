import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  FaUser, FaEnvelope, FaLock, FaBuilding,
  FaPhone, FaGlobe, FaLanguage, FaIndustry, FaLink
} from "react-icons/fa";
import backgroundVideo from "../../assets/video2.mp4";
import "../../App.css";
import { useTranslation } from "react-i18next";

const schema = yup.object().shape({
  nom: yup.string().required("form.nomRequired"),
  prenom: yup.string().required("form.prenomRequired"),
  email: yup.string().email("form.invalidEmail").required("form.emailRequired"),
  password: yup.string().min(6).required("form.passwordRequired"),
  societe: yup.string().required("form.societeRequired"),
  telephone: yup.string().required("form.telephoneRequired"),
  pays: yup.string().required("form.paysRequired"),
  secteur: yup.string().required("form.secteurRequired"),
  langue: yup.string().required("form.langueRequired"),
  siteweb: yup.string().url("form.invalidURL").notRequired(),
});

export default function RegistrationModal() {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("✅ Données envoyées :", data);
    alert(t("form.success"));
  };

  return (
    <div className="registration-container">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="background-video fixed"
      >
        <source src={backgroundVideo} type="video/mp4" />
        {t("form.noVideoSupport")}
      </video>

      <div className="form-wrapper">
        <h2 className="form-title">{t("form.registerTitle")}</h2>
        <p className="form-subtitle">
          {t("form.registerSubtitle")}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="registration-form">
          <Input icon={<FaUser />} label={t("form.nom")} name="nom" register={register} error={errors.nom} required />
          <Input icon={<FaUser />} label={t("form.prenom")} name="prenom" register={register} error={errors.prenom} required />
          <Input icon={<FaEnvelope />} label={t("form.email")} name="email" register={register} error={errors.email} type="email" required />
          <Input icon={<FaLock />} label={t("form.password")} name="password" register={register} error={errors.password} type="password" required />
          <Input icon={<FaPhone />} label={t("form.telephone")} name="telephone" register={register} error={errors.telephone} required />
          <Input icon={<FaBuilding />} label={t("form.societe")} name="societe" register={register} error={errors.societe} required />
          <Input icon={<FaGlobe />} label={t("form.pays")} name="pays" register={register} error={errors.pays} required />
          <Input icon={<FaIndustry />} label={t("form.secteur")} name="secteur" register={register} error={errors.secteur} required />

          <div className="form-group">
            <label className="form-label">
              <FaLanguage className="icon" /> {t("form.langue")} <span style={{ color: 'red' }}>*</span>
            </label>
            <select {...register("langue")} className="form-input">
              <option value="">-- {t("form.choose")} --</option>
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
            <p className="form-error">{t(errors.langue?.message)}</p>
          </div>

          <Input icon={<FaLink />} label={t("form.siteweb")} name="siteweb" register={register} error={errors.siteweb} />

          <button type="submit" className="submit-button">
            {t("form.submit")}
          </button>
        </form>
      </div>
    </div>
  );
}

function Input({ icon, label, name, register, error, type = "text", required = false }) {
  const { t } = useTranslation();
  return (
    <div className="form-group">
      <label className="form-label">
        {icon} {label} {required && <span style={{ color: 'red' }}>*</span>}
      </label>
      <input
        type={type}
        {...register(name)}
        className="form-input"
      />
      <p className="form-error">{t(error?.message)}</p>
    </div>
  );
}