import { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import '../Style/chat.css';

function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    {
      id: 'Greet',
      message: 'Bonjour, bienvenue chez Universal Paintball!',
      trigger: 'Ask Name',
    },
    {
      id: 'Ask Name',
      message: 'Veuillez entrer votre nom',
      trigger: 'waiting',
    },
    {
      id: 'waiting',
      user: true,
      trigger: 'Name',
    },
    {
      id: 'Name',
      message: 'Merci! Que puis-je faire pour vous?',
      trigger: 'issue',
    },
    {
      id: 'issue',
      options: [
        { value: 'reservation', label: 'Faire une réservation', trigger: 'reservation' },
        { value: 'evaluer', label: 'Évaluer une session', trigger: 'evaluer' },
        { value: 'horaires', label: 'Consulter les horaires', trigger: 'horaires' },
        { value: 'evenements', label: 'Voir les événements', trigger: 'evenements' },
        { value: 'tarifs', label: 'Consulter les tarifs', trigger: 'tarifs' },
        { value: 'contact', label: 'Nous contacter', trigger: 'contact' },
        { value: 'equipement', label: 'En savoir plus sur l\'équipement', trigger: 'equipement' },
      ],
    },
    {
      id: 'reservation',
      message: 'Pour faire une réservation, veuillez visiter notre page de réservation ou appeler le 01 23 45 67 89.',
      trigger: 'more-help',
    },
    {
      id: 'evaluer',
      message: 'Pour évaluer une session, veuillez visiter notre page d\'évaluation.',
      trigger: 'more-help',
    },
    {
      id: 'horaires',
      message: 'Nos horaires d\'ouverture sont de 9h à 18h du lundi au samedi. Avez-vous d\'autres questions?',
      trigger: 'more-help',
    },
    {
      id: 'evenements',
      message: 'Pour voir les événements à venir, veuillez consulter notre section événements sur notre site web.',
      trigger: 'more-help',
    },
    {
      id: 'tarifs',
      message: 'Nos tarifs sont les suivants : 20€ pour une session de 2 heures, 35€ pour une session de 4 heures, et 60€ pour la journée entière. Avez-vous d\'autres questions?',
      trigger: 'more-help',
    },
    {
      id: 'contact',
      message: 'Vous pouvez nous contacter par email à contact@paintball.com ou par téléphone au 01 23 45 67 89. Avez-vous d\'autres questions?',
      trigger: 'more-help',
    },
    {
      id: 'equipement',
      message: 'Nous fournissons tout l\'équipement nécessaire, y compris les marqueurs, les masques et les combinaisons. Vous pouvez également apporter votre propre équipement. Avez-vous d\'autres questions?',
      trigger: 'more-help',
    },
    {
      id: 'more-help',
      options: [
        { value: 'yes', label: 'Oui', trigger: 'issue' },
        { value: 'no', label: 'Non', trigger: 'end' },
      ],
    },
    {
      id: 'end',
      message: 'Merci de nous avoir contactés. Bonne journée!',
      end: true,
    },
  ];

  return (
    <div>
      <button
        className="chat-button"
        onClick={() => setIsOpen(!isOpen)}
        style={{ backgroundImage: `url(./dummy/chatbot-icon.png)` }}
      />
      {isOpen && (
        <div key={isOpen} className="chat-window">
          <ChatBot steps={steps} />
        </div>
      )}
    </div>
  );
}

export default FloatingChat;
