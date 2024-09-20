export interface Message {
    type: string;
    from: string;
    fromUserName: string;
    message: string;
    timestamp?: Date; // Ajouter cette ligne pour rendre la propriété optionnelle

  }