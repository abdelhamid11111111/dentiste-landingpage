import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className="fr-footer" id="contact">
        <div className="fr-footer-grid">
          <div>
            <div className="fr-footer-brand">
              <span className="fr-logo-mark" />
              AURA DENTAL
            </div>
            <p>
              Dentisterie de précision suisse dans un cadre calme et moderne.
              Soins complets, du contrôle de routine à la conception intégrale
              du sourire.
            </p>
          </div>
          <div>
            <h4>Liens Rapides</h4>
            <ul>
              <li>
                <a href="#accueil">Accueil</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#pourquoi-nous">Pourquoi Nous</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Heures d&apos;Ouverture</h4>
            <ul>
              <li>Lun – Ven : 8h00 – 19h00</li>
              <li>Samedi : 9h00 – 15h00</li>
              <li>Dimanche : Fermé</li>
              <li>Ligne d&apos;urgence : 24h/24, 7j/7</li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>hello@auradental.example</li>
              <li>+1 (415) 555-0192</li>
              <li>200 Wellness Ave, Suite 4</li>
              <li>Instagram · LinkedIn</li>
            </ul>
          </div>
        </div>
        <div className="fr-footer-bottom">
          <span>© 2026 AuraDental Clinic. Tous droits réservés.</span>
          <span>Politique de Confidentialité · Conditions de Soins</span>
        </div>
      </footer>
    </div>
  )
}

export default Footer