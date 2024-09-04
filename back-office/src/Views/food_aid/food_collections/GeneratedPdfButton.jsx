import { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export default function GeneratePdfButton() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [pdfUrl, setPdfUrl] = useState('');
    const { t } = useTranslation('global');

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
        <div className='mt-5'>
            {message && <p className='mt-4 mb-4'>{message}</p>}
            <div className='flex row-auto mb-4'>
                <button onClick={handleGeneratePdf} disabled={loading} className="mr-2 bg-fuchsia-500 text-white py-2 px-4 rounded hover:bg-fuchsia-600 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:ring-opacity-75 transition-colors duration-300 ease-in-out">
                    {loading ? 'En cours...' : 'Générer le PDF'}
                </button>
                {pdfUrl && (
                    <a href={pdfUrl} download target='_blank' className="bg-fuchsia-500 text-white py-2 px-4 rounded hover:bg-fuchsia-600 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:ring-opacity-75 transition-colors duration-300 ease-in-out">
                        {t('Download PDF')}
                    </a>
                )}
            </div>
        </div>
    );
}
