import React, { useState } from 'react';

function AddressForm() {
    const [addresses, setAddresses] = useState(['']);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Fonction pour mettre à jour l'adresse dans le tableau
    const handleInputChange = (index, event) => {
        const newAddresses = [...addresses];
        newAddresses[index] = event.target.value;
        setAddresses(newAddresses);
    };

    // Fonction pour ajouter un nouveau champ d'adresse
    const handleAddField = () => {
        setAddresses([...addresses, '']);
    };

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');
    
        try {
            const response = await fetch('http://localhost:5000/generate-map', {  // Assurez-vous que l'URL est correcte
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ points: addresses.filter(address => address.trim() !== '') }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setMessage(`Success! Map file saved at: ${data.file}`);
            } else {
                setMessage(`Error: ${data.error}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };
    
    

    return (
        <div>
            <h1>Enter Addresses</h1>
            <form onSubmit={handleSubmit}>
                {addresses.map((address, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <label htmlFor={`address-${index}`} style={{ display: 'block', marginBottom: '5px' }}>Address {index + 1}:</label>
                        <input
                            id={`address-${index}`}
                            type="text"
                            value={address}
                            onChange={(e) => handleInputChange(index, e)}
                            placeholder="Enter address"
                            required
                            style={{ padding: '8px', width: '100%' }}
                        />
                        {/* Afficher le bouton d'ajout seulement pour le dernier champ */}
                        {index === addresses.length - 1 && (
                            <button
                                type="button"
                                onClick={handleAddField}
                                style={{ marginTop: '10px', padding: '8px 12px' }}
                            >
                                Add Another Address
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="submit"
                    disabled={loading}
                    style={{ padding: '10px 15px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}
                >
                    {loading ? 'Generating Map...' : 'Generate Map'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default AddressForm;
