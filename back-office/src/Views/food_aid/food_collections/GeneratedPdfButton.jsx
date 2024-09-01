import { useState } from 'react';
import axios from 'axios';

export default function GeneratePdfButton() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [pdfUrl, setPdfUrl] = useState('');

    const handleGeneratePdf = async () => {
        setLoading(true);
        setMessage('');
        setPdfUrl('');

        try {
            // Étape 1 : Récupérer le contenu HTML du fichier trajet.html
            const htmlResponse = await axios.get('/trajet.html');
            const htmlContent = htmlResponse.data;

            // Étape 2 : Envoyer le contenu HTML à l'API PDF.co
            const response = await axios.post('https://api.pdf.co/v1/pdf/convert/from/html', {
                html: htmlContent, // Contenu HTML
                name: 'trajet.pdf'
            }, {
                headers: {
                    'x-api-key': 'ethangunzb@gmail.com_55WZT9CmhD0GzYwwkrWgapDkZlppjRqJ02NNLAn2BkIRREk4InoQTjdu2Fdkzjgv', // Remplacez par votre clé API PDF.co
                }
            });

            setPdfUrl(response.data.url); // URL du PDF généré
            setMessage('PDF généré avec succès!');
        } catch (error) {
            setMessage(`Erreur : ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handleGeneratePdf} disabled={loading}>
                {loading ? 'En cours...' : 'Générer le PDF'}
            </button>
            {message && <p>{message}</p>}
            {pdfUrl && (
                <a href={pdfUrl} download>
                    Télécharger le PDF
                </a>
            )}
        </div>
    );
}
