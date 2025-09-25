// Dummy API simulation 

export async function getProducerById(id) {

  await new Promise((r) => setTimeout(r, 300));

  return {
    id,
    name: "Producteur A",
    description: "Description complète du producteur ici.",
    country: "Algérie",
    address: "Zone industrielle, Alger",
    gallery: [
      "/images/placeholder.png",
      "/images/placeholder.png",
      "/images/placeholder.png"
    ],
    certifications: ["ISO 9001", "HALAL", "BIO"],
    products: [
      {
        id: 1,
        title: "Titre",
        image: "/images/placeholder.png",
        description: "description "
      },
      {
        id: 2,
        title: "Titre 2",
        image: "/images/placeholder.png",
        description: "description"
      }
    ]
  };
}
