import React, { useEffect, useState } from "react";
import axios from "axios";
import valorisationImg from "../../assets/valorisation.jpg";


export default function ProgrammesExport() {
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filtres
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [organisme, setOrganisme] = useState("");
  const [marche, setMarche] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/programmes")
      .then((res) => {
        setProgrammes(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const placeholders = [
    { nom: "", organisme: "", description: "", conditions: "", duree: "", marche: "", lien: "" },
    { nom: "", organisme: "", description: "", conditions: "", duree: "", marche: "", lien: "" },
    { nom: "", organisme: "", description: "", conditions: "", duree: "", marche: "", lien: "" },
    { nom: "", organisme: "", description: "", conditions: "", duree: "", marche: "", lien: "" },
  ];

  const dataToShow = loading || programmes.length === 0 ? placeholders : programmes;

  const filtered = dataToShow.filter((p) => {
    return (
      (search === "" ||
        [p.nom, p.organisme, p.marche]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(search.toLowerCase()))) &&
      (type === "" || (p.type && p.type.toLowerCase().includes(type.toLowerCase()))) &&
      (organisme === "" || (p.organisme && p.organisme.toLowerCase().includes(organisme.toLowerCase()))) &&
      (marche === "" || (p.marche && p.marche.toLowerCase().includes(marche.toLowerCase())))
    );
  });

  return (
    <div className="p-6">
      {/* 🔹 Section avec background */}
      <div
        className="rounded-xl p-10 mb-10 text-center text-white"
        style={{
          backgroundImage: `url(${valorisationImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-3xl font-bold mb-4 drop-shadow-lg">
          Programmes de valorisation et facilités des exportations
        </h1>
        <p className="text-lg max-w-3xl mx-auto drop-shadow-md">
          Cette page liste toutes les aides, directives et facilités officielles
          disponibles pour les exportateurs algériens.
        </p>
      </div>

      {/* 🔹 Barre de recherche + filtres */}
      <div className="bg-[#f8f6f1] p-4 rounded-xl shadow-md mb-16 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Rechercher un programme..."
          className="border rounded-lg p-2 flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border rounded-lg p-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Type de programme</option>
          <option value="subvention">Subvention</option>
          <option value="formation">Formation</option>
          <option value="douane">Assistance douanière</option>
        </select>
        <select
          className="border rounded-lg p-2"
          value={organisme}
          onChange={(e) => setOrganisme(e.target.value)}
        >
          <option value="">Organisme</option>
          <option value="ministère du commerce">Ministère du Commerce</option>
          <option value="chambre de commerce">Chambre de Commerce</option>
        </select>
        <select
          className="border rounded-lg p-2"
          value={marche}
          onChange={(e) => setMarche(e.target.value)}
        >
          <option value="">Marché ciblé</option>
          <option value="europe">Europe</option>
          <option value="afrique">Afrique</option>
          <option value="moyen-orient">Moyen-Orient</option>
        </select>
      </div>

      {/* Liste des programmes */}
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((p, idx) => (
          <div
            key={idx}
            className="bg-beige-100 border-l-4 border-orange-400 rounded-xl shadow-md p-5 hover:shadow-lg transition"
            style={{ backgroundColor: "#f8f6f1" }}
          >
            <h2 className="text-lg font-semibold text-orange-600 mb-2">
              {p.nom || "Nom du programme"}
            </h2>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Organisme : </strong> {p.organisme || "—"}
            </p>
            <p className="text-gray-800 mb-2">
              {p.description || "Description du programme"}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Conditions : </strong> {p.conditions || "—"}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Durée : </strong> {p.duree || "—"}
            </p>
            <p className="text-sm text-gray-700 mb-3">
              <strong>Marchés : </strong> {p.marche || "—"}
            </p>
            <span className="text-orange-500 font-medium block">
              🔗 Lien officiel / Contact
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
