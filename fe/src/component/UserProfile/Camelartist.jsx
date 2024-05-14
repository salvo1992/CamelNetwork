import React, { useState } from 'react';

function Contatore() {
    // Inizializzazione dello stato
    const [conteggio, setConteggio] = useState(0);

    // Funzione per incrementare il conteggio
    const incrementa = () => {
        setConteggio(conteggio + 1);
    };

    return (
        <div>
            <p>Hai cliccato {conteggio} volte</p>
            <button onClick={incrementa}>Clicca qui</button>
        </div>
    );
}

export default Contatore;
