import React, { useState, useEffect } from "react";
import { getProducerProfile, updateProducerProfile } from "../api/profiles";

const ProducerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ✅ Load profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getProducerProfile();
        setProfile(data);
      } catch (err) {
        console.error("❌ Erreur chargement profil:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // ✅ Update text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // ✅ Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfile((prev) => ({ ...prev, imageFile: file }));

    // preview
    const reader = new FileReader();
    reader.onload = () =>
      setProfile((prev) => ({ ...prev, imagePreview: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () =>
    setProfile((prev) => ({
      ...prev,
      image: null,
      imageFile: null,
      imagePreview: null,
    }));

  // ✅ Manage categories
  const handleAddCategory = () => {
    if (newCategory && !profile.exportCategories.includes(newCategory)) {
      setProfile({
        ...profile,
        exportCategories: [...profile.exportCategories, newCategory],
      });
      setNewCategory("");
    }
  };

  const handleRemoveCategory = (category) => {
    setProfile({
      ...profile,
      exportCategories: profile.exportCategories.filter((c) => c !== category),
    });
  };

  // ✅ Save profile to backend
  const handleSave = async () => {
    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("companyName", profile.companyName || "");
      formData.append("contactName", profile.contactName || "");
      formData.append("email", profile.email || "");
      formData.append("phone", profile.phone || "");
      formData.append("address", profile.address || "");
      formData.append("description", profile.description || "");
      formData.append("importRequests", profile.importRequests || "");
      formData.append(
        "exportCategories",
        JSON.stringify(profile.exportCategories || [])
      );
      if (profile.imageFile) {
        formData.append("image", profile.imageFile);
      }

      const { data } = await updateProducerProfile(formData);
      setProfile(data);
      alert("✅ Profil mis à jour avec succès !");
    } catch (err) {
      console.error("❌ Erreur sauvegarde profil:", err);
      alert("Erreur lors de l'enregistrement.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (!profile) return <p>Profil introuvable</p>;

  return (
    <div className="space-y-6">
      {/* Profile Info */}
      <div className="bg-image-light-beige rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-image-dark-text mb-6">
          Informations du Profil
        </h2>

        {/* Profile Picture */}
        <div className="mb-6 flex items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border border-image-orange/30 flex-shrink-0">
            {profile.imagePreview || profile.image ? (
              <img
                src={profile.imagePreview || profile.image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-image-orange/20 text-image-dark-text font-bold">
                Photo
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {(profile.image || profile.imagePreview) && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Supprimer la photo
              </button>
            )}
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium">
              Nom de l'entreprise
            </label>
            <input
              type="text"
              name="companyName"
              value={profile.companyName || ""}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Personne à contacter
            </label>
            <input
              type="text"
              name="contactName"
              value={profile.contactName || ""}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email || ""}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Téléphone</label>
            <input
              type="tel"
              name="phone"
              value={profile.phone || ""}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
            />
          </div>
        </div>

        {/* Address */}
        <div className="mb-6">
          <label className="block text-sm font-medium">Adresse</label>
          <input
            type="text"
            name="address"
            value={profile.address || ""}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={profile.description || ""}
            onChange={handleInputChange}
            rows={3}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Import Requests */}
        <div className="mb-6">
          <label className="block text-sm font-medium">
            Écrire mes demandes d'importation
          </label>
          <textarea
            name="importRequests"
            value={profile.importRequests || ""}
            onChange={handleInputChange}
            rows={3}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Export Categories */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Catégories d'exportation
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {profile.exportCategories?.map((c, i) => (
              <span
                key={i}
                className="bg-orange-200 px-3 py-1 rounded-full flex items-center"
              >
                {c}
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(c)}
                  className="ml-2 text-red-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Nouvelle catégorie"
              className="flex-1 p-2 border rounded-lg"
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg"
            >
              Ajouter
            </button>
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
          >
            {saving ? "Enregistrement..." : "Enregistrer les modifications"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProducerProfile;
