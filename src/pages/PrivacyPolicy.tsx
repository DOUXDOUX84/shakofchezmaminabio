const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Politique de Confidentialité</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Utilisation des Cookies</h2>
        <p className="mb-4">
          Notre site utilise différents types de cookies pour améliorer votre expérience :
        </p>
        
        <h3 className="text-xl font-semibold mb-2">Cookies Essentiels</h3>
        <p className="mb-4">
          Ces cookies sont nécessaires au fonctionnement du site. Ils permettent la navigation
          et l'utilisation des fonctionnalités de base comme le panier d'achat et
          l'authentification. Le site ne peut pas fonctionner correctement sans ces cookies.
        </p>
        
        <h3 className="text-xl font-semibold mb-2">Cookies Analytiques</h3>
        <p className="mb-4">
          Ces cookies nous permettent d'analyser l'utilisation du site pour en améliorer
          les performances et les fonctionnalités. Toutes les informations collectées
          sont anonymes et nous aident à comprendre comment les visiteurs utilisent notre site.
        </p>
        
        <h3 className="text-xl font-semibold mb-2">Cookies Marketing</h3>
        <p className="mb-4">
          Ces cookies sont utilisés pour suivre les visiteurs sur les sites web. L'intention
          est d'afficher des publicités pertinentes et engageantes pour l'utilisateur.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Gestion des Cookies</h2>
        <p className="mb-4">
          Vous pouvez à tout moment modifier vos préférences en matière de cookies
          en cliquant sur le bouton "Paramètres des cookies" en bas de page.
          Vous pouvez choisir d'accepter ou de refuser les cookies non essentiels.
        </p>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        <p>
          Pour toute question concernant notre politique en matière de cookies et
          vos choix, n'hésitez pas à nous contacter.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;